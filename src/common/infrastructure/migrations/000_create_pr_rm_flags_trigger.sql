-- Migration: Trigger para actualizar flags PR y RM automáticamente
-- Fecha: 2025-10-15
-- Descripción: Mantiene los flags is_pr e is_rm actualizados cuando se insertan nuevas marcas

-- Eliminar trigger existente si existe
DROP TRIGGER IF EXISTS update_pr_rm_flags_trigger ON marks;

-- Crear función que maneja la actualización de flags PR/RM
CREATE OR REPLACE FUNCTION update_pr_rm_flags()
RETURNS TRIGGER 
SECURITY DEFINER  -- Ejecuta con permisos del propietario, no del usuario
SET search_path = public
AS $$
DECLARE
    user_id_param UUID;
    movement_id_param INTEGER;
BEGIN
    -- Obtener parámetros del registro insertado
    user_id_param := NEW.user_id;
    movement_id_param := NEW.movement_id;
    
    -- Resetear TODOS los flags para este usuario/movimiento
    UPDATE marks 
    SET is_pr = false, is_rm = false 
    WHERE user_id = user_id_param AND movement_id = movement_id_param;

    -- Establecer PR (valor máximo)
    UPDATE marks 
    SET is_pr = true 
    WHERE user_id = user_id_param 
      AND movement_id = movement_id_param 
      AND value = (
          SELECT MAX(value) 
          FROM marks 
          WHERE user_id = user_id_param AND movement_id = movement_id_param
      );

    -- Establecer RM (created_at más reciente)
    UPDATE marks 
    SET is_rm = true 
    WHERE user_id = user_id_param 
      AND movement_id = movement_id_param 
      AND created_at = (
          SELECT MAX(created_at) 
          FROM marks 
          WHERE user_id = user_id_param AND movement_id = movement_id_param
      );

    RAISE LOG 'Trigger update_pr_rm_flags: Updated flags for user % movement %', user_id_param, movement_id_param;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Crear trigger que se ejecuta después de INSERT en marks
-- IMPORTANTE: Se ejecuta ANTES que trigger_sync_movement_rm para actualizar flags primero
CREATE TRIGGER update_pr_rm_flags_trigger
    AFTER INSERT ON marks
    FOR EACH ROW
    EXECUTE FUNCTION update_pr_rm_flags();

COMMENT ON FUNCTION update_pr_rm_flags() IS 'Actualiza automáticamente los flags is_pr e is_rm cuando se insertan nuevas marcas';
COMMENT ON TRIGGER update_pr_rm_flags_trigger ON marks IS 'Trigger que mantiene actualizados los flags de PR (máximo valor) y RM (más reciente)';