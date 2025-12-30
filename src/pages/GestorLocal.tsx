/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { useState } from "react";
import { CreateCardModal } from "../components/management/CreateCardModal";
import { QuadroProduction } from "../components/management/QuadroProduction";
import Agenda from "../components/management/Agenda";
import Diario from "../components/management/Diario";
import Dashboard from "../components/management/Dashboard";

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
}

type Aba = "dashboard" | "quadro" | "agenda" | "diario";

export default function GestorLocal() {
    const [abaAtual, setAbaAtual] = useState<Aba>("quadro");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [cards, setCards] = useState<Array<Card>>([]);

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
                    <button className="rounded-xl bg-indigo-500 px-4 py-2 text-sm font-bold hover:bg-indigo-400 transition" type="button" onClick={() => { setIsModalOpen(true); }}>+ Novo Card</button>
                </header>

                <div className="p-10">
                    {abaAtual === "dashboard" && <Dashboard cards={cards} />}
                    {abaAtual === "quadro" && <QuadroProduction cards={cards} setCards={setCards} setVisaoQuadro={() => {}} visaoQuadro="geral" />}
                    {abaAtual === "agenda" && <Agenda scope="geral" />}
                    {abaAtual === "diario" && <Diario />}
                </div>
            </div>

            {isModalOpen && <CreateCardModal onClose={() => { setIsModalOpen(false); }} onSave={handleCreateCard} />}
        </div>
    );
}