// 处理视频播放器：B站 iframe 尺寸 + 本地 MP4 防下载
(function () {
    'use strict';

    function initVideoPlayers() {

        // ============ 1. 处理 B站 iframe ============
        setTimeout(function () {
            const iframe = document.querySelector('.bilibili-iframe');
            if (iframe) {
                iframe.removeAttribute('width');
                iframe.removeAttribute('height');
                iframe.removeAttribute('style');
                iframe.style.width = '100%';
                iframe.style.height = '100%';
            }
        }, 1000);

        window.addEventListener('resize', function () {
            const iframe = document.querySelector('.bilibili-iframe');
            if (iframe) {
                iframe.style.width = '100%';
                iframe.style.height = '100%';
            }
        });

        // ============ 2. 本地 MP4 防下载 ============
        const localVideo = document.getElementById('local-video');
        if (localVideo) {
            localVideo.style.width = '100%';
            localVideo.style.height = '100%';
            localVideo.style.objectFit = 'contain';

            // 禁用右键菜单
            localVideo.addEventListener('contextmenu', function (e) {
                e.preventDefault();
                return false;
            });

            // 禁用 Ctrl+S / Ctrl+U
            localVideo.addEventListener('keydown', function (e) {
                if ((e.ctrlKey || e.metaKey) &&
                    (e.key === 's' || e.key === 'S' || e.key === 'u' || e.key === 'U')) {
                    e.preventDefault();
                    return false;
                }
            });

            // 防止拖拽
            localVideo.addEventListener('dragstart', function (e) {
                e.preventDefault();
                return false;
            });

            // 隐藏下载按钮
            localVideo.setAttribute('controlslist', 'nodownload noplaybackrate');

            console.log('本地MP4防下载已启用');
        }
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initVideoPlayers);
    } else {
        initVideoPlayers();
    }

    window.AEGeekVideoHandler = {
        init: initVideoPlayers,
        version: '2.0.0'
    };

})();