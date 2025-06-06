
import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [loading, setLoading] = useState(false);
  
  const { signIn, signUp } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (isLogin) {
        const { error } = await signIn(email, password);
        if (error) {
          if (error.message === 'Invalid login credentials') {
            toast({
              title: 'Erro no login',
              description: 'Email ou senha incorretos. Verifique suas credenciais.',
              variant: 'destructive',
            });
          } else {
            toast({
              title: 'Erro no login',
              description: error.message,
              variant: 'destructive',
            });
          }
        } else {
          toast({
            title: 'Login realizado com sucesso!',
            description: 'Bem-vindo à Fábrica de Views.',
          });
          navigate('/');
        }
      } else {
        const { error } = await signUp(email, password, fullName);
        if (error) {
          if (error.message === 'User already registered') {
            toast({
              title: 'Usuário já cadastrado',
              description: 'Este email já está cadastrado. Tente fazer login.',
              variant: 'destructive',
            });
          } else {
            toast({
              title: 'Erro no cadastro',
              description: error.message,
              variant: 'destructive',
            });
          }
        } else {
          toast({
            title: 'Cadastro realizado com sucesso!',
            description: 'Verifique seu email para confirmar a conta.',
          });
          setIsLogin(true);
        }
      }
    } catch (error) {
      toast({
        title: 'Erro inesperado',
        description: 'Ocorreu um erro. Tente novamente.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/20 to-background flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold text-primary">Fábrica de Views</CardTitle>
          <CardDescription>
            {isLogin ? 'Entre na sua conta' : 'Crie sua conta'}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {!isLogin && (
              <div>
                <label htmlFor="fullName" className="block text-sm font-medium mb-2">
                  Nome completo
                </label>
                <Input
                  id="fullName"
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  required={!isLogin}
                  placeholder="Seu nome completo"
                />
              </div>
            )}
            
            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-2">
                Email
              </label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="seu@email.com"
              />
            </div>
            
            <div>
              <label htmlFor="password" className="block text-sm font-medium mb-2">
                Senha
              </label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="••••••••"
                minLength={6}
              />
            </div>
            
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? 'Carregando...' : (isLogin ? 'Entrar' : 'Cadastrar')}
            </Button>
          </form>
          
          <div className="mt-4 text-center">
            <button
              type="button"
              onClick={() => setIsLogin(!isLogin)}
              className="text-primary hover:underline text-sm"
            >
              {isLogin ? 'Não tem conta? Cadastre-se' : 'Já tem conta? Entre'}
            </button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Auth;
