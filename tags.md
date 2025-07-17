---
layout: default
title: 文章标签
permalink: /tags/
---

<div class="container">
    <div class="row">
        <div class="col-lg-8 col-lg-offset-2 col-md-10 col-md-offset-1">
            <h1>文章标签</h1>
            
            {% assign sorted_tags = site.tags | sort %}
            {% for tag in sorted_tags %}
                <h2 id="{{ tag[0] | slugify }}">{{ tag[0] }}</h2>
                <ul>
                {% for post in tag[1] %}
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
