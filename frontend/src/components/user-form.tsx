'use client';

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { useRouter } from "next/navigation";
import { FormState } from "@/lib/types";
import { criarUsuario } from "@/lib/userActions";
import { Button } from "./ui/button";
import { Card, CardContent, CardTitle, CardHeader } from "./ui/card";
import { Input } from "./ui/input";
import { Label } from "./ui/label";

function SalvarButton(){
    const { pending } = useFormStatus();
    return(
        <Button type="submit" disabled={pending}>
            {pending ? 'Salvando...' : 'Salvar'}
        </Button>
    )
}

export function UsuarioForm(){
    const router = useRouter();
    const initialState: FormState = { message: "", errors:undefined };
    const [state, dispatch] = useActionState(criarUsuario, initialState);

    return (
           <Card className="max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Cadastrar Novo Usuário</CardTitle>
      </CardHeader>
      <CardContent>
        <form action={dispatch} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="name">Nome</Label>
            <Input id="name" name="name" placeholder="Alysson Gabriel" required minLength={2} />
            {state.errors?.name && (
              <p className="text-sm font-medium text-red-500">{state.errors.name}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">E-mail</Label>
            <Input id="email" name="email" type="email" placeholder="email@exemplo.com" required />
            {state.errors?.email && (
              <p className="text-sm font-medium text-red-500">{state.errors.email}</p>
            )}
          </div>

        
            <div className="space-y-2">
                <Label htmlFor="idade">Idade</Label>
                <Input
                id="idade"
                name="idade"
                type="text"
                inputMode="numeric"
                pattern="[0-9]*"
                placeholder="Ex: 25"
                required
                />
                {state.errors?.idade && (
                <p className="text-sm font-medium text-red-500">{state.errors.idade}</p>
                )}
            </div>

          <div className="flex justify-end space-x-4">
            <Button type="button" variant="outline" onClick={() => router.back()}>
              Cancelar
            </Button>
            <SalvarButton />
          </div>
        </form>
      </CardContent>
    </Card>
    );
}