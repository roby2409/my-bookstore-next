export interface Books {
  id: number;
  title: string;
  writer: string;
  coverImage: string;
  point: number;
  tags: string[];
  createdAt: Date;
  updatedAt: Date;
}
