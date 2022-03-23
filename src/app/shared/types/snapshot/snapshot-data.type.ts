import { Snapshot } from '@shared/types/snapshot/snapshot.type';

export interface SnapshotData {
  networks: string[];
  contexts: string[];
  fileExtensions: string[];
  snapshots: Snapshot[];
}
