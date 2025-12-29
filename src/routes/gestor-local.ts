import { createFileRoute } from '@tanstack/react-router'
import GestorLocal from '../pages/GestorLocal'

export const Route = createFileRoute('/gestor-local')({
  component: GestorLocal,
})
