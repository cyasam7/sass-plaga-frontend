import { Client } from "../../types";
import { FormClientValues } from "../../components/Forms/NewClientForm/types";

export interface ClientListProps {
  clients: Client[]
  onSaveClient?: (data: FormClientValues, id?: string) => void
  onDeleteClient?: (id: string) => void
} 