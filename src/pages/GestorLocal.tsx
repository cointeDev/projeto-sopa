/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { useState } from "react";
import { Users, Cpu, UserCheck, Plus, Inbox } from "lucide-react";

import { CreateCardModal } from "../components/management/CreateCardModal";
import { QuadroProduction } from "../components/management/QuadroProduction";
import { ManageTeamModal } from "../components/management/ManageTeamModal";
import { SolicitacoesTab } from "../components/management/SolicitacoesTab";
import Agenda from "../components/management/Agenda";
import Diario from "../components/management/Diario";
import Dashboard from "../components/management/Dashboard";

export interface Card {
    id: string;
    etapa: string; 
    titulo: string;
    responsavel: string;
    emailSolicitante?: string; 
    telefoneSolicitante?: string; // Adicionado do Step 1
    setor?: string;           
    projeto?: string;
    tipoProducao?: string;
    formato?: string;         
    localGravacao?: string;
    localExterno?: string; // Adicionado do Step 1
    dataGravacao?: string;
    horaGravacao?: string;    
    duracaoMinutos?: number;
    acessibilidade: Array<string>; 
    libras?: boolean; 
    legendas?: boolean; 
    distribuicao?: string;    
    dataLimite?: string;      
    pessoasEmCena?: number;   
    descricao?: string; 
    observacoes?: string;     
    responsavelAtualId?: string;
}

export interface Solicitacao extends Omit<Card, "id" | "etapa"> {
    id: string;
    token: string;
    status: "Pendente" | "Aceito" | "Recusado" | "Devolvido";
    dataCriacao: string;
}

export interface Funcionario {
    id: string;
    nome: string;
    cargo: "Editor" | "Cinegrafista" | "Designer" | "Libras" | "Gestor";
}

type Aba = "dashboard" | "quadro" | "solicitacoes" | "agenda" | "diario";

export default function GestorLocal() {
    const [abaAtual, setAbaAtual] = useState<Aba>("quadro");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isTeamModalOpen, setIsTeamModalOpen] = useState(false);
    
    const [cards, setCards] = useState<Array<Card>>([]);
    const [funcionarios, setFuncionarios] = useState<Array<Funcionario>>([]);
    const [visaoQuadro, setVisaoQuadro] = useState<"geral" | "focada">("geral");
    
    const [solicitacoes, setSolicitacoes] = useState<Array<Solicitacao>>([]);

    const handleCreateCard = (dadosNovoCard: Omit<Card, "id" | "etapa">) => {
        const novoCard: Card = {
            ...dadosNovoCard,
            id: Math.random().toString(36).substring(2, 9),
            etapa: "Standby",
        };
        setCards((previous) => { return [...previous, novoCard]; });
        setIsModalOpen(false);
    };

    const aceitarSolicitacao = (sol: Solicitacao) => {
        const novoCard: Card = {
            ...sol,
            id: Math.random().toString(36).substring(2, 9),
            etapa: "Standby",
        };
        setCards((previous) => { return [...previous, novoCard]; });
        setSolicitacoes((previous) => {
            return previous.map(item => item.id === sol.id ? { ...item, status: "Aceito" } : item);
        });
        setAbaAtual("quadro");
    };

    return (
        <div className="flex flex-col h-screen bg-[#0F111A] overflow-hidden font-inter text-white">
            <div className="flex flex-col flex-1 bg-[#161825] m-4 mb-0 rounded-t-3xl border-t border-x border-white/5 overflow-hidden shadow-2xl">
                <header className="shrink-0 flex items-center justify-between border-b border-white/10 px-8 py-4 bg-[#161825]">
                    <nav className="flex gap-8">
                        {[
                            { key: "dashboard", label: "Dashboard", icon: null },
                            { key: "quadro", label: "Quadro", icon: null },
                            { key: "solicitacoes", label: "Solicitações", icon: <Inbox className="mr-1.5" size={12} /> },
                            { key: "agenda", label: "Agenda", icon: null },
                            { key: "diario", label: "Diário", icon: null },
                        ].map((item) => (
                            <div key={item.key} className="relative">
                                <button
                                    type="button"
                                    className={`pb-2 text-[10px] font-black uppercase tracking-widest transition-all flex items-center ${
                                        abaAtual === item.key ? "text-indigo-400 border-b-2 border-indigo-400" : "text-[#B4B9C7]"
                                    }`}
                                    onClick={() => { setAbaAtual(item.key as Aba); }}
                                >
                                    {item.icon}{item.label}
                                </button>
                                {item.key === "solicitacoes" && solicitacoes.filter(s => s.status === "Pendente").length > 0 && (
                                    <span className="absolute -top-2 -right-3 bg-red-500 text-white text-[8px] font-black px-1.5 py-0.5 rounded-full animate-pulse">
                                        {solicitacoes.filter(s => s.status === "Pendente").length}
                                    </span>
                                )}
                            </div>
                        ))}
                    </nav>

                    <div className="flex gap-4">
                        <button className="flex items-center gap-2 text-[#B4B9C7] text-[10px] font-black uppercase hover:text-white transition-colors" type="button" onClick={() => { setIsTeamModalOpen(true); }}>
                            <Users size={14} /> Equipe
                        </button>
                        <button className="rounded-xl bg-indigo-500 px-5 py-2 text-[10px] font-black uppercase shadow-lg shadow-indigo-500/20 hover:bg-indigo-400 transition-all flex items-center gap-2" type="button" onClick={() => { setIsModalOpen(true); }}>
                            <Plus size={14} /> Novo Card
                        </button>
                    </div>
                </header>

                <main className={`flex-1 min-h-0 ${abaAtual === "quadro" ? "overflow-hidden" : "overflow-y-auto"} custom-scrollbar`}>
                    {abaAtual === "dashboard" && <Dashboard cards={cards} />}
                    {abaAtual === "quadro" && (
                        <QuadroProduction 
                            cards={cards} 
                            funcionarios={funcionarios} 
                            setCards={setCards} 
                            setVisaoQuadro={setVisaoQuadro} 
                            visaoQuadro={visaoQuadro} 
                        />
                    )}
                    {abaAtual === "solicitacoes" && (
                        <SolicitacoesTab setSolicitacoes={setSolicitacoes} solicitacoes={solicitacoes} onAceitar={aceitarSolicitacao} />
                    )}
                    {abaAtual === "agenda" && <Agenda scope="geral" />}
                    {abaAtual === "diario" && <Diario />}
                </main>
            </div>

            <footer className="shrink-0 h-10 bg-[#0F111A] border-t border-white/5 px-10 flex items-center justify-between z-50">
                <div className="flex items-center gap-6">
                    <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
                        <span className="text-[9px] font-black uppercase tracking-[0.2em] text-emerald-500">Estúdio Online</span>
                    </div>
                    <div className="h-3 w-px bg-white/10"></div>
                    <div className="flex items-center gap-2 text-[#B4B9C7]">
                        <UserCheck className="text-indigo-400" size={12} />
                        <span className="text-[9px] font-bold uppercase tracking-widest">Sessão: Gestor Local</span>
                    </div>
                </div>
                <div className="flex items-center gap-6">
                    <div className="flex items-center gap-2 px-2 py-0.5 bg-white/5 rounded border border-white/5">
                        <Cpu className="text-indigo-400" size={10} />
                        <span className="text-[9px] font-black text-white/40 uppercase tracking-[0.2em]">SOPA v1.0.4</span>
                    </div>
                </div>
            </footer>

            {isModalOpen && <CreateCardModal onClose={() => { setIsModalOpen(false); }} onSave={handleCreateCard} />}
            {isTeamModalOpen && <ManageTeamModal funcionarios={funcionarios} setFuncionarios={setFuncionarios} onClose={() => { setIsTeamModalOpen(false); }} />}
        </div>
    );
}