import React from "react";
import { useCart } from "../cart/CartContext.";
import { Link } from "react-router-dom";
import "./cart.scss";
import Header from "../Trangchu/Header"; // Import Header

const Cart = () => {
  const { cart, increaseQuantity, decreaseQuantity, removeFromCart } = useCart();

  // Tính tổng số lượng các sản phẩm trong giỏ hàng
  const totalQuantity = cart.reduce((total, item) => total + item.quantity, 0);
  // Tính tổng tiền các sản phẩm trong giỏ hàng
  const shippingCost = 20000;
  const totalPrice = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  ) + shippingCost;

  return (
    <>
      <Header />
      <div className="cart-container">
        {/* Hiển thị danh sách sản phẩm trong giỏ */}
        <div className="cart-items">
          <h2 style={{ textAlign: "center", fontSize: "30px" }}>Giỏ hàng của bạn</h2>
          {cart.length === 0 ? (
            <div className="empty-cart">
              <p>Giỏ hàng đang trống.</p>
              <Link to="/Trangchu" className="go-back">
                Quay lại mua sắm
              </Link>
            </div>
          ) : (
            cart.map((item) => (
              <div className="cart-item" key={item.id}>
                <img src={item.image} alt={item.name} />
                <div className="cart-item-details">
                  <h3> <Link to={`/products/${item.id}`}>{item.name}</Link></h3>
                </div>

                <div className="price">
                  <span>{item.price.toLocaleString("vi-VN")} VNĐ</span>
                </div>
                <div className="quantity-controls">
                  <button onClick={() => decreaseQuantity(item.id)} style={{ marginBottom: "35px" }}>
                    -
                  </button>
                  <span style={{ marginLeft: "20px" }}>{item.quantity}</span>
                  <button onClick={() => increaseQuantity(item.id)} style={{ marginBottom: "35px" }}>
                    +
                  </button>
                </div>
                <div className="cart-item-details">
                  <button
                    className="remove-button"
                    onClick={() => removeFromCart(item.id)}
                  >
                    <i className="fa-solid fa-trash"></i>
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Hiển thị thông tin thanh toán */}
        {cart.length > 0 && (
          <div className="cart-summary">
            <div className="duoi">
              <h3>Thông tin thanh toán</h3>
              <p>Tổng sản phẩm: {totalQuantity}</p>
              <p>Giá vận chuyển: {shippingCost.toLocaleString("vi-VN")} VNĐ</p>
              <hr />
              <p style={{ marginTop: "20px" }}>
                Tổng tiền: {totalPrice.toLocaleString("vi-VN")} VNĐ
              </p>
              <button className="checkout-button" style={{ marginTop: "10px" }}>
                <Link to="/checkout" className="action-item">
                  Thanh toán
                </Link>
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Cart;