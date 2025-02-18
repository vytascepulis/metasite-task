export interface Column {
  id: string;
  label: React.ReactNode;
  isSortable?: boolean;
  render?: (data: any) => React.ReactNode;
  style?: React.CSSProperties;
}
