import { redirect } from "@tanstack/react-router";

type UserRole = "GESTOR_GERAL" | "GESTOR_LOCAL" | "OPERACIONAL";

// Correção 1 e 2: Mudei para Array<UserRole> e adicionei o retorno ": void"
export function protectRoute(allowedRoles: Array<UserRole>): void {
	const token = localStorage.getItem("auth_token");
	const role = localStorage.getItem("user_role") as UserRole;

	if (!token) {
		// Correção 3: O TanStack Router precisa deste throw, então desativamos o aviso do ESLint nesta linha
		// eslint-disable-next-line @typescript-eslint/only-throw-error
		throw redirect({
			to: "/login",
			search: {
				redirect: typeof location !== "undefined" ? location.href : undefined,
			},
		});
	}

	if (!allowedRoles.includes(role)) {
		alert("Não tem permissão para acessar a esta página.");

		// Correção 3: Mesma coisa aqui, desativamos o aviso para permitir o redirect
		// eslint-disable-next-line @typescript-eslint/only-throw-error
		throw redirect({
			to: "/login",
		});
	}
}
