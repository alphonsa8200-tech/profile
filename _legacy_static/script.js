// Set current year in footer
document.getElementById('year').textContent = new Date().getFullYear();

// Theme toggle handling
const themeToggleBtn = document.getElementById('theme-toggle');
const rootElement = document.documentElement;

// Initialize theme from localStorage or system preference
const savedTheme = localStorage.getItem('theme');
const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

if (savedTheme) {
  rootElement.setAttribute('data-theme', savedTheme);
  themeToggleBtn.textContent = savedTheme === 'dark' ? '☀️' : '🌙';
} else if (prefersDark) {
  rootElement.setAttribute('data-theme', 'dark');
  themeToggleBtn.textContent = '☀️';
} else {
  rootElement.setAttribute('data-theme', 'light');
  themeToggleBtn.textContent = '🌙';
}

themeToggleBtn.addEventListener('click', () => {
  const currentTheme = rootElement.getAttribute('data-theme');
  const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

  rootElement.setAttribute('data-theme', newTheme);
  localStorage.setItem('theme', newTheme);
  themeToggleBtn.textContent = newTheme === 'dark' ? '☀️' : '🌙';
});

// Contact form submission handling
const contactForm = document.getElementById('contact-form');
const formStatus = document.getElementById('form-status');

if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('name').value.trim();
    
    // Simulate sending message
    formStatus.textContent = `Thank you, ${name}! Your message has been sent.`;
    formStatus.className = 'form-status success';

    // Reset form fields
    contactForm.reset();

    // Clear status message after 5 seconds
    setTimeout(() => {
      formStatus.textContent = '';
      formStatus.className = 'form-status';
    }, 5000);
  });
}

