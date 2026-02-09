/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Link } from "@tanstack/react-router";
import { Stepper } from "../components/forms/Stepper";
import Step1 from "../components/forms/Step1";
import Step2 from "../components/forms/Step2";
import Step3 from "../components/forms/Step3";
import Step4 from "../components/forms/Step4";
import Step5 from "../components/forms/Step5";
import Step6 from "../components/forms/Step6";
import { useFormContext } from "../context/FormContext";
import { FormProvider } from "../components/forms/FormProvider";

const steps = [
  "Informações",
  "Tipo",
  "Conteúdo",
  "Prazos",
  "Revisão",
  "Confirmação",
];

function SolicitarContent() {
  const { passo, formData } = useFormContext();

  return (
    <div className="min-h-screen bg-[#F1F5F9] flex items-center justify-center px-4 font-inter">
      <div className="w-full max-w-7xl grid grid-cols-1 md:grid-cols-[380px_1fr] gap-10 my-14">

        {/* PAINEL ESQUERDO – CONTEXTO (Estilo Glassmorphism Light) */}
        <aside className="bg-white/40 backdrop-blur-md rounded-[2.5rem] p-6 border border-white/20 shadow-sm self-start sticky top-14">

          <div className="bg-white rounded-[2.5rem] p-8 shadow-2xl shadow-slate-200/50 border border-slate-100">

            <h2 className="text-2xl font-black text-[#334155] mb-4 tracking-tighter uppercase leading-tight">
              Solicitação de Produção
            </h2>

            <p className="text-sm font-medium text-slate-400 mb-8 leading-relaxed">
              Preencha as informações abaixo para que nossa equipe possa
              organizar sua demanda da melhor forma possível.
            </p>

            {/* LISTA DE PASSOS */}
            <Stepper currentStep={passo} steps={steps} />

            <div className="mt-10 border-t border-slate-100 pt-6 space-y-3 text-[11px] font-black uppercase tracking-widest text-slate-400">
              <p><span className="text-indigo-500/50">Responsável:</span> <span className="text-[#334155]">{formData.responsavel || "—"}</span></p>
              <p><span className="text-indigo-500/50">Local:</span> <span className="text-[#334155]">{formData.local || "—"}</span></p>
              <p><span className="text-indigo-500/50">Produção:</span> <span className="text-[#334155]">{formData.tipo || "—"}</span></p>
              <p><span className="text-indigo-500/50">Título:</span> <span className="text-[#334155]">{formData.titulo || "—"}</span></p>
            </div>


            <Link
              className="block mt-10 text-[10px] font-black uppercase tracking-widest text-indigo-600 hover:text-indigo-400 transition-colors text-center"
              to="/"
            >
              ← Voltar para a Home
            </Link>
          </div>

        </aside>

        {/* PAINEL DIREITO – FORM (Container Branco SOPA) */}
        <section className="bg-white rounded-[2.5rem] p-12 shadow-2xl shadow-slate-200/50 border border-slate-100 relative">

          {/* PASSO 1 */}
          {passo === 1 && (
            <Step1 />
          )}

          {/* PASSO 2 */}
          {passo === 2 && (
            <Step2 />
          )}

          {/* PASSO 3 */}
          {passo === 3 && (
            <Step3 />
          )}

          {/* PASSO 4 */}
          {passo === 4 && (
            <Step4 />
          )}

          {/* PASSO 5 */}
          {passo === 5 && (
            <Step5 />
          )}

          {/* PASSO 6 */}
          {passo === 6 && (
            <Step6 />
          )}

        </section>
      </div>
    </div>
  );
}

export function Solicitar() {
  return (
    <FormProvider>
      <SolicitarContent />
    </FormProvider>
  );
}