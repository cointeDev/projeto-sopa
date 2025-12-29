/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
type QuadroProps = {
  visaoQuadro: "geral" | "focada";
  setVisaoQuadro: (v: "geral" | "focada") => void;
};

export function QuadroProduction({ visaoQuadro, setVisaoQuadro }: QuadroProps) {
  const colunas = [
    "Standby",
    "Para Produção Semanal",
    "Ao Vivo",
    "Gravado",
    "Edição 1",
    "Edição 2",
    "Edição 3",
    "Edição Final",
    "Libras",
    "Revisão LP",
    "Produção LSE",
    "Concluído",
    "Publicado",
  ];

  return (
    <>
      {/* CONTROLES */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-extrabold text-white">
          Quadro de Produção
        </h2>

        <div className="flex gap-2">
          <button
            className={`px-4 py-2 rounded-lg text-sm font-bold transition
              ${
                visaoQuadro === "focada"
                  ? "bg-indigo-500 text-white"
                  : "bg-[#0F111A] text-[#B4B9C7] border border-white/10"
              }`}
            onClick={() => { setVisaoQuadro("focada"); }}
          >
            ☷ Comparar
          </button>

          <button
            className={`px-4 py-2 rounded-lg text-sm font-bold transition
              ${
                visaoQuadro === "geral"
                  ? "bg-indigo-500 text-white"
                  : "bg-[#0F111A] text-[#B4B9C7] border border-white/10"
              }`}
            onClick={() => { setVisaoQuadro("geral"); }}
          >
            ⠿ Visão Geral
          </button>
        </div>
      </div>

      {/* VISÃO GERAL */}
      {visaoQuadro === "geral" && (
        <div className="flex gap-4 overflow-x-auto
                        bg-[#0F111A] p-4 rounded-xl">
          {colunas.map((col) => (
            <div
              key={col}
              className="min-w-[300px] bg-[#161825]
                         border border-white/10
                         rounded-xl p-3"
            >
              <h3 className="text-sm font-bold text-[#B4B9C7] mb-3">
                {col}
              </h3>

              {/* CARD MOCK */}
              <div className="bg-[#0F111A] rounded-lg p-4
                              border border-white/10
                              text-white text-sm">
                Aula de Matemática
              </div>
            </div>
          ))}
        </div>
      )}

      {/* VISÃO FOCADA */}
      {visaoQuadro === "focada" && (
        <div className="grid grid-cols-2 gap-6
                        bg-[#0F111A] p-6 rounded-xl
                        border border-white/10">
          <div className="text-center text-[#B4B9C7] col-span-2">
            Selecione colunas para comparar
          </div>
        </div>
      )}
    </>
  );
}
