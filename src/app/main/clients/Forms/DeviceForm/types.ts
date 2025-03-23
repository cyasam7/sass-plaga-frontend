import { Device } from "../../types"


export interface DeviceFormProps {
  open: boolean
  onClose: () => void
  onSave: (device: Device) => void
  device: Device | null
  isEditing: boolean
} 