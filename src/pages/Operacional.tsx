/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { useState } from "react";
import { Link } from "@tanstack/react-router";
import Agenda from "../components/management/Agenda";

type AbaOperacional = "tarefas" | "quadro" | "agenda";

type Tarefa = {
  id: string;
  titulo: string;
  projeto: string;
  etapa: string;
  prazo?: string;
  status: "pendente" | "em_andamento";
};

const tarefasMock: Array<Tarefa> = [
  {
    id: "1",
    titulo: "Decupagem do roteiro",
    projeto: "Química — Aula 02",
    etapa: "Edição 1",
    prazo: "2025-10-18",
    status: "em_andamento",
  },
  {
    id: "2",
    titulo: "Criar ilustrações",
    projeto: "História — Aula 03",
    etapa: "Ilustração",
    prazo: "2025-10-20",
    status: "pendente",
  },
];


/* =======================
   COMPONENTES AUXILIARES
======================== */

function NavItem({
  children,
  active,
  onClick,
}: {
  children: React.ReactNode;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      className={`py-6 text-sm font-semibold border-b-2 transition
        ${
          active
            ? "text-indigo-400 border-indigo-400"
            : "text-[#B4B9C7] border-transparent hover:text-white"
        }`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}


export default function Operacional() {
  const [abaAtual, setAbaAtual] = useState<AbaOperacional>("tarefas");

  const greeting = "Boa noite";
  const userName = "João";

  return (
    <div className="min-h-screen bg-[#0F111A] px-6 py-10 font-inter">
      <div
        className="max-w-7xl mx-auto bg-[#161825] rounded-2xl
                   shadow-[0_20px_60px_-15px_rgba(0,0,0,0.6)] overflow-hidden"
      >
        {/* HEADER */}
        <header
          className="flex items-center justify-between
                     border-b border-white/10 px-8"
        >
          <nav className="flex gap-8">
            <NavItem
              active={abaAtual === "tarefas"}
              onClick={() => { setAbaAtual("tarefas"); }}
            >
              Painel de Tarefas
            </NavItem>

            <NavItem
              active={abaAtual === "quadro"}
              onClick={() => { setAbaAtual("quadro"); }}
            >
              Quadro de Produção
            </NavItem>

            <NavItem
              active={abaAtual === "agenda"}
              onClick={() => { setAbaAtual("agenda"); }}
            >
              Agenda do Estúdio
            </NavItem>
          </nav>

          <Link
            to="/"
            className="text-sm font-semibold text-[#B4B9C7]
                       hover:text-white transition"
          >
            Sair
          </Link>
        </header>

        {/* CONTEÚDO */}
        <div className="p-10">
          {/* SAUDAÇÃO */}
          <div className="mb-10 pb-8 border-b border-white/10">
            <h2 className="text-2xl font-extrabold text-white">
              {greeting}, {userName}!
            </h2>
            <p className="text-sm text-[#B4B9C7] mt-1">
              Estas são as tarefas atribuídas a você.
            </p>
          </div>

          {/* ABA: TAREFAS */}
          {abaAtual === "tarefas" && (
            <section className="animate-fade-in">
              <h3 className="text-xl font-bold text-white mb-6">
                Minhas Tarefas
              </h3>

              <div className="space-y-4">
                {tarefasMock.map((tarefa) => (
                  <div
                    key={tarefa.id}
                    className="bg-[#0F111A] rounded-xl p-5
                               border border-white/10
                               flex items-center justify-between
                               hover:border-indigo-500/50 transition"
                  >
                    <div>
                      <p className="text-white font-semibold">
                        {tarefa.titulo}
                      </p>
                      <p className="text-sm text-[#B4B9C7]">
                        {tarefa.projeto} · {tarefa.etapa}
                      </p>
                    </div>

                    <div className="flex items-center gap-4">
                      {tarefa.prazo && (
                        <span className="text-xs text-[#B4B9C7]">
                          📅 {tarefa.prazo}
                        </span>
                      )}

                      <span
                        className={`px-3 py-1 rounded-full text-xs font-bold
                          ${
                            tarefa.status === "em_andamento"
                              ? "bg-yellow-400/20 text-yellow-300"
                              : "bg-indigo-400/20 text-indigo-300"
                          }`}
                      >
                        {tarefa.status === "em_andamento"
                          ? "EM ANDAMENTO"
                          : "A FAZER"}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* ABA: QUADRO */}
          {abaAtual === "quadro" && (
            <section className="animate-fade-in">
              <h3 className="text-xl font-bold text-white mb-4">
                Quadro de Produção
              </h3>
              <p className="text-sm text-[#B4B9C7] mb-6">
                Visão limitada apenas para acompanhamento.
              </p>

              <div
                className="bg-[#0F111A] border border-white/10
                           rounded-xl p-6 text-[#B4B9C7]"
              >
                🔒 Em breve: visão filtrada apenas das etapas onde você atua.
              </div>
            </section>
          )}

          {/* ABA: AGENDA */}
          {abaAtual === "agenda" && (
            <section className="animate-fade-in">
              <Agenda scope="local" />
            </section>
          )}
        </div>
      </div>
    </div>
  );
}
