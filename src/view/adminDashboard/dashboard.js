
const dashboardData = {
  applicationsToday: 21,
  activeServices: 124,
  pendingApprovals: 8,
  adminName: 'Admin',
  lastLogin: 'Dec 16, 2025 · 7:45 PM'
};


window.addEventListener('DOMContentLoaded', () => {
  loadStats();
  loadUserInfo();
  updateTimestamp();
  setInterval(updateTimestamp, 1000);
});

function loadStats(){
  setText('applicationsToday', dashboardData.applicationsToday);
  setText('activeServices', dashboardData.activeServices);
  setText('pendingApprovals', dashboardData.pendingApprovals);
}

function loadUserInfo(){
  const nameEl = document.getElementById('adminName');
  const loginEl = document.getElementById('lastLogin');
  if(nameEl) nameEl.textContent = dashboardData.adminName;
  if(loginEl) loginEl.textContent = dashboardData.lastLogin;
}

(function(){
            const el = document.getElementById('sidebar-timestamp');
            function pad(n){ return n < 10 ? '0' + n : n }
            function update(){
                if(!el) return;
                const d = new Date();
                el.textContent = pad(d.getMonth() + 1) + '-' + pad(d.getDate()) + '-' + d.getFullYear() + ' ' + pad(d.getHours()) + ':' + pad(d.getMinutes()) + ':' + pad(d.getSeconds());
            }
            update();
            setInterval(update, 1000);
        })();

function setText(id, value){
  const el = document.getElementById(id);
  if(el) el.textContent = value;
}

function updateNotifications(count) {
    const dot = document.getElementById('notifDot');

    if (!dot) return;

    if (count > 0) {
        dot.style.display = 'block';
    } else {
        dot.style.display = 'none';
    }
}


updateNotifications(0);   


fetch('/api/notifications')
  .then(res => res.json())
  .then(data => {
      updateNotifications(data.count);
  });


const sidebarToggle = document.getElementById('sidebarToggle');

if (sidebarToggle) {
  sidebarToggle.addEventListener('click', () => {
    document.body.classList.toggle('sidebar-hidden');
  });
}

const logoutBtn = document.getElementById('logoutBtn');
const logoutModal = document.getElementById('logoutModal');
const cancelLogout = document.getElementById('cancelLogout');
const confirmLogout = document.getElementById('confirmLogout');

if (logoutBtn) {
  logoutBtn.addEventListener('click', (e) => {
    e.preventDefault();
    logoutModal.style.display = 'flex';
  });
}

if (cancelLogout) {
  cancelLogout.addEventListener('click', () => {
    logoutModal.style.display = 'none';
  });
}

if (confirmLogout) {
  confirmLogout.addEventListener('click', () => {
    localStorage.clear();
    sessionStorage.clear();



    window.location.replace('/adminlogin/login.html');


  });
}




