// types.ts
export interface User {
  id: string;
  name: string;
  cpf: string;
  birthDate: string;
  email?: string;
  password?: string;
  status: 'ativo' | 'inativo';
  createdAt?: string;
  role: 'usuario' | 'admin';
  acceptTerms: boolean;
}
