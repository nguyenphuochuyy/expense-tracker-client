// Hàm định dạng số tiền sang VNĐ
const formatCurrency = (amount) => {
    // Chuyển đổi amount thành số nếu nó là chuỗi
    const number = Number(amount);
    
    // Kiểm tra nếu không phải số hợp lệ
    if (isNaN(number)) return '0 VNĐ';
  
    // Định dạng với dấu chấm phân cách hàng nghìn
    return number.toLocaleString('vi-VN', {
      style: 'currency',
      currency: 'VND',
    });
  };
  
  export default formatCurrency;