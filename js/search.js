// ============================================
// 搜索页面功能
// 数据来源：js/search-data.js（由 build-index.mjs 生成）
// ============================================

// 当前搜索状态
let currentSearchState = {
  query: "",
  page: 1,
  results: [],
  totalResults: 0
};

document.addEventListener('DOMContentLoaded', function () {
  // 从URL获取搜索参数
  const urlParams = new URLSearchParams(window.location.search);
  const searchQuery = urlParams.get('q');

  if (searchQuery && searchQuery.trim() !== "") {
    document.getElementById('search-input').value = searchQuery;
    performSearch();
  }

  // 分页功能
  document.getElementById('prev-page').addEventListener('click', function (e) {
    e.preventDefault();
    if (currentSearchState.page > 1) {
      currentSearchState.page--;
      renderResults();
    }
  });

  document.getElementById('next-page').addEventListener('click', function (e) {
    e.preventDefault();
    const totalPages = Math.ceil(currentSearchState.totalResults / 10);
    if (currentSearchState.page < totalPages) {
      currentSearchState.page++;
      renderResults();
    }
  });

  // 支持按回车键搜索
  document.getElementById('search-input').addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
      performSearch();
    }
  });
});

// 执行搜索
function performSearch() {
  const searchTerm = document.getElementById('search-input').value.trim();

  if (!searchTerm) {
    showNoResults("请输入搜索关键词");
    return;
  }

  currentSearchState.query = searchTerm;
  currentSearchState.page = 1;

  const results = mockSearch(searchTerm);

  if (results.length === 0) {
    showNoResults(`没有找到与 "${searchTerm}" 相关的结果`);
  } else {
    currentSearchState.results = results;
    currentSearchState.totalResults = results.length;
    renderResults();

    // 更新URL
    const newUrl = `${window.location.pathname}?q=${encodeURIComponent(searchTerm)}`;
    window.history.pushState({ path: newUrl }, '', newUrl);
  }
}

// ============================================
// 模糊搜索：匹配 title / description / content / categoryName
// 支持多关键词（空格分隔，全部命中才算）
// ============================================
function mockSearch(query) {
  const q = query.toLowerCase().trim();
  if (!q) return [];

  // 数据没加载完时兜底
  if (typeof mockDatabase === 'undefined') {
    console.error('mockDatabase 未加载，请检查 js/search-data.js 是否引入');
    return [];
  }

  const terms = q.split(/\s+/).filter(Boolean);
  const results = [];

  for (const items of Object.values(mockDatabase)) {
    for (const item of items) {
      const text = [
        item.title,
        item.description,
        item.content,
        item.categoryName
      ].filter(Boolean).join(' ').toLowerCase();

      if (terms.every(t => text.includes(t))) {
        results.push(item);
      }
    }
  }

  return results;
}

// 显示无结果
function showNoResults(message) {
  const resultsContainer = document.getElementById('results-container');
  resultsContainer.innerHTML = `
        <div class="no-results">
            <div class="no-results-content">
                <h3>${message}</h3>
                <p>请尝试其他关键词或浏览我们的热门内容</p>
                <div class="search-tips">
                    <h4>搜索提示：</h4>
                    <ul>
                        <li>尝试使用更具体的关键词</li>
                        <li>检查拼写是否正确</li>
                        <li>使用多个关键词组合搜索</li>
                    </ul>
                </div>
            </div>
        </div>
    `;

  document.getElementById('results-count').textContent = message;
  document.getElementById('pagination').style.display = 'none';
}

// 渲染搜索结果
function renderResults() {
  const resultsContainer = document.getElementById('results-container');
  const resultsCount = document.getElementById('results-count');
  const pagination = document.getElementById('pagination');

  if (currentSearchState.totalResults === 0) {
    showNoResults(`没有找到与 "${currentSearchState.query}" 相关的结果`);
    return;
  }

  // 分页逻辑
  const itemsPerPage = 10;
  const startIndex = (currentSearchState.page - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, currentSearchState.totalResults);
  const currentPageResults = currentSearchState.results.slice(startIndex, endIndex);

  // 生成HTML
  let html = '<div class="articles-list">';

  currentPageResults.forEach(item => {
    if (item.category === 'downloads') {
      html += `
                <div class="download-list-item">
                    <div class="download-list-header">
                        <div class="download-list-icon">${item.type === 'plugin' ? '🧩' : '🎬'}</div>
                        <h3 class="download-list-title">${item.title}</h3>
                    </div>
                    <p class="download-list-desc">${item.description}</p>
                    <div class="download-list-meta">
                        <span class="download-list-info">大小: ${item.size} · 下载: ${item.downloads}次</span>
                        <a href="${item.url}" class="download-list-btn">下载</a>
                    </div>
                </div>
            `;
    } else {
      html += `
                <article class="list-item">
                    <div class="list-item-header">
                        <span class="list-item-category">${item.categoryName}</span>
                        <span class="list-item-date">${item.date || ''}</span>
                    </div>
                    <h3 class="list-item-title"><a href="${item.url}">${item.title}</a></h3>
                    <p class="list-item-desc">${item.description}</p>                    
                </article>
            `;
    }
  });

  html += '</div>';

  resultsContainer.innerHTML = html;
  resultsCount.innerHTML = `找到 <strong>${currentSearchState.totalResults}</strong> 个与 "<strong>${currentSearchState.query}</strong>" 相关的结果`;

  // 显示分页
  if (currentSearchState.totalResults > itemsPerPage) {
    pagination.style.display = 'block';
    renderPagination();
  } else {
    pagination.style.display = 'none';
  }
}

// 渲染分页控件
function renderPagination() {
  const itemsPerPage = 10;
  const totalPages = Math.ceil(currentSearchState.totalResults / itemsPerPage);
  const pageNumbers = document.getElementById('page-numbers');
  const prevButton = document.getElementById('prev-page');
  const nextButton = document.getElementById('next-page');

  // 更新上一页/下一页按钮状态
  prevButton.classList.toggle('disabled', currentSearchState.page === 1);
  nextButton.classList.toggle('disabled', currentSearchState.page === totalPages);

  // 生成页码
  let paginationHtml = '';
  const maxVisiblePages = 5;
  let startPage = Math.max(1, currentSearchState.page - Math.floor(maxVisiblePages / 2));
  let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

  if (endPage - startPage + 1 < maxVisiblePages) {
    startPage = Math.max(1, endPage - maxVisiblePages + 1);
  }

  if (startPage > 1) {
    paginationHtml += `<a href="#" class="page-num" data-page="1">1</a>`;
    if (startPage > 2) {
      paginationHtml += `<span class="page-dots">...</span>`;
    }
  }

  for (let i = startPage; i <= endPage; i++) {
    paginationHtml += `<a href="#" class="page-num ${i === currentSearchState.page ? 'active' : ''}" data-page="${i}">${i}</a>`;
  }

  if (endPage < totalPages) {
    if (endPage < totalPages - 1) {
      paginationHtml += `<span class="page-dots">...</span>`;
    }
    paginationHtml += `<a href="#" class="page-num" data-page="${totalPages}">${totalPages}</a>`;
  }

  pageNumbers.innerHTML = paginationHtml;

  // 添加页码点击事件
  document.querySelectorAll('.page-num').forEach(button => {
    button.addEventListener('click', function (e) {
      e.preventDefault();
      if (!this.classList.contains('active')) {
        currentSearchState.page = parseInt(this.dataset.page);
        renderResults();
      }
    });
  });
}