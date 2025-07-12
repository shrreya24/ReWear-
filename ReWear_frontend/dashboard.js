 // DOM Elements
        const editProfileBtn = document.getElementById('edit-profile-btn');
        const editProfileModal = document.getElementById('edit-profile-modal');
        const closeModal = document.getElementById('close-modal');
        const cancelEdit = document.getElementById('cancel-edit');
        const addItemBtn = document.getElementById('add-item-btn');
        const addItemModal = document.getElementById('add-item-modal');
        const closeAddModal = document.getElementById('close-add-modal');
        const cancelAdd = document.getElementById('cancel-add');
        const navAddItem = document.getElementById('nav-add-item');
        const listingsFilter = document.getElementById('listings-filter');
        const purchasesFilter = document.getElementById('purchases-filter');
        const notification = document.getElementById('notification');
        const notificationMessage = document.getElementById('notification-message');
        const userPoints = document.getElementById('user-points');
        const profilePoints = document.getElementById('profile-points');
        const totalPoints = document.getElementById('total-points');
        const totalListings = document.getElementById('total-listings');
        
        // Swap requests
        const acceptButtons = document.querySelectorAll('.btn-accept');
        const declineButtons = document.querySelectorAll('.btn-decline');
        
        // Demo data
        let points = 1250;
        let listings = 8;
        
        // Show notification
        function showNotification(message, type = 'success') {
            notificationMessage.textContent = message;
            notification.className = 'notification show ' + type;
            setTimeout(() => {
                notification.className = 'notification';
            }, 3000);
        }
        
        // Update points display
        function updatePointsDisplay() {
            userPoints.textContent = points.toLocaleString();
            profilePoints.textContent = points.toLocaleString();
            totalPoints.textContent = points.toLocaleString();
        }
        
        // Update listings count
        function updateListingsCount() {
            totalListings.textContent = listings;
        }
        
        // Handle swap request actions
        function handleSwapAction(action, requestId) {
            const requestCard = document.getElementById(`request-${requestId}`);
            
            // Simulate loading
            const loadingOverlay = document.getElementById('loading-overlay');
            loadingOverlay.classList.add('active');
            
            setTimeout(() => {
                loadingOverlay.classList.remove('active');
                
                if (action === 'accept') {
                    // Add points for accepted swap
                    points += 120;
                    updatePointsDisplay();
                    showNotification('Swap request accepted! +120 points added', 'success');
                } else {
                    showNotification('Swap request declined', 'error');
                }
                
                // Remove the request card with animation
                requestCard.style.opacity = '0';
                requestCard.style.transform = 'translateX(50px)';
                setTimeout(() => {
                    requestCard.remove();
                }, 300);
            }, 1000);
        }
        
        // Filter listings
        function filterListings() {
            const filterValue = listingsFilter.value;
            const listingCards = document.querySelectorAll('.listing-card');
            
            listingCards.forEach(card => {
                if (filterValue === 'all' || card.dataset.status === filterValue) {
                    card.style.display = 'block';
                    setTimeout(() => {
                        card.style.opacity = '1';
                    }, 10);
                } else {
                    card.style.opacity = '0';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 300);
                }
            });
        }
        
        // Filter purchases
        function filterPurchases() {
            const filterValue = purchasesFilter.value;
            const transactionCards = document.querySelectorAll('.transaction-card');
            
            transactionCards.forEach(card => {
                if (filterValue === 'all' || card.dataset.type === filterValue) {
                    card.style.display = 'flex';
                    setTimeout(() => {
                        card.style.opacity = '1';
                    }, 10);
                } else {
                    card.style.opacity = '0';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 300);
                }
            });
        }
        
        // Add new item
        function addNewItem() {
            const itemName = document.getElementById('item-name').value;
            const itemPoints = parseInt(document.getElementById('item-points').value);
            
            // Simulate loading
            const loadingOverlay = document.getElementById('loading-overlay');
            loadingOverlay.classList.add('active');
            
            setTimeout(() => {
                loadingOverlay.classList.remove('active');
                
                // Update points and listings count
                points += 50; // Bonus points for listing
                listings += 1;
                updatePointsDisplay();
                updateListingsCount();
                
                // Show success notification
                showNotification(`"${itemName}" added successfully! +50 bonus points`, 'success');
                
                // Close modal
                addItemModal.classList.remove('active');
                
                // Reset form
                document.getElementById('add-item-form').reset();
            }, 1500);
        }
        
        // Event Listeners
        document.addEventListener('DOMContentLoaded', function() {
            // Edit profile modal
            editProfileBtn.addEventListener('click', () => {
                editProfileModal.classList.add('active');
            });
            
            closeModal.addEventListener('click', () => {
                editProfileModal.classList.remove('active');
            });
            
            cancelEdit.addEventListener('click', () => {
                editProfileModal.classList.remove('active');
            });
            
            // Add item modal
            addItemBtn.addEventListener('click', () => {
                addItemModal.classList.add('active');
            });
            
            navAddItem.addEventListener('click', (e) => {
                e.preventDefault();
                addItemModal.classList.add('active');
            });
            
            closeAddModal.addEventListener('click', () => {
                addItemModal.classList.remove('active');
            });
            
            cancelAdd.addEventListener('click', () => {
                addItemModal.classList.remove('active');
            });
            
            // Form submissions
            document.getElementById('edit-profile-form').addEventListener('submit', function(e) {
                e.preventDefault();
                showNotification('Profile updated successfully!', 'success');
                editProfileModal.classList.remove('active');
            });
            
            document.getElementById('add-item-form').addEventListener('submit', function(e) {
                e.preventDefault();
                addNewItem();
            });
            
            // Swap request actions
            acceptButtons.forEach(btn => {
                btn.addEventListener('click', () => {
                    const requestId = btn.dataset.request;
                    handleSwapAction('accept', requestId);
                });
            });
            
            declineButtons.forEach(btn => {
                btn.addEventListener('click', () => {
                    const requestId = btn.dataset.request;
                    handleSwapAction('decline', requestId);
                });
            });
            
            // Filter events
            listingsFilter.addEventListener('change', filterListings);
            purchasesFilter.addEventListener('change', filterPurchases);
            
            // Loading overlay simulation
            setTimeout(() => {
                document.getElementById('loading-overlay').classList.remove('active');
            }, 1500);
        });
