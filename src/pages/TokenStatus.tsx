/* eslint-disable unicorn/prevent-abbreviations */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { useState } from "react";
import { Link } from "@tanstack/react-router";

type StatusType = "andamento" | "erro";

const TOKEN_EXEMPLO = "SOPA-2025-VID-9F3A";

export function TokenStatus() {
  const [token, setToken] = useState("");
  const [status, setStatus] = useState<StatusType | null>(null);
  const [loading, setLoading] = useState(false);
  const [erro, setErro] = useState("");

  function consultarToken() {
    setErro("");
    setStatus(null);
    setLoading(true);

    // Simula chamada de API
    setTimeout(() => {
      if (token.trim() === TOKEN_EXEMPLO) {
        setStatus("andamento");
      } else {
        setErro("Token não encontrado. Verifique e tente novamente.");
        setStatus("erro");
      }
      setLoading(false);
    }, 1200);
  }

  return (
    <div className="min-h-screen bg-[#0F111A] font-inter px-6 py-10">

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-[420px_1fr] gap-8">

        {/* PAINEL TOKEN */}
        <aside className="bg-[#161825] rounded-2xl p-8
                          shadow-[0_20px_60px_-15px_rgba(0,0,0,0.6)]
                          animate-fade-in self-start sticky top-10">

          <h2 className="text-xl font-extrabold text-white mb-2">
            Consultar Pedido
          </h2>

          <p className="text-sm text-[#B4B9C7] mb-4">
            Insira o token enviado por e-mail para acompanhar sua produção.
          </p>

          <p className="text-xs text-indigo-400 mb-6">
            Exemplo de token válido: <strong>{TOKEN_EXEMPLO}</strong>
          </p>

          <form
            className="space-y-4"
            onSubmit={(e) => {
              e.preventDefault();
              consultarToken();
            }}
          >
            <input
              placeholder="Cole o token aqui"
              value={token}
              className="w-full rounded-lg bg-[#0F111A] border border-white/10
                         px-4 py-3 text-white placeholder:text-white/30
                         focus:outline-none focus:ring-2 focus:ring-indigo-500
                         transition"
              onChange={(e) => { setToken(e.target.value); }}
            />

            <button
              disabled={loading}
              type="submit"
              className="w-full rounded-xl bg-indigo-500 py-3 font-bold text-white
                         hover:bg-indigo-400 transition
                         disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? "Consultando..." : "Consultar"}
            </button>
          </form>

          {erro && (
            <p className="mt-4 text-sm text-red-400 animate-shake">
              {erro}
            </p>
          )}

          <div className="mt-8 text-center">
            <Link className="text-sm text-indigo-400 hover:underline" to="/">
              ← Voltar para a Home
            </Link>
          </div>
        </aside>

        {/* PAINEL STATUS */}
        <section className="bg-[#161825] rounded-2xl p-10
                            shadow-[0_20px_60px_-15px_rgba(0,0,0,0.6)]
                            relative overflow-hidden">

          {/* LOADING */}
          {loading && (
            <div className="absolute inset-0 flex flex-col items-center justify-center
                            bg-[#161825]/80 backdrop-blur-sm
                            animate-fade-in">
              <div className="h-10 w-10 rounded-full border-4 border-indigo-500/30
                              border-t-indigo-500 animate-spin mb-4" />
              <p className="text-sm text-[#B4B9C7]">
                Buscando informações do pedido...
              </p>
            </div>
          )}

          {!status && !loading && (
            <div className="h-full flex flex-col items-center justify-center text-center
                            text-[#B4B9C7] animate-fade-in">
              <p className="text-lg font-semibold mb-2">
                Nenhum pedido consultado
              </p>
              <p className="text-sm">
                Utilize um token válido para visualizar o andamento.
              </p>
            </div>
          )}

          {status === "andamento" && !loading && (
            <div className="animate-slide-in-right">

              <header className="mb-10">
                <h3 className="text-2xl font-extrabold text-white">
                  Vídeo Aula de Cálculo
                </h3>
                <span className="inline-block mt-2 px-3 py-1 rounded-full
                                 text-xs font-bold
                                 bg-yellow-400/20 text-yellow-300">
                  EM ANDAMENTO
                </span>
              </header>

              {/* STEPPER */}
              <div className="flex items-center mb-12">
                {["Recebido", "Gravação", "Edição", "Libras", "Finalizado"].map(
                  (etapa, index) => (
                    <div key={etapa} className="flex items-center flex-1">
                      <div className={`h-9 w-9 rounded-full flex items-center justify-center
                        font-bold transition
                        ${index < 2
                          ? "bg-indigo-500 text-white scale-110"
                          : "border border-white/20 text-white/40"}`}>
                        {index + 1}
                      </div>
                      {index < 4 && (
                        <div className="flex-1 h-px bg-white/10 mx-4" />
                      )}
                    </div>
                  )
                )}
              </div>

              {/* TIMELINE */}
              <div>
                <h4 className="text-lg font-bold text-white mb-4">
                  Histórico de atividades
                </h4>

                <div className="border-l border-white/10 pl-6 space-y-6">
                  <div className="animate-fade-in">
                    <div className="text-sm font-semibold text-white">
                      Material em decupagem — 11/11/2025
                    </div>
                    <p className="text-sm text-[#B4B9C7]">
                      A equipe de LIBRAS iniciou a decupagem do roteiro.
                    </p>
                  </div>

                  <div className="animate-fade-in delay-150">
                    <div className="text-sm font-semibold text-white">
                      Material em edição — 10/11/2025
                    </div>
                    <p className="text-sm text-[#B4B9C7]">
                      Editor iniciou a montagem do primeiro corte.
                    </p>
                  </div>
                </div>
              </div>

            </div>
          )}
        </section>
      </div>
    </div>
  );
}
