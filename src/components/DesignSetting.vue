<template>
    <el-row :gutter="0" justify="center">
        <el-col :span="12">
            <el-row>
                <el-text class="mx-1">气泡样式</el-text>
                <el-select v-model="bubbles_style" placeholder="选择气泡" style="width: calc(100% - 80px);">
                    <el-option v-for="bubblesimage in bubbles_images" :key="bubblesimage.id" :label="bubblesimage.name"
                        :value="bubblesimage.url"></el-option>
                </el-select>
            </el-row>
        </el-col>
        <el-col :span="12">
            <el-row>
                <el-text class="mx-1">字体样式</el-text>
                <el-select v-model="bubblesfontstyle" placeholder="选择字体" style="width: calc(100% - 80px);">
                    <el-option v-for="bubblesfont in bubblesfonts" :key="bubblesfont.id" :label="bubblesfont.name"
                        :value="bubblesfont.url"></el-option>
                </el-select>
            </el-row>
        </el-col>
    </el-row>
    <el-row :gutter="0" justify="center">
        <el-col :span="12">
            <el-row>
                <el-text class="mx-1">字体大小</el-text>
                <el-input-number v-model="font_size" :min="10" :max="1000" style="width: calc(100% - 80px);" />
            </el-row>
        </el-col>
        <el-col :span="12">
            <el-row>
                <el-text class="mx-1">文字间距</el-text>
                <el-input-number v-model="letter_spacing" :min="-20" :max="50" style="width: calc(100% - 80px);" />
            </el-row>
        </el-col>
    </el-row>
    <el-row :gutter="0" justify="center">
        <el-col :span="12">
            <el-row>
                <el-text class="mx-1">文字颜色</el-text>
                <el-color-picker v-model="bubbles_text_color" style="width: calc(100% - 80px);" />
            </el-row>
        </el-col>
        <el-col :span="12">
            <el-row>
                <el-text class="mx-1">行间距&nbsp;&nbsp;&nbsp;&nbsp;</el-text>
                <el-input-number v-model="line_spacing" :min="0.5" :max="3" :step="0.1"
                    style="width: calc(100% - 80px);" />
            </el-row>
        </el-col>
    </el-row>
    <el-row :gutter="0" justify="center">
        <el-col :span="12">
            <el-row>
                <el-text class="mx-1">描边效果</el-text>
                <el-switch v-model="stroke_switch" />
            </el-row>

        </el-col>
        <el-col :span="12">
            <el-row>
                <el-text class="mx-1">描边大小</el-text>
                <el-input-number v-model="stroke_size" min="0" max="50" style="width: calc(100% - 80px);" />
            </el-row>
        </el-col>
    </el-row>
    <el-row :gutter="0" justify="center">
        <el-col :span="12">
            <el-row>
                <el-text class="mx-1">文字阴影</el-text>
                <el-switch v-model="shadow_switch" />
            </el-row>
        </el-col>
        <el-col :span="12">
            <el-row>
                <el-text class="mx-1">投影颜色</el-text>
                <el-color-picker v-model="bubbles_shadow_color" style="width: calc(100% - 80px);" />
            </el-row>
        </el-col>
    </el-row>
    <el-row :gutter="0" justify="center">
        <el-col :span="6">
            <el-row><el-text class="mx-1">文字位置</el-text></el-row>
        </el-col>
        <el-col :span="9">
            <el-row>
                <el-text class="mx-1">X:</el-text>
                <el-input-number v-model="text_positionx" style="width: calc(100% - 30px);" />
            </el-row>
        </el-col>
        <el-col :span="9">
            <el-row>
                <el-text class="mx-1">Y:</el-text>
                <el-input-number v-model="text_positiony" style="width: calc(100% - 30px);" />
            </el-row>
        </el-col>
    </el-row>
    <el-row :gutter="0" justify="center">
        <el-col :span="6">
            <el-row><el-text class="mx-1">投影位置</el-text></el-row>
        </el-col>
        <el-col :span="9">
            <el-row>
                <el-text class="mx-1">X:</el-text>
                <el-input-number min="-10" max="10" v-model="shadow_positionx" style="width: calc(100% - 30px);" />
            </el-row>
        </el-col>
        <el-col :span="9">
            <el-row>
                <el-text class="mx-1">Y:</el-text>
                <el-input-number min="-10" max="10" v-model="shadow_positiony" style="width: calc(100% - 30px);" />
            </el-row>
        </el-col>
    </el-row>
    <el-row :gutter="0" justify="center">
        <el-col :span="24">
            <el-row>
                <el-text class="mx-1">气泡文字</el-text>
                <el-input v-model="bubbles_text" type="textarea" placeholder="在这里输入文字，按回车可以换行" style="width: calc(100% - 80px);" />
            </el-row>
        </el-col>
    </el-row>
</template>

<script lang="ts" setup>
import { computed, watch } from 'vue'
import { store } from '@/stores/index.js'

const bubbles_text = computed({
    get: () => store.bubbles_text,
    set: (value) => store.bubbles_text = value
})

const bubbles_text_color = computed({
    get: () => store.bubbles_text_color,
    set: (value) => store.bubbles_text_color = value
})

const bubbles_shadow_color = computed({
    get: () => store.bubbles_shadow_color,
    set: (value) => store.bubbles_shadow_color = value
})

const bubbles_style = computed({
    get: () => store.bubbles_style,
    set: (value) => store.bubbles_style = value
})

const text_positionx = computed({
    get: () => store.text_positionx,
    set: (value) => store.text_positionx = value
})

const text_positiony = computed({
    get: () => store.text_positiony,
    set: (value) => store.text_positiony = value
})

const shadow_positionx = computed({
    get: () => store.shadow_positionx,
    set: (value) => store.shadow_positionx = value
})

const shadow_positiony = computed({
    get: () => store.shadow_positiony,
    set: (value) => store.shadow_positiony = value
})

const bubbles_images = computed(() => store.bubbles_images)

const bubblesfontstyle = computed({
    get: () => store.bubblesfontstyle,
    set: (value) => store.bubblesfontstyle = value
})

const bubblesfonts = computed(() => store.bubblesfonts)

const font_size = computed({
    get: () => store.font_size,
    set: (value) => store.font_size = value,
});

const letter_spacing = computed({
    get: () => store.letter_spacing,
    set: (value) => store.letter_spacing = value,
});

const stroke_switch = computed({
    get: () => store.stroke_switch,
    set: (value) => store.stroke_switch = value
});

const stroke_size = computed({
    get: () => store.stroke_size,
    set: (value) => store.stroke_size = value
});

const shadow_switch = computed({
    get: () => store.shadow_switch,
    set: (value) => store.shadow_switch = value
});

const line_spacing = computed({
    get: () => store.line_spacing,
    set: (value) => store.line_spacing = value
});

// watch(() => store.bubbles_style, (newVal) => {
//     console.log('当前的 bubbles_style 值:', newVal);
// });
</script>

<style lang="scss">
.el-row {
    margin-bottom: 20px;
}

.setting-col-mg {
    margin-bottom: 20px;
}

.el-row:last-child {
    margin-bottom: 0;
}

.el-col {
    border-radius: 4px;
}

.grid-content {
    border-radius: 4px;
    min-height: 36px;
}

.mx-1 {
    margin-right: 10px;
}
</style>