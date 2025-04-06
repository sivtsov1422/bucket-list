export interface IProduct {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

export interface IBucketItem {
  productId: string;
  quantity: number;
}
