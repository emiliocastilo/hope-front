export interface PhotoModel {
  id?: number;
  pathologyId: number;
  patientId: number;
  title: string;
  description: string;
  userId: number;
  name?: string;
  typePhoto?: string;
  photoBytes?: string;
}
