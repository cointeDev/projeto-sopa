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
            className={`pb-3 text-[11px] font-black uppercase tracking-widest transition-all
        ${active
                    ? "text-[#4f46e5] border-b-2 border-[#4f46e5]"
                    : "text-slate-400 hover:text-indigo-400"
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
        <div className="min-h-screen bg-[#F1F5F9] font-inter px-6 py-10">

            <div className="max-w-7xl mx-auto space-y-10">

                {/* HEADER - Padrão Light v1.0.4 */}
                <header
                    className="bg-white rounded-[2.5rem] px-10 py-8
                      shadow-2xl shadow-slate-200/50 border border-slate-100
                      flex items-center justify-between animate-in fade-in duration-500"
                >
                    <div>
                        <h1 className="text-3xl font-black text-[#334155] tracking-tighter uppercase leading-none">
                            {greeting}, {userName}
                        </h1>
                        <p className="text-sm font-medium text-slate-400 mt-2">
                            Visão global da produção audiovisual
                        </p>
                    </div>

                    <Link
                        className="text-[10px] font-black uppercase tracking-widest text-indigo-600 hover:text-indigo-400 transition-colors"
                        to="/"
                    >
                        Sair do sistema
                    </Link>
                </header>

                {/* NAV ABAS */}
                <nav
                    className="flex gap-8 border-b border-slate-200 pb-2 animate-in fade-in duration-500"
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
                    <section className="animate-in fade-in slide-in-from-bottom-4 duration-500 space-y-10">

                        {/* KPIs - Devem ser ajustados internamente para o Padrão Light */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                            <KpiCard label="Pedidos Ativos" value="42" />
                            <KpiCard label="Em Gravação" value="8" />
                            <KpiCard label="Em Edição" value="14" />
                            <KpiCard destaque label="No Prazo" value="92%" />
                        </div>

                        {/* BI */}
                        <div
                            className="bg-white rounded-[2.5rem] p-10
                         shadow-2xl shadow-slate-200/50 border border-slate-100"
                        >
                            <h3 className="text-xl font-black text-[#334155] mb-2 uppercase tracking-tight">
                                Indicadores Gerais
                            </h3>
                            <p className="text-sm font-medium text-slate-400 mb-8">
                                Produção por estúdio, tipo e período
                            </p>

                            <div
                                className="h-72 rounded-4xl border-2 border-dashed border-slate-100
                           flex items-center justify-center text-slate-300 font-bold uppercase text-[10px] tracking-widest bg-[#F8FAFC]"
                            >
                                Área reservada para gráficos (BI)
                            </div>
                        </div>

                    </section>
                )}

                {/* AGENDA GLOBAL */}
                {abaAtual === "agenda-global" && (
                    <section className="animate-in fade-in slide-in-from-right-4 duration-500 space-y-6">

                        <div
                            className="bg-white rounded-[2.5rem] p-10
                         shadow-2xl shadow-slate-200/50 border border-slate-100"
                        >
                            <h3 className="text-xl font-black text-[#334155] mb-2 uppercase tracking-tight">
                                Agenda Consolidada
                            </h3>
                            <p className="text-sm font-medium text-slate-400 mb-8">
                                Ocupação de todos os estúdios
                            </p>

                            <div className="bg-[#F8FAFC] rounded-4xl p-4 border border-slate-100 shadow-inner">
                                <Agenda scope="geral" />
                            </div>
                        </div>

                    </section>
                )}

                {/* DIÁRIO */}
                {abaAtual === "diario" && (
                    <section className="animate-in fade-in slide-in-from-right-4 duration-500 space-y-6">

                        <div
                            className="bg-white rounded-[2.5rem] p-10
                         shadow-2xl shadow-slate-200/50 border border-slate-100"
                        >
                            <h3 className="text-xl font-black text-[#334155] mb-2 uppercase tracking-tight">
                                Diário por estúdio
                            </h3>
                            <p className="text-sm font-medium text-slate-400 mb-8">
                                Resumo das demandas diárias por estúdio
                            </p>

                            <div className="bg-[#F8FAFC] rounded-4xl p-4 border border-slate-100 shadow-inner">
                                <Diario />
                            </div>
                        </div>

                    </section>
                )}

            </div>
        </div>
    )
}