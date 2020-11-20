export interface ReadProject {
  id: number;
  name: string;
  technologies: string;
  isAvailable: boolean;
  users_ids: number[];
  owner_id: number;
}
