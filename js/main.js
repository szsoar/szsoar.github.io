// 搜索功能实现
function performSearch() {
  const searchTerm = document.getElementById('search-input').value.trim();
  if (searchTerm) {
    // 从 main.js 自己的 URL 反推站点根目录
    const script = document.querySelector('script[src*="main.js"]');
    const root = script
      ? script.src.replace(/js\/main\.js.*$/, '')
      : './';

    window.location.href = root + 'search.html?q=' + encodeURIComponent(searchTerm);
  } else {
    alert('请输入搜索关键词');
  }
}

// 支持按回车键搜索
document.addEventListener('DOMContentLoaded', function () {
  const searchInput = document.getElementById('search-input');
  if (searchInput) {
    searchInput.addEventListener('keypress', function (e) {
      if (e.key === 'Enter') {
        performSearch();
      }
    });
  }
});