interface SolicitarFormData {
  responsavel: string;
  setor: string;
  telefone: string;
  local: string;
  localExterno?: string;
  data: string;
  hora: string;

  tipo: string;
  formato: string;

  titulo: string;
  descricao: string;

  pessoas: string;
  observacoes: string;
}

const initialData: SolicitarFormData = {
  responsavel: "",
  setor: "",
  telefone: "",
  local: "",
  localExterno: "",
  data: "",
  hora: "",

  tipo: "",
  formato: "",

  titulo: "",
  descricao: "",

  pessoas: "",
  observacoes: "",
};

export type { SolicitarFormData };
export { initialData };