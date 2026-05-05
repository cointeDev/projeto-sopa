/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */

export function Stepper({ currentStep, steps }: { currentStep: number; steps: Array<string> }) {

    return (
        <div className="space-y-4">
            {steps.map((label, index) => {
                const stepNumber = index + 1;
                const active = currentStep === stepNumber; // Usando igualdade estrita para o foco

                return (
                    <div key={label} className="flex items-center gap-4">
                        <div
                            className={`w-10 h-10 rounded-full flex items-center justify-center font-black transition-all shadow-sm
                ${active 
                    ? "bg-[#4f46e5] text-white" // O círculo mantém o destaque
                    : "bg-slate-100 text-slate-400"}`}
                        >
                            {stepNumber}
                        </div>

                        {/* Alteração aqui: removido o fundo azul e texto branco do span ativo */}
                        <span
                            className={`text-sm font-black uppercase tracking-widest transition-colors ${
                                active 
                                    ? "text-[#334155]" // Cor igual aos títulos do formulário para o item atual
                                    : "text-slate-300" // Cor cinza para os demais
                            }`}
                        >
                            {label}
                        </span>
                    </div>
                );
            })}
        </div>
    );
}