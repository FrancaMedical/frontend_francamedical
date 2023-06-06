export interface Doctor {
  id?: string;
  nome?: string;
  tel?: string;
  cpf?: string;
  dataNascimento?: string;
  endereco?: Address;
  password?: string;
  crm?: string;
  especialidade?: string;
}

interface Address {
  cep?: string;
  rua?: string;
  numero?: string;
  bairro?: string;
  cidade?: string;
  estado?: string;
}
