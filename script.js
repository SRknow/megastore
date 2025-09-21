// Main JavaScript for MegaStore E-Commerce Website
document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            this.classList.toggle('active');
        });
    }
    
    // Add to cart animation
    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    addToCartButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const originalText = this.textContent;
            this.textContent = 'Added to Cart!';
            this.style.background = 'var(--accent)';
            
            // Show cart notification
            showNotification('Product added to cart!');
            
            setTimeout(() => {
                this.textContent = originalText;
                this.style.background = '';
            }, 2000);
        });
    });
    
    // Newsletter subscription
    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = this.querySelector('input[type="email"]').value;
            
            // Simple email validation
            if (validateEmail(email)) {
                showNotification('Thank you for subscribing to our newsletter!');
                this.reset();
            } else {
                showNotification('Please enter a valid email address.', 'error');
            }
        });
    }
    
    // Product image zoom on hover
    const productImages = document.querySelectorAll('.product-img');
    productImages.forEach(image => {
        image.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.05)';
            this.style.transition = 'transform 0.3s ease';
        });
        
        image.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    });
    
    // Category card hover effect enhancement
    const categoryCards = document.querySelectorAll('.category-card');
    categoryCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.querySelector('.category-content').style.backgroundColor = 'var(--primary)';
            this.querySelector('.category-content').style.color = 'white';
            this.querySelector('.category-content h3').style.color = 'white';
        });
        
        card.addEventListener('mouseleave', function() {
            this.querySelector('.category-content').style.backgroundColor = '';
            this.querySelector('.category-content').style.color = '';
            this.querySelector('.category-content h3').style.color = 'var(--dark)';
        });
    });
    
    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('a[href^="#"]');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                // Close mobile menu if open
                if (navMenu.classList.contains('active')) {
                    navMenu.classList.remove('active');
                    menuToggle.classList.remove('active');
                }
                
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Helper function to validate email
    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }
    
    // Helper function to show notifications
    function showNotification(message, type = 'success') {
        // Remove existing notification if any
        const existingNotification = document.querySelector('.notification');
        if (existingNotification) {
            existingNotification.remove();
        }
        
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.textContent = message;
        
        // Style the notification
        notification.style.position = 'fixed';
        notification.style.top = '20px';
        notification.style.right = '20px';
        notification.style.padding = '15px 20px';
        notification.style.borderRadius = '5px';
        notification.style.color = 'white';
        notification.style.zIndex = '1000';
        notification.style.boxShadow = '0 4px 12px rgba(0,0,0,0.15)';
        notification.style.opacity = '0';
        notification.style.transform = 'translateX(100px)';
        notification.style.transition = 'all 0.3s ease';
        
        // Set background color based on type
        if (type === 'error') {
            notification.style.background = '#e74c3c';
        } else {
            notification.style.background = 'var(--accent)';
        }
        
  
// Books Page Specific JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Filter functionality
    const filterButtons = document.querySelectorAll('.filter-btn');
    const bookCards = document.querySelectorAll('.book-card');
    const sortOptions = document.getElementById('sort-options');
    
    // Filter by category
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            const filterValue = this.getAttribute('data-filter');
            
            // Show/hide books based on filter
            bookCards.forEach(card => {
                if (filterValue === 'all') {
                    card.style.display = 'block';
                } else {
                    if (card.getAttribute('data-category') === filterValue) {
                        card.style.display = 'block';
                    } else {
                        card.style.display = 'none';
                    }
                }
            });
        });
    });
    
    // Sort functionality
    sortOptions.addEventListener('change', function() {
        const sortValue = this.value;
        const booksContainer = document.querySelector('.books-grid');
        const booksArray = Array.from(bookCards);
        
        // Sort based on selected option
        switch(sortValue) {
            case 'popularity':
                // For demonstration, we'll sort by rating (higher first)
                booksArray.sort((a, b) => {
                    return parseFloat(b.getAttribute('data-rating')) - parseFloat(a.getAttribute('data-rating'));
                });
                break;
            case 'newest':
                // Sort by date (newest first)
                booksArray.sort((a, b) => {
                    return new Date(b.getAttribute('data-date')) - new Date(a.getAttribute('data-date'));
                });
                break;
            case 'price-low':
                // Sort by price (low to high)
                booksArray.sort((a, b) => {
                    return parseFloat(a.getAttribute('data-price')) - parseFloat(b.getAttribute('data-price'));
                });
                break;
            case 'price-high':
                // Sort by price (high to low)
                booksArray.sort((a, b) => {
                    return parseFloat(b.getAttribute('data-price')) - parseFloat(a.getAttribute('data-price'));
                });
                break;
            case 'rating':
                // Sort by rating (higher first)
                booksArray.sort((a, b) => {
                    return parseFloat(b.getAttribute('data-rating')) - parseFloat(a.getAttribute('data-rating'));
                });
                break;
        }
        
        // Clear container and append sorted books
        booksContainer.innerHTML = '';
        booksArray.forEach(book => {
            booksContainer.appendChild(book);
        });
    });
    
    // Book search functionality
    const searchInput = document.querySelector('.search-bar input');
    if (searchInput) {
        searchInput.addEventListener('keyup', function() {
            const searchValue = this.value.toLowerCase();
            
            bookCards.forEach(card => {
                const title = card.querySelector('h4').textContent.toLowerCase();
                const author = card.querySelector('.book-author').textContent.toLowerCase();
                
                if (title.includes(searchValue) || author.includes(searchValue)) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    }
    
    // "See All" functionality
    const seeAllButtons = document.querySelectorAll('.see-all');
    seeAllButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const sectionTitle = this.parentElement.textContent.replace('See All', '').trim();
            
            // Reset filters and show all books
            filterButtons.forEach(btn => {
                if (btn.getAttribute('data-filter') === 'all') {
                    btn.classList.add('active');
                } else {
                    btn.classList.remove('active');
                }
            });
            
            bookCards.forEach(card => {
                card.style.display = 'block';
            });
            
            // Scroll to the top of the books section
            document.getElementById('books-collection').scrollIntoView({
                behavior: 'smooth'
            });
            
            // Show notification
            showNotification(`Showing all books in ${sectionTitle}`);
        });
    });
    
    // Enhanced add to cart for books
    const addToCartButtons = document.querySelectorAll('.book-actions .add-to-cart');
    addToCartButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const bookCard = this.closest('.book-card');
            const title = bookCard.querySelector('h4').textContent;
            const author = bookCard.querySelector('.book-author').textContent;
            
            const originalText = this.textContent;
            this.textContent = 'Added to Cart!';
            this.style.background = 'var(--accent)';
            
            // Show notification with book details
            showNotification(`Added "${title}" by ${author} to your cart!`);
            
            setTimeout(() => {
                this.textContent = originalText;
                this.style.background = '';
            }, 2000);
        });
    });
    
    // Helper function to show notifications
    function showNotification(message, type = 'success') {
        // Remove existing notification if any
        const existingNotification = document.querySelector('.notification');
        if (existingNotification) {
            existingNotification.remove();
        }
        
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.textContent = message;
        
        // Style the notification
        notification.style.position = 'fixed';
        notification.style.top = '20px';
        notification.style.right = '20px';
        notification.style.padding = '15px 20px';
        notification.style.borderRadius = '5px';
        notification.style.color = 'white';
        notification.style.zIndex = '1000';
        notification.style.boxShadow = '0 4px 12px rgba(0,0,0,0.15)';
        notification.style.opacity = '0';
        notification.style.transform = 'translateX(100px)';
        notification.style.transition = 'all 0.3s ease';
        
        // Set background color based on type
        if (type === 'error') {
            notification.style.background = '#e74c3c';
        } else {
            notification.style.background = 'var(--accent)';
        }
        
        // Add to document
        document.body.appendChild(notification);
        
        // Animate in
        setTimeout(() => {
            notification.style.opacity = '1';
            notification.style.transform = 'translateX(0)';
        }, 10);
        
        // Remove after 3 seconds
        setTimeout(() => {
            notification.style.opacity = '0';
            notification.style.transform = 'translateX(100px)';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 300);
        }, 3000);
    }
});