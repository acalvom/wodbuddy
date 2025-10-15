-- Migration: Poblar movements.rm con datos existentes
-- Fecha: 2025-10-15
-- Descripción: Migra los RMs existentes desde marks a movements.rm

-- Poblar movements.rm con los valores RM más recientes
UPDATE movements 
SET rm = (
    SELECT marks.value
    FROM marks 
    WHERE marks.movement_id = movements.id 
      AND marks.is_rm = true
    ORDER BY marks.created_at DESC, marks.id DESC
    LIMIT 1
)
WHERE EXISTS (
    SELECT 1 
    FROM marks 
    WHERE marks.movement_id = movements.id 
      AND marks.is_rm = true
);

-- Mostrar estadísticas de la migración
DO $$
DECLARE
    total_movements INTEGER;
    movements_with_rm INTEGER;
    movements_updated INTEGER;
BEGIN
    SELECT COUNT(*) INTO total_movements FROM movements;
    SELECT COUNT(*) INTO movements_with_rm FROM movements WHERE rm IS NOT NULL;
    
    movements_updated := movements_with_rm;
    
    RAISE NOTICE 'Migración completada:';
    RAISE NOTICE '- Total movements: %', total_movements;
    RAISE NOTICE '- Movements con RM actualizados: %', movements_updated;
    RAISE NOTICE '- Movements sin RM: %', total_movements - movements_updated;
END $$;