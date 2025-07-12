
class APIService {
    constructor() {
        // Set to false when you want to use real API
        this.USE_FAKE_API = true;
        
        // Real API base URL - change this to your actual API
        this.BASE_URL = 'http://localhost:5000/api';
        
        // Initialize fake database if using fake API
        if (this.USE_FAKE_API) {
            this.fakeDB = new FakeDatabase();
        }
    }

    // Generic request method for real API
    async makeRequest(endpoint, options = {}) {
        if (this.USE_FAKE_API) {
            // Route to fake API methods
            return this.handleFakeRequest(endpoint, options);
        }

        // Real API request
        const url = `${this.BASE_URL}${endpoint}`;
        const config = {
            headers: {
                'Content-Type': 'application/json',
                // Add your auth headers here
                // 'Authorization': `Bearer ${this.getAuthToken()}`
            },
            ...options
        };

        try {
            const response = await fetch(url, config);
            
            if (!response.ok) {
                throw new Error(`API Error: ${response.status} ${response.statusText}`);
            }
            
            return await response.json();
        } catch (error) {
            console.error('API Request failed:', error);
            throw error;
        }
    }

    // Handle fake API requests
    async handleFakeRequest(endpoint, options) {
        // Simulate network delay
        await this.delay(800);
        
        const method = options.method || 'GET';
        const body = options.body ? JSON.parse(options.body) : null;
        
        // Route fake requests
        switch (endpoint) {
            case '/user/profile':
                return this.fakeDB.getUser(1);
            
            case '/user/listings':
                return this.fakeDB.getUserListings(1);
            
            case '/user/purchases':
                return this.fakeDB.getUserPurchases(1);
            
            case '/listings':
                if (method === 'POST') {
                    return this.fakeDB.createListing(body);
                }
                break;
            
            case '/user/profile/update':
                if (method === 'PUT') {
                    return this.fakeDB.updateUser(1, body);
                }
            case '/swap/incoming':
    return this.fakeDB.getSwapRequests(1);

case '/swap/respond':
    if (method === 'POST') {
        return this.fakeDB.respondToSwapRequest(body.requestId, body.decision);
    }
                break;
            
            default:
                // Handle dynamic endpoints like /listings/123
                if (endpoint.startsWith('/listings/')) {
                    const listingId = parseInt(endpoint.split('/')[2]);
                    if (method === 'PUT') {
                        return this.fakeDB.updateListing(listingId, body);
                    } else if (method === 'DELETE') {
                        return this.fakeDB.deleteListing(listingId);
                    } else if (method === 'GET') {
                        return this.fakeDB.getListing(listingId);
                    }
                }
                break;
        }
        
        throw new Error(`Fake API: Endpoint ${endpoint} not found`);
    }

    // User API methods
    async getUserProfile() {
        return this.makeRequest('/user/profile');
    }

    async updateUserProfile(userData) {
        return this.makeRequest('/user/profile/update', {
            method: 'PUT',
            body: JSON.stringify(userData)
        });
    }

    async getUserListings() {
        return this.makeRequest('/user/listings');
    }

    async getUserPurchases() {
        return this.makeRequest('/user/purchases');
    }

    // Listing API methods
    // Swap API methods
async getSwapRequests() {
    return this.makeRequest('/swap/incoming');
}

async respondToSwapRequest(requestId, decision) {
    return this.makeRequest('/swap/respond', {
        method: 'POST',
        body: JSON.stringify({ requestId, decision })
    });
}
    async createListing(listingData) {
        return this.makeRequest('/listings', {
            method: 'POST',
            body: JSON.stringify(listingData)
        });
    }

    async updateListing(listingId, listingData) {
        return this.makeRequest(`/listings/${listingId}`, {
            method: 'PUT',
            body: JSON.stringify(listingData)
        });
    }

    async deleteListing(listingId) {
        return this.makeRequest(`/listings/${listingId}`, {
            method: 'DELETE'
        });
    }

    async getListing(listingId) {
        return this.makeRequest(`/listings/${listingId}`);
    }

    // Utility methods
    delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    // Get auth token (implement based on your auth system)
    getAuthToken() {
    return localStorage.getItem('userToken') || 'fake-jwt-token';
}
}

// ===========================================
// FAKE DATABASE CLASS - Remove when using real API
// ===========================================

class FakeDatabase {
    constructor() {
        this.initializeDatabase();
    }

    initializeDatabase() {
        if (!localStorage.getItem('rewear_database_initialized')) {
            const initialData = {
                users: [
                    {
                        id: 1,
                        name: 'John Doe',
                        email: 'john.doe@example.com',
                        joinedDate: '2023-01-15',
                        points: 350,
                        rating: 4.8,
                        avatar: 'https://via.placeholder.com/100x100/4CAF50/FFFFFF?text=JD',
                        bio: 'Passionate about sustainable fashion and reducing textile waste.'
                    }
                ],
                listings: [
                    {
                        id: 1,
                        userId: 1,
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
                        userId: 1,
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
                        userId: 1,
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
                        userId: 1,
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
                ],
                swapRequests: [
    {
        _id: 1,
        requesterId: { fullName: 'Sarah Johnson', email: 'sarah@example.com' },
        itemId: { title: 'Designer Handbag' },
        status: 'pending'
    }
],
                purchases: [
                    {
                        id: 1,
                        userId: 1,
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
                        userId: 1,
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
                        userId: 1,
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
                        userId: 1,
                        itemTitle: 'Denim Jeans',
                        itemImage: 'https://via.placeholder.com/80x80/4CAF50/FFFFFF?text=Jeans',
                        seller: 'Alex Rodriguez',
                        type: 'points',
                        pointsSpent: 120,
                        date: '2024-01-15',
                        status: 'completed'
                    }
                ],
                nextId: 5
            };

            localStorage.setItem('rewear_database', JSON.stringify(initialData));
            localStorage.setItem('rewear_database_initialized', 'true');
        }
    }

    getData() {
        return JSON.parse(localStorage.getItem('rewear_database') || '{}');
    }

    saveData(data) {
        localStorage.setItem('rewear_database', JSON.stringify(data));
    }

    // User methods
    getUser(userId) {
        const data = this.getData();
        return data.users.find(user => user.id === userId);
    }

    updateUser(userId, userData) {
        const data = this.getData();
        const userIndex = data.users.findIndex(user => user.id === userId);
        if (userIndex !== -1) {
            data.users[userIndex] = { ...data.users[userIndex], ...userData };
            this.saveData(data);
            return data.users[userIndex];
        }
        throw new Error('User not found');
    }
    getSwapRequests(userId) {
    const data = this.getData();
    return data.swapRequests || [];
}

respondToSwapRequest(requestId, decision) {
    const data = this.getData();
    const requestIndex = data.swapRequests.findIndex(req => req._id === requestId);
    if (requestIndex !== -1) {
        data.swapRequests[requestIndex].status = decision;
        this.saveData(data);
        return { message: `Request ${decision} successfully` };
    }
    throw new Error('Request not found');
}

    // Listing methods
    getUserListings(userId) {
        const data = this.getData();
        return data.listings.filter(listing => listing.userId === userId);
    }

    getListing(listingId) {
        const data = this.getData();
        return data.listings.find(listing => listing.id === listingId);
    }

    createListing(listingData) {
        const data = this.getData();
        const newListing = {
            id: data.nextId++,
            userId: 1, // Current user ID
            ...listingData,
            createdAt: new Date().toISOString().split('T')[0],
            views: 0,
            interested: 0
        };
        
        data.listings.unshift(newListing);
        this.saveData(data);
        return newListing;
    }

    updateListing(listingId, listingData) {
        const data = this.getData();
        const listingIndex = data.listings.findIndex(listing => listing.id === listingId);
        if (listingIndex !== -1) {
            data.listings[listingIndex] = { ...data.listings[listingIndex], ...listingData };
            this.saveData(data);
            return data.listings[listingIndex];
        }
        throw new Error('Listing not found');
    }

    deleteListing(listingId) {
        const data = this.getData();
        const listingIndex = data.listings.findIndex(listing => listing.id === listingId);
        if (listingIndex !== -1) {
            const deletedListing = data.listings.splice(listingIndex, 1)[0];
            this.saveData(data);
            return { message: 'Listing deleted successfully', listing: deletedListing };
        }
        throw new Error('Listing not found');
    }

    // Purchase methods
    getUserPurchases(userId) {
        const data = this.getData();
        return data.purchases.filter(purchase => purchase.userId === userId);
    }
}

// ===========================================
// MAIN DASHBOARD CLASS
// ===========================================

class ReWearDashboard {
    constructor() {
        this.currentUser = null;
        this.userListings = [];
        this.userPurchases = [];
        this.isLoading = false;
        this.swapRequests = [];
        
        // Initialize API service
        this.api = new APIService();
        
        // Initialize the dashboard
        this.init();
    }

    // Initialize dashboard
    async init() {
        try {
            this.showLoading();
            
            // Load user data via API
            await this.loadUserData();
            
            // Load listings via API
            await this.loadUserListings();
            
            // Load purchases via API
            await this.loadUserPurchases();
            await this.loadSwapRequests();
            
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

    // Load user data via API
    async loadUserData() {
        try {
            this.currentUser = await this.api.getUserProfile();
            this.updateUserUI();
        } catch (error) {
            console.error('Error loading user data:', error);
            throw error;
        }
    }

    // Load user listings via API
    async loadUserListings() {
        try {
            this.userListings = await this.api.getUserListings();
            this.updateListingsUI();
        } catch (error) {
            console.error('Error loading listings:', error);
            throw error;
        }
    }

    // Load user purchases via API
    async loadUserPurchases() {
        try {
            this.userPurchases = await this.api.getUserPurchases();
            this.updatePurchasesUI();
        } catch (error) {
            console.error('Error loading purchases:', error);
            throw error;
        }
    }
    async loadSwapRequests() {
    try {
        this.swapRequests = await this.api.getSwapRequests();
        this.renderSwapRequests();
    } catch (error) {
        console.error('Error loading swap requests:', error);
        const container = document.getElementById('swap-requests-list');
        if (container) {
            container.innerHTML = '<p>❌ Could not load requests</p>';
        }
    }
}

renderSwapRequests() {
    const container = document.getElementById('swap-requests-list');
    if (!container) return;
    
    container.innerHTML = '';
    
    if (this.swapRequests.length === 0) {
        container.innerHTML = '<p>No new swap requests </p>';
        return;
    }
    
    this.swapRequests.forEach(req => {
        const card = document.createElement('div');
        card.className = 'request-card';
        card.innerHTML = `
            <div class="request-info">
                <p><strong>From:</strong> ${req.requesterId.fullName} (${req.requesterId.email})</p>
                <p><strong>Item:</strong> ${req.itemId.title}</p>
                <p><strong>Status:</strong> ${req.status}</p>
            </div>
            ${req.status === 'pending' ? `
                <div class="request-buttons">
                    <button class="accept-btn" onclick="dashboard.respondToRequest('${req._id}', 'accepted')">Accept</button>
                    <button class="reject-btn" onclick="dashboard.respondToRequest('${req._id}', 'rejected')">Reject</button>
                </div>
            ` : ''}
        `;
        container.appendChild(card);
    });
}

async respondToRequest(requestId, decision) {
    try {
        this.showLoading();
        
        await this.api.respondToSwapRequest(requestId, decision);
        
        this.showNotification(`✅ Request ${decision}`, 'success');
        await this.loadSwapRequests(); // Refresh
        
    } catch (error) {
        console.error('Error responding:', error);
        this.showError('❌ Something went wrong.');
    } finally {
        this.hideLoading();
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

    // Update stats - FIXED VERSION
    this.updateStatsUI();
}
updateStatsUI() {
    const totalListings = document.getElementById('total-listings');
    const totalSwaps = document.getElementById('total-swaps');
    const totalPoints = document.getElementById('total-points');

    // Calculate stats based on current data
    const listingsCount = this.userListings ? this.userListings.length : 0;
    const swapsCount = this.userPurchases ? this.userPurchases.filter(p => p.type === 'swap').length : 0;
    const pointsCount = this.currentUser ? this.currentUser.points : 0;

    if (totalListings) totalListings.textContent = listingsCount;
    if (totalSwaps) totalSwaps.textContent = swapsCount;
    if (totalPoints) totalPoints.textContent = pointsCount;
}

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

    // UPDATE STATS AFTER LISTINGS ARE LOADED
    this.updateStatsUI();
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

    // UPDATE STATS AFTER PURCHASES ARE LOADED
    this.updateStatsUI();
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
            addItemBtn.addEventListener('click', () => this.openAddItemModal());
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
        this.setupModalListeners();
    }

    // Setup modal listeners
    setupModalListeners() {
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
        let modal = document.getElementById('add-item-modal');
        if (!modal) {
            modal = this.createAddItemModal();
            document.body.appendChild(modal);
        }

        // Reset form
        document.getElementById('add-item-form').reset();
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

        // Add event listeners
        this.addModalEventListeners(modal);
        return modal;
    }

    // Add modal event listeners
    addModalEventListeners(modal) {
        // Form submission
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
    }

    // Close add item modal
    closeAddItemModal() {
        const modal = document.getElementById('add-item-modal');
        if (modal) {
            modal.classList.remove('active');
        }
    }

    // Handle add item form submission via API
    async handleAddItem(e) {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const newItemData = {
        title: formData.get('title'),
        description: formData.get('description'),
        category: formData.get('category'),
        size: formData.get('size'),
        condition: formData.get('condition'),
        image: formData.get('image') || 'https://via.placeholder.com/300x200/4CAF50/FFFFFF?text=New+Item',
        status: 'active'
    };

    try {
        this.showLoading();
        
        // Create listing via API
        const newListing = await this.api.createListing(newItemData);
        
        // Update local data
        this.userListings.unshift(newListing);
        
        // Update UI
        this.updateListingsUI();
        this.updateStatsUI(); // EXPLICITLY UPDATE STATS
        
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

    // Edit listing via API
    async editListing(listingId) {
        try {
            const listing = await this.api.getListing(listingId);
            if (listing) {
                this.openEditListingModal(listing);
            }
        } catch (error) {
            console.error('Error fetching listing:', error);
            this.showError('Failed to load listing');
        }
    }

    // Open edit listing modal
    openEditListingModal(listing) {
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
                        // Continuing from the edit listing modal creation...

                    </button>
                </div>
                <div class="modal-body">
                    <form id="edit-listing-form">
                        <div class="form-group">
                            <label for="edit-listing-title">Title *</label>
                            <input type="text" id="edit-listing-title" name="title" required placeholder="Enter item title">
                        </div>
                        <div class="form-group">
                            <label for="edit-listing-description">Description *</label>
                            <textarea id="edit-listing-description" name="description" rows="3" required placeholder="Describe your item"></textarea>
                        </div>
                        <div class="form-group">
                            <label for="edit-listing-category">Category *</label>
                            <select id="edit-listing-category" name="category" required>
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
                            <label for="edit-listing-size">Size *</label>
                            <select id="edit-listing-size" name="size" required>
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
                            <label for="edit-listing-condition">Condition *</label>
                            <select id="edit-listing-condition" name="condition" required>
                                <option value="">Select condition</option>
                                <option value="Like New">Like New</option>
                                <option value="Excellent">Excellent</option>
                                <option value="Very Good">Very Good</option>
                                <option value="Good">Good</option>
                                <option value="Fair">Fair</option>
                            </select>
                        </div>
                        <div class="form-group">
                            <label for="edit-listing-status">Status *</label>
                            <select id="edit-listing-status" name="status" required>
                                <option value="active">Active</option>
                                <option value="pending">Pending</option>
                                <option value="completed">Completed</option>
                                <option value="paused">Paused</option>
                            </select>
                        </div>
                        <div class="form-actions">
                            <button type="button" class="btn btn-danger" onclick="dashboard.deleteListing()">Delete Listing</button>
                            <button type="button" class="btn btn-secondary" onclick="dashboard.closeEditListingModal()">Cancel</button>
                            <button type="submit" class="btn btn-primary">Update Listing</button>
                        </div>
                    </form>
                </div>
            </div>
        `;

        // Add event listeners
        this.addEditListingModalEventListeners(modal);
        return modal;
    }

    // Add event listeners for edit listing modal
    addEditListingModalEventListeners(modal) {
        // Form submission
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
    }

    // Close edit listing modal
    closeEditListingModal() {
        const modal = document.getElementById('edit-listing-modal');
        if (modal) {
            modal.classList.remove('active');
        }
    }

    // Handle edit listing form submission via API
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
            condition: formData.get('condition'),
            status: formData.get('status')
        };

        try {
            this.showLoading();
            
            // Update listing via API
            const updatedListing = await this.api.updateListing(listingId, updatedData);
            
            // Update local data
            const index = this.userListings.findIndex(l => l.id === listingId);
            if (index !== -1) {
                this.userListings[index] = updatedListing;
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

    // Delete listing via API
    async deleteListing() {
    const modal = document.getElementById('edit-listing-modal');
    const listingId = parseInt(modal.dataset.listingId);
    
    if (!confirm('Are you sure you want to delete this listing? This action cannot be undone.')) {
        return;
    }

    try {
        this.showLoading();
        
        // Delete listing via API
        await this.api.deleteListing(listingId);
        
        // Remove from local data
        this.userListings = this.userListings.filter(l => l.id !== listingId);
        
        // Update UI
        this.updateListingsUI();
        this.updateStatsUI(); // EXPLICITLY UPDATE STATS
        
        // Close modal
        this.closeEditListingModal();
        
        // Show success message
        this.showNotification('Listing deleted successfully!', 'success');
        
    } catch (error) {
        console.error('Error deleting listing:', error);
        this.showError('Failed to delete listing');
    } finally {
        this.hideLoading();
    }
}

    // View listing details
    viewListing(listingId) {
        const listing = this.userListings.find(l => l.id === listingId);
        if (!listing) return;

        // Create and show listing details modal
        this.openViewListingModal(listing);
    }

    // Open view listing modal
    openViewListingModal(listing) {
        let modal = document.getElementById('view-listing-modal');
        if (!modal) {
            modal = this.createViewListingModal();
            document.body.appendChild(modal);
        }

        // Update modal content with listing data
        modal.querySelector('.listing-detail-image').src = listing.image;
        modal.querySelector('.listing-detail-title').textContent = listing.title;
        modal.querySelector('.listing-detail-description').textContent = listing.description;
        modal.querySelector('.listing-detail-category').textContent = listing.category;
        modal.querySelector('.listing-detail-size').textContent = listing.size;
        modal.querySelector('.listing-detail-condition').textContent = listing.condition;
        modal.querySelector('.listing-detail-status').textContent = this.formatStatus(listing.status);
        modal.querySelector('.listing-detail-status').className = `listing-detail-status status-${listing.status}`;
        modal.querySelector('.listing-detail-created').textContent = new Date(listing.createdAt).toLocaleDateString();
        modal.querySelector('.listing-detail-views').textContent = listing.views;
        modal.querySelector('.listing-detail-interested').textContent = listing.interested;

        modal.classList.add('active');
    }

    // Create view listing modal
    createViewListingModal() {
        const modal = document.createElement('div');
        modal.id = 'view-listing-modal';
        modal.className = 'modal';
        modal.innerHTML = `
            <div class="modal-content large-modal">
                <div class="modal-header">
                    <h3>Listing Details</h3>
                    <button class="modal-close" onclick="dashboard.closeViewListingModal()">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                <div class="modal-body">
                    <div class="listing-detail-container">
                        <div class="listing-detail-image-container">
                            <img src="" alt="Listing Image" class="listing-detail-image">
                        </div>
                        <div class="listing-detail-info">
                            <h2 class="listing-detail-title"></h2>
                            <p class="listing-detail-description"></p>
                            <div class="listing-detail-specs">
                                <div class="spec-item">
                                    <strong>Category:</strong> <span class="listing-detail-category"></span>
                                </div>
                                <div class="spec-item">
                                    <strong>Size:</strong> <span class="listing-detail-size"></span>
                                </div>
                                <div class="spec-item">
                                    <strong>Condition:</strong> <span class="listing-detail-condition"></span>
                                </div>
                                <div class="spec-item">
                                    <strong>Status:</strong> <span class="listing-detail-status"></span>
                                </div>
                                <div class="spec-item">
                                    <strong>Created:</strong> <span class="listing-detail-created"></span>
                                </div>
                            </div>
                            <div class="listing-detail-stats">
                                <div class="stat-item">
                                    <i class="fas fa-eye"></i>
                                    <span class="listing-detail-views"></span> views
                                </div>
                                <div class="stat-item">
                                    <i class="fas fa-heart"></i>
                                    <span class="listing-detail-interested"></span> interested
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;

        // Add event listeners
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                this.closeViewListingModal();
            }
        });

        return modal;
    }

    // Close view listing modal
    closeViewListingModal() {
        const modal = document.getElementById('view-listing-modal');
        if (modal) {
            modal.classList.remove('active');
        }
    }

    // Open edit profile modal
    openEditProfileModal() {
        const modal = document.getElementById('edit-profile-modal');
        if (!modal) return;

        // Pre-fill form with current user data
        document.getElementById('edit-name').value = this.currentUser.name;
        document.getElementById('edit-email').value = this.currentUser.email;
        document.getElementById('edit-bio').value = this.currentUser.bio || '';

        modal.classList.add('active');
    }

    // Close edit profile modal
    closeEditProfileModal() {
        const modal = document.getElementById('edit-profile-modal');
        if (modal) {
            modal.classList.remove('active');
        }
    }

    // Handle edit profile form submission via API
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
            
            // Update profile via API
            const updatedUser = await this.api.updateUserProfile(updatedData);
            
            // Update local data
            this.currentUser = updatedUser;
            
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

        const cards = listingsGrid.querySelectorAll('.listing-card');
        
        cards.forEach(card => {
            const statusElement = card.querySelector('.listing-status');
            const status = statusElement ? statusElement.className.split('-')[1] : '';
            
            if (filter === 'all' || status === filter) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    }

    // Filter purchases
    filterPurchases(filter) {
        const purchasesList = document.getElementById('purchases-list');
        if (!purchasesList) return;

        const items = purchasesList.querySelectorAll('.purchase-item');
        
        items.forEach(item => {
            const typeElement = item.querySelector('.purchase-type');
            const type = typeElement ? typeElement.className.split('-')[1] : '';
            
            if (filter === 'all' || type === filter) {
                item.style.display = 'flex';
            } else {
                item.style.display = 'none';
            }
        });
    }

    // Format status text
    formatStatus(status) {
        const statusMap = {
            'active': 'Active',
            'pending': 'Pending',
            'completed': 'Completed',
            'paused': 'Paused'
        };
        return statusMap[status] || status;
    }

    // Show notification
    showNotification(message, type = 'info') {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle'}"></i>
            <span>${message}</span>
            <button class="notification-close" onclick="this.parentElement.remove()">
                <i class="fas fa-times"></i>
            </button>
        `;

        // Add to page
        document.body.appendChild(notification);

        // Auto-remove after 5 seconds
        setTimeout(() => {
            if (notification.parentElement) {
                notification.remove();
            }
        }, 5000);
    }

    // Show error message
    showError(message) {
        this.showNotification(message, 'error');
    }

    // Refresh dashboard data
    async refreshDashboard() {
        try {
            this.showLoading();
            
            // Reload all data via API
            await this.loadUserData();
            await this.loadUserListings();
            await this.loadUserPurchases();
            
            this.showNotification('Dashboard refreshed successfully!', 'success');
            
        } catch (error) {
            console.error('Error refreshing dashboard:', error);
            this.showError('Failed to refresh dashboard');
        } finally {
            this.hideLoading();
        }
    }

    // Search functionality
    searchListings(query) {
        const listingsGrid = document.getElementById('listings-grid');
        if (!listingsGrid) return;

        const cards = listingsGrid.querySelectorAll('.listing-card');
        const searchTerm = query.toLowerCase();
        
        cards.forEach(card => {
            const title = card.querySelector('.listing-title').textContent.toLowerCase();
            const description = card.querySelector('.listing-description').textContent.toLowerCase();
            
            if (title.includes(searchTerm) || description.includes(searchTerm)) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    }

    // Export user data
    exportUserData() {
        const data = {
            user: this.currentUser,
            listings: this.userListings,
            purchases: this.userPurchases,
            exportDate: new Date().toISOString()
        };

        const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `rewear-data-${new Date().toISOString().split('T')[0]}.json`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);

        this.showNotification('Data exported successfully!', 'success');
    }

    // Get analytics data
    getAnalytics() {
        const analytics = {
            totalListings: this.userListings.length,
            activeListings: this.userListings.filter(l => l.status === 'active').length,
            completedListings: this.userListings.filter(l => l.status === 'completed').length,
            totalViews: this.userListings.reduce((sum, l) => sum + l.views, 0),
            totalInterested: this.userListings.reduce((sum, l) => sum + l.interested, 0),
            totalSwaps: this.userPurchases.filter(p => p.type === 'swap').length,
            totalPointsSpent: this.userPurchases.filter(p => p.type === 'points').reduce((sum, p) => sum + p.pointsSpent, 0),
            categoriesCount: this.getCategoriesCount(),
            monthlyActivity: this.getMonthlyActivity()
        };

        return analytics;
    }

    // Get categories count
    getCategoriesCount() {
        const categories = {};
        this.userListings.forEach(listing => {
            categories[listing.category] = (categories[listing.category] || 0) + 1;
        });
        return categories;
    }

    // Get monthly activity
    getMonthlyActivity() {
        const activity = {};
        this.userListings.forEach(listing => {
            const month = listing.createdAt.substring(0, 7); // YYYY-MM
            activity[month] = (activity[month] || 0) + 1;
        });
        return activity;
    }

    // Show analytics
    showAnalytics() {
        const analytics = this.getAnalytics();
        
        let analyticsModal = document.getElementById('analytics-modal');
        if (!analyticsModal) {
            analyticsModal = this.createAnalyticsModal();
            document.body.appendChild(analyticsModal);
        }

        // Update analytics content
        this.updateAnalyticsContent(analytics);
        analyticsModal.classList.add('active');
    }

    // Create analytics modal
    createAnalyticsModal() {
        const modal = document.createElement('div');
        modal.id = 'analytics-modal';
        modal.className = 'modal';
        modal.innerHTML = `
            <div class="modal-content large-modal">
                <div class="modal-header">
                    <h3>Analytics Dashboard</h3>
                    <button class="modal-close" onclick="dashboard.closeAnalyticsModal()">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                <div class="modal-body">
                    <div id="analytics-content"></div>
                </div>
            </div>
        `;

        // Add event listeners
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                this.closeAnalyticsModal();
            }
        });

        return modal;
    }

    // Update analytics content
    updateAnalyticsContent(analytics) {
        const content = document.getElementById('analytics-content');
        if (!content) return;

        content.innerHTML = `
            <div class="analytics-grid">
                <div class="analytics-card">
                    <h4>Listing Overview</h4>
                    <div class="stat-row">
                        <span>Total Listings:</span>
                        <span>${analytics.totalListings}</span>
                    </div>
                    <div class="stat-row">
                        <span>Active Listings:</span>
                        <span>${analytics.activeListings}</span>
                    </div>
                    <div class="stat-row">
                        <span>Completed Listings:</span>
                        <span>${analytics.completedListings}</span>
                    </div>
                </div>
                
                <div class="analytics-card">
                    <h4>Engagement</h4>
                    <div class="stat-row">
                        <span>Total Views:</span>
                        <span>${analytics.totalViews}</span>
                    </div>
                    <div class="stat-row">
                        <span>Total Interested:</span>
                        <span>${analytics.totalInterested}</span>
                    </div>
                    <div class="stat-row">
                        <span>Avg. Views per Listing:</span>
                        <span>${analytics.totalListings > 0 ? Math.round(analytics.totalViews / analytics.totalListings) : 0}</span>
                    </div>
                </div>
                
                <div class="analytics-card">
                    <h4>Trading Activity</h4>
                    <div class="stat-row">
                        <span>Total Swaps:</span>
                        <span>${analytics.totalSwaps}</span>
                    </div>
                    <div class="stat-row">
                        <span>Points Spent:</span>
                        <span>${analytics.totalPointsSpent}</span>
                    </div>
                    <div class="stat-row">
                        <span>Current Points:</span>
                        <span>${this.currentUser.points}</span>
                    </div>
                </div>
                
                <div class="analytics-card">
                    <h4>Categories</h4>
                    ${Object.entries(analytics.categoriesCount).map(([category, count]) => `
                        <div class="stat-row">
                            <span>${category}:</span>
                            <span>${count}</span>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
    }

    // Close analytics modal
    closeAnalyticsModal() {
        const modal = document.getElementById('analytics-modal');
        if (modal) {
            modal.classList.remove('active');
        }
    }
}

// Initialize dashboard when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Create global dashboard instance
    window.dashboard = new ReWearDashboard();
    
    // Add some additional event listeners for search and other features
    const searchInput = document.getElementById('search-listings');
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            window.dashboard.searchListings(e.target.value);
        });
    }

    // Refresh button
    const refreshBtn = document.getElementById('refresh-btn');
    if (refreshBtn) {
        refreshBtn.addEventListener('click', () => {
            window.dashboard.refreshDashboard();
        });
    }

    // Export data button
    const exportBtn = document.getElementById('export-btn');
    if (exportBtn) {
        exportBtn.addEventListener('click', () => {
            window.dashboard.exportUserData();
        });
    }

    // Analytics button
    const analyticsBtn = document.getElementById('analytics-btn');
    if (analyticsBtn) {
        analyticsBtn.addEventListener('click', () => {
            window.dashboard.showAnalytics();
        });
    }
});

// Global function to switch between fake and real API
function switchAPI(useFakeAPI) {
    if (window.dashboard && window.dashboard.api) {
        window.dashboard.api.USE_FAKE_API = useFakeAPI;
        console.log(`API switched to: ${useFakeAPI ? 'Fake' : 'Real'}`);
        
        // Optionally refresh dashboard with new API
        if (confirm('API mode changed. Would you like to refresh the dashboard?')) {
            window.dashboard.refreshDashboard();
        }
    }
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { ReWearDashboard, APIService, FakeDatabase };
}






