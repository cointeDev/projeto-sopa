/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Link } from "@tanstack/react-router";
import { Footer } from "../common/Footer";

export default function Step6() {
    return (
        <div className="text-center py-20 animate-in fade-in zoom-in duration-700 font-inter">
            {/* Ícone de Sucesso Visual */}
            <div className="mb-8 flex justify-center">
                <div className="rounded-full bg-emerald-50 p-6 border border-emerald-100 shadow-sm">
                    <svg 
                        className="w-16 h-16 text-emerald-500" 
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24"
                    >
                        <path 
                            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" 
                            strokeLinecap="round" 
                            strokeLinejoin="round" 
                            strokeWidth="2" 
                        />
                    </svg>
                </div>
            </div>

            <h3 className="text-4xl font-black text-emerald-600 mb-6 uppercase tracking-tighter leading-none">
                Solicitação enviada com sucesso
            </h3>
            
            <p className="text-slate-500 font-medium mb-10 max-w-md mx-auto leading-relaxed">
                Sua demanda foi registrada. Você poderá acompanhar o andamento 
                usando o <span className="text-[#334155] font-bold">token enviado para o seu e-mail institucional</span>.
            </p>

            <div className="space-y-4">
                <Link 
                    className="rounded-[1.25rem] bg-[#4f46e5] px-14 py-5 text-xs font-black text-white shadow-xl shadow-indigo-100 uppercase tracking-widest active:scale-95 transition-all hover:bg-[#3730a3] inline-block" 
                    to="/tokenstatus"
                >
                    Consultar status
                </Link>
                
                <Link 
                    className="block text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-indigo-500 transition-colors" 
                    to="/"
                >
                    Voltar para o Início
                </Link>
            </div>

            <div className="mt-16 pt-8 border-t border-slate-50">
                <Footer />
            </div>
        </div>
    );
}