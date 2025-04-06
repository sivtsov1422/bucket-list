import { makeAutoObservable } from "mobx";
import { IBucketItem, IProduct } from "../interfaces";

class Store {
  products: IProduct[] = [];
  bucket: IBucketItem[] = [];

  constructor() {
    makeAutoObservable(this);
  }

  addProduct(product: IProduct) {
    this.products.push(product);
  }

  editProduct(updatedProduct: IProduct) {
    const index = this.products.findIndex(product => product.id === updatedProduct.id);
    if (index !== -1) {
      this.products[index] = updatedProduct;
    }
  }

  deleteProduct(productId: string) {
    this.products = this.products.filter(product => product.id !== productId);
  }

  addToBucket(productId: string) {
    const cartItem = this.bucket.find(item => item.productId === productId);
    if (cartItem) {
      cartItem.quantity += 1;
    } else {
      this.bucket.push({ productId, quantity: 1 });
    }
  }

  deleteFromBucket(productId: string) {
    this.bucket = this.bucket.filter(item => item.productId !== productId);
  }

  get totalPrice() {
    return this.bucket.reduce((total, item) => {
      const product = this.products.find(p => p.id === item.productId);
      if (product) {
        return total + product.price * item.quantity;
      }
      return total;
    }, 0);
  }
}

export const store = new Store();
