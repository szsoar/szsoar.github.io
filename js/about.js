// 关于页面功能
document.addEventListener('DOMContentLoaded', function () {
  // 加载Markdown内容
  loadMarkdownContent();

  // 图片加载失败处理
  handleImageErrors();
});

// 加载Markdown内容
function loadMarkdownContent() {
  const markdownContainer = document.getElementById('markdown-content');

  // 这里可以使用fetch API从服务器加载Markdown文件
  // 或者直接使用转换后的HTML内容

  // 示例：直接设置HTML内容
  const aboutContent = `
        
        
        <p>AE极客工坊成立于2010年，是一个专注于After Effects教程、技巧和资源分享的专业平台。我们致力于帮助设计师、视频制作人员和开发者提升技能，探索After Effects的无限可能。</p>
        
        <h3>我们的使命</h3>
        
        <p>我们的使命是建立一个高质量的After Effects学习社区，提供：</p>
        
        <ul>
            <li><strong>专业教程</strong>：从基础到高级的AE技巧</li>
            <li><strong>实用资源</strong>：脚本、插件、模板等资源下载</li>
            <li><strong>技术分享</strong>：AE表达式、脚本和插件开发指南</li>
            <li><strong>社区交流</strong>：与同行交流经验和技巧</li>
        </ul>
        
        <h3>我们的特色</h3>
        
        <p>与其他AE教程网站不同，AE极客工坊专注于：</p>
        
        <blockquote>
            <p>深入技术底层，不仅教你如何使用After Effects，更教你理解其工作原理，甚至扩展其功能。</p>
        </blockquote>
        
        <p>我们的内容包括：</p>
        
        <ol>
            <li>AE特效的商业化制作</li>
            <li>AE表达式高级应用</li>
            <li>ExtendScript脚本开发</li>
            <li>UXP插件开发指南</li>
            <li>跨软件工作流优化</li>
        </ol>
        
        <h3>加入我们</h3>
        
        <p>无论你是After Effects初学者还是资深用户，都能在AE极客工坊找到有价值的内容。欢迎加入我们的社区，一起探索After Effects的无限可能！</p>
        
        <p><h3>如果您有任何问题或好的建议，请通过侧边栏联系我们。</h3></p>
    `;

  // 设置内容
  markdownContainer.innerHTML = aboutContent;
}

// 图片加载失败处理
function handleImageErrors() {
  const images = document.querySelectorAll('img');
  const placeholder = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZGRkZGRkIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtc2l6ZT0iMTgiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSIuM2VtIiBmaWxsPSIjOTk5Ij7lm77niYc8L3RleHQ+PC9zdmc+';

  images.forEach(img => {
    img.onerror = function () {
      this.src = placeholder;
      this.alt = '图片加载失败';
    };
  });
}

// 如果需要从外部文件加载Markdown内容
function loadMarkdownFromFile(filePath) {
  fetch(filePath)
    .then(response => response.text())
    .then(markdown => {
      // 使用Marked.js或其他库将Markdown转换为HTML
      // const htmlContent = marked.parse(markdown);
      // document.getElementById('markdown-content').innerHTML = htmlContent;
    })
    .catch(error => {
      console.error('加载Markdown文件失败:', error);
      document.getElementById('markdown-content').innerHTML =
        '<p class="error">加载内容失败，请稍后重试。</p>';
    });
}