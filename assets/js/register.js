document.addEventListener('DOMContentLoaded', () => {
    const registerForm = document.getElementById('register-form');
    
    if (registerForm) {
        registerForm.addEventListener('submit', (e) => {
            e.preventDefault();

            // Lấy thông tin từ các ô input
            const fullname = document.getElementById('fullname')?.value.trim() || '';
            const email = document.getElementById('email')?.value.trim() || '';
            const studentId = document.getElementById('student-id')?.value.trim() || 'Chưa nhập';

            const newMember = {
                id: Date.now(),
                fullname: fullname,
                email: email,
                studentId: studentId
            };

            // Lấy danh sách thành viên hiện có trong LocalStorage
            let membersList = JSON.parse(localStorage.getItem('clubMembers')) || [];
            membersList.push(newMember);

            // Lưu lại vào LocalStorage
            localStorage.setItem('clubMembers', JSON.stringify(membersList));

            alert('Đăng ký tham gia CLB thành công!');
            registerForm.reset();
        });
    }
});