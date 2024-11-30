<template>
    <div class="image-editor">
        <div class="canvas-container">
            <div class="canvas-wrapper">
                <canvas ref="bubbleCanvas" class="bubble-canvas"></canvas>
                <canvas ref="shadowCanvas" class="shadow-canvas"></canvas>
                <canvas ref="textCanvas" class="text-canvas"></canvas>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, watch, computed } from 'vue';
import { store } from '@/stores/index.js';

// 声明要触发的事件
const emit = defineEmits<{
  (e: 'export-complete'): void;
}>();

const bubbleCanvas = ref<HTMLCanvasElement | null>(null);
const shadowCanvas = ref<HTMLCanvasElement | null>(null);
const textCanvas = ref<HTMLCanvasElement | null>(null);

const bubbles_text = computed(() => store.bubbles_text);
const bubblesfontstyle = computed(() => store.bubblesfontstyle);
const bubbles_text_color = computed(() => store.bubbles_text_color);
const bubbles_style = computed(() => store.bubbles_style);
const text_positionx = computed(() => store.text_positionx);
const text_positiony = computed(() => store.text_positiony);
const shadow_positionx = computed(() => store.shadow_positionx);
const shadow_positiony = computed(() => store.shadow_positiony);
const font_size = computed(() => store.font_size);
const bubbles_shadow_color = computed(() => store.bubbles_shadow_color);
const shadow_switch = computed(() => store.shadow_switch);
const letter_spacing = computed(() => store.letter_spacing);
const line_spacing = computed(() => store.line_spacing);

// 引入描边开关和描边大小
const stroke_switch = computed(() => store.stroke_switch);
const stroke_size = computed(() => store.stroke_size);

const loadFont = () => {
    if (bubblesfontstyle.value) {
        const font = new FontFace('CustomFont', `url(${bubblesfontstyle.value})`);
        font.load().then((loadedFont) => {
            (document.fonts as any).add(loadedFont);
            drawTextCanvas();
            drawShadowCanvas();
        }).catch((error) => {
            console.error('字体加载失败', error);
        });
    } else {
        drawTextCanvas();
        drawShadowCanvas();
    }
};

const drawBubbleCanvas = () => {
    if (!bubbleCanvas.value) return;

    const canvas = bubbleCanvas.value;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    if (bubbles_style.value) {
        const bgImg = new Image();
        bgImg.onload = () => {
            canvas.width = bgImg.width;
            canvas.height = bgImg.height;
            canvas.style.width = '100%';
            canvas.style.height = 'auto';
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.drawImage(bgImg, 0, 0);

            if (shadowCanvas.value) {
                shadowCanvas.value.width = canvas.width;
                shadowCanvas.value.height = canvas.height;
                shadowCanvas.value.style.width = '100%';
                shadowCanvas.value.style.height = 'auto';
                drawShadowCanvas();
            }
            if (textCanvas.value) {
                textCanvas.value.width = canvas.width;
                textCanvas.value.height = canvas.height;
                textCanvas.value.style.width = '100%';
                textCanvas.value.style.height = 'auto';
                drawTextCanvas();
            }
        };
        bgImg.src = bubbles_style.value;
    }
};

const drawTextWithSpacing = (
  ctx: CanvasRenderingContext2D,
  text: string,
  x: number,
  y: number,
  letterSpacing: number
) => {
  const characters = text.split('');
  
  let currentX = x;

  characters.forEach((char) => {
    ctx.fillText(char, currentX, y);
    currentX += ctx.measureText(char).width + letterSpacing;
  });
};

// 辅助函数：计算总文本宽度
const getTotalTextWidth = (ctx, text, letterSpacing) => {
  const characters = text.split('');
  return characters.reduce(
    (acc, char) => acc + ctx.measureText(char).width + letterSpacing,
    -letterSpacing // 最后一个字符不需要额外的字间距
  );
};

const drawStrokeTextWithSpacing = (
    ctx: CanvasRenderingContext2D,
    text: string,
    x: number,
    y: number,
    letterSpacing: number
) => {
    const characters = text.split('');
    let currentX = x;

    characters.forEach((char) => {
        ctx.strokeText(char, currentX, y);
        currentX += ctx.measureText(char).width + letterSpacing;
    });
};

const drawShadowCanvas = () => {
    if (!shadowCanvas.value) return;

    const canvas = shadowCanvas.value;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // 如果阴影开关关闭，直接返回
    if (!shadow_switch.value) return;

    ctx.font = `bold ${font_size.value}px 'CustomFont', sans-serif`;
    ctx.textBaseline = 'middle';
    ctx.textAlign = letter_spacing.value !== 0 ? 'left' : 'center';
    ctx.lineJoin = 'round'; // 改善描边效果

    const text = bubbles_text.value || '';
    const lines = text.split('\n');
    const totalHeight = lines.length * font_size.value * line_spacing.value;
    const baseX = canvas.width / 2 + (text_positionx.value * 10 || 0);
    const baseY = (canvas.height / 2) - (totalHeight / 2) + (font_size.value * line_spacing.value) / 2 + (text_positiony.value * 10 || 0);

    // 定义多个阴影层次
    const shadowLayers = [
        { offsetX: shadow_positionx.value, offsetY: shadow_positiony.value, color: bubbles_shadow_color.value },
        { offsetX: shadow_positionx.value * 1.5, offsetY: shadow_positiony.value * 1.5, color: bubbles_shadow_color.value },
        { offsetX: shadow_positionx.value * 2, offsetY: shadow_positiony.value * 2, color: bubbles_shadow_color.value },
        { offsetX: shadow_positionx.value * 2.5, offsetY: shadow_positiony.value * 2.5, color: bubbles_shadow_color.value },
        { offsetX: shadow_positionx.value * 3, offsetY: shadow_positiony.value * 3, color: bubbles_shadow_color.value },
        { offsetX: shadow_positionx.value * 3.5, offsetY: shadow_positiony.value * 3.5, color: bubbles_shadow_color.value },
        { offsetX: shadow_positionx.value * 4, offsetY: shadow_positiony.value * 4, color: bubbles_shadow_color.value },
        { offsetX: shadow_positionx.value * 4.5, offsetY: shadow_positiony.value * 4.5, color: bubbles_shadow_color.value },
        { offsetX: shadow_positionx.value * 5, offsetY: shadow_positiony.value * 5, color: bubbles_shadow_color.value },
        // 可根据需要添加更多阴影层次
    ];

    for (let i = 0; i < lines.length; i++) {
        const line = lines[i];
        const y = baseY + i * font_size.value * line_spacing.value;

        shadowLayers.forEach(layer => {
            // 绘制描边文字
            if (stroke_switch.value) {
                ctx.lineWidth = stroke_size.value * 3;
                ctx.strokeStyle = bubbles_shadow_color.value; // 描边颜色保持不变

                ctx.fillStyle = layer.color;

                if (letter_spacing.value !== 0) {
                    const totalTextWidth = getTotalTextWidth(ctx, line, letter_spacing.value * 10);
                    const x = baseX + layer.offsetX - totalTextWidth / 2;
                    drawStrokeTextWithSpacing(ctx, line, x, y + layer.offsetY, letter_spacing.value * 10);
                } else {
                    const x = baseX + layer.offsetX;
                    ctx.strokeText(line, x, y + layer.offsetY);
                }
            }

            // 绘制填充文字
            ctx.fillStyle = layer.color;
            if (letter_spacing.value !== 0) {
                const totalTextWidth = getTotalTextWidth(ctx, line, letter_spacing.value * 10);
                const x = baseX + layer.offsetX - totalTextWidth / 2;
                drawTextWithSpacing(ctx, line, x, y + layer.offsetY, letter_spacing.value * 10);
            } else {
                const x = baseX + layer.offsetX;
                ctx.fillText(line, x, y + layer.offsetY);
            }
        });
    }
};

const drawTextCanvas = () => {
    if (!textCanvas.value) return;

    const canvas = textCanvas.value;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.font = `bold ${font_size.value}px 'CustomFont', sans-serif`;
    ctx.textBaseline = 'middle';
    ctx.textAlign = letter_spacing.value !== 0 ? 'left' : 'center';
    ctx.lineJoin = 'round'; // 改善描边效果

    const text = bubbles_text.value || '';
    const lines = text.split('\n');
    const totalHeight = lines.length * font_size.value * line_spacing.value;
    const baseX = canvas.width / 2 + (text_positionx.value * 10 || 0);
    const baseY = (canvas.height / 2) - (totalHeight / 2) + (font_size.value * line_spacing.value) / 2  + (text_positiony.value * 10 || 0);

    for (let i = 0; i < lines.length; i++) {
        const line = lines[i];
        const y = baseY + i * font_size.value * line_spacing.value;

        // 绘制描边文字
        if (stroke_switch.value) {
            ctx.lineWidth = stroke_size.value;
            ctx.strokeStyle = bubbles_shadow_color.value; // 描边颜色保持不变

            if (letter_spacing.value !== 0) {
                const totalTextWidth = getTotalTextWidth(ctx, line, letter_spacing.value * 10);
                const x = baseX - totalTextWidth / 2;
                drawStrokeTextWithSpacing(ctx, line, x, y, letter_spacing.value * 10);
            } else {
                const x = baseX;
                ctx.strokeText(line, x, y);
            }
        }

        // 绘制填充文字
        ctx.fillStyle = bubbles_text_color.value;
        if (letter_spacing.value !== 0) {
            const totalTextWidth = getTotalTextWidth(ctx, line, letter_spacing.value * 10);
            const x = baseX - totalTextWidth / 2;
            drawTextWithSpacing(ctx, line, x, y, letter_spacing.value * 10);
        } else {
            const x = baseX;
            ctx.fillText(line, x, y);
        }
    }
};

const exportAsImage = () => {
    if (!bubbleCanvas.value || !textCanvas.value || !shadowCanvas.value) return;

    const exportCanvas = document.createElement('canvas');
    exportCanvas.width = bubbleCanvas.value.width;
    exportCanvas.height = bubbleCanvas.value.height;
    const ctx = exportCanvas.getContext('2d');
    if (!ctx) return;

    ctx.drawImage(bubbleCanvas.value, 0, 0);
    ctx.drawImage(shadowCanvas.value, 0, 0);
    ctx.drawImage(textCanvas.value, 0, 0);

    const link = document.createElement('a');
    link.href = exportCanvas.toDataURL('image/png');
    link.download = 'design.png';
    link.click();

    // 触发导出完成事件
    emit('export-complete');
};

defineExpose({ exportAsImage });

watch(bubbles_style, drawBubbleCanvas);
watch(
  [
    bubbles_text,
    bubbles_text_color,
    text_positionx,
    text_positiony,
    font_size,
    letter_spacing,
    line_spacing,
    shadow_switch,
    shadow_positionx,
    shadow_positiony,
    bubbles_shadow_color,
    stroke_switch,
    stroke_size
  ],
  () => {
    drawTextCanvas();
    drawShadowCanvas(); // 确保在相关属性变化时重新绘制阴影画布
  }
);

watch(bubblesfontstyle, loadFont);

onMounted(() => {
    loadFont();
    drawBubbleCanvas();
});
</script>

<style scoped>
.canvas-container {
    width: 100%;
    overflow: hidden;
}

.canvas-wrapper {
    position: relative;
    margin: 0 auto;
    width: 90%;
    max-width: 100%;
}

.shadow-canvas {
    position: absolute;
    top: 0;
    left: 0;
}

.text-canvas {
    position: absolute;
    top: 0;
    left: 0;
}
</style>