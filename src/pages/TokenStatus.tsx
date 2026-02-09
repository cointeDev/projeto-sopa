 
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
    <div className="min-h-screen bg-[#F1F5F9] font-inter px-6 py-10">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-[420px_1fr] gap-10">

        {/* PAINEL TOKEN */}
        <aside className="bg-white rounded-[2.5rem] p-10 shadow-2xl shadow-slate-200/60 border border-slate-100 self-start sticky top-10">
          <h2 className="text-3xl font-black text-[#334155] mb-2 tracking-tighter uppercase">
            Consultar Pedido
          </h2>
          <p className="text-sm font-medium text-slate-400 mb-8">
            Acompanhe o fluxo de produção em tempo real.
          </p>

          <form className="space-y-5" onSubmit={(event_) => { event_.preventDefault(); consultarToken(); }}>
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest pl-1">Token de Acesso</label>
              <input
                className="w-full rounded-2xl bg-[#F8FAFC] border border-slate-200 px-6 py-5 text-[#334155] font-bold outline-none focus:ring-2 focus:ring-indigo-500/20 transition-all"
                placeholder="Ex: SOPA-2026-..."
                value={token}
                onChange={(event_) => { setToken(event_.target.value); }}
              />
            </div>

            <button
              className="w-full rounded-2xl bg-[#4f46e5] py-5 font-black text-xs text-white uppercase tracking-[0.2em] shadow-xl shadow-indigo-100 hover:bg-[#3730a3] transition-all disabled:opacity-50"
              disabled={loading}
              type="submit"
            >
              {loading ? "Processando..." : "Consultar Status"}
            </button>
          </form>

          {erro && <p className="mt-6 text-xs font-bold text-red-500 uppercase tracking-widest text-center italic">{erro}</p>}

          <div className="mt-10 pt-6 border-t border-slate-50 text-center">
            <Link className="text-[10px] font-black uppercase tracking-widest text-indigo-600 hover:text-indigo-400" to="/">
              ← Voltar para a Home
            </Link>
          </div>
        </aside>

        {/* PAINEL STATUS (Estilo Quadro Light) */}
        <section className="bg-white rounded-[2.5rem] p-12 shadow-2xl shadow-slate-200/60 border border-slate-100 relative overflow-hidden min-h-[600px]">
          {loading && (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-white/90 backdrop-blur-sm z-20">
              <div className="h-12 w-12 rounded-2xl border-4 border-indigo-100 border-t-indigo-600 animate-spin mb-4" />
              <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Sincronizando Dados...</p>
            </div>
          )}

          {!status && !loading && (
            <div className="h-full flex flex-col items-center justify-center text-center">
              <div className="w-20 h-20 bg-slate-50 rounded-3xl flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-slate-200" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" strokeWidth={3} /></svg>
              </div>
              <p className="text-xl font-black text-slate-300 uppercase tracking-tighter">Nenhum pedido ativo</p>
              <p className="text-xs font-bold text-slate-400 mt-2 uppercase tracking-widest opacity-60">Insira um token válido ao lado</p>
            </div>
          )}

          {status === "andamento" && !loading && (
            <div className="animate-in fade-in slide-in-from-right-8 duration-700">
              <header className="mb-12 flex justify-between items-start">
                <div>
                  <h3 className="text-4xl font-black text-[#334155] tracking-tighter uppercase leading-none">Vídeo Aula de Cálculo</h3>
                  <p className="text-[10px] font-black text-slate-400 mt-3 uppercase tracking-[0.3em]">Projeto: SEEC/RN — Studio A</p>
                </div>
                <span className="px-5 py-2 rounded-full text-[9px] font-black uppercase tracking-widest bg-amber-50 text-amber-500 border border-amber-100">Em Produção</span>
              </header>

              {/* STEPPER DE STATUS (Estilo Horizontal Light) */}
              <div className="flex items-center mb-16 px-4">
                {["Recebido", "Gravação", "Edição", "Libras", "Concluído"].map((etapa, index) => (
                  <div key={etapa} className="flex items-center flex-1 last:flex-none group">
                    <div className="flex flex-col items-center relative">
                      <div className={`h-12 w-12 rounded-2xl flex items-center justify-center font-black text-sm transition-all duration-500 shadow-sm
                        ${index < 2 ? "bg-[#4f46e5] text-white scale-110 shadow-indigo-200" : "bg-slate-50 text-slate-300 border border-slate-100"}`}>
                        {index + 1}
                      </div>
                      <span className={`absolute -bottom-8 text-[8px] font-black uppercase tracking-widest whitespace-nowrap ${index < 2 ? "text-[#334155]" : "text-slate-300"}`}>{etapa}</span>
                    </div>
                    {index < 4 && <div className={`flex-1 h-1 mx-4 rounded-full transition-colors duration-1000 ${index < 1 ? "bg-indigo-500" : "bg-slate-100"}`} />}
                  </div>
                ))}
              </div>

              {/* TIMELINE (Estilo Gestor Local) */}
              <div className="mt-20">
                <h4 className="text-xs font-black text-slate-300 uppercase tracking-[0.3em] mb-8 flex items-center gap-4">
                  Histórico de Atividades <div className="h-px bg-slate-100 flex-1" />
                </h4>

                <div className="space-y-8">
                  <div className="relative pl-8 border-l-2 border-indigo-500/30">
                    <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-white border-4 border-indigo-500 shadow-sm" />
                    <div className="text-xs font-black text-[#334155] uppercase tracking-widest">Material em decupagem — 11/02/2026</div>
                    <p className="text-sm font-medium text-slate-500 mt-1 italic">A equipe de LIBRAS iniciou a decupagem do roteiro pedagógico.</p>
                  </div>

                  <div className="relative pl-8 border-l-2 border-slate-100">
                    <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-white border-4 border-slate-200" />
                    <div className="text-xs font-black text-slate-400 uppercase tracking-widest">Solicitação Recebida — 10/02/2026</div>
                    <p className="text-sm font-medium text-slate-400 mt-1 italic">A demanda foi triada e aprovada pelo COINTE.</p>
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