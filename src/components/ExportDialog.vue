<template>
    <transition name="fade">
        <div class="popup-overlay" v-if="visible">
            <el-card class="popup-container" shadow="hover">
                <div class="popup-header">
                    <h1>稍等...马上就好！</h1>
                </div>
                <div class="popup-content">
                    <el-row :gutter="20" type="flex" justify="center" align="middle">
                        <el-col :span="24">
                            <h3 v-if="!isComplete">正在导出...</h3>
                            <h3 v-else>导出完成！</h3>
                        </el-col>
                        <el-col :span="24">
                            <el-progress :percentage="progress" :format="formatPercentage" />
                        </el-col>
                        <el-col :span="24" class="share-section">
                            <h1>喜欢这个网站吗？</h1>
                            <p>分享给你的好朋友们吧！</p>
                            <p>&nbsp;</p>
                            <!-- 分享按钮 -->
                            <el-button type="primary" style="width: 50px;height: auto;" circle @click="share">
                                <el-icon size="30">
                                    <Share />
                                </el-icon>
                            </el-button>
                        </el-col>
                        <el-col :span="24">
                            <p>如果遇到导出无法下载的问题，请更换浏览器。</p>
                            <p>建议Edge或Chrome，不要使用QQ微信内置的浏览器。</p>
                        </el-col>
                        <el-col :span="24">
                            <el-link type="primary" class="bili-link" href="https://space.bilibili.com/380054694" target="_blank">
                                <p>关注我的B站账号！
                                    <svg t="1732372618526" class="svg-icon" viewBox="0 0 1024 1024" version="1.1"
                                        xmlns="http://www.w3.org/2000/svg" p-id="4273">
                                        <path
                                            d="M306.005333 117.632L444.330667 256h135.296l138.368-138.325333a42.666667 42.666667 0 0 1 60.373333 60.373333L700.330667 256H789.333333A149.333333 149.333333 0 0 1 938.666667 405.333333v341.333334a149.333333 149.333333 0 0 1-149.333334 149.333333h-554.666666A149.333333 149.333333 0 0 1 85.333333 746.666667v-341.333334A149.333333 149.333333 0 0 1 234.666667 256h88.96L245.632 177.962667a42.666667 42.666667 0 0 1 60.373333-60.373334zM789.333333 341.333333h-554.666666a64 64 0 0 0-63.701334 57.856L170.666667 405.333333v341.333334a64 64 0 0 0 57.856 63.701333L234.666667 810.666667h554.666666a64 64 0 0 0 63.701334-57.856L853.333333 746.666667v-341.333334A64 64 0 0 0 789.333333 341.333333zM341.333333 469.333333a42.666667 42.666667 0 0 1 42.666667 42.666667v85.333333a42.666667 42.666667 0 0 1-85.333333 0v-85.333333a42.666667 42.666667 0 0 1 42.666666-42.666667z m341.333334 0a42.666667 42.666667 0 0 1 42.666666 42.666667v85.333333a42.666667 42.666667 0 0 1-85.333333 0v-85.333333a42.666667 42.666667 0 0 1 42.666667-42.666667z"
                                            p-id="4274" fill="#1296db"></path>
                                    </svg>
                                </p>
                            </el-link>
                        </el-col>
                    </el-row>
                </div>
                <div class="popup-footer">
                    <el-button type="primary" @click="close" :disabled="!isComplete">关闭</el-button>
                </div>
            </el-card>
        </div>
    </transition>
</template>

<script setup>
import { ref, watch } from 'vue';
import { Share } from '@element-plus/icons-vue';

// 定义 props
const props = defineProps({
    visible: {
        type: Boolean,
        default: false
    }
});

// 定义 emits
const emit = defineEmits(['close', 'start-export']);

// 定义响应式数据
const progress = ref(0);
const interval = ref(null);
const isComplete = ref(false);

// 自定义格式函数，返回整数百分比
const formatPercentage = (percentage) => {
    return `${Math.round(percentage)}%`;
};

// 分享功能
const share = () => {
    // 复制到剪切板
    navigator.clipboard.writeText(window.location.href);
    alert('链接已复制到剪切板！');
};

// 进度条
const startProgress = () => {
    progress.value = 0;
    isComplete.value = false;
    const totalDuration = 2000; // 总时长2秒
    const intervalTime = 100; // 每100ms增加一次
    const steps = totalDuration / intervalTime; // 总步数
    const increment = 100 / steps; // 每步增加的百分比

    interval.value = setInterval(() => {
        if (progress.value < 100) {
            progress.value += increment;
            if (progress.value >= 100) {
                progress.value = 100;
                isComplete.value = true;
                clearInterval(interval.value);
                emit('start-export'); // 进度完成后触发导出事件（其实导出根本不需要等）
            }
        }
    }, intervalTime);
};

const close = () => {
    emit('close');
};

// 监听 visible 状态变化
watch(
    () => props.visible,
    (newVal) => {
        if (newVal) {
            startProgress();
        } else {
            clearInterval(interval.value);
            progress.value = 0;
            isComplete.value = false;
        }
    }
);
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
    width: 50%;
    /* 设置最大宽度 */
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
    margin-bottom: 35px !important;
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

.bili-link:hover {
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