export type StopCategory = "bus";

export interface Stop {
  id: string;
  name: string;
  category: StopCategory;
  latitude: number;
  longitude: number;
}
