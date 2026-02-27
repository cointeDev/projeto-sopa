export interface Tarefa {
  id: number;
  nome: string;
  descricao: string;
  etapaId: number;
  solicitacaoId?: string;
  // Se você precisar, pode adicionar os objetos aninhados que o include do Prisma traz:
  // etapa?: any; 
  // solicitacao?: any;
}