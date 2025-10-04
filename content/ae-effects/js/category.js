// 分类页面功能
document.addEventListener('DOMContentLoaded', function () {
  console.log('DOM loaded, initializing category page...');

  // 分页配置
  const itemsPerPage = 10;
  let currentPage = 1;
  const totalPages = Math.ceil(aeEffectsArticles.length / itemsPerPage);

  // 初始化页面
  renderArticles();
  setupPagination();

  // 渲染文章函数
  function renderArticles() {
    console.log('Rendering articles for page:', currentPage);
    const container = document.getElementById('articles-container');

    if (!container) {
      console.error('Articles container not found!');
      return;
    }

    container.innerHTML = '';

    // 计算当前页的文章范围
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = Math.min(startIndex + itemsPerPage, aeEffectsArticles.length);

    // 创建文章卡片
    for (let i = startIndex; i < endIndex; i++) {
      const article = aeEffectsArticles[i];
      const articleElement = createArticleCard(article);
      container.appendChild(articleElement);
    }
  }

  // 创建文章卡片HTML
  function createArticleCard(article) {
    const articleEl = document.createElement('article');
    articleEl.className = 'article-card';

    articleEl.innerHTML = `
            <div class="card-img">
                <a href="${article.url}">
                    <img src="${article.image}" alt="${article.title}" loading="lazy">
                </a>
            </div>
            <div class="card-content">
                <span class="category">${article.category}</span>
                <h3><a href="${article.url}">${article.title}</a></h3>
                <p>${article.description}</p>
                <a href="${article.url}" class="read-more">
                    阅读更多
                    <svg class="read-more-icon" viewBox="0 0 24 24">
                        <path d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z" />
                    </svg>
                </a>
                <div class="card-meta">
                    <span>${article.date}</span>
                </div>
            </div>
        `;

    return articleEl;
  }

  // 设置分页功能
  function setupPagination() {
    console.log('Setting up pagination...');
    const paginationContainer = document.getElementById('pagination');

    if (!paginationContainer) {
      console.error('Pagination container not found!');
      return;
    }

    paginationContainer.innerHTML = '';

    // 添加上一页按钮
    const prevButton = document.createElement('button');
    prevButton.className = 'pagination-button';
    prevButton.innerHTML = '&laquo; 上一页';
    prevButton.disabled = currentPage === 1;
    prevButton.addEventListener('click', () => {
      if (currentPage > 1) {
        currentPage--;
        renderArticles();
        setupPagination();
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    });
    paginationContainer.appendChild(prevButton);

    // 添加页码组容器
    const pagesContainer = document.createElement('div');
    pagesContainer.className = 'pagination-pages';
    paginationContainer.appendChild(pagesContainer);

    // 添加页码按钮
    const maxVisiblePages = 5;
    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

    // 调整起始页，确保显示最大可见页码数
    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    // 添加第一页和省略号（如果需要）
    if (startPage > 1) {
      const firstPageButton = document.createElement('button');
      firstPageButton.className = 'pagination-button';
      firstPageButton.innerText = '1';
      firstPageButton.addEventListener('click', () => {
        currentPage = 1;
        renderArticles();
        setupPagination();
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });
      pagesContainer.appendChild(firstPageButton);

      if (startPage > 2) {
        const ellipsis = document.createElement('span');
        ellipsis.className = 'pagination-ellipsis';
        ellipsis.innerText = '...';
        pagesContainer.appendChild(ellipsis);
      }
    }

    // 添加页码按钮
    for (let i = startPage; i <= endPage; i++) {
      const pageButton = document.createElement('button');
      pageButton.className = 'pagination-button';
      pageButton.innerText = i;
      if (i === currentPage) {
        pageButton.classList.add('active');
      }
      pageButton.addEventListener('click', () => {
        currentPage = i;
        renderArticles();
        setupPagination();
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });
      pagesContainer.appendChild(pageButton);
    }

    // 添加最后一页和省略号（如果需要）
    if (endPage < totalPages) {
      if (endPage < totalPages - 1) {
        const ellipsis = document.createElement('span');
        ellipsis.className = 'pagination-ellipsis';
        ellipsis.innerText = '...';
        pagesContainer.appendChild(ellipsis);
      }

      const lastPageButton = document.createElement('button');
      lastPageButton.className = 'pagination-button';
      lastPageButton.innerText = totalPages;
      lastPageButton.addEventListener('click', () => {
        currentPage = totalPages;
        renderArticles();
        setupPagination();
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });
      pagesContainer.appendChild(lastPageButton);
    }

    // 添加下一页按钮
    const nextButton = document.createElement('button');
    nextButton.className = 'pagination-button';
    nextButton.innerHTML = '下一页 &raquo;';
    nextButton.disabled = currentPage === totalPages;
    nextButton.addEventListener('click', () => {
      if (currentPage < totalPages) {
        currentPage++;
        renderArticles();
        setupPagination();
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    });
    paginationContainer.appendChild(nextButton);

    console.log('Pagination setup complete');
  }
});