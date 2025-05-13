<template>
  <LoadingAnimation
    :trigger="loadingTrigger"
    @loaded="onLoadingComplete"
    v-if="showLoader"
  />

  <router-view v-if="isPageReady" v-slot="{ Component, route }">
    <transition :name="pageTransitionName" mode="out-in">
      <component :is="Component" :key="route.path" />
    </transition>
  </router-view>
</template>

<script setup>
import { ref, watch } from 'vue';
import { useRouter } from 'vue-router';
import LoadingAnimation from './components/LoadingAnimation.vue';

const router = useRouter();
const loadingTrigger = ref(0); // 用于触发加载动画重新播放的计数器
const showLoader = ref(true); // 控制加载动画组件是否渲染
const isInitialLoad = ref(true); // 标记是否是首次加载
const isPageReady = ref(false); // <--- 新增状态：页面是否准备好渲染
const pageTransitionName = ref('page-fade'); // 页面切换动画名称

// 路由切换开始前
router.beforeEach((to, from, next) => {
  isPageReady.value = false; // <--- 路由切换时，重置页面准备状态
  if (!isInitialLoad.value) { // 如果不是首次加载
    console.log("Route change detected, showing loader and triggering animation.");
    showLoader.value = true; // 显示加载动画组件
    loadingTrigger.value++; // 增加触发器值，重新播放动画
  }
  next(); // 继续导航
});

// 路由切换完成后 (或者在加载动画的 @loaded 事件中处理)
// 在这里我们使用 @loaded 事件来隐藏加载器更可靠
const onLoadingComplete = () => {
  console.log("Loading complete, hiding loader and preparing page.");
  showLoader.value = false; // 隐藏加载器
  if (isInitialLoad.value) {
      isInitialLoad.value = false; // 不再是首次加载
  }
  // 延迟一小段时间再显示页面内容，确保动画完全消失
  setTimeout(() => {
    console.log("Setting isPageReady to true.");
    isPageReady.value = true; // <--- 延迟后设置页面为准备好
  }, 100); // 延迟 100 毫秒 (可调整)
};

// 可选：如果希望页面内容在加载动画*完全消失*后再出现，
// 可以在 onLoadingComplete 后延迟一小段时间再渲染 router-view,
// 但当前设置（加载动画覆盖在顶层，完成后隐藏）通常效果更好。

</script>

<style>
/* 全局样式 */
/* --- 添加全局 CSS 变量 --- */
:root {
    --bg-color: #ffffff;
    --text-grey: #5f5f5f;
    --text-black: #000000;
    --accent-yellow: #fffb00;
    --accent-purple: #e0d8f0;
    --accent-pink: #f8d8f0;
    --accent-light-grey: #f3f0e9;
    --bezier-curve: cubic-bezier(0.65, 0, 0.35, 1);
    --transition-duration: 0.4s;
}

html, /* 添加 html */
body {
  height: 100%; /* 确保 html 和 body 占满高度 */
  width: 100%; /* 确保 html 和 body 占满宽度 */
  max-width: none !important; /* 强制覆盖外部 max-width */
  max-height: none !important; /* 强制覆盖外部 max-height */
  margin: 0;
  font-family: sans-serif;
  background-color: #fff; /* 默认背景为白色 */
  overflow: hidden; /* 防止可能的滚动条影响布局 */
}

#app {
  background-color: #fff; /* App 容器背景也设为白色 */
  /* min-height: 100vh; */ /* 改为 height */
  height: 100%; /* 占满父元素 (body) 的高度 */
  width: 100%; /* 占满父元素 (body) 的宽度 */
  max-width: none !important; /* 强制覆盖外部 max-width */
  display: flex; /* 使用 flex 布局方便内容填充 */
  flex-direction: column; /* 让 router-view 垂直排列 */
}

/* 让 router-view 的容器 (transition) 填充 #app */
router-view + * { /* 选择紧跟 router-view 的兄弟元素，即 transition */
  flex-grow: 1; /* 占据剩余空间 */
  display: flex; /* 使内部 component 能更好地控制大小 */
  flex-direction: column; /* 使 component 内容垂直排列 */
}
/* 让 component 本身也能填充 */
router-view + * > * { /* 选择 transition 下的 component */
    flex-grow: 1;
}

/* 页面切换的淡入淡出效果 (可选) */
.page-fade-enter-active,
.page-fade-leave-active {
  transition: opacity 0.3s ease;
}
.page-fade-enter-from,
.page-fade-leave-to {
  opacity: 0;
}

/* 页面元素的弹出动画 (在页面组件内部或全局定义) */
.element-pop-in {
  animation: pop-in 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94) both;
}

@keyframes pop-in {
  0% {
    transform: scale(0.8);
    opacity: 0;
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
}

/* 你可以创建更复杂的弹出动画，比如带有轻微延迟 */
.element-pop-in-delayed {
    animation: pop-in 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94) 0.2s both; /* 延迟 0.2s */
}

</style>