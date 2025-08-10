'use server';

import { revalidatePath } from "next/cache";
import { FormState } from "./types";
import { api } from "./api";
import axios from "axios";
import { redirect } from "next/navigation";

export async function criarUsuario(initialState: FormState, form: FormData): Promise<FormState> {
    const nome = form.get('name') as string || null;
    const email = form.get('email') as string || null;
    const idadeStr = form.get('idade') as string || null;

   const errors: FormState['errors'] = {};

   if(!nome || nome.trim().length < 2) errors.name = "O nome deve ter pelo menos 2 caracteres";

   if(!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errors.email = "Insira um email válido";

   if(!idadeStr){
    errors.idade = "Idade é obrigatória"
   } else {
        const idade = Number(idadeStr);
        if(isNaN(idade) || idade < 1 || idade > 120){
            errors.idade = "Idade deve ser um número entre 1 e 120";
        }
   }

   if(Object.keys(errors).length > 0){
    return { message: "Falha ao criar usuário. Verifique os campos", errors };
   }

   // chamada da api

   try{
    await api.post('/api/usuarios', {
        nome,
        email,
        idade: Number(idadeStr)
    });
   }
   catch(error){
    if(axios.isAxiosError(error)){
        // erro na api
        if(error.response){
            const apiErro = error.response.data.message || "Ocorreu um erro ao salvar usuario";
            return {
                message: "Erro na API",
                errors: { api: apiErro }
            }
        }

        return {
            message: "Erro de rede",
            errors: { api: "Não foi possivel conectar à api" }
        }
    }

    // erro desconhecido
    return {
        message: "Erro inesperado",
        errors: { api: "Ocorreu um erro inesperado" }
    }

   }

   revalidatePath('/');
   redirect('/');
}

export async function deletarUsuario(id: number){
    try{
        await api.delete(`/api/usuarios/${id}`);
    }
    catch(error){
        throw error;
    }

}