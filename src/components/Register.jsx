import { useState } from 'react';
import axios from 'axios';

const Register = ({ setUserId }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/api/auth/register', { email, password });
      alert('Đăng ký thành công! Vui lòng đăng nhập.');
      setEmail('');
      setPassword('');
      window.location.href = '/';
    } catch (error) {
      alert('Đăng ký thất bại. Email có thể đã tồn tại.');
    }
  };

  return (
    <div className="login-container">
      <h2>Đăng ký</h2>
      <form onSubmit={handleRegister}>
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
          <button type="submit">Đăng ký</button>
        </div>
      </form>
      <p className="register-link">
        Đã có tài khoản? <a href="#" onClick={() => window.location.href = '/'}>Đăng nhập</a>
      </p>
    </div>
  );
};

export default Register;