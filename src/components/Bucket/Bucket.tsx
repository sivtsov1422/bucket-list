import { store } from "../../store/store";
import { observer } from "mobx-react-lite";
import styled from "./style.module.css";

const Bucket = observer(() => {
  const bucketItems = store.bucket.map((item) => {
    const product = store.products.find((p) => p.id === item.productId);
    return {
      ...item,
      product,
    };
  });

  return (
    <div className={styled.container}>
      <h2>Корзина</h2>
      <div className={styled.bucketContainer}>
        <div className={styled.titles}>
          <h4>Название</h4>
          <h4>Цена</h4>
          <h4>Количество</h4>
          <h4>Действия</h4>
        </div>
        <div className={styled.content}>
          {bucketItems.map((item) => (
            <div className={styled.bucketItem} key={item.product?.id}>
              <p>{item.product?.name}</p>
              <p>{item.product?.price}</p>
              <p>{item.quantity}</p>
              <p>
                <button
                  onClick={() => store.deleteFromBucket(item.product?.id || "")}
                >
                  Удалить из корзины
                </button>
              </p>
            </div>
          ))}
        </div>
      </div>
      <h3 className={styled.total}>Итоговая сумма: {store.totalPrice} руб.</h3>
    </div>
  );
});
export default Bucket;
