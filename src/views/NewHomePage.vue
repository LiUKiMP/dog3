<template>
  <div class="page-container">
    <header class="page-header">
      <!-- Logo link points to home -->
      <router-link to="/" class="logo" id="logo">
        <span class="logo-text">新游戏</span><span class="full-logo-text">新游戏首页</span>
      </router-link>

      <nav class="main-nav">
        <ul>
          <!-- Navigation links using router-link -->
          <li><router-link to="/study-progress" class="nav-link"><span class="nav-text-wrapper" data-text="学习进展"><span class="nav-text-inner">学习进展</span></span></router-link></li>
          <li><router-link to="/work-detail" class="nav-link"><span class="nav-text-wrapper" data-text="工作内容"><span class="nav-text-inner">工作内容</span></span></router-link></li>
          <li><router-link to="/work-summary" class="nav-link"><span class="nav-text-wrapper" data-text="工作总结"><span class="nav-text-inner">工作总结</span></span></router-link></li>
        </ul>
      </nav>

      <!-- Top right info link (kept as # for now, or can be changed later) -->
      <a href="#" @click.prevent class="top-right-info">
        <span class="info-text">关于</span><span class="full-info-text">关于我们</span>
      </a>
    </header>

    <main>
      <div class="main-content-placeholder">
        <h1>新游戏首页</h1>
        <p>欢迎来到新游戏网站！</p>
        <!-- Add router-view if this component should host sub-routes, otherwise remove -->
        <!-- <router-view></router-view> -->
      </div>
    </main>
  </div>
</template>

<script setup>
// No script needed for this component based on the original HTML
</script>

<style scoped>
/* Styles exactly from NewHomePage.html */
/* Remove Font Imports */
/* @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;700&display=swap'); */
/* @import url('https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap'); */

* {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
}

/* These might be better in global styles (App.vue or main.css) if consistent across pages */
/* html, body {
    height: 100%;
    width: 100%;
} */

/* body {
    font-family: 'Microsoft YaHei', sans-serif;
    background-color: var(--bg-color);
    color: var(--text-grey);
    overflow-x: hidden; 
    line-height: 1.5;
} */

.page-container {
    min-height: 100vh;
    height: 100%;
    width: 100%;
    position: relative;
    padding: 30px; /* 给边缘留出空间 */
    /* Ensure container adopts styles if body styles are removed/global */
    font-family: 'Microsoft YaHei', sans-serif;
    background-color: var(--bg-color);
    color: var(--text-grey);
    line-height: 1.5;
    overflow-x: hidden;
}

/* Header */
.page-header {
    position: relative; /* 用于内部绝对定位 */
    height: 60px; /* 估算头部区域高度 */
}

.logo {
    position: absolute;
    top: 0; /* 相对于 padding */
    left: 0; /* 相对于 padding */
    background-color: var(--text-black);
    color: white;
    padding: 8px 12px;
    /* Remove specific font */
    /* font-family: monospace; */
    font-size: 1.0em; /* Increase font size */
    cursor: pointer;
    overflow: hidden; /* Add overflow hidden to clip content */
    white-space: nowrap;
    /* Use max-width for transition */
    max-width: 75px; /* Adjust width for "首页" */
    border-radius: 6px; /* Add border-radius */
    /* Transition max-width and padding */
    transition: max-width var(--transition-duration) var(--bezier-curve), padding var(--transition-duration) var(--bezier-curve);
    z-index: 10;
    animation: entry-animation 0.8s ease-out 0.1s forwards;
    opacity: 0; /* Initial state for animation */
    display: flex; /* Use flex to align items */
    align-items: center; /* Vertically center items */
    text-decoration: none; /* For router-link */
}

.logo:hover {
    max-width: 130px; /* Estimated width for "社团首页" + padding */
    /* Keep padding adjustments */
    padding-left: 15px;
    padding-right: 15px;
    justify-content: center; /* Center the content horizontally */
}

.logo:hover .logo-text {
     opacity: 0;
     /* Remove max-width manipulation here, rely on opacity and parent overflow */
     /* max-width: 0; */
     /* overflow: hidden; */
     /* Simplify transition */
     transition: opacity calc(var(--transition-duration) / 2) var(--bezier-curve);
}

.logo:hover .full-logo-text {
    opacity: 1;
    max-width: 100px; /* Allow it to take space */
     /* Delay fade in slightly */
     transition: opacity var(--transition-duration) var(--bezier-curve) calc(var(--transition-duration) / 2), max-width var(--transition-duration) var(--bezier-curve) calc(var(--transition-duration) / 2);
}

.logo-text {
     display: inline-block;
     /* Add max-width transition for shrinking */
     /* Transition only opacity */
     transition: opacity var(--transition-duration) var(--bezier-curve);
}

.full-logo-text {
     /* Initially hidden */
     display: inline-block;
     opacity: 0;
     max-width: 0;
     overflow: hidden;
     vertical-align: bottom; /* Align with T: */
     margin-left: 0; /* Will be shown instead of T: */
     /* Ensure text aligns center when logo justifies center */
     text-align: center;
     transition: opacity var(--transition-duration) var(--bezier-curve), max-width var(--transition-duration) var(--bezier-curve);
}

.main-nav {
    position: absolute;
    top: 10px; /* 微调垂直位置 */
    left: 50%;
    transform: translateX(-50%);
    z-index: 10;
}

.main-nav ul {
    display: flex;
    list-style: none;
    gap: 30px; /* 导航项间距 */
}

.main-nav li {
     animation: entry-animation 0.8s ease-out forwards;
     opacity: 0; /* Initial state for animation */
}
/* 应用不同的延迟 */
.main-nav li:nth-child(1) { animation-delay: 0.2s; }
.main-nav li:nth-child(2) { animation-delay: 0.3s; }
.main-nav li:nth-child(3) { animation-delay: 0.4s; }
/* Removed 4th child as it's not in the provided snippet for shetuan/index(1).html nav */
/* .main-nav li:nth-child(4) { animation-delay: 0.5s; } */


.nav-link {
    text-decoration: none;
    color: var(--text-grey);
    font-size: 1.1em;
    /* font-weight: bold; */ /* Handled by active class */
    display: inline-block; /* 使 transform 生效 */
    position: relative;
    overflow: hidden; /* Apply overflow: hidden HERE */
    height: 1.5em; /* 限制高度为一行文字 */
    vertical-align: top; /* Align links consistently */
    /* Add background, padding, radius */
    background-color: rgba(0, 0, 0, 0.03); /* Subtle background */
    padding: 3px 8px;
    border-radius: 5px;
}

.nav-text-wrapper {
    display: block;
    transition: transform var(--transition-duration) var(--bezier-curve);
    font-weight: 700; /* Bold */
    line-height: 1.3; /* 调整行高让背景块之间有间隙 */
    /* Adjust layout for vertical stacking */
    display: flex;
    flex-direction: column;
    align-items: center;
    /* gap: 15px; */ /* Adjust gap between vertical blocks */
}

.nav-link:hover .nav-text-wrapper {
    transform: translateY(-100%);
}

.nav-text-inner {
    display: block;
    /* padding-bottom: 0.3em; */ /* 为下面的复制文本留空间 */
}

/* Use Vue Router's active class */
.nav-link.router-link-exact-active {
    color: var(--text-black); /* Example: darker color for active link */
    font-weight: 900; /* Example: bolder for active link */
}

/* Keep hover effect on active link if desired */
/* .nav-link.router-link-exact-active:hover .nav-text-wrapper {
    transform: translateY(-100%);
} */

/* 创建一个伪元素来放置重复文本，用于滚动效果 */
 .nav-text-wrapper::after {
    content: attr(data-text); /* 使用 data-* 属性 */
    display: block;
    position: absolute;
    width: 100%;
    text-align: center;
    left: 0;
    top: 100%; /* 放在原始文本下方 */
}

/* Added from about.html for consistency if needed, or can be removed if top-right-info is not part of index(1).html's header */
.top-right-info {
    position: absolute;
    top: 0; /* 与logo对齐 */
    right: 0; /* Relative to page-container padding */
    background-color: var(--text-black);
    color: white;
    padding: 8px 12px;
    font-size: 1.0em;
    cursor: pointer;
    overflow: hidden;
    white-space: nowrap;
    max-width: 100px; /* Adjusted for "关于" */
    border-radius: 6px;
    transition: max-width var(--transition-duration) var(--bezier-curve),
                padding var(--transition-duration) var(--bezier-curve);
    z-index: 10;
    animation: entry-animation 0.8s ease-out 0.6s forwards; /* Match delay to about.html if this element exists */
    opacity: 0;
    display: flex;
    align-items: center;
    text-decoration: none; /* For 'a' tag */
}

.top-right-info:hover {
    max-width: 150px; /* Adjusted for "关于我们" */
    padding-left: 15px;
    padding-right: 15px;
    justify-content: center;
}

.top-right-info .info-text {
    display: inline-block;
    transition: opacity var(--transition-duration) var(--bezier-curve);
}

.top-right-info:hover .info-text {
    opacity: 0;
    transition: opacity calc(var(--transition-duration) / 2) var(--bezier-curve);
}

.top-right-info .full-info-text {
    display: inline-block;
    opacity: 0;
    max-width: 0;
    overflow: hidden;
    text-align: center;
    transition: opacity var(--transition-duration) var(--bezier-curve),
                max-width var(--transition-duration) var(--bezier-curve);
}

.top-right-info:hover .full-info-text {
    opacity: 1;
    max-width: 100px; /* Ensure this allows "关于我们" to show */
    transition: opacity var(--transition-duration) var(--bezier-curve) calc(var(--transition-duration) / 2),
                max-width var(--transition-duration) var(--bezier-curve) calc(var(--transition-duration) / 2);
}


/* Animations */
@keyframes entry-animation {
    0% {
        opacity: 0;
        transform: translateY(25px);
    }
    60% {
         transform: translateY(-5px);
    }
    100% {
        opacity: 1;
        transform: translateY(0);
    }
}
/* Minimal styling for the main content area if needed for centering or spacing */
.main-content-placeholder {
    text-align: center;
    padding-top: 100px; /* Add some space below the header */
    color: var(--text-grey);
    animation: entry-animation 0.8s ease-out 0.7s forwards; /* Add entry animation */
    opacity: 0; /* Initial state for animation */
}
</style> 