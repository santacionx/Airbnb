document.addEventListener('DOMContentLoaded', function() {
    document.addEventListener('click', function(event) {
      if (event.target && event.target.id === 'darkModeToggle') {
        toggleDarkMode();
      }
    });
  });
  
  function toggleDarkMode() {
    const body = document.body;
    body.classList.toggle('dark-mode');
  }