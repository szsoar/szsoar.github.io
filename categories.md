---
layout: default
title: 文章分类
permalink: /categories/
---

<div class="container">
    <div class="row">
        <div class="col-lg-8 col-lg-offset-2 col-md-10 col-md-offset-1">
            <h1>文章分类</h1>
            
            {% for category in site.categories %}
                <h2 id="{{ category[0] | slugify }}">{{ category[0] }}</h2>
                <ul>
                {% for post in category[1] %}
                    <li>
                        <a href="{{ post.url }}">{{ post.title }}</a>
                        <span class="post-meta">({{ post.date | date: "%Y年%m月%d日" }})</span>
                    </li>
                {% endfor %}
                </ul>
            {% endfor %}
        </div>
    </div>
</div>
