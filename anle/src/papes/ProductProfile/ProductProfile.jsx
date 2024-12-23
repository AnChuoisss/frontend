
import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useCart } from "../cart/CartContext.";
import Header from "../Trangchu/Header";
import "./ProductProfile.scss";
import Footer from "../Trangchu/Footer";

const ProductProfile = () => {
  const { productId } = useParams(); // Lấy ID sản phẩm từ URL
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1); // Quản lý số lượng
  const [relatedProducts, setRelatedProducts] = useState([]); // Sản phẩm liên quan

  const productList = [
    { id: 1, name: "Clopheniramin 4mg", price: 100000, image: "/clopheniramin1.webp", type: "thuoc", description: "Thuốc Clopheniramin giúp điều trị triệu chứng viêm mũi dị ứng", details: "Chi tiết sản phẩm..." },
    { id: 2, name: "Paracetamol 500mg", price: 200000, image: "/paracetamol.jpg", type: "thuoc" },
    { id: 3, name: "Veet Pure (Kem tẩy lông)", price: 150000, image: "/Veet Pure(Kem tay long).webp", type: "duoc-my-pham" },
    { id: 4, name: "Thuốc D", price: 180000, image: "https://via.placeholder.com/150", type: "thuoc" },
  ];

  useEffect(() => {
    const selectedProduct = productList.find((product) => product.id === parseInt(productId));
    if (selectedProduct) {
      setProduct(selectedProduct);
      // Tìm các sản phẩm liên quan
      const related = productList.filter(
        (p) => p.type === selectedProduct.type && p.id !== selectedProduct.id
      );
      setRelatedProducts(related);
    }
  }, [productId]);

  const handleQuantityChange = (e) => {
    const newQuantity = parseInt(e.target.value);
    if (newQuantity > 0) {
      setQuantity(newQuantity);
    }
  };

  const handleAddToCart = () => {
    addToCart({ ...product, quantity });
  };

  const handleBuyNow = () => {
    addToCart({ ...product, quantity });
    navigate("/cart");
  };

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div className="product-profile">
      <Header />
      <div className="product-profile-box">
        <div className="product-image">
          <img src={product.image} alt={product.name} />
        </div>
        <div className="product-details">
          <h2>{product.name}</h2>
          <p className="product-price"><b>{product.price.toLocaleString("vi-VN")} VNĐ</b>/ Hộp</p>
          <p className="product-description">{product.description}</p>
          <p className="product-details-text">{product.details}</p>

          <div className="product-quantity">
            <label>Số lượng:</label>
            <input 
              type="number" 
              value={quantity} 
              onChange={handleQuantityChange} 
              min="1" 
              step="1"
            />
          </div>

          <div className="product-actions">
            <button onClick={handleAddToCart}>Thêm vào giỏ hàng</button>
            <button onClick={handleBuyNow}>Mua ngay</button>
          </div>
        </div>
      </div>

      {/* Hiển thị sản phẩm liên quan */}
      <div className="related-products">
        <h3 style={{textAlign: "center"}}>Sản phẩm liên quan</h3>
        <div className="product-list">
          {relatedProducts.map((related) => (
            <div className="product-item " key={related.id} >
              <img src={related.image} alt={related.name} />
              <h4> <Link to={`/products/${related.id}`}>{related.name}</Link></h4>
              <p><b>{related.price.toLocaleString("vi-VN")} VNĐ</b>/ Hộp</p>
              <button onClick={() => addToCart({ ...related, quantity: 1 })}>
                Thêm vào giỏ hàng
              </button>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ProductProfile;