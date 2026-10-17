document.addEventListener('DOMContentLoaded', function () {
    const registerForm = document.getElementById('register-form');
    const messageBox = document.getElementById('register-message');

    if (registerForm) {
        registerForm.addEventListener('submit', function (e) {
            e.preventDefault(); // Ngăn chặn load lại trang mặc định của form

            // 1. Lấy dữ liệu từ các ô input
            const fullname = document.getElementById('fullname').value.trim();
            const studentId = document.getElementById('student-id').value.trim();
            const email = document.getElementById('email').value.trim();
            const phone = document.getElementById('phone').value.trim();
            const department = document.getElementById('department').value;
            const note = document.getElementById('note').value.trim();

            // 2. Tạo đối tượng chứa thông tin thành viên mới đăng ký
            const newMember = {
                id: Date.now(), // Tạo ID ngẫu nhiên dựa trên thời gian
                fullname: fullname,
                studentId: studentId,
                email: email,
                phone: phone,
                department: department,
                note: note,
                status: 'Chờ duyệt', // Trạng thái mặc định để Admin duyệt sau này
                date: new Date().toLocaleDateString('vi-VN')
            };

            // 3. Lấy danh sách thành viên cũ từ LocalStorage (nếu có)
            let membersList = JSON.parse(localStorage.getItem('clubMembers')) || [];

            // 4. Thêm thành viên mới vào danh sách
            membersList.push(newMember);

            // 5. Lưu ngược lại vào LocalStorage
            localStorage.setItem('clubMembers', JSON.stringify(membersList));

            // 6. Hiển thị thông báo thành công và reset form
            messageBox.style.display = 'block';
            messageBox.style.color = '#15803d';
            messageBox.style.backgroundColor = '#dcfce7';
            messageBox.style.padding = '10px';
            messageBox.style.borderRadius = '6px';
            messageBox.style.marginTop = '15px';
            messageBox.innerHTML = 'Gửi đơn đăng ký thành công! Ban Chủ nhiệm sẽ xem xét và phản hồi sớm cho bạn.';

            registerForm.reset();

            // Sau 3 giây ẩn thông báo
            setTimeout(() => {
                messageBox.style.display = 'none';
            }, 4000);
        });
    }
});