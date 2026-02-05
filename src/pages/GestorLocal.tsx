/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { useState } from "react";
import { CreateCardModal, type NovoCardInterface } from "../components/management/CreateCardModal";
import { QuadroProduction } from "../components/management/QuadroProduction";
import { CardDetailModal } from "../components/management/CardDetailModal";
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
    projeto: string;
    etiquetas?: Array<string>;
    corDestaque?: string;
    fluxoEtapas?: Array<string>;
}

export default function GestorLocal() {
    const [abaAtual, setAbaAtual] = useState<Aba>("quadro");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedCard, setSelectedCard] = useState<Card | null>(null);
    const [cards, setCards] = useState<Array<Card>>([]);
    const [visaoQuadro, setVisaoQuadro] = useState<"geral" | "focada">("geral");
    const [projetos, setProjetos] = useState<Array<Projeto>>([
        { id: "1", nome: "Se Liga no Enem", etapas: ["STANDBY", "CONCLUÍDO"] }
    ]);

    const handleCreateProject = (novoProjeto: Projeto) => {
        setProjetos(previous => {
            const existe = previous.find(p => p.nome.toLowerCase() === novoProjeto.nome.toLowerCase());
            if (existe) return previous;
            return [...previous, novoProjeto];
        });
    };

    const handleCreateCard = (dados: NovoCardInterface) => {
        const novoCard: Card = { 
            ...dados, 
            id: Math.random().toString(36).substring(2, 9),
            etiquetas: [dados.etiquetaArea]
        };
        setCards(previous => [...previous, novoCard]);
        setIsModalOpen(false);
    };

    return (
        <div className="flex h-screen flex-col overflow-hidden bg-[#F1F5F9] font-inter text-[#334155] text-left">
            <header className="flex shrink-0 items-center justify-between border-b border-slate-100 bg-white px-10 py-5">
                <nav className="flex gap-10 font-black text-[11px] tracking-widest uppercase">
                    {(["dashboard", "quadro", "solicitacoes", "agenda", "diario"] as Array<Aba>).map((key) => (
                        <button 
                            key={key} 
                            className={`pb-2 transition-all ${abaAtual === key ? "border-b-2 border-[#4f46e5] text-[#4f46e5]" : "text-slate-400"}`} 
                            onClick={() => { setAbaAtual(key); }}
                        >
                            {key}
                        </button>
                    ))}
                </nav>
                <button 
                    className="rounded-2xl bg-[#4f46e5] px-8 py-3 text-[11px] font-black text-white shadow-xl hover:bg-[#3730a3]" 
                    onClick={() => { setIsModalOpen(true); }}
                >
                    + NOVO CARD
                </button>
            </header>

            <main className="bg-[#F8FAFC] flex-1 overflow-hidden">
                {abaAtual === "dashboard" && <div className="p-8 h-full overflow-y-auto"><Dashboard cards={cards} /></div>}
                {abaAtual === "quadro" && (
                    <QuadroProduction 
                        cards={cards} 
                        projetos={projetos}
                        setCards={setCards}
                        setVisaoQuadro={setVisaoQuadro} 
                        visaoQuadro={visaoQuadro} 
                        onCardClick={(card) => { setSelectedCard(card); }} 
                    />
                )}
            </main>
            
            {selectedCard && <CardDetailModal card={selectedCard} onClose={() => { setSelectedCard(null); }} />}
            
            {isModalOpen && (
                <CreateCardModal 
                    isOpen={isModalOpen}
                    projetosAtuais={projetos} 
                    onClose={() => { setIsModalOpen(false); }} 
                    onCreateProject={handleCreateProject}
                    onSave={handleCreateCard}
                />
            )}
        </div>
    );
}