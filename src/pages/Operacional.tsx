/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { useState } from "react";
import { Link } from "@tanstack/react-router";
import Agenda from "../components/management/Agenda";
import PainelTarefas from "../components/PainelTarefas";

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
						{(["tarefas", "quadro", "agenda"] as Array<AbaOperacional>).map(
							(key) => (
								<button
									key={key}
									className={`py-8 text-[10px] font-black uppercase tracking-[0.2em] transition-all border-b-2 
                  ${abaAtual === key ? "text-[#4f46e5] border-[#4f46e5]" : "text-slate-300 border-transparent hover:text-slate-400"}`}
									onClick={() => {
										setAbaAtual(key);
									}}
								>
									{key === "tarefas"
										? "Painel de Tarefas"
										: key === "quadro"
											? "Quadro de Produção"
											: "Agenda do Estúdio"}
								</button>
							)
						)}
					</nav>

					<Link
						className="text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-red-500 transition-colors"
						to="/"
					>
						Sair
					</Link>
				</header>

				{/* CONTEÚDO OPERACIONAL */}
				<div className="p-12">
					<div className="mb-12 pb-10 border-b border-slate-50 flex justify-between items-end">
						<div>
							<h2 className="text-5xl font-black text-[#334155] tracking-tighter uppercase leading-none">
								Olá, {userName}!
							</h2>
							<p className="text-sm font-medium text-slate-400 mt-4 italic">
								Organize suas demandas técnicas e prazos de edição.
							</p>
						</div>
						<div className="flex gap-4">
							<div className="bg-emerald-50 text-emerald-600 px-6 py-3 rounded-2xl border border-emerald-100 text-[10px] font-black uppercase tracking-widest shadow-sm">
								Status: Online
							</div>
						</div>
					</div>

					{/* RENDERIZAÇÃO DAS ABAS */}
					{abaAtual === "tarefas" && <PainelTarefas />}

					{abaAtual === "quadro" && (
						<div className="bg-[#F8FAFC] border-2 border-dashed border-slate-200 rounded-[2.5rem] p-20 text-center">
							<p className="text-xl font-black text-slate-300 uppercase tracking-tighter">
								Módulo de Visualização em Breve
							</p>
							<p className="text-[10px] font-black text-slate-400 mt-2 uppercase tracking-widest italic">
								Apenas etapas filtradas para sua atuação técnica.
							</p>
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
