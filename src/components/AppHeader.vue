<template>
    <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" :ellipsis="false"
        @select="handleSelect">
        <el-menu-item index="0">
            <img style="height: 80%" src="/logo.png" alt="Element logo" />
            <el-text class="custom-font">气泡制作器</el-text>
        </el-menu-item>
        <el-menu-item index="1"> <el-text class="about-item" @click="$emit('about')">关于</el-text></el-menu-item>
        <el-menu-item index="2"> <el-button type="primary" @click="$emit('export')">导出</el-button></el-menu-item>
    </el-menu>
</template>

<script lang="ts" setup>
import { ref,onMounted } from 'vue'
import { store } from '@/stores/index.js'

const activeIndex = ref('1')
const handleSelect = (key: string, keyPath: string[]) => {
    // console.log(key, keyPath);
}

onMounted(() => {
    const style = document.createElement('style')
    style.innerHTML = `
        @font-face {
            font-family: 'AlimamaDongFangDaKai';
            src: url('${store.bubblesfontstyle}') format('truetype');
        }
    `
    document.head.appendChild(style)
})
</script>

<style>
.custom-font {
    margin-left: 5px;
    font-family: 'AlimamaDongFangDaKai', sans-serif;
}

.el-menu--horizontal>.el-menu-item:nth-child(1) {
    margin-right: auto;
    --el-menu-active-color: transparent !important;
    color: transparent !important;
}

.el-menu-item:hover {
    background-color: transparent !important;
    color: inherit !important;
    cursor: default;
}

.el-menu-item{
    background-color: transparent !important;
    border-bottom: none !important;
    --el-menu-active-color: transparent !important;
    color: transparent !important;
}
.about-item:hover {
    color: #409EFF;
    cursor: pointer;
}
</style>