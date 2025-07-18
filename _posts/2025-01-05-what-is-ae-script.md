---
layout: post
title: "After Effects脚本开发入门教程概述"
date: 2025-01-05 14:00:00 +0800  
categories: [AE脚本开发]
tags: [ae,ExtendScript,jsx]
subtitle: "什么是AE脚本"
header-img: "img/post-bg.jpg"  
---



**这是本套教程第一章的第一节，从基础概念什么是AE脚本开始讲起**

**一句话定义：**
AE脚本是用Adobe ExtendScript 语言代码编写的程序，专门用来自动化操作After Effects软件

**通俗理解：**

- ExtendScript = JavaScript（基础） + Adobe扩展（特殊能力）
- 就像「粤语是汉语的一种方言」，ExtendScript本质是JavaScript的扩展

**关键特征：**

- **文件格式**：`.jsx` `.jsxbin`扩展名的文本文件
- **打开方式**：通过AE菜单 `文件 > 脚本 > 运行脚本文件` 调用、.../script/、UI脚本通过windows打开
- **作用范围**：可以控制AE中98%的手动操作（创建/修改合成、图层、关键帧、特效等）

**典型应用场景：**

1. 批量处理：同时修改100个图层的名字/颜色/位置
2. 模板自动化：根据Excel数据自动生成动态信息图
3. 复杂动画：一键创建粒子扩散/文字序列动画
4. 规范检查：自动检测工程中的分辨率/帧率错误

**举个例子：**
当你要给50个图层统一添加「缩放从0到100%」的动画，手动操作需要：

1. 逐个选中图层
2. 按下S键打开缩放属性
3. 在第0帧打关键帧设0%
4. 在第1秒打关键帧设100%

而用脚本只需要：

```
var layers = comp.selectedLayers; // 获取选中图层
for(var i=0; i<layers.length; i++){ // 遍历每个图层
    var scale = layers[i].property("缩放"); // 获取缩放属性
    scale.setValueAtTime(0, [0,0]); // 第0帧0%
    scale.setValueAtTime(1, [100,100]); // 第1秒100%
    }
```

**底层原理：**

AE通过`ExtendScript`引擎（Adobe定制版JavaScript）解析脚本，再通过`应用程序接口(API)`与软件交互。比如当执行`app.project.activeItem`时，实际是通过API获取当前激活的合成对象。

**新手常见误解：**
❌ "必须精通编程才能写脚本" → 其实基础JavaScript知识+AE操作经验就足够开发实用脚本
❌ "脚本会破坏工程文件" → 脚本默认只读操作，除非主动调用修改命令
❌ "所有操作都能脚本化" → 个别特殊操作暂时无法完全脚本控制