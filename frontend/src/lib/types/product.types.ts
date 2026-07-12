export interface Produto {
  id: string;
  name: string;
  price: number;
  description: string;
  banner: string;
  disabled: boolean;
  category_id: string;
  createdAt: string;
  updatedAt: string;
  category: {
    id: string;
    name: string;
  };
}
