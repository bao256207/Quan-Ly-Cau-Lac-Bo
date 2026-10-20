const currentRole = sessionStorage.getItem('currentRole');
if (currentRole !== 'admin') {
    alert('Vui lòng đăng nhập!');
    window.location.href = 'login.html';
}
document.addEventListener('DOMContentLoaded', () => {
    // 1. FETCH API LẤY CÂU NÓI TRUYỀN CẢM HỨNG
    const quoteText = document.getElementById('quote-text');
    async function fetchDailyQuote() {
        try {
            const response = await fetch('https://dummyjson.com/quotes/random');
            if (!response.ok) throw new Error('API Lỗi');
            const data = await response.json();
            quoteText.innerHTML = `"${data.quote}" — <strong>${data.author}</strong>`;
        } catch (error) {
            quoteText.innerHTML = `<span style="color: red;">Không thể tải câu nói truyền cảm hứng.</span>`;
        }
    }

    // 2. QUẢN LÝ SỰ KIỆN (CRUD & LOCALSTORAGE)
    const eventForm = document.getElementById('event-form');
    const eventIdInput = document.getElementById('event-id');
    const eventTitleInput = document.getElementById('event-title');
    const eventDateInput = document.getElementById('event-date');
    const eventTimeInput = document.getElementById('event-time');
    const eventLocationInput = document.getElementById('event-location');
    const eventSaveBtn = document.getElementById('event-save-btn');
    const eventsTableBody = document.getElementById('events-table-body');
    const eventMessage = document.getElementById('event-message');

    let eventsList = JSON.parse(localStorage.getItem('clubEvents')) || [
        { id: 1, title: 'Workshop: Nhập môn Web Frontend', date: '25/10/2026', time: '14:00 - 17:00', location: 'Hội trường A' },
        { id: 2, title: 'Chào tân sinh viên CLB IT Zone', date: '05/11/2026', time: '08:30 - 11:30', location: 'Phòng B201' }
    ];

    function renderAdminEvents() {
        if (!eventsTableBody) return;
        eventsTableBody.innerHTML = '';

        eventsList.forEach((evt, index) => {
            const tr = document.createElement('tr');
            tr.style.borderBottom = '1px solid #e2e8f0';
            tr.innerHTML = `
                <td style="padding: 12px;">${index + 1}</td>
                <td style="padding: 12px; font-weight:600;">${evt.title}</td>
                <td style="padding: 12px;">${evt.date}</td>
                <td style="padding: 12px;">${evt.time}</td>
                <td style="padding: 12px;">${evt.location}</td>
                <td style="padding: 12px; text-align: center;">
                    <button onclick="editEvent(${evt.id})" style="background:#eab308; color:white; border:none; padding:6px 10px; border-radius:4px; cursor:pointer; margin-right:5px;"><i class="fa-solid fa-pen"></i> Sửa</button>
                    <button onclick="deleteEvent(${evt.id})" style="background:#ef4444; color:white; border:none; padding:6px 10px; border-radius:4px; cursor:pointer;"><i class="fa-solid fa-trash"></i> Xóa</button>
                </td>
            `;
            eventsTableBody.appendChild(tr);
        });
    }

    if (eventForm) {
        eventForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const id = eventIdInput.value;
            const title = eventTitleInput.value.trim();
            const date = eventDateInput.value.trim();
            const time = eventTimeInput.value.trim();
            const location = eventLocationInput.value.trim();

            if (id) {
                const index = eventsList.findIndex(e => e.id == id);
                if (index !== -1) {
                    eventsList[index] = { id: Number(id), title, date, time, location };
                }
                eventMessage.style.color = '#15803d';
                eventMessage.innerText = 'Cập nhật sự kiện thành công!';
                eventSaveBtn.innerHTML = '<i class="fa-solid fa-plus"></i> Đăng Sự Kiện';
                eventIdInput.value = '';
            } else {
                const newEvent = { id: Date.now(), title, date, time, location };
                eventsList.push(newEvent);
                eventMessage.style.color = '#15803d';
                eventMessage.innerText = 'Đăng sự kiện thành công!';
            }

            localStorage.setItem('clubEvents', JSON.stringify(eventsList));
            renderAdminEvents();
            eventForm.reset();
            setTimeout(() => { eventMessage.innerText = ''; }, 3000);
        });
    }

    window.editEvent = (id) => {
        const evt = eventsList.find(e => e.id === id);
        if (evt) {
            eventIdInput.value = evt.id;
            eventTitleInput.value = evt.title;
            eventDateInput.value = evt.date;
            eventTimeInput.value = evt.time;
            eventLocationInput.value = evt.location;
            eventSaveBtn.innerHTML = '<i class="fa-solid fa-floppy-disk"></i> Lưu Thay Đổi';
        }
    };

    window.deleteEvent = (id) => {
        if (confirm('Xóa sự kiện này?')) {
            eventsList = eventsList.filter(e => e.id !== id);
            localStorage.setItem('clubEvents', JSON.stringify(eventsList));
            renderAdminEvents();
        }
    };

    // 3. ĐĂNG XUẤT
    const logoutBtn = document.getElementById('logout-btn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', (e) => {
            e.preventDefault();
            sessionStorage.clear();
            localStorage.removeItem('currentUser');
            alert('Đã đăng xuất!');
            window.location.href = 'login.html';
        });
    }

    fetchDailyQuote();
    renderAdminEvents();
    // HÀM HIỂN THỊ DANH SÁCH THÀNH VIÊN ĐĂNG KÝ
    const membersTableBody = document.getElementById('members-table-body');
    const statMembers = document.getElementById('stat-members');

    function renderAdminMembers() {
        if (!membersTableBody) return;

        // Dữ liệu mẫu ban đầu nếu chưa có ai đăng ký
        let membersList = JSON.parse(localStorage.getItem('clubMembers')) || [
            { id: 1, fullname: 'Đặng Gia Bảo', email: 'bao@gmail.com', studentId: '221101' },
            { id: 2, fullname: 'Nguyễn Văn A', email: 'nguyenvana@gmail.com', studentId: '221102' }
        ];

        membersTableBody.innerHTML = '';

        if (membersList.length === 0) {
            membersTableBody.innerHTML = `<tr><td colspan="5" style="text-align:center; padding: 15px; color: #94a3b8;">Chưa có thành viên nào đăng ký.</td></tr>`;
            if (statMembers) statMembers.innerText = 0;
            return;
        }

        membersList.forEach((mb, index) => {
            const tr = document.createElement('tr');
            tr.style.borderBottom = '1px solid #e2e8f0';
            tr.innerHTML = `
                <td style="padding: 12px;">${index + 1}</td>
                <td style="padding: 12px; font-weight: 600;">${mb.fullname}</td>
                <td style="padding: 12px;">${mb.email}</td>
                <td style="padding: 12px;">${mb.studentId}</td>
                <td style="padding: 12px; text-align: center;">
                    <button onclick="deleteMember(${mb.id})" style="background:#ef4444; color:white; border:none; padding:5px 10px; border-radius:4px; cursor:pointer;"><i class="fa-solid fa-trash"></i> Xóa</button>
                </td>
            `;
            membersTableBody.appendChild(tr);
        });

        // Cập nhật số lượng lên ô Thống kê Dashboard
        if (statMembers) statMembers.innerText = membersList.length;
    }

    // Hàm xóa thành viên
    window.deleteMember = (id) => {
        if (confirm('Bạn có chắc muốn xóa thành viên này khỏi danh sách?')) {
            let membersList = JSON.parse(localStorage.getItem('clubMembers')) || [];
            membersList = membersList.filter(mb => mb.id !== id);
            localStorage.setItem('clubMembers', JSON.stringify(membersList));
            renderAdminMembers();
        }
    };

    renderAdminMembers();
});