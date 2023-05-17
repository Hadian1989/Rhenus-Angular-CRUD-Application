export interface IProject {
  pk: number;
  title: string;
  start_at: string;
  finished_at: string | null;
  technology: string[];
  status: boolean;
  image: string;
  description: string;
}
