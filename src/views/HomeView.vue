<script setup>
import DesignImage from '@/components/DesignImage.vue';
import DesignSetting from '@/components/DesignSetting.vue';
</script>

<template>
  <el-row :gutter="20">
    <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
      <DesignImage />
    </el-col>
    <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
      <DesignSetting />
    </el-col>
  </el-row>
</template>

<style scoped>
.el-row {
  margin-bottom: 20px;
}

.el-col {
  border-radius: 4px;
}

@media screen and (min-width: 768px) {
  .el-col {
    margin-bottom: 0;
  }
}
</style>