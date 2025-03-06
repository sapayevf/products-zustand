import { useProductStore } from "../../store/store";
import "./Cart.scss"; 

const Cart = () => {
  const cart = useProductStore((state) => state.cart);
  const removeFromCart = useProductStore((state) => state.removeFromCart);

  const totalPrice = cart.reduce((sum, item) => sum + item.price, 0);

  return (
    <div className="container">
      {cart.length === 0 ? <p>Savat bo‘sh</p> : null}
      <div className="cart-list">
        {cart.map((item) => (
          <div key={item.id} className="product-card">
            <img
              src="https://media.licdn.com/dms/image/v2/C560BAQF0D48SFQ9TBQ/company-logo_200_200/company-logo_200_200/0/1636452995521/korzinkauz_logo?e=2147483647&v=beta&t=MzSGG5R-Bekqt8PabJFFeu-Qrm_0-zqQevuExmHBOXU"
              alt="Mahsulot rasmi"
            />
            <h3>{item.name}</h3>
            <p>{item.description}</p>
            <p>{item.price} so'm</p>
            <div className="btn-group">
              <button
                className="delete-btn"
                onClick={() => removeFromCart(item.id)}
              >
                Oʻchirish
              </button>
            </div>
          </div>
        ))}
      </div>

      {cart.length > 0 && (
        <div className="total-price">
          <h2>Jami: {totalPrice.toLocaleString()} so'm</h2>
        </div>
      )}
    </div>
  );
};

export default Cart;
