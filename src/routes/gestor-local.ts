import { createFileRoute } from '@tanstack/react-router'
import GestorLocal from '../pages/GestorLocal'
import { protectRoute } from '../common/utils/auth';

export const Route = createFileRoute('/gestor-local')({
  beforeLoad: () => {
    protectRoute(['GESTOR_LOCAL']);
  },
  component: GestorLocal,
})
