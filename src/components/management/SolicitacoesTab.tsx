/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { User, Layout, ArrowUpRight } from "lucide-react"; 
import type { Solicitacao } from "../../pages/GestorLocal";

interface SolicitacoesTabProps {
    solicitacoes: Array<Solicitacao>;
    onAceitar: (sol: Solicitacao) => void;
    setSolicitacoes: React.Dispatch<React.SetStateAction<Array<Solicitacao>>>;
}

export function SolicitacoesTab({ solicitacoes, onAceitar, setSolicitacoes }: SolicitacoesTabProps) {
    const handleStatus = (id: string, status: "Recusado" | "Devolvido") => {
        setSolicitacoes((previous: Array<Solicitacao>) => {
            return previous.map((item: Solicitacao) => { return item.id === id ? { ...item, status } : item; });
        });
    };

    const ativos = solicitacoes.filter(s => s.status === "Pendente" || s.status === "Devolvido");

    return (
        <div className="p-12 space-y-10 text-left bg-[#F8FAFC]">
            <div className="flex flex-col gap-2">
                <h2 className="text-4xl font-black text-[#334155] uppercase tracking-tighter">Triagem de Projetos</h2>
                <p className="text-[10px] text-slate-400 uppercase font-black tracking-widest">Aprovação e encaminhamento de demandas externas</p>
            </div>
            
            <div className="grid grid-cols-1 gap-8">
                {ativos.length === 0 ? (
                    <div className="text-center py-24 bg-white rounded-[3rem] border border-dashed border-slate-200 text-slate-300 text-xs font-black uppercase tracking-[0.2em]">
                        Nenhuma solicitação aguardando análise
                    </div>
                ) : (
                    ativos.map((sol) => (
                        <div key={sol.id} className="bg-white rounded-[2.5rem] border border-slate-100 p-10 shadow-sm transition-all hover:shadow-xl hover:shadow-slate-200/50 group">
                            <div className="flex items-center justify-between gap-12">
                                <div className="space-y-8 flex-1">
                                    <div className="space-y-2">
                                        <span className="text-[9px] font-black text-[#4f46e5] uppercase tracking-[0.2em]">{sol.status}</span>
                                        <h3 className="text-3xl font-black text-[#334155] uppercase tracking-tight">{sol.titulo}</h3>
                                    </div>
                                    
                                    <div className="flex gap-6 max-w-2xl">
                                        <div className="flex-1 bg-[#F8FAFC] p-6 rounded-2xl border border-slate-50">
                                            <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest block mb-2">Solicitante</span>
                                            <div className="flex items-center gap-3 text-sm font-bold text-[#334155]">
                                                <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center border border-slate-100"><User className="text-[#4f46e5]" size={14} /></div>
                                                {sol.responsavel}
                                            </div>
                                        </div>
                                        <div className="flex-1 bg-[#F8FAFC] p-6 rounded-2xl border border-slate-50">
                                            <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest block mb-2">Projeto</span>
                                            <div className="flex items-center gap-3 text-sm font-bold text-[#334155]">
                                                <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center border border-slate-100"><Layout className="text-[#4f46e5]" size={14} /></div>
                                                {sol.projeto}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                
                                <div className="flex flex-col gap-3 min-w-[200px]">
                                    <button 
                                        className="bg-[#4f46e5] text-white font-black text-[10px] uppercase px-8 py-5 rounded-2xl shadow-xl shadow-indigo-100 hover:bg-[#3730a3] transition-all flex items-center justify-center gap-2 group-hover:scale-105" 
                                        type="button" 
                                        onClick={() => { onAceitar(sol); }}
                                    >
                                        Aceitar Projeto <ArrowUpRight size={16} />
                                    </button>
                                    <button 
                                        className="bg-white text-slate-400 font-black text-[10px] uppercase px-8 py-4 rounded-2xl border border-slate-100 hover:bg-red-50 hover:text-red-500 hover:border-red-100 transition-all" 
                                        type="button" 
                                        onClick={() => { handleStatus(sol.id, "Devolvido"); }}
                                    >
                                        Devolver para ajustes
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}