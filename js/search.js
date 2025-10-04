// 搜索页面功能

// 模拟数据库
const mockDatabase = {
  "特效": [
    {
      id: 1,
      title: "摄像机运镜技巧：伏羲训六畜",
      category: "effects",
      categoryName: "AE特效",
      date: "2025-07-08",
      description: "展示如何通过AE摄像机以及相关技巧制作丝滑流畅的运镜效果...",
      reads: 1245,
      likes: 328,
      favorites: 512,
      url: "./content/ae-effects/article-1.html"
    },
  ],
  "表达": [
    {
      id: 1,
      title: "表达式保姆级教程零基础15模块实战",
      category: "expressions",
      categoryName: "AE表达式",
      date: "2024-09-15",
      description: "全网最系统的表达式入门指南！小白也能三天上手自动化动画！",
      reads: 2890,
      likes: 512,
      favorites: 723,
      url: "./content/ae-expressions/article-1.html"
    },
    {
      id: 2,
      title: "表达式保姆级教程之导言",
      category: "expressions",
      categoryName: "AE表达式",
      date: "2024-10-15",
      description: "学习如何使用表达式创建复杂的动态动画效果，提升项目水平...",
      reads: 2578,
      likes: 702,
      favorites: 519,
      url: "./content/ae-expressions/article-2.html"
    },
    {
      id: 3,
      title: "表达式保姆级教程第一章第一节",
      category: "expressions",
      categoryName: "AE表达式",
      date: "2024-10-15",
      description: "表达式的概念及添加...",
      reads: 1406,
      likes: 598,
      favorites: 462,
      url: "./content/ae-expressions/article-3.html"
    },
  ],
  "脚本": [
    {
      id: 1,
      title: "AE脚本开发零基础入门教程之片头介绍",
      category: "scripting",
      categoryName: "AE脚本",
      date: "2025-02-03",
      description: "学习如何编写自己的AE脚本，自动化重复任务并提高工作效率。",
      reads: 1342,
      likes: 387,
      favorites: 498,
      url: "./content/ae-scripting/article-1.html"
    },
    {
      id: 2,
      title: "AE脚本开发教程之第一章第一节",
      category: "scripting",
      categoryName: "AE脚本",
      date: "2025-02-06",
      description: "学习AE脚本基础知识，了解什么是AE脚本...。",
      reads: 1765,
      likes: 432,
      favorites: 567,
      url: "./content/ae-scripting/article-2.html"
    },
    {
      id: 3,
      title: "AE脚本开发教程之第一章第二节",
      category: "scripting",
      categoryName: "AE脚本",
      date: "2025-02-10",
      description: "学习AE脚本基础知识，了解脚本、表达式和插件的区别...",
      reads: 1355,
      likes: 765,
      favorites: 787,
      url: "./content/ae-scripting/article-3.html"
    },
    {
      id: 4,
      title: "AE脚本开发教程之第一章第三节",
      category: "scripting",
      categoryName: "AE脚本",
      date: "2025-02-17",
      description: "学习AE脚本基础知识，配置AE脚本的开发环境",
      reads: 4358,
      likes: 968,
      favorites: 988,
      url: "./content/ae-scripting/article-3.html"
    },
    {
      id: 5,
      title: "AE脚本开发教程之第一章第四节",
      category: "scripting",
      categoryName: "AE脚本",
      date: "2025-02-24",
      description: "学习AE脚本基础知识，输出第一个hello world脚本",
      reads: 3427,
      likes: 861,
      favorites: 743,
      url: "./content/ae-scripting/article-3.html"
    },
  ],
  "插件": [
    {
      id: 1,
      title: "UXP插件开发入门指南(待更新)",
      category: "plugins",
      categoryName: "AE插件",
      date: "2025-09-29",
      description: "探索Adobe新一代UXP平台，学习现代化AE插件开发技术...",
      reads: 985,
      likes: 267,
      favorites: 389,
      url: "./content/ae-plugins/article-lead.html"
    },
  ],
  "下载": [
    {
      id: 1,
      title: "AE表达式自学神器",
      category: "downloads",
      categoryName: "资源下载",
      description: "原创AE脚本，一键查询内置表达式功能说明并配备用法示例，支持快速为选中图层属性添加自定义表达式，提升表达式编辑效率，适合动画师与特效师使用。",
      size: "732KB",
      downloads: 1242,
      url: "https://pan.baidu.com/s/1lZpOiRXh2hfYZO0wi2v3ow?pwd=4uf3",
      type: "template"
    },
  ],
  "粒": [

  ],
};

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

  // 模拟搜索
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

// 模拟搜索函数
function mockSearch(query) {
  const results = [];

  // 检查数据库中的每个关键词
  for (const [keyword, items] of Object.entries(mockDatabase)) {
    if (query.toLowerCase().includes(keyword.toLowerCase())) {
      results.push(...items);
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
                        <span class="list-item-date">${item.date}</span>
                    </div>
                    <h3 class="list-item-title"><a href="${item.url}">${item.title}</a></h3>
                    <p class="list-item-desc">${item.description}</p>
                    <div class="list-item-meta">
                        <span>阅读 ${item.reads}</span>
                        <span>点赞 ${item.likes}</span>
                        <span>收藏 ${item.favorites}</span>
                    </div>
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