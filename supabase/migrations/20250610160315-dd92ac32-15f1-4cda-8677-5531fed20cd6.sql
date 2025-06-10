
-- Criar tabela para trending topics
CREATE TABLE IF NOT EXISTS public.trending_topics (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  posts_count INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  is_active BOOLEAN DEFAULT true
);

-- Inserir algumas tendências exemplo
INSERT INTO public.trending_topics (title, description, posts_count) VALUES
('#RoteiroVirais', 'Roteiros que prendem atenção', 45),
('#TikTokGrowth', 'Estratégias de crescimento', 32),
('#CreatorTips', 'Dicas para criadores', 28),
('#Monetização', 'Como monetizar conteúdo', 19),
('#EditingHacks', 'Truques de edição', 15);

-- Inserir as categorias de cursos específicas solicitadas (sem ON CONFLICT)
INSERT INTO public.course_categories (name, description, color, icon)
SELECT * FROM (VALUES
  ('Conteúdo que Conecta', 'Como criar conteúdos que geram engajamento e conexão verdadeira', '#FF6B6B', '💡'),
  ('Edição Ninja', 'O passo a passo para editar vídeos rápidos e irresistíveis', '#4ECDC4', '✂️'),
  ('Roteiros que Viralizam', 'Estratégias para escrever roteiros que prendem a atenção e viralizam', '#45B7D1', '📝'),
  ('De Zero a Influencer', 'Como crescer do absoluto zero e construir uma audiência fiel', '#96CEB4', '📈'),
  ('Venda com Conteúdo', 'Como transformar seu conteúdo em uma máquina de vendas', '#FECA57', '💰'),
  ('Produto Digital Descomplicado', 'Como criar e vender seu produto ou serviço online do jeito certo', '#A55EEA', '🚀')
) AS new_categories(name, description, color, icon)
WHERE NOT EXISTS (
  SELECT 1 FROM public.course_categories 
  WHERE course_categories.name = new_categories.name
);

-- Habilitar RLS para trending_topics
ALTER TABLE public.trending_topics ENABLE ROW LEVEL SECURITY;

-- Política para permitir leitura de tendências para todos
CREATE POLICY "Anyone can view trending topics" ON public.trending_topics
  FOR SELECT USING (true);

-- Política para permitir apenas admins criarem/editarem tendências
CREATE POLICY "Only admins can manage trending topics" ON public.trending_topics
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM public.profiles 
      WHERE id = auth.uid() AND role = 'admin'
    )
  );
