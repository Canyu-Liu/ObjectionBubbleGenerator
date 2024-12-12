<script setup>
const openUrl = () => {
    window.open("https://objection.yvfox.com/");
}
</script>

<template>
    <el-card style="max-width: 480px">
        <el-row :gutter = "35">
            <el-col :span="12">
                <el-image src="https://objection.yvfox.com/icon.png" style="width: 150px"></el-image>
            </el-col>
            <el-col :span="12">
                <h1>Objection！</h1>
                <p>将你的个性化图像导入自动异议！</p>
                <br>
                <el-button type="primary" round @click="openUrl()">了解更多</el-button>
            </el-col>
        </el-row>
    </el-card>
</template>

<style scoped></style>