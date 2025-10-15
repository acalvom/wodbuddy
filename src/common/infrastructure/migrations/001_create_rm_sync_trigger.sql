-- Migration: Trigger para sincronizar RM entre marks y movements
-- Fecha: 2025-10-15
-- Descripción: Mantiene movements.rm sincronizado automáticamente con las marcas RM

-- Crear función que maneja la sincronización de RM
CREATE OR REPLACE FUNCTION sync_movement_rm()
RETURNS TRIGGER AS $$
DECLARE
    target_movement_id INTEGER;
    latest_rm_value NUMERIC;
BEGIN
    -- Determinar el movement_id según la operación
    IF TG_OP = 'DELETE' THEN
        target_movement_id := OLD.movement_id;
    ELSE
        target_movement_id := NEW.movement_id;
    END IF;

    -- Solo procesar si la marca era o es RM (is_rm = true)
    -- Incluye casos donde se cambia el flag is_rm
    IF (TG_OP = 'DELETE' AND OLD.is_rm = true) OR 
       (TG_OP = 'UPDATE' AND (OLD.is_rm = true OR NEW.is_rm = true)) OR
       (TG_OP = 'INSERT' AND NEW.is_rm = true) THEN
        
        -- Obtener el valor RM más reciente para este movement
        SELECT value INTO latest_rm_value
        FROM marks 
        WHERE movement_id = target_movement_id 
          AND is_rm = true
          AND (TG_OP != 'DELETE' OR id != OLD.id) -- Excluir el registro que se está eliminando
        ORDER BY created_at DESC, id DESC
        LIMIT 1;

        -- Actualizar el campo rm en movements
        UPDATE movements 
        SET rm = latest_rm_value
        WHERE id = target_movement_id;
        
        RAISE LOG 'Trigger sync_movement_rm: Updated movement % with RM value %', target_movement_id, COALESCE(latest_rm_value, 0);
    END IF;

    -- Retornar el registro apropiado según la operación
    IF TG_OP = 'DELETE' THEN
        RETURN OLD;
    ELSE
        RETURN NEW;
    END IF;
END;
$$ LANGUAGE plpgsql;

-- Crear trigger que se ejecuta después de INSERT, UPDATE o DELETE en marks
-- IMPORTANTE: Se ejecuta DESPUÉS del trigger update_pr_rm_flags_trigger para usar los flags actualizados
DROP TRIGGER IF EXISTS trigger_sync_movement_rm ON marks;
CREATE TRIGGER trigger_sync_movement_rm
    AFTER INSERT OR UPDATE OR DELETE ON marks
    FOR EACH ROW
    EXECUTE FUNCTION sync_movement_rm();

COMMENT ON FUNCTION sync_movement_rm() IS 'Sincroniza automáticamente el campo rm en movements cuando cambian las marcas RM';
COMMENT ON TRIGGER trigger_sync_movement_rm ON marks IS 'Trigger que mantiene movements.rm actualizado con la marca RM más reciente';