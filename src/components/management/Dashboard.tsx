/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { useState, useMemo } from "react";
import {
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
    PieChart, Pie, Cell, Legend
} from "recharts";
import { 
    Video, Clock, Globe, Languages, 
    Filter, Download, FileVideo, LayoutDashboard 
} from "lucide-react";
// Importação corrigida para apontar para o arquivo na pasta pages
import type { Card } from "../../pages/GestorLocal";

interface DashboardProps {
    cards: Array<Card>;
}

const COLORS = ["#818cf8", "#6366f1", "#4f46e5", "#4338ca", "#3730a3"];

export default function Dashboard({ cards }: DashboardProps) {
    const [filtroProjeto, setFiltroProjeto] = useState<string>("Todos");
    const [filtroLocal, setFiltroLocal] = useState<string>("Todos");
    const filtroMes = "Todos";

    const cardsFiltrados = useMemo(() => {
        return cards.filter((card) => {
            const matchProjeto = filtroProjeto === "Todos" || card.projeto === filtroProjeto;
            const matchLocal = filtroLocal === "Todos" || card.localGravacao === filtroLocal;
            const mesCard = card.dataGravacao ? card.dataGravacao.split("-")[1] : "";
            const matchMes = filtroMes === "Todos" || mesCard === filtroMes;

            return matchProjeto && matchLocal && matchMes;
        });
    }, [cards, filtroProjeto, filtroLocal, filtroMes]);

    const stats = useMemo(() => {
        const concluidos = cardsFiltrados.filter((card) => card.etapa === "Concluído" || card.etapa === "Publicado");
        const totalMinutos = concluidos.reduce((acumulador, atual) => acumulador + (atual.duracaoMinutos || 0), 0);
        
        return {
            total: cardsFiltrados.length,
            concluidos: concluidos.length,
            horas: Math.floor(totalMinutos / 60),
            minutosRestantes: totalMinutos % 60,
            comLibras: cardsFiltrados.filter((card) => card.libras).length,
            lives: cardsFiltrados.filter((card) => card.isAoVivo).length
        };
    }, [cardsFiltrados]);

    const dataGrafico = useMemo(() => {
        const tiposUnicos = Array.from(new Set(cardsFiltrados.map((card) => card.tipoProducao)));
        return tiposUnicos.map((tipo) => ({
            name: tipo,
            value: cardsFiltrados.filter((card) => card.tipoProducao === tipo).length
        }));
    }, [cardsFiltrados]);

    return (
        <div className="space-y-8">
            {/* Filtros */}
            <div className="bg-[#161825] p-6 rounded-2xl border border-white/5 flex flex-wrap gap-6 items-end shadow-2xl">
                <div className="flex-1 min-w-[200px]">
                    <label className="text-[10px] uppercase font-bold text-[#B4B9C7] mb-2 flex items-center gap-2">
                        <Filter size={12} /> Projeto
                    </label>
                    <select 
                        className="bg-[#0F111A] border border-white/10 text-white p-3 rounded-xl w-full outline-none focus:border-indigo-500" 
                        value={filtroProjeto} 
                        onChange={(event) => { setFiltroProjeto(event.target.value); }}
                    >
                        <option value="Todos">Todos os Projetos</option>
                        {Array.from(new Set(cards.map((card) => card.projeto))).filter(Boolean).map((projetoNome) => (
                            <option key={projetoNome} value={projetoNome}>{projetoNome}</option>
                        ))}
                    </select>
                </div>
                <div className="flex-1 min-w-[200px]">
                    <label className="text-[10px] uppercase font-bold text-[#B4B9C7] mb-2 block">Polo / Local</label>
                    <select 
                        className="bg-[#0F111A] border border-white/10 text-white p-3 rounded-xl w-full outline-none focus:border-indigo-500" 
                        value={filtroLocal} 
                        onChange={(event) => { setFiltroLocal(event.target.value); }}
                    >
                        <option value="Todos">Todos os Polos</option>
                        <option value="Natal">Natal</option>
                        <option value="Mossoró">Mossoró</option>
                        <option value="Pau dos Ferros">Pau dos Ferros</option>
                        <option value="Caicó">Caicó</option>
                    </select>
                </div>
                <button className="bg-indigo-500 hover:bg-indigo-400 text-white px-6 py-3 rounded-xl font-bold transition flex items-center gap-2" type="button">
                    <Download size={18} /> Relatório
                </button>
            </div>

            {/* Indicadores */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                    { label: "Vídeos Totais", val: stats.total, icon: <Video className="text-indigo-400" />, sub: `${stats.concluidos} finalizados` },
                    { label: "Tempo Total", val: `${stats.horas}h ${stats.minutosRestantes}m`, icon: <Clock className="text-emerald-400" />, sub: "Minutagem" },
                    { label: "Acessibilidade", val: stats.comLibras, icon: <Languages className="text-amber-400" />, sub: "Com Libras" },
                    { label: "Ao Vivo", val: stats.lives, icon: <Globe className="text-sky-400" />, sub: "Transmissões" },
                ].map((item, index) => (
                    <div key={index} className="bg-[#161825] p-6 rounded-2xl border border-white/5 border-l-4 border-l-indigo-500">
                        <div className="flex justify-between items-start mb-4">
                            <div className="p-2 bg-white/5 rounded-lg">{item.icon}</div>
                        </div>
                        <h3 className="text-3xl font-black text-white">{item.val}</h3>
                        <p className="text-sm text-[#B4B9C7] mt-1">{item.label}</p>
                        <p className="text-[10px] text-white/30 mt-2 uppercase font-bold">{item.sub}</p>
                    </div>
                ))}
            </div>

            {/* Gráficos */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 bg-[#161825] p-8 rounded-2xl border border-white/5 h-[400px]">
                    <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2"><FileVideo size={20} /> Volume por Tipo</h3>
                    <ResponsiveContainer height="100%" width="100%">
                        <BarChart data={dataGrafico}>
                            <CartesianGrid stroke="#ffffff05" strokeDasharray="3 3" vertical={false} />
                            <XAxis axisLine={false} dataKey="name" fontSize={10} stroke="#64748b" tickLine={false} />
                            <YAxis axisLine={false} fontSize={10} stroke="#64748b" tickLine={false} />
                            <Tooltip contentStyle={{ backgroundColor: "#0F111A", border: "1px solid #ffffff10", borderRadius: "12px" }} />
                            <Bar barSize={40} dataKey="value" fill="#6366f1" radius={[6, 6, 0, 0]} />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
                <div className="bg-[#161825] p-8 rounded-2xl border border-white/5 h-[400px]">
                    <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2"><LayoutDashboard size={20} /> Distribuição</h3>
                    <ResponsiveContainer height="100%" width="100%">
                        <PieChart>
                            <Pie data={dataGrafico} dataKey="value" innerRadius={60} outerRadius={80} paddingAngle={5}>
                                {dataGrafico.map((_, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)}
                            </Pie>
                            <Tooltip />
                            <Legend height={36} verticalAlign="bottom"/>
                        </PieChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    );
}