<script lang="ts" setup>
import AppHeader from '../components/AppHeader.vue'
import HomeView from './HomeView.vue';
import AppFooter from '../components/AppFooter.vue';
import { ref } from 'vue';
import DesignImage from '@/components/DesignImage.vue';
import ExportDialog from '@/components/ExportDialog.vue'; // 导入 ExportDialog 组件
import AboutDialog from '@/components/AboutDialog.vue'; // 导入 AboutDialog 组件

const aboutVisible = ref(false); // 控制 AboutDialog 可见性的变量
const openAboutDialog = () => {
  aboutVisible.value = true; // 显示 AboutDialog
};

const designImageRef = ref();
const dialogVisible = ref(false); // 控制 ExportDialog 可见性的变量

// 打开导出对话框
const openExportDialog = () => {
  dialogVisible.value = true; // 显示 ExportDialog
};

// 处理进度条完成后开始导出
const handleStartExport = () => {
  designImageRef.value.exportAsImage(); 
};

// 处理导出完成后的逻辑
const handleExportComplete = () => {
  console.log('导出完成');
};
</script>

<template>
  <div class="common-layout">
    <el-container>
      <el-header><AppHeader @export="openExportDialog" @about="openAboutDialog"/></el-header>
      <el-main><HomeView /></el-main>
      <el-footer><AppFooter /></el-footer>
    </el-container>
    <!-- 隐藏 DesignImage 组件 -->
    <DesignImage ref="designImageRef" style="display: none;" />
    <ExportDialog 
      :visible="dialogVisible" 
      @close="dialogVisible = false" 
      @start-export="handleStartExport" 
      @export-complete="handleExportComplete" 
    />
    <AboutDialog :visible="aboutVisible"  @close="aboutVisible = false" />
  </div>
</template>

<style>
  .common-layout {
    height: 100vh;
  }
  .el-header, .el-footer {
    background-color: #B3C0D1;
    color: #333;
    text-align: center;
    line-height: 60px;
    padding: 0;
  }
  .el-footer {
    height: auto;
    overflow: hidden;
  }
  .el-main {
    background-color: #E9EEF3;
    color: #333;
    text-align: center;
    min-height: calc(100vh - 120px);
  }
  body > .el-container {
    margin-bottom: 40px;
  }
</style>