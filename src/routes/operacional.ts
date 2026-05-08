import { createFileRoute } from '@tanstack/react-router'
import Operacional from '../pages/Operacional'
import { protectRoute } from '../common/utils/auth';

export const Route = createFileRoute('/operacional')({
  beforeLoad: () => {
    protectRoute(['OPERACIONAL']);
  },
  component: Operacional,
})
