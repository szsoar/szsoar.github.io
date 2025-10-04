// js/article.js - 文章详情页功能

document.addEventListener('DOMContentLoaded', function () {
  // 初始化文章页面功能
  initArticlePage();
});

/**
 * 初始化文章页面功能
 */
function initArticlePage() {
  // 1. 代码块语法高亮
  highlightCodeBlocks();

  // 2. 图片灯箱效果
  initImageLightbox();

  // 3. 目录导航（如果有的话）
  initTableOfContents();

  // 4. 分享功能
  initShareButtons();

  // 5. 阅读进度指示器
  initReadingProgress();

  // 6. 相关文章交互
  initRelatedArticles();
}

/**
 * 代码块语法高亮（简单版本）
 * 实际项目中可以集成Prism.js或Highlight.js
 */
function highlightCodeBlocks() {
  const codeBlocks = document.querySelectorAll('pre code');
  codeBlocks.forEach(block => {
    // 添加行号（可选）
    const lines = block.textContent.split('\n');
    if (lines.length > 1) {
      block.innerHTML = lines.map((line, index) =>
        `<span class="line-number">${index + 1}</span>${escapeHtml(line)}`
      ).join('\n');
    }

    // 添加复制按钮
    const copyButton = document.createElement('button');
    copyButton.className = 'copy-code-btn';
    copyButton.innerHTML = '复制';
    copyButton.addEventListener('click', () => copyToClipboard(block.textContent));

    const pre = block.parentElement;
    pre.style.position = 'relative';
    pre.appendChild(copyButton);
  });
}

/**
 * 初始化图片灯箱效果
 */
function initImageLightbox() {
  const images = document.querySelectorAll('.tip-image img, .article-cover');
  images.forEach(img => {
    img.style.cursor = 'zoom-in';
    img.addEventListener('click', function () {
      openLightbox(this.src, this.alt);
    });
  });
}

/**
 * 打开图片灯箱
 */
function openLightbox(src, alt) {
  const lightbox = document.createElement('div');
  lightbox.className = 'lightbox';
  lightbox.innerHTML = `
        <div class="lightbox-content">
            <img src="${src}" alt="${alt}">
            <span class="lightbox-close">&times;</span>
            <div class="lightbox-caption">${alt}</div>
        </div>
    `;

  document.body.appendChild(lightbox);
  document.body.style.overflow = 'hidden';

  // 关闭灯箱
  lightbox.addEventListener('click', function (e) {
    if (e.target === lightbox || e.target.classList.contains('lightbox-close')) {
      document.body.removeChild(lightbox);
      document.body.style.overflow = '';
    }
  });
}

/**
 * 初始化目录导航
 */
function initTableOfContents() {
  const headings = document.querySelectorAll('.article-body h2, .article-body h3');
  if (headings.length > 3) {
    createTableOfContents(headings);
  }
}

/**
 * 创建目录
 */
function createTableOfContents(headings) {
  const toc = document.createElement('div');
  toc.className = 'table-of-contents';
  toc.innerHTML = '<h4>目录</h4><ul>' +
    Array.from(headings).map(heading =>
      `<li class="toc-${heading.tagName.toLowerCase()}">
                <a href="#${heading.id || heading.textContent.replace(/\s+/g, '-').toLowerCase()}">
                    ${heading.textContent}
                </a>
            </li>`
    ).join('') +
    '</ul>';

  const articleBody = document.querySelector('.article-body');
  articleBody.insertBefore(toc, articleBody.firstChild);

  // 为标题添加ID（如果没有的话）
  headings.forEach(heading => {
    if (!heading.id) {
      heading.id = heading.textContent.replace(/\s+/g, '-').toLowerCase();
    }
  });
}

/**
 * 初始化分享按钮功能
 */
function initShareButtons() {
  const shareButtons = document.querySelectorAll('.share-btn');
  shareButtons.forEach(btn => {
    btn.addEventListener('click', function () {
      const platform = this.className.replace('share-btn ', '');
      shareArticle(platform);
    });
  });
}

/**
 * 分享文章到不同平台
 */
function shareArticle(platform) {
  const title = document.title;
  const url = window.location.href;

  let shareUrl = '';
  switch (platform) {
    case 'wechat':
      // 微信分享需要特殊处理，通常使用二维码
      alert('请使用微信扫描二维码分享');
      break;
    case 'weibo':
      shareUrl = `https://service.weibo.com/share/share.php?url=${encodeURIComponent(url)}&title=${encodeURIComponent(title)}`;
      break;
    case 'qq':
      shareUrl = `https://connect.qq.com/widget/shareqq/index.html?url=${encodeURIComponent(url)}&title=${encodeURIComponent(title)}`;
      break;
  }

  if (shareUrl) {
    window.open(shareUrl, '_blank', 'width=600,height=400');
  }
}

/**
 * 初始化阅读进度指示器
 */
function initReadingProgress() {
  const progressBar = document.createElement('div');
  progressBar.className = 'reading-progress';
  document.body.appendChild(progressBar);

  window.addEventListener('scroll', function () {
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const scrollPercent = (scrollTop / (documentHeight - windowHeight)) * 100;

    progressBar.style.width = scrollPercent + '%';
  });
}

/**
 * 初始化相关文章交互
 */
function initRelatedArticles() {
  const relatedItems = document.querySelectorAll('.related-item');
  relatedItems.forEach(item => {
    item.addEventListener('mouseenter', function () {
      this.style.transform = 'translateY(-5px)';
    });

    item.addEventListener('mouseleave', function () {
      this.style.transform = 'translateY(0)';
    });
  });
}

/**
 * 复制到剪贴板
 */
function copyToClipboard(text) {
  navigator.clipboard.writeText(text).then(() => {
    alert('代码已复制到剪贴板！');
  }).catch(err => {
    console.error('复制失败:', err);
  });
}

/**
 * HTML转义
 */
function escapeHtml(html) {
  const div = document.createElement('div');
  div.textContent = html;
  return div.innerHTML;
}

/**
 * 平滑滚动到锚点
 */
function smoothScrollToAnchor() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });
}

// 导出函数（如果使用模块化）
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    initArticlePage,
    highlightCodeBlocks,
    initImageLightbox
  };
}