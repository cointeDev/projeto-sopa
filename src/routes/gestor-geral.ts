import { createFileRoute } from '@tanstack/react-router'
import { GestorGeral } from '../pages/GestorGeral'
import { protectRoute } from '../common/utils/auth';

export const Route = createFileRoute('/gestor-geral')({
  beforeLoad: () => {
    protectRoute(['GESTOR_GERAL']);
  },
  component: GestorGeral,
})
