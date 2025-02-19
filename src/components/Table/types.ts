export interface Column {
  id: string;
  label: React.ReactNode;
  isSortable?: boolean;
  render?: (data: Row) => React.ReactNode;
  style?: React.CSSProperties;
}

export interface Row {
  [key: string]: string | boolean;
}

export type SortOptions = {
  columnId: Column["id"];
  sort: "asc" | "desc";
} | null;
