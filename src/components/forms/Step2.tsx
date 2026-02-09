/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { useFormContext } from "../../context/FormContext";
import { Footer } from "../common/Footer";
import {
    FORMATOS_PRODUCAO,
    TIPOS_PRODUCAO,
} from "../../common/types/solicitacao";

import { FORMATOS_POR_TIPO } from "../../common/rules/formatosPorTipo";

const eventoInLocoDescricao = `Cobertura audiovisual do evento no local de realização, incluindo captação de imagens e utilização de animações e sonorização para material visual de apoio;`;

const eventoEmEstudioDescricao = `Gravação de eventos institucionais ou acadêmicos, como aulas inaugurais, ciclos de palestras ou atividades similares, realizados nas dependências do estúdio.`;

const institucionalDescricao = `Produção audiovisual realizada em estúdio ou em ambiente controlado, geralmente com múltiplos participantes, voltada à comunicação institucional e à divulgação oficial de ações, projetos ou atividades da instituição.`;

const chamadaDescricao = `Produção de vídeo curto com finalidade promocional, utilizado como convite, anúncio ou lembrete de eventos, projetos ou ações institucionais, prioritariamente destinado a redes sociais e canais digitais.`;

const videoaulaDescricao = `Produção de aula em formato audiovisual, com foco em conteúdo educativo e didático, podendo incluir exposição oral, apresentações visuais, recursos gráficos e animações de apoio pedagógico.`;

const edicaoDescricao = `Serviço de edição audiovisual a partir de material previamente gravado e fornecido pelo solicitante, sem captação de imagens, áudio ou vídeo pelo estúdio.`;

const liveDescricao = `Vídeo gravado previamente, estruturado no formato de transmissão ao vivo, com estreia programada em plataforma digital. Pode incluir ajustes técnicos mínimos (corte seco, equalização básica), mas não envolve edição narrativa ou criativa.`;

const livePresencialDescricao = `Transmissão ao vivo realizada a partir do estúdio, com todos os participantes presentes fisicamente no local.`;

const liveRemotaDescricao = `Evento transmitido ao vivo com participantes conectados remotamente, a partir de diferentes locais, por meio de plataformas digitais como StreamYard, Google Meet ou similares.`;

const podcastDescricao = `Produção audiovisual em formato de conversa ou debate, geralmente realizada em mesa, com foco na distribuição em plataformas digitais de áudio e vídeo.`;

const programaDescricao = `Produção audiovisual em formato de programa gravado, envolvendo entrevistas, conversas ou debates, com estrutura semelhante à de programas televisivos.\n
📌 Formato indicado quando há necessidade de edição narrativa.
⚠️ Demanda maior tempo de pós-produção.`;

const shortsReelsDescricao = `Edição de vídeos curtos em formato vertical, destinados a plataformas como Instagram Reels, YouTube Shorts e similares.\n
⚠️ Esta opção refere-se exclusivamente à edição de material já gravado. Caso seja necessária gravação em estúdio, selecione outro formato.`;

const animacoesDescricao = `Produção de peças animadas para eventos presenciais, incluindo:
- Vinheta de abertura
- Tela de espera
- Endcard (encerramento)\n
⚠️ Não realizamos transmissões externas ao estúdio.`;

const criacaoEdicaoDescricao = `Produção e edição de conteúdos audiovisuais e peças animadas, podendo incluir:
- Vinheta de abertura
- Tela de espera
- Endcard (encerramento)
- Identidade visual (quando necessário)
- Edição de material enviado pelo solicitante\n
⚠️ Serviço opcional, com exceção do formato Videoaula, no qual a utilização de recursos gráficos e animações é obrigatória.
⚠️ Demanda maior tempo de pós-produção.`;

export default function Step2() {
    const { passo, setPassoAtual, validarPassoAtual, updateField } =
        useFormContext();
    const formData = useFormContext().formData;

    const formatosPermitidos = formData?.tipo
        ? FORMATOS_POR_TIPO[formData.tipo]
        : [];

    return (
        <div className="font-inter text-left">
            <h3 className="text-4xl font-black text-[#334155] mb-10 uppercase tracking-tighter leading-none">
                Tipo de produção
            </h3>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-5">
                {TIPOS_PRODUCAO.map((tipo, index) => (
                    <button
                        key={index}
                        className={`rounded-2xl border p-6 text-[10px] font-black uppercase tracking-widest transition-all ${
                            tipo === formData?.tipo
                                ? "border-[#4f46e5] bg-indigo-50 text-[#4f46e5] shadow-lg shadow-indigo-100 scale-105"
                                : "border-slate-100 bg-[#F8FAFC] text-slate-400 hover:border-indigo-200 hover:text-indigo-400"
                        }`}
                        onClick={() => {
                            updateField("tipo", tipo);
                            // CORREÇÃO TS(2345): Mudado de null para "" para coincidir com o tipo
                            updateField("formato", ""); 
                        }}
                    >
                        {tipo}
                    </button>
                ))}
            </div>

            {formData?.tipo && (
                <div className="mt-8 rounded-3xl bg-[#F8FAFC] border border-slate-100 p-8 animate-in fade-in duration-300 shadow-inner">
                    <h4 className="text-[#334155] font-black uppercase text-xs mb-4 flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-[#4f46e5]"></div>
                        {formData.tipo}
                    </h4>
                    <div className="text-slate-500 text-sm leading-relaxed font-medium italic">
                        {formData.tipo === "EVENTO_IN_LOCO" && eventoInLocoDescricao}
                        {formData.tipo === "Evento em estúdio" && eventoEmEstudioDescricao}
                        {formData.tipo === "Vídeo institucional" && institucionalDescricao}
                        {formData.tipo === "Gravação de chamada" && chamadaDescricao}
                        {formData.tipo === "Gravação de videoaula" && videoaulaDescricao}
                        {formData.tipo === "Edição" && edicaoDescricao}
                    </div>
                </div>
            )}

            <h3 className="text-4xl font-black text-[#334155] mb-10 mt-16 uppercase tracking-tighter leading-none">
                Formato de produção
            </h3>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-5">
                {FORMATOS_PRODUCAO.map((formato, index) => {
                    const habilitado = !formData?.tipo || formatosPermitidos?.includes(formato);

                    return (
                        <button
                            key={index}
                            disabled={!habilitado}
                            className={`rounded-2xl border p-6 text-[9px] font-black uppercase tracking-widest transition-all ${
                                formato === formData?.formato
                                    ? "border-[#4f46e5] bg-indigo-50 text-[#4f46e5] shadow-lg shadow-indigo-100 scale-105"
                                    : habilitado
                                        ? "border-slate-100 bg-[#F8FAFC] text-slate-400 hover:border-indigo-200 hover:text-indigo-400"
                                        : "border-slate-50 bg-slate-50/50 text-slate-200 cursor-not-allowed opacity-40"
                            }`}
                            onClick={() => {
                                if (!habilitado) return;
                                updateField("formato", formato);
                            }}
                        >
                            {formato}
                        </button>
                    );
                })}
            </div>

            {formData?.formato && (
                <div className="mt-8 rounded-3xl bg-[#F8FAFC] border border-slate-100 p-8 animate-in fade-in duration-300 shadow-inner">
                    <h4 className="text-[#334155] font-black uppercase text-xs mb-4 flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-[#4f46e5]"></div>
                        {formData.formato}
                    </h4>
                    <div className="text-slate-500 text-sm leading-relaxed font-medium italic whitespace-pre-wrap">
                        {formData.formato === "Live pré-gravada" && liveDescricao}
                        {formData.formato === "Live presencial (em estúdio)" && livePresencialDescricao}
                        {formData.formato === "Live remota" && liveRemotaDescricao}
                        {formData.formato === "Podcast / Mesacast" && podcastDescricao}
                        {formData.formato === "Gravação de programa" && programaDescricao}
                        {formData.formato === "Shorts / Reels" && shortsReelsDescricao}
                        {formData.formato === "ANIMACOES_EVENTOS_IN_LOCO" && animacoesDescricao}
                        {formData.formato === "Criação, edição e animações" && criacaoEdicaoDescricao}
                    </div>
                </div>
            )}

            <div className="flex justify-between mt-12 pt-8 border-t border-slate-50">
                <button
                    className="rounded-2xl border border-slate-200 bg-white px-10 py-5 text-xs font-black text-slate-400 uppercase tracking-widest transition-all hover:bg-slate-50"
                    onClick={() => { setPassoAtual(1); }}
                >
                    ← Voltar
                </button>
                <button
                    className="rounded-[1.25rem] bg-[#4f46e5] px-14 py-5 text-xs font-black text-white shadow-xl shadow-indigo-100 uppercase tracking-widest active:scale-95 transition-all hover:bg-[#3730a3]"
                    onClick={() => {
                        if (!validarPassoAtual()) return;
                        setPassoAtual(passo + 1);
                    }}
                >
                    Continuar →
                </button>
            </div>
            <Footer />
        </div>
    );
}