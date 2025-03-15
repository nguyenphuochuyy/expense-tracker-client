import { useState } from 'react';
import axios from 'axios';

const Login = ({ setUserId }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('https://expense-tracker-server-bsse.onrender.com/api/auth/login', { email, password });
      setUserId(res.data.userId);
      localStorage.setItem('userId', res.data.userId);
    } catch (error) {
      alert('Đăng nhập thất bại');
    }
  };

  return (
    <div className="login-container">
      <h2>Đăng nhập</h2>
      <form onSubmit={handleLogin}>
        <div className="input-group">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            required
          />
        </div>
        <div className="input-group">
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Mật khẩu"
            required
          />
          <button type="submit">Đăng nhập</button>
        </div>
      </form>
      <p className="register-link">
        Chưa có tài khoản? <a href="#" onClick={() => window.location.href = '/'}>Đăng ký</a>
      </p>
    </div>
  );
};

export default Login;