/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { useState, useMemo } from "react";
import { DragDropContext, Droppable, Draggable, type DropResult, type DroppableProvided, type DraggableProvided } from "@hello-pangea/dnd";
import { LayoutDashboard, Columns, User } from "lucide-react"; 
import type { Card, Projeto } from "../../pages/GestorLocal";

const colunasBase = ["Standby", "Para Produção Semanal", "Ao Vivo", "Gravado", "Edição 1", "Edição 2", "Edição 3", "Edição Final", "Libras", "Revisão LP", "Produção LSE", "Concluído", "Publicado"];

const coresSopa = {
    areas: { matematica: "#fdde82", linguagens: "#bec658", humanas: "#c3dcf6", natureza: "#4068a7" },
    workflow: {
        standby: { bg: "rgba(195, 220, 246, 0.2)", header: "#4068a7" },
        semanal: { bg: "rgba(253, 222, 130, 0.2)", header: "#fdde82" },
        aovivo: { bg: "rgba(97, 201, 225, 0.2)", header: "#61c9e1" },
        gravado: { bg: "rgba(84, 180, 177, 0.2)", header: "#54b4b1" },
        concluido: { bg: "rgba(190, 198, 88, 0.2)", header: "#bec658" }
    }
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

    const cardsFiltrados = useMemo(() => {
        return filtroProjeto === "Geral" ? cards : cards.filter((cardItem) => cardItem.projeto === filtroProjeto);
    }, [cards, filtroProjeto]);

    const colunasAtivas = useMemo(() => {
        if (filtroProjeto === "Geral") return colunasBase;
        const projetoAtivo = projetos.find(p => p.nome === filtroProjeto);
        return projetoAtivo ? projetoAtivo.etapas : colunasBase;
    }, [projetos, filtroProjeto]);

    const onDragEnd = (result: DropResult) => {
        const { destination, source, draggableId } = result;

        if (!destination || (destination.droppableId === source.droppableId && destination.index === source.index)) {
            return;
        }

        const etapaDestino = destination.droppableId;
        
        // CORREÇÃO AQUI: Garantindo que o retorno do map seja estritamente do tipo Card
        setCards((previousCards: Array<Card>) => 
            previousCards.map((c: Card): Card => 
                c.id === draggableId ? { ...c, etapa: etapaDestino } : c
            )
        );
    };

    const handleJump = (nomeColuna: string) => {
        const element = document.getElementById(`scrollTarget${nomeColuna.replace(/\s+/g, '')}`);
        if (element) element.scrollIntoView({ behavior: 'smooth', inline: 'center' });
    };

    const getWorkflowStyle = (colunaNome: string) => {
        if (colunaNome === "Standby" || colunaNome.includes("Edição")) return coresSopa.workflow.standby;
        if (colunaNome === "Para Produção Semanal" || colunaNome === "Revisão LP") return coresSopa.workflow.semanal;
        if (colunaNome === "Ao Vivo" || colunaNome === "Libras") return coresSopa.workflow.aovivo;
        if (colunaNome === "Gravado" || colunaNome === "Produção LSE") return coresSopa.workflow.gravado;
        if (colunaNome === "Concluído" || colunaNome === "Publicado") return coresSopa.workflow.concluido;
        return { bg: "#F1F5F9", header: "#334155" };
    };

    const renderCard = (cardItem: Card, index: number) => {
        let areaColor = "#cbd5e1";
        const etiquetasTexto = cardItem.etiquetas?.join(" ") || "";
        if (etiquetasTexto.includes("Matemática")) areaColor = coresSopa.areas.matematica;
        else if (etiquetasTexto.includes("Linguagens")) areaColor = coresSopa.areas.linguagens;
        else if (etiquetasTexto.includes("Humanas")) areaColor = coresSopa.areas.humanas;
        else if (etiquetasTexto.includes("Natureza")) areaColor = coresSopa.areas.natureza;

        return (
            <Draggable key={cardItem.id} draggableId={cardItem.id} index={index}>
                {(provided: DraggableProvided) => (
                    <div 
                        {...provided.draggableProps} 
                        {...provided.dragHandleProps} 
                        ref={provided.innerRef} 
                        className="mb-4 rounded-2xl border border-slate-100 border-l-[6px] bg-white p-5 shadow-sm transition-all hover:shadow-md cursor-pointer" 
                        style={{ ...provided.draggableProps.style, borderLeftColor: areaColor }}
                        onClick={() => { onCardClick(cardItem); }}
                    >
                        <h4 className="text-slate-800 font-black text-sm uppercase tracking-tight text-left leading-tight">{cardItem.titulo}</h4>
                        <div className="mt-4 flex items-center gap-2 text-[10px] font-bold uppercase text-slate-400">
                            <User size={12} /> {cardItem.responsavel}
                        </div>
                    </div>
                )}
            </Draggable>
        );
    };

    return (
        <DragDropContext onDragEnd={onDragEnd}>
            <div className="relative flex h-full flex-col p-8 pt-4 text-left">
                <header className="mb-6 flex shrink-0 items-center justify-between">
                    <div className="flex items-center gap-6">
                        <div>
                            <h2 className="tracking-tighter text-4xl font-black uppercase text-slate-800 leading-none">Workflow</h2>
                            <p className="mt-2 text-[10px] font-bold uppercase tracking-widest text-slate-400">Estúdio RIEH — {filtroProjeto}</p>
                        </div>
                        <div className="flex items-center gap-3 bg-slate-100 p-1 rounded-2xl border border-slate-200">
                             <span className="pl-4 text-[9px] font-black text-slate-400 uppercase">Projeto:</span>
                             <select className="bg-white rounded-xl px-4 py-2 text-[10px] font-black uppercase text-slate-700 outline-none shadow-sm" value={filtroProjeto} onChange={(event_) => { setFiltroProjeto(event_.target.value); }}>
                                <option value="Geral">Visão Geral</option>
                                {projetos.map(p => <option key={p.id} value={p.nome}>{p.nome}</option>)}
                             </select>
                        </div>
                    </div>
                    <div className="flex rounded-2xl border border-slate-200 bg-slate-100 p-1 shadow-inner">
                        <button className={`flex items-center gap-2 rounded-xl px-6 py-2.5 text-[10px] font-black uppercase transition-all ${visaoQuadro === "geral" ? "bg-white text-indigo-600 shadow-md" : "text-slate-400"}`} type="button" onClick={() => { setVisaoQuadro("geral"); }}><LayoutDashboard size={14} /> GERAL</button>
                        <button className={`flex items-center gap-2 rounded-xl px-6 py-2.5 text-[10px] font-black uppercase transition-all ${visaoQuadro === "focada" ? "bg-white text-indigo-600 shadow-md" : "text-slate-400"}`} type="button" onClick={() => { setVisaoQuadro("focada"); }}><Columns size={14} /> COMPARAR</button>
                    </div>
                </header>

                <nav className="custom-scrollbar mb-6 flex shrink-0 items-center gap-2 overflow-x-auto pb-4">
                    <span className="mr-4 text-[10px] font-black text-slate-300 uppercase tracking-widest">Salto Rápido:</span>
                    {colunasAtivas.map((nomeColuna) => (
                        <button key={nomeColuna} className="whitespace-nowrap rounded-xl border border-slate-100 bg-white px-5 py-2 text-[10px] font-black uppercase text-slate-400 shadow-sm transition-all hover:text-indigo-600" type="button" onClick={() => { handleJump(nomeColuna); }}>{nomeColuna}</button>
                    ))}
                </nav>

                <div className="flex-1 overflow-hidden">
                    <div 
                        className={`custom-scrollbar h-full pb-8 scroll-smooth ${visaoQuadro === "geral" ? "flex items-start gap-8 overflow-x-auto pr-48" : "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 overflow-y-auto pr-4"}`} 
                        id="columnsContainer"
                    >
                        {colunasAtivas.map((nomeColuna) => {
                            const estiloFluxo = getWorkflowStyle(nomeColuna);
                            const cardsNaColuna = cardsFiltrados.filter(c => c.etapa === nomeColuna);

                            return (
                                <Droppable key={nomeColuna} droppableId={nomeColuna}>
                                    {(provided: DroppableProvided) => (
                                        <div 
                                            {...provided.droppableProps} 
                                            ref={provided.innerRef} 
                                            className={`${visaoQuadro === "geral" ? "w-80 shrink-0" : "w-full"} flex h-full flex-col rounded-[2.5rem] border border-slate-200/50 p-4`} 
                                            id={`scrollTarget${nomeColuna.replace(/\s+/g, '')}`}
                                            style={{ backgroundColor: estiloFluxo.bg }}
                                        >
                                            <h3 className="mb-4 flex items-center justify-between rounded-full py-3 px-6 text-[11px] font-black uppercase tracking-widest text-white shadow-sm"
                                                style={{ backgroundColor: estiloFluxo.header }}>
                                                {nomeColuna} <span className="rounded-full bg-white/20 px-3 py-0.5 text-[9px] text-white">{cardsNaColuna.length}</span>
                                            </h3>
                                            <div className="custom-scrollbar flex-1 overflow-y-auto pr-1 min-h-[50px]">
                                                {cardsNaColuna.map((cardItem, index) => renderCard(cardItem, index))}
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