import { useEffect } from "react";
import { useProductStore } from "../../store/store";
import "./Home.scss";
import { FaHeart } from "react-icons/fa";
import { ToastContainer, toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Home = () => {
  const products = useProductStore((state) => state.products);
  const toggleLike = useProductStore((state) => state.toggleLike);
  const likedProducts = useProductStore((state) => state.likedProducts);
  const addToCart = useProductStore((state) => state.addToCart);


  const handleBuy = (item) => {
    addToCart(item);
    toast.success(`${item.name} savatga qo'shildi!`, {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      theme: "light",
    });
  };

  return (
    <div className="container">
      <ToastContainer transition={Bounce} />
      {products.length === 0 ? <p>Mahsulotlar mavjud emas</p> : null}
      <div className="list">
        {products.map((item) => (
          <div key={item.id} className="product-card">
            <FaHeart
              size={20}
              color={
                likedProducts.some((liked) => liked.id === item.id)
                  ? "red"
                  : "gray"
              }
              onClick={() => toggleLike(item)}
            />
            <img
              src="https://media.licdn.com/dms/image/v2/C560BAQF0D48SFQ9TBQ/company-logo_200_200/company-logo_200_200/0/1636452995521/korzinkauz_logo?e=2147483647&v=beta&t=MzSGG5R-Bekqt8PabJFFeu-Qrm_0-zqQevuExmHBOXU"
              alt=""
            />
            <h3>{item.name}</h3>
            <p>{item.description}</p>
            <p>{item.price} so'm</p>
            <div className="btn-group">
              <button className="buy-btn" onClick={() => handleBuy(item)}>
                Sotib olish
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
