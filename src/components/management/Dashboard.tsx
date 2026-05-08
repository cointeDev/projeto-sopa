/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { useMemo } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { TrendingUp, CheckCircle2 } from "lucide-react";
import { KpiCard } from "./KpiCard";
import type { Card } from "../../pages/GestorLocal";

export default function Dashboard({ cards }: { cards: Array<Card> }) {
    const stats = useMemo(() => ({
        total: cards.length,
        concluidos: cards.filter(c => c.etapa === "Concluído" || c.etapa === "Publicado").length,
        emProducao: cards.filter(c => !["Standby", "Concluído", "Publicado"].includes(c.etapa)).length,
    }), [cards]);

    const dataGrafico = ["Standby", "Para Produção Semanal", "Ao Vivo", "Gravado", "Edição 1", "Concluído"].map(etapa => ({
        name: etapa,
        quantidade: cards.filter(c => c.etapa === etapa).length
    }));

    return (
        <div className="space-y-8 pb-10 p-10 text-left bg-[#F8FAFC]">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <KpiCard label="Total em Pauta" value={stats.total.toString()} />
                <KpiCard destaque label="Em Produção" value={stats.emProducao.toString()} />
                <KpiCard label="Concluídos" value={stats.concluidos.toString()} />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 bg-white p-12 rounded-[2.5rem] border border-slate-100 shadow-sm">
                    <h3 className="text-xl font-black text-[#334155] uppercase tracking-tighter mb-8 flex items-center gap-2">
                        <TrendingUp className="text-[#4f46e5]" size={20} /> Fluxo de Trabalho
                    </h3>
                    <div className="h-80 w-full">
                        <ResponsiveContainer>
                            <BarChart data={dataGrafico}>
                                <CartesianGrid stroke="#f1f5f9" vertical={false} />
                                <XAxis 
                                    axisLine={false} 
                                    dataKey="name" 
                                    tick={{ fill: '#64748b', fontSize: 10, fontWeight: '900' }} 
                                    tickLine={false} 
                                />
                                <YAxis 
                                    axisLine={false} 
                                    tick={{ fill: '#64748b', fontSize: 12 }} 
                                    tickLine={false} 
                                />
                                <Tooltip 
                                    contentStyle={{ borderRadius: '24px', border: 'none', boxShadow: '0 20px 25px -5px rgba(0,0,0,0.1)', padding: '20px' }}
                                    cursor={{fill: '#f8fafc'}} 
                                />
                                <Bar barSize={40} dataKey="quantidade" fill="#4f46e5" radius={[12, 12, 0, 0]} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>
                
                <div className="bg-white p-12 rounded-[2.5rem] border border-slate-100 shadow-sm flex flex-col justify-center">
                    <h3 className="text-xl font-black text-[#334155] uppercase tracking-tighter mb-10 flex items-center gap-2">
                        <CheckCircle2 className="text-[#4f46e5]" size={20} /> Saúde do Workflow
                    </h3>
                    <div className="bg-[#F8FAFC] p-10 rounded-4xl border border-slate-50">
                        <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Taxa de Conclusão</span>
                        <div className="text-6xl font-black text-[#334155] mt-2">
                            {stats.total > 0 ? Math.round((stats.concluidos / stats.total) * 100) : 0}%
                        </div>
                        <div className="w-full bg-slate-200 h-3 rounded-full mt-8 overflow-hidden">
                            <div 
                                className="bg-[#4f46e5] h-full transition-all duration-1000 shadow-[0_0_20px_rgba(79,70,229,0.4)]" 
                                style={{ width: `${stats.total > 0 ? (stats.concluidos/stats.total)*100 : 0}%` }}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}