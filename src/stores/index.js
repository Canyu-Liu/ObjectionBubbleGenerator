// src/store/index.js
import { reactive } from 'vue';

export const store = reactive({
  //气泡样式
  bubbles_style: import.meta.env.BASE_URL +'bubbles.png',
  setBubbles_style(url) {
    this.bubbles_style = url;
  },
  //气泡图片
  bubbles_images: [
    { id: 1, name: '逆转裁判', url: import.meta.env.BASE_URL +'bubbles.png' },
    { id: 2, name: '大逆转裁判', url: import.meta.env.BASE_URL +'bubbles2.png' },
  ],
  //气泡文字
  bubbles_text: '',
  //气泡文字的字体样式
  bubblesfontstyle: import.meta.env.BASE_URL +'fonts/AlimamaDongFangDaKai-Regular.ttf',
  //气泡文字的颜色
  bubbles_text_color: 'rgb(251, 0, 2)',
  //描边开关
  stroke_switch: true, // 描边开关，默认开启
  stroke_size: 10, // 描边大小，默认值为25
  //文字阴影开关
  shadow_switch: true, // 投影开关，默认开启
  //行间距
  line_spacing: 1, // 行间距，默认值为1.2
  //文字阴影颜色
  bubbles_shadow_color: 'rgb(125, 10, 11)', // 投影颜色
  //文字阴影位置
  shadow_positionx: 5, // 将默认投影的 x 轴偏移增加到 5
  shadow_positiony: 5, // 将默认投影的 y 轴偏移增加到 5
  //文字位置
  text_positionx: 0,
  text_positiony: 0,
  // 字体列表
  bubblesfonts: [
    { id: 1, name: '阿里妈妈东方大楷', url: import.meta.env.BASE_URL +'fonts/AlimamaDongFangDaKai-Regular.ttf' },
    { id: 2, name: '阿里妈妈刀隶体', url: import.meta.env.BASE_URL +'fonts/AlimamaDaoLiTi.ttf' },
    { id: 3, name: '字体家Ai造字剑客', url: import.meta.env.BASE_URL +'fonts/ZitijiaAiZaoZiJianKe.ttf' },
  ],
  font_size: 500, // 默认字体大小
  // 新增文字间距属性
  letter_spacing: 0, // 默认文字间距为 0
});