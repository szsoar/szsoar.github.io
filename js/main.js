// 搜索功能实现
function performSearch() {
  const searchTerm = document.getElementById('search-input').value.trim();
  if (searchTerm) {
    // 在实际应用中，这里可以跳转到搜索页面或显示搜索结果
    // 这里简单模拟搜索功能
    // alert(`搜索: ${searchTerm}\n在实际应用中，这里会显示搜索结果`);

    // 示例：跳转到搜索页面（假设有search.html）
    window.location.href = `search.html?q=${encodeURIComponent(searchTerm)}`;
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