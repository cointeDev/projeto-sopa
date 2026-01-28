/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import type { Card } from "../../pages/GestorLocal";

interface ModalProps {
    onClose: () => void;
    // Tipagem alinhada com o GestorLocal para resolver TS2322
    onSave: (dadosNovoCard: Omit<Card, "id" | "etapa">) => void; 
}

export function CreateCardModal({ onClose, onSave }: ModalProps) {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const localSel = formData.get("localGravacao") as string;

    const dadosNovoCard: Omit<Card, "id" | "etapa"> = {
      titulo: formData.get("titulo") as string,
      responsavel: formData.get("responsavel") as string,
      projeto: formData.get("projeto") as string,
      tipoProducao: formData.get("tipoProducao") as string,
      descricao: formData.get("descricao") as string, // Agora reconhecido pelo contrato
      dataGravacao: formData.get("dataGravacao") as string,
      libras: formData.get("libras") === "on",
      legendas: formData.get("legendas") === "on",
      localGravacao: localSel === "Externo" ? (formData.get("localExterno") as string) : localSel,
      duracaoMinutos: Number(formData.get("duracaoMinutos")),
      acessibilidade: [] 
    };

    onSave(dadosNovoCard);
  };

  return (
    <div className="bg-black/60 backdrop-blur-sm fixed flex inset-0 items-center justify-center z-50 p-4">
      <div className="bg-[#161825] max-h-[95vh] max-w-5xl overflow-y-auto p-8 rounded-3xl shadow-2xl text-white w-full border border-white/10 custom-scrollbar">
        <header className="border-b border-white/10 flex items-center justify-between mb-8 pb-4">
          <h2 className="font-black text-2xl text-indigo-400 uppercase tracking-tighter">Novo Processo</h2>
          <button className="text-3xl text-[#B4B9C7] hover:text-white transition-all" type="button" onClick={onClose}>×</button>
        </header>

        <form className="space-y-8" onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="md:col-span-2">
              <label className="block font-black mb-2 text-[#B4B9C7] text-xs uppercase tracking-widest">Título do Vídeo</label>
              <input required className="bg-[#0F111A] border border-white/10 focus:border-indigo-500 outline-none px-4 py-3 rounded-xl text-white w-full transition-all" name="titulo" />
            </div>
            <div>
              <label className="block font-black mb-2 text-[#B4B9C7] text-xs uppercase tracking-widest">Projeto</label>
              <input required className="bg-[#0F111A] border border-white/10 focus:border-indigo-500 outline-none px-4 py-3 rounded-xl text-white w-full" name="projeto" />
            </div>
            <div>
              <label className="block font-black mb-2 text-[#B4B9C7] text-xs uppercase tracking-widest">Data Gravação</label>
              <input required className="bg-[#0F111A] border border-white/10 px-4 py-3 rounded-xl text-white w-full" name="dataGravacao" type="date" />
            </div>
            <div className="md:col-span-2">
              <label className="block font-black mb-2 text-[#B4B9C7] text-xs uppercase tracking-widest">Descrição / Observações</label>
              <textarea className="bg-[#0F111A] border border-white/10 focus:border-indigo-500 outline-none px-4 py-3 rounded-xl text-white w-full" name="descricao" rows={3} />
            </div>
          </div>

          <div className="border-t border-white/10 flex gap-6 justify-end pt-8">
            <button className="text-xs font-black uppercase tracking-widest text-[#B4B9C7] hover:text-white px-4 transition-colors" type="button" onClick={onClose}>Cancelar</button>
            <button className="bg-indigo-600 hover:bg-indigo-500 text-white font-black px-10 py-4 rounded-xl transition-all shadow-xl shadow-indigo-900/20 active:scale-95 uppercase text-xs tracking-widest" type="submit">Gerar Card de Produção</button>
          </div>
        </form>
      </div>
    </div>
  );
}