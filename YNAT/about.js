document.addEventListener('DOMContentLoaded', () => {
  // Select the elements for the navigation sidebar
  const menuToggle = document.querySelector('.menu-toggle'); // Hamburger menu
  const overlayNav = document.querySelector('.overlay-nav'); // Sidebar overlay
  const closeNav = document.querySelector('.close-nav'); // Close button for sidebar

  // Ensure elements for the navigation sidebar exist
  if (!menuToggle || !overlayNav) {
    console.error('One or more required elements for navigation are missing.');
    return;
  }

  // Toggle navigation sidebar visibility
  menuToggle.addEventListener('click', () => {
    overlayNav.classList.toggle('active'); // Add or remove 'active' class
  });

  // Close navigation sidebar when clicking the close button
  if (closeNav) {
    closeNav.addEventListener('click', () => {
      overlayNav.style.transition = 'width 0.3s ease';
      overlayNav.classList.remove('active');
    });
  }

  // Detect swipe gesture to close the sidebar
  let touchStartX = 0;
  let touchEndX = 0;

  overlayNav.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX; // Record where the swipe starts
  });

  overlayNav.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX; // Record where the swipe ends
    handleSwipe(); // Check swipe direction
  });

  function handleSwipe() {
    if (touchStartX > touchEndX + 50) {
      // Swipe left detected
      overlayNav.classList.remove('active');
    }
  }

  // Close navigation sidebar when clicking outside it
  document.addEventListener('click', (event) => {
    const isClickInsideSidebar = overlayNav.contains(event.target); // Check if click is inside sidebar
    const isClickOnToggle = menuToggle.contains(event.target); // Check if click is on menu toggle

    if (!isClickInsideSidebar && !isClickOnToggle && overlayNav.classList.contains('active')) {
      overlayNav.classList.remove('active'); // Close sidebar if click is outside
    }
  });

  // Handle menu navigation clicks
  document.querySelector('.li1').addEventListener('click', () => {
    window.location.href = 'index.html';
  });
  document.querySelector('.li2').addEventListener('click', () => {
    window.location.href = 'collections.html';
  });
  document.querySelector('.li3').addEventListener('click', () => {
    window.location.href = 'AboutUs.html';
  });
  document.querySelector('.li4').addEventListener('click', () => {
    window.location.href = 'index.html';
  });
  document.querySelector('.li5').addEventListener('click', () => {
    window.location.href = 'index.html';
  });

  // Select elements for the cart sidebar
  const cartToggle = document.querySelector('.cart'); // Cart icon
  const cartSidebar = document.querySelector('.cart-sidebar'); // Cart sidebar
  const closeCartBtn = document.querySelector('.close-cart'); // Close button for cart sidebar

  // Ensure elements for the cart sidebar exist
  if (!cartToggle || !cartSidebar || !closeCartBtn) {
    console.error('One or more required elements for the cart sidebar are missing.');
    return;
  }

  // Toggle cart sidebar visibility when clicking the cart icon
  cartToggle.addEventListener('click', (event) => {
    event.stopPropagation(); // Prevent click from bubbling up
    cartSidebar.classList.toggle('active'); // Add/remove 'active' class
  });

  // Close cart sidebar when clicking the close button
  closeCartBtn.addEventListener('click', () => {
    cartSidebar.classList.remove('active'); // Remove 'active' class to close the cart sidebar
  });

  // Close cart sidebar when clicking outside of it
  document.addEventListener('click', (event) => {
    const isClickInsideCart = cartSidebar.contains(event.target); // Check if click is inside cart sidebar
    const isClickOnCartToggle = cartToggle.contains(event.target); // Check if click is on cart icon

    if (!isClickInsideCart && !isClickOnCartToggle && cartSidebar.classList.contains('active')) {
      cartSidebar.classList.remove('active'); // Close cart sidebar if click is outside
    }
  });
});
