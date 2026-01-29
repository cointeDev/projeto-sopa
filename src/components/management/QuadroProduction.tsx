/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { useState } from "react";
import { DragDropContext, Droppable, Draggable, type DropResult } from "@hello-pangea/dnd";
import { User, LayoutDashboard, Columns, Clock, MapPin, Hash, Globe, Users as UsersIcon } from "lucide-react"; // Calendar, Folder, FileVideo, FileText removidos
import type { Card, Funcionario } from "../../pages/GestorLocal";

const COLUNAS = [
    "Standby", "Para Produção Semanal", "Ao Vivo", "Gravado",
    "Edição 1", "Edição 2", "Edição 3", "Edição Final",
    "Libras", "Revisão LP", "Produção LSE", "Concluído", "Publicado",
];

type QuadroProps = {
    visaoQuadro: "geral" | "focada";
    setVisaoQuadro: (visao: "geral" | "focada") => void;
    cards: Array<Card>;
    setCards: React.Dispatch<React.SetStateAction<Array<Card>>>;
    funcionarios: Array<Funcionario>;
};

export function QuadroProduction({ visaoQuadro, setVisaoQuadro, cards, setCards, funcionarios }: QuadroProps) {
    const [colunaA, setColunaA] = useState(COLUNAS[0]);
    const [colunaB, setColunaB] = useState(COLUNAS[4]);

    const handleJump = (colName: string) => {
        if (visaoQuadro === "geral") {
            const element = document.getElementById(`scroll-target-${colName}`);
            if (element) {
                element.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
            }
        } else {
            setColunaB(colName);
        }
    };

    const onDragEnd = (result: DropResult) => {
        const { destination, draggableId } = result;
        if (!destination) { return; }

        const etapaDestino: string = (destination.droppableId.split("-side-")[0]) || "Standby";
        
        setCards((previous: Array<Card>): Array<Card> => {
            return previous.map((card: Card): Card => {
                return card.id === draggableId ? { ...card, etapa: etapaDestino } : card;
            });
        });
    };

    const renderCard = (card: Card, index: number) => (
        <Draggable key={card.id} draggableId={card.id} index={index}>
            {(provided, snapshot) => (
                <div
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    ref={provided.innerRef}
                    className={`bg-[#0F111A] rounded-xl p-5 border transition-all mb-4 ${
                        snapshot.isDragging ? "border-indigo-500 shadow-2xl bg-[#1e1e25]" : "border-white/10 hover:border-indigo-500/40"
                    }`}
                >
                    <div className="flex justify-between items-start mb-2">
                        <div className="flex flex-col">
                            <p className="text-white font-bold text-base leading-tight">{card.titulo}</p>
                            <span className="text-[9px] font-black text-indigo-400 uppercase tracking-widest mt-1">
                                {card.formato || card.tipoProducao}
                            </span>
                        </div>
                        {card.dataLimite && (
                            <div className="bg-red-500/10 border border-red-500/20 px-2 py-1 rounded flex flex-col items-center">
                                <span className="text-[8px] font-black text-red-400 uppercase">Entrega</span>
                                <span className="text-[10px] font-bold text-white">
                                    {new Date(card.dataLimite).toLocaleDateString('pt-BR', {day:'2-digit', month:'2-digit'})}
                                </span>
                            </div>
                        )}
                    </div>
                    
                    <div className="flex items-center gap-2 text-[11px] text-[#B4B9C7] mb-3 italic">
                        <User className="text-indigo-400" size={12} /> 
                        <span className="font-bold">{card.responsavel}</span>
                        {card.setor && <span className="text-[10px] bg-white/5 px-1.5 rounded">· {card.setor}</span>}
                    </div>

                    <div className="grid grid-cols-2 gap-2 mb-4">
                        <div className="flex items-center gap-1.5 text-[10px] font-bold text-[#B4B9C7]">
                            <MapPin className="text-indigo-400" size={12} /> {card.localGravacao || "Estúdio"}
                        </div>
                        <div className="flex items-center gap-1.5 text-[10px] font-bold text-[#B4B9C7]">
                            <UsersIcon className="text-indigo-400" size={12} /> {card.pessoasEmCena || 1} em cena
                        </div>
                        <div className="flex items-center gap-1.5 text-[10px] font-bold text-[#B4B9C7]">
                            <Globe className="text-indigo-400" size={12} /> {card.distribuicao || "Interna"}
                        </div>
                        <div className="flex items-center gap-1.5 text-[10px] font-bold text-[#B4B9C7]">
                            <Clock className="text-indigo-400" size={12} /> {card.duracaoMinutos || 0}m
                        </div>
                    </div>

                    <div className="pt-4 border-t border-white/5">
                        <select
                            className="w-full text-xs p-2.5 rounded-lg bg-[#161825] border border-white/10 text-white outline-none focus:border-indigo-500"
                            value={card.responsavelAtualId || ""}
                            onChange={(event) => {
                                setCards((previous) => {
                                    return previous.map((item) => {
                                        return item.id === card.id ? { ...item, responsavelAtualId: event.target.value } : item;
                                    });
                                });
                            }}
                        >
                            <option value="">Atribuir profissional...</option>
                            {funcionarios.map((f) => (
                                <option key={f.id} value={f.id}>{f.nome}</option>
                            ))}
                        </select>
                    </div>

                    <div className="mt-5 pt-4 border-t border-white/5 flex flex-wrap gap-2 items-center">
                        <span className="text-[10px] font-black text-white/40 bg-white/5 px-2 py-1 rounded uppercase flex items-center gap-1 border border-white/5">
                            <Hash className="text-indigo-400" size={10} /> {card.projeto || "Geral"}
                        </span>
                        <div className="ml-auto flex gap-2">
                            {(card.acessibilidade?.includes("LIBRAS") || card.libras) && <span className="text-[9px] font-black text-emerald-400 border border-emerald-400/20 px-1 rounded">LIBRAS</span>}
                            {(card.acessibilidade?.includes("Legendas") || card.legendas) && <span className="text-[9px] font-black text-amber-400 border border-amber-400/20 px-1 rounded">CC</span>}
                        </div>
                    </div>
                </div>
            )}
        </Draggable>
    );

    const renderColumn = (colName: string, suffix = "", isFullWidth = false) => (
        <Droppable key={`${colName}${suffix}`} droppableId={`${colName}${suffix}`}>
            {(provided, snapshot) => (
                <div
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                    id={suffix === "" ? `scroll-target-${colName}` : undefined}
                    className={`${isFullWidth ? 'w-full' : 'w-85 shrink-0'} bg-[#161825]/50 border rounded-2xl p-5 flex flex-col h-full transition-colors ${
                        snapshot.isDraggingOver ? "border-indigo-500/50 bg-[#1c1e2d]" : "border-white/5"
                    }`}
                >
                    <h3 className="text-sm font-black text-white uppercase mb-5 flex justify-between items-center tracking-tighter">
                        {colName}
                        <span className="bg-indigo-500/20 text-indigo-300 px-3 py-1 rounded-full text-[10px]">
                            {cards.filter((c) => { return c.etapa === colName; }).length}
                        </span>
                    </h3>
                    <div className="flex-1 overflow-y-auto custom-scrollbar pr-1">
                        {cards.filter((c) => { return c.etapa === colName; }).map((card, index) => { return renderCard(card, index); })}
                        {provided.placeholder}
                    </div>
                </div>
            )}
        </Droppable>
    );

    return (
        <DragDropContext onDragEnd={onDragEnd}>
            <div className="flex flex-col h-full relative">
                <header className="shrink-0 mb-4 flex items-center justify-between px-6">
                    <div className="flex flex-col">
                        <h2 className="text-2xl font-black text-white uppercase tracking-tighter">Workflow</h2>
                        <p className="text-[10px] text-indigo-400 font-bold uppercase tracking-[0.2em]">Gestão Digital Estúdio RIEH</p>
                    </div>
                    <div className="flex bg-[#0F111A] p-1.5 rounded-xl border border-white/5 shadow-2xl">
                        <button 
                            type="button"
                            className={`px-6 py-2.5 rounded-lg text-xs font-black uppercase tracking-widest transition-all flex items-center gap-2 ${
                                visaoQuadro === "geral" ? "bg-indigo-500 text-white shadow-lg shadow-indigo-500/30" : "text-[#B4B9C7] hover:text-white"
                            }`} 
                            onClick={() => { setVisaoQuadro("geral"); }}
                        >
                            <LayoutDashboard size={14} /> Geral
                        </button>
                        <button 
                            type="button"
                            className={`px-6 py-2.5 rounded-lg text-xs font-black uppercase tracking-widest transition-all flex items-center gap-2 ${
                                visaoQuadro === "focada" ? "bg-indigo-500 text-white shadow-lg shadow-indigo-500/30" : "text-[#B4B9C7] hover:text-white"
                            }`} 
                            onClick={() => { setVisaoQuadro("focada"); }}
                        >
                            <Columns size={14} /> Comparar
                        </button>
                    </div>
                </header>

                <nav className="flex gap-3 overflow-x-auto px-6 pb-4 mb-4 custom-scrollbar border-b border-white/5 items-center shrink-0">
                    <span className="text-[9px] font-black text-white/30 uppercase tracking-[0.2em] mr-2">Salto Rápido:</span>
                    {COLUNAS.map((col) => (
                        <button 
                            key={col} 
                            className="whitespace-nowrap px-4 py-2 rounded-lg bg-white/5 text-[10px] font-black uppercase text-[#B4B9C7] hover:bg-indigo-500 hover:text-white transition-all border border-white/5" 
                            type="button" 
                            onClick={() => { handleJump(col); }}
                        >
                            {col}
                        </button>
                    ))}
                </nav>

                <div className="flex-1 px-6 overflow-hidden">
                    {visaoQuadro === "geral" ? (
                        <div 
                            className="flex gap-6 overflow-x-auto pb-12 pr-48 custom-scrollbar h-full items-start scroll-smooth"
                            id="columns-container" 
                        >
                            {COLUNAS.map((col) => { return renderColumn(col); })}
                        </div>
                    ) : (
                        <div className="grid grid-cols-2 gap-10 bg-[#0F111A]/50 p-8 rounded-3xl border border-white/5 h-full overflow-hidden mb-12">
                            {[ 
                                { val: colunaA, set: setColunaA, label: "Painel Esquerdo" }, 
                                { val: colunaB, set: setColunaB, label: "Painel Direito" } 
                            ].map((side, index) => (
                                <div key={index} className="flex flex-col gap-5 h-full">
                                    <div className="flex items-center justify-between px-2">
                                        <span className="text-[10px] font-black text-indigo-400 uppercase tracking-widest bg-indigo-500/10 px-4 py-1.5 rounded-full">
                                            {side.label}
                                        </span>
                                        <select 
                                            className="bg-[#161825] text-white text-[10px] font-black p-3.5 rounded-xl border border-white/10 outline-none focus:border-indigo-500 min-w-64 uppercase" 
                                            value={side.val as string} 
                                            onChange={(event) => { side.set(event.target.value); }}
                                        >
                                            {COLUNAS.map((c) => { return <option key={c} value={c}>{c}</option>; })}
                                        </select>
                                    </div>
                                    {renderColumn(side.val as string, `-side-${index}`, true)}
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </DragDropContext>
    );
}