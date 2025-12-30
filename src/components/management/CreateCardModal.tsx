/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import type { Card } from "../../pages/GestorLocal";

interface ModalProps {
    onClose: () => void;
    onSave: (dadosNovoCard: Omit<Card, "id" | "etapa" | "acessibilidade">) => void; 
}

export function CreateCardModal({ onClose, onSave }: ModalProps) {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    
    const dadosNovoCard = {
      titulo: formData.get("titulo") as string,
      responsavel: formData.get("responsavel") as string,
      email: formData.get("email") as string,
      setor: formData.get("setor") as string,
      telefone: formData.get("telefone") as string,
      localGravacao: formData.get("localGravacao") as string,
      dataGravacao: formData.get("dataGravacao") as string,
      limiteEntrega: formData.get("limiteEntrega") as string,
      tipoProducao: formData.get("tipoProducao") as string,
      formatoEspecifico: formData.get("formatoEspecifico") as string,
      libras: formData.get("libras") === "on",
      legendas: formData.get("legendas") === "on",
      descricao: formData.get("descricao") as string,
      equipe: Number(formData.get("equipe")),
    };

    onSave(dadosNovoCard);
  };

  return (
    <div className="bg-black/60 backdrop-blur-sm fixed flex inset-0 items-center justify-center z-50">
      <div className="bg-[#161825] max-h-[90vh] max-w-4xl overflow-y-auto p-8 rounded-2xl shadow-2xl text-white w-full">
        <header className="border-b border-white/10 flex items-center justify-between mb-6 pb-4">
          <h2 className="font-extrabold text-xl">Cadastrar Novo Processo</h2>
          <button className="hover:text-white text-[#B4B9C7] text-2xl" onClick={onClose}>×</button>
        </header>

        <form className="space-y-6" onSubmit={handleSubmit}>
          <div className="gap-4 grid grid-cols-1 md:grid-cols-4">
            <div className="md:col-span-4">
              <label className="block font-bold mb-2 text-[#B4B9C7] text-sm">Título do Material</label>
              <input required className="bg-[#0F111A] border border-white/10 focus:border-indigo-500 outline-none px-4 py-3 rounded-lg text-white w-full" name="titulo" />
            </div>
            <div className="md:col-span-2">
              <label className="block font-bold mb-2 text-[#B4B9C7] text-sm">Responsável</label>
              <input required className="bg-[#0F111A] border border-white/10 px-4 py-2 rounded-lg text-white w-full" name="responsavel" />
            </div>
            <div className="md:col-span-2">
              <label className="block font-bold mb-2 text-[#B4B9C7] text-sm">E-mail</label>
              <input required className="bg-[#0F111A] border border-white/10 px-4 py-2 rounded-lg text-white w-full" name="email" type="email" />
            </div>
            <div className="md:col-span-2">
              <label className="block font-bold mb-2 text-[#B4B9C7] text-sm">Setor (Sigla)</label>
              <input className="bg-[#0F111A] border border-white/10 px-4 py-2 rounded-lg text-white w-full" name="setor" />
            </div>
            <div className="md:col-span-2">
              <label className="block font-bold mb-2 text-[#B4B9C7] text-sm">Telefone</label>
              <input className="bg-[#0F111A] border border-white/10 px-4 py-2 rounded-lg text-white w-full" name="telefone" />
            </div>
          </div>

          <div className="gap-4 grid grid-cols-1 md:grid-cols-3">
            <div>
              <label className="block font-bold mb-2 text-[#B4B9C7] text-sm">Local</label>
              <select className="bg-[#0F111A] border border-white/10 px-4 py-2 rounded-lg text-white w-full" name="localGravacao">
                <option value="Natal">Natal</option>
                <option value="Mossoró">Mossoró</option>
                <option value="Externo">Externo</option>
              </select>
            </div>
            <div>
              <label className="block font-bold mb-2 text-[#B4B9C7] text-sm">Data Gravação</label>
              <input className="bg-[#0F111A] border border-white/10 px-4 py-2 rounded-lg text-white w-full" name="dataGravacao" type="date" />
            </div>
            <div>
              <label className="block font-bold mb-2 text-[#B4B9C7] text-sm">Limite Entrega</label>
              <input className="bg-[#0F111A] border border-white/10 px-4 py-2 rounded-lg text-white w-full" name="limiteEntrega" type="date" />
            </div>
          </div>

          <div className="bg-white/5 border border-white/5 gap-6 grid grid-cols-1 md:grid-cols-3 p-4 rounded-xl">
            <div>
              <label className="block font-bold mb-3 text-[#B4B9C7] text-sm">Tipo de Produção</label>
              <select className="bg-[#0F111A] border border-white/10 px-4 py-2 rounded-lg text-white w-full" name="tipoProducao">
                <option value="Videoaula">Videoaula</option>
                <option value="Institucional">Institucional</option>
              </select>
            </div>
            <div>
              <label className="block font-bold mb-3 text-[#B4B9C7] text-sm">Formato</label>
              <select className="bg-[#0F111A] border border-white/10 px-4 py-2 rounded-lg text-white w-full" name="formatoEspecifico">
                <option value="Podcast">Podcast</option>
                <option value="Shorts">Shorts</option>
              </select>
            </div>
            <div className="flex flex-col">
              <label className="block font-bold mb-3 text-[#B4B9C7] text-sm">Acessibilidade</label>
              <div className="flex gap-4 pt-1">
                <label className="cursor-pointer flex items-center gap-2">
                  <input className="accent-indigo-500 h-5 w-5" name="libras" type="checkbox" />
                  <span className="text-sm">Libras</span>
                </label>
                <label className="cursor-pointer flex items-center gap-2">
                  <input className="accent-indigo-500 h-5 w-5" name="legendas" type="checkbox" />
                  <span className="text-sm">Legendas</span>
                </label>
              </div>
            </div>
          </div>

          <div className="gap-4 grid grid-cols-1 md:grid-cols-4">
            <div className="md:col-span-3">
              <label className="block font-bold mb-2 text-[#B4B9C7] text-sm">Descrição</label>
              <textarea className="bg-[#0F111A] border border-white/10 px-4 py-3 rounded-lg text-white w-full" name="descricao" rows={3} />
            </div>
            <div className="md:col-span-1">
              <label className="block font-bold mb-2 text-[#B4B9C7] text-sm">Equipe (Qtd)</label>
              <input className="bg-[#0F111A] border border-white/10 px-4 py-2 rounded-lg text-white w-full" name="equipe" type="number" />
            </div>
          </div>

          <div className="border-t border-white/10 flex gap-4 justify-end pt-6">
            <button className="font-bold text-[#B4B9C7] text-sm" type="button" onClick={onClose}>Cancelar</button>
            <button className="bg-indigo-500 font-bold px-6 py-2 rounded-xl" type="submit">Confirmar e Criar Card</button>
          </div>
        </form>
      </div>
    </div>
  );
}