---
layout: post
title: "After Effects脚本开发入门教程概述"
date: 2025-01-15 14:00:00 +0800  
categories: [AE脚本开发]
tags: [ae,ExtendScript,jsx]
subtitle: "编写第一个简单脚本"
header-img: "img/post-bg.jpg"  
---



**这是本套教程第一章的最后一节，带你编写第一个脚本hello world!**

**目标：创建并运行一个能在AE中显示对话框的基础脚本**

$.writeLn("message");          //输出到控制台

alert("message");                  //临时弹窗

console.log("message");      //浏览器或Node.js中的方法



步骤1：选择开发工具,使用VSCode（推荐）

​	新建文件保存为 `hello_world.jsx`



步骤2：编写基础代码

基础弹窗版本：

```
// 显示简单对话框
alert("Hello World!");
```

步骤3：保存脚本

1. 文件名格式：`hello_world.jsx`
2. 保存路径（任选其一）：
   - AE脚本目录：`/Applications/Adobe After Effects [版本]/Scripts/` (Mac)
   - 任意位置通过 `文件 > 脚本 > 运行脚本文件` 调用



步骤4：运行脚本

方法1：直接运行

1. 菜单栏选择 `文件 > 脚本 > 运行脚本文件`
2. 选择保存的 `.jsx` 文件

方法2：快捷键调用

1. 将脚本放入AE脚本目录
2. 重启AE后在 `文件 > 脚本` 菜单底部可见脚本
3. Windows可使用 `Ctrl + F12` 快速执行



步骤5：验证结果

- 成功时显示弹窗：
- 若出现错误：
  - 检查文件后缀是否为 `.jsx`
  - 确认代码无中文标点符号
  - 查看控制台报错信息（ExtendScript Toolkit的Console面板）



**代码解析**

| 代码片段   | 作用说明                       |
| :--------- | :----------------------------- |
| `alert();` | AE扩展的弹窗方法，支持多行文本 |



**调试技巧**

1. **控制台输出**（仅限ExtendScript Toolkit）：

   ```
   $.writeLn("调试信息"); // 输出到控制台
   ```

2. **错误捕获**：

   ```
   try {
     // 可能出错的代码
   } catch(err) {
     alert("错误信息：" + err.message);
   }
   ```



**扩展练习**

1. 修改弹窗内容为当前时间：

   ```
   alert("当前时间：" + (new Date()).toLocaleTimeString());
   ```

2. 创建带OK/Cancel按钮的对话框：

   ```
   var confirmResult = confirm("是否创建新合成？");
   if (confirmResult) {
     app.project.items.addComp("NewComp", 1920, 1080, 1, 10, 30);
   }
   ```



**常见问题**

1. **脚本不运行**：

   - 检查AE首选项 `常规 > 允许脚本写入文件和访问网络` 是否勾选
   - Mac系统需在 `系统偏好设置 > 安全性与隐私` 中授权Adobe程序

2. **中文乱码**：

   - 保存文件时编码选择 `UTF-8 with BOM`
   - 避免直接在alert中使用中文（可用Unicode转码）

3. **对象不存在**：

   ```
   if (app.project) {
     // 安全操作已存在项目的代码
   } else {
     alert("请先创建项目！");
   }
   ```

