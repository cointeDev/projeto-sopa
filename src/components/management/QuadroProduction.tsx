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
    setVisaoQuadro: (visao: "geral" | "focada") => void;
    cards: Array<Card>;
    setCards: React.Dispatch<React.SetStateAction<Array<Card>>>;
    funcionarios: Array<Funcionario>; // Propriedade para receber a equipe cadastrada
};

export function QuadroProduction({ visaoQuadro, setVisaoQuadro, cards, setCards, funcionarios }: QuadroProps) {
    const [colunaA, setColunaA] = useState(COLUNAS[0]);
    const [colunaB, setColunaB] = useState(COLUNAS[8]);

    // Função para gerenciar a troca de responsável e gravar o histórico de etapas
    const handleTrocaResponsavel = (cardId: string, funcionarioId: string) => {
        setCards((previous) => previous.map((card) => {
            if (card.id === cardId) {
                const novoHistorico = [
                    ...(card.historicoResponsaveis || []),
                    { 
                        etapa: card.etapa, 
                        funcionarioId, 
                        data: new Date().toISOString() 
                    }
                ];
                return { 
                    ...card, 
                    responsavelAtualId: funcionarioId, 
                    historicoResponsaveis: novoHistorico 
                };
            }
            return card;
        }));
    };

    const onDragEnd = (result: DropResult) => {
        const { destination, source, draggableId } = result;
        if (!destination) return;
        if (destination.droppableId === source.droppableId && destination.index === source.index) return;

        const updatedCards = cards.map((card) => {
            if (card.id === draggableId) {
                return { ...card, etapa: destination.droppableId };
            }
            return card;
        });
        setCards(updatedCards);
    };

    const scrollToColumn = (columnId: string) => {
        if (!columnId) return;
        const formattedId = columnId.replace(/\s+/g, "-");
        const element = document.getElementById(`col-${formattedId}`);
        if (element) {
            element.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "start" });
        }
    };

    const renderCard = (card: Card, index: number) => (
        <Draggable key={card.id} draggableId={card.id} index={index}>
            {(provided, snapshot) => (
                <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    className={`bg-[#0F111A] rounded-xl p-4 border transition-all select-none
                        ${snapshot.isDragging ? "border-indigo-500 shadow-2xl bg-[#1e1e25]" : "border-white/10 hover:border-indigo-500/40"}`}
                >
                    <p className="text-white font-bold text-sm mb-1 leading-tight">{card.titulo}</p>
                    <p className="text-[10px] text-[#B4B9C7] mb-3 flex items-center gap-1">
                         <span className="opacity-50 italic">Solicitante:</span> {card.responsavel}
                    </p>
                    
                    <div className="flex flex-wrap gap-1.5 mb-4">
                        {card.acessibilidade.map((acess) => (
                            <span key={acess} className="text-[9px] font-bold bg-indigo-500/10 text-indigo-400 px-2 py-0.5 rounded border border-indigo-500/20 uppercase">
                                {acess}
                            </span>
                        ))}
                    </div>

                    {/* SEÇÃO DO RESPONSÁVEL: Aqui aparece a opção de alterar quem faz a tarefa */}
                    <div className="pt-3 border-t border-white/5 space-y-2">
                        <label className="text-[9px] uppercase font-bold text-[#B4B9C7] flex items-center gap-1">
                            <User className="text-indigo-400" size={10} /> Atribuído a:
                        </label>
                        <select 
                            value={card.responsavelAtualId || ""}
                            className={`w-full text-[11px] p-2 rounded-lg border outline-none transition-all
                                ${card.responsavelAtualId 
                                    ? "bg-indigo-500/10 border-indigo-500/20 text-indigo-100" 
                                    : "bg-[#161825] border-white/5 text-white/40"}`}
                            onChange={(event) => { handleTrocaResponsavel(card.id, event.target.value); }}
                        >
                            <option value="">Nenhum responsável</option>
                            {funcionarios.map((f) => (
                                <option key={f.id} value={f.id}>
                                    {f.nome} ({f.cargo})
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
            )}
        </Draggable>
    );

    const renderColumn = (colName: string) => (
        <Droppable key={colName} droppableId={colName}>
            {(provided, snapshot) => (
                <div
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                    id={`col-${colName.replace(/\s+/g, "-")}`}
                    className={`min-w-75 bg-[#161825] border rounded-xl p-3 flex flex-col transition-colors
                        ${snapshot.isDraggingOver ? "border-indigo-500/50 bg-[#1c1e2d]" : "border-white/10"}`}
                >
                    <h3 className="text-sm font-bold text-[#B4B9C7] mb-4 flex justify-between items-center px-1">
                        {colName}
                        <span className="bg-white/5 px-2 py-0.5 rounded text-[10px]">
                            {cards.filter((c) => c.etapa === colName).length}
                        </span>
                    </h3>
                    <div className="space-y-3 flex-1 min-h-37.5">
                        {cards.filter((c) => c.etapa === colName).map((card, index) => renderCard(card, index))}
                        {provided.placeholder}
                    </div>
                </div>
            )}
        </Droppable>
    );

    return (
        <DragDropContext onDragEnd={onDragEnd}>
            <div className="mb-6 space-y-6">
                <div className="flex items-center justify-between">
                    <h2 className="text-xl font-extrabold text-white">Quadro de Produção</h2>
                    <div className="flex gap-2">
                        <button className={`px-4 py-2 rounded-lg text-sm font-bold transition ${visaoQuadro === "focada" ? "bg-indigo-500 text-white" : "bg-[#0F111A] text-[#B4B9C7]"}`} type="button" onClick={() => { setVisaoQuadro("focada"); }}>☷ Comparar</button>
                        <button className={`px-4 py-2 rounded-lg text-sm font-bold transition ${visaoQuadro === "geral" ? "bg-indigo-500 text-white" : "bg-[#0F111A] text-[#B4B9C7]"}`} type="button" onClick={() => { setVisaoQuadro("geral"); }}>⠿ Visão Geral</button>
                    </div>
                </div>

                {visaoQuadro === "geral" && (
                    <nav className="flex gap-2 overflow-x-auto pb-3 scrollbar-hide border-b border-white/5">
                        {COLUNAS.map((col) => (
                            <button key={col} className="text-[10px] uppercase font-bold px-3 py-1.5 bg-[#161825] text-[#B4B9C7] rounded-full border border-white/5 hover:border-indigo-500/50" type="button" onClick={() => { scrollToColumn(col); }}>{col}</button>
                        ))}
                    </nav>
                )}
            </div>

            {visaoQuadro === "geral" && (
                <div className="flex gap-4 overflow-x-auto bg-[#0F111A] p-4 rounded-xl custom-scrollbar min-h-150">
                    {COLUNAS.map((col) => renderColumn(col))}
                </div>
            )}

            {visaoQuadro === "focada" && (
                <div className="grid grid-cols-2 gap-8 bg-[#0F111A] p-6 rounded-xl border border-white/10">
                    {[ { val: colunaA, set: setColunaA }, { val: colunaB, set: setColunaB } ].map((side, index) => (
                        <div key={index} className="flex flex-col gap-4">
                            <select 
                                className="bg-[#161825] text-white text-sm font-bold p-3 rounded-lg border border-white/10" 
                                value={side.val} 
                                onChange={(event) => { side.set(event.target.value || ""); }}
                            >
                                {COLUNAS.map(c => <option key={c} value={c}>{c}</option>)}
                            </select>
                            {side.val && renderColumn(side.val)}
                        </div>
                    ))}
                </div>
            )}
        </DragDropContext>
    );
}