<template>
    <div v-if="isVisible" class="loading-mask" ref="maskRef">
      <div class="strips-container">
        <div
          v-for="n in stripCount"
          :key="n"
          class="strip"
          ref="stripRefs"
        ></div>
      </div>
      <div class="progress-bar-container" ref="progressContainerRef">
        <div class="progress-bar-fill" ref="progressBarRef"></div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted, watch, nextTick } from 'vue';
  import { gsap } from 'gsap';
  
  const props = defineProps({
    // 接收一个触发器，当它改变时，重新播放动画
    trigger: Number,
    stripCount: {
      type: Number,
      default: 9 // 可以调整 8-10 之间的条带数量
    }
  });
  
  const emit = defineEmits(['loaded']); // 定义加载完成事件
  
  const isVisible = ref(true); // 控制整个蒙版的可见性
  const maskRef = ref(null);
  const stripRefs = ref([]); // 用于存储条带元素的引用
  const progressContainerRef = ref(null);
  const progressBarRef = ref(null);
  let timeline = null; // GSAP 时间线实例
  
  // --- 动画逻辑 ---
  const playAnimation = () => {
    console.log('playAnimation called')
    // 确保 refs 数组不仅存在，而且包含元素
    if (!stripRefs.value || stripRefs.value.length === 0) {
      console.error("Strip refs not available or empty when playAnimation called!");
      // 可以在这里尝试等待一帧再试，或者更可靠地在 watch 中处理
      // requestAnimationFrame(playAnimation); // 简单的重试逻辑（可能导致无限循环，慎用）
      return;
    }
    console.log('Strip refs count:', stripRefs.value.length);
    isVisible.value = true; // 确保开始动画时蒙版可见

    // --- GSAP 初始化 ---
    console.log('Setting initial strip state (yPercent: 100)');
    // 初始状态：条带在下方，颜色恢复为黑色
    gsap.set(stripRefs.value, { yPercent: 100, backgroundColor: '#000' }); // <-- 恢复黑色
    console.log('Setting initial progress bar state');
    gsap.set(progressBarRef.value, { width: '0%' }); // 初始状态：进度条为0
    gsap.set(progressContainerRef.value, { opacity: 0, scale: 0.8 }); // 初始状态：进度条隐藏

    // --- 时间线创建 ---
    // 清理之前的动画（如果存在）
    if (timeline) {
      console.log('Killing previous timeline');
      timeline.kill();
    };
    timeline = gsap.timeline({
        onStart: () => console.log('Timeline started'),
      onComplete: () => {
        console.log('Timeline complete');
         isVisible.value = false;
         emit('loaded');
         console.log("Loading animation complete, emitting loaded event.");
      }
    });
    console.log('Timeline instance created:', timeline); // <-- 确认时间线实例

    // --- 动画序列 ---
    console.log('Animating strips IN...');
    console.log('Targeting strips for IN:', stripRefs.value); // <-- 确认入场动画目标
    // 1. 入场动画：条带从右到左向上覆盖
    timeline.to(stripRefs.value, {
      yPercent: 0, // 移动到最终位置 (0%)
      duration: 0.8, // 动画持续时间
      ease: "power2.out", // <-- 再次改为与离开动画一致的缓动
      stagger: {
        each: 0.08,
        from: "end"
      },
      overwrite: true,
      onComplete: () => console.log('Strips IN animation step finished'),
    });

    // 1.5. 进入动画完成后，设置背景为黑色 <--- 新增步骤
    console.log('Setting loading mask background to black');
    timeline.set(maskRef.value, { backgroundColor: '#000' });

    console.log('Animating progress bar IN...');
    // 2. 进度条弹出
    timeline.to(progressContainerRef.value, {
      opacity: 1,
      scale: 1,
      duration: 0.5,
      ease: "back.out(1.7)",// 弹出效果
      onComplete: () => console.log('Progress bar IN finished'), // <--- 添加
    }, "-=0.5"); // 在条带动画结束前一点开始
  
    // 3. 模拟进度条加载
    timeline
      .to(progressBarRef.value, { width: '35%', duration: 0.8, ease: 'sine.inOut' }) // 节点1
      .to(progressBarRef.value, { width: '70%', duration: 1.0, ease: 'sine.inOut' }, "+=0.3") // 节点2 (+=0.3 表示等待0.3秒)
      .to(progressBarRef.value, { width: '100%', duration: 0.6, ease: 'sine.inOut' }, "+=0.2"); // 到达100%
  
    // 4. 隐藏进度条
    timeline.to(progressContainerRef.value, {
      opacity: 0,
      scale: 0.8,
      duration: 0.3,
      ease: "power1.in"
    });
  
    // 5. 退场动画：条带从左到右向上移出
    // --- 在移动前，先改变条带颜色 --- <--- 新增步骤
    console.log('Changing strips color to white for OUT animation...');
    timeline.set(stripRefs.value, { backgroundColor: '#fff' });
    // --- 然后，将条带瞬间移动到屏幕上方 --- <--- 新增步骤
    console.log('Setting strips position above screen (yPercent: -100)');
    timeline.set(stripRefs.value, { yPercent: -100 });
    // --- 开始向下移入 --- <--- 逻辑修正
    console.log('Animating strips OUT (Sliding down to cover)...'); // <-- 修改日志
    console.log('Targeting strips for OUT:', stripRefs.value);
    timeline.to(stripRefs.value, {
        yPercent: 0, // <--- 向下移动到覆盖屏幕
        duration: 0.8, // 退出时间
        ease: "power2.out", // <--- 平滑滑入
        stagger: {
          each: 0.06,
          from: "start" // 从左到右依次进入
        },
        onComplete: () => console.log('Strips OUT animation step finished'),
    });
  
    // 6. （可选）让黑色背景在条带退场时也淡出，确保最后是白色
    // timeline.to(maskRef.value, { // 如果需要背景也淡出
    //   opacity: 0,
    //   duration: 0.5
    // }, "<"); // '<' 表示与上一个动画同时开始
  };
  
  // --- 生命周期和监听 ---
  onMounted(() => {
    console.log('LoadingAnimation mounted, starting initial animation'); // <--- 修复日志
    // 等待DOM更新确保元素可用，然后播放初始动画
    nextTick(playAnimation);
  });
  
  // 监听触发器的变化，重新播放动画（用于路由切换）
  watch(() => props.trigger, () => {
      console.log("Trigger changed, restarting animation.");
      // 需要等DOM更新后再执行，特别是v-if可能刚把组件渲染出来
      nextTick(playAnimation);
  });
  
  // 确保在组件卸载时清理 GSAP 动画
  import { onUnmounted } from 'vue';
  onUnmounted(() => {
    if (timeline) {
      timeline.kill(); // 清理时间线，防止内存泄漏
    }
  });
  
  </script>
  
  <style scoped>
  .loading-mask {
  position: fixed; /* 使用 fixed 定位相对于视口 */
  top: 0;
  left: 0;
  width: 100vw; /* 视口宽度 */
  height: 100vh; /* 视口高度 */
  /* background-color: #000; */ /* <--- 改为默认透明 */
  background-color: transparent; /* <--- 默认透明 */
  z-index: 9999; /* 保持高 z-index */
  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  /* 再次移除 position: relative */
  /* position: relative; */
}

.strips-container {
  position: absolute; /* 相对于 .loading-mask 定位 */
  top: 0;
  left: 0;
  width: 100%; /* 继承父容器宽度 */
  height: 100%; /* 继承父容器高度 */
  display: flex;
  z-index: 1; /* 在进度条之下 */
}

.strip {
  flex: 1;
  height: 100%;
  background-color: #000; /* 条带保持黑色 */
  /* transform: translateY(100%); */ /* <--- 移除 CSS 初始变换 */
  /* will-change: transform; */ /* <--- 暂时移除 will-change */
  /* border-right: 1px solid blue; */ /* 也可以用边框调试 */
}

.progress-bar-container {
  /* 保持不变，它应该在 mask 内部居中 */
  width: 100%;
  max-width: 400px;
  height: 8px;
  background-color: rgba(255, 255, 255, 0.2);
  border-radius: 4px;
  overflow: hidden;
  opacity: 0;
  transform: scale(0.8);
  z-index: 2; /* 在条带之上 */
  position: relative; /* 确保 z-index 生效 */
  will-change: opacity, transform;
}

.progress-bar-fill {
  width: 0%;
  height: 100%;
  background-color: #fff;
  border-radius: 4px;
  will-change: width;
}
  </style>