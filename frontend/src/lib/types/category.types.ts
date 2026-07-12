export interface Categoria {
  id: string;
  name: string;
  active: boolean;
  createdAt: string;
  updatedAt: string;
  _count: {
    products: number;
  };
}
