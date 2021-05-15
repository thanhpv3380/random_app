export interface HistoryData {
  text: string;
  date: Date;
}


export interface HistoryByDateData {
  day: number;
  month: number;
  year: number;
  date: Date;
  labels: string[];
}