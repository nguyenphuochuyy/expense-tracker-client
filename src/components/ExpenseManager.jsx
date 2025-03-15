import { useState, useEffect } from 'react';
import axios from 'axios';
import formatCurrency from "../helpers/formatCurrent";

const ExpenseManager = ({ userId, setUserId }) => {
  const [name, setName] = useState('');
  const [amount, setAmount] = useState('');
  const [expenses, setExpenses] = useState([]);

  const addExpense = async (e) => {
    e.preventDefault();
    await axios.post('/api/expenses', { userId, name, amount });
    setName('');
    setAmount('');
    fetchExpenses();
  };

  const fetchExpenses = async () => {
    const res = await axios.get(`/api/expenses/${userId}`);
    setExpenses(res.data);
  };

  useEffect(() => {
    fetchExpenses();
  }, []);

  // Tính tổng tiền
  const totalAmount = expenses.reduce((sum, expense) => sum + expense.amount, 0);
  const handleLogout = () => {
    localStorage.removeItem('userId'); // Xóa userId khỏi localStorage
    setUserId(null); // Cập nhật state để quay lại màn hình đăng nhập
  };

  const handleDelete = async (id) => {
    if (window.confirm('Bạn có chắc muốn xóa chi tiêu này?')) {
      await axios.delete(`/api/expenses/${id}`);
      fetchExpenses(); // Cập nhật lại danh sách sau khi xóa
    }
  };

  // Định dạng ngày tháng
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('vi-VN'); // Định dạng: DD/MM/YYYY
  };
  return (
    <div>
      <h2>Quản lý chi tiêu</h2>
     
      <form onSubmit={addExpense}>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Tên chi tiêu"
          required
        />
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="Số tiền"
          required
        />
        <button type="submit" style={{}}>Thêm</button>
      </form>
      <table>
        <thead>
          <tr>
            <th>Tên chi tiêu</th>
            <th>Số tiền</th>
            <th>Ngày</th>
          </tr>
        </thead>
        <tbody>
          {expenses.map((expense) => (
            <tr key={expense._id}>
              <td>{expense.name}</td>
              <td>{formatCurrency(expense.amount)}</td>
              <td>{formatDate(expense.date)}</td>
              <td>
                <button onClick={() => handleDelete(expense._id)}
                  className="delete-btn"> Xóa chi tiêu</button>
              </td>
            </tr>
          ))}
          <tr>
            <td>Tổng cộng</td>
            <td>{formatCurrency(totalAmount)}</td>
          </tr>
        </tbody>
      </table>
      <button onClick={handleLogout} className="logout-btn">Đăng xuất</button>
    </div>
  );
};

export default ExpenseManager;