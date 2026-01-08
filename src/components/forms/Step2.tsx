/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { useFormContext } from "./FormFunctions";
import { Footer } from "../common/Footer";

const eventoDescricao = `Produção audiovisual de eventos realizados presencialmente, podendo ocorrer em dois contextos:
- "In loco" (cobertura audiovisual do evento no local de realização)
- "Em estúdio" (gravação de eventos institucionais ou acadêmicos nas dependências do estúdio).`;

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

	return (
		<>
			<h3 className="text-2xl font-extrabold text-white mb-10">
				Tipo de produção
			</h3>

			<div className="grid grid-cols-2 md:grid-cols-3 gap-4">
				{["Evento", "Institucional", "Chamada", "Videoaula", "Edição"].map(
					(tipo, index) => (
						<button
							key={index}
							className={`rounded-xl border p-4 text-white/80 transition ${
								tipo === formData.tipo
									? "border-indigo-400 bg-indigo-500/10"
									: "border-white/10 hover:border-indigo-400 hover:bg-indigo-500/10"
							}`}
							onClick={() => {
								updateField("tipo", tipo);
							}}
						>
							<strong>{tipo}</strong>
						</button>
					)
				)}
			</div>

			{formData.tipo && (
				<div className="mt-6 rounded-xl bg-white/5 border border-white/10">
					<div className="p-6">
						<h4 className="text-white font-semibold mb-3">{formData.tipo}</h4>
						<div className="text-white/70 text-sm leading-relaxed whitespace-pre-wrap">
							{formData.tipo === "Evento" && eventoDescricao}
							{formData.tipo === "Institucional" && institucionalDescricao}
							{formData.tipo === "Chamada" && chamadaDescricao}
							{formData.tipo === "Videoaula" && videoaulaDescricao}
							{formData.tipo === "Edição" && edicaoDescricao}
						</div>
					</div>
				</div>
			)}

			<h3 className="text-2xl font-extrabold text-white mb-10 mt-10">
				Formato de produção
			</h3>

			<div className="grid grid-cols-2 md:grid-cols-3 gap-4">
				{[
					"Live pré-gravada",
					"Live presencial (em estúdio)",
					"Live remota",
					"Podcast / Mesacast",
					"Gravação de programa",
					"Shorts / Reels",
					"Animações para eventos in loco",
					"Criação, edição e animações",
				].map((formato, index) => (
					<button
						key={index}
						className={`rounded-xl border p-4 text-white/80 transition ${
							formato === formData.formato
								? "border-indigo-400 bg-indigo-500/10"
								: "border-white/10 hover:border-indigo-400 hover:bg-indigo-500/10"
						}`}
						onClick={() => {
							updateField("formato", formato);
						}}
					>
						<strong>{formato}</strong>
					</button>
				))}
			</div>

			{formData.formato && (
				<div className="mt-6 rounded-xl bg-white/5 border border-white/10">
					<div className="p-6">
						<h4 className="text-white font-semibold mb-3">
							{formData.formato}
						</h4>
						<div className="text-white/70 text-sm leading-relaxed whitespace-pre-wrap">
							{formData.formato === "Live pré-gravada" && liveDescricao}
							{formData.formato === "Live presencial (em estúdio)" &&
								livePresencialDescricao}
							{formData.formato === "Live remota" && liveRemotaDescricao}
							{formData.formato === "Podcast / Mesacast" && podcastDescricao}
							{formData.formato === "Gravação de programa" && programaDescricao}
							{formData.formato === "Shorts / Reels" && shortsReelsDescricao}
							{formData.formato === "Animações para eventos in loco" &&
								animacoesDescricao}
							{formData.formato === "Criação, edição e animações" &&
								criacaoEdicaoDescricao}
						</div>
					</div>
				</div>
			)}

			<div className="flex justify-between mt-10">
				<button
					className="btn-secundario"
					onClick={() => {
						setPassoAtual(1);
					}}
				>
					← Voltar
				</button>
				<button
					className="btn-primario"
					onClick={() => {
						if (!formData.tipo || !formData.formato) {
							alert(
								"Por favor, selecione tanto o tipo quanto o formato de produção."
							);
							return;
						}
						if (!validarPassoAtual()) return;
						setPassoAtual(passo + 1);
					}}
				>
					Continuar →
				</button>
			</div>
			<Footer />
		</>
	);
}
