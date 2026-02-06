/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { useState, useMemo } from "react";
import { DragDropContext, Droppable, Draggable, type DropResult, type DroppableProvided, type DraggableProvided } from "@hello-pangea/dnd";
import { LayoutDashboard, Columns, User, Pause, Calendar, Radio, Video, Edit3, CheckCircle, UploadCloud, ArrowRightLeft } from "lucide-react"; 
import type { Card, Projeto } from "../../pages/GestorLocal";

const colunasBasePadrao = ["STANDBY", "PARA PRODUÇÃO SEMANAL", "AO VIVO", "GRAVADO", "EDIÇÃO 1", "EDIÇÃO 2", "EDIÇÃO 3", "EDIÇÃO FINAL", "LIBRAS", "REVISÃO LP", "PRODUÇÃO LSE", "CONCLUÍDO", "PUBLICADO"];

const configuracaoColunas: Record<string, { gradiente: string; texto: string; icone: React.ReactNode }> = {
    "STANDBY": { gradiente: "from-[#8E9EAB] to-[#EEF2F3]", texto: "text-slate-700", icone: <Pause size={16} /> },
    "PARA PRODUÇÃO SEMANAL": { gradiente: "from-[#F2994A] to-[#F2C94C]", texto: "text-amber-900", icone: <Calendar size={16} /> },
    "AO VIVO": { gradiente: "from-[#2193b0] to-[#6dd5ed]", texto: "text-cyan-900", icone: <Radio size={16} /> },
    "GRAVADO": { gradiente: "from-[#11998e] to-[#38ef7d]", texto: "text-emerald-900", icone: <Video size={16} /> },
    "EDIÇÃO 1": { gradiente: "from-[#2c3e50] to-[#4ca1af]", texto: "text-white", icone: <Edit3 size={16} /> },
    "CONCLUÍDO": { gradiente: "from-[#00b09b] to-[#96c93d]", texto: "text-white", icone: <CheckCircle size={16} /> },
    "PUBLICADO": { gradiente: "from-[#4e54c8] to-[#8f94fb]", texto: "text-white", icone: <UploadCloud size={16} /> },
};

interface QuadroProductionProps {
    cards: Array<Card>;
    projetos: Array<Projeto>;
    onCardClick: (card: Card) => void;
    setCards: React.Dispatch<React.SetStateAction<Array<Card>>>;
    setVisaoQuadro: React.Dispatch<React.SetStateAction<"geral" | "focada">>;
    visaoQuadro: "geral" | "focada";
}

export function QuadroProduction({ cards, onCardClick, projetos, setCards, setVisaoQuadro, visaoQuadro }: QuadroProductionProps) {
    const [filtroProjeto, setFiltroProjeto] = useState<string>("Geral");
    const [colunasComparacao, setColunasComparacao] = useState<[string, string]>(["STANDBY", "PARA PRODUÇÃO SEMANAL"]);

    const colunasAtivas = useMemo(() => {
        const etapasUnicas = new Set<string>();
        if (filtroProjeto !== "Geral") {
            const projetoAtivo = projetos.find(p => p.nome === filtroProjeto);
            if (projetoAtivo) {
                projetoAtivo.etapas.forEach(etapa => etapasUnicas.add(etapa.toUpperCase()));
                return Array.from(etapasUnicas);
            }
        }
        colunasBasePadrao.forEach(etapa => etapasUnicas.add(etapa));
        cards.forEach(card => {
            if (card.etapa) etapasUnicas.add(card.etapa.toUpperCase());
            card.fluxoEtapas?.forEach(etapa => etapasUnicas.add(etapa.toUpperCase()));
        });
        return Array.from(etapasUnicas);
    }, [projetos, cards, filtroProjeto]);

    const handleSaltoOuSelecao = (nomeColuna: string) => {
        if (visaoQuadro === "geral") {
            const element = document.getElementById(`scrollTarget${nomeColuna.replace(/\s+/g, '')}`);
            if (element) element.scrollIntoView({ behavior: 'smooth', inline: 'center' });
        } else {
            setColunasComparacao(previous => [previous[1], nomeColuna]);
        }
    };

    const onDragEnd = (result: DropResult) => {
        const { destination, draggableId } = result;
        if (!destination) return;
        setCards((previous) => previous.map((c): Card => c.id === draggableId ? { ...c, etapa: destination.droppableId } : c));
    };

    const colunasParaExibir = visaoQuadro === "geral" ? colunasAtivas : colunasComparacao;

    return (
        <DragDropContext onDragEnd={onDragEnd}>
            <div className="relative flex h-full flex-col p-8 pt-4 text-left bg-[#F1F5F9]/30 font-inter">
                <header className="mb-6 flex shrink-0 items-center justify-between">
                    <div className="flex flex-col text-left">
                        <h2 className="tracking-tighter text-4xl font-black uppercase text-slate-800 leading-none">Workflow</h2>
                        <div className="flex items-center gap-3 mt-4 text-left">
                             <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Projeto:</span>
                             <select className="bg-white border border-slate-200 rounded-xl px-4 py-2 text-[10px] font-black uppercase text-slate-700 outline-none shadow-sm" value={filtroProjeto} onChange={(event_) => { setFiltroProjeto(event_.target.value); }}>
                                <option value="Geral">Visão Geral</option>
                                {projetos.map(p => <option key={p.id} value={p.nome}>{p.nome}</option>)}
                             </select>
                        </div>
                    </div>
                    <div className="flex rounded-2xl border border-slate-200 bg-white p-1 shadow-sm h-fit">
                        <button className={`flex items-center gap-2 rounded-xl px-6 py-2.5 text-[10px] font-black uppercase transition-all ${visaoQuadro === "geral" ? "bg-indigo-600 text-white shadow-md" : "text-slate-400"}`} type="button" onClick={() => { setVisaoQuadro("geral"); }}><LayoutDashboard size={14} /> GERAL</button>
                        <button className={`flex items-center gap-2 rounded-xl px-6 py-2.5 text-[10px] font-black uppercase transition-all ${visaoQuadro === "focada" ? "bg-indigo-600 text-white shadow-md" : "text-slate-400"}`} type="button" onClick={() => { setVisaoQuadro("focada"); }}><Columns size={14} /> COMPARAR</button>
                    </div>
                </header>

                <nav className="mb-8 inline-block max-w-max text-left">
                    <div className="mb-3 flex items-center gap-2">
                         <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest shrink-0">Salto Rápido:</span>
                         {visaoQuadro === "focada" && <ArrowRightLeft className="text-indigo-500 animate-pulse" size={14} />}
                         <div className="h-px bg-slate-200 flex-1 ml-2"></div>
                    </div>
                    <div className="grid grid-cols-7 gap-1.5">
                        {colunasAtivas.map((nome) => {
                            const config = configuracaoColunas[nome] || { gradiente: "from-slate-400 to-slate-500", texto: "text-white" };
                            const selecionada = visaoQuadro === "focada" && colunasComparacao.includes(nome);
                            return (
                                <button key={nome} className={`rounded-lg px-2 py-1.5 text-[8px] font-black uppercase border transition-all ${selecionada ? 'ring-2 ring-indigo-500 scale-105 border-white' : 'border-white/20 opacity-80'} bg-linear-to-br ${config.gradiente} ${config.texto} truncate`} type="button" onClick={() => { handleSaltoOuSelecao(nome); }}>{nome}</button>
                            );
                        })}
                    </div>
                </nav>

                <div className="flex-1 overflow-hidden">
                    <div className={`custom-scrollbar h-full pb-8 scroll-smooth flex items-start gap-6 overflow-x-auto ${visaoQuadro === "geral" ? "" : "justify-center"}`}>
                        {colunasParaExibir.map((nome) => {
                            const config = configuracaoColunas[nome] || { gradiente: "from-slate-400 to-slate-500", texto: "text-white", icone: <Edit3 size={16} /> };
                            const cardsNaColuna = cards.filter(c => c.etapa?.toUpperCase() === nome && (filtroProjeto === "Geral" || c.projeto === filtroProjeto));

                            return (
                                <Droppable key={nome} droppableId={nome}>
                                    {(provided: DroppableProvided) => (
                                        <div {...provided.droppableProps} ref={provided.innerRef} className={`${visaoQuadro === "geral" ? "w-80" : "w-[45%] max-w-xl"} shrink-0 h-full flex flex-col rounded-[2.5rem] bg-white/40 border border-slate-200/60 overflow-hidden shadow-sm`} id={`scrollTarget${nome.replace(/\s+/g, '')}`}>
                                            <header className={`bg-linear-to-br ${config.gradiente} p-4 flex flex-row items-center gap-4 shrink-0 shadow-inner`}>
                                                <div className={`p-2 rounded-xl bg-white/20 backdrop-blur-md ${config.texto} shadow-sm shrink-0`}>{config.icone}</div>
                                                <div className="flex flex-col min-w-0 text-left">
                                                    <h3 className={`text-[11px] font-black uppercase tracking-tighter truncate ${config.texto}`}>{nome}</h3>
                                                    <span className={`text-[8px] font-bold uppercase opacity-60 ${config.texto}`}>{cardsNaColuna.length} Card(s)</span>
                                                </div>
                                            </header>
                                            <div className="custom-scrollbar flex-1 overflow-y-auto p-4 min-h-[150px]">
                                                {cardsNaColuna.map((card, index) => (
                                                    <Draggable key={card.id} draggableId={card.id} index={index}>
                                                        {(p: DraggableProvided) => (
                                                            <div {...p.draggableProps} {...p.dragHandleProps} ref={p.innerRef} className="mb-3 rounded-2xl border-l-[6px] bg-white p-4 shadow-sm text-left transition-all hover:shadow-md cursor-pointer" style={{ ...p.draggableProps.style, borderLeftColor: card.corDestaque || "#cbd5e1" }} onClick={() => { onCardClick(card); }}>
                                                                <h4 className="text-slate-800 font-black text-xs uppercase leading-tight">{card.titulo}</h4>
                                                                <div className="mt-3 flex items-center gap-2 text-[9px] font-bold uppercase text-slate-400"><User size={10} /> {card.responsavel}</div>
                                                            </div>
                                                        )}
                                                    </Draggable>
                                                ))}
                                                {provided.placeholder}
                                            </div>
                                        </div>
                                    )}
                                </Droppable>
                            );
                        })}
                    </div>
                </div>
            </div>
        </DragDropContext>
    );
}