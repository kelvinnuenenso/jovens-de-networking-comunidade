
-- Adicionar a nova categoria de curso "Série que Prende"
INSERT INTO public.course_categories (name, description, color, icon)
SELECT * FROM (VALUES
  ('Série que Prende', 'Como criar séries de vídeos para manter seu público sempre engajado', '#9B59B6', '🎬')
) AS new_category(name, description, color, icon)
WHERE NOT EXISTS (
  SELECT 1 FROM public.course_categories 
  WHERE course_categories.name = new_category.name
);
