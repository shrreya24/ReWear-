// ReWear Admin Dashboard JavaScript
class AdminDashboard {
    constructor() {
        this.currentItem = null;
        this.currentSection = 'pending';
        this.items = [];
        this.users = [];
        this.api = new FakeAPI(); // This will be replaced with real API in future
        
        this.init();
    }

    async init() {
        await this.loadData();
        this.setupEventListeners();
        this.loadSection('pending');
        this.updatePendingCount();
    }

    // Load all data from API
    async loadData() {
        try {
            this.showLoading();
            this.items = await this.api.getItems();
            this.users = await this.api.getUsers();
            this.hideLoading();
        } catch (error) {
            this.showNotification('Error loading data', 'error');
            this.hideLoading();
        }
    }

    // Setup all event listeners
    setupEventListeners() {
        // Navigation buttons
        document.querySelectorAll('.nav-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const section = e.currentTarget.dataset.section;
                this.loadSection(section);
            });
        });

        // Search functionality
        document.getElementById('search-pending').addEventListener('input', (e) => {
            this.filterItems('pending', e.target.value);
        });

        document.getElementById('search-approved').addEventListener('input', (e) => {
            this.filterItems('approved', e.target.value);
        });

        document.getElementById('search-rejected').addEventListener('input', (e) => {
            this.filterItems('rejected', e.target.value);
        });

        document.getElementById('search-users').addEventListener('input', (e) => {
            this.filterUsers(e.target.value);
        });

        // Category filter
        document.getElementById('category-filter').addEventListener('change', (e) => {
            this.filterByCategory(e.target.value);
        });

        // User filter
        document.getElementById('user-filter').addEventListener('change', (e) => {
            this.filterUsersByStatus(e.target.value);
        });

        // Modal close on outside click
        document.getElementById('item-modal').addEventListener('click', (e) => {
            if (e.target.id === 'item-modal') {
                this.closeItemModal();
            }
        });

        document.getElementById('reject-modal').addEventListener('click', (e) => {
            if (e.target.id === 'reject-modal') {
                this.closeRejectModal();
            }
        });
    }

    // Load specific section
    loadSection(section) {
        // Update navigation
        document.querySelectorAll('.nav-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        document.querySelector(`[data-section="${section}"]`).classList.add('active');

        // Update sections
        document.querySelectorAll('.admin-section').forEach(sec => {
            sec.classList.remove('active');
        });
        document.getElementById(`${section}-section`).classList.add('active');

        this.currentSection = section;

        // Load section content
        switch (section) {
            case 'pending':
                this.loadPendingItems();
                break;
            case 'approved':
                this.loadApprovedItems();
                break;
            case 'rejected':
                this.loadRejectedItems();
                break;
            case 'users':
                this.loadUsers();
                break;
        }
    }

    // Load pending items
    loadPendingItems() {
        const pendingItems = this.items.filter(item => item.status === 'pending');
        this.renderItems(pendingItems, 'pending-items');
    }

    // Load approved items
    loadApprovedItems() {
        const approvedItems = this.items.filter(item => item.status === 'approved');
        this.renderItems(approvedItems, 'approved-items');
    }

    // Load rejected items
    loadRejectedItems() {
        const rejectedItems = this.items.filter(item => item.status === 'rejected');
        this.renderItems(rejectedItems, 'rejected-items');
    }

    // Load users
    loadUsers() {
        this.renderUsers(this.users);
    }

    // Render items in grid
    renderItems(items, containerId) {
        const container = document.getElementById(containerId);
        
        if (items.length === 0) {
            container.innerHTML = '<div class="no-items">No items found</div>';
            return;
        }

        container.innerHTML = items.map(item => `
            <div class="item-card" data-id="${item.id}">
                <div class="item-image">
                    <img src="${item.image}" alt="${item.title}" loading="lazy">
                </div>
                <div class="item-content">
                    <h3 class="item-title">${item.title}</h3>
                    <p class="item-category">${item.category}</p>
                    <p class="item-user">by ${item.user}</p>
                    <p class="item-date">${this.formatDate(item.submittedAt)}</p>
                    <div class="item-actions">
                        <button class="btn btn-primary" onclick="adminDashboard.viewItem(${item.id})">
                            <i class="fas fa-eye"></i> View
                        </button>
                        ${item.status === 'pending' ? `
                            <button class="btn btn-success" onclick="adminDashboard.quickApprove(${item.id})">
                                <i class="fas fa-check"></i> Approve
                            </button>
                            <button class="btn btn-danger" onclick="adminDashboard.quickReject(${item.id})">
                                <i class="fas fa-times"></i> Reject
                            </button>
                        ` : ''}
                        ${item.status === 'rejected' ? `
                            <span class="rejection-reason">${item.reviewNote || 'No reason provided'}</span>
                        ` : ''}
                    </div>
                </div>
            </div>
        `).join('');
    }

    // Render users list
    renderUsers(users) {
        const container = document.getElementById('users-list');
        
        if (users.length === 0) {
            container.innerHTML = '<div class="no-items">No users found</div>';
            return;
        }

        container.innerHTML = users.map(user => `
            <div class="user-card" data-id="${user.id}">
                <div class="user-avatar">
                    <img src="${user.avatar}" alt="${user.name}">
                </div>
                <div class="user-info">
                    <h4>${user.name}</h4>
                    <p class="user-email">${user.email}</p>
                    <p class="user-join-date">Joined: ${this.formatDate(user.joinedAt)}</p>
                    <div class="user-stats">
                        <span class="stat">Items: ${user.itemCount}</span>
                        <span class="stat">Rating: ${user.rating}/5</span>
                    </div>
                </div>
                <div class="user-status">
                    <span class="status-badge ${user.status}">${user.status}</span>
                </div>
                <div class="user-actions">
                    <button class="btn btn-secondary" onclick="adminDashboard.viewUserProfile(${user.id})">
                        <i class="fas fa-user"></i> Profile
                    </button>
                    ${user.status === 'active' ? `
                        <button class="btn btn-warning" onclick="adminDashboard.suspendUser(${user.id})">
                            <i class="fas fa-ban"></i> Suspend
                        </button>
                    ` : `
                        <button class="btn btn-success" onclick="adminDashboard.activateUser(${user.id})">
                            <i class="fas fa-check"></i> Activate
                        </button>
                    `}
                </div>
            </div>
        `).join('');
    }

    // View item details
    viewItem(itemId) {
        const item = this.items.find(i => i.id === itemId);
        if (!item) return;

        this.currentItem = item;
        
        // Populate modal
        document.querySelector('.item-detail-image').src = item.image;
        document.querySelector('.item-title').textContent = item.title;
        document.querySelector('.item-description').textContent = item.description;
        document.querySelector('.item-category').textContent = item.category;
        document.querySelector('.item-size').textContent = item.size;
        document.querySelector('.item-condition').textContent = item.condition;
        document.querySelector('.item-user').textContent = item.user;
        document.querySelector('.item-date').textContent = this.formatDate(item.submittedAt);

        // Show/hide admin actions based on status
        const adminActions = document.querySelector('.admin-actions');
        if (item.status === 'pending') {
            adminActions.style.display = 'block';
        } else {
            adminActions.style.display = 'none';
        }

        document.getElementById('item-modal').classList.add('active');
    }

    // Close item modal
    closeItemModal() {
        document.getElementById('item-modal').classList.remove('active');
        this.currentItem = null;
    }

    // Quick approve item
    async quickApprove(itemId) {
        try {
            this.showLoading();
            await this.api.approveItem(itemId);
            
            // Update local data
            const item = this.items.find(i => i.id === itemId);
            if (item) {
                item.status = 'approved';
                item.reviewedAt = new Date().toISOString();
            }
            
            this.showNotification('Item approved successfully', 'success');
            this.loadSection(this.currentSection);
            this.updatePendingCount();
            this.hideLoading();
        } catch (error) {
            this.showNotification('Error approving item', 'error');
            this.hideLoading();
        }
    }

    // Quick reject item
    quickReject(itemId) {
        const item = this.items.find(i => i.id === itemId);
        if (!item) return;

        this.currentItem = item;
        document.getElementById('reject-modal').classList.add('active');
    }

    // Approve item from modal
    async approveItem() {
        if (!this.currentItem) return;

        try {
            this.showLoading();
            await this.api.approveItem(this.currentItem.id);
            
            // Update local data
            this.currentItem.status = 'approved';
            this.currentItem.reviewedAt = new Date().toISOString();
            
            this.showNotification('Item approved successfully', 'success');
            this.closeItemModal();
            this.loadSection(this.currentSection);
            this.updatePendingCount();
            this.hideLoading();
        } catch (error) {
            this.showNotification('Error approving item', 'error');
            this.hideLoading();
        }
    }

    // Reject item from modal
    rejectItem() {
        if (!this.currentItem) return;
        
        this.closeItemModal();
        document.getElementById('reject-modal').classList.add('active');
    }

    // Close reject modal
    closeRejectModal() {
        document.getElementById('reject-modal').classList.remove('active');
        
        // Reset form
        document.querySelectorAll('input[name="reject-reason"]').forEach(input => {
            input.checked = false;
        });
        document.getElementById('reject-comment').value = '';
    }

    // Confirm reject
    async confirmReject() {
        if (!this.currentItem) return;

        const reason = document.querySelector('input[name="reject-reason"]:checked')?.value;
        const comment = document.getElementById('reject-comment').value;

        if (!reason) {
            this.showNotification('Please select a reason for rejection', 'warning');
            return;
        }

        try {
            this.showLoading();
            await this.api.rejectItem(this.currentItem.id, reason, comment);
            
            // Update local data
            this.currentItem.status = 'rejected';
            this.currentItem.reviewedAt = new Date().toISOString();
            this.currentItem.reviewNote = this.getReasonText(reason) + (comment ? ` - ${comment}` : '');
            
            this.showNotification('Item rejected successfully', 'success');
            this.closeRejectModal();
            this.loadSection(this.currentSection);
            this.updatePendingCount();
            this.hideLoading();
        } catch (error) {
            this.showNotification('Error rejecting item', 'error');
            this.hideLoading();
        }
    }

    // Get reason text
    getReasonText(reason) {
        const reasons = {
            'inappropriate': 'Inappropriate content',
            'spam': 'Spam or fake listing',
            'quality': 'Poor image quality',
            'description': 'Incomplete description',
            'other': 'Other'
        };
        return reasons[reason] || 'Unknown reason';
    }

    // Filter items
    filterItems(status, searchTerm) {
        const items = this.items.filter(item => 
            item.status === status && 
            (item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
             item.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
             item.user.toLowerCase().includes(searchTerm.toLowerCase()))
        );
        
        this.renderItems(items, `${status}-items`);
    }

    // Filter by category
    filterByCategory(category) {
        const searchTerm = document.getElementById('search-pending').value;
        let items = this.items.filter(item => item.status === 'pending');
        
        if (category) {
            items = items.filter(item => item.category === category);
        }
        
        if (searchTerm) {
            items = items.filter(item =>
                item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                item.user.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }
        
        this.renderItems(items, 'pending-items');
    }

    // Filter users
    filterUsers(searchTerm) {
        const statusFilter = document.getElementById('user-filter').value;
        let users = this.users.filter(user =>
            user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user.email.toLowerCase().includes(searchTerm.toLowerCase())
        );
        
        if (statusFilter) {
            users = users.filter(user => user.status === statusFilter);
        }
        
        this.renderUsers(users);
    }

    // Filter users by status
    filterUsersByStatus(status) {
        const searchTerm = document.getElementById('search-users').value;
        let users = this.users;
        
        if (status) {
            users = users.filter(user => user.status === status);
        }
        
        if (searchTerm) {
            users = users.filter(user =>
                user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                user.email.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }
        
        this.renderUsers(users);
    }

    // User management functions
    async suspendUser(userId) {
        if (!confirm('Are you sure you want to suspend this user?')) return;

        try {
            this.showLoading();
            await this.api.suspendUser(userId);
            
            // Update local data
            const user = this.users.find(u => u.id === userId);
            if (user) {
                user.status = 'suspended';
            }
            
            this.showNotification('User suspended successfully', 'success');
            this.loadUsers();
            this.hideLoading();
        } catch (error) {
            this.showNotification('Error suspending user', 'error');
            this.hideLoading();
        }
    }

    async activateUser(userId) {
        try {
            this.showLoading();
            await this.api.activateUser(userId);
            
            // Update local data
            const user = this.users.find(u => u.id === userId);
            if (user) {
                user.status = 'active';
            }
            
            this.showNotification('User activated successfully', 'success');
            this.loadUsers();
            this.hideLoading();
        } catch (error) {
            this.showNotification('Error activating user', 'error');
            this.hideLoading();
        }
    }

    viewUserProfile(userId) {
        // This would open a user profile modal or navigate to user profile page
        // For now, just show a placeholder
        this.showNotification('User profile feature coming soon', 'info');
    }

    // Update pending count
    updatePendingCount() {
        const pendingCount = this.items.filter(item => item.status === 'pending').length;
        document.getElementById('pending-count').textContent = pendingCount;
    }

    // Utility functions
    formatDate(dateString) {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    }

    showLoading() {
        document.getElementById('loading-overlay').classList.add('active');
    }

    hideLoading() {
        document.getElementById('loading-overlay').classList.remove('active');
    }

    showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.innerHTML = `
            <i class="fas fa-${this.getNotificationIcon(type)}"></i>
            <span>${message}</span>
            <button class="notification-close" onclick="this.parentElement.remove()">
                <i class="fas fa-times"></i>
            </button>
        `;
        
        document.getElementById('notification-container').appendChild(notification);
        
        // Auto remove after 5 seconds
        setTimeout(() => {
            notification.remove();
        }, 5000);
    }

    getNotificationIcon(type) {
        const icons = {
            'success': 'check-circle',
            'error': 'exclamation-circle',
            'warning': 'exclamation-triangle',
            'info': 'info-circle'
        };
        return icons[type] || 'info-circle';
    }
}

// Fake API class - This will be replaced with real API calls in the future
class FakeAPI {
    constructor() {
        this.delay = 500; // Simulate network delay
    }

    // Simulate API delay
    async simulate(data) {
        await new Promise(resolve => setTimeout(resolve, this.delay));
        return data;
    }

    // Get all items
    async getItems() {
        const items = [
            {
                id: 1,
                title: "Vintage Denim Jacket",
                description: "Classic blue denim jacket from the 90s. Perfect condition, no stains or tears. Size M fits like a dream!",
                category: "Outerwear",
                size: "M",
                condition: "Excellent",
                image: "https://via.placeholder.com/300x200/4CAF50/FFFFFF?text=Vintage+Denim",
                status: "pending",
                user: "Sarah Johnson",
                userId: 1,
                submittedAt: "2024-01-25T10:30:00Z",
                reviewedAt: null,
                reviewNote: null
            },
            {
                id: 2,
                title: "Designer Sneakers",
                description: "Limited edition Nike Air Max, worn only twice. Original box included. Size 9.5 US.",
                category: "Footwear",
                size: "9.5",
                condition: "Like New",
                image: "https://via.placeholder.com/300x200/D87D4A/FFFFFF?text=Designer+Sneakers",
                status: "pending",
                user: "Mike Chen",
                userId: 2,
                submittedAt: "2024-01-25T09:15:00Z",
                reviewedAt: null,
                reviewNote: null
            },
            {
                id: 3,
                title: "Silk Blouse",
                description: "Beautiful silk blouse in cream color. Perfect for office wear. Dry clean only.",
                category: "Tops",
                size: "S",
                condition: "Good",
                image: "https://via.placeholder.com/300x200/E91E63/FFFFFF?text=Silk+Blouse",
                status: "pending",
                user: "Emily Davis",
                userId: 3,
                submittedAt: "2024-01-25T08:45:00Z",
                reviewedAt: null,
                reviewNote: null
            },
            {
                id: 4,
                title: "Leather Boots",
                description: "Genuine leather boots in excellent condition. Perfect for winter wear.",
                category: "Footwear",
                size: "8",
                condition: "Excellent",
                image: "https://via.placeholder.com/300x200/795548/FFFFFF?text=Leather+Boots",
                status: "approved",
                user: "James Wilson",
                userId: 4,
                submittedAt: "2024-01-24T14:20:00Z",
                reviewedAt: "2024-01-25T09:00:00Z",
                reviewNote: null
            },
            {
                id: 5,
                title: "Summer Dress",
                description: "Floral print summer dress, worn once to a wedding. Size L.",
                category: "Dresses",
                size: "L",
                condition: "Like New",
                image: "https://via.placeholder.com/300x200/FF9800/FFFFFF?text=Summer+Dress",
                status: "approved",
                user: "Lisa Thompson",
                userId: 5,
                submittedAt: "2024-01-24T11:30:00Z",
                reviewedAt: "2024-01-24T16:45:00Z",
                reviewNote: null
            },
            {
                id: 6,
                title: "Damaged T-Shirt",
                description: "Old t-shirt with holes and stains.",
                category: "Tops",
                size: "M",
                condition: "Poor",
                image: "https://via.placeholder.com/300x200/F44336/FFFFFF?text=Damaged+Shirt",
                status: "rejected",
                user: "Bob Smith",
                userId: 6,
                submittedAt: "2024-01-24T13:15:00Z",
                reviewedAt: "2024-01-24T15:30:00Z",
                reviewNote: "Poor image quality - Item condition not suitable for platform"
            }
        ];

        return this.simulate(items);
    }

    // Get all users
    async getUsers() {
        const users = [
            {
                id: 1,
                name: "Sarah Johnson",
                email: "sarah.johnson@email.com",
                avatar: "https://via.placeholder.com/50x50/4CAF50/FFFFFF?text=SJ",
                status: "active",
                joinedAt: "2024-01-15T10:00:00Z",
                itemCount: 5,
                rating: 4.8
            },
            {
                id: 2,
                name: "Mike Chen",
                email: "mike.chen@email.com",
                avatar: "https://via.placeholder.com/50x50/2196F3/FFFFFF?text=MC",
                status: "active",
                joinedAt: "2024-01-20T14:30:00Z",
                itemCount: 3,
                rating: 4.2
            },
            {
                id: 3,
                name: "Emily Davis",
                email: "emily.davis@email.com",
                avatar: "https://via.placeholder.com/50x50/E91E63/FFFFFF?text=ED",
                status: "active",
                joinedAt: "2024-01-22T09:15:00Z",
                itemCount: 2,
                rating: 4.5
            },
            {
                id: 4,
                name: "James Wilson",
                email: "james.wilson@email.com",
                avatar: "https://via.placeholder.com/50x50/795548/FFFFFF?text=JW",
                status: "active",
                joinedAt: "2024-01-18T16:45:00Z",
                itemCount: 7,
                rating: 4.9
            },
            {
                id: 5,
                name: "Lisa Thompson",
                email: "lisa.thompson@email.com",
                avatar: "https://via.placeholder.com/50x50/FF9800/FFFFFF?text=LT",
                status: "active",
                joinedAt: "2024-01-12T11:20:00Z",
                itemCount: 4,
                rating: 4.6
            },
            {
                id: 6,
                name: "Bob Smith",
                email: "bob.smith@email.com",
                avatar: "https://via.placeholder.com/50x50/F44336/FFFFFF?text=BS",
                status: "suspended",
                joinedAt: "2024-01-10T13:30:00Z",
                itemCount: 1,
                rating: 2.1
            }
        ];

        return this.simulate(users);
    }

    // Approve item
    async approveItem(itemId) {
        console.log(`API: Approving item ${itemId}`);
        return this.simulate({ success: true, message: 'Item approved' });
    }

    // Reject item
    async rejectItem(itemId, reason, comment) {
        console.log(`API: Rejecting item ${itemId} with reason: ${reason}`);
        return this.simulate({ success: true, message: 'Item rejected' });
    }

    // Suspend user
    async suspendUser(userId) {
        console.log(`API: Suspending user ${userId}`);
        return this.simulate({ success: true, message: 'User suspended' });
    }

    // Activate user
    async activateUser(userId) {
        console.log(`API: Activating user ${userId}`);
        return this.simulate({ success: true, message: 'User activated' });
    }
}

// Initialize the dashboard when the page loads
let adminDashboard;
document.addEventListener('DOMContentLoaded', () => {
    adminDashboard = new AdminDashboard();
});

// Global functions for onclick handlers
function closeItemModal() {
    adminDashboard.closeItemModal();
}

function closeRejectModal() {
    adminDashboard.closeRejectModal();
}

function approveItem() {
    adminDashboard.approveItem();
}

function rejectItem() {
    adminDashboard.rejectItem();
}

function confirmReject() {
    adminDashboard.confirmReject();
}