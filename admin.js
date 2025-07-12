// ReWear Admin Panel JavaScript

// Initial mock data - this will be loaded only once
const initialItemsData = [
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
    },
    {
        id: 5,
        userId: 2,
        title: 'Running Shoes',
        description: 'Lightweight running shoes with excellent cushioning. Used for about 6 months.',
        image: 'https://via.placeholder.com/300x200/4CAF50/FFFFFF?text=Running+Shoes',
        category: 'Footwear',
        size: '8',
        condition: 'Good',
        status: 'pending',
        createdAt: '2024-01-25',
        views: 12,
        interested: 0
    },
    {
        id: 6,
        userId: 3,
        title: 'Designer Handbag',
        description: 'Authentic designer handbag in black leather. Minimal signs of wear.',
        image: 'https://via.placeholder.com/300x200/D87D4A/FFFFFF?text=Designer+Handbag',
        category: 'Accessories',
        size: 'One Size',
        condition: 'Very Good',
        status: 'active',
        createdAt: '2024-01-23',
        views: 34,
        interested: 4
    }
];

// Global variables
let itemsData = [];
let currentFilter = 'all';
let nextItemId = 7;

// Local storage functions
function saveItemsToStorage() {
    try {
        localStorage.setItem('rewear_items', JSON.stringify(itemsData));
        localStorage.setItem('rewear_next_id', nextItemId.toString());
    } catch (error) {
        console.error('Error saving to localStorage:', error);
    }
}

function loadItemsFromStorage() {
    try {
        const savedItems = localStorage.getItem('rewear_items');
        const savedNextId = localStorage.getItem('rewear_next_id');
        
        if (savedItems) {
            itemsData = JSON.parse(savedItems);
            console.log('Loaded items from storage:', itemsData.length);
        } else {
            // First time loading, use initial data
            itemsData = [...initialItemsData];
            saveItemsToStorage();
            console.log('Initialized with default data:', itemsData.length);
        }
        
        if (savedNextId) {
            nextItemId = parseInt(savedNextId);
        }
    } catch (error) {
        console.error('Error loading from localStorage:', error);
        // Fallback to initial data if localStorage fails
        itemsData = [...initialItemsData];
    }
}

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    loadItemsFromStorage();
    console.log('Items loaded:', itemsData.length);
    updateStats();
    renderItems();
    setupEventListeners();
});

// Setup event listeners
function setupEventListeners() {
    // Filter dropdown
    const statusFilter = document.getElementById('statusFilter');
    statusFilter.addEventListener('change', function() {
        currentFilter = this.value;
        renderItems();
    });

    // Add item form
    const addItemForm = document.getElementById('addItemForm');
    addItemForm.addEventListener('submit', handleAddItem);

    // Close modal on outside click
    const modal = document.getElementById('addItemModal');
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeAddItemModal();
        }
    });
}

// Render items based on current filter
function renderItems() {
    const itemsGrid = document.getElementById('itemsGrid');
    const filteredItems = currentFilter === 'all' 
        ? itemsData 
        : itemsData.filter(item => item.status === currentFilter);

    if (filteredItems.length === 0) {
        itemsGrid.innerHTML = `
            <div style="grid-column: 1 / -1; text-align: center; padding: 2rem; color: #666;">
                <h3>No items found</h3>
                <p>No items match the current filter criteria.</p>
            </div>
        `;
        return;
    }

    itemsGrid.innerHTML = filteredItems.map(item => `
        <div class="item-card">
            <img src="${item.image}" alt="${item.title}" class="item-image">
            <div class="item-content">
                <div class="item-header">
                    <h3 class="item-title">${item.title}</h3>
                    <span class="item-status status-${item.status}">${item.status}</span>
                </div>
                <p class="item-description">${item.description}</p>
                <div class="item-details">
                    <div class="item-detail">
                        <span class="item-detail-label">Category:</span>
                        <span class="item-detail-value">${item.category}</span>
                    </div>
                    <div class="item-detail">
                        <span class="item-detail-label">Size:</span>
                        <span class="item-detail-value">${item.size}</span>
                    </div>
                    <div class="item-detail">
                        <span class="item-detail-label">Condition:</span>
                        <span class="item-detail-value">${item.condition}</span>
                    </div>
                    <div class="item-detail">
                        <span class="item-detail-label">Views:</span>
                        <span class="item-detail-value">${item.views}</span>
                    </div>
                </div>
                <div class="item-actions">
                    ${getActionButtons(item)}
                </div>
            </div>
        </div>
    `).join('');
}

// Get action buttons based on item status
function getActionButtons(item) {
    if (item.status === 'pending') {
        return `
            <button class="action-btn approve-btn" onclick="approveItem(${item.id})">
                Approve
            </button>
            <button class="action-btn reject-btn" onclick="rejectItem(${item.id})">
                Reject
            </button>
        `;
    } else {
        return `
            <button class="action-btn remove-btn" onclick="removeItem(${item.id})">
                Remove
            </button>
        `;
    }
}

// Update statistics
function updateStats() {
    console.log('Updating stats with', itemsData.length, 'items');
    
    const stats = {
        total: itemsData.length,
        pending: itemsData.filter(item => item.status === 'pending').length,
        active: itemsData.filter(item => item.status === 'active').length,
        completed: itemsData.filter(item => item.status === 'completed').length
    };

    console.log('Stats calculated:', stats);

    document.getElementById('totalItems').textContent = stats.total;
    document.getElementById('pendingItems').textContent = stats.pending;
    document.getElementById('activeItems').textContent = stats.active;
    document.getElementById('completedItems').textContent = stats.completed;
}

// Approve item
function approveItem(itemId) {
    const item = itemsData.find(item => item.id === itemId);
    if (item) {
        item.status = 'active';
        saveItemsToStorage(); // Save changes to localStorage
        renderItems();
        updateStats();
        showNotification('Item approved successfully!', 'success');
    }
}

// Reject item
function rejectItem(itemId) {
    if (confirm('Are you sure you want to reject this item? This action cannot be undone.')) {
        const itemIndex = itemsData.findIndex(item => item.id === itemId);
        if (itemIndex !== -1) {
            itemsData.splice(itemIndex, 1); // Remove item from array
            saveItemsToStorage(); // Save changes to localStorage
            renderItems();
            updateStats();
            showNotification('Item rejected and removed!', 'error');
        }
    }
}

// Remove item
function removeItem(itemId) {
    if (confirm('Are you sure you want to remove this item? This action cannot be undone.')) {
        const itemIndex = itemsData.findIndex(item => item.id === itemId);
        if (itemIndex !== -1) {
            itemsData.splice(itemIndex, 1); // Remove item from array
            saveItemsToStorage(); // Save changes to localStorage
            renderItems();
            updateStats();
            showNotification('Item removed successfully!', 'error');
        }
    }
}

// Modal functions
function openAddItemModal() {
    document.getElementById('addItemModal').style.display = 'block';
}

function closeAddItemModal() {
    document.getElementById('addItemModal').style.display = 'none';
    document.getElementById('addItemForm').reset();
}

// Handle add item form submission
function handleAddItem(e) {
    e.preventDefault();
    
    const newItem = {
        id: nextItemId++,
        userId: 1, // Default admin user
        title: document.getElementById('itemTitle').value,
        description: document.getElementById('itemDescription').value,
        image: document.getElementById('itemImage').value,
        category: document.getElementById('itemCategory').value,
        size: document.getElementById('itemSize').value,
        condition: document.getElementById('itemCondition').value,
        status: document.getElementById('itemStatus').value,
        createdAt: new Date().toISOString().split('T')[0],
        views: 0,
        interested: 0
    };

    itemsData.push(newItem);
    saveItemsToStorage(); // Save changes to localStorage
    renderItems();
    updateStats();
    closeAddItemModal();
    showNotification('Item added successfully!', 'success');
}

// Show notification
function showNotification(message, type) {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 1rem 1.5rem;
        border-radius: 5px;
        color: white;
        font-weight: 500;
        z-index: 1001;
        animation: slideIn 0.3s ease;
        ${type === 'success' ? 'background: #4CAF50;' : 'background: #f44336;'}
    `;
    
    // Add animation styles
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideIn {
            from { transform: translateX(100%); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
        }
    `;
    document.head.appendChild(style);
    
    document.body.appendChild(notification);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.remove();
        style.remove();
    }, 3000);
}

// Utility function to reset data (for testing purposes)
function resetToInitialData() {
    if (confirm('Are you sure you want to reset all data to initial state? This cannot be undone.')) {
        itemsData = [...initialItemsData];
        nextItemId = 7;
        saveItemsToStorage();
        renderItems();
        updateStats();
        showNotification('Data reset to initial state!', 'success');
    }
}

// Add reset button functionality to console
console.log('Admin Panel Loaded. Use resetToInitialData() to reset data.');

// Utility functions for future API integration
class AdminAPI {
    static async getAllItems() {
        return itemsData;
    }
    
    static async approveItem(itemId) {
        const item = itemsData.find(item => item.id === itemId);
        if (item) {
            item.status = 'active';
            saveItemsToStorage();
            return item;
        }
        throw new Error('Item not found');
    }
    
    static async rejectItem(itemId) {
        const itemIndex = itemsData.findIndex(item => item.id === itemId);
        if (itemIndex !== -1) {
            itemsData.splice(itemIndex, 1);
            saveItemsToStorage();
            return true;
        }
        throw new Error('Item not found');
    }
    
    static async removeItem(itemId) {
        const itemIndex = itemsData.findIndex(item => item.id === itemId);
        if (itemIndex !== -1) {
            itemsData.splice(itemIndex, 1);
            saveItemsToStorage();
            return true;
        }
        throw new Error('Item not found');
    }
    
    static async addItem(itemData) {
        const newItem = {
            id: nextItemId++,
            ...itemData,
            createdAt: new Date().toISOString().split('T')[0],
            views: 0,
            interested: 0
        };
        itemsData.push(newItem);
        saveItemsToStorage();
        return newItem;
    }
}

// Export for future use
window.AdminAPI = AdminAPI;
window.resetToInitialData = resetToInitialData;