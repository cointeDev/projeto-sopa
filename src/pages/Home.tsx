/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { Link } from "@tanstack/react-router";

/**
 * Tela Home - Padrão Light SOPA v1.0.4
 * Refatorada para fundo claro mantendo o posicionamento original
 */
export function Home() {
    return (
        <div className="min-h-screen grid grid-cols-1 lg:grid-cols-[65%_35%] bg-[#F1F5F9] font-inter">
            {/* PAINEL ESQUERDO: Imagem de fundo com Máscara Suave */}
            <div className="relative hidden lg:block bg-slate-200">
                <div
                    className="absolute inset-0 bg-cover bg-center mix-blend-multiply opacity-90 saturate-110"
                    style={{
                        backgroundImage: "url('/assets/bg-estudio.jpg')",
                        // Máscara ajustada para o tom claro da aplicação
                        maskImage: "linear-gradient(to right, black 85%, transparent 100%)",
                        WebkitMaskImage: "linear-gradient(to right, black 85%, transparent 100%)",
                    }}
                />
            </div>

            {/* PAINEL DIREITO: Conteúdo e Ações (Fundo Light) */}
            <section className="relative z-10 flex flex-col bg-white px-6 py-12 lg:px-10 shadow-[-10px_0_30px_rgba(0,0,0,0.05)]">
                <div className="flex flex-1 flex-col justify-center gap-8 mt-8">
                    {/* CABEÇALHO DE TEXTO */}
                    <div>
                        <h1
                            className="text-[#334155] font-black tracking-tight leading-tight
                                     text-[clamp(2.2rem,4vw,5rem)] mb-6 pb-1"
                        >
                            S.O.P.A.
                        </h1>

                        <h4 className="text-[#4f46e5] uppercase tracking-[3px] font-black text-xs mb-4">
                            Sistema Organizacional para Produções Audiovisuais
                        </h4>

                        <p className="text-slate-500 text-lg leading-relaxed max-w-[90%] font-medium">
                            Centralize solicitações, gerencie pautas de estúdio e
                            acompanhe o fluxo de produção de mídia da
                            COINTE em um só lugar.
                        </p>
                    </div>

                    {/* BLOCO DE AÇÕES */}
                    <div className="w-full max-w-115">
                        <Link
                            to="/solicitar"
                            className="flex items-center justify-center gap-3 w-full mb-4
                                     rounded-xl px-6 py-5 font-black text-white uppercase tracking-widest
                                     bg-[#4f46e5] hover:bg-[#3730a3]
                                     shadow-xl shadow-indigo-100
                                     hover:-translate-y-1 hover:shadow-indigo-200
                                     transition-all duration-300"
                        >
                            <svg
                                className="h-6 w-6"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth={2.5}
                                viewBox="0 0 24 24"
                            >
                                <circle cx="12" cy="12" r="10" />
                                <line x1="12" x2="12" y1="8" y2="16" />
                                <line x1="8" x2="16" y1="12" y2="12" />
                            </svg>
                            Novo Pedido de Produção
                        </Link>

                        <div className="flex gap-4 w-full max-lg:flex-col">
                            <Link
                                to="/tokenstatus"
                                className="flex-1 text-center rounded-lg border-2 border-slate-100
                                           py-3 text-sm font-black text-slate-400 uppercase tracking-widest
                                           hover:border-[#4f46e5] hover:text-[#4f46e5] hover:bg-indigo-50 transition-all"
                            >
                                Consultar Pedido
                            </Link>

                            <Link
                                to="/login"
                                className="flex-1 text-center rounded-lg border-2 border-slate-100
                                           py-3 text-sm font-black text-slate-400 uppercase tracking-widest
                                           hover:border-[#4f46e5] hover:text-[#4f46e5] hover:bg-indigo-50 transition-all"
                            >
                                Login Administrativo
                            </Link>
                        </div>
                    </div>
                </div>

                {/* RODAPÉ LOGOS */}
                <footer className="mt-12 flex flex-col gap-6 text-slate-400">
                    <div className="flex gap-8 text-[10px] font-black uppercase tracking-widest">
                        <div className="flex items-center gap-2">
                            <span className="h-2 w-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.4)]" />
                            Estúdios Operantes
                        </div>
                        <div className="flex items-center gap-2 opacity-60">
                             <div className="h-px w-4 bg-slate-300" />
                             Fluxo Digital
                        </div>
                    </div>

                    <div className="flex items-center gap-8 pt-6 border-t border-slate-100 flex-wrap">
                        <img
                            alt="SEEC RN"
                            className="max-h-12 grayscale opacity-40 hover:grayscale-0 hover:opacity-100 transition-all"
                            src="/assets/brasao_seec_color.png" 
                        />
                        <span className="h-10 w-px bg-slate-100" />
                        <img
                            alt="COINTE"
                            className="max-h-14 opacity-40 hover:opacity-100 transition-all"
                            src="/assets/logo_cointe_color.png"
                        />
                    </div>
                </footer>
            </section>
        </div>
    );
}