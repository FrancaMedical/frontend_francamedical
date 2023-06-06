export interface Patient {
  id?: string;
  nome?: string;
  tel?: string;
  cpf?: string;
  dataNascimento?: string;
  endereco?: Address;
  password?: string;
}

interface Address {
  cep?: string;
  rua?: string;
  numero?: string;
  bairro?: string;
  cidade?: string;
  estado?: string;
}
