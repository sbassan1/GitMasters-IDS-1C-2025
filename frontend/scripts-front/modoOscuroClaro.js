const body = document.body;
const toggleBtn = document.getElementById('toggleTheme');
const icon = document.getElementById('themeIcon');

const savedTheme = localStorage.getItem('theme');
if (savedTheme) {
    body.setAttribute('data-bs-theme', savedTheme);
    icon.className = savedTheme === 'dark'
        ? 'bi bi-brightness-high-fill user-icon'
        : 'bi bi-moon-fill user-icon';
}

toggleBtn.addEventListener('click', () => {
    const currentTheme = body.getAttribute('data-bs-theme');
    const isDark = currentTheme === 'dark';
    const newTheme = isDark ? 'light' : 'dark';

    body.setAttribute('data-bs-theme', newTheme);
    localStorage.setItem('theme', newTheme);

    icon.className = newTheme === 'dark'
        ? 'bi bi-brightness-high-fill user-icon'
        : 'bi bi-moon-fill user-icon';
});