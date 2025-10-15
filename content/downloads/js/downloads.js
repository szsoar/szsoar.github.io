// 下载页面功能
document.addEventListener('DOMContentLoaded', function () {
  console.log('DOM loaded, initializing downloads page...');

  // 分页配置
  const itemsPerPage = 4; // 每页显示8个项目
  let currentPage = 1;
  let currentFilter = 'all';
  let totalPages = 1;

  // 初始化页面
  renderDownloads();
  setupFilters();
  setupPagination();

  // 渲染下载项目函数
  function renderDownloads() {
    console.log('Rendering downloads with filter:', currentFilter, 'page:', currentPage);
    const container = document.getElementById('downloads-container');

    if (!container) {
      console.error('Downloads container not found!');
      return;
    }

    container.innerHTML = '';

    // 过滤下载项目
    const filteredDownloads = currentFilter === 'all'
      ? downloadsData
      : downloadsData.filter(item => item.category === currentFilter);

    // 计算总页数
    totalPages = Math.ceil(filteredDownloads.length / itemsPerPage);
    if (totalPages === 0) totalPages = 1;

    // 计算当前页的项目范围
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = Math.min(startIndex + itemsPerPage, filteredDownloads.length);

    // 创建下载项目卡片
    for (let i = startIndex; i < endIndex; i++) {
      const download = filteredDownloads[i];
      const downloadElement = createDownloadCard(download);
      container.appendChild(downloadElement);
    }

    // 更新分页控件
    setupPagination();
  }

  // 创建下载项目卡片HTML - 修复按钮布局版本
  function createDownloadCard(download) {
    const downloadEl = document.createElement('div');
    downloadEl.className = 'download-item';

    const priceClass = download.priceType === '免费' ? 'free' : 'paid';

    // 生成二维码提示框HTML（仅收费资源需要）
    const qrTooltipHTML = download.priceType === '收费' ?
      `<div class="qr-tooltip">
            <img src="${download.qrCode}" alt="联系作者二维码">
            <p>扫描二维码联系作者购买</p>
         </div>` : '';

    // 生成按钮HTML - 现在包含在按钮容器中
    const buttonHTML = download.priceType === '免费' ?
      `<a href="${download.url}" class="download-btn free-btn" target="_blank" rel="noopener noreferrer">立即下载</a>` :
      `<button class="download-btn paid-btn">
            ${qrTooltipHTML}
            联系购买
         </button>`;

    downloadEl.innerHTML = `
        <span class="price-tag ${priceClass}">${download.priceType}</span>
        
        <div class="download-icon">${download.icon}</div>
        <h3>${download.title}</h3>
        <p>${download.description}</p>
        
        <div class="price-display">
            ${download.priceType === '收费' ? `<span class="price-amount">${download.price}</span>` : ''}
        </div>
        
        <div class="download-meta">
            <span>${download.fileSize}</span>
            <span>${download.version}</span>
            <span>${download.downloadCount} 次下载</span>
        </div>
        
        <!-- 新增按钮容器 -->
        <div class="download-btn-container">
            ${buttonHTML}
        </div>
    `;

    return downloadEl;
  }

  // 设置分类筛选功能
  function setupFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');

    filterButtons.forEach(button => {
      button.addEventListener('click', function () {
        // 移除所有按钮的active类
        filterButtons.forEach(btn => btn.classList.remove('active'));

        // 为当前按钮添加active类
        this.classList.add('active');

        // 获取筛选条件并重新渲染
        currentFilter = this.getAttribute('data-filter');
        currentPage = 1; // 重置为第一页
        renderDownloads();
      });
    });
  }

  // 设置分页功能
  function setupPagination() {
    const paginationContainer = document.getElementById('pagination');
    if (!paginationContainer) return;

    paginationContainer.innerHTML = '';

    // 如果只有一页，则不显示分页
    if (totalPages <= 1) return;

    // 添加上一页按钮
    const prevButton = document.createElement('button');
    prevButton.className = 'pagination-button';
    prevButton.innerHTML = '&laquo; 上一页';
    prevButton.disabled = currentPage === 1;
    prevButton.addEventListener('click', () => {
      if (currentPage > 1) {
        currentPage--;
        renderDownloads();
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
        renderDownloads();
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
        renderDownloads();
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
        renderDownloads();
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
        renderDownloads();
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    });
    paginationContainer.appendChild(nextButton);
  }
});