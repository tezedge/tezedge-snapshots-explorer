import { Snapshot } from '@shared/types/snapshot/snapshot.type';

export interface SnapshotData {
  networks: Set<string>;
  contexts: Set<string>;
  fileExtensions: Set<string>;
  snapshots: Snapshot[];
  stats: { name: string, value: number }[];
}
