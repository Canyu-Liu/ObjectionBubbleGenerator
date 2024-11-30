<template>
    <el-row :gutter="10" justify="center">
        <el-col :xs="16" :sm="16" :md="6" :lg="6" :xl="6">
            <a href="https://beian.miit.gov.cn/" style="color: #4F4F4F;">桂ICP备2022008478号-1</a>
        </el-col>
        <el-col :xs="16" :sm="16" :md="6" :lg="6" :xl="6">
            <div><img src="../assets/beian.png" style="display: inline;vertical-align: middle;" />
                <a style="color: #4F4F4F;" target="_blank"
                    href="http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=45010802000543">桂公网安备
                    45010802000543号</a>
            </div>
        </el-col>
    </el-row>
</template>

<style scoped>
.el-col {
    border-radius: 4px;
}
.grid-content {
    border-radius: 4px;
    min-height: 36px;
}
a:hover{
    background-color: transparent !important;
}
</style>