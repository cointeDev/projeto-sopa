/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { useState } from "react";
import type { Card } from "../../pages/GestorLocal";

interface ModalProps {
    onClose: () => void;
    onSave: (dadosNovoCard: Omit<Card, "id" | "etapa" | "acessibilidade">) => void; 
}

export function CreateCardModal({ onClose, onSave }: ModalProps) {
  const [mostrarExterno, setMostrarExterno] = useState(false);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    
    const tipoProduction = formData.get("tipoProducao") as string;
    const localSel = formData.get("localGravacao") as string;
    const localFinal = localSel === "Externo" ? (formData.get("localExterno") as string) : localSel;

    const dadosNovoCard = {
      titulo: formData.get("titulo") as string,
      responsavel: formData.get("responsavel") as string,
      email: formData.get("email") as string,
      setor: formData.get("setor") as string,
      telefone: formData.get("telefone") as string,
      localGravacao: localFinal,
      dataGravacao: formData.get("dataGravacao") as string,
      horaGravacao: formData.get("horaGravacao") as string,
      limiteEntrega: formData.get("limiteEntrega") as string,
      tipoProducao: tipoProduction,
      formatoEspecifico: formData.get("formatoEspecifico") as string,
      
      projeto: formData.get("projeto") as string,
      disciplina: formData.get("disciplina") as string,
      duracaoMinutos: Number(formData.get("duracaoMinutos")),
      isAoVivo: tipoProduction.toLowerCase().includes("live") || (formData.get("formatoEspecifico") as string).toLowerCase().includes("live"),
      
      libras: formData.get("libras") === "on",
      legendas: formData.get("legendas") === "on",
      descricao: formData.get("descricao") as string,
      equipe: Number(formData.get("equipe")),
    };

    onSave(dadosNovoCard);
  };

  return (
    <div className="bg-black/60 backdrop-blur-sm fixed flex inset-0 items-center justify-center z-50 p-4">
      <div className="bg-[#161825] max-h-[95vh] max-w-5xl overflow-y-auto p-8 rounded-2xl shadow-2xl text-white w-full border border-white/10 custom-scrollbar">
        <header className="border-b border-white/10 flex items-center justify-between mb-8 pb-4">
          <div>
            <h2 className="font-black text-2xl text-indigo-400 uppercase tracking-tighter">Novo Processo de Produção</h2>
            <p className="text-[#B4B9C7] text-xs mt-1">Preencha os dados conforme a solicitação oficial da RIEH/SEEC</p>
          </div>
          <button 
            className="hover:rotate-90 hover:text-white text-[#B4B9C7] text-3xl transition-all duration-300" 
            type="button"
            onClick={onClose}
          >
            ×
          </button>
        </header>

        <form className="space-y-8" onSubmit={handleSubmit}>
          {/* Seção 1: Identificação e Projeto (Step 3 e Contexto) */}
          <div className="space-y-4">
            <h3 className="text-sm font-bold text-indigo-400 uppercase tracking-widest flex items-center gap-2">
              <span className="w-2 h-2 bg-indigo-500 rounded-full"></span> Identificação do Conteúdo
            </h3>
            <div className="gap-4 grid grid-cols-1 md:grid-cols-4">
              <div className="md:col-span-4">
                <label className="block font-bold mb-2 text-[#B4B9C7] text-xs uppercase">Título do Vídeo (Step 3)</label>
                <input required className="bg-[#0F111A] border border-white/10 focus:border-indigo-500 outline-none px-4 py-3 rounded-lg text-white w-full transition-all" name="titulo" placeholder="Ex: Aula 01 - Revolução Industrial" />
              </div>
              <div className="md:col-span-2">
                <label className="block font-bold mb-2 text-[#B4B9C7] text-xs uppercase">Projeto / Programa</label>
                <input required className="bg-[#0F111A] border border-white/10 focus:border-indigo-500 outline-none px-4 py-3 rounded-lg text-white w-full" name="projeto" placeholder="Ex: Se Liga no ENEM" />
              </div>
              <div className="md:col-span-2">
                <label className="block font-bold mb-2 text-[#B4B9C7] text-xs uppercase">Disciplina / Componente</label>
                <input required className="bg-[#0F111A] border border-white/10 focus:border-indigo-500 outline-none px-4 py-3 rounded-lg text-white w-full" name="disciplina" placeholder="Ex: História" />
              </div>
            </div>
          </div>

          {/* Seção 2: Responsável (Step 1) */}
          <div className="space-y-4">
            <h3 className="text-sm font-bold text-indigo-400 uppercase tracking-widest flex items-center gap-2">
              <span className="w-2 h-2 bg-indigo-500 rounded-full"></span> Solicitante (Step 1)
            </h3>
            <div className="gap-4 grid grid-cols-1 md:grid-cols-3">
              <div>
                <label className="block font-bold mb-2 text-[#B4B9C7] text-xs uppercase">Nome do Responsável</label>
                <input required className="bg-[#0F111A] border border-white/10 px-4 py-3 rounded-lg text-white w-full outline-none focus:border-indigo-500" name="responsavel" />
              </div>
              <div>
                <label className="block font-bold mb-2 text-[#B4B9C7] text-xs uppercase">Setor (Sigla)</label>
                <input required className="bg-[#0F111A] border border-white/10 px-4 py-3 rounded-lg text-white w-full outline-none focus:border-indigo-500" name="setor" />
              </div>
              <div>
                <label className="block font-bold mb-2 text-[#B4B9C7] text-xs uppercase">Telefone</label>
                <input required className="bg-[#0F111A] border border-white/10 px-4 py-3 rounded-lg text-white w-full outline-none focus:border-indigo-500" name="telefone" placeholder="(84) 99999-9999" />
              </div>
            </div>
          </div>

          {/* Seção 3: Tipo e Formato (Step 2) */}
          <div className="bg-white/5 border border-white/10 p-6 rounded-2xl space-y-6">
            <h3 className="text-sm font-bold text-indigo-400 uppercase tracking-widest flex items-center gap-2">
              <span className="w-2 h-2 bg-indigo-500 rounded-full"></span> Definição de Produção (Step 2)
            </h3>
            <div className="gap-6 grid grid-cols-1 md:grid-cols-3">
              <div>
                <label className="block font-bold mb-3 text-[#B4B9C7] text-xs uppercase">Tipo</label>
                <select className="bg-[#0F111A] border border-white/10 px-4 py-3 rounded-lg text-white w-full outline-none focus:border-indigo-400" name="tipoProducao">
                  <option value="Videoaula">Videoaula</option>
                  <option value="Evento">Evento</option>
                  <option value="Institucional">Institucional</option>
                  <option value="Chamada">Chamada</option>
                  <option value="Edição">Edição</option>
                </select>
              </div>
              <div>
                <label className="block font-bold mb-3 text-[#B4B9C7] text-xs uppercase">Formato</label>
                <select className="bg-[#0F111A] border border-white/10 px-4 py-3 rounded-lg text-white w-full outline-none focus:border-indigo-400" name="formatoEspecifico">
                  <option value="Live pré-gravada">Live pré-gravada</option>
                  <option value="Live presencial (em estúdio)">Live presencial (em estúdio)</option>
                  <option value="Live remota">Live remota</option>
                  <option value="Podcast / Mesacast">Podcast / Mesacast</option>
                  <option value="Gravação de programa">Gravação de programa</option>
                  <option value="Shorts / Reels">Shorts / Reels</option>
                  <option value="Animações para eventos in loco">Animações para eventos in loco</option>
                  <option value="Criação, edição e animações">Criação, edição e animações</option>
                </select>
              </div>
              <div>
                <label className="block font-bold mb-3 text-[#B4B9C7] text-xs uppercase">Duração (Minutos)</label>
                <input required className="bg-[#0F111A] border border-white/10 px-4 py-3 rounded-lg text-white w-full" name="duracaoMinutos" placeholder="Ex: 40" type="number" />
              </div>
            </div>
          </div>

          {/* Seção 4: Local, Datas e Equipe (Step 1 e 4) */}
          <div className="gap-6 grid grid-cols-1 md:grid-cols-4">
            <div>
              <label className="block font-bold mb-2 text-[#B4B9C7] text-xs uppercase">Estúdio / Polo</label>
              <select 
                required 
                className="bg-[#0F111A] border border-white/10 px-4 py-3 rounded-lg text-white w-full outline-none focus:border-indigo-500" 
                name="localGravacao"
                onChange={(event) => {
                  setMostrarExterno(event.target.value === "Externo");
                }}
              >
                <option value="">Selecione</option>
                <option value="Natal">Natal</option>
                <option value="Mossoró">Mossoró</option>
                <option value="Pau dos Ferros">Pau dos Ferros</option>
                <option value="Caicó">Caicó</option>
                <option value="Externo">Externo</option>
              </select>
            </div>
            {mostrarExterno && (
              <div>
                <label className="block font-bold mb-2 text-[#B4B9C7] text-xs uppercase">Onde?</label>
                <input required className="bg-[#0F111A] border border-white/10 px-4 py-3 rounded-lg text-white w-full" name="localExterno" placeholder="Local externo" />
              </div>
            )}
            <div className={mostrarExterno ? "md:col-span-1" : "md:col-span-1"}>
              <label className="block font-bold mb-2 text-[#B4B9C7] text-xs uppercase">Data Gravação</label>
              <input required className="bg-[#0F111A] border border-white/10 px-4 py-3 rounded-lg text-white w-full" name="dataGravacao" type="date" />
            </div>
            <div>
              <label className="block font-bold mb-2 text-[#B4B9C7] text-xs uppercase">Hora</label>
              <input required className="bg-[#0F111A] border border-white/10 px-4 py-3 rounded-lg text-white w-full" name="horaGravacao" type="time" />
            </div>
            <div>
              <label className="block font-bold mb-2 text-[#B4B9C7] text-xs uppercase">Prazo Entrega</label>
              <input required className="bg-[#0F111A] border border-white/10 px-4 py-3 rounded-lg text-white w-full" name="limiteEntrega" type="date" />
            </div>
          </div>

          {/* Seção 5: Descrição e Acessibilidade (Step 3 e 4) */}
          <div className="gap-6 grid grid-cols-1 md:grid-cols-3">
            <div className="md:col-span-2">
              <label className="block font-bold mb-2 text-[#B4B9C7] text-xs uppercase">Descrição e Observações</label>
              <textarea className="bg-[#0F111A] border border-white/10 focus:border-indigo-500 outline-none px-4 py-3 rounded-lg text-white w-full" name="descricao" placeholder="Descreva o conteúdo e observações finais..." rows={4} />
            </div>
            <div className="space-y-6">
              <div>
                <label className="block font-bold mb-2 text-[#B4B9C7] text-xs uppercase">Pessoas em Cena</label>
                <input className="bg-[#0F111A] border border-white/10 px-4 py-3 rounded-lg text-white w-full" name="equipe" placeholder="Qtd" type="number" />
              </div>
              <div className="pt-2">
                <label className="block font-bold mb-4 text-[#B4B9C7] text-xs uppercase">Acessibilidade</label>
                <div className="flex gap-6">
                  <label className="flex items-center gap-3 cursor-pointer group">
                    <input className="w-5 h-5 accent-indigo-500" name="libras" type="checkbox" />
                    <span className="text-sm font-medium group-hover:text-indigo-400 transition-colors">Libras</span>
                  </label>
                  <label className="flex items-center gap-3 cursor-pointer group">
                    <input className="w-5 h-5 accent-indigo-500" name="legendas" type="checkbox" />
                    <span className="text-sm font-medium group-hover:text-indigo-400 transition-colors">Legendas</span>
                  </label>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-white/10 flex gap-6 justify-end pt-8">
            <button className="text-sm font-bold text-[#B4B9C7] hover:text-white px-4 transition-colors" type="button" onClick={onClose}>CANCELAR</button>
            <button className="bg-indigo-600 hover:bg-indigo-500 text-white font-black px-12 py-4 rounded-xl transition-all shadow-xl shadow-indigo-900/20 active:scale-95 uppercase tracking-widest" type="submit">
              Gerar Card de Produção
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}