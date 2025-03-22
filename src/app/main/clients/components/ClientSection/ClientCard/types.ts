import { BusinessDetails, ClientType } from "../ClientSection/ClientList/types"

export interface ClientCardProps {
  client: {
    id: string
    name: string
    type: ClientType
    email: string
    phone: string
    address: string
    image?: string
    lastService: string
    nextService: string
    businessDetails?: BusinessDetails
  }
  onViewDetails: (id: string) => void
  onMenuOpen: (event: React.MouseEvent<HTMLElement>, id: string) => void
} 