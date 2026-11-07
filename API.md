# Weather Studio 数据模型与 API 契约

## OpenWeatherMap API（数据源）

- **当前天气**：`GET https://api.openweathermap.org/data/2.5/weather?q={city}&appid={KEY}&units=metric&lang=zh_cn`
- **5 天预报**（3 小时粒度）：`GET https://api.openweathermap.org/data/2.5/forecast?q={city}&appid={KEY}&units=metric&lang=zh_cn`
- **地理编码**（模糊搜索 + 防重名歧义）：`GET https://api.openweathermap.org/geo/1.0/direct?q={city}&limit=5&appid={KEY}`
- **反向定位**（自动定位用）：`GET https://api.openweathermap.org/geo/1.0/reverse?lat={lat}&lon={lon}&limit=1&appid={KEY}`

Key 通过 `import.meta.env.VITE_OWM_KEY` 读取（.env.local，不入库）。
所有请求 try-catch 包裹；`cod !== 200` 统一抛 ApiError（带 message）。
城市唯一标识用 `geo` 返回的 `lat,lon` 字符串对（避免重名城市歧义），查询时也可用 `lat/lon` 直查。

## 类型（src/types.ts）

```ts
export interface CurrentWeather {
  city: string          // 展示名（本地化）
  country: string
  temp: number          // °C
  feelsLike: number
  humidity: number      // %
  windSpeed: number     // m/s
  condition: string     // 本地化描述
  icon: string          // OWM icon code（如 "01d"）
  dt: number            // 观测时间戳（秒）
}

export interface ForecastDay {
  date: string          // yyyy-MM-dd
  tempMin: number
  tempMax: number
  condition: string
  icon: string
}

export interface CityRef {
  id: string            // `${lat},${lon}`（保留 4 位小数）
  name: string
  country: string
  lat: number
  lon: number
}
```

## 状态（src/store.ts — zustand）

`useCityStore`（persist key `"weather-studio.cities.v1"`）：
- `favorites: CityRef[]`、`addFavorite/removeFavorite/isFavorite`
- `lastCity: CityRef | null` + `setLastCity`（记住最后一次查询，刷新恢复）

`useWeatherStore`（内存，不持久化）：
- `status: 'idle' | 'loading' | 'ready' | 'error'`
- `current: CurrentWeather | null`、`forecast: ForecastDay[]`、`errorMsg: string`
- `loadCity(ref: CityRef)`：并发拉 current + forecast（Promise.all），forecast 按 yyyy-MM-dd 分组取每日 min/max（取 06/12/18 时代表像，或全天极值）
- `loadByQuery(query)`：先 geo/direct 拿 CityRef，再 loadCity；404 → 「没有找到这个城市」

## 选中态

- 「当前选中城市」= useWeatherStore 的 activeRef；收藏列表项高亮橙线（同 notes-studio 3px 左橙线语言）
