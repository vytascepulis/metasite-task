export interface Column {
  id: string;
  label: React.ReactNode;
  isSortable?: boolean;
  isHideable?: boolean;
  render?: (data: Row) => React.ReactNode;
  style?: React.CSSProperties;
}

export interface ColumnData extends Column {
  isHidden: boolean;
}

export interface Row {
  [key: string]: string | boolean;
}

export type SortOptions = {
  columnId: Column["id"];
  sort: "asc" | "desc";
} | null;
