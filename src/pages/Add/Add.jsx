import { useState } from "react";
import { useProductStore } from "../../store/store";
import "./Add.scss";

const Add = () => {
  const [product, setProduct] = useState({
    name: "",
    description: "",
    price: "",
  });
  const products = useProductStore((state) => state.products);
  const addProduct = useProductStore((state) => state.addProduct);
  const removeProduct = useProductStore((state) => state.removeProduct);
  const editProduct = useProductStore((state) => state.editProduct);

  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newProduct = { ...product, id: Date.now() };
    addProduct(newProduct);
    setProduct({ name: "", description: "", price: "" });
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
        <button type="submit">Qo'shish</button>
      </form>

      <div className="product-list">
        {products.map((item) => (
          <div key={item.id} className="product-card">
            <img
              src="https://media.licdn.com/dms/image/v2/C560BAQF0D48SFQ9TBQ/company-logo_200_200/company-logo_200_200/0/1636452995521/korzinkauz_logo?e=2147483647&v=beta&t=MzSGG5R-Bekqt8PabJFFeu-Qrm_0-zqQevuExmHBOXU"
              alt=""
            />
            <h3>{item.name}</h3>
            <p>{item.description}</p>
            <p>{item.price} so'm</p>
            <div className="btn-group">
              <button
                className="edit-btn"
                onClick={() =>
                  editProduct(item.id, { name: prompt("Yangi nom kiriting:") })
                }
              >
                Tahrirlash
              </button>
              <button
                className="delete-btn"
                onClick={() => removeProduct(item.id)}
              >
                Oʻchirish
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Add;
