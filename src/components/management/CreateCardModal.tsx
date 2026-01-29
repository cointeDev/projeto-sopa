/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import type { Card } from "../../pages/GestorLocal";

interface ModalProps {
    onClose: () => void;
    onSave: (dadosNovoCard: Omit<Card, "id" | "etapa">) => void;
}

export function CreateCardModal({ onClose, onSave }: ModalProps) {
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        
        const dados: Omit<Card, "id" | "etapa"> = {
            titulo: formData.get("titulo") as string,
            responsavel: formData.get("responsavel") as string,
            emailSolicitante: formData.get("emailSolicitante") as string,
            setor: formData.get("setor") as string,
            projeto: formData.get("projeto") as string,
            tipoProducao: formData.get("tipoProducao") as string,
            formato: formData.get("formato") as string,
            localGravacao: formData.get("localGravacao") as string,
            dataGravacao: formData.get("dataGravacao") as string,
            horaGravacao: formData.get("horaGravacao") as string,
            duracaoMinutos: Number(formData.get("duracaoMinutos")),
            dataLimite: formData.get("dataLimite") as string,
            pessoasEmCena: Number(formData.get("pessoasEmCena")),
            distribuicao: formData.get("distribuicao") as string,
            descricao: formData.get("descricao") as string,
            observacoes: formData.get("observacoes") as string,
            libras: formData.get("libras") === "on",
            legendas: formData.get("legendas") === "on",
            acessibilidade: [] // Pode ser populado baseado nos checkboxes
        };
        onSave(dados);
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
            <div className="bg-[#161825] w-full max-w-5xl rounded-3xl border border-white/10 shadow-2xl overflow-hidden animate-fade-in">
                <header className="px-8 py-6 border-b border-white/5 flex justify-between items-center bg-[#161825]">
                    <h2 className="text-xl font-black text-white uppercase tracking-widest">Novo Planeamento de Produção</h2>
                    <button className="text-[#B4B9C7] hover:text-white text-2xl" type="button" onClick={onClose}>×</button>
                </header>
                
                <form className="p-8 grid grid-cols-1 md:grid-cols-3 gap-6 max-h-[80vh] overflow-y-auto custom-scrollbar" onSubmit={handleSubmit}>
                    {/* Seção 1: Identificação (Step 1) */}
                    <div className="md:col-span-3 border-b border-white/5 pb-2">
                        <span className="text-indigo-400 text-[10px] font-black uppercase tracking-widest">1. Identificação do Solicitante</span>
                    </div>
                    <div className="md:col-span-2">
                        <label className="block text-[9px] font-black uppercase text-[#B4B9C7] mb-1.5">Título do Conteúdo</label>
                        <input required className="w-full bg-[#0F111A] border border-white/10 rounded-xl px-4 py-2.5 outline-none focus:border-indigo-500 text-white text-sm" name="titulo" />
                    </div>
                    <div>
                        <label className="block text-[9px] font-black uppercase text-[#B4B9C7] mb-1.5">Nome do Responsável</label>
                        <input required className="w-full bg-[#0F111A] border border-white/10 rounded-xl px-4 py-2.5 outline-none focus:border-indigo-500 text-white text-sm" name="responsavel" />
                    </div>
                    <div>
                        <label className="block text-[9px] font-black uppercase text-[#B4B9C7] mb-1.5">E-mail Institucional</label>
                        <input required className="w-full bg-[#0F111A] border border-white/10 rounded-xl px-4 py-2.5 outline-none focus:border-indigo-500 text-white text-sm" name="emailSolicitante" type="email" />
                    </div>
                    <div>
                        <label className="block text-[9px] font-black uppercase text-[#B4B9C7] mb-1.5">Setor / Sigla</label>
                        <input required className="w-full bg-[#0F111A] border border-white/10 rounded-xl px-4 py-2.5 outline-none focus:border-indigo-500 text-white text-sm" name="setor" />
                    </div>
                    <div>
                        <label className="block text-[9px] font-black uppercase text-[#B4B9C7] mb-1.5">Projeto / Disciplina</label>
                        <input required className="w-full bg-[#0F111A] border border-white/10 rounded-xl px-4 py-2.5 outline-none focus:border-indigo-500 text-white text-sm" name="projeto" />
                    </div>

                    {/* Seção 2: Produção (Step 2 e 3) */}
                    <div className="md:col-span-3 border-b border-white/5 pb-2 mt-4">
                        <span className="text-indigo-400 text-[10px] font-black uppercase tracking-widest">2. Detalhes de Produção</span>
                    </div>
                    <div>
                        <label className="block text-[9px] font-black uppercase text-[#B4B9C7] mb-1.5">Tipo de Produção</label>
                        <select className="w-full bg-[#0F111A] border border-white/10 rounded-xl px-4 py-2.5 outline-none focus:border-indigo-500 text-white text-sm" name="tipoProducao">
                            <option value="Videoaula">Gravação de videoaula</option>
                            <option value="Evento em estúdio">Evento em estúdio</option>
                            <option value="Vídeo institucional">Vídeo institucional</option>
                            <option value="Edição">Edição</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-[9px] font-black uppercase text-[#B4B9C7] mb-1.5">Formato</label>
                        <select className="w-full bg-[#0F111A] border border-white/10 rounded-xl px-4 py-2.5 outline-none focus:border-indigo-500 text-white text-sm" name="formato">
                            <option value="Podcast / Mesacast">Podcast / Mesacast</option>
                            <option value="Live presencial">Live presencial</option>
                            <option value="Gravação de programa">Gravação de programa</option>
                            <option value="Shorts / Reels">Shorts / Reels</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-[9px] font-black uppercase text-[#B4B9C7] mb-1.5">Distribuição</label>
                        <select className="w-full bg-[#0F111A] border border-white/10 rounded-xl px-4 py-2.5 outline-none focus:border-indigo-500 text-white text-sm" name="distribuicao">
                            <option value="interna">Veiculação Interna</option>
                            <option value="seec">Canal da SEEC</option>
                            <option value="instagram">Instagram da SEEC</option>
                        </select>
                    </div>

                    {/* Seção 3: Logística e Prazos (Step 4) */}
                    <div className="md:col-span-3 border-b border-white/5 pb-2 mt-4">
                        <span className="text-indigo-400 text-[10px] font-black uppercase tracking-widest">3. Logística e Prazos</span>
                    </div>
                    <div>
                        <label className="block text-[9px] font-black uppercase text-[#B4B9C7] mb-1.5">Local de Gravação</label>
                        <select className="w-full bg-[#0F111A] border border-white/10 rounded-xl px-4 py-2.5 outline-none focus:border-indigo-500 text-white text-sm" name="localGravacao">
                            <option value="Natal">Estúdio Natal</option>
                            <option value="Mossoró">Estúdio Mossoró</option>
                            <option value="Externo">Externo (In Loco)</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-[9px] font-black uppercase text-[#B4B9C7] mb-1.5">Data da Gravação</label>
                        <input required className="w-full bg-[#0F111A] border border-white/10 rounded-xl px-4 py-2.5 outline-none focus:border-indigo-500 text-white text-sm" name="dataGravacao" type="date" />
                    </div>
                    <div>
                        <label className="block text-[9px] font-black uppercase text-[#B4B9C7] mb-1.5">Hora da Gravação</label>
                        <input required className="w-full bg-[#0F111A] border border-white/10 rounded-xl px-4 py-2.5 outline-none focus:border-indigo-500 text-white text-sm" name="horaGravacao" type="time" />
                    </div>
                    <div>
                        <label className="block text-[9px] font-black uppercase text-[#B4B9C7] mb-1.5">Pessoas em Cena</label>
                        <input required className="w-full bg-[#0F111A] border border-white/10 rounded-xl px-4 py-2.5 outline-none focus:border-indigo-500 text-white text-sm" name="pessoasEmCena" type="number" />
                    </div>
                    <div>
                        <label className="block text-[9px] font-black uppercase text-[#B4B9C7] mb-1.5">Duração (Minutos)</label>
                        <input required className="w-full bg-[#0F111A] border border-white/10 rounded-xl px-4 py-2.5 outline-none focus:border-indigo-500 text-white text-sm" name="duracaoMinutos" type="number" />
                    </div>
                    <div>
                        <label className="block text-[9px] font-black uppercase text-[#B4B9C7] mb-1.5">Prazo de Entrega Final</label>
                        <input required className="w-full bg-[#0F111A] border border-white/10 rounded-xl px-4 py-2.5 outline-none focus:border-indigo-500 text-white text-sm" name="dataLimite" type="date" />
                    </div>

                    <div className="md:col-span-3 flex gap-8 py-4 border-y border-white/5 my-2">
                        <label className="flex items-center gap-3 cursor-pointer group">
                            <input className="w-5 h-5 accent-indigo-500" name="libras" type="checkbox" />
                            <span className="text-[10px] font-black uppercase text-[#B4B9C7] group-hover:text-white transition-colors">Requer LIBRAS</span>
                        </label>
                        <label className="flex items-center gap-3 cursor-pointer group">
                            <input className="w-5 h-5 accent-indigo-500" name="legendas" type="checkbox" />
                            <span className="text-[10px] font-black uppercase text-[#B4B9C7] group-hover:text-white transition-colors">Requer CC</span>
                        </label>
                    </div>

                    <div className="md:col-span-3 grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-[9px] font-black uppercase text-indigo-400 mb-1.5">Descrição do Conteúdo</label>
                            <textarea className="w-full bg-[#0F111A] border border-white/10 rounded-xl px-4 py-2.5 outline-none focus:border-indigo-500 text-white text-sm custom-scrollbar" name="descricao" rows={3} />
                        </div>
                        <div>
                            <label className="block text-[9px] font-black uppercase text-indigo-400 mb-1.5">Observações Finais</label>
                            <textarea className="w-full bg-[#0F111A] border border-white/10 rounded-xl px-4 py-2.5 outline-none focus:border-indigo-500 text-white text-sm custom-scrollbar" name="observacoes" rows={3} />
                        </div>
                    </div>

                    <footer className="md:col-span-3 flex justify-end gap-4 pt-6 border-t border-white/5 mt-4">
                        <button className="px-6 py-3 text-[10px] font-black uppercase text-[#B4B9C7] hover:text-white transition-all" type="button" onClick={onClose}>Cancelar</button>
                        <button className="bg-indigo-600 hover:bg-indigo-500 px-10 py-3 rounded-xl text-[10px] font-black uppercase text-white shadow-lg shadow-indigo-900/20 transition-all" type="submit">Gerar Card de Produção</button>
                    </footer>
                </form>
            </div>
        </div>
    );
}