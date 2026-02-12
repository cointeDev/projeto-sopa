/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { useState } from "react";
import { Link, useNavigate } from "@tanstack/react-router";
import { useMutation } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import { api } from "../services/api";

// 1. Definimos o que esperamos receber do Backend
interface LoginResponse {
	access_token: string;
	role: string;
	local: string;
}

// 2. Definimos o formato do erro (opcional, mas ajuda)
interface ApiErrorResponse {
	message: string;
}

export function Login() {
	// CORREÇÃO 1: Adicionei o setLogin e removi referências a "email"
	const [login, setLogin] = useState("");
	const [senha, setSenha] = useState("");
	const navigate = useNavigate();

	const mutation = useMutation({
		mutationFn: async () => {
			// CORREÇÃO 2: Tipamos o post com <LoginResponse>
			const response = await api.post<LoginResponse>("/auth/login", {
				login: login,
				password: senha,
			});
			return response.data;
		},
		onSuccess: (data) => {
			localStorage.setItem("auth_token", data.access_token);
			localStorage.setItem("user_role", data.role);

			const redirects: Record<string, string> = {
				GESTOR_GERAL: "/gestor-geral",
				GESTOR_LOCAL: "/gestor-local",
				OPERACIONAL: "/operacional",
			};

			// CORREÇÃO 3: 'void' diz pro ESLint que não vamos esperar essa Promise agora (corrige floating-promises)
			void navigate({ to: redirects[data.role] || "/" });
		},
		onError: (error: AxiosError<ApiErrorResponse>) => {
			// CORREÇÃO 4: Acesso seguro aos dados do erro
			const mensagem = error.response?.data?.message || "Erro ao fazer login";
			alert(mensagem);
		},
	});

	function fazerLogin() {
		mutation.mutate();
	}

	return (
		<div className="min-h-screen flex items-center justify-center bg-[#F1F5F9] font-inter px-4 transition-colors duration-500">
			<div className="w-full max-w-md bg-white rounded-[2.5rem] p-10 shadow-2xl shadow-slate-200/60 border border-slate-100 animate-in fade-in zoom-in duration-500">
				{/* LOGO */}
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
							Login (Usuário)
						</label>
						{/* CORREÇÃO 5: Trocado 'email' e 'setEmail' por 'login' e 'setLogin' */}
						<input
							placeholder="seu.login"
							type="text"
							value={login}
							className="w-full rounded-2xl bg-[#F8FAFC] border border-slate-200
                         px-6 py-4 text-sm font-bold text-[#334155]
                         placeholder:text-slate-300
                         focus:outline-none focus:ring-2 focus:ring-[#4f46e5]/20
                         transition-all"
							onChange={(event_) => {
								setLogin(event_.target.value);
							}}
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
							onChange={(event_) => {
								setSenha(event_.target.value);
							}}
						/>
					</div>

					<button
						type="submit"
						disabled={mutation.isPending} // Desabilita botão enquanto carrega
						className="w-full mt-8 flex items-center justify-center gap-2
                       rounded-2xl bg-[#4f46e5] py-5 font-black text-xs text-white
                       uppercase tracking-[0.2em] shadow-xl shadow-indigo-100
                       hover:bg-[#3730a3] hover:-translate-y-0.5 transition-all active:scale-95
                       disabled:opacity-50 disabled:cursor-not-allowed"
					>
						{mutation.isPending ? "ENTRANDO..." : "ENTRAR NO SISTEMA"}
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
