import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableRow, TableHead, TableHeader } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import Link from "next/link";
import { api } from "@/lib/api";
import { Usuario } from "@/lib/types";
import axios from "axios";
import { ConfirmDeleteModal } from "@/components/modal-confirm";

async function listarUsuarios(): Promise<Usuario[] | null> {
  try{
    const response = await api.get<{success: boolean, data: Usuario[]}>('/api/usuarios');
    return response.data.data;
  }
  catch(error){
    if(axios.isAxiosError(error)){
      console.error("Erro ao buscar usuarios: ", error.message);
    }
    else{
      console.error("Erro inesperado: ", error);
    }
    return null;
  }
}

export default async function ListagemUsuarios(){
  const users = await listarUsuarios();

  return(
    <main className="container mx-auto p-4 md:p-8 ">
      <Card className="">

        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-3xl">Usuários</CardTitle>
          <Button>
            <Link href="/cadastro" className="flex items-center">
              <PlusCircle className="mr-2 h-4 w-4"/>
              Novo Usuário
            </Link>
          </Button>
        </CardHeader>

        <CardContent>
          <div className="overflow-x-auto">
            <Table>

              <TableHeader>
                <TableRow>
                  <TableHead>Nome</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Idade</TableHead>
                  <TableHead>Ações</TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {users && users.length > 0 ? (
                  users.map(u => (
                    <TableRow key={u.id}>
                      <TableCell>{u.nome}</TableCell>
                      <TableCell>{u.email}</TableCell>
                      <TableCell>{u.idade}</TableCell>
                      <TableCell>
                        <ConfirmDeleteModal id={u.id} nome={u.nome}/>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={3} className="text-center">
                      {users ? 'Nenhum usuário encontrado.' : 'Não foi possível carregar os usuários.'}
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>

            </Table>
          </div>
        </CardContent>

      </Card>
    </main>
  )
}