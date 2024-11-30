# 异议气泡制作器

快速生成仿逆转裁判风格的文字气泡。

## 在线体验

https://objection.yvfox.com/generate/

## 部署

```sh
npm run build
```

如果你需要部署到根目录，请将vite.config.js中的base修改为`'/'`。

```js
export default defineConfig({
  plugins: [
    vue(),
  ],
  base: '/generate/', //修改这里
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
```

## 许可证
项目采用GPL-3.0开源，详细内容请查看[LICENSE](./LICENSE)文件。