import { Area } from "../../../types"

export interface AreaCardProps {
  area: Area
  onMenuClick: (event: React.MouseEvent<HTMLElement>, areaId: string) => void
}