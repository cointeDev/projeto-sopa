export type AgendaScope = "local" | "geral";

export type AgendaEvent = {
  id: string;
  title: string;
  start: string;
  end?: string;
  fase?: string;
  description?: string;
  url?: string;
  editable?: boolean;
};
