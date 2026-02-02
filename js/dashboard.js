const STORAGE_KEY = 'humeen_blogs';

// Default data to seed if storage is empty
const defaultPosts = [
    {
        id: '1',
        title: 'The Future of SEO in 2026',
        category: 'Marketing',
        date: 'Oct 24, 2025',
        image: 'images/blog-seo.png',
        excerpt: 'How AI and voice search are reshaping the digital landscape and what you need to do to stay ahead.'
    },
    {
        id: '2',
        title: 'Why Microservices Matter',
        category: 'Development',
        date: 'Oct 18, 2025',
        image: 'images/blog-microservices.png',
        excerpt: 'Breaking down the benefits of modular architecture for scalable enterprise applications.'
    },
    {
        id: '3',
        title: 'Migrating to the Hybrid Cloud',
        category: 'Cloud',
        date: 'Oct 10, 2025',
        image: 'images/blog-hybrid-cloud.png',
        excerpt: 'A step-by-step guide to ensuring data security and cost-efficiency during your cloud transition.'
    }
];

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    loadPosts();
    renderTable();

    // Form Submit Handler
    document.getElementById('postForm').addEventListener('submit', handleFormSubmit);
});

// Load posts from localStorage or seed defaults
function loadPosts() {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultPosts));
        return defaultPosts;
    }
    return JSON.parse(stored);
}

// Render the table
function renderTable() {
    const posts = loadPosts();
    const tbody = document.getElementById('blogTableBody');
    tbody.innerHTML = '';

    posts.forEach(post => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${post.title}</td>
            <td><span style="background: #e3f2fd; color: #1976d2; padding: 2px 8px; border-radius: 12px; font-size: 0.85rem;">${post.category}</span></td>
            <td>${post.date}</td>
            <td>
                <button class="action-btn btn-edit" onclick="editPost('${post.id}')"><i class="fas fa-edit"></i> Edit</button>
                <button class="action-btn btn-delete" onclick="deletePost('${post.id}')"><i class="fas fa-trash"></i> Delete</button>
            </td>
        `;
        tbody.appendChild(row);
    });
}

// Open Modal
function openModal() {
    document.getElementById('postModal').style.display = 'flex';
    document.getElementById('modalTitle').innerText = 'Add New Post';
    document.getElementById('postForm').reset();
    document.getElementById('postId').value = '';
}

// Close Modal
function closeModal() {
    document.getElementById('postModal').style.display = 'none';
}

// Save Post (Add or Edit)
function handleFormSubmit(e) {
    e.preventDefault();

    const id = document.getElementById('postId').value;
    const title = document.getElementById('title').value;
    const category = document.getElementById('category').value;
    const excerpt = document.getElementById('excerpt').value;
    let image = document.getElementById('image').value;

    if (!image) {
        image = 'images/blog-default.jpg'; // Fallback
    }

    let posts = loadPosts();

    if (id) {
        // Edit existing
        const index = posts.findIndex(p => p.id === id);
        if (index !== -1) {
            posts[index] = { ...posts[index], title, category, excerpt, image };
        }
    } else {
        // Add new
        const newPost = {
            id: Date.now().toString(),
            title,
            category,
            excerpt,
            image,
            date: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })
        };
        posts.unshift(newPost); // Add to top
    }

    localStorage.setItem(STORAGE_KEY, JSON.stringify(posts));
    closeModal();
    renderTable();
}

// Edit Post - Populate Form
window.editPost = function (id) {
    const posts = loadPosts();
    const post = posts.find(p => p.id === id);
    if (!post) return;

    document.getElementById('postId').value = post.id;
    document.getElementById('title').value = post.title;
    document.getElementById('category').value = post.category;
    document.getElementById('excerpt').value = post.excerpt;
    document.getElementById('image').value = post.image;

    document.getElementById('modalTitle').innerText = 'Edit Post';
    document.getElementById('postModal').style.display = 'flex';
}

// Delete Post
window.deletePost = function (id) {
    if (confirm('Are you sure you want to delete this post?')) {
        let posts = loadPosts();
        posts = posts.filter(p => p.id !== id);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(posts));
        renderTable();
    }
}

// Close modal if clicked outside
window.onclick = function (event) {
    const modal = document.getElementById('postModal');
    if (event.target == modal) {
        closeModal();
    }
}
