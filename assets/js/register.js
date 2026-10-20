document.addEventListener('DOMContentLoaded', () => {
    const registerForm = document.getElementById('register-form');
    
    if (registerForm) {
        registerForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const fullname = document.getElementById('fullname')?.value.trim() || '';
            const username = document.getElementById('username')?.value.trim() || document.getElementById('email')?.value.trim();
            const password = document.getElementById('password')?.value.trim();

            if (!username || !password) {
                alert('Vui lòng nhập đầy đủ thông tin tài khoản và mật khẩu!');
                return;
            }

            // Lấy danh sách tài khoản đã đăng ký từ localStorage
            let usersList = JSON.parse(localStorage.getItem('clubUsers')) || [];

            // Kiểm tra xem tài khoản đã tồn tại chưa
            const existingUser = usersList.find(u => u.username === username);
            if (existingUser) {
                alert('Tên đăng nhập hoặc Email này đã được sử dụng!');
                return;
            }

            // Thêm tài khoản mới vào danh sách
            const newUser = {
                id: Date.now(),
                fullname: fullname,
                username: username,
                password: password,
                role: 'member' // Phân quyền là thành viên thường
            };

            usersList.push(newUser);
            localStorage.setItem('clubUsers', JSON.stringify(usersList));

            alert('Đăng ký tài khoản thành công! Vui lòng chuyển sang trang đăng nhập.');
            window.location.href = 'login.html';
        });
    }
});