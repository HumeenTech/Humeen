const STORAGE_KEY = 'humeen_blogs';

// Same default data as dashboard to ensure consistency
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

document.addEventListener('DOMContentLoaded', () => {
    renderBlogPosts();
});

function loadPosts() {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultPosts));
        return defaultPosts;
    }
    return JSON.parse(stored);
}

function renderBlogPosts() {
    const container = document.getElementById('blog-grid');
    if (!container) return;

    const posts = loadPosts();
    container.innerHTML = '';

    if (posts.length === 0) {
        container.innerHTML = '<p>No blog posts found.</p>';
        return;
    }

    posts.forEach(post => {
        const card = document.createElement('div');
        card.className = 'blog-card';
        card.innerHTML = `
            <div class="blog-img" style="background-image: url('${post.image}');"></div>
            <div class="blog-content">
                <div class="blog-meta">
                    <span class="blog-date">${post.date}</span>
                    <span class="blog-tag">${post.category}</span>
                </div>
                <h3>${post.title}</h3>
                <p>${post.excerpt}</p>
                <a href="blog-single.html" class="read-more">Read Article <i class="fas fa-arrow-right"></i></a>
            </div>
        `;
        container.appendChild(card);
    });
}
