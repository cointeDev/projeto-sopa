/* eslint-disable unicorn/prevent-abbreviations */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { useState } from "react";
import { Link } from "@tanstack/react-router";

export function Login() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  function fazerLogin() {
    // Aqui depois você liga com API / auth
    console.log("Login:", { email, senha });
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0F111A] font-inter px-4">

      <div className="w-full max-w-md bg-[#161825] rounded-2xl p-8 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.6)]">

        {/* LOGO */}
        <div className="flex justify-center mb-6">
          <img
            alt="COINTE"
            className="h-30"
            src="/assets/logo_cointe_white.png"
          />
        </div>

        {/* TEXTO */}
        <div className="text-center mb-8">
          <h1 className="text-2xl font-extrabold text-white mb-2">
            Bem-vindo de volta
          </h1>
          <p className="text-sm text-[#B4B9C7] leading-relaxed">
            Entre com suas credenciais para acessar o painel administrativo.
          </p>
        </div>

        {/* FORM */}
        <form
          className="space-y-5"
          onSubmit={(e) => {
            e.preventDefault();
            fazerLogin();
          }}
        >

          <div>
            <label className="block text-sm font-semibold text-[#D1D5DB] mb-2">
              E-mail institucional
            </label>
            <input
              placeholder="seu.email@instituicao.com"
              type="email"
              value={email}
              className="w-full rounded-lg bg-[#0F111A] border border-white/10
                         px-4 py-3 text-sm text-white
                         placeholder:text-white/30
                         focus:outline-none focus:ring-2 focus:ring-indigo-500"
              onChange={(e) => { setEmail(e.target.value); }}
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-[#D1D5DB] mb-2">
              Senha
            </label>
            <input
              placeholder="••••••••"
              type="password"
              value={senha}
              className="w-full rounded-lg bg-[#0F111A] border border-white/10
                         px-4 py-3 text-sm text-white
                         placeholder:text-white/30
                         focus:outline-none focus:ring-2 focus:ring-indigo-500"
              onChange={(e) => { setSenha(e.target.value); }}
            />
          </div>

          <button
            type="submit"
            className="w-full mt-6 flex items-center justify-center gap-2
                       rounded-xl bg-indigo-500 py-4 font-bold text-white
                       hover:bg-indigo-400
                       shadow-[0_8px_30px_-10px_rgba(99,102,241,0.7)]
                       hover:-translate-y-0.5 transition-all"
          >
            Entrar
          </button>
        </form>

        {/* VOLTAR */}
        <div className="mt-8 text-center">
          <Link
            className="text-sm font-semibold text-indigo-400 hover:underline"
            to="/"
          >
            ← Voltar para a Home
          </Link>
        </div>
      </div>
    </div>
  );
}
