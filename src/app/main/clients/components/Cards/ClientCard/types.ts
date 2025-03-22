import { Client } from "../../../types"

export interface ClientCardProps {
  client: Client
  onViewDetails: (id: string) => void
  onMenuOpen: (event: React.MouseEvent<HTMLElement>, id: string) => void
} 