/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { useState } from "react";
import { Users, Cpu, Radio } from "lucide-react";

import { CreateCardModal } from "../components/management/CreateCardModal";
import { QuadroProduction } from "../components/management/QuadroProduction";
import { ManageTeamModal } from "../components/management/ManageTeamModal";
import Agenda from "../components/management/Agenda";
import Diario from "../components/management/Diario";
import Dashboard from "../components/management/Dashboard";

export interface Card {
    id: string;
    etapa: string; 
    titulo: string;
    responsavel: string;
    acessibilidade: Array<string>;
    projeto?: string;
    tipoProducao?: string;
    descricao?: string; 
    dataGravacao?: string;
    libras?: boolean;
    legendas?: boolean;
    duracaoMinutos?: number;
    localGravacao?: string;
    responsavelAtualId?: string;
    historicoResponsaveis?: Array<{ etapa: string; funcionarioId: string; data: string }>;
}

export interface Funcionario {
    id: string;
    nome: string;
    cargo: "Editor" | "Cinegrafista" | "Designer" | "Libras" | "Gestor";
}

type Aba = "dashboard" | "quadro" | "agenda" | "diario";

export default function GestorLocal() {
    const [abaAtual, setAbaAtual] = useState<Aba>("quadro");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isTeamModalOpen, setIsTeamModalOpen] = useState(false);
    const [cards, setCards] = useState<Array<Card>>([]);
    const [funcionarios, setFuncionarios] = useState<Array<Funcionario>>([]);
    const [visaoQuadro, setVisaoQuadro] = useState<"geral" | "focada">("geral");

    // Correção do erro TS(2322): parâmetro agora inclui 'acessibilidade' para compatibilidade
    const handleCreateCard = (dadosNovoCard: Omit<Card, "id" | "etapa">) => {
        const novoCard: Card = {
            ...dadosNovoCard,
            id: Math.random().toString(36).substring(2, 9),
            etapa: "Standby",
        };
        
        setCards((previous: Array<Card>) => [...previous, novoCard]);
        setIsModalOpen(false);
    };

    return (
        <div className="flex flex-col min-h-screen bg-[#0F111A] px-4 py-6 font-inter text-white relative overflow-hidden">
            <div className="flex flex-col w-full bg-[#161825] rounded-2xl shadow-2xl overflow-hidden border border-white/5 h-[92vh] relative">
                <header className="shrink-0 flex items-center justify-between border-b border-white/10 px-8 py-4 bg-[#161825]">
                    <nav className="flex gap-8">
                        {[
                            { key: "dashboard", label: "Dashboard" },
                            { key: "quadro", label: "Quadro de Produção" },
                            { key: "agenda", label: "Agenda" },
                            { key: "diario", label: "Diário" },
                        ].map((item) => (
                            <button
                                key={item.key}
                                type="button"
                                className={`pb-2 text-[10px] font-black uppercase tracking-widest transition-all ${
                                    abaAtual === item.key ? "text-indigo-400 border-b-2 border-indigo-400" : "text-[#B4B9C7]"
                                }`}
                                onClick={() => { setAbaAtual(item.key as Aba); }}
                            >
                                {item.label}
                            </button>
                        ))}
                    </nav>

                    <div className="flex gap-4">
                        <button className="flex items-center gap-2 text-[#B4B9C7] text-[10px] font-black uppercase tracking-widest" type="button" onClick={() => { setIsTeamModalOpen(true); }}>
                            <Users size={14} /> Equipe
                        </button>
                        <button className="rounded-xl bg-indigo-500 px-5 py-2 text-[10px] font-black uppercase tracking-widest shadow-lg shadow-indigo-500/20" type="button" onClick={() => { setIsModalOpen(true); }}>
                            + Novo Card
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
                    {abaAtual === "agenda" && <Agenda scope="geral" />}
                    {abaAtual === "diario" && <Diario />}
                </main>
            </div>

            {/* BARRA FLUTUANTE ESTILO TRELLO (Status Bar) */}
            <div className="fixed bottom-10 left-1/2 -translate-x-1/2 z-50">
                <div className="flex items-center gap-6 bg-[#161825]/80 backdrop-blur-xl border border-white/10 px-6 py-3 rounded-full shadow-[0_8px_32px_rgba(0,0,0,0.5)]">
                    <div className="flex items-center gap-3">
                        <div className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                        </div>
                        <span className="text-[9px] font-black uppercase tracking-[0.2em] text-emerald-500">Estúdio Online</span>
                    </div>
                    <div className="h-4 w-px bg-white/10"></div>
                    <div className="flex items-center gap-4 text-[#B4B9C7]">
                        <div className="flex items-center gap-2">
                            <Cpu className="text-indigo-400" size={12} />
                            <span className="text-[9px] font-black uppercase tracking-widest">SOPA v1.0.4</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Radio className="text-indigo-400" size={12} />
                            <span className="text-[9px] font-black uppercase tracking-widest">SEEC / RN</span>
                        </div>
                    </div>
                </div>
            </div>

            {isModalOpen && <CreateCardModal onClose={() => { setIsModalOpen(false); }} onSave={handleCreateCard} />}
            {isTeamModalOpen && <ManageTeamModal funcionarios={funcionarios} setFuncionarios={setFuncionarios} onClose={() => { setIsTeamModalOpen(false); }} />}
        </div>
    );
}