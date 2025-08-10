"use client";
import { useState } from "react";
import { deletarUsuario } from "@/lib/userActions";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";

export function ConfirmDeleteModal({ id, nome }: { id: number, nome: string }) {
  const [open, setOpen] = useState(false);
  const [pending, setPending] = useState(false);
  const router = useRouter();

  async function handleDelete() {
    setPending(true);
    await deletarUsuario(id);
    setPending(false);
    setOpen(false);
    router.refresh();
  }

  return (
    <>
      <Button variant="destructive" size="sm" onClick={() => setOpen(true)}>
        Remover
      </Button>
      {open && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50">
          <div className="bg-white p-6 rounded shadow space-y-4">
            <p>Confirma a exclusão de <b>{nome}</b>?</p>
            <div className="flex gap-2 justify-end">
              <Button variant="outline" onClick={() => setOpen(false)} disabled={pending}>Cancelar</Button>
              <Button variant="destructive" onClick={handleDelete} disabled={pending}>
                {pending ? "Removendo..." : "Remover"}
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}