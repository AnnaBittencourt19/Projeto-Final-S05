function goBack() {
    window.location.href = "index.html";
}

const noticias = [
    {
        id: 1,
        titulo: "Indicação de livro da semana",
        resumo: "Indicação de livro da semana",
        data: "15/12/2024",
        categoria: "Acadêmico",
        imagem: "imagens/biblioteca_stories.webp",
        usuario: "biblioteca_inatel",
        avatar: "imagens/biblioteca.png",
        likes: 127,
        local: "Biblioteca do Inatel",
        liked: false,
        bookmarked: false
    },
    {
        id: 2,
        titulo: "Inscrições Abertas para Hackathon 2025",
        resumo: "Mais uma tarde linda por aqui",
        data: "14/12/2024",
        categoria: "Tecnologia",
        imagem: "imagens/stories - inatel.jpeg",
        usuario: "inatel_oficial",
        avatar: "imagens/inatel.jpg",
        likes: 89,
        local: "Campus Inatel",
        liked: false,
        bookmarked: false
    },
    {
        id: 3,
        titulo: "Programa de Incubação 2025",
        resumo: "Inscrições abertas para startups inovadoras. Mentoria, investimento e networking para empreendedores.",
        data: "13/12/2024",
        categoria: "Startup",
        imagem: "imagens/startups-storie.jpg",
        usuario: "inatel_startups",
        avatar: "imagens/inatelstarups.png",
        likes: 203,
        local: "Incubadora Inatel",
        liked: false,
        bookmarked: false
    },
    {
        id: 4,
        titulo: "Palestra sobre Sustentabilidade",
        resumo: "A palestra \"Além do Horizonte\" com Rogério Flausino (Jota Quest), durante a Semana do Empreendedor – Connect Summit foi um sucesso! Os alunos aproveitaram para tirar fotos com o cantor.",
        data: "12/12/2024",
        categoria: "Evento",
        imagem: "imagens/eu e jotaquest.jpeg",
        usuario: "eventos_inatel",
        avatar: "imagens/eventos.jpg",
        likes: 156,
        local: "Teatro Inatel",
        liked: false,
        bookmarked: false
    }
];

function getTimeAgo(dateString) {
    const postDate = new Date(dateString.split('/').reverse().join('-'));
    const now = new Date();
    const diffTime = Math.abs(now - postDate);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 1) return '1 DIA';
    if (diffDays < 7) return `${diffDays} DIAS`;
    if (diffDays < 30) return `${Math.floor(diffDays / 7)} SEMANAS`;
    return `${Math.floor(diffDays / 30)} MESES`;
}

function createNewsCard(noticia) {
    return `
        <div class="news-card">
            <div class="post-header">
                <img src="${noticia.avatar}" alt="${noticia.usuario}" class="post-avatar">
                <div class="post-info">
                    <p class="post-username">${noticia.usuario}</p>
                    <p class="post-location">${noticia.local}</p>
                </div>
                <div class="post-menu">
                    <span class="material-symbols-outlined">more_horiz</span>
                </div>
            </div>
            
            <img src="${noticia.imagem}" alt="${noticia.titulo}" class="news-image">
            
            <div class="news-content">
                <div class="news-actions">
                    <div class="action-left">
                        <button class="action-btn" onclick="toggleLike(${noticia.id})">
                            <span class="material-symbols-outlined">${noticia.liked ? 'favorite' : 'favorite_border'}</span>
                        </button>
                        <button class="action-btn" onclick="comment(${noticia.id})">
                            <span class="material-symbols-outlined">chat_bubble_outline</span>
                        </button>
                        <button class="action-btn" onclick="share(${noticia.id})">
                            <span class="material-symbols-outlined">send</span>
                        </button>
                    </div>
                    <button class="action-btn" onclick="bookmark(${noticia.id})">
                        <span class="material-symbols-outlined">${noticia.bookmarked ? 'bookmark' : 'bookmark_border'}</span>
                    </button>
                </div>
                
                <div class="post-stats">
                    <p class="likes-count">${noticia.likes} curtidas</p>
                </div>
                
                <div class="post-caption">
                    <span class="caption-username">${noticia.usuario}</span>
                    <span class="caption-text">${noticia.resumo} <span class="news-category">#${noticia.categoria}</span></span>
                </div>
                
                <div class="post-time">
                    HÁ ${getTimeAgo(noticia.data)}
                </div>
            </div>
        </div>
    `;
}

let filteredNoticias = [...noticias];

function loadNews() {
    const container = document.getElementById('news-container');
    if (filteredNoticias.length === 0) {
        container.innerHTML = '<div class="no-results">Nenhum post encontrado</div>';
    } else {
        container.innerHTML = filteredNoticias.map(createNewsCard).join('');
    }
}

function searchPosts() {
    const searchTerm = document.getElementById('searchInput').value.toLowerCase();
    const clearIcon = document.getElementById('clearSearch');
    
    if (searchTerm.length > 0) {
        clearIcon.style.display = 'block';
        filteredNoticias = noticias.filter(noticia => 
            noticia.titulo.toLowerCase().includes(searchTerm) ||
            noticia.resumo.toLowerCase().includes(searchTerm) ||
            noticia.categoria.toLowerCase().includes(searchTerm) ||
            noticia.usuario.toLowerCase().includes(searchTerm) ||
            noticia.local.toLowerCase().includes(searchTerm)
        );
    } else {
        clearIcon.style.display = 'none';
        filteredNoticias = [...noticias];
    }
    
    loadNews();
}

function clearSearch() {
    document.getElementById('searchInput').value = '';
    document.getElementById('clearSearch').style.display = 'none';
    filteredNoticias = [...noticias];
    loadNews();
}

function handleEnter(event) {
    if (event.key === 'Enter') {
        searchPosts();
    }
}

function showLoginModal() {
    document.getElementById('loginModal').style.display = 'flex';
}

function closeLoginModal() {
    document.getElementById('loginModal').style.display = 'none';
}

function showNotificationsModal() {
    document.getElementById('notificationsModal').style.display = 'flex';
}

function closeNotificationsModal() {
    document.getElementById('notificationsModal').style.display = 'none';
}

function showMessagesModal() {
    document.getElementById('messagesModal').style.display = 'flex';
}

function closeMessagesModal() {
    document.getElementById('messagesModal').style.display = 'none';
}

function showMorePostsModal() {
    document.getElementById('morePostsModal').style.display = 'flex';
}

function closeMorePostsModal() {
    document.getElementById('morePostsModal').style.display = 'none';
}

function toggleLike(id) {
    showLoginModal();
}

function comment(id) {
    showLoginModal();
}

function share(id) {
    showLoginModal();
}

function bookmark(id) {
    showLoginModal();
}

function showCreatePostModal() {
    document.getElementById('createPostModal').style.display = 'flex';
}

function closeCreatePostModal() {
    document.getElementById('createPostModal').style.display = 'none';
    document.getElementById('postCaption').value = '';
    document.getElementById('previewImage').style.display = 'none';
    document.querySelector('.upload-placeholder').style.display = 'block';
}

function triggerImageUpload() {
    document.getElementById('imageInput').click();
}

function attemptPublish() {
    showLoginModal();
    closeCreatePostModal();
}

const stories = [
    { username: 'Inatel', avatar: 'imagens/inatel.jpg', image: 'imagens/stories - inatel.jpeg' },
    { username: 'Eventos', avatar: 'imagens/eventos.jpg', image: 'imagens/eu e jotaquest.jpeg' },
    { username: 'Biblioteca', avatar: 'imagens/biblioteca.png', image: 'imagens/biblioteca_stories.webp' },
    { username: 'Robotbulls', avatar: 'imagens/robotbulls.jpg', image: 'imagens/robotbulls_storie.jpg' },
    { username: 'inatel_startups', avatar: 'imagens/inatelstarups.png', image: 'imagens/startups-storie.jpg' },
    { username: 'mind++', avatar: 'imagens/mind++.jpg', image: 'imagens/storie mind.jpg' },
    { username: 'CDG', avatar: 'imagens/images.png', image: 'imagens/cdg-stor.jpg' }
];

let currentStoryIndex = 0;
let storyInterval;

function openStory(index) {
    currentStoryIndex = index;
    const story = stories[currentStoryIndex];
    
    document.getElementById('storyUserAvatar').src = story.avatar;
    document.getElementById('storyUsername').textContent = story.username;
    document.getElementById('storyImage').src = story.image;
    document.getElementById('storyModal').style.display = 'flex';
    
    startStoryProgress();
}

function closeStory() {
    document.getElementById('storyModal').style.display = 'none';
    if (storyInterval) {
        clearInterval(storyInterval);
        storyInterval = null;
    }
    document.getElementById('progressBar').style.width = '0%';
}

function nextStory() {
    if (storyInterval) {
        clearInterval(storyInterval);
        storyInterval = null;
    }
    
    if (currentStoryIndex < stories.length - 1) {
        openStory(currentStoryIndex + 1);
    } else {
        closeStory();
    }
}

function previousStory() {
    if (storyInterval) {
        clearInterval(storyInterval);
        storyInterval = null;
    }
    
    if (currentStoryIndex > 0) {
        openStory(currentStoryIndex - 1);
    }
}

function startStoryProgress() {
    if (storyInterval) {
        clearInterval(storyInterval);
    }
    
    const progressBar = document.getElementById('progressBar');
    progressBar.style.width = '0%';
    
    let progress = 0;
    storyInterval = setInterval(() => {
        progress += 2;
        progressBar.style.width = progress + '%';
        
        if (progress >= 100) {
            clearInterval(storyInterval);
            storyInterval = null;
            nextStory();
        }
    }, 100);
}

document.addEventListener('DOMContentLoaded', function() {
    loadNews();
    
    const imageInput = document.getElementById('imageInput');
    if (imageInput) {
        imageInput.addEventListener('change', function(e) {
            const file = e.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = function(e) {
                    const previewImage = document.getElementById('previewImage');
                    const placeholder = document.querySelector('.upload-placeholder');
                    
                    previewImage.src = e.target.result;
                    previewImage.style.display = 'block';
                    placeholder.style.display = 'none';
                };
                reader.readAsDataURL(file);
            }
        });
    }
});