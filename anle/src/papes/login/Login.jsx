// import React from "react";
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "./login.scss";
import TrangChu from '../Trangchu/Trangchu';

const Login = () => {
    const [phone, setphone] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false); // Thêm trạng thái loading
    const navigate = useNavigate();
  
    const handleLogin = (e) => {
      e.preventDefault();
      
      // Kiểm tra trường hợp để trống hoặc sai mật khẩu
      if (!username || !password) {
        toast.error('Tên người dùng và mật khẩu không được để trống!');
        return;
      }
  
      setLoading(true); // Bắt đầu quá trình đăng nhập
  
      // Giả lập thời gian tải 3 giây
      setTimeout(() => {
        if (phone === '0123456789' && password === 'admin') {
          toast.success('Đăng nhập thành công!');
          navigate('/'); // Redirect to the dashboard
        } else {
          toast.error('Tên người dùng hoặc mật khẩu không đúng');
        }
        setLoading(false); // Sau khi đăng nhập xong, ẩn màn hình loading
      }, 3000); // Giả lập thời gian tải trong 3 giây
    };
  return (
    <div className="login-container">
      {loading && (
        <div className="loading-overlay">
          <div className="loading-message">Đang tải, xin đợi một chút...</div>
        </div>
      )}
      <div className="  login-box">
        <h2>MEDICINE APP</h2>
        {error && <p className="error-message">{error}</p>}
        <form onSubmit={handleLogin}>
          <div className="input-group">
            <i className="icon-user"></i>
            <input
          type="number"
          id="username"
          placeholder="Số điện thoại"
          value={phone}
          onChange={(e) => setphone(e.target.value)}
        />
          </div>
          <div className="input-group">
            <i className="icon-lock"></i>
            <input
          type="password"
          id="password"
          placeholder="Nhập mật khẩu" 
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
          </div>
          <div className="actions">
            <label>
              <input type="checkbox" /> Remember me
            </label>
            <a href="#" className="forgot-password">
              Forgot Password?
            </a>
          </div>
          <button className="login-btn" type="submit">
            Login
          </button>
        </form>
        <span>Bạn chưa có tài khoản ? <Link to="/dangky">Đăng ký</Link>
        </span>
      </div>


    </div>
    
  );
};

export default Login;