/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { useState } from "react";
import { Inbox } from "lucide-react";

import { CreateCardModal } from "../components/management/CreateCardModal";
import { QuadroProduction } from "../components/management/QuadroProduction";
import { ManageTeamModal } from "../components/management/ManageTeamModal";
import { SolicitacoesTab } from "../components/management/SolicitacoesTab";
import { CardDetailModal } from "../components/management/CardDetailModal";
import Agenda from "../components/management/Agenda";
import Diario from "../components/management/Diario";
import Dashboard from "../components/management/Dashboard";

export type Aba = "dashboard" | "quadro" | "solicitacoes" | "agenda" | "diario";

export interface Projeto {
    id: string;
    nome: string;
    etapas: Array<string>;
}

export interface Card {
    id: string;
    etapa: string; 
    titulo: string;
    responsavel: string;
    contato?: string;
    setor: string;
    projeto: string;
    nucleo: string;
    etiquetas?: Array<string>;
    tipoProducao: string;
    formato?: string;
    fluxoEtapas?: Array<string>;
    caracteristicas?: { participantes?: number; transmissaoAoVivo?: boolean; plataforma?: string; };
    acessibilidade?: { libras?: { ativa: boolean; interprete?: string }; legendagem?: { ativa: boolean; legendista?: string }; audiodescricao?: { ativa: boolean }; };
    equipe?: { produtor?: string; editor?: string; revisor?: string; };
    roteiro?: { texto?: string; link?: string };
    anexos?: Array<{ nome: string; url: string }>;
    prazos?: { gravacao?: string; inicioEdicao?: string; publicacao?: string; };
}

export interface Solicitacao extends Omit<Card, "id" | "etapa"> {
    id: string;
    token: string;
    status: "Pendente" | "Aceito" | "Recusado" | "Devolvido";
    dataCriacao: string;
    descricao?: string;
}

export interface Funcionario {
    id: string;
    nome: string;
    cargo: "Editor" | "Cinegrafista" | "Designer" | "Libras" | "Gestor";
}

export default function GestorLocal() {
    const [abaAtual, setAbaAtual] = useState<Aba>("quadro");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isTeamModalOpen, setIsTeamModalOpen] = useState(false);
    const [selectedCard, setSelectedCard] = useState<Card | null>(null);
    const [cards, setCards] = useState<Array<Card>>([]);
    const [funcionarios, setFuncionarios] = useState<Array<Funcionario>>([]);
    const [solicitacoes, setSolicitacoes] = useState<Array<Solicitacao>>([]); 
    const [visaoQuadro, setVisaoQuadro] = useState<"geral" | "focada">("geral");

    const [projetos, setProjetos] = useState<Array<Projeto>>([
        { id: "1", nome: "Se Liga no Enem", etapas: ["Standby", "Para Produção Semanal", "Gravação", "Edição 1", "Concluído", "Publicado"] }
    ]);

    const handleCreateCard = (dados: Omit<Card, "id" | "etapa">) => {
        const novoCard: Card = { ...dados, id: Math.random().toString(36).substring(2, 9), etapa: "Standby" };
        setCards((previous) => [...previous, novoCard]);
        setIsModalOpen(false);
    };

    const handleCreateProject = (novoProjeto: Projeto) => {
        setProjetos((previous) => [...previous, novoProjeto]);
    };

    return (
        <div className="flex h-screen flex-col overflow-hidden bg-[#F1F5F9] font-inter text-[#334155]">
            <div className="m-4 mb-0 flex flex-1 flex-col overflow-hidden rounded-t-[2.5rem] border-x border-t border-slate-200 bg-white shadow-2xl shadow-slate-200/50">
                <header className="flex shrink-0 items-center justify-between border-b border-slate-100 bg-white px-10 py-5 text-left">
                    <nav className="flex gap-10">
                        {["dashboard", "quadro", "solicitacoes", "agenda", "diario"].map((key) => (
                            <button
                                key={key}
                                className={`flex items-center pb-2 text-[11px] font-black tracking-widest uppercase transition-all ${abaAtual === key ? "border-b-2 border-[#4f46e5] text-[#4f46e5]" : "text-slate-400 hover:text-slate-600"}`}
                                type="button"
                                onClick={() => { setAbaAtual(key as Aba); }}
                            >
                                {key === "solicitacoes" && <Inbox className="mr-2" size={12} />}
                                {key}
                            </button>
                        ))}
                    </nav>
                    <div className="flex gap-4">
                        <button className="text-[11px] font-black uppercase text-slate-500 hover:text-[#4f46e5]" type="button" onClick={() => { setIsTeamModalOpen(true); }}>EQUIPE</button>
                        <button className="rounded-2xl bg-[#4f46e5] px-8 py-3 text-[11px] font-black text-white shadow-xl shadow-indigo-100 transition-all hover:bg-[#3730a3]" type="button" onClick={() => { setIsModalOpen(true); }}>+ NOVO CARD</button>
                    </div>
                </header>

                <main className={`bg-[#F8FAFC] flex-1 min-h-0 ${abaAtual === "quadro" ? "overflow-hidden" : "overflow-y-auto"} custom-scrollbar`}>
                    {abaAtual === "dashboard" && <Dashboard cards={cards} />}
                    {abaAtual === "quadro" && (
                        <QuadroProduction 
                            cards={cards} 
                            projetos={projetos}
                            setCards={setCards}
                            setVisaoQuadro={setVisaoQuadro} 
                            visaoQuadro={visaoQuadro} 
                            onCardClick={(card: Card) => { setSelectedCard(card); }} 
                        />
                    )}
                    {abaAtual === "solicitacoes" && (
                        <SolicitacoesTab 
                            setSolicitacoes={setSolicitacoes} 
                            solicitacoes={solicitacoes} 
                            onAceitar={(sol: Solicitacao) => { 
                                setCards((previous) => [...previous, { ...sol, id: Math.random().toString(36), etapa: "Standby" }]); 
                                setAbaAtual("quadro"); 
                            }} 
                        />
                    )}
                    {abaAtual === "agenda" && <Agenda scope="geral" />}
                    {abaAtual === "diario" && <Diario />}
                </main>
            </div>
            {selectedCard && <CardDetailModal card={selectedCard} onClose={() => { setSelectedCard(null); }} />}
            {isModalOpen && (
                <CreateCardModal 
                    projetosAtuais={projetos} 
                    onClose={() => { setIsModalOpen(false); }} 
                    onCreateProject={handleCreateProject}
                    onSave={handleCreateCard}
                />
            )}
            {isTeamModalOpen && <ManageTeamModal funcionarios={funcionarios} setFuncionarios={setFuncionarios} onClose={() => { setIsTeamModalOpen(false); }} />}
        </div>
    );
}