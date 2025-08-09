import { Request, Response } from "express";
import * as service from "./usuario.service.js";

export const createUser = async(req: Request, res: Response) => {
    try{
        const { nome, email, idade} = req.body;
        if(!nome || !email || typeof idade !== "number"){
            return res.status(400).json({
                success: false,
                message: "Dados inválidos"
            })
        }
        const user = await service.create({nome, email, idade})
        res.status(201).json({
            success: true,
            message: "Usuário criado com sucesso",
            data: user
        })
    }
    catch(error: any){
        res.status(400).json({
            success: false,
            messsage: error.message || "Ocorreu um erro inesperado"
        })
    }
}

export const listUsers = async (req: Request, res: Response) => {
    const users = await service.list();
    res.status(200).json({
        sucess: true,
        data: users
    });
}

export const deleteUser = async(req: Request, res: Response) => {
    const id = Number(req.params.id);
    try{
        await service.remove(id);
        res.status(204).json({
            success: true,
            message: "Usuário removido com sucesso"
        });
    }
    catch(error: any){
        res.status(400).json({
            success: false,
            message: error.message
        })
    }
}