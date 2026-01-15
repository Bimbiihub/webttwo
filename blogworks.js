// HERO POST
const heroSection = document.getElementById("hero-post");
const firstPost = blogPosts[0];

heroSection.innerHTML = `
  <div class="hero-article-content">
    <div class=hero-article-text>
      <h2>${firstPost.title}<i class="fa-solid fa-thumbtack"></i></h2>
      <p>${firstPost.content}</p>
    </div>
    <div>
      <img src="${firstPost.image}" alt="${firstPost.title}">
    </div>
  </div>
`;

heroSection.style.backgroundImage = `url('${firstPost.image}')`;

// BLOG GRID (rest of the posts)
const blogGrid = document.getElementById("blog-posts");

// Skip the first one because it's already shown as hero
blogPosts.slice(1).forEach((post) => {
  const postElement = document.createElement("div");
  postElement.classList.add("card");
  postElement.innerHTML = `
    
  <div class=card-whole>
    <div class="card-content">
      <div>  
        <h3>${post.title}</h3>
        <p>${post.content}</p>
      </div>
      <div>  
        <span class="date">${post.date}</span>
      </div>
    </div>
    <div class="card-img">
      <img src="${post.image}" alt="${post.title}">
    </div>
  </div>
  `;
  blogGrid.appendChild(postElement);
});
