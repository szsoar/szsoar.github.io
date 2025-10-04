// 只用于引入页脚的简单脚本
function includeFooter() {
  const footerElements = document.querySelectorAll('[data-include-footer]');

  footerElements.forEach(element => {
    const file = element.getAttribute('data-include-footer');
    if (file) {
      fetch(file)
        .then(response => {
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          return response.text();
        })
        .then(data => {
          element.outerHTML = data;
        })
        .catch(error => {
          console.error('加载页脚失败:', error);
          element.innerHTML = `<p>加载页脚失败</p>`;
        });
    }
  });
}

document.addEventListener('DOMContentLoaded', includeFooter);