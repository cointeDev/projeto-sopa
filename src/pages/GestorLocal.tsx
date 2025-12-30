/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { CreateCardModal } from "../components/management/CreateCardModal";
import { QuadroProduction } from "../components/management/QuadroProduction";
import Agenda from "../components/management/Agenda";
import Diario from "../components/management/Diario";

// Interface unificada e exportada para todo o sistema
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
    limiteEntrega: string;
    tipoProducao: string;
    formatoEspecifico: string;
    libras: boolean;
    legendas: boolean;
    descricao: string;
    equipe: number;
    arquivo?: File;
    acessibilidade: Array<string>; 
}

type Aba = "dashboard" | "quadro" | "agenda" | "diario";
type VisaoQuadro = "geral" | "focada";

export default function GestorLocal() {
    const [abaAtual, setAbaAtual] = useState<Aba>("quadro");
    const [visaoQuadro, setVisaoQuadro] = useState<VisaoQuadro>("geral");
    const [isModalOpen, setIsModalOpen] = useState(false);

    const [cards, setCards] = useState<Array<Card>>([
        { 
            id: "1", 
            titulo: "Vídeoaula IA na Educação", 
            responsavel: "Toshi", 
            email: "toshi@edu.rn.gov.br", 
            etapa: "Standby", 
            setor: "RIEH",
            telefone: "8499999999",
            localGravacao: "Natal",
            dataGravacao: "2025-11-20",
            limiteEntrega: "2025-12-01",
            tipoProducao: "Videoaula",
            formatoEspecifico: "Gravação de programa",
            libras: true,
            legendas: false,
            descricao: "Aula inicial sobre IA",
            equipe: 2,
            acessibilidade: ["Libras"] 
        },
    ]);

    const handleCreateCard = (dadosNovoCard: Omit<Card, "id" | "etapa" | "acessibilidade">) => {
        // Correção: Alterado de string[] para Array<string> conforme regra de Lint
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

    function getGreeting() {
        const h = new Date().getHours();
        if (h < 12) return "Bom dia";
        if (h < 18) return "Boa tarde";
        return "Boa noite";
    }

    return (
        <div className="min-h-screen bg-[#0F111A] px-6 py-10 font-inter text-white">
            <div className="max-w-7xl mx-auto bg-[#161825] rounded-2xl shadow-[0_20px_60px_-15px_rgba(0,0,0,0.6)] overflow-hidden">
                <header className="flex items-center justify-between border-b border-white/10 px-10 py-6">
                    <nav className="flex gap-8">
                        {[
                            { key: "dashboard", label: "Dashboard" },
                            { key: "quadro", label: "Quadro de Produção" },
                            { key: "agenda", label: "Agenda do Estúdio" },
                            { key: "diario", label: "Diário do Estúdio" },
                        ].map((item) => (
                            <button
                                key={item.key}
                                type="button"
                                className={`pb-2 text-sm font-bold transition ${
                                    abaAtual === item.key ? "text-indigo-400 border-b-2 border-indigo-400" : "text-[#B4B9C7] hover:text-white"
                                }`}
                                onClick={() => { setAbaAtual(item.key as Aba); }}
                            >
                                {item.label}
                            </button>
                        ))}
                    </nav>

                    <div className="flex items-center gap-4">
                        <button
                            className="rounded-xl bg-indigo-500 px-4 py-2 text-sm font-bold text-white hover:bg-indigo-400 transition"
                            type="button"
                            onClick={() => { setIsModalOpen(true); }}
                        >
                            + Novo Card
                        </button>
                        <Link className="text-sm font-semibold text-[#B4B9C7] hover:text-white transition" to="/">Sair</Link>
                    </div>
                </header>

                <div className="p-10">
                    <div className="mb-10 border-b border-white/10 pb-8">
                        <h2 className="text-2xl font-extrabold text-white">{getGreeting()}, Gestor Local!</h2>
                        <p className="text-[#B4B9C7] mt-1">Aqui está o resumo do seu estúdio hoje.</p>
                    </div>

                    {abaAtual === "quadro" && (
                        <QuadroProduction
                            cards={cards}
                            setCards={setCards}
                            setVisaoQuadro={setVisaoQuadro}
                            visaoQuadro={visaoQuadro}
                        />
                    )}

                    {abaAtual === "agenda" && <Agenda scope="geral" />}
                    {abaAtual === "diario" && <Diario />}
                </div>
            </div>

            {isModalOpen && (
                <CreateCardModal 
                    onClose={() => { setIsModalOpen(false); }} 
                    onSave={handleCreateCard}
                />
            )}
        </div>
    );
}