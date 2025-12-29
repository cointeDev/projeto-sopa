/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */

export function Stepper({ currentStep, steps }: { currentStep: number; steps: Array<string> }) {

    return (
        <div className="space-y-4">
            {steps.map((label, index) => {
                const stepNumber = index + 1;
                const active = currentStep >= stepNumber;

                return (
                    <div key={label} className="flex items-center gap-3">
                        <div
                            className={`w-8 h-8 rounded-full flex items-center justify-center font-bold transition
                ${active ? "bg-indigo-500 text-white" : "bg-white/10 text-[#B4B9C7]"}`}
                        >
                            {stepNumber}
                        </div>

                        <span
                            className={`text-sm font-semibold ${active ? "text-white" : "text-[#B4B9C7]"
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