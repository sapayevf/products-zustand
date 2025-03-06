import { useEffect, useState } from "react";
import { useProductStore } from "../../store/store";
import "./Home.scss";
import { FaHeart } from "react-icons/fa";

const Home = () => {
  const [likedItems, setLikedItems] = useState({});
  const products = useProductStore((state) => state.products);
  const removeProduct = useProductStore((state) => state.removeProduct);

  useEffect(() => {
    console.log("Mahsulotlar yuklandi:", products);
  }, [products]);

  const items = products.filter((item) => item !== null);

  const handleLike = (id) => {
    setLikedItems((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const handleDelete = (id) => {
    console.log("O‘chirilayotgan ID:", id);
    removeProduct(id);
  };

  return (
    <div className="container list">
      {items.length === 0 ? <p>Mahsulotlar mavjud emas</p> : null}
      {items.map((item) =>
        item?.id ? ( 
          <div key={item.id} className="product-card">
            <FaHeart
              size={20}
              color={likedItems[item.id] ? "red" : "gray"}
              onClick={() => handleLike(item.id)}
            />
            <img
              src="https://media.licdn.com/dms/image/v2/C560BAQF0D48SFQ9TBQ/company-logo_200_200/company-logo_200_200/0/1636452995521/korzinkauz_logo?e=2147483647&v=beta&t=MzSGG5R-Bekqt8PabJFFeu-Qrm_0-zqQevuExmHBOXU"
              alt=""
            />
            <h3>{item.name}</h3>
            <p>{item.description}</p>
            <p>{item.price} so'm</p>
            <button className="buy-btn">Sotib olish</button>
            <button
              className="delete-btn"
              onClick={() => handleDelete(item.id)}
            >
              Oʻchirish
            </button>
          </div>
        ) : null
      )}
    </div>
  );
};

export default Home;
