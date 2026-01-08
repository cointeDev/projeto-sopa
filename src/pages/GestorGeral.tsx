/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Link } from "@tanstack/react-router"
import { useState } from "react"
import { KpiCard } from "../components/management/KpiCard"
import Agenda from "../components/management/Agenda"
import Diario from "../components/management/Diario"

type Aba = "visao-geral" | "agenda-global" | "diario"

/* COMPONENTES AUXILIARES */

function Tab({
    children,
    active,
    onClick,
}: {
    children: React.ReactNode
    active: boolean
    onClick: () => void
}) {
    return (
        <button
            className={`pb-3 text-sm font-semibold transition
        ${active
                    ? "text-white border-b-2 border-indigo-500"
                    : "text-[#B4B9C7] hover:text-white"
                }`}
            onClick={onClick}
        >
            {children}
        </button>
    )
}

function getGreeting() {
    const h = new Date().getHours()
    if (h < 12) return "Bom dia"
    if (h < 18) return "Boa tarde"
    return "Boa noite"
}


export function GestorGeral() {
    const [abaAtual, setAbaAtual] = useState<Aba>("visao-geral")

    const userName = "Gestor Geral"
    const greeting = getGreeting()

    return (
        <div className="min-h-screen bg-[#0F111A] font-inter px-6 py-10">

            <div className="max-w-7xl mx-auto space-y-10">

                {/* HEADER */}
                <header
                    className="bg-[#161825] rounded-2xl px-8 py-6
                     shadow-[0_20px_60px_-15px_rgba(0,0,0,0.6)]
                     flex items-center justify-between animate-fade-in"
                >
                    <div>
                        <h1 className="text-2xl font-extrabold text-white">
                            {greeting}, {userName}
                        </h1>
                        <p className="text-sm text-[#B4B9C7]">
                            Visão global da produção audiovisual
                        </p>
                    </div>

                    <Link
                        className="text-sm font-semibold text-indigo-400 hover:underline"
                        to="/"
                    >
                        Sair
                    </Link>
                </header>

                {/* NAV ABAS */}
                <nav
                    className="flex gap-6 border-b border-white/10 pb-2 animate-fade-in"
                >
                    <Tab
                        active={abaAtual === "visao-geral"}
                        onClick={() => { setAbaAtual("visao-geral"); }}
                    >
                        Visão Geral
                    </Tab>

                    <Tab
                        active={abaAtual === "agenda-global"}
                        onClick={() => { setAbaAtual("agenda-global"); }}
                    >
                        Agenda Global
                    </Tab>

                    <Tab
                        active={abaAtual === "diario"}
                        onClick={() => { setAbaAtual("diario"); }}
                    >
                        Diário por Estúdio
                    </Tab>
                </nav>

                {/* CONTEÚDO */}
                {abaAtual === "visao-geral" && (
                    <section className="animate-fade-in space-y-10">

                        {/* KPIs */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                            <KpiCard label="Pedidos Ativos" value="42" />
                            <KpiCard label="Em Gravação" value="8" />
                            <KpiCard label="Em Edição" value="14" />
                            <KpiCard destaque label="No Prazo" value="92%" />
                        </div>

                        {/* BI */}
                        <div
                            className="bg-[#161825] rounded-2xl p-8
                         shadow-[0_20px_60px_-15px_rgba(0,0,0,0.6)]"
                        >
                            <h3 className="text-lg font-bold text-white mb-2">
                                Indicadores Gerais
                            </h3>
                            <p className="text-sm text-[#B4B9C7] mb-6">
                                Produção por estúdio, tipo e período
                            </p>

                            <div
                                className="h-64 rounded-xl border border-dashed border-white/10
                           flex items-center justify-center text-[#B4B9C7]"
                            >
                                Área reservada para gráficos (BI)
                            </div>
                        </div>

                    </section>
                )}

                {abaAtual === "agenda-global" && (
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
                                Diário por estúdio
                            </h3>
                            <p className="text-sm text-[#B4B9C7] mb-6">
                                Resumo das demandas diárias por estúdio
                            </p>

                            <div
                                className="bg-[#1e1e25] rounded-xl border border-dashed border-white/10
                           flex items-center justify-center text-[#B4B9C7]"
                            >
                                <Diario />
                            </div>
                        </div>

                    </section>
                )}

            </div>
        </div>
    )
}
