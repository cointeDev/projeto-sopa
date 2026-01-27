/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { useState } from "react";
import { Users } from "lucide-react";

import { CreateCardModal } from "../components/management/CreateCardModal";
import { QuadroProduction } from "../components/management/QuadroProduction";
import { ManageTeamModal } from "../components/management/ManageTeamModal";
import Agenda from "../components/management/Agenda";
import Diario from "../components/management/Diario";
import Dashboard from "../components/management/Dashboard";

// Interfaces exportadas para que o QuadroProduction as reconheça
export interface Card {
    id: string;
    etapa: string; 
    titulo: string;
    responsavel: string;
    acessibilidade: Array<string>;
    projeto?: string;
    tipoProducao?: string;
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

    // Tipagem explícita para o parâmetro para satisfazer o ESLint
    const handleCreateCard = (dadosNovoCard: Omit<Card, "id" | "etapa" | "acessibilidade">) => {
        const novoCard: Card = {
            ...dadosNovoCard,
            id: Math.random().toString(36).substring(2, 9),
            etapa: "Standby",
            acessibilidade: []
        };
        
        setCards((previous: Array<Card>) => [...previous, novoCard]);
        setIsModalOpen(false);
    };

    return (
        <div className="min-h-screen bg-[#0F111A] px-4 py-6 font-inter text-white">
            <div className="w-full bg-[#161825] rounded-2xl shadow-2xl overflow-hidden border border-white/5 flex flex-col h-[92vh]">
                
                <header className="flex items-center justify-between border-b border-white/10 px-8 py-4">
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
                                className={`pb-2 text-sm font-bold transition ${
                                    abaAtual === item.key 
                                        ? "text-indigo-400 border-b-2 border-indigo-400" 
                                        : "text-[#B4B9C7] hover:text-white"
                                }`}
                                onClick={() => { setAbaAtual(item.key as Aba); }}
                            >
                                {item.label}
                            </button>
                        ))}
                    </nav>

                    <div className="flex gap-4">
                        <button 
                            className="flex items-center gap-2 text-[#B4B9C7] hover:text-indigo-400 text-sm font-bold transition"
                            type="button"
                            onClick={() => { setIsTeamModalOpen(true); }}
                        >
                            <Users size={18} /> Equipe
                        </button>
                        
                        <button 
                            className="rounded-xl bg-indigo-500 px-4 py-2 text-sm font-bold hover:bg-indigo-400 transition" 
                            type="button"
                            onClick={() => { setIsModalOpen(true); }}
                        >
                            + Novo Card
                        </button>
                    </div>
                </header>

                <main className="p-6 flex-1 overflow-hidden">
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

            {isModalOpen && (
                <CreateCardModal 
                    onClose={() => { setIsModalOpen(false); }} 
                    onSave={handleCreateCard} 
                />
            )}

            {isTeamModalOpen && (
                <ManageTeamModal 
                    funcionarios={funcionarios}
                    setFuncionarios={setFuncionarios}
                    onClose={() => { setIsTeamModalOpen(false); }}
                />
            )}
        </div>
    );
}