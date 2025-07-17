---
layout: default
title: 文章归档
permalink: /archive/
---

<div class="container">
    <div class="row">
        <div class="col-lg-8 col-lg-offset-2 col-md-10 col-md-offset-1">
            <h1>所有文章</h1>
            
            {% for post in site.posts %}
                {% capture current_year %}{{ post.date | date: "%Y" }}{% endcapture %}
                {% if current_year != previous_year %}
                    <h2>{{ current_year }}</h2>
                    {% assign previous_year = current_year %}
                {% endif %}
                
                <div class="post-preview">
                    <a href="{{ post.url | prepend: site.baseurl }}">
                        <h3 class="post-title">{{ post.title }}</h3>
                        {% if post.subtitle %}
                        <h4 class="post-subtitle">{{ post.subtitle }}</h4>
                        {% endif %}
                    </a>
                    <p class="post-meta">发布于 {{ post.date | date: "%Y年%m月%d日" }}</p>
                </div>
            {% endfor %}
        </div>
    </div>
</div>
