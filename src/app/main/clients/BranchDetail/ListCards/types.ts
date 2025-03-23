import { Area } from '../../types';

export interface ListCardsProps {
  areas: Area[];
  headerComponent: React.ReactNode;
  handleMenuClick: (event: React.MouseEvent<HTMLElement>, area: string) => void;
  isLoading?: boolean;
}
