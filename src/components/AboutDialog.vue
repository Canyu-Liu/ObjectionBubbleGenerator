<template>
    <transition name="fade">
        <div class="popup-overlay" v-if="visible">
            <el-card class="popup-container" shadow="hover">
                <div class="popup-header">
                    <h1>关于</h1>
                </div>
                <div class="popup-content">
                    <h2>使用说明</h2>
                    <br>
                    <p>输入文字，然后导出。就这么简单，快去试试吧！</p>
                    <br>
                    <h2>帮助与反馈</h2>
                    <br>
                    <p>请查看此文档</p>
                    <p><el-link type="primary" class="github-link" href="https://objection.yvfox.com/help/">帮助|自动异议</el-link></p>
                    <p>或者在Github上创建Issues</p>
                    <br>
                    <h2>项目地址</h2>
                    <br>
                    <h3><el-link type="primary" class="github-link" href="https://github.com/Canyu-Liu/ObjectionBubbleGenerator">GitHub仓库</el-link></h3>
                    <br>
                </div>
                <div class="popup-footer">
                    <el-button type="primary" @click="close">关闭</el-button>
                </div>
            </el-card>
        </div>
    </transition>
</template>

<script setup>

const props = defineProps({
  visible: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(['close']);

const close = () => {
  emit('close');
};
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}

.popup-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    /* 使用视口宽度 */
    height: 100vh;
    /* 使用视口高度 */
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
    /* 设置更高的 z-index */
}

.popup-container {
    background: #fff;
    width: 60%;
    border-radius: 8px;
    overflow: hidden;
    max-height: 90vh;
}

.popup-header {
    padding: 20px;
    padding-bottom: 10px;
    border-bottom: 1px solid #ebeef5;
}

.popup-header h1 {
    color: black;
}

.popup-content {
    padding: 16px;
    max-height: 60vh;
    overflow: auto;
}

.popup-footer {
    padding: 16px;
    text-align: right;
    border-top: 1px solid #ebeef5;
}

/* 分享部分样式 */
.share-section {
    text-align: center;
    margin-bottom: 80px !important;
}

.el-col {
    margin-bottom: 20px;
}

@media (max-width: 768px) {
    .popup-container {
        width: 80%;
        /* 在小屏设备上，弹窗宽度调整为80% */
    }
}

.github-link:hover {
    background-color: transparent;
    /* 取消背景颜色变化 */
}

.svg-icon {
    width: 1.3em;
    height: 1.3em;
    vertical-align: middle;
    transform: translateY(-0.1em);
}
</style>