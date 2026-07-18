// ========== 配置二维码列表 ==========
const qrList = [
    { src: '/assets/contact/qrcode_bilibili.png', name: 'Bilibili课堂' },
    { src: '/assets/contact/qrcode_kefu.png', name: 'QQ购买咨询' }
];
// ========================================

(function () {
    // 1. 定义每个浮窗的样式（独立注入）
    var style = document.createElement('style');
    style.textContent = `
        .qr-float-item {
            position: fixed;
            right: 30px;
            width: 160px;
            background: #ffffff;
            border-radius: 12px;
            box-shadow: 0 4px 20px rgba(0,0,0,0.15);
            padding: 15px 12px 12px 12px;
            z-index: 9999;
            text-align: center;
            border: 1px solid #e8e8e8;
            font-family: Arial, sans-serif;
            transition: opacity 0.2s;
        }
        .qr-float-item .close-btn {
            position: absolute;
            top: 4px;
            right: 10px;
            font-size: 20px;
            font-weight: bold;
            color: #ccc;
            cursor: pointer;
            line-height: 1;
        }
        .qr-float-item .close-btn:hover {
            color: #333;
        }
        .qr-float-item img {
            width: 130px;
            height: 130px;
            display: block;
            margin: 0 auto;
            border-radius: 4px;
            object-fit: contain;
        }
        .qr-float-item .label {
            font-size: 12px;
            color: #666;
            margin-top: 6px;
            display: block;
        }
        /* 手机适配 */
        @media (max-width: 480px) {
            .qr-float-item {
                width: 120px;
                right: 15px;
                padding: 10px 8px 8px 8px;
            }
            .qr-float-item img {
                width: 100px;
                height: 100px;
            }
        }
    `;
    document.head.appendChild(style);

    // 2. 为每个二维码生成独立浮窗
    const itemHeight = 190; // 每个卡片占用的高度（含间距）
    const baseBottom = 30;  // 最下面一个卡片的 bottom 值

    qrList.forEach((item, index) => {
        // 计算当前卡片的位置：最下面的 index=0，往上依次增加
        const bottomOffset = baseBottom + index * itemHeight;

        var container = document.createElement('div');
        container.className = 'qr-float-item';
        container.style.bottom = bottomOffset + 'px';

        // 生成内容
        container.innerHTML = `
            <span class="close-btn" onclick="this.parentElement.style.display='none';">&times;</span>
            <img src="${item.src}" alt="${item.name}">
            <span class="label">${item.name}</span>
        `;

        document.body.appendChild(container);
    });

    // 3.（可选）记忆关闭状态：如果希望每个独立记住关闭状态，需要更复杂逻辑，这里暂不实现
    // 如需启用，可以给每个容器加 data-id，用 localStorage 存储数组
})();