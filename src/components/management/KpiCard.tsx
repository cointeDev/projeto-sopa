/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
type Props = {
    label: string;
    value: string;
    destaque?: boolean;
}

export function KpiCard({ label, value, destaque }: Props) {
    return (
        <div
            className={`rounded-4xl p-8 border border-slate-100 shadow-sm transition-all hover:shadow-md
                  ${destaque
                    ? "bg-indigo-50/30 border-indigo-100 shadow-indigo-100/20"
                    : "bg-white"
                }`}
        >
            <span className={`text-[10px] font-black uppercase tracking-widest ${destaque ? "text-[#4f46e5]" : "text-slate-400"}`}>
                {label}
            </span>
            <div className={`mt-2 text-4xl font-black ${destaque ? "text-[#4f46e5]" : "text-[#334155]"}`}>
                {value}
            </div>
        </div>
    );
}