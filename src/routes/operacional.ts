import { createFileRoute } from '@tanstack/react-router'
import Operacional from '../pages/Operacional'

export const Route = createFileRoute('/operacional')({
  component: Operacional,
})
