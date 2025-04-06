import { store } from "../../store/store";
import { IProduct } from "../../interfaces";
import { observer } from "mobx-react-lite";
import { useState } from "react";
import styled from "./style.module.css"

const ProductList = observer(() => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [quantity, setQuantity] = useState(1);

  const handleAddProduct = () => {
    if (name && price > 0) {
      const newProduct: IProduct = {
        id: `${Date.now()}`,
        name,
        price,
        quantity,
      };
      store.addProduct(newProduct);
      setName("");
      setPrice(0);
      setQuantity(1);
    }
  };

  const handleEditProduct = (product: IProduct) => {
    setName(product.name);
    setPrice(product.price);
    setQuantity(product.quantity);
    store.deleteProduct(product.id);
  };

  const handleAddToBucket = (productId: string) => {
    store.addToBucket(productId);
  };

  return (
    <div>
      <h2>Добавление товаров</h2>
      <input
        type="text"
        placeholder="Название товара"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="number"
        placeholder="Цена"
        value={price}
        onChange={(e) => setPrice(Number(e.target.value))}
      />
      <input
        type="number"
        placeholder="Количество"
        value={quantity}
        onChange={(e) => setQuantity(Number(e.target.value))}
      />
      <button onClick={handleAddProduct}>Добавить</button>

      <h3>Список товаров:</h3>
      <div className={styled.container}>
          <div className={styled.titles}>
            <h4>Название</h4>
            <h4>Цена</h4>
            <h4>Количество</h4>
            <h4>Действия</h4>
          </div>
        <div className={styled.content}>
          {store.products.map((product) => (
            <div className={styled.productItem} key={product.id}>
              <p>{product.name}</p>
              <p>{product.price}</p>
              <p>{product.quantity}</p>
              <p>
                <button onClick={() => store.deleteProduct(product.id)}>
                  Удалить
                </button>
                <button onClick={() => handleEditProduct(product)}>
                  Редактировать
                </button>
                <button onClick={() => handleAddToBucket(product.id)}>
                  Добавить в корзину
                </button>{" "}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
});
export default ProductList;
