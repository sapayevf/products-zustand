import { useState, useEffect } from "react";
import { useProductStore } from "../../store/store";
import "./Add.scss";

const Add = () => {
  const [product, setProduct] = useState({
    name: "",
    description: "",
    price: "",
  });

  const [productList, setProductList] = useState(() => {
    const savedProducts = localStorage.getItem("products");
    return savedProducts ? JSON.parse(savedProducts) : [];
  });

  const [editIndex, setEditIndex] = useState(null);
  const addToHome = useProductStore((state) => state.addProduct);
  const removeFromHome = useProductStore((state) => state.removeProduct);

  useEffect(() => {
    localStorage.setItem("products", JSON.stringify(productList));
  }, [productList]);

  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newProduct = { ...product, id: crypto.randomUUID() }; 
    console.log("Qo‘shilayotgan mahsulot:", newProduct);
    addToHome(newProduct);
    setProduct({ name: "", description: "", price: "" });
  };
  const handleEdit = (index) => {
    setProduct({ ...productList[index], id: productList[index].id });
    setEditIndex(index);
  };

  const handleLike = (index) => {
    const updatedList = [...productList];
    updatedList[index].liked = !updatedList[index].liked;
    setProductList(updatedList);
  };

  const handleDelete = (index) => {
    const updatedList = productList.filter((_, i) => i !== index);
    setProductList(updatedList);
    removeFromHome(index);
  };

  return (
    <div className="container">
      <h2>Yangi mahsulotlar qo'shish</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Mahsulot nomi..."
          value={product.name}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="description"
          placeholder="Izoh..."
          value={product.description}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="price"
          placeholder="Narxi..."
          value={product.price}
          onChange={handleChange}
          required
        />
        <button type="submit">
          {editIndex !== null ? "Yangilash" : "Qo'shish"}
        </button>
      </form>
      <div className="product-list">
        {productList.map((item, index) => (
          <div key={index} className="product-card">
            <div className="like-icon" onClick={() => handleLike(index)}>
              {item.liked ? "❤️" : "🤍"}
            </div>
            <img
              src="https://media.licdn.com/dms/image/v2/C560BAQF0D48SFQ9TBQ/company-logo_200_200/company-logo_200_200/0/1636452995521/korzinkauz_logo?e=2147483647&v=beta&t=MzSGG5R-Bekqt8PabJFFeu-Qrm_0-zqQevuExmHBOXU"
              alt=""
            />
            <h3>{item.name}</h3>
            <p>{item.description}</p>
            <p>{item.price} so'm</p>
            <div className="btn-group">
              <button onClick={() => handleEdit(index)} className="edit-btn">
                Edit
              </button>
              <button
                onClick={() => handleDelete(index)}
                className="delete-btn"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Add;
