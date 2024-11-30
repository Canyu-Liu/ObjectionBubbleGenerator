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
                </div>
                <div class="popup-footer">
                    <el-button type="primary" @click="close">关闭</el-button>
                </div>
            </el-card>
        </div>
    </transition>
</template>

<script>
import { ref, watch } from 'vue';
import { Share } from '@element-plus/icons-vue';

export default {
    name: 'ExportDialog',
    components: {
        Share
    },
    props: {
        visible: {
            type: Boolean,
            default: false
        }
    },
    setup(props, { emit }) {
    
        // 分享功能（示例）
        const share = () => {
            //复制到剪切板
            navigator.clipboard.writeText(window.location.href);
            alert('链接已复制到剪切板！');
        };

        // 关闭对话框
        const close = () => {
            emit('close');
        };

        return {
            close,
            share
        };
    }
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