// 专门用于引入页头的简单逻辑
document.addEventListener('DOMContentLoaded', () => {
    const headerElements = document.querySelectorAll('[data-include-header]');

    headerElements.forEach(element => {
        const file = element.getAttribute('data-include-header');
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
                    highlightActiveNav(); // 注入后执行高亮
                })
                .catch(error => {
                    console.error('加载页头失败:', error);
                    element.innerHTML = `<p>加载页头失败</p>`;
                });
        }
    });
});

// 自动高亮导航
function highlightActiveNav() {
    // 获取当前页面路径，例如 /content/ae-effects/index.html
    let currentPath = window.location.pathname;

    if (currentPath === '/') {
        currentPath = '/index.html';
    }

    const navLinks = document.querySelectorAll('.nav-links a[data-path]');

    navLinks.forEach(link => {
        const linkPath = link.getAttribute('data-path');

        // 如果当前路径完全匹配，或者子页面包含该目录
        if (currentPath === linkPath || (linkPath !== '/index.html' && currentPath.includes(linkPath))) {
            link.classList.add('active');
        }
    });
}