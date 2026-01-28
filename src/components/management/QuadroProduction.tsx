/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { useState } from "react";
import { DragDropContext, Droppable, Draggable, type DropResult } from "@hello-pangea/dnd";
import { User, Calendar, Folder, FileVideo, LayoutDashboard, Columns, Cpu, Radio, UserCheck, FileText } from "lucide-react"; 
import type { Card, Funcionario } from "../../pages/GestorLocal";

const COLUNAS = [
    "Standby", "Para Produção Semanal", "Ao Vivo", "Gravado",
    "Edição 1", "Edição 2", "Edição 3", "Edição Final",
    "Libras", "Revisão LP", "Produção LSE", "Concluído", "Publicado",
];

type QuadroProps = {
    visaoQuadro: "geral" | "focada";
    setVisaoQuadro: (v: "geral" | "focada") => void;
    cards: Array<Card>;
    setCards: React.Dispatch<React.SetStateAction<Array<Card>>>;
    funcionarios: Array<Funcionario>;
};

export function QuadroProduction({ visaoQuadro, setVisaoQuadro, cards, setCards, funcionarios }: QuadroProps) {
    const [colunaA, setColunaA] = useState(COLUNAS[0]);
    const [colunaB, setColunaB] = useState(COLUNAS[4]);

    const handleJump = (colName: string) => {
        if (visaoQuadro === "geral") {
            const container = document.getElementById("columns-container");
            const target = document.getElementById(`scroll-target-${colName}`);
            
            if (container && target) {
                const targetScrollPos = target.offsetLeft - container.offsetLeft - 24;
                container.scrollTo({
                    left: targetScrollPos,
                    behavior: "smooth"
                });
            }
        } else {
            setColunaA(colName);
        }
    };

    const handleTrocaResponsavel = (cardId: string, funcionarioId: string) => {
        setCards((previous: Array<Card>) => 
            previous.map((card: Card): Card => {
                if (card.id === cardId) {
                    return { ...card, responsavelAtualId: funcionarioId };
                }
                return card;
            })
        );
    };

    const onDragEnd = (result: DropResult) => {
        const { destination, draggableId } = result;
        if (!destination) return;

        const destinoId = destination.droppableId;
        const etapaDestino = (destinoId.split("-side-")[0]) || "Standby";
        
        const updatedCards: Array<Card> = cards.map((card: Card): Card => {
            if (card.id === draggableId) {
                return { ...card, etapa: etapaDestino };
            }
            return card;
        });

        setCards(updatedCards);
    };

    const renderCard = (card: Card, index: number) => (
        <Draggable key={card.id} draggableId={card.id} index={index}>
            {(provided, snapshot) => (
                <div
                    ref={provided.innerRef}
                    className={`bg-[#0F111A] rounded-xl p-5 border transition-all mb-4
                        ${snapshot.isDragging
                            ? "border-indigo-500 shadow-2xl bg-[#1e1e25]"
                            : "border-white/10 hover:border-indigo-500/40"
                        }`}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                >
                    <p className="text-white font-bold text-base mb-1 leading-tight">{card.titulo}</p>
                    <p className="text-sm text-[#B4B9C7] mb-3 italic font-medium">Solicitante: {card.responsavel}</p>

                    {/* Correção para exibir a descrição sem erro de tipagem */}
                    {card.descricao && (
                        <div className="mb-4 flex gap-2 items-start text-[#B4B9C7]/60 text-xs italic line-clamp-2">
                            <FileText className="shrink-0 mt-0.5" size={12} />
                            <p>{card.descricao}</p>
                        </div>
                    )}

                    <div className="pt-4 border-t border-white/5 space-y-3">
                        <label className="text-xs uppercase font-black text-[#B4B9C7] flex items-center gap-2">
                            <User className="text-indigo-400" size={14} /> Atribuído a:
                        </label>
                        <select
                            className="w-full text-sm p-3 rounded-lg bg-[#161825] border border-white/10 text-white outline-none focus:border-indigo-500"
                            value={card.responsavelAtualId || ""}
                            onChange={(event) => { handleTrocaResponsavel(card.id, event.target.value); }}
                        >
                            <option value="">Sem responsável</option>
                            {funcionarios.map((f: Funcionario) => (
                                <option key={f.id} value={f.id}>{f.nome}</option>
                            ))}
                        </select>
                    </div>

                    <div className="mt-5 pt-4 border-t border-white/5 flex flex-wrap gap-2 items-center">
                        {card.projeto && (
                            <span className="flex items-center gap-1.5 text-[11px] font-black text-indigo-300 bg-indigo-500/10 px-3 py-1 rounded border border-indigo-500/20 uppercase tracking-widest">
                                <Folder size={12} /> {card.projeto}
                            </span>
                        )}
                        {card.tipoProducao && (
                            <span className="flex items-center gap-1.5 text-[11px] font-black text-[#B4B9C7] bg-white/5 px-3 py-1 rounded border border-white/5 uppercase">
                                <FileVideo className="text-white/30" size={12} /> {card.tipoProducao}
                            </span>
                        )}
                        <div className="ml-auto flex gap-2 items-center">
                            {(card.libras || card.legendas) && (
                                <div className="flex gap-2 pr-2 border-r border-white/10 mr-1">
                                    {card.libras && <span className="text-[11px] font-black text-emerald-400">LIBRAS</span>}
                                    {card.legendas && <span className="text-[11px] font-black text-amber-400">CC</span>}
                                </div>
                            )}
                            {card.dataGravacao && (
                                <span className="flex items-center gap-1.5 text-sm font-bold text-[#B4B9C7]">
                                    <Calendar className="text-indigo-400" size={14} />
                                    {new Date(card.dataGravacao).toLocaleDateString("pt-BR", { day: "2-digit", month: "2-digit" })}
                                </span>
                            )}
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
                    ref={provided.innerRef}
                    id={suffix === "" ? `scroll-target-${colName}` : undefined}
                    className={`${isFullWidth ? 'w-full' : 'w-85 shrink-0'} bg-[#161825] border rounded-2xl p-5 flex flex-col h-full transition-colors
                        ${snapshot.isDraggingOver ? "border-indigo-500/50 bg-[#1c1e2d]" : "border-white/5"}`}
                    {...provided.droppableProps}
                >
                    <h3 className="text-sm font-black text-white uppercase mb-5 flex justify-between items-center tracking-tighter">
                        {colName}
                        <span className="bg-indigo-500/20 text-indigo-300 px-3 py-1 rounded-full text-xs font-bold">
                            {cards.filter((c: Card) => c.etapa === colName).length}
                        </span>
                    </h3>
                    <div className="flex-1 overflow-y-auto custom-scrollbar pr-1">
                        {cards.filter((c: Card) => c.etapa === colName).map((card: Card, index: number) => renderCard(card, index))}
                        {provided.placeholder}
                    </div>
                </div>
            )}
        </Droppable>
    );

    return (
        <DragDropContext onDragEnd={onDragEnd}>
            {/* O uso de w-full e overflow-x-hidden aqui trava o scroll horizontal do container pai */}
            <div className="flex flex-col h-full w-full overflow-x-hidden relative">
                
                <div className="sticky top-0 z-40 bg-[#161825] pt-2 pb-4">
                    <div className="flex items-center justify-between mb-6">
                        <div className="flex flex-col gap-1">
                            <h2 className="text-2xl font-black text-white uppercase tracking-tighter">Workflow de Produção</h2>
                            <p className="text-xs text-indigo-400 uppercase font-bold tracking-[0.2em]">Gestão Digital Estúdio RIEH</p>
                        </div>
                        
                        <div className="flex bg-[#0F111A] p-1.5 rounded-xl border border-white/5 shadow-2xl">
                            <button
                                className={`px-6 py-2.5 rounded-lg text-xs font-black uppercase tracking-widest transition-all flex items-center gap-2 ${visaoQuadro === "geral" ? "bg-indigo-500 text-white shadow-lg shadow-indigo-500/30" : "text-[#B4B9C7] hover:text-white"}`}
                                type="button"
                                onClick={() => { setVisaoQuadro("geral"); }}
                            >
                                <LayoutDashboard size={14} /> Geral
                            </button>
                            <button
                                className={`px-6 py-2.5 rounded-lg text-xs font-black uppercase tracking-widest transition-all flex items-center gap-2 ${visaoQuadro === "focada" ? "bg-indigo-500 text-white shadow-lg shadow-indigo-500/30" : "text-[#B4B9C7] hover:text-white"}`}
                                type="button"
                                onClick={() => { setVisaoQuadro("focada"); }}
                            >
                                <Columns size={14} /> Comparar
                            </button>
                        </div>
                    </div>

                    <nav className="flex gap-3 overflow-x-auto py-2 custom-scrollbar border-b border-white/5 items-center min-h-[50px]">
                        <span className="text-[10px] font-black text-white/30 uppercase tracking-[0.2em] mr-4 shrink-0">Acesso Rápido:</span>
                        {COLUNAS.map((col: string) => (
                            <button
                                key={col}
                                className="whitespace-nowrap px-4 py-2 rounded-lg bg-white/5 text-[11px] font-black uppercase text-[#B4B9C7] hover:bg-indigo-500 hover:text-white transition-all border border-white/5 hover:border-indigo-400"
                                type="button"
                                onClick={() => { handleJump(col); }}
                            >
                                {col}
                            </button>
                        ))}
                    </nav>
                </div>

                <div className="flex-1 mt-4 overflow-hidden">
                    {visaoQuadro === "geral" ? (
                        /* Somente este container possui overflow-x-auto, permitindo o scroll das listas sem mover a tela toda */
                        <div className="flex gap-6 overflow-x-auto pb-12 pr-32 custom-scrollbar h-full items-start scroll-smooth w-full" id="columns-container">
                            {COLUNAS.map((col: string) => renderColumn(col, "", false))}
                        </div>
                    ) : (
                        <div className="grid grid-cols-2 gap-10 bg-[#0F111A] p-8 rounded-3xl border border-white/10 h-full overflow-y-auto custom-scrollbar">
                            {[
                                { val: colunaA, set: setColunaA, label: "Painel Esquerdo" }, 
                                { val: colunaB, set: setColunaB, label: "Painel Direito" }
                            ].map((side, index: number) => (
                                <div key={index} className="flex flex-col gap-5 h-full">
                                    <div className="flex items-center justify-between px-2">
                                        <span className="text-xs font-black text-indigo-400 uppercase tracking-widest bg-indigo-500/10 px-4 py-1.5 rounded-full">{side.label}</span>
                                        <select
                                            className="bg-[#161825] text-white text-xs font-black p-3.5 rounded-xl border border-white/10 outline-none focus:border-indigo-500 min-w-64 uppercase shadow-2xl"
                                            value={side.val}
                                            onChange={(event) => { side.set(event.target.value); }}
                                        >
                                            {COLUNAS.map((c: string) => <option key={c} value={c}>{c}</option>)}
                                        </select>
                                    </div>
                                    {renderColumn(side.val as string, `-side-${index}`, true)}
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                <footer className="sticky bottom-0 z-40 h-10 border-t border-white/10 bg-[#0F111A] px-8 flex items-center justify-between shrink-0">
                    <div className="flex items-center gap-6">
                        <div className="flex items-center gap-3">
                            <div className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]"></span>
                            </div>
                            <span className="text-[9px] font-black uppercase tracking-[0.2em] text-emerald-500">Estúdio RIEH Online</span>
                        </div>
                        <div className="h-3 w-px bg-white/10"></div>
                        <div className="flex items-center gap-2 text-[#B4B9C7]">
                            <UserCheck className="text-indigo-400" size={12} />
                            <span className="text-[9px] font-bold uppercase tracking-widest">Sessão: Gestor Local</span>
                        </div>
                    </div>

                    <div className="flex items-center gap-6">
                        <div className="flex items-center gap-2 px-2 py-0.5 bg-white/5 rounded border border-white/5">
                            <Cpu className="text-indigo-400" size={10} />
                            <span className="text-[9px] font-black text-white/40 uppercase tracking-[0.2em]">SOPA v1.0.4</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Radio className="text-indigo-400" size={10} />
                            <span className="text-[9px] font-black text-white/30 uppercase tracking-[0.3em]">SEEC / RN</span>
                        </div>
                    </div>
                </footer>

            </div>
        </DragDropContext>
    );
}