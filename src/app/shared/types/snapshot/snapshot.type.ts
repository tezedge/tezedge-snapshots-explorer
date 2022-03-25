export interface Snapshot {
  datetime: Date | string;
  type: string;
  fileName: string;
  size: number;
  network: string;
  networkFromName: string;
  context: string;
  fileExtension: string;
  hash: string;
}
