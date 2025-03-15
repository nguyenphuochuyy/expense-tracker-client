import { useState, useEffect } from 'react';
import Login from './components/Login';
import Register from './components/Register';
import ExpenseManager from './components/ExpenseManager';

function App() {
  const [userId, setUserId] = useState(localStorage.getItem('userId'));
  const [isRegistering, setIsRegistering] = useState(false);

  return (
    <div>
      {userId ? (
        <ExpenseManager userId={userId} setUserId={setUserId} /> // Truyền setUserId
      ) : isRegistering ? (
        <Register setUserId={setUserId} />
      ) : (
        <Login setUserId={setUserId} />
      )}
      {!userId && (
        <button
          onClick={() => setIsRegistering(!isRegistering)}
          style={{ marginTop: '10px' }}
        >
          {isRegistering ? 'Quay lại Đăng nhập' : 'Chuyển sang Đăng ký'}
        </button>
      )}
    </div>
  );
}

export default App;