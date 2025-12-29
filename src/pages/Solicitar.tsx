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
import { FormProvider, useFormContext } from "../components/forms/FormFunctions";

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
    <div className="min-h-screen bg-linear-to-br from-[#0F172A] to-[#1E293B] flex items-center justify-center px-4">
      <div className="w-full max-w-7xl grid grid-cols-1 md:grid-cols-[350px_1fr] gap-10 my-14">

        {/* PAINEL ESQUERDO – CONTEXTO */}
        <aside className="bg-white/5 backdrop-blur rounded-2xl p-6 border border-white/10">

          <div className="bg-[#161825] rounded-2xl p-6 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.6)]">

            <h2 className="text-xl font-extrabold text-white mb-4">
              Solicitação de Produção
            </h2>

            <p className="text-sm text-[#B4B9C7] mb-6">
              Preencha as informações abaixo para que nossa equipe possa
              organizar sua demanda da melhor forma possível.
            </p>

            {/* LISTA DE PASSOS */}
            <Stepper currentStep={passo} steps={steps} />

            <div className="mt-8 border-t border-white/10 pt-4 text-sm text-[#B4B9C7]">
              <p><strong>Responsável:</strong> {formData.responsavel || "—"}</p>
              <p><strong>Local:</strong> {formData.local || "—"}</p>
              <p><strong>Produção:</strong> {formData.tipo || "—"}</p>
              <p><strong>Título:</strong> {formData.titulo || "—"}</p>
            </div>


            <Link
              className="block mt-8 text-sm text-indigo-400 hover:underline text-center"
              to="/"
            >
              ← Voltar para a Home
            </Link>
          </div>

        </aside>

        {/* PAINEL DIREITO – FORM */}
        <section className="bg-[#161825] rounded-2xl p-10 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.6)]">

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