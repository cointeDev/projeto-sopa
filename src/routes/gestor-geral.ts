import { createFileRoute } from '@tanstack/react-router'
import { GestorGeral } from '../pages/GestorGeral'

export const Route = createFileRoute('/gestor-geral')({
  component: GestorGeral,
})
