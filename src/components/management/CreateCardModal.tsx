/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
type ModalProps = {
  onClose: () => void;
};

export function CreateCardModal({ onClose }: ModalProps) {
  return (
    <div className="bg-black/60 backdrop-blur-sm fixed flex inset-0 items-center justify-center z-50">
      <div className="bg-[#161825] max-h-[90vh] max-w-4xl overflow-y-auto p-8 rounded-2xl shadow-2xl text-white w-full">
        <header className="border-b border-white/10 flex items-center justify-between mb-6 pb-4">
          <h2 className="font-extrabold text-xl">Cadastrar Novo Processo </h2>
          <button
            className="hover:text-white text-[#B4B9C7] text-2xl"
            onClick={onClose}
          >
            ×
          </button>
        </header>

        <form className="space-y-6">
          {/* Seção 1: Identificação e Contato */}
          <div className="gap-4 grid grid-cols-1 md:grid-cols-4">
            <div className="md:col-span-4">
              <label className="block font-bold mb-2 text-[#B4B9C7] text-sm">Título do Material / Pedido</label>
              <input
                className="bg-[#0F111A] border border-white/10 focus:border-indigo-500 outline-none px-4 py-3 rounded-lg text-white w-full"
                placeholder="Ex: Vídeoaula de IA Aplicada"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block font-bold mb-2 text-[#B4B9C7] text-sm">Responsável / Solicitante</label>
              <input
                className="bg-[#0F111A] border border-white/10 px-4 py-2 rounded-lg text-white w-full"
                type="text"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block font-bold mb-2 text-[#B4B9C7] text-sm">E-mail do Responsável</label>
              <input
                className="bg-[#0F111A] border border-white/10 px-4 py-2 rounded-lg text-white w-full"
                placeholder="email@exemplo.com"
                type="email"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block font-bold mb-2 text-[#B4B9C7] text-sm">Setor (Sigla)</label>
              <input
                className="bg-[#0F111A] border border-white/10 px-4 py-2 rounded-lg text-white w-full"
                type="text"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block font-bold mb-2 text-[#B4B9C7] text-sm">Telefone</label>
              <input
                className="bg-[#0F111A] border border-white/10 px-4 py-2 rounded-lg text-white w-full"
                placeholder="(xx) xxxxx-xxxx"
                type="tel"
              />
            </div>
          </div>

          {/* Seção 2: Local e Prazos */}
          <div className="gap-4 grid grid-cols-1 md:grid-cols-3">
            <div>
              <label className="block font-bold mb-2 text-[#B4B9C7] text-sm">Local de Gravação</label>
              <select className="bg-[#0F111A] border border-white/10 px-4 py-2 rounded-lg text-white w-full">
                <option value="Natal">Natal</option>
                <option value="Mossoró">Mossoró</option>
                <option value="Pau dos Ferros">Pau dos Ferros</option>
                <option value="Caicó">Caicó</option>
                <option value="Externo">Externo</option>
              </select>
            </div>

            <div>
              <label className="block font-bold mb-2 text-[#B4B9C7] text-sm">Data da Gravação</label>
              <input
                className="bg-[#0F111A] border border-white/10 px-4 py-2 rounded-lg text-white w-full"
                type="date"
              />
            </div>

            <div>
              <label className="block font-bold mb-2 text-[#B4B9C7] text-sm">Limite de Entrega</label>
              <input
                className="bg-[#0F111A] border border-white/10 px-4 py-2 rounded-lg text-white w-full"
                type="date"
              />
            </div>
          </div>

          {/* Seção 3: Tipo, Formato e Acessibilidade */}
          <div className="bg-white/5 border border-white/5 gap-6 grid grid-cols-1 md:grid-cols-3 p-4 rounded-xl">
            <div>
              <label className="block font-bold mb-3 text-[#B4B9C7] text-sm">Tipo de Produção</label>
              <select className="bg-[#0F111A] border border-white/10 px-4 py-2 rounded-lg text-white w-full">
                <option value="Evento">Evento</option>
                <option value="Institucional">Institucional</option>
                <option value="Chamada">Chamada</option>
                <option value="Videoaula">Videoaula</option>
                <option value="Edição">Edição</option>
              </select>
            </div>

            <div>
              <label className="block font-bold mb-3 text-[#B4B9C7] text-sm">Formato Específico</label>
              <select className="bg-[#0F111A] border border-white/10 px-4 py-2 rounded-lg text-white w-full">
                <option value="Live pré-gravada">Live pré-gravada</option>
                <option value="Live presencial">Live presencial (em estúdio)</option>
                <option value="Live remota">Live remota</option>
                <option value="Podcast">Podcast / Mesacast</option>
                <option value="Programa">Gravação de programa</option>
                <option value="Shorts">Shorts / Reels</option>
                <option value="Animações">Animações para eventos</option>
                <option value="Criação">Criação, edição e animações</option>
              </select>
            </div>

            <div className="flex flex-col">
              <label className="block font-bold mb-3 text-[#B4B9C7] text-sm">Acessibilidade</label>
              <div className="flex gap-4 pt-1">
                <label className="cursor-pointer flex items-center gap-2">
                  <input
                    className="accent-indigo-500 h-5 w-5"
                    type="checkbox"
                  />
                  <span className="text-sm">Libras</span>
                </label>
                <label className="cursor-pointer flex items-center gap-2">
                  <input
                    className="accent-indigo-500 h-5 w-5"
                    type="checkbox"
                  />
                  <span className="text-sm">Legendas</span>
                </label>
              </div>
            </div>
          </div>

          {/* Seção 4: Detalhes e Roteiro */}
          <div className="gap-4 grid grid-cols-1 md:grid-cols-4">
            <div className="md:col-span-3">
              <label className="block font-bold mb-2 text-[#B4B9C7] text-sm">Descrição do Conteúdo</label>
              <textarea
                className="bg-[#0F111A] border border-white/10 focus:border-indigo-500 outline-none px-4 py-3 rounded-lg text-white w-full"
                placeholder="Descreva brevemente o conteúdo do material..."
                rows={3}
              />
            </div>

            <div className="md:col-span-1">
              <label className="block font-bold mb-2 text-[#B4B9C7] text-sm">Equipe / Pessoas</label>
              <input
                className="bg-[#0F111A] border border-white/10 px-4 py-2 rounded-lg text-white w-full"
                placeholder="Qtd"
                type="number"
              />

              <label className="block font-bold mb-2 mt-4 text-[#B4B9C7] text-sm">Briefing / Arquivo</label>
              <input
                className="bg-[#0F111A] border border-white/10 px-4 py-2 rounded-lg text-sm text-white w-full"
                type="file"
              />
            </div>
          </div>

          <div className="border-t border-white/10 flex gap-4 justify-end pt-6">
            <button
              className="font-bold hover:text-white text-[#B4B9C7] text-sm"
              type="button"
              onClick={onClose}
            >
              Cancelar
            </button>
            <button
              className="bg-indigo-500 font-bold hover:bg-indigo-400 px-6 py-2 rounded-xl transition-colors"
              type="submit"
            >
              Confirmar e Criar Card
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}