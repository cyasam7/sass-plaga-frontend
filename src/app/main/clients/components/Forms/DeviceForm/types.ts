import { Device } from "../../Cards/DeviceCard/types"


export interface DeviceFormProps {
  open: boolean
  onClose: () => void
  onSave: (device: Device) => void
  device: Device | null
  isEditing: boolean
} 