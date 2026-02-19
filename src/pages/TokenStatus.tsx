/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { z } from "zod";
import { buscarSolicitacaoPorToken } from "../services/solicitacoes";

type Solicitacao = {
  id: string;
  titulo: string;
  nomeProjeto?: string;
  status: "PENDENTE" | "ACEITO" | "REJEITADA" | "ESTORNO";
  Etapa?: {
    id: number;
    nome: string;
  };
  createdAt: string;
};

const tokenSchema = z.string().regex(
  /^SOPA-\d{4}\-\d{2}-[0-9a-fA-F]{8}$/,
  "Formato inválido. Ex: SOPA-2026/02-4c249225"
);

export function TokenStatus() {
  const [token, setToken] = useState("");
  const [solicitacao, setSolicitacao] = useState<Solicitacao | null>(null);
  const [loading, setLoading] = useState(false);
  const [erro, setErro] = useState("");

  async function consultarToken() {
    setErro("");
    setSolicitacao(null);

    const validacao = tokenSchema.safeParse(token);

    if (!validacao.success) {
      setErro(validacao.error.errors[0].message);
      return;
    }

    try {
      setLoading(true);

      const data = await buscarSolicitacaoPorToken(token);

      setSolicitacao(data);
    } catch {
      setErro("Token não encontrado. Verifique e tente novamente.");
    } finally {
      setLoading(false);
    }
  }

  function traduzirStatus(status: string) {
    switch (status) {
      case "PENDENTE":
        return "Pendente";
      case "ACEITO":
        return "Em Produção";
      case "REJEITADA":
        return "Rejeitada";
      case "ESTORNO":
        return "Devolvida";
      default:
        return status;
    }
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

          <form
            className="space-y-5"
            onSubmit={(e) => {
              e.preventDefault();
              consultarToken();
            }}
          >
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest pl-1">
                Token de Acesso
              </label>
              <input
                className="w-full rounded-2xl bg-[#F8FAFC] border border-slate-200 px-6 py-5 text-[#334155] font-bold outline-none focus:ring-2 focus:ring-indigo-500/20 transition-all"
                placeholder="SOPA-2026-02-xxxxxxxx"
                value={token}
                onChange={(e) => setToken(e.target.value)}
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

          {erro && (
            <p className="mt-6 text-xs font-bold text-red-500 uppercase tracking-widest text-center italic">
              {erro}
            </p>
          )}

          <div className="mt-10 pt-6 border-t border-slate-50 text-center">
            <Link
              className="text-[10px] font-black uppercase tracking-widest text-indigo-600 hover:text-indigo-400"
              to="/"
            >
              ← Voltar para a Home
            </Link>
          </div>
        </aside>

        {/* PAINEL STATUS */}
        <section className="bg-white rounded-[2.5rem] p-12 shadow-2xl shadow-slate-200/60 border border-slate-100 relative overflow-hidden min-h-[600px]">

          {loading && (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-white/90 backdrop-blur-sm z-20">
              <div className="h-12 w-12 rounded-2xl border-4 border-indigo-100 border-t-indigo-600 animate-spin mb-4" />
              <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">
                Sincronizando Dados...
              </p>
            </div>
          )}

          {!solicitacao && !loading && (
            <div className="h-full flex flex-col items-center justify-center text-center">
              <p className="text-xl font-black text-slate-300 uppercase tracking-tighter">
                Nenhum pedido ativo
              </p>
              <p className="text-xs font-bold text-slate-400 mt-2 uppercase tracking-widest opacity-60">
                Insira um token válido ao lado
              </p>
            </div>
          )}

          {solicitacao && !loading && (
            <div className="animate-in fade-in slide-in-from-right-8 duration-700">
              <header className="mb-12 flex justify-between items-start">
                <div>
                  <h3 className="text-4xl font-black text-[#334155] tracking-tighter uppercase leading-none">
                    {solicitacao.titulo}
                  </h3>
                  <p className="text-[10px] font-black text-slate-400 mt-3 uppercase tracking-[0.3em]">
                    Projeto: {solicitacao.nomeProjeto ?? "Não informado"}
                  </p>
                  <p className="text-[10px] font-black text-slate-300 mt-2 uppercase tracking-widest">
                    Protocolo: {solicitacao.id}
                  </p>
                </div>

                <span className="px-5 py-2 rounded-full text-[9px] font-black uppercase tracking-widest bg-indigo-50 text-indigo-600 border border-indigo-100">
                  {traduzirStatus(solicitacao.status)}
                </span>
              </header>

              <div className="mt-10">
                <h4 className="text-xs font-black text-slate-300 uppercase tracking-[0.3em] mb-4">
                  Etapa Atual
                </h4>
                <p className="text-lg font-bold text-slate-600">
                  {solicitacao.Etapa?.nome ?? "Ainda não iniciada"}
                </p>
              </div>

              <div className="mt-10 text-sm text-slate-400">
                <p>
                  Solicitação criada em{" "}
                  {new Date(solicitacao.createdAt).toLocaleDateString()}
                </p>
              </div>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
