document.addEventListener('DOMContentLoaded', function () {
    console.log("Website Quản lý Câu lạc bộ đã khởi chạy thành công!");
    document.addEventListener('DOMContentLoaded', function () {
    const currentUser = sessionStorage.getItem('currentUser');
    const currentRole = sessionStorage.getItem('currentRole');
    
    // Tìm các nút đăng nhập trên thanh menu
    const loginBtn = document.querySelector('.btn-login');
    
    if (currentUser && loginBtn) {
        if (currentRole === 'admin') {
            loginBtn.innerHTML = '<i class="fa-solid fa-user-shield"></i> Trang Quản Trị';
            loginBtn.setAttribute('href', 'admin.html');
        } else {
            loginBtn.innerHTML = '<i class="fa-solid fa-user"></i> ' + currentUser;
            loginBtn.setAttribute('href', '#');
        }
    }
});

    // Xử lý hiệu ứng cuộn mượt khi bấm vào các liên kết nội bộ trong trang (anchor links)
    const internalLinks = document.querySelectorAll('a[href^="#"]');
    
    internalLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            
            // Nếu chỉ là dấu # thì bỏ qua
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
});
document.addEventListener('DOMContentLoaded', function () {
    // 1. Lấy thông tin đăng nhập từ LocalStorage
    const currentUser = localStorage.getItem('currentUser');
    const currentRole = localStorage.getItem('currentRole');
    
    // Tìm nút Đăng nhập trên Menu
    const loginBtn = document.querySelector('.btn-login');
    
    if (loginBtn) {
        if (currentUser) {
            // Nếu là Admin -> Đổi nút Đăng nhập thành "Trang Quản Trị" hoặc tên Admin + Nút Đăng Xuất
            if (currentRole === 'admin') {
                loginBtn.innerHTML = '<i class="fa-solid fa-user-shield"></i> ' + currentUser + ' (Admin)';
                loginBtn.setAttribute('href', 'admin.html');
                loginBtn.style.backgroundColor = '#2563eb';
                loginBtn.style.color = '#ffffff';
            } else {
                loginBtn.innerHTML = '<i class="fa-solid fa-user"></i> ' + currentUser;
                loginBtn.setAttribute('href', '#');
            }
        }
    }

    // 2. Xử lý cuộn mượt cho các thẻ liên kết nội bộ (#)
    const internalLinks = document.querySelectorAll('a[href^="#"]');
    internalLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                targetElement.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
});