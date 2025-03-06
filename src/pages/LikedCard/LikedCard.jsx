import { useProductStore } from "../../store/store";
import "./LikedCard.scss";
import { FaHeart } from "react-icons/fa";

const LikedCard = () => {
  const likedProducts = useProductStore((state) => state.likedProducts);
  const toggleLike = useProductStore((state) => state.toggleLike);

  return (
    <div className="container liked-product-list">
      {likedProducts.length === 0 ? <p>Yoqtirgan mahsulotlar yo‘q</p> : null}
      {likedProducts.map((item) => (
        <div key={item.id} className="product-card">
          <FaHeart size={20} color="red" onClick={() => toggleLike(item)} />
          <img
            src="https://media.licdn.com/dms/image/v2/C560BAQF0D48SFQ9TBQ/company-logo_200_200/company-logo_200_200/0/1636452995521/korzinkauz_logo?e=2147483647&v=beta&t=MzSGG5R-Bekqt8PabJFFeu-Qrm_0-zqQevuExmHBOXU"
            alt=""
          />
          <h3>{item.name}</h3>
          <p>{item.description}</p>
          <p>{item.price} so'm</p>
        </div>
      ))}
    </div>
  );
};

export default LikedCard;
