export type DeviceType = "trap" | "bait" | "monitor" | "other"
export type DeviceStatus = "active" | "inactive" | "maintenance"

export interface Device {
  id: string
  areaId: string
  type: DeviceType
  code: string
  location: string
  installDate: string
  lastCheck?: string
  nextCheck?: string
  status: DeviceStatus
  notes?: string
}

export interface DeviceFormProps {
  open: boolean
  onClose: () => void
  onSave: (device: Device) => void
  device: Device | null
  isEditing: boolean
} 