/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { useFormContext } from "../../context/FormContext";
import { Footer } from "../common/Footer";
import { criarSolicitacao } from "../../services/solicitacoes";
import { ACESSIBILIDADE_LABELS, /*type Acessibilidade*/ } from "../../common/types/solicitacao";

// Interface para tipagem segura do erro da API
interface ApiError {
    response?: {
        data?: {
            message?: string;
        };
    };
}

export default function Step5() {
    const { formData, setPassoAtual } = useFormContext();

    async function handleConfirmar() {
        try {
            const payload = {
                responsavel: formData.responsavel,
                email: formData.email,
                setor: formData.setor,
                telefone: formData.telefone,
                local: formData.local,
                data: formData.data,
                hora: formData.hora,
                TipoProducao: formData.tipo,
                FormatoProducao: formData.formato,
                nomeProjeto: formData.nomeProjeto,
                titulo: formData.titulo,
                descricao: formData.descricao,
                thumbnail: formData.thumbnail?.name,
                acessibilidade: formData.acessibilidade,
                distribuicao: formData.distribuicao,
                dataLimite: formData.dataLimite,
                pessoas: formData.pessoas,
                roteiro: formData.roteiro?.name,
                observacoes: formData.observacoes,
            };

            await criarSolicitacao(payload);
            setPassoAtual(6);
        } catch (error: unknown) {
            // Tratamento de erro tipado para remover o 'any'
            const apiError = error as ApiError;
            console.error("Erro ao enviar solicitação:", apiError);
            console.error("Resposta da API:", apiError.response);

            alert(
                apiError.response?.data?.message ||
                "Ocorreu um erro ao enviar a solicitação. Por favor, tente novamente."
            );
        }
    }

    return (
        <div className="font-inter text-left">
            <h3 className="text-4xl font-black text-[#334155] mb-10 uppercase tracking-tighter leading-none">
                Revisar informações
            </h3>

            {/* Container de Revisão Estilo Light Card */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 bg-white p-10 rounded-[2.5rem] border border-slate-100 shadow-2xl shadow-slate-200/50">
                
                {/* Coluna 1: Identificação */}
                <div className="space-y-4">
                    <h4 className="text-[#4f46e5] font-black uppercase text-[10px] tracking-[0.2em] border-b border-slate-50 pb-3">
                        Identificação
                    </h4>
                    <div className="space-y-2 text-sm">
                        <p className="text-slate-400 font-medium">Projeto: <span className="text-[#334155] font-bold">{formData.nomeProjeto || "Não informado"}</span></p>
                        <p className="text-slate-400 font-medium">Título: <span className="text-[#334155] font-bold">{formData.titulo || "Não informado"}</span></p>
                        <p className="text-slate-400 font-medium">Solicitante: <span className="text-[#334155] font-bold">{formData.responsavel || "Não informado"}</span></p>
                        <p className="text-slate-400 font-medium">Setor: <span className="text-[#334155] font-bold">{formData.setor || "Não informado"}</span></p>
                    </div>
                </div>

                {/* Coluna 2: Produção e Prazos */}
                <div className="space-y-4">
                    <h4 className="text-[#4f46e5] font-black uppercase text-[10px] tracking-[0.2em] border-b border-slate-50 pb-3">
                        Produção e Prazos
                    </h4>
                    <div className="space-y-2 text-sm">
                        <p className="text-slate-400 font-medium">Distribuição: <span className="text-[#334155] font-bold">{formData.distribuicao || "Não informado"}</span></p>
                        <p className="text-slate-400 font-medium">Entrega: <span className="text-[#334155] font-bold">{formData.dataLimite ? new Date(formData.dataLimite).toLocaleDateString("pt-BR") : "Não informado"}</span></p>
                        <p className="text-slate-400 font-medium">Pessoas em cena: <span className="text-[#334155] font-bold">{formData.pessoas || "0"}</span></p>
                        <p className="text-slate-400 font-medium">Acessibilidade: <span className="text-[#334155] font-bold">{formData.acessibilidade ? ACESSIBILIDADE_LABELS[formData.acessibilidade] : "Não informado"}</span></p>
                    </div>
                </div>

                {/* Bloco de Descrição (Largura Total) */}
                <div className="md:col-span-2 space-y-4 pt-4 border-t border-slate-50">
                    <h4 className="text-[#4f46e5] font-black uppercase text-[10px] tracking-[0.2em] pb-1">
                        Descrição e Observações
                    </h4>
                    <div className="bg-[#F8FAFC] p-6 rounded-3xl border border-slate-100">
                        <p className="text-sm text-slate-600 italic leading-relaxed">
                            {formData.descricao || "Sem descrição informada."}
                        </p>
                        {formData.observacoes && (
                            <p className="text-sm mt-4 pt-4 border-t border-slate-200/50">
                                <span className="text-[#334155] font-black uppercase text-[9px] tracking-widest">Observações:</span>{" "}
                                <span className="text-slate-600">{formData.observacoes}</span>
                            </p>
                        )}
                    </div>
                </div>

                {/* Arquivos anexados */}
                <div className="md:col-span-2 flex flex-wrap gap-3 pt-2">
                    {formData.thumbnail && (
                        <div className="text-[9px] font-black uppercase tracking-widest bg-indigo-50 text-[#4f46e5] px-4 py-2 rounded-full border border-indigo-100 flex items-center gap-2 shadow-sm">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#4f46e5]"></span>
                            ✓ Capa anexada
                        </div>
                    )}
                    {formData.roteiro && (
                        <div className="text-[9px] font-black uppercase tracking-widest bg-emerald-50 text-emerald-600 px-4 py-2 rounded-full border border-emerald-100 flex items-center gap-2 shadow-sm">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                            ✓ Roteiro anexado
                        </div>
                    )}
                </div>
            </div>

            {/* Navegação Inferior */}
            <div className="flex justify-between mt-12 pt-8 border-t border-slate-100">
                <button
                    className="rounded-2xl border border-slate-200 bg-white px-10 py-5 text-xs font-black text-slate-400 uppercase tracking-widest transition-all hover:bg-slate-50"
                    type="button"
                    onClick={() => {
                        setPassoAtual(4);
                    }}
                >
                    ← Ajustar
                </button>
                <button
                    className="rounded-[1.25rem] bg-[#4f46e5] px-14 py-5 text-xs font-black text-white shadow-xl shadow-indigo-100 uppercase tracking-widest active:scale-95 transition-all hover:bg-[#3730a3]"
                    type="button"
                    onClick={handleConfirmar}
                >
                    Confirmar e Gerar Card
                </button>
            </div>
            <Footer />
        </div>
    );
}