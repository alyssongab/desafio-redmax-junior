export type Usuario = {
    id: number,
    nome: string,
    email: string,
    idade: number
    createdAt: string
}

export type FormState = {
  message: string;
  errors: {
    name?: string,
    email?: string,
    idade?: string,
    api?: string
  } | undefined;
};