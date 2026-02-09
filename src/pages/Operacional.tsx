/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { useState } from "react";
import { Link } from "@tanstack/react-router";
import Agenda from "../components/management/Agenda";

type AbaOperacional = "tarefas" | "quadro" | "agenda";

export default function Operacional() {
  const [abaAtual, setAbaAtual] = useState<AbaOperacional>("tarefas");
  const userName = "João";

  return (
    <div className="min-h-screen bg-[#F1F5F9] px-6 py-10 font-inter">
      <div className="max-w-7xl mx-auto bg-white rounded-[2.5rem] shadow-2xl shadow-slate-200/60 overflow-hidden border border-slate-100">
        
        {/* HEADER OPERACIONAL */}
        <header className="flex items-center justify-between border-b border-slate-100 px-10 bg-white/80 backdrop-blur-sm sticky top-0 z-10">
          <nav className="flex gap-10">
            {(["tarefas", "quadro", "agenda"] as Array<AbaOperacional>).map((key) => (
              <button
                key={key}
                className={`py-8 text-[10px] font-black uppercase tracking-[0.2em] transition-all border-b-2 
                  ${abaAtual === key ? "text-[#4f46e5] border-[#4f46e5]" : "text-slate-300 border-transparent hover:text-slate-400"}`}
                onClick={() => { setAbaAtual(key); }}
              >
                {key === "tarefas" ? "Painel de Tarefas" : key === "quadro" ? "Quadro de Produção" : "Agenda do Estúdio"}
              </button>
            ))}
          </nav>

          <Link className="text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-red-500 transition-colors" to="/">Sair</Link>
        </header>

        {/* CONTEÚDO OPERACIONAL */}
        <div className="p-12">
          <div className="mb-12 pb-10 border-b border-slate-50 flex justify-between items-end">
            <div>
              <h2 className="text-5xl font-black text-[#334155] tracking-tighter uppercase leading-none">Olá, {userName}!</h2>
              <p className="text-sm font-medium text-slate-400 mt-4 italic">Organize suas demandas técnicas e prazos de edição.</p>
            </div>
            <div className="flex gap-4">
               <div className="bg-emerald-50 text-emerald-600 px-6 py-3 rounded-2xl border border-emerald-100 text-[10px] font-black uppercase tracking-widest shadow-sm">Status: Online</div>
            </div>
          </div>

          {abaAtual === "tarefas" && (
            <section className="animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="grid grid-cols-1 gap-5">
                {[1, 2].map((index) => (
                  <div key={index} className="bg-[#F8FAFC] rounded-3xl p-8 border border-slate-100 flex items-center justify-between hover:shadow-xl hover:shadow-slate-200/40 transition-all group">
                    <div className="flex gap-6 items-center">
                      <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center shadow-sm text-[#4f46e5] group-hover:scale-110 transition-transform">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" strokeWidth={2.5} /></svg>
                      </div>
                      <div>
                        <p className="text-lg font-black text-[#334155] uppercase tracking-tighter leading-none">Decupagem de Roteiro Pedagógico</p>
                        <p className="text-[10px] font-black text-slate-400 mt-2 uppercase tracking-[0.2em]">Projeto: Química — Aula 0{index} · Etapa: LIBRAS</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-6">
                      <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">📅 18/02/2026</span>
                      <span className="px-5 py-2 rounded-xl text-[9px] font-black uppercase tracking-widest bg-indigo-50 text-[#4f46e5] border border-indigo-100 shadow-sm">A Fazer</span>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {abaAtual === "quadro" && (
            <div className="bg-[#F8FAFC] border-2 border-dashed border-slate-200 rounded-[2.5rem] p-20 text-center">
              <p className="text-xl font-black text-slate-300 uppercase tracking-tighter">Módulo de Visualização em Breve</p>
              <p className="text-[10px] font-black text-slate-400 mt-2 uppercase tracking-widest italic">Apenas etapas filtradas para sua atuação técnica.</p>
            </div>
          )}

          {abaAtual === "agenda" && (
            <section className="animate-in fade-in duration-500">
              <Agenda scope="local" />
            </section>
          )}
        </div>
      </div>
    </div>
  );
}