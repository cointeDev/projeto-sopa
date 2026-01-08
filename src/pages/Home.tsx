import { Link } from "@tanstack/react-router";

import { Footer } from "../components/common/Footer";

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type, @typescript-eslint/explicit-module-boundary-types
export function Home() {
	return (
		<div className="min-h-screen grid grid-cols-1 lg:grid-cols-[65%_35%] bg-[#0F111A] font-inter">
			{/* PAINEL DIREITO */}
			<div className="relative hidden lg:block">
				<div
					className="absolute inset-0 bg-cover bg-center saturate-110"
					style={{
						backgroundImage: "url('/assets/bg-estudio.jpg')",
						maskImage: "linear-gradient(to right, transparent 0%, black 15%)",
						WebkitMaskImage:
							"linear-gradient(to right, transparent 0%, black 15%)",
					}}
				/>
			</div>

			{/* PAINEL ESQUERDO */}
			<section className="relative z-10 flex flex-col bg-[#161825] px-6 py-12 lg:px-10 shadow-[10px_0_30px_rgba(0,0,0,0.2)]">
				{/* CONTEÚDO CENTRAL */}
				<div className="flex flex-1 flex-col justify-center gap-8 mt-8">
					{/* TEXTO */}
					<div>
						<h1
							className="text-transparent bg-clip-text bg-linear-to-br from-white to-indigo-300 
                           font-black tracking-tight leading-tight
                           text-[clamp(2.2rem,4vw,5rem)] mb-6 pb-1"
						>
							S.O.P.A.
						</h1>

						<h4 className="text-indigo-400 uppercase tracking-[3px] font-extrabold text-xs my-8">
							Sistema Organizacional para Produções Audiovisuais
						</h4>

<<<<<<< HEAD
						<p className="text-[#B4B9C7] text-lg leading-relaxed max-w-[90%]">
							Centralize solicitações, gerencie pautas de estúdio e acompanhe o
							fluxo de produção de mídia da COINTE em um só lugar.
						</p>
					</div>
=======
          {/* AÇÕES */}
          <div className="w-full">
            <div className="max-w-115">
>>>>>>> 195f90c7c166bb08026010ecb11f2331db6114e2

					{/* AÇÕES */}
					<div className="w-full">
						<div className="max-w-[460px]">
							{/* CTA PRINCIPAL */}
							<Link
								to="/solicitar"
								className="flex items-center justify-center gap-3 w-full mb-4
                           rounded-xl px-6 py-5 font-bold text-white
                           bg-indigo-500 hover:bg-indigo-400
                           shadow-[0_4px_20px_-5px_rgba(99,102,241,0.6)]
                           hover:-translate-y-1 hover:shadow-[0_15px_30px_-10px_rgba(99,102,241,0.6)]
                           transition-all"
							>
								<svg
									className="h-6 w-6"
									fill="none"
									stroke="currentColor"
									strokeWidth={2}
									viewBox="0 0 24 24"
									xmlns="http://www.w3.org/2000/svg"
								>
									<circle cx="12" cy="12" r="10" />
									<line x1="12" x2="12" y1="8" y2="16" />
									<line x1="8" x2="16" y1="12" y2="12" />
								</svg>
								Novo Pedido de Produção
							</Link>

							{/* AÇÕES SECUNDÁRIAS */}
							<div className="flex gap-4 w-full max-lg:flex-col">
								<Link
									to="/tokenstatus"
									className="flex-1 text-center rounded-lg border border-white/20
                             py-3 text-sm font-semibold text-white
                             hover:border-white hover:bg-white/10 transition"
								>
									Consultar Pedido
								</Link>

								<Link
									to="/login"
									className="flex-1 text-center rounded-lg border border-white/20
                             py-3 text-sm font-semibold text-white
                             hover:border-white hover:bg-white/10 transition"
								>
									Login Administrativo
								</Link>
							</div>
						</div>
					</div>
				</div>

				{/* RODAPÉ */}
				<footer className="mt-12 flex flex-col gap-6 text-[#B4B9C7]">
					<div className="flex gap-8 text-xs font-semibold uppercase tracking-wide">
						<div className="flex items-center gap-2">
							<span className="h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_8px_#34D399]" />
							Estúdios Operantes
						</div>
						<div>Fluxo Digital</div>
					</div>

					<div className="flex items-center gap-8 pt-6 border-t border-white/5 flex-wrap">
						<img
							alt="SEEC RN"
							className="max-h-[65px] grayscale brightness-200 contrast-150 opacity-90"
							src="/assets/brasao_seec_white.png"
						/>

						<span className="h-10 w-px bg-white/10" />

<<<<<<< HEAD
						<img
							alt="COINTE"
							className="max-h-20"
							src="/assets/logo_cointe_white.png"
						/>
					</div>
				</footer>
			</section>
			<Footer />
		</div>
	);
=======
          <div className="flex items-center gap-8 pt-6 border-t border-white/5 flex-wrap">
            <img
              alt="SEEC RN"
              className="max-h-16.25 grayscale brightness-200 contrast-150 opacity-90"
              src="/assets/brasao_seec_white.png"
            />

            <span className="h-10 w-px bg-white/10" />

            <img
              alt="COINTE"
              className="max-h-20"
              src="/assets/logo_cointe_white.png"
            />
          </div>

        </footer>
      </section>

      {/* PAINEL DIREITO */}
      <div className="relative hidden lg:block">
        <div
          className="absolute inset-0 bg-cover bg-center saturate-110"
          style={{
            backgroundImage: "url('/assets/bg-estudio.jpg')",
            maskImage: "linear-gradient(to right, transparent 0%, black 15%)",
            WebkitMaskImage: "linear-gradient(to right, transparent 0%, black 15%)",
          }}
        />
      </div>

    </div>
  );
>>>>>>> 195f90c7c166bb08026010ecb11f2331db6114e2
}
