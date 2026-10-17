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
});