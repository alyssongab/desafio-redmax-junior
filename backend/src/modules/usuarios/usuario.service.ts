import * as repo from "./usuario.repository.js";
import { Usuario } from "@prisma/client";

export const create = async(data: Omit<Usuario, 'id' | 'createdAt'>) => {

    if(data.idade < 1 || data.idade > 120){
        throw new Error("Usuário deve ter entre 1 e 120 anos");
    }

    const email = await repo.findUserByEmail(data.email);
    if(email) throw new Error("Email já está em uso.");

    return repo.addUser(data);
}

export const list = async() => repo.findAllUsers;

export const remove = async(id: number) => repo.deleteUser(id);