
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

function updateTimestamp(){
  const el = document.getElementById('sidebar-timestamp');
  if(!el) return;
  const now = new Date();
  el.textContent = now.toLocaleString();
}

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



document.getElementById('logoutBtn')?.addEventListener('click', () => {
  if(confirm('Are you sure you want to logout?')){
    window.location.href = '/logout';
  }
});

const sidebarToggle = document.getElementById('sidebarToggle');

if (sidebarToggle) {
  sidebarToggle.addEventListener('click', () => {
    document.body.classList.toggle('sidebar-hidden');
  });
}


