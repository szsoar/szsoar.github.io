---
layout: post
title: "After Effects脚本开发入门教程概述"
date: 2025-01-10 14:00:00 +0800  
categories: [AE脚本开发]
tags: [ae,ExtendScript,jsx]
subtitle: "开发环境的配置"
header-img: "img/post-bg.jpg"  
---



**这是本套教程第一章的第三节，介绍AE脚本开发环境的配置**

**方案一：Adobe ExtendScript Toolkit (ESTK)**

*Adobe官方开发工具，适合快速验证代码*

**操作步骤：**

1. **安装位置**

   - Windows：随AE安装包默认安装，路径通常为
     `..\Program Files (x86)\Adobe\Adobe Utilities - CS6\ExtendScript Toolkit [版本]`
   - macOS：位于AE应用程序包内
     `/Applications/Adobe After Effects [版本]/Scripts/Utilities/ExtendScript Toolkit.app`
   - 新版AE已经脱离，可运行独立Adobe ExtendScript Toolkit (ESTK)

2. **基础配置**

   - 启动后选择 **Target Application**：
     `菜单栏 > 下拉菜单 > Adobe After Effects [版本]`
   - 开启调试控制台：
     `菜单栏 > Window > JavaScript Console`

3. **运行脚本**

   ```
   // 测试代码
   alert("AE Version: " + app.version);
   ```

   - 按 `F5` (Windows)  运行脚本

**优缺点：**
✅ Adobe官方原生支持，无需额外配置
❌ 界面老旧，无代码提示，仅支持基础调试



**方案二：VSCode + 扩展插件**

*推荐方案，现代开发环境*

**手动配置步骤：**

1. **安装基础组件**

   - 下载 Visual Studio Code 

     下载地址：https://code.visualstudio.com

   - 安装关键扩展：

     - `ExtendScript Debugger`（调试核心扩展插件，重要！！！）
     - `Error lens`（语法检查，可选）

2. **配置调试环境**

   - 创建 `.vscode/launch.json` 文件：

     ```
     {
       "version": "0.2.0",
       "configurations": [
         {
           "type": "extendscript-debug",
           "request": "launch",
           "name": "Launch Script in ExtendScript Engine",
           "hostAppSpecifier": "aftereffects-22.0",// 替换你的AE版本
         }
       ]
     }
     ```

3. **设置AE路径（重要）**

   - Windows示例：

     ```
     "runtimeExecutable": "../Program Files/Adobe/Adobe After Effects (AE版本)/Support Files/AfterFX.exe"
     ```

   - macOS示例：

     ```
      "runtimeExecutable": "/Applications/Adobe After Effects (AE版本)/Adobe After Effects (AE版本).app"
     ```

4. **调试功能验证**

   - 在脚本中设置断点
   - 按 `F5` 启动调试会话
   - 使用调试控制台观察变量值



**免配置步骤：**

安装 `AE Script linker`

**插件智能化**：

1. - `AE Script Linker` 这类插件会自动：
     - 检测已安装的AE版本路径
     - 生成隐藏的调试配置文件（后台自动创建类似launch.json的配置）
     - 建立与AE的IPC通信通道

2. **默认配置覆盖**：

   - 当不手动创建`.vscode/launch.json`时，插件会使用内置的默认配置：

     ```
     {
       "type": "extendscript-debug",
       "request": "launch",
       "program": "${file}",
       "runtimeExecutable": "auto-detect" // 自动识别最新AE版本
     }
     ```



**当前工作流程解析**

1. **点击 ▶️ 运行时**：

   - 插件自动执行以下操作：
     - 将当前打开的`.jsx`文件复制到AE脚本目录
     - 向AE发送`DoScript`指令
     - 建立调试通道（如果开启调试模式）

2. **与手动配置的区别**：

   | 功能         | 自动配置         | 手动配置              |
   | :----------- | :--------------- | :-------------------- |
   | 多版本AE支持 | 默认使用最新版本 | 可指定任意版本        |
   | 特殊路径脚本 | 只能运行当前文件 | 可设置复杂项目结构    |
   | 高级调试功能 | 基础调试         | 支持变量监控/条件断点 |



**最佳实践建议**

1. **保持现状**：

   - 简单脚本开发继续使用现有工作流
   - 利用 `Ctrl+Shift+P` > `AE Script Linker: Setup Project` 快速初始化
2. **渐进式配置**：

   - 当需要以下功能时再添加配置：
     - 同时调试多个脚本文件
     - 需要预执行脚本
     - 使用自定义工作区布局

