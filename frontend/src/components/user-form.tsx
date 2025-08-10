'use client';
import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { api } from '@/lib/api';
import { Button } from "./ui/button";
import { Card, CardContent, CardTitle, CardHeader } from "./ui/card";
import { Input } from "./ui/input";
import { Label } from "./ui/label";

export function UsuarioForm(){
    const router = useRouter();

    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [idade, setIdade] = useState('');

    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (event: FormEvent) => {
      event.preventDefault();
      setIsLoading(true);
      setError(null);

      try{
        const response = await api.post('/api/usuarios', {
          nome: nome,
          email: email,
          idade: Number(idade)
        });

        alert('Usuário criado com sucesso.');
        router.push('/');
        router.refresh();
      }
      catch(error: any){
        const errorMsg = error.response?.data?.message || "Falha ao criar usuario"
        console.error(errorMsg);
        setError(errorMsg);
      }
      finally{
        setIsLoading(false);
      }
    }

    return (
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>Cadastrar Novo Usuário</CardTitle>
          {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
                <Label htmlFor="name">Nome</Label>
                <Input id="name" value={nome} onChange={(e) => setNome(e.target.value)} placeholder="Seu nome" required />
            </div>

            <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="email@exemplo.com" required />
            </div>

          
            <div className="space-y-2">
                <Label htmlFor="idade">Idade</Label>
                <Input id="idade" 
                type="number" 
                value={idade} 
                onChange={(e) => setIdade(e.target.value)} 
                inputMode="numeric"
                pattern="[0-9]*"
                placeholder="25" 
                required />
            </div>

            <div className="flex justify-end space-x-4">
              <Button type="button" variant="outline" onClick={() => router.back()}>
                Cancelar
              </Button>
              <Button type="submit" disabled={isLoading}>
                {isLoading ? 'Salvando...' : 'Salvar'}
              </Button>
            </div>
          </form>
        </CardContent>
    </Card>
    );
}