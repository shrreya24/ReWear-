// Dashboard JavaScript for ReWear Platform

class ReWearDashboard {
    constructor() {
        this.currentUser = null;
        this.userListings = [];
        this.userPurchases = [];
        this.isLoading = false;
        
        // Initialize the dashboard
        this.init();
    }

    // Initialize dashboard
    async init() {
        try {
            this.showLoading();
            
            // Load user data
            await this.loadUserData();
            
            // Load listings
            await this.loadUserListings();
            
            // Load purchases
            await this.loadUserPurchases();
            
            // Setup event listeners
            this.setupEventListeners();
            
            this.hideLoading();
        } catch (error) {
            console.error('Error initializing dashboard:', error);
            this.showError('Failed to load dashboard data');
        }
    }

    // Show loading overlay
    showLoading() {
        const overlay = document.getElementById('loading-overlay');
        if (overlay) {
            overlay.classList.add('active');
        }
    }

    // Hide loading overlay
    hideLoading() {
        const overlay = document.getElementById('loading-overlay');
        if (overlay) {
            overlay.classList.remove('active');
        }
    }

    // Load user data (fake API call)
    async loadUserData() {
        try {
            // Simulate API call
            await this.delay(1000);
            
            // Fake user data
            this.currentUser = {
                id: 1,
                name: 'John Doe',
                email: 'john.doe@example.com',
                joinedDate: '2023-01-15',
                points: 350,
                rating: 4.8,
                avatar: 'https://via.placeholder.com/100x100/4CAF50/FFFFFF?text=JD',
                bio: 'Passionate about sustainable fashion and reducing textile waste.'
            };

            // Update UI with user data
            this.updateUserUI();
        } catch (error) {
            console.error('Error loading user data:', error);
            throw error;
        }
    }

    // Load user listings (fake API call)
    async loadUserListings() {
        try {
            // Simulate API call
            await this.delay(800);
            
            // Fake listings data
            this.userListings = [
                {
                    id: 1,
                    title: 'Vintage Denim Jacket',
                    description: 'Classic blue denim jacket in excellent condition. Perfect for casual wear.',
                    image: 'https://via.placeholder.com/300x200/4CAF50/FFFFFF?text=Denim+Jacket',
                    category: 'Outerwear',
                    size: 'M',
                    condition: 'Excellent',
                    status: 'active',
                    createdAt: '2024-01-20',
                    views: 45,
                    interested: 3
                },
                {
                    id: 2,
                    title: 'Floral Summer Dress',
                    description: 'Beautiful floral pattern dress, worn only once. Perfect for summer occasions.',
                    image: 'https://via.placeholder.com/300x200/D87D4A/FFFFFF?text=Summer+Dress',
                    category: 'Dresses',
                    size: 'S',
                    condition: 'Like New',
                    status: 'pending',
                    createdAt: '2024-01-18',
                    views: 28,
                    interested: 2
                },
                {
                    id: 3,
                    title: 'Leather Boots',
                    description: 'Genuine leather boots in brown. Slightly worn but still in great condition.',
                    image: 'https://via.placeholder.com/300x200/D9CBA3/333333?text=Leather+Boots',
                    category: 'Footwear',
                    size: '9',
                    condition: 'Good',
                    status: 'completed',
                    createdAt: '2024-01-15',
                    views: 62,
                    interested: 5
                },
                {
                    id: 4,
                    title: 'Wool Sweater',
                    description: 'Cozy wool sweater in navy blue. Perfect for cold weather.',
                    image: 'https://via.placeholder.com/300x200/4CAF50/FFFFFF?text=Wool+Sweater',
                    category: 'Tops',
                    size: 'L',
                    condition: 'Very Good',
                    status: 'active',
                    createdAt: '2024-01-22',
                    views: 19,
                    interested: 1
                }
            ];

            // Update listings UI
            this.updateListingsUI();
        } catch (error) {
            console.error('Error loading listings:', error);
            throw error;
        }
    }

    // Load user purchases (fake API call)
    async loadUserPurchases() {
        try {
            // Simulate API call
            await this.delay(600);
            
            // Fake purchases data
            this.userPurchases = [
                {
                    id: 1,
                    itemTitle: 'Designer Handbag',
                    itemImage: 'https://via.placeholder.com/80x80/D87D4A/FFFFFF?text=Bag',
                    seller: 'Sarah Johnson',
                    type: 'swap',
                    swappedItem: 'Vintage Scarf',
                    date: '2024-01-25',
                    status: 'completed'
                },
                {
                    id: 2,
                    itemTitle: 'Running Shoes',
                    itemImage: 'https://via.placeholder.com/80x80/4CAF50/FFFFFF?text=Shoes',
                    seller: 'Mike Chen',
                    type: 'points',
                    pointsSpent: 150,
                    date: '2024-01-20',
                    status: 'completed'
                },
                {
                    id: 3,
                    itemTitle: 'Silk Blouse',
                    itemImage: 'https://via.placeholder.com/80x80/D9CBA3/333333?text=Blouse',
                    seller: 'Emma Wilson',
                    type: 'swap',
                    swappedItem: 'Cotton Cardigan',
                    date: '2024-01-18',
                    status: 'in_progress'
                },
                {
                    id: 4,
                    itemTitle: 'Denim Jeans',
                    itemImage: 'https://via.placeholder.com/80x80/4CAF50/FFFFFF?text=Jeans',
                    seller: 'Alex Rodriguez',
                    type: 'points',
                    pointsSpent: 120,
                    date: '2024-01-15',
                    status: 'completed'
                }
            ];

            // Update purchases UI
            this.updatePurchasesUI();
        } catch (error) {
            console.error('Error loading purchases:', error);
            throw error;
        }
    }

    // Update user UI elements
    updateUserUI() {
        if (!this.currentUser) return;

        // Update header
        const userName = document.getElementById('user-name');
        const userPoints = document.getElementById('user-points');
        const userAvatar = document.getElementById('user-avatar');

        if (userName) userName.textContent = this.currentUser.name;
        if (userPoints) userPoints.textContent = this.currentUser.points;
        if (userAvatar) userAvatar.src = this.currentUser.avatar;

        // Update profile section
        const profileName = document.getElementById('profile-name');
        const profileEmail = document.getElementById('profile-email');
        const profileJoined = document.getElementById('profile-joined');
        const profilePoints = document.getElementById('profile-points');
        const profileRating = document.getElementById('profile-rating');
        const profileAvatar = document.getElementById('profile-avatar');

        if (profileName) profileName.textContent = this.currentUser.name;
        if (profileEmail) profileEmail.textContent = this.currentUser.email;
        if (profileJoined) profileJoined.textContent = new Date(this.currentUser.joinedDate).toLocaleDateString();
        if (profilePoints) profilePoints.textContent = this.currentUser.points;
        if (profileRating) profileRating.textContent = this.currentUser.rating;
        if (profileAvatar) profileAvatar.src = this.currentUser.avatar;

        // Update stats
        const totalListings = document.getElementById('total-listings');
        const totalSwaps = document.getElementById('total-swaps');
        const totalPoints = document.getElementById('total-points');

        if (totalListings) totalListings.textContent = this.userListings.length;
        if (totalSwaps) totalSwaps.textContent = this.userPurchases.filter(p => p.type === 'swap').length;
        if (totalPoints) totalPoints.textContent = this.currentUser.points;
    }

    // Update listings UI
    updateListingsUI() {
        const listingsGrid = document.getElementById('listings-grid');
        if (!listingsGrid) return;

        // Clear loading placeholder
        listingsGrid.innerHTML = '';

        if (this.userListings.length === 0) {
            listingsGrid.innerHTML = `
                <div class="loading-placeholder">
                    <i class="fas fa-tshirt"></i>
                    <p>No listings yet. Start by adding your first item!</p>
                </div>
            `;
            return;
        }

        // Create listing cards
        this.userListings.forEach(listing => {
            const listingCard = this.createListingCard(listing);
            listingsGrid.appendChild(listingCard);
        });
    }

    // Create listing card element
    createListingCard(listing) {
        const card = document.createElement('div');
        card.className = 'listing-card';
        card.innerHTML = `
            <img src="${listing.image}" alt="${listing.title}" class="listing-image">
            <h3 class="listing-title">${listing.title}</h3>
            <p class="listing-description">${listing.description}</p>
            <div class="listing-meta">
                <span class="listing-status status-${listing.status}">${this.formatStatus(listing.status)}</span>
                <div class="listing-actions">
                    <button class="btn btn-secondary btn-small" onclick="dashboard.editListing(${listing.id})">
                        <i class="fas fa-edit"></i> Edit
                    </button>
                    <button class="btn btn-primary btn-small" onclick="dashboard.viewListing(${listing.id})">
                        <i class="fas fa-eye"></i> View
                    </button>
                </div>
            </div>
            <div class="listing-stats" style="margin-top: 1rem; display: flex; justify-content: space-between; color: #666; font-size: 0.9rem;">
                <span><i class="fas fa-eye"></i> ${listing.views} views</span>
                <span><i class="fas fa-heart"></i> ${listing.interested} interested</span>
            </div>
        `;
        return card;
    }

    // Update purchases UI
    updatePurchasesUI() {
        const purchasesList = document.getElementById('purchases-list');
        if (!purchasesList) return;

        // Clear loading placeholder
        purchasesList.innerHTML = '';

        if (this.userPurchases.length === 0) {
            purchasesList.innerHTML = `
                <div class="loading-placeholder">
                    <i class="fas fa-shopping-bag"></i>
                    <p>No purchases yet. Start browsing items to swap or buy!</p>
                </div>
            `;
            return;
        }

        // Create purchase items
        this.userPurchases.forEach(purchase => {
            const purchaseItem = this.createPurchaseItem(purchase);
            purchasesList.appendChild(purchaseItem);
        });
    }

    // Create purchase item element
    createPurchaseItem(purchase) {
        const item = document.createElement('div');
        item.className = 'purchase-item';
        
        const typeInfo = purchase.type === 'swap' 
            ? `Swapped for: ${purchase.swappedItem}`
            : `Points spent: ${purchase.pointsSpent}`;

        item.innerHTML = `
            <div class="purchase-info">
                <img src="${purchase.itemImage}" alt="${purchase.itemTitle}" class="purchase-image">
                <div class="purchase-details">
                    <h4>${purchase.itemTitle}</h4>
                    <p>From: ${purchase.seller}</p>
                    <p>${typeInfo}</p>
                </div>
            </div>
            <div class="purchase-meta">
                <span class="purchase-type type-${purchase.type}">${purchase.type === 'swap' ? 'Swap' : 'Points'}</span>
                <p class="purchase-date">${new Date(purchase.date).toLocaleDateString()}</p>
            </div>
        `;
        return item;
    }

    // Setup event listeners
    setupEventListeners() {
        // Edit profile button
        const editProfileBtn = document.getElementById('edit-profile-btn');
        if (editProfileBtn) {
            editProfileBtn.addEventListener('click', () => this.openEditProfileModal());
        }

        // Add item button
        const addItemBtn = document.getElementById('add-item-btn');
        if (addItemBtn) {
            addItemBtn.addEventListener('click', () => this.redirectToAddItem());
        }

        // Filter listeners
        const listingsFilter = document.getElementById('listings-filter');
        if (listingsFilter) {
            listingsFilter.addEventListener('change', (e) => this.filterListings(e.target.value));
        }

        const purchasesFilter = document.getElementById('purchases-filter');
        if (purchasesFilter) {
            purchasesFilter.addEventListener('change', (e) => this.filterPurchases(e.target.value));
        }

        // Modal listeners
        const closeModal = document.getElementById('close-modal');
        if (closeModal) {
            closeModal.addEventListener('click', () => this.closeEditProfileModal());
        }

        

        const cancelEdit = document.getElementById('cancel-edit');
        if (cancelEdit) {
            cancelEdit.addEventListener('click', () => this.closeEditProfileModal());
        }
        

        // Edit profile form
        const editProfileForm = document.getElementById('edit-profile-form');
        if (editProfileForm) {
            editProfileForm.addEventListener('submit', (e) => this.handleEditProfile(e));
        }

        // Click outside modal to close
        const modal = document.getElementById('edit-profile-modal');
        if (modal) {
            modal.addEventListener('click', (e) => {
                if (e.target === modal) {
                    this.closeEditProfileModal();
                }
            });
        }
    }

    // Open add new item modal
openAddItemModal() {
    // Create modal if it doesn't exist
    let modal = document.getElementById('add-item-modal');
    if (!modal) {
        modal = this.createAddItemModal();
        document.body.appendChild(modal);
    }

    // Reset form
    document.getElementById('add-item-form').reset();

    // Show modal
    modal.classList.add('active');
}

// Create add new item modal
createAddItemModal() {
    const modal = document.createElement('div');
    modal.id = 'add-item-modal';
    modal.className = 'modal';
    modal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <h3>Add New Item</h3>
                <button class="modal-close" onclick="dashboard.closeAddItemModal()">
                    <i class="fas fa-times"></i>
                </button>
            </div>
            <div class="modal-body">
                <form id="add-item-form">
                    <div class="form-group">
                        <label for="add-item-title">Title *</label>
                        <input type="text" id="add-item-title" name="title" required placeholder="Enter item title">
                    </div>
                    <div class="form-group">
                        <label for="add-item-description">Description *</label>
                        <textarea id="add-item-description" name="description" rows="3" required placeholder="Describe your item"></textarea>
                    </div>
                    <div class="form-group">
                        <label for="add-item-category">Category *</label>
                        <select id="add-item-category" name="category" required>
                            <option value="">Select category</option>
                            <option value="Tops">Tops</option>
                            <option value="Bottoms">Bottoms</option>
                            <option value="Outerwear">Outerwear</option>
                            <option value="Dresses">Dresses</option>
                            <option value="Footwear">Footwear</option>
                            <option value="Accessories">Accessories</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label for="add-item-size">Size *</label>
                        <select id="add-item-size" name="size" required>
                            <option value="">Select size</option>
                            <option value="XS">XS</option>
                            <option value="S">S</option>
                            <option value="M">M</option>
                            <option value="L">L</option>
                            <option value="XL">XL</option>
                            <option value="XXL">XXL</option>
                            <option value="6">6</option>
                            <option value="7">7</option>
                            <option value="8">8</option>
                            <option value="9">9</option>
                            <option value="10">10</option>
                            <option value="11">11</option>
                            <option value="12">12</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label for="add-item-condition">Condition *</label>
                        <select id="add-item-condition" name="condition" required>
                            <option value="">Select condition</option>
                            <option value="Like New">Like New</option>
                            <option value="Excellent">Excellent</option>
                            <option value="Very Good">Very Good</option>
                            <option value="Good">Good</option>
                            <option value="Fair">Fair</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label for="add-item-image">Image URL (optional)</label>
                        <input type="url" id="add-item-image" name="image" placeholder="Enter image URL">
                    </div>
                    <div class="form-actions">
                        <button type="button" class="btn btn-secondary" onclick="dashboard.closeAddItemModal()">Cancel</button>
                        <button type="submit" class="btn btn-primary">Add Item</button>
                    </div>
                </form>
            </div>
        </div>
    `;

    // Add event listener for form submission
    modal.querySelector('#add-item-form').addEventListener('submit', (e) => {
        e.preventDefault();
        this.handleAddItem(e);
    });

    // Close modal when clicking outside
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            this.closeAddItemModal();
        }
    });

    return modal;
}

// Close add item modal
closeAddItemModal() {
    const modal = document.getElementById('add-item-modal');
    if (modal) {
        modal.classList.remove('active');
    }
}

// Handle add item form submission
async handleAddItem(e) {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const newItem = {
        id: Date.now(), // Generate unique ID
        title: formData.get('title'),
        description: formData.get('description'),
        category: formData.get('category'),
        size: formData.get('size'),
        condition: formData.get('condition'),
        image: formData.get('image') || 'https://via.placeholder.com/300x200/4CAF50/FFFFFF?text=New+Item',
        status: 'active',
        createdAt: new Date().toISOString().split('T')[0],
        views: 0,
        interested: 0
    };

    try {
        this.showLoading();
        
        // Simulate API call
        await this.delay(1000);
        
        // Add to listings array
        this.userListings.unshift(newItem); // Add at beginning
        
        // Update UI
        this.updateListingsUI();
        this.updateUserUI(); // Update stats
        
        // Close modal
        this.closeAddItemModal();
        
        // Show success message
        this.showNotification('Item added successfully!', 'success');
        
    } catch (error) {
        console.error('Error adding item:', error);
        this.showError('Failed to add item');
    } finally {
        this.hideLoading();
    }
}

// Open view listing modal
openViewListingModal(listing) {
    // Create modal if it doesn't exist
    let modal = document.getElementById('view-listing-modal');
    if (!modal) {
        modal = this.createViewListingModal();
        document.body.appendChild(modal);
    }

    // Update modal content with listing data
    this.updateViewListingContent(listing);

    // Show modal
    modal.classList.add('active');
}

// Create view listing modal
createViewListingModal() {
    const modal = document.createElement('div');
    modal.id = 'view-listing-modal';
    modal.className = 'modal';
    modal.innerHTML = `
        <div class="modal-content modal-large">
            <div class="modal-header">
                <h3 id="view-listing-title">View Listing</h3>
                <button class="modal-close" onclick="dashboard.closeViewListingModal()">
                    <i class="fas fa-times"></i>
                </button>
            </div>
            <div class="modal-body">
                <div class="listing-view-content">
                    <div class="listing-view-image">
                        <img id="view-listing-img" src="" alt="Listing Image" style="width: 100%; max-width: 400px; height: 300px; object-fit: cover; border-radius: 8px;">
                    </div>
                    <div class="listing-view-details">
                        <div class="listing-info-grid">
                            <div class="info-item">
                                <label><strong>Category:</strong></label>
                                <span id="view-listing-category"></span>
                            </div>
                            <div class="info-item">
                                <label><strong>Size:</strong></label>
                                <span id="view-listing-size"></span>
                            </div>
                            <div class="info-item">
                                <label><strong>Condition:</strong></label>
                                <span id="view-listing-condition"></span>
                            </div>
                            <div class="info-item">
                                <label><strong>Status:</strong></label>
                                <span id="view-listing-status" class="status-badge"></span>
                            </div>
                            <div class="info-item">
                                <label><strong>Created:</strong></label>
                                <span id="view-listing-date"></span>
                            </div>
                            <div class="info-item">
                                <label><strong>Views:</strong></label>
                                <span id="view-listing-views"></span>
                            </div>
                            <div class="info-item">
                                <label><strong>Interested:</strong></label>
                                <span id="view-listing-interested"></span>
                            </div>
                        </div>
                        <div class="listing-description-section">
                            <label><strong>Description:</strong></label>
                            <p id="view-listing-description"></p>
                        </div>
                    </div>
                </div>
                <div class="listing-actions-section">
                    <button id="edit-from-view-btn" class="btn btn-secondary">
                        <i class="fas fa-edit"></i> Edit Listing
                    </button>
                    <button id="delete-listing-btn" class="btn btn-danger">
                        <i class="fas fa-trash"></i> Delete Listing
                    </button>
                    <button class="btn btn-primary" onclick="dashboard.closeViewListingModal()">
                        <i class="fas fa-times"></i> Close
                    </button>
                </div>
            </div>
        </div>
    `;
  const additionalStyles = `
    .modal-large .modal-content {
        max-width: 900px;
        width: 95%;
        max-height: 90vh;
        overflow: auto;
    }

    .listing-view-content {
        display: flex;
        align-items: flex-start;
        gap: 2rem;
        margin-bottom: 1rem;
        flex-wrap: wrap;
    }

    .listing-view-image {
        flex: 1 1 300px;
        max-width: 400px;
    }

    .listing-view-image img {
        width: 100%;
        height: auto;
        display: block;
        border-radius: 8px;
        object-fit: cover;
    }

    .listing-view-details {
        flex: 2 1 300px;
    }

    .listing-info-grid {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 0.8rem 1.2rem;
        margin-bottom: 1rem;
    }

    .info-item {
        display: flex;
        flex-direction: column;
        gap: 0.2rem;
    }

    .info-item label {
        font-size: 0.85rem;
        color: #666;
    }

    .info-item span {
        font-size: 1rem;
        color: #333;
        font-weight: 500;
    }

    .status-badge {
        padding: 0.25rem 0.75rem;
        border-radius: 20px;
        font-size: 0.75rem;
        font-weight: 500;
        text-transform: uppercase;
        display: inline-block;
        width: fit-content;
    }

    .status-active {
        background-color: #e8f5e8;
        color: #2e7d32;
    }

    .status-pending {
        background-color: #fff3e0;
        color: #f57c00;
    }

    .status-completed {
        background-color: #e3f2fd;
        color: #1976d2;
    }

    .listing-description-section {
        margin-top: 1rem;
        padding-top: 1rem;
        border-top: 1px solid #eee;
    }

    .listing-description-section p {
        margin-top: 0.5rem;
        line-height: 1.5;
        color: #555;
    }

    .listing-actions-section {
        display: flex;
        gap: 0.8rem;
        justify-content: flex-end;
        padding-top: 1rem;
        border-top: 1px solid #eee;
        flex-wrap: wrap;
    }

    .btn-danger {
        background-color: #f44336;
        color: white;
        border: none;
        padding: 0.5rem 1rem;
        border-radius: 4px;
        cursor: pointer;
        font-size: 0.9rem;
        transition: background-color 0.3s;
    }

    .btn-danger:hover {
        background-color: #d32f2f;
    }

    @media (max-width: 768px) {
        .listing-view-content {
            flex-direction: column;
        }

        .listing-view-image,
        .listing-view-details {
            max-width: 100%;
        }

        .listing-info-grid {
            grid-template-columns: 1fr;
        }

        .listing-actions-section {
            flex-direction: column;
            align-items: stretch;
        }
    }
`;

// Add the additional styles to your existing style element
style.textContent += additionalStyles;

    // Add event listeners
    modal.querySelector('#edit-from-view-btn').addEventListener('click', () => {
        const listingId = parseInt(modal.dataset.listingId);
        this.closeViewListingModal();
        this.editListing(listingId);
    });

    modal.querySelector('#delete-listing-btn').addEventListener('click', () => {
        const listingId = parseInt(modal.dataset.listingId);
        this.confirmDeleteListing(listingId);
    });

    // Close modal when clicking outside
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            this.closeViewListingModal();
        }
    });

    return modal;
}

// Update view listing modal content
updateViewListingContent(listing) {
    const modal = document.getElementById('view-listing-modal');
    modal.dataset.listingId = listing.id;

    // Update content
    document.getElementById('view-listing-title').textContent = listing.title;
    document.getElementById('view-listing-img').src = listing.image;
    document.getElementById('view-listing-img').alt = listing.title;
    document.getElementById('view-listing-category').textContent = listing.category;
    document.getElementById('view-listing-size').textContent = listing.size;
    document.getElementById('view-listing-condition').textContent = listing.condition;
    document.getElementById('view-listing-date').textContent = new Date(listing.createdAt).toLocaleDateString();
    document.getElementById('view-listing-views').textContent = listing.views;
    document.getElementById('view-listing-interested').textContent = listing.interested;
    document.getElementById('view-listing-description').textContent = listing.description;

    // Update status with styling
    const statusElement = document.getElementById('view-listing-status');
    statusElement.textContent = this.formatStatus(listing.status);
    statusElement.className = `status-badge status-${listing.status}`;
}

// Close view listing modal
closeViewListingModal() {
    const modal = document.getElementById('view-listing-modal');
    if (modal) {
        modal.classList.remove('active');
    }
}

// Confirm delete listing
confirmDeleteListing(listingId) {
    const listing = this.userListings.find(l => l.id === listingId);
    if (listing && confirm(`Are you sure you want to delete "${listing.title}"? This action cannot be undone.`)) {
        this.deleteListing(listingId);
    }
}

// Delete listing
async deleteListing(listingId) {
    try {
        this.showLoading();
        
        // Simulate API call
        await this.delay(1000);
        
        // Remove from listings array
        this.userListings = this.userListings.filter(l => l.id !== listingId);
        
        // Update UI
        this.updateListingsUI();
        this.updateUserUI(); // Update stats
        
        // Close modal
        this.closeViewListingModal();
        
        // Show success message
        this.showNotification('Listing deleted successfully!', 'success');
        
    } catch (error) {
        console.error('Error deleting listing:', error);
        this.showError('Failed to delete listing');
    } finally {
        this.hideLoading();
    }
}

    // Open edit profile modal
    openEditProfileModal() {
        const modal = document.getElementById('edit-profile-modal');
        if (modal && this.currentUser) {
            // Pre-fill form with current user data
            const nameInput = document.getElementById('edit-name');
            const emailInput = document.getElementById('edit-email');
            const bioInput = document.getElementById('edit-bio');

            if (nameInput) nameInput.value = this.currentUser.name;
            if (emailInput) emailInput.value = this.currentUser.email;
            if (bioInput) bioInput.value = this.currentUser.bio || '';

            modal.classList.add('active');
        }
    }

    // Close edit profile modal
    closeEditProfileModal() {
        const modal = document.getElementById('edit-profile-modal');
        if (modal) {
            modal.classList.remove('active');
        }
    }

    // Handle edit profile form submission
    async handleEditProfile(e) {
        e.preventDefault();
        
        const formData = new FormData(e.target);
        const updatedData = {
            name: formData.get('name'),
            email: formData.get('email'),
            bio: formData.get('bio')
        };

        try {
            this.showLoading();
            
            // Simulate API call
            await this.delay(1000);
            
            // Update user data
            this.currentUser = { ...this.currentUser, ...updatedData };
            
            // Update UI
            this.updateUserUI();
            
            // Close modal
            this.closeEditProfileModal();
            
            // Show success message
            this.showNotification('Profile updated successfully!', 'success');
            
        } catch (error) {
            console.error('Error updating profile:', error);
            this.showError('Failed to update profile');
        } finally {
            this.hideLoading();
        }
    }

    // Filter listings
    filterListings(filter) {
        const listingsGrid = document.getElementById('listings-grid');
        if (!listingsGrid) return;

        let filteredListings = this.userListings;
        
        if (filter !== 'all') {
            filteredListings = this.userListings.filter(listing => listing.status === filter);
        }

        // Clear and rebuild grid
        listingsGrid.innerHTML = '';
        
        if (filteredListings.length === 0) {
            listingsGrid.innerHTML = `
                <div class="loading-placeholder">
                    <i class="fas fa-filter"></i>
                    <p>No items match the selected filter.</p>
                </div>
            `;
            return;
        }

        filteredListings.forEach(listing => {
            const listingCard = this.createListingCard(listing);
            listingsGrid.appendChild(listingCard);
        });
    }

    // Filter purchases
    filterPurchases(filter) {
        const purchasesList = document.getElementById('purchases-list');
        if (!purchasesList) return;

        let filteredPurchases = this.userPurchases;
        
        if (filter !== 'all') {
            // Map filter values to match data structure
            const filterMap = {
                'swaps': 'swap',
                'points': 'points'
            };
            const actualFilter = filterMap[filter] || filter;
            filteredPurchases = this.userPurchases.filter(purchase => purchase.type === actualFilter);
        }

        // Clear and rebuild list
        purchasesList.innerHTML = '';
        
        if (filteredPurchases.length === 0) {
            purchasesList.innerHTML = `
                <div class="loading-placeholder">
                    <i class="fas fa-filter"></i>
                    <p>No transactions match the selected filter.</p>
                </div>
            `;
            return;
        }

        filteredPurchases.forEach(purchase => {
            const purchaseItem = this.createPurchaseItem(purchase);
            purchasesList.appendChild(purchaseItem);
        });
    }

    // Edit listing
    editListing(listingId) {
        console.log('Edit listing:', listingId);
        const listing = this.userListings.find(l => l.id === listingId);
        if (listing) {
            this.openEditListingModal(listing);
        }
    }

    // Open edit listing modal
    openEditListingModal(listing) {
        // Create modal if it doesn't exist
        let modal = document.getElementById('edit-listing-modal');
        if (!modal) {
            modal = this.createEditListingModal();
            document.body.appendChild(modal);
        }

        // Pre-fill form with listing data
        document.getElementById('edit-listing-title').value = listing.title;
        document.getElementById('edit-listing-description').value = listing.description;
        document.getElementById('edit-listing-category').value = listing.category;
        document.getElementById('edit-listing-size').value = listing.size;
        document.getElementById('edit-listing-condition').value = listing.condition;

        // Store current listing ID
        modal.dataset.listingId = listing.id;

        // Show modal
        modal.classList.add('active');
    }

    // Create edit listing modal
    createEditListingModal() {
        const modal = document.createElement('div');
        modal.id = 'edit-listing-modal';
        modal.className = 'modal';
        modal.innerHTML = `
            <div class="modal-content">
                <div class="modal-header">
                    <h3>Edit Listing</h3>
                    <button class="modal-close" onclick="dashboard.closeEditListingModal()">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                <div class="modal-body">
                    <form id="edit-listing-form">
                        <div class="form-group">
                            <label for="edit-listing-title">Title</label>
                            <input type="text" id="edit-listing-title" name="title" required>
                        </div>
                        <div class="form-group">
                            <label for="edit-listing-description">Description</label>
                            <textarea id="edit-listing-description" name="description" rows="3" required></textarea>
                        </div>
                        <div class="form-group">
                            <label for="edit-listing-category">Category</label>
                            <select id="edit-listing-category" name="category" required>
                                <option value="Tops">Tops</option>
                                <option value="Bottoms">Bottoms</option>
                                <option value="Outerwear">Outerwear</option>
                                <option value="Dresses">Dresses</option>
                                <option value="Footwear">Footwear</option>
                                <option value="Accessories">Accessories</option>
                            </select>
                        </div>
                        <div class="form-group">
                            <label for="edit-listing-size">Size</label>
                            <select id="edit-listing-size" name="size" required>
                                <option value="XS">XS</option>
                                <option value="S">S</option>
                                <option value="M">M</option>
                                <option value="L">L</option>
                                <option value="XL">XL</option>
                                <option value="XXL">XXL</option>
                                <option value="6">6</option>
                                <option value="7">7</option>
                                <option value="8">8</option>
                                <option value="9">9</option>
                                <option value="10">10</option>
                                <option value="11">11</option>
                                <option value="12">12</option>
                            </select>
                        </div>
                        <div class="form-group">
                            <label for="edit-listing-condition">Condition</label>
                            <select id="edit-listing-condition" name="condition" required>
                                <option value="Like New">Like New</option>
                                <option value="Excellent">Excellent</option>
                                <option value="Very Good">Very Good</option>
                                <option value="Good">Good</option>
                                <option value="Fair">Fair</option>
                            </select>
                        </div>
                        <div class="form-actions">
                            <button type="button" class="btn btn-secondary" onclick="dashboard.closeEditListingModal()">Cancel</button>
                            <button type="submit" class="btn btn-primary">Save Changes</button>
                        </div>
                    </form>
                </div>
            </div>
        `;

        // Add event listener for form submission
        modal.querySelector('#edit-listing-form').addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleEditListing(e);
        });

        // Close modal when clicking outside
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                this.closeEditListingModal();
            }
        });

        return modal;
    }

    // Close edit listing modal
    closeEditListingModal() {
        const modal = document.getElementById('edit-listing-modal');
        if (modal) {
            modal.classList.remove('active');
        }
    }

    // Handle edit listing form submission
    async handleEditListing(e) {
        e.preventDefault();
        
        const modal = document.getElementById('edit-listing-modal');
        const listingId = parseInt(modal.dataset.listingId);
        
        const formData = new FormData(e.target);
        const updatedData = {
            title: formData.get('title'),
            description: formData.get('description'),
            category: formData.get('category'),
            size: formData.get('size'),
            condition: formData.get('condition')
        };

        try {
            this.showLoading();
            
            // Simulate API call
            await this.delay(1000);
            
            // Update listing in local data
            const listingIndex = this.userListings.findIndex(l => l.id === listingId);
            if (listingIndex !== -1) {
                this.userListings[listingIndex] = { ...this.userListings[listingIndex], ...updatedData };
            }
            
            // Update UI
            this.updateListingsUI();
            
            // Close modal
            this.closeEditListingModal();
            
            // Show success message
            this.showNotification('Listing updated successfully!', 'success');
            
        } catch (error) {
            console.error('Error updating listing:', error);
            this.showError('Failed to update listing');
        } finally {
            this.hideLoading();
        }
    }

    // View listing
    viewListing(listingId) {
    console.log('View listing:', listingId);
    const listing = this.userListings.find(l => l.id === listingId);
    if (listing) {
        this.openViewListingModal(listing);
    }
}

    // Redirect to add item page
    redirectToAddItem() {
    this.openAddItemModal();
}
    // Format status text
    formatStatus(status) {
        const statusMap = {
            active: 'Active',
            pending: 'Pending',
            completed: 'Completed'
        };
        return statusMap[status] || status;
    }

    // Show notification
    showNotification(message, type = 'info') {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: ${type === 'success' ? '#4CAF50' : type === 'error' ? '#f44336' : '#2196F3'};
            color: white;
            padding: 1rem 2rem;
            border-radius: 5px;
            z-index: 10000;
            animation: slideIn 0.3s ease;
        `;
        notification.textContent = message;

        // Add to page
        document.body.appendChild(notification);

        // Remove after 3 seconds
        setTimeout(() => {
            notification.style.animation = 'slideOut 0.3s ease';
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 3000);
    }

    // Show error message
    showError(message) {
        this.showNotification(message, 'error');
    }

    // Utility function to simulate API delay
    delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
}

// Initialize dashboard when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.dashboard = new ReWearDashboard();
});

// Add CSS animations for notifications
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    
    @keyframes slideOut {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(100%); opacity: 0; }
    }
`;
document.head.appendChild(style);