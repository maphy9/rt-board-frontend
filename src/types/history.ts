export type HistoryItemType = "add" | "delete" | "edit" | "changeOrder";

export interface HistoryItem {
  type: HistoryItemType;
  data: any;
}

export default interface History {
  history: HistoryItem[];
  historyIndex: number;
}

export const MAX_HISTORY_LENGTH = 50;
