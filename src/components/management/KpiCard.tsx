/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
type Props = {
    label: string
    value: string
    destaque?: boolean
}

export function KpiCard({ label, value, destaque }: Props) {

    return (
        <div
            className={`rounded-2xl p-6
                  shadow-[0_20px_60px_-15px_rgba(0,0,0,0.6)]
                  ${destaque
                    ? "bg-indigo-500/20"
                    : "bg-[#161825]"
                }`}
        >
            <span className="text-sm text-[#B4B9C7]">
                {label}
            </span>
            <div className="mt-2 text-3xl font-extrabold text-white">
                {value}
            </div>
        </div>
    )
}
