/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
type ModalProps = {
    onClose: () => void;
};

export function CreateCardModal({ onClose }: ModalProps) {
    return (
        <div className="fixed inset-0 z-50
                    bg-black/60 backdrop-blur-sm
                    flex items-center justify-center">
            <div className="bg-[#161825] w-full max-w-4xl
                      rounded-2xl p-8
                      shadow-2xl text-white">
                <header className="flex justify-between items-center
                           border-b border-white/10 pb-4 mb-6">
                    <h2 className="text-xl font-extrabold">
                        Cadastrar Processo
                    </h2>
                    <button
                        className="text-2xl text-[#B4B9C7] hover:text-white"
                        onClick={onClose}
                    >
                        ×
                    </button>
                </header>

                <form className="space-y-6">
                    <input
                        placeholder="Título do Pedido"
                        className="w-full rounded-lg bg-[#0F111A]
                       border border-white/10
                       px-4 py-3 text-white"
                    />

                    <div className="flex justify-end gap-4 pt-6 border-t border-white/10">
                        <button
                            type="button"
                            className="px-4 py-2 text-sm font-bold
                         text-[#B4B9C7] hover:text-white"
                            onClick={onClose}
                        >
                            Cancelar
                        </button>
                        <button
                            type="submit"
                            className="px-6 py-2 rounded-xl
                         bg-indigo-500 font-bold
                         hover:bg-indigo-400"
                        >
                            Confirmar e Criar
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
