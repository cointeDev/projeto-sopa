/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Check, X, RotateCcw, User, Calendar, MessageSquare, Clock, Mail, Layout, Globe, Briefcase } from "lucide-react";
import type { Solicitacao } from "../../pages/GestorLocal";

interface Props {
    solicitacoes: Array<Solicitacao>;
    onAceitar: (sol: Solicitacao) => void;
    setSolicitacoes: React.Dispatch<React.SetStateAction<Array<Solicitacao>>>;
}

export function SolicitacoesTab({ solicitacoes, onAceitar, setSolicitacoes }: Props) {
    const handleStatus = (id: string, status: "Recusado" | "Devolvido") => {
        setSolicitacoes((previous) => {
            return previous.map((item) => { return item.id === id ? { ...item, status } : item; });
        });
    };

    const itensVisiveis = solicitacoes.filter(s => { return s.status === "Pendente" || s.status === "Devolvido"; });

    return (
        <div className="p-8 space-y-6">
            <div className="flex flex-col gap-1 mb-8">
                <h2 className="text-2xl font-black text-white uppercase tracking-tighter">Triagem de Projetos</h2>
                <p className="text-xs text-indigo-400 uppercase font-bold tracking-[0.2em]">Avalie demandas externas ou acompanhe retornos</p>
            </div>

            <div className="grid grid-cols-1 gap-6">
                {itensVisiveis.length === 0 ? (
                    <div className="text-center py-20 bg-[#0F111A] rounded-3xl border border-dashed border-white/10 text-[#B4B9C7] text-sm font-bold uppercase">
                        Nenhuma solicitação ativa no momento
                    </div>
                ) : (
                    itensVisiveis.map((sol) => (
                        <div key={sol.id} className={`bg-[#0F111A] rounded-2xl border p-8 transition-all ${sol.status === 'Devolvido' ? 'border-amber-500/20 opacity-80' : 'border-white/5 hover:border-indigo-500/30'}`}>
                            <div className="flex items-start justify-between gap-8">
                                <div className="space-y-6 flex-1">
                                    <div className="flex items-center gap-3">
                                        <span className="bg-indigo-500/10 text-indigo-400 text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-widest border border-indigo-500/20">
                                            Token: {sol.token}
                                        </span>
                                        {sol.status === "Devolvido" && (
                                            <span className="bg-amber-500/10 text-amber-500 text-[9px] font-black px-3 py-1 rounded-full uppercase flex items-center gap-1.5 border border-amber-500/20">
                                                <Clock size={12} /> Aguardando Retorno do Solicitante
                                            </span>
                                        )}
                                    </div>

                                    <div>
                                        <h3 className="text-2xl font-black text-white uppercase tracking-tight mb-1">{sol.titulo}</h3>
                                        <p className="text-indigo-400 text-xs font-bold uppercase tracking-[0.2em]">{sol.formato} · {sol.tipoProducao}</p>
                                    </div>
                                    
                                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 bg-white/5 p-6 rounded-2xl border border-white/5">
                                        <div className="space-y-1">
                                            <span className="text-[9px] font-black text-[#B4B9C7] uppercase">Solicitante</span>
                                            <div className="flex items-center gap-2 text-sm font-bold text-white"><User className="text-indigo-400" size={14} /> {sol.responsavel}</div>
                                            <div className="flex items-center gap-2 text-[10px] text-[#B4B9C7]"><Mail size={12} /> {sol.emailSolicitante}</div>
                                        </div>
                                        <div className="space-y-1">
                                            <span className="text-[9px] font-black text-[#B4B9C7] uppercase">Origem</span>
                                            <div className="flex items-center gap-2 text-sm font-bold text-white"><Briefcase className="text-indigo-400" size={14} /> {sol.setor}</div>
                                            <div className="flex items-center gap-2 text-[10px] text-[#B4B9C7]"><Layout size={12} /> {sol.projeto}</div>
                                        </div>
                                        <div className="space-y-1">
                                            <span className="text-[9px] font-black text-[#B4B9C7] uppercase">Distribuição</span>
                                            <div className="flex items-center gap-2 text-sm font-bold text-white"><Globe className="text-indigo-400" size={14} /> {sol.distribuicao}</div>
                                        </div>
                                        <div className="space-y-1">
                                            <span className="text-[9px] font-black text-[#B4B9C7] uppercase">Prazo Desejado</span>
                                            <div className="flex items-center gap-2 text-sm font-bold text-red-400"><Calendar size={14} /> {sol.dataLimite ? new Date(sol.dataLimite).toLocaleDateString() : "N/A"}</div>
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <span className="text-[9px] font-black text-[#B4B9C7] uppercase tracking-widest">Descrição do Material</span>
                                        <p className="text-sm text-[#B4B9C7] leading-relaxed italic bg-white/5 p-4 rounded-xl flex gap-2">
                                            <MessageSquare className="shrink-0 text-indigo-400" size={16} />
                                            "{sol.descricao}"
                                        </p>
                                    </div>
                                </div>

                                {sol.status === "Pendente" && (
                                    <div className="flex flex-col gap-2 ml-6">
                                        <button className="flex items-center justify-center gap-2 bg-emerald-500 hover:bg-emerald-400 text-white font-black text-[10px] uppercase px-6 py-4 rounded-xl transition-all shadow-lg shadow-emerald-500/20" type="button" onClick={() => { onAceitar(sol); }}>
                                            <Check size={16} /> Aceitar Projeto
                                        </button>
                                        <button className="flex items-center justify-center gap-2 bg-white/5 hover:bg-amber-500/20 text-amber-400 font-black text-[10px] uppercase px-6 py-3 rounded-xl border border-white/5" type="button" onClick={() => { handleStatus(sol.id, "Devolvido"); }}>
                                            <RotateCcw size={14} /> Devolver
                                        </button>
                                        <button className="flex items-center justify-center gap-2 bg-white/5 hover:bg-red-500/20 text-red-400 font-black text-[10px] uppercase px-6 py-3 rounded-xl border border-white/5" type="button" onClick={() => { handleStatus(sol.id, "Recusado"); }}>
                                            <X size={14} /> Recusar
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}