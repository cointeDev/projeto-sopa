/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Link } from "@tanstack/react-router";
import { Footer } from "../common/Footer";

export default function Step6() {
	return (
		<div className="text-center py-24 animate-fade-in">
			<h3 className="text-3xl font-extrabold text-emerald-400 mb-4">
				Solicitação enviada com sucesso
			</h3>
			<p className="text-[#B4B9C7] mb-6">
				Você poderá acompanhar o andamento usando o token enviado por e-mail.
			</p>

			<Link className="btn-primario inline-block" to="/tokenstatus">
				Consultar status
			</Link>
			<Footer />
		</div>
	);
}
