---
layout: default
title: 我的个人博客
description: 记录AE脚本插件开发
header-img: "img/home-bg.jpg"
---

<!-- 首页横幅 -->
<header class="intro-header" style="background-image: url('{{ site.baseurl }}/{{ page.header-img }}')">
    <div class="container">
        <div class="row">
            <div class="col-lg-8 col-lg-offset-2 col-md-10 col-md-offset-1">
                <div class="site-heading">
                    <h1>{% if page.title %}{{ page.title }}{% else %}{{ site.title }}{% endif %}</h1>
                    <span class="subheading">{{ page.description }}</span>
                </div>
            </div>
        </div>
    </div>
</header>

<!-- 主要内容区 -->
<div class="container">
    <div class="row">
        <div class="col-lg-8 col-lg-offset-2 col-md-10 col-md-offset-1">
            
            <!-- 文章列表 -->
            {% for post in paginator.posts %}
            <div class="post-preview">
                <a href="{{ post.url | prepend: site.baseurl }}">
                    <h2 class="post-title">{{ post.title }}</h2>
                    {% if post.subtitle %}
                    <h3 class="post-subtitle">{{ post.subtitle }}</h3>
                    {% endif %}
                </a>
                <p class="post-meta">
                    发布于 {{ post.date | date: "%Y年%m月%d日" }}
                    {% if post.categories.size > 0 %}
                    &middot; 分类: 
                    {% for category in post.categories %}
                    <a href="{{ site.baseurl }}/categories/#{{ category | slugify }}">{{ category }}</a>
                    {% unless forloop.last %}, {% endunless %}
                    {% endfor %}
                    {% endif %}
                </p>
                <div class="post-entry">
                    {{ post.excerpt | strip_html | truncate:200 }}
                    <a href="{{ post.url | prepend: site.baseurl }}" class="read-more">阅读全文</a>
                </div>
            </div>
            <hr>
            {% endfor %}
            
            <!-- 分页导航 -->
            <div class="pagination">
                {% if paginator.previous_page %}
                <a href="{{ paginator.previous_page_path }}" class="previous">上一页</a>
                {% endif %}
                <span class="page-number">第 {{ paginator.page }} 页 / 共 {{ paginator.total_pages }} 页</span>
                {% if paginator.next_page %}
                <a href="{{ paginator.next_page_path }}" class="next">下一页</a>
                {% endif %}
            </div>
        </div>
    </div>
</div>
