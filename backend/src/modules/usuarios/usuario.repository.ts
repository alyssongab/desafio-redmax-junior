import { PrismaClient } from "@prisma/client";
import { User } from "./types/user.type.js";

const prisma = new PrismaClient();

export const addUser = async(data: Omit<User, 'id'>) => {
    return prisma.usuario.create({ data });
}

export const findAllUsers = async () => prisma.usuario.findMany();

export const findUserById = async (id: number) => {
    return prisma.usuario.findUnique({
        where: {id}
    });
}

export const deleteUser = async (id: number) => {
    prisma.usuario.delete({
        where: {id}
    });
}