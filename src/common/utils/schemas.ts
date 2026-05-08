import { z } from "zod";

export const telefoneRegex = /^\(\d{2}\)\s\d{5}-\d{4}$/;

export const solicitarFormSchema = z.object({
	responsavel: z.string().min(1, "Nome do responsável é obrigatório"),
	email: z.string().email("E-mail inválido"),
	setor: z.string().min(1, "Setor obrigatório"),
	telefone: z
		.string()
		.regex(telefoneRegex, "Telefone deve ter 11 dígitos (formato válido)"),
	local: z.string().min(1, "Local obrigatório"),

	localExterno: z.string().optional(),

	data: z.string().min(1, "Data obrigatória"),
	hora: z.string().min(1, "Hora obrigatória"),

	TipoProducao: z.string().min(1, "Tipo de produção obrigatória"),
	FormatoProducao: z.string().min(1, "Formato de produção obrigatório"),

	nomeProjeto: z.string().min(1, "Nome do projeto obrigatório"),
	titulo: z.string().min(1, "Título obrigatório"),
	descricao: z.string().min(1, "Descrição obrigatória"),
	thumbnail: z
		.instanceof(File)
		.refine((file) => file.size > 0, "Thumbnail obrigatório"),

	acessibilidade: z.enum(["INCLUIR_LIBRAS", "NAO_SE_APLICA"], {
		message: "Selecione uma opção de acessibilidade",
	}),

	distribuicao: z.string().min(1, "Distribuição obrigatória"),

	dataLimite: z.string().optional(),
	pessoas: z.number().optional(),
	roteiro: z.instanceof(File).optional(),
	observacoes: z.string().optional(),
});

export const tokenSchema = z.string().regex(
  /^SOPA-\d{4}\/\d{2}-[0-9a-fA-F-]{36}$/,
  "Formato de token inválido"
);


export type SolicitarFormSchema = z.infer<typeof solicitarFormSchema>;
