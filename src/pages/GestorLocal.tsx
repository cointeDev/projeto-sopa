/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { CreateCardModal } from "../components/management/CreateCardModal";
import { QuadroProduction } from "../components/management/QuadroProduction";
import Agenda from "../components/management/Agenda";
import Diario from "../components/management/Diario";

type Aba = "dashboard" | "quadro" | "agenda" | "diario";
type VisaoQuadro = "geral" | "focada";

export default function GestorLocal() {
    const [abaAtual, setAbaAtual] = useState<Aba>("dashboard");
    const [visaoQuadro, setVisaoQuadro] = useState<VisaoQuadro>("geral");
    const [isModalOpen, setIsModalOpen] = useState(false);

    function getGreeting() {
        const h = new Date().getHours()
        if (h < 12) return "Bom dia"
        if (h < 18) return "Boa tarde"
        return "Boa noite"
    }

    const userName = "Gestor Local";
    const greeting = getGreeting();

    return (
        <div className="min-h-screen bg-[#0F111A] px-6 py-10 font-inter">
            <div
                className="max-w-7xl mx-auto bg-[#161825] rounded-2xl
                   shadow-[0_20px_60px_-15px_rgba(0,0,0,0.6)]
                   overflow-hidden"
            >
                {/* HEADER */}
                <header className="flex items-center justify-between
                           border-b border-white/10
                           px-10 py-6">
                    <nav className="flex gap-8">
                        {[
                            { key: "dashboard", label: "Dashboard" },
                            { key: "quadro", label: "Quadro de Produção" },
                            { key: "agenda", label: "Agenda do Estúdio" },
                            { key: "diario", label: "Diário do Estúdio" },
                        ].map((item) => (
                            <button
                                key={item.key}
                                className={`pb-2 text-sm font-bold transition
                  ${abaAtual === item.key
                                        ? "text-indigo-400 border-b-2 border-indigo-400"
                                        : "text-[#B4B9C7] hover:text-white"
                                    }`}
                                onClick={() => { setAbaAtual(item.key as Aba); }}
                            >
                                {item.label}
                            </button>
                        ))}
                    </nav>

                    <div className="flex items-center gap-4">
                        <button
                            className="rounded-xl bg-indigo-500 px-4 py-2
                         text-sm font-bold text-white
                         hover:bg-indigo-400 transition"
                            onClick={() => { setIsModalOpen(true); }}
                        >
                            + Novo Card
                        </button>

                        <Link
                            to="/"
                            className="text-sm font-semibold text-[#B4B9C7]
                         hover:text-white transition"
                        >
                            Sair
                        </Link>
                    </div>
                </header>

                {/* CONTEÚDO */}
                <div className="p-10">
                    {abaAtual !== "agenda" && (
                        <div className="mb-10 border-b border-white/10 pb-8">
                            <h2 className="text-2xl font-extrabold text-white">
                                {greeting}, {userName}!
                            </h2>
                            <p className="text-[#B4B9C7] mt-1">
                                Aqui está o resumo do seu estúdio hoje.
                            </p>
                        </div>
                    )}

                    {abaAtual === "dashboard" && (
                        <h2 className="text-xl font-bold text-white">
                            Dashboard
                        </h2>
                    )}

                    {abaAtual === "quadro" && (
                        <QuadroProduction
                            setVisaoQuadro={setVisaoQuadro}
                            visaoQuadro={visaoQuadro}
                        />
                    )}

                    {abaAtual === "agenda" && (
                        <section className="animate-slide-in-right space-y-6">

                            <div
                                className="bg-[#161825] rounded-2xl p-8
                         shadow-[0_20px_60px_-15px_rgba(0,0,0,0.6)]"
                            >
                                <h3 className="text-lg font-bold text-white mb-2">
                                    Agenda Consolidada
                                </h3>
                                <p className="text-sm text-[#B4B9C7] mb-6">
                                    Ocupação de todos os estúdios
                                </p>

                                <div
                                    className="bg-[#1e1e25] rounded-xl border border-dashed border-white/10
                           flex items-center justify-center text-[#B4B9C7]"
                                >
                                    <Agenda scope="geral" />
                                </div>
                            </div>

                        </section>
                    )}

                    {abaAtual === "diario" && (
                        <section className="animate-slide-in-right space-y-6">

                            <div
                                className="bg-[#161825] rounded-2xl p-8
                         shadow-[0_20px_60px_-15px_rgba(0,0,0,0.6)]"
                            >
                                <h3 className="text-lg font-bold text-white mb-2">
                                    Diário das demandas do estúdio
                                </h3>
                                <p className="text-sm text-[#B4B9C7] mb-6">
                                    Aqui está o diário de ações do seu estúdio.
                                </p>

                                <div
                                    className="bg-[#1e1e25] rounded-xl border border-dashed border-white/10
                           flex items-center justify-center text-[#B4B9C7]"
                                >
                                    <Diario />
                                </div>
                            </div>

                        </section>
                    )};
                </div>
            </div>

            {isModalOpen && (
                <CreateCardModal onClose={() => { setIsModalOpen(false); }} />
            )}
        </div>
    );
}
