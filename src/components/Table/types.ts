export interface Column<T> {
  id: string;
  label: React.ReactNode;
  isSortable?: boolean;
  isHideable?: boolean;
  isHidden?: boolean;
  render?: (data: T) => React.ReactNode;
  style?: React.CSSProperties;
}

export type SortOptions<T> = {
  columnId: Column<T>["id"];
  sort: "asc" | "desc";
};
