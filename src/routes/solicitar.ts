import { createFileRoute } from '@tanstack/react-router'
import { Solicitar } from '../pages/Solicitar'

export const Route = createFileRoute('/solicitar')({
  component: Solicitar,
})
