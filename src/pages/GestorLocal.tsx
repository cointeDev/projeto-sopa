/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { useState } from "react";
import { CreateCardModal } from "../components/Management/CreateCardModal";
import { QuadroProduction } from "../components/Management/QuadroProduction";
import { ManageTeamModal } from "../components/Management/ManagementTeamModal";
import Agenda from "../components/Management/Agenda";
import Diario from "../components/Management/Diario";
import Dashboard from "../components/Management/Dashboard";
import { Users } from "lucide-react"; // Ícone para o botão de equipe

export interface Funcionario {
    id: string;
    nome: string;
    cargo: "Editor" | "Cinegrafista" | "Designer" | "Libras" | "Gestor";
}

export interface Card {
    id: string;
    etapa: string;
    titulo: string;
    responsavel: string;
    email: string;
    setor: string;
    telefone: string;
    localGravacao: string;
    dataGravacao: string;
    horaGravacao: string;
    limiteEntrega: string;
    tipoProducao: string;
    formatoEspecifico: string;
    projeto: string;
    disciplina: string;
    duracaoMinutos: number;
    isAoVivo: boolean;
    dataConclusao?: string;
    libras: boolean;
    legendas: boolean;
    descricao: string;
    equipe: number;
    arquivo?: File;
    acessibilidade: Array<string>; 
    responsavelAtualId?: string;
    historicoResponsaveis?: Array<{ etapa: string; funcionarioId: string; data: string }>;
}

type Aba = "dashboard" | "quadro" | "agenda" | "diario";

export default function GestorLocal() {
    const [abaAtual, setAbaAtual] = useState<Aba>("quadro");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isTeamModalOpen, setIsTeamModalOpen] = useState(false); // Estado para o modal de equipe
    const [cards, setCards] = useState<Array<Card>>([]);
    const [funcionarios, setFuncionarios] = useState<Array<Funcionario>>([]); // setFuncionarios adicionado

    const handleCreateCard = (dadosNovoCard: Omit<Card, "id" | "etapa" | "acessibilidade">) => {
        const tagsAcessibilidade: Array<string> = [];
        if (dadosNovoCard.libras) tagsAcessibilidade.push("Libras");
        if (dadosNovoCard.legendas) tagsAcessibilidade.push("Legendas");

        const novoCard: Card = {
            ...dadosNovoCard,
            id: Math.random().toString(36).substring(2, 9),
            etapa: "Standby",
            acessibilidade: tagsAcessibilidade
        };
        setCards((previous) => [...previous, novoCard]);
        setIsModalOpen(false);
    };

    return (
        <div className="min-h-screen bg-[#0F111A] px-6 py-10 font-inter text-white">
            <div className="max-w-7xl mx-auto bg-[#161825] rounded-2xl shadow-2xl overflow-hidden border border-white/5">
                <header className="flex items-center justify-between border-b border-white/10 px-10 py-6">
                    <nav className="flex gap-8">
                        {[
                            { key: "dashboard", label: "Dashboard" },
                            { key: "quadro", label: "Quadro de Produção" },
                            { key: "agenda", label: "Agenda" },
                            { key: "diario", label: "Diário" },
                        ].map((item) => (
                            <button
                                key={item.key}
                                className={`pb-2 text-sm font-bold transition ${abaAtual === item.key ? "text-indigo-400 border-b-2 border-indigo-400" : "text-[#B4B9C7] hover:text-white"}`}
                                type="button"
                                onClick={() => { setAbaAtual(item.key as Aba); }}
                            >
                                {item.label}
                            </button>
                        ))}
                    </nav>
                    
                    <div className="flex items-center gap-4">
                        {/* Botão de Gestão de Equipe */}
                        <button 
                            className="flex items-center gap-2 text-[#B4B9C7] hover:text-indigo-400 text-sm font-bold transition-colors"
                            type="button"
                            onClick={() => { setIsTeamModalOpen(true); }}
                        >
                            <Users size={18} />
                            Equipe
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

                <div className="p-10">
                    {abaAtual === "dashboard" && <Dashboard cards={cards} />}
                    {abaAtual === "quadro" && (
                        <QuadroProduction 
                            cards={cards} 
                            funcionarios={funcionarios} 
                            setCards={setCards} 
                            setVisaoQuadro={() => {}} 
                            visaoQuadro="geral" 
                        />
                    )}
                    {abaAtual === "agenda" && <Agenda scope="geral" />}
                    {abaAtual === "diario" && <Diario />}
                </div>
            </div>

            {/* Modais */}
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