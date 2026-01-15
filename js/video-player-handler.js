// 处理B站iframe和本地MP4视频播放器的兼容性和下载防护

(function () {
    'use strict';

    // 主初始化函数
    function initVideoPlayers() {

        // ============ 1. 处理B站iframe（如果使用）============
        setTimeout(function () {
            const iframe = document.querySelector('.bilibili-iframe');
            if (iframe) {
                // 移除B站iframe可能携带的所有内联样式
                iframe.removeAttribute('width');
                iframe.removeAttribute('height');
                iframe.removeAttribute('style');

                // 强制设置iframe尺寸
                iframe.style.width = '100%';
                iframe.style.height = '100%';
            }
        }, 1000); // 延迟1秒确保B站iframe完全加载

        // 添加resize事件监听
        window.addEventListener('resize', function () {
            const iframe = document.querySelector('.bilibili-iframe');
            if (iframe) {
                iframe.style.width = '100%';
                iframe.style.height = '100%';
            }
        });

        // ============ 2. 处理本地MP4视频（如果使用）============
        const localVideo = document.getElementById('local-video');
        if (localVideo) {
            // 确保视频正确填充16:9容器
            localVideo.style.width = '100%';
            localVideo.style.height = '100%';
            localVideo.style.objectFit = 'contain';

            // 完全禁用下载功能
            // 方法1: 禁用右键菜单
            localVideo.addEventListener('contextmenu', function (e) {
                e.preventDefault();
                return false;
            });

            // 方法2: 禁用键盘快捷键
            localVideo.addEventListener('keydown', function (e) {
                // 禁止Ctrl+S (保存) 和 Ctrl+U (查看源码)
                if ((e.ctrlKey || e.metaKey) &&
                    (e.key === 's' || e.key === 'S' || e.key === 'u' || e.key === 'U')) {
                    e.preventDefault();
                    return false;
                }
            });

            // 方法3: 防止拖拽
            localVideo.addEventListener('dragstart', function (e) {
                e.preventDefault();
                return false;
            });

            // 方法4: 设置controlslist属性（针对某些浏览器）
            localVideo.setAttribute('controlslist', 'nodownload noplaybackrate');

            // 监听窗口大小变化，重新调整视频尺寸
            window.addEventListener('resize', function () {
                localVideo.style.width = '100%';
                localVideo.style.height = '100%';
            });

            console.log('本地MP4视频播放器已初始化，下载按钮已隐藏');
        }
    }

    // DOM加载完成后初始化
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initVideoPlayers);
    } else {
        // DOM已经加载完成
        initVideoPlayers();
    }

    // 导出函数（如果需要）
    window.AEGeekVideoHandler = {
        init: initVideoPlayers,
        version: '1.0.0'
    };

})();