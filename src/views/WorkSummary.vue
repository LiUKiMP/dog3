<template>
  <div class="page-container">
    <header class="page-header">
      <router-link to="/" class="logo" id="logo">
        <span class="logo-text">新游戏</span><span class="full-logo-text">新游戏首页</span>
      </router-link>
      <nav class="main-nav">
        <ul>
          <li><router-link to="/study-progress" class="nav-link"><span class="nav-text-wrapper" data-text="学习进展"><span class="nav-text-inner">学习进展</span></span></router-link></li>
          <li><router-link to="/work-detail" class="nav-link"><span class="nav-text-wrapper" data-text="工作内容"><span class="nav-text-inner">工作内容</span></span></router-link></li>
          <li><router-link to="/work-summary" class="nav-link"><span class="nav-text-wrapper" data-text="工作总结"><span class="nav-text-inner">工作总结</span></span></router-link></li>
        </ul>
      </nav>
      <a href="#" @click.prevent class="top-right-info">
        <span class="info-text">关于</span><span class="full-info-text">关于我们</span>
      </a>
    </header>
    <main>
      <div class="main-content-placeholder">
        <h1>工作总结</h1>
        <p>工作总结页面正在建设中...</p>
      </div>
    </main>
  </div>
</template>

<script setup>
// No script needed
</script>

<style scoped>
/* Styles exactly from WorkSummary.html */
/* --- :root variables moved to App.vue global styles --- */

* {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
}
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
    padding: 30px;
    font-family: 'Microsoft YaHei', sans-serif;
    background-color: var(--bg-color);
    color: var(--text-grey);
    overflow-x: hidden;
    line-height: 1.5;
}
.page-header {
    position: relative;
    height: 60px;
}
.logo {
    position: absolute;
    top: 0;
    left: 0;
    background-color: var(--text-black);
    color: white;
    padding: 8px 12px;
    font-size: 1.0em;
    cursor: pointer;
    overflow: hidden;
    white-space: nowrap;
    max-width: 75px;
    border-radius: 6px;
    transition: max-width var(--transition-duration) var(--bezier-curve), padding var(--transition-duration) var(--bezier-curve);
    z-index: 10;
    animation: entry-animation 0.8s ease-out 0.1s forwards;
    opacity: 0;
    display: flex;
    align-items: center;
    text-decoration: none;
}
.logo:hover {
    max-width: 130px; /* Increased width for "新游戏首页" */
    padding-left: 15px;
    padding-right: 15px;
    justify-content: center;
}
.logo:hover .logo-text {
     opacity: 0;
     transition: opacity calc(var(--transition-duration) / 2) var(--bezier-curve);
}
.logo:hover .full-logo-text {
    opacity: 1;
    max-width: 100px;
     transition: opacity var(--transition-duration) var(--bezier-curve) calc(var(--transition-duration) / 2), max-width var(--transition-duration) var(--bezier-curve) calc(var(--transition-duration) / 2);
}
.logo-text {
     display: inline-block;
     transition: opacity var(--transition-duration) var(--bezier-curve);
}
.full-logo-text {
     display: inline-block;
     opacity: 0;
     max-width: 0;
     overflow: hidden;
     vertical-align: bottom;
     margin-left: 0;
     text-align: center;
     transition: opacity var(--transition-duration) var(--bezier-curve), max-width var(--transition-duration) var(--bezier-curve);
}
.main-nav {
    position: absolute;
    top: 10px;
    left: 50%;
    transform: translateX(-50%);
    z-index: 10;
}
.main-nav ul {
    display: flex;
    list-style: none;
    gap: 30px;
}
.main-nav li {
     animation: entry-animation 0.8s ease-out forwards;
     opacity: 0;
}
.main-nav li:nth-child(1) { animation-delay: 0.2s; }
.main-nav li:nth-child(2) { animation-delay: 0.3s; }
.main-nav li:nth-child(3) { animation-delay: 0.4s; }
.nav-link {
    text-decoration: none;
    color: var(--text-grey);
    font-size: 1.1em;
    font-weight: bold;
    display: inline-block;
    position: relative;
    overflow: hidden;
    height: 1.5em;
    vertical-align: top;
    background-color: rgba(0, 0, 0, 0.03);
    padding: 3px 8px;
    border-radius: 5px;
}
.nav-text-wrapper {
    display: block;
    transition: transform var(--transition-duration) var(--bezier-curve);
    font-weight: 700;
    line-height: 1.3;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 15px;
}
.nav-link:hover .nav-text-wrapper {
    transform: translateY(-100%);
}
/* .nav-link.active .nav-text-wrapper { */ /* Removed manual active class */
    /* Optional: style for active link if needed */
/* } */
/* Use Vue Router active class */
 .nav-link.router-link-exact-active {
    color: var(--text-black);
    font-weight: 900;
}
.nav-text-inner {
    display: block;
    padding-bottom: 0.3em;
}
 .nav-text-wrapper::after {
    content: attr(data-text);
    display: block;
    position: absolute;
    width: 100%; /* Added */
    text-align: center; /* Added */
    left: 0;
    top: 100%;
}
.top-right-info {
    position: absolute;
    top: 0;
    right: 0;
    background-color: var(--text-black);
    color: white;
    padding: 8px 12px;
    font-size: 1.0em;
    cursor: pointer;
    overflow: hidden;
    white-space: nowrap;
    max-width: 100px;
    border-radius: 6px;
    transition: max-width var(--transition-duration) var(--bezier-curve), padding var(--transition-duration) var(--bezier-curve);
    z-index: 10;
    animation: entry-animation 0.8s ease-out 0.6s forwards;
    opacity: 0;
    display: flex;
    align-items: center;
    text-decoration: none;
}
.top-right-info:hover {
    max-width: 150px;
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
    transition: opacity var(--transition-duration) var(--bezier-curve), max-width var(--transition-duration) var(--bezier-curve);
}
.top-right-info:hover .full-info-text {
    opacity: 1;
    max-width: 100px;
    transition: opacity var(--transition-duration) var(--bezier-curve) calc(var(--transition-duration) / 2), max-width var(--transition-duration) var(--bezier-curve) calc(var(--transition-duration) / 2);
}
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
.main-content-placeholder {
    text-align: center;
    padding-top: 100px;
    color: var(--text-grey);
    animation: entry-animation 0.8s ease-out 0.7s forwards; /* Add entry animation */
    opacity: 0;
}
</style> 