import { PrismaClient } from "@prisma/client";
import { Usuario } from "@prisma/client";

const prisma = new PrismaClient();

export const addUser = async(data: Omit<Usuario, 'id' | 'createdAt'>) => {
    return prisma.usuario.create({ data });
}

export const findAllUsers = async () => prisma.usuario.findMany();

export const findUserById = async (id: number) => {
    return prisma.usuario.findUnique({
        where: {id}
    });
}

export const findUserByEmail = async(email: string) => {
    return prisma.usuario.findUnique({
        where: {email}
    });
}

export const deleteUser = async (id: number) => {
    return prisma.usuario.delete({
        where: {id}
    });
}