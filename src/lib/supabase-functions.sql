
-- Função para incrementar likes
CREATE OR REPLACE FUNCTION increment_likes(post_id UUID)
RETURNS void AS $$
BEGIN
  UPDATE public.community_posts 
  SET likes_count = likes_count + 1 
  WHERE id = post_id;
END;
$$ LANGUAGE plpgsql;

-- Função para decrementar likes
CREATE OR REPLACE FUNCTION decrement_likes(post_id UUID)
RETURNS void AS $$
BEGIN
  UPDATE public.community_posts 
  SET likes_count = GREATEST(likes_count - 1, 0) 
  WHERE id = post_id;
END;
$$ LANGUAGE plpgsql;
