export type Usuario = {
    nome: string,
    email: string,
    idade: number
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