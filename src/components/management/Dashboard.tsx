/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { useState, useMemo } from "react";
import {
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from "recharts";
import { 
    TrendingUp, CheckCircle2, Filter
} from "lucide-react";
import type { Card } from "../../pages/GestorLocal";
import { KpiCard } from "./KpiCard";

interface DashboardProps {
    cards: Array<Card>;
}

export default function Dashboard({ cards }: DashboardProps) {
    // Estados para os Filtros
    const [filtroProjeto, setFiltroProjeto] = useState<string>("Todos");
    const [filtroLocal, setFiltroLocal] = useState<string>("Todos");

    // Extração de opções únicas para os selects (Lógica de TI)
    const opcoesProjetos = useMemo(() => {
        const projetos = cards.map(c => c.projeto).filter(Boolean);
        return ["Todos", ...Array.from(new Set(projetos))];
    }, [cards]);

    const opcoesLocais = useMemo(() => {
        const locais = cards.map(c => c.localGravacao).filter(Boolean);
        return ["Todos", ...Array.from(new Set(locais))];
    }, [cards]);

    // Lógica de Filtragem
    const cardsFiltrados = useMemo(() => {
        return cards.filter((card: Card) => {
            const matchProjeto = filtroProjeto === "Todos" || card.projeto === filtroProjeto;
            const matchLocal = filtroLocal === "Todos" || card.localGravacao === filtroLocal;
            return matchProjeto && matchLocal;
        });
    }, [cards, filtroProjeto, filtroLocal]);

    // Métricas baseadas nos dados filtrados
    const stats = useMemo(() => {
        const total = cardsFiltrados.length;
        const concluidos = cardsFiltrados.filter((c: Card) => c.etapa === "Concluído" || c.etapa === "Publicado").length;
        const comLibras = cardsFiltrados.filter((c: Card) => c.libras === true).length;
        const emProducao = cardsFiltrados.filter((c: Card) => !["Standby", "Concluído", "Publicado"].includes(c.etapa)).length;

        return { total, concluidos, comLibras, emProducao };
    }, [cardsFiltrados]);

    const dataGraficoBarras = useMemo(() => {
        const etapas = ["Standby", "Para Produção Semanal", "Ao Vivo", "Gravado", "Edição 1", "Edição Final", "Libras", "Publicado"];
        return etapas.map((etapa: string) => ({
            name: etapa,
            quantidade: cardsFiltrados.filter((c: Card) => c.etapa === etapa).length
        }));
    }, [cardsFiltrados]);

    return (
        <div className="space-y-8 pb-10">
            
            {/* Barra de Filtros - Agora com fontes maiores e ícones */}
            <div className="bg-[#161825] p-6 rounded-2xl border border-white/5 flex flex-wrap items-center gap-6 shadow-xl">
                <div className="flex items-center gap-3 text-indigo-400">
                    <Filter size={20} />
                    <span className="text-sm font-black uppercase tracking-widest">Filtros:</span>
                </div>

                <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="relative group">
                        <label className="text-[10px] font-black text-[#B4B9C7] uppercase absolute -top-2 left-3 bg-[#161825] px-2 transition-colors group-focus-within:text-indigo-400">Projeto</label>
                        <select 
                            className="w-full bg-[#0F111A] border border-white/10 rounded-xl px-4 py-3 text-sm font-bold text-white outline-none focus:border-indigo-500 transition-all appearance-none"
                            value={filtroProjeto}
                            onChange={(event_) => { setFiltroProjeto(event_.target.value); }}
                        >
                            {opcoesProjetos.map(proj => <option key={proj} value={proj}>{proj}</option>)}
                        </select>
                    </div>

                    <div className="relative group">
                        <label className="text-[10px] font-black text-[#B4B9C7] uppercase absolute -top-2 left-3 bg-[#161825] px-2 transition-colors group-focus-within:text-indigo-400">Localização</label>
                        <select 
                            className="w-full bg-[#0F111A] border border-white/10 rounded-xl px-4 py-3 text-sm font-bold text-white outline-none focus:border-indigo-500 transition-all appearance-none"
                            value={filtroLocal}
                            onChange={(event_) => { setFiltroLocal(event_.target.value); }}
                        >
                            {opcoesLocais.map(loc => <option key={loc} value={loc}>{loc}</option>)}
                        </select>
                    </div>
                </div>
            </div>

            {/* Seção de KPIs */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <KpiCard label="Total Filtrado" value={stats.total.toString()} />
                <KpiCard destaque label="Em Produção" value={stats.emProducao.toString()} />
                <KpiCard label="Acessibilidade (Libras)" value={stats.comLibras.toString()} />
                <KpiCard label="Concluídos" value={stats.concluidos.toString()} />
            </div>

            {/* Gráficos */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 bg-[#161825] p-8 rounded-3xl border border-white/5 shadow-2xl min-h-[480px]">
                    <div className="mb-8">
                        <h3 className="text-xl font-black text-white uppercase tracking-tighter flex items-center gap-2">
                            <TrendingUp className="text-indigo-400" size={20} /> Fluxo por Etapa
                        </h3>
                        <p className="text-xs text-[#B4B9C7] uppercase font-bold mt-1 tracking-widest">Volume de cards no filtro atual</p>
                    </div>
                    
                    <div className="h-[320px] w-full">
                        <ResponsiveContainer height="100%" width="100%">
                            <BarChart data={dataGraficoBarras}>
                                <CartesianGrid stroke="#ffffff05" strokeDasharray="3 3" vertical={false} />
                                <XAxis 
                                    axisLine={false} 
                                    dataKey="name" 
                                    height={50} 
                                    interval={0}
                                    tick={{ fill: '#B4B9C7', fontSize: 10, fontWeight: 'bold' }}
                                    tickLine={false}
                                />
                                <YAxis axisLine={false} tick={{ fill: '#B4B9C7', fontSize: 12 }} tickLine={false} />
                                <Tooltip 
                                    contentStyle={{ backgroundColor: "#0F111A", border: "1px solid #ffffff10", borderRadius: "12px" }}
                                    cursor={{ fill: '#ffffff05' }} 
                                />
                                <Bar barSize={32} dataKey="quantidade" fill="#6366f1" radius={[6, 6, 0, 0]} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                <div className="bg-[#161825] p-8 rounded-3xl border border-white/5 shadow-2xl flex flex-col min-h-[480px]">
                    <h3 className="text-xl font-black text-white uppercase tracking-tighter mb-8 flex items-center gap-2">
                        <CheckCircle2 className="text-indigo-400" size={20} /> Saúde do Workflow
                    </h3>
                    
                    <div className="flex-1 flex flex-col justify-center space-y-6">
                        <div className="bg-[#0F111A] p-6 rounded-2xl border border-white/5 shadow-inner">
                            <span className="text-xs font-black text-[#B4B9C7] uppercase tracking-widest block mb-2">Taxa de Conclusão</span>
                            <div className="flex items-end gap-2">
                                <span className="text-5xl font-black text-white">
                                    {stats.total > 0 ? Math.round((stats.concluidos / stats.total) * 100) : 0}%
                                </span>
                            </div>
                            <div className="w-full bg-white/5 h-2.5 rounded-full mt-5 overflow-hidden border border-white/5">
                                <div 
                                    className="bg-indigo-500 h-full transition-all duration-1000" 
                                    style={{ width: `${stats.total > 0 ? (stats.concluidos / stats.total) * 100 : 0}%` }}
                                ></div>
                            </div>
                        </div>

                        <div className="bg-[#0F111A] p-6 rounded-2xl border border-white/5 shadow-inner">
                            <span className="text-xs font-black text-[#B4B9C7] uppercase tracking-widest block mb-2">Índice de Acessibilidade</span>
                            <div className="flex items-end gap-2">
                                <span className="text-5xl font-black text-emerald-400">
                                    {stats.total > 0 ? Math.round((stats.comLibras / stats.total) * 100) : 0}%
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}