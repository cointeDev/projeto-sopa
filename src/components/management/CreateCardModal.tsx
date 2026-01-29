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
            projeto: formData.get("projeto") as string,
            tipoProducao: formData.get("tipoProducao") as string,
            localGravacao: formData.get("localGravacao") as string,
            duracaoMinutos: Number(formData.get("duracaoMinutos")),
            dataGravacao: formData.get("dataGravacao") as string,
            descricao: formData.get("descricao") as string,
            libras: formData.get("libras") === "on",
            legendas: formData.get("legendas") === "on",
            acessibilidade: []
        };
        onSave(dados);
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
            <div className="bg-[#161825] w-full max-w-4xl rounded-3xl border border-white/10 shadow-2xl overflow-hidden animate-fade-in">
                <header className="px-8 py-6 border-b border-white/5 flex justify-between items-center">
                    <h2 className="text-xl font-black text-white uppercase tracking-widest">Novo Planeamento de Produção</h2>
                    <button className="text-[#B4B9C7] hover:text-white text-2xl" type="button" onClick={onClose}>×</button>
                </header>
                
                <form className="p-8 grid grid-cols-1 md:grid-cols-2 gap-6 max-h-[75vh] overflow-y-auto custom-scrollbar" onSubmit={handleSubmit}>
                    <div className="md:col-span-2">
                        <label className="block text-[10px] font-black uppercase text-indigo-400 mb-2">Título do Conteúdo</label>
                        <input required className="w-full bg-[#0F111A] border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-indigo-500 text-white" name="titulo" />
                    </div>
                    <div>
                        <label className="block text-[10px] font-black uppercase text-indigo-400 mb-2">Solicitante</label>
                        <input required className="w-full bg-[#0F111A] border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-indigo-500 text-white" name="responsavel" />
                    </div>
                    <div>
                        <label className="block text-[10px] font-black uppercase text-indigo-400 mb-2">Projeto / Disciplina</label>
                        <input required className="w-full bg-[#0F111A] border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-indigo-500 text-white" name="projeto" />
                    </div>
                    <div>
                        <label className="block text-[10px] font-black uppercase text-indigo-400 mb-2">Tipo de Produção</label>
                        <select className="w-full bg-[#0F111A] border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-indigo-500 text-white" name="tipoProducao">
                            <option value="Videoaula">Videoaula</option>
                            <option value="Ao Vivo">Transmissão Ao Vivo</option>
                            <option value="Podcast">Podcast</option>
                            <option value="Entrevista">Entrevista</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-[10px] font-black uppercase text-indigo-400 mb-2">Local</label>
                        <select className="w-full bg-[#0F111A] border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-indigo-500 text-white" name="localGravacao">
                            <option value="Natal">Estúdio Natal</option>
                            <option value="Mossoró">Estúdio Mossoró</option>
                            <option value="Externo">Gravação Externa</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-[10px] font-black uppercase text-indigo-400 mb-2">Data Prevista</label>
                        <input required className="w-full bg-[#0F111A] border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-indigo-500 text-white" name="dataGravacao" type="date" />
                    </div>
                    <div>
                        <label className="block text-[10px] font-black uppercase text-indigo-400 mb-2">Duração (Minutos)</label>
                        <input required className="w-full bg-[#0F111A] border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-indigo-500 text-white" name="duracaoMinutos" type="number" />
                    </div>
                    <div className="md:col-span-2 flex gap-8 py-4 border-y border-white/5">
                        <label className="flex items-center gap-3 cursor-pointer">
                            <input className="w-5 h-5 accent-indigo-500" name="libras" type="checkbox" />
                            <span className="text-[10px] font-black uppercase text-[#B4B9C7]">LIBRAS</span>
                        </label>
                        <label className="flex items-center gap-3 cursor-pointer">
                            <input className="w-5 h-5 accent-indigo-500" name="legendas" type="checkbox" />
                            <span className="text-[10px] font-black uppercase text-[#B4B9C7]">Legendas (CC)</span>
                        </label>
                    </div>
                    <div className="md:col-span-2">
                        <label className="block text-[10px] font-black uppercase text-indigo-400 mb-2">Observações</label>
                        <textarea className="w-full bg-[#0F111A] border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-indigo-500 text-white" name="descricao" rows={3} />
                    </div>
                    <footer className="md:col-span-2 flex justify-end gap-4 pt-4">
                        <button className="px-6 py-3 text-[10px] font-black uppercase text-[#B4B9C7] hover:text-white" type="button" onClick={onClose}>Cancelar</button>
                        <button className="bg-indigo-600 hover:bg-indigo-500 px-8 py-3 rounded-xl text-[10px] font-black uppercase text-white shadow-lg" type="submit">Gerar Card</button>
                    </footer>
                </form>
            </div>
        </div>
    );
}