 
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { useState } from "react";
import { Link } from "@tanstack/react-router";

/**
 * Tela de Login Administrativo - Padrão Light SOPA v1.0.4
 * Refatorada para fundo claro com container branco puro
 */
export function Login() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  function fazerLogin() {
    // Integração futura com API / Auth
    console.log("Login:", { email, senha });
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F1F5F9] font-inter px-4 transition-colors duration-500">

      <div className="w-full max-w-md bg-white rounded-[2.5rem] p-10 shadow-2xl shadow-slate-200/60 border border-slate-100 animate-in fade-in zoom-in duration-500">

        {/* LOGO - Utilizando versão colorida ou escura para fundo claro */}
        <div className="flex justify-center mb-8">
          <img
            alt="COINTE"
            className="h-24 object-contain"
            src="/assets/logo_cointe_color.png" 
          />
        </div>

        {/* TEXTO DE CABEÇALHO */}
        <div className="text-center mb-10">
          <h1 className="text-3xl font-black text-[#334155] mb-2 tracking-tighter uppercase leading-none">
            Bem-vindo
          </h1>
          <p className="text-sm font-medium text-slate-400 leading-relaxed uppercase tracking-widest text-[10px]">
            Acesso ao Painel Administrativo
          </p>
        </div>

        {/* FORMULÁRIO */}
        <form
          className="space-y-6"
          onSubmit={(event_) => {
            event_.preventDefault();
            fazerLogin();
          }}
        >

          <div className="space-y-2">
            <label className="block text-[10px] font-black uppercase text-slate-400 tracking-widest pl-1">
              E-mail institucional
            </label>
            <input
              placeholder="seu.email@instituicao.com"
              type="email"
              value={email}
              className="w-full rounded-2xl bg-[#F8FAFC] border border-slate-200
                         px-6 py-4 text-sm font-bold text-[#334155]
                         placeholder:text-slate-300
                         focus:outline-none focus:ring-2 focus:ring-[#4f46e5]/20
                         transition-all"
              onChange={(event_) => { setEmail(event_.target.value); }}
            />
          </div>

          <div className="space-y-2">
            <label className="block text-[10px] font-black uppercase text-slate-400 tracking-widest pl-1">
              Senha
            </label>
            <input
              placeholder="••••••••"
              type="password"
              value={senha}
              className="w-full rounded-2xl bg-[#F8FAFC] border border-slate-200
                         px-6 py-4 text-sm font-bold text-[#334155]
                         placeholder:text-slate-300
                         focus:outline-none focus:ring-2 focus:ring-[#4f46e5]/20
                         transition-all"
              onChange={(event_) => { setSenha(event_.target.value); }}
            />
          </div>

          <button
            type="submit"
            className="w-full mt-8 flex items-center justify-center gap-2
                       rounded-2xl bg-[#4f46e5] py-5 font-black text-xs text-white
                       uppercase tracking-[0.2em] shadow-xl shadow-indigo-100
                       hover:bg-[#3730a3] hover:-translate-y-0.5 transition-all active:scale-95"
          >
            Entrar no Sistema
          </button>
        </form>

        {/* VOLTAR */}
        <div className="mt-10 text-center border-t border-slate-50 pt-6">
          <Link
            className="text-[10px] font-black uppercase tracking-widest text-indigo-600 hover:text-indigo-400 transition-colors"
            to="/"
          >
            ← Voltar para a Home
          </Link>
        </div>
      </div>
    </div>
  );
}