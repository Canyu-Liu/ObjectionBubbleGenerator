# 异议气泡制作器

快速生成仿逆转裁判风格的文字气泡。

## 在线体验

https://objection.yvfox.com/generate/

## 部署

```sh
npm run build
```

位于ExportDialog.vue的startProgress不是必须的，导出图像并不需要等待。   
为什么要加个进度条？因为我想让别人停下来看一眼这个弹窗（） 

```js
//进度条
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
```

## 许可证
项目采用GPL-3.0开源，详细内容请查看[LICENSE](./LICENSE)文件。