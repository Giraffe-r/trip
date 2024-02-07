export enum EarthDataType {
  BAR = 0,
  MAP = 1,
}
export interface EarthData {
  name: string;
  lng: string;
  lat: string;
  value: number;
}
