import { createFileRoute } from '@tanstack/react-router'
import { TokenStatus } from '../pages/TokenStatus'

export const Route = createFileRoute('/tokenstatus')({
  component: TokenStatus,
})

