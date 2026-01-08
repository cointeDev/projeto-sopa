/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { useState } from "react";
import { DragDropContext, Droppable, Draggable, type DropResult } from "@hello-pangea/dnd";
import { User } from "lucide-react";
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

    const handleTrocaResponsavel = (cardId: string, funcionarioId: string) => {
        setCards((previous) => 
            previous.map((card): Card => {
                if (card.id === cardId) {
                    return { ...card, responsavelAtualId: funcionarioId } as Card;
                }
                return card;
            })
        );
    };

    const onDragEnd = (result: DropResult) => {
        const { destination, draggableId } = result;
        
        if (!destination) return;

        // RESOLUÇÃO ts(2345): Garantimos string via type assertion
        const destinoId = (destination.droppableId) ?? "Standby";
        const etapaDestino = destinoId.split("-side-")[0];
        
        // RESOLUÇÃO ts(2322) e ts(2345): Forçamos o retorno como Card
        const updatedCards: Array<Card> = cards.map((card): Card => {
            if (card.id === draggableId) {
                return {
                    ...card,
                    etapa: etapaDestino
                } as Card;
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
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    className={`bg-[#0F111A] rounded-xl p-4 border transition-all mb-3
                        ${snapshot.isDragging
                            ? "border-indigo-500 shadow-2xl bg-[#1e1e25]"
                            : "border-white/10 hover:border-indigo-500/40"
                        }`}
                >
                    <p className="text-white font-bold text-sm mb-1 leading-tight">{card.titulo}</p>
                    
                    <p className="text-[10px] text-[#B4B9C7] mb-3 italic">
                        Solicitante: {card.responsavel}
                    </p>

                    <div className="pt-3 border-t border-white/5 space-y-2">
                        <label className="text-[9px] uppercase font-bold text-[#B4B9C7] flex items-center gap-1">
                            <User className="text-indigo-400" size={10} /> Atribuído a:
                        </label>

                        <select
                            className="w-full text-[11px] p-2 rounded-lg bg-[#161825] border border-white/10 text-white outline-none"
                            value={card.responsavelAtualId || ""}
                            onChange={(event) => { handleTrocaResponsavel(card.id, event.target.value); }}
                        >
                            <option value="">Sem responsável</option>
                            {funcionarios.map((f) => (
                                <option key={f.id} value={f.id}>{f.nome}</option>
                            ))}
                        </select>
                    </div>
                </div>
            )}
        </Draggable>
    );

    const renderColumn = (colName: string, suffix = "") => (
        <Droppable key={`${colName}${suffix}`} droppableId={`${colName}${suffix}`}>
            {(provided, snapshot) => (
                <div
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                    className={`min-w-75 flex-1 bg-[#161825] border rounded-2xl p-4 flex flex-col transition-colors
                        ${snapshot.isDraggingOver ? "border-indigo-500/50 bg-[#1c1e2d]" : "border-white/5"}`}
                >
                    <h3 className="text-xs font-black text-[#B4B9C7] uppercase mb-4 flex justify-between">
                        {colName}
                        <span className="bg-white/5 px-2 py-0.5 rounded text-[10px]">
                            {cards.filter(c => c.etapa === colName).length}
                        </span>
                    </h3>

                    <div className="flex-1 min-h-50">
                        {cards.filter(c => c.etapa === colName).map((card, index) => renderCard(card, index))}
                        {provided.placeholder}
                    </div>
                </div>
            )}
        </Droppable>
    );

    return (
        <DragDropContext onDragEnd={onDragEnd}>
            <div className="mb-8 flex items-center justify-between">
                <h2 className="text-xl font-black text-white uppercase tracking-tighter">Workflow</h2>
                
                <div className="flex bg-[#0F111A] p-1 rounded-xl border border-white/5">
                    <button
                        className={`px-4 py-2 rounded-lg text-xs font-bold transition ${
                            visaoQuadro === "focada" ? "bg-indigo-500 text-white shadow-lg shadow-indigo-500/20" : "text-[#B4B9C7]"
                        }`}
                        onClick={() => { setVisaoQuadro("focada"); }}
                    >☷ Comparar</button>

                    <button
                        className={`px-4 py-2 rounded-lg text-xs font-bold transition ${
                            visaoQuadro === "geral" ? "bg-indigo-500 text-white shadow-lg shadow-indigo-500/20" : "text-[#B4B9C7]"
                        }`}
                        onClick={() => { setVisaoQuadro("geral"); }}
                    >⠿ Geral</button>
                </div>
            </div>

            {visaoQuadro === "geral" ? (
                <div className="flex gap-4 overflow-x-auto pb-6 custom-scrollbar min-h-150">
                    {COLUNAS.map((col) => renderColumn(col))}
                </div>
            ) : (
                <div className="grid grid-cols-2 gap-8 bg-[#0F111A] p-6 rounded-2xl border border-white/10 min-h-150">
                    {[{ val: colunaA, set: setColunaA }, { val: colunaB, set: setColunaB }].map((side, index) => (
                        <div key={index} className="flex flex-col gap-4">
                            <select
                                className="bg-[#161825] text-white text-xs font-bold p-3 rounded-xl border border-white/10 outline-none focus:border-indigo-500"
                                value={side.val as string}
                                onChange={(event) => { side.set(event.target.value); }}
                            >
                                {COLUNAS.map(c => <option key={c} value={c}>{c}</option>)}
                            </select>
                            
                            {renderColumn(side.val as string, `-side-${index}`)}
                        </div>
                    ))}
                </div>
            )}
        </DragDropContext>
    );
}