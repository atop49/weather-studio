# 天气 Studio

亮色玻璃拟态天气台：晨光磨砂卡片浮在纸白地面上，超大温度读数、五日预报、收藏与定位。

技术栈：React · TypeScript · Vite · Tailwind CSS · OpenWeatherMap

## 本地运行

```bash
npm install
npm run dev
npm run build
```


## 环境变量

复制 .env.example 为 .env.local，填入 OpenWeatherMap 的 Key：

```bash
VITE_OWM_KEY=your_openweathermap_api_key
```


## 设计说明

界面语言与设计取舍记录在 [DESIGN.md](./DESIGN.md)。