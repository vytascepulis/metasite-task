export interface Column<T> {
  id: string;
  label: React.ReactNode;
  render: (data: T) => React.ReactNode;
  isSortable?: boolean;
  sortOrder?: SortOrder;
  isHideable?: boolean;
  isHidden?: boolean;
  style?: React.CSSProperties;
}

export type SortOrder = "asc" | "desc";

export type Row<T> = T & { id: string };
