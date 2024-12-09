document.addEventListener('DOMContentLoaded', () => {
  // DOM elements for the navigation sidebar
  const menuToggle = document.querySelector('.menu-toggle'); // Hamburger menu button
  const overlayNav = document.querySelector('.overlay-nav'); // Sidebar menu
  const carouselItems = document.querySelector('.carousel-items');
  const prevButton = document.getElementById('prev');
  const nextButton = document.getElementById('next');
  const detailsButtons = document.querySelectorAll('.details-btn');
  const showLessButtons = document.querySelectorAll('.show-less-btn');
  const arrows = document.querySelectorAll('.carousel-arrows button');

  let currentIndex = 0;
  let carouselInterval;

  // Start the carousel auto-slide
  function startCarousel() {
    carouselInterval = setInterval(() => {
      nextSlide();
    }, 4000);
  }

  // Stop the carousel auto-slide
  function stopCarousel() {
    clearInterval(carouselInterval);
  }

  // Move to the next slide
  function nextSlide() {
    currentIndex = (currentIndex === carouselItems.children.length - 1) ? 0 : currentIndex + 1;
    updateCarousel();
  }

  // Move to the previous slide
  function prevSlide() {
    currentIndex = (currentIndex === 0) ? carouselItems.children.length - 1 : currentIndex - 1;
    updateCarousel();
  }

  // Update carousel position
  function updateCarousel() {
    carouselItems.style.transform = `translateX(-${currentIndex * 100}%)`;
  }

  // Toggle details visibility
  function toggleDetails(button, show) {
    const detailsContent = button.closest('.item').querySelector('.details-content');

    if (show) {
      detailsContent.style.display = 'block';
      stopCarousel();
      arrows.forEach(arrow => arrow.classList.add('hidden'));
    } else {
      detailsContent.style.display = 'none';
      startCarousel();
      arrows.forEach(arrow => arrow.classList.remove('hidden'));
    }
  }

  // Handle "SHOP NOW" button clicks
  detailsButtons.forEach(button => {
    button.addEventListener('click', () => {
      toggleDetails(button, true);
    });
  });

  // Handle "Show Less" button clicks
  showLessButtons.forEach(button => {
    button.addEventListener('click', () => {
      toggleDetails(button, false);
    });
  });

  // Handle carousel controls
  prevButton.addEventListener('click', () => {
    stopCarousel();
    prevSlide();
    startCarousel();
  });

  nextButton.addEventListener('click', () => {
    stopCarousel();
    nextSlide();
    startCarousel();
  });

  // Start the carousel on page load
  startCarousel();

  // Hamburger menu toggle functionality
  menuToggle.addEventListener('click', () => {
    overlayNav.classList.toggle('active'); // Toggle the active class to show or hide the sidebar
  });

  // Close sidebar when clicking outside of it
  document.addEventListener('click', (event) => {
    const isClickInsideSidebar = overlayNav.contains(event.target);
    const isClickOnToggle = menuToggle.contains(event.target);

    if (!isClickInsideSidebar && !isClickOnToggle && overlayNav.classList.contains('active')) {
      overlayNav.classList.remove('active');
    }
  });

  // Cart sidebar toggle
  const cartSidebar = document.querySelector('.cart-sidebar');
  const cartToggle = document.querySelector('.cart'); // Cart icon
  const closeCartBtn = document.querySelector('.close-cart'); // Close button for cart sidebar
  const addToCartBtns = document.querySelectorAll('.add-to-cart-btn');
  const cartItemsList = document.querySelector('.cart-items');
  const totalPriceElem = document.getElementById('total-price');
  let totalPrice = 0;

  // Ensure the cart sidebar exists
  if (!cartSidebar || !cartToggle || !closeCartBtn) {
    console.error('One or more required elements for the cart sidebar are missing.');
    return;
  }

  // Toggle cart sidebar visibility when clicking the cart icon
  cartToggle.addEventListener('click', (event) => {
    event.stopPropagation(); // Prevent click from bubbling up
    cartSidebar.classList.toggle('active'); // Add/remove 'active' class to toggle visibility
  });

  // Close the cart sidebar when clicking the close button
  closeCartBtn.addEventListener('click', () => {
    cartSidebar.classList.remove('active'); // Close the cart sidebar by removing 'active'
  });

  // Close the cart sidebar when clicking outside of it
  document.addEventListener('click', (event) => {
    const isClickInsideCart = cartSidebar.contains(event.target); // Check if the click is inside the cart sidebar
    const isClickOnCartToggle = cartToggle.contains(event.target); // Check if the click is on the cart icon

    // Close the cart sidebar if the click is outside
    if (!isClickInsideCart && !isClickOnCartToggle && cartSidebar.classList.contains('active')) {
      cartSidebar.classList.remove('active'); // Close cart sidebar if click is outside
    }
  });

  // Add to Cart functionality
  addToCartBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      const glassesItem = btn.closest('.item');
      const itemName = glassesItem.querySelector('p').textContent;

      // Fetch the new price (last <p> tag in PriceAndName div)
      const priceAndNameDiv = glassesItem.querySelector('.PriceAndName');
      const priceElements = priceAndNameDiv.querySelectorAll('p');
      const itemPrice = parseFloat(priceElements[priceElements.length - 1].textContent.replace('$', ''));

      const itemImageSrc = glassesItem.querySelector('img').src;

      // Hide the "Your cart is empty" message
      const emptyMessage = document.querySelector('.cart-content p');
      if (emptyMessage) {
        emptyMessage.style.display = 'none';
      }

      // Create a new list item for the cart
      const listItem = document.createElement('li');

      // Create the image element
      const itemImage = document.createElement('img');
      itemImage.src = itemImageSrc;
      itemImage.alt = itemName;
      itemImage.style.width = '50px';
      itemImage.style.marginRight = '10px';

      // Create the remove button
      const removeButton = document.createElement('button');
      removeButton.textContent = 'X';
      removeButton.style.marginLeft = '10px';
      removeButton.style.backgroundColor = '#0505e5';
      removeButton.style.color = 'white';
      removeButton.style.border = 'none';
      removeButton.style.cursor = 'pointer';

      // Append the image, name, price, and remove button to the list item
      listItem.appendChild(itemImage);
      listItem.innerHTML += `${itemName} - $${itemPrice}`;
      listItem.appendChild(removeButton);
      cartItemsList.appendChild(listItem);

      totalPrice += itemPrice;
      totalPriceElem.textContent = totalPrice.toFixed(2);

      // Show "Item Added" message
      const message = document.createElement('div');
      message.className = 'item-added-message';
      message.textContent = 'Item Added';
      document.body.appendChild(message);

      // Fade in the message
      setTimeout(() => {
        message.classList.add('show');
      }, 100);

      // Fade out and remove the message after 2 seconds
      setTimeout(() => {
        message.classList.remove('show');
        setTimeout(() => {
          message.remove();
        }, 500);
      }, 2000);

      // Add event listener to remove the item when the remove button is clicked
      removeButton.addEventListener('click', () => {
        cartItemsList.removeChild(listItem);
        totalPrice -= itemPrice;
        totalPriceElem.textContent = totalPrice.toFixed(2);

        // If the cart is empty after removal, show the "Your cart is empty" message
        if (cartItemsList.children.length === 0) {
          emptyMessage.style.display = 'block';
        }
      });
    });
  });

  // Handle checkout button click
  const checkoutBtn = document.getElementById('checkout-btn');

  checkoutBtn.addEventListener('click', () => {
    const cartItems = document.querySelectorAll('.cart-items li');
    let message = "Thank you for your order! Here’s what you’ve selected:\n\n";

    cartItems.forEach((item, index) => {
      // Extract item name from the cart
      const itemName = item.querySelector('img').alt;

      // Locate the corresponding carousel item using the item name
      const itemElement = Array.from(document.querySelectorAll('.carousel .item')).find(el => {
        return el.querySelector('p').textContent.trim() === itemName;
      });

      if (itemElement) {
        // Fetch old and new prices
        const priceAndNameDiv = itemElement.querySelector('.PriceAndName');
        const priceElements = priceAndNameDiv.querySelectorAll('p');
        const oldPrice = priceElements[0]?.textContent.replace('$', '') || 'N/A';
        const newPrice = priceElements[priceElements.length - 1]?.textContent.replace('$', '');

        // Append the details to the message
        message += `Product: ${itemName}\n`;
        if (oldPrice !== 'N/A') message += `Price: $${oldPrice}\n`;
        message += `Discounted Price: $${newPrice}\n\n`;
      }
    });

    // Add total price
    const totalPrice = document.getElementById('total-price').textContent;
    message += `Total Price: $${totalPrice}`;

    // Encode and send the message via WhatsApp
    const encodedMessage = encodeURIComponent(message);
    const phoneNumber = '+96181563241'; // Your phone number
    const whatsappURL = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
    window.open(whatsappURL, '_blank');
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
    window.location.href = '#ForFAQ';
  });
  document.querySelector('.li5').addEventListener('click', () => {
    window.location.href = '#Socials';
  });
});

document.querySelector('.social-icon').addEventListener('click', function(event) {
  event.preventDefault(); // Prevent default action of the link
  let link = this.getAttribute('href');
  window.open(link, '_blank');
});

document.addEventListener('DOMContentLoaded', () => {
  const carousels = document.querySelectorAll('.collection-carousel');

  carousels.forEach(carousel => {
    const itemsContainer = carousel.querySelector('.collection-items');
    const prevArrow = carousel.querySelector('.prev-arrow');
    const nextArrow = carousel.querySelector('.next-arrow');

    if (!itemsContainer || !prevArrow || !nextArrow) {
      console.error('Carousel structure is missing required elements.');
      return;
    }

    // Scroll logic
    const scrollAmount = itemsContainer.offsetWidth; // Scroll by one full view of the container

    prevArrow.addEventListener('click', () => {
      itemsContainer.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
    });

    nextArrow.addEventListener('click', () => {
      itemsContainer.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    });

    // Update arrow visibility dynamically
    const updateArrowsVisibility = () => {
      const maxScrollLeft = itemsContainer.scrollWidth - itemsContainer.clientWidth;
      prevArrow.style.display = itemsContainer.scrollLeft > 0 ? 'block' : 'none';
      nextArrow.style.display = itemsContainer.scrollLeft < maxScrollLeft ? 'block' : 'none';
    };

    // Attach event listeners for visibility updates
    itemsContainer.addEventListener('scroll', updateArrowsVisibility);
    window.addEventListener('resize', updateArrowsVisibility);

    // Initial visibility update
    updateArrowsVisibility();
  });
});
