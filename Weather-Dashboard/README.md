# 🌦️ Weather Dashboard

A modern, responsive weather dashboard built with **React**, **TypeScript**, and **Material UI (MUI)**.  
It displays **city-based weather information**, **local time**, **two-week forecasts**, and an **average monthly temperature chart** — all with **dark/light mode** and **English/Persian localization** support.

---

## 📸 Preview

<img src="/Weather-Dashboard/public/project.webp" alt="Dashboard Preview" width="600" />

---

## 🚀 Features

- 🌍 **Multi-language support** (English / Persian)
- 🌗 **Dark / Light mode** toggle
- 🏙️ **City selection** with timezone-based local time
- 📊 **Dynamic line chart** for average monthly temperature
- 🗓️ **Two-week forecast cards**
- 🔁 **Real-time data formatting with dayjs**
- 💅 Fully styled with **Material UI (MUI)** and **custom theme**

---

## 🧩 Tech Stack

| Category                | Technology                                                                   |
| ----------------------- | ---------------------------------------------------------------------------- |
| **Framework**           | [React 18+](https://react.dev/)                                              |
| **Language**            | [TypeScript](https://www.typescriptlang.org/)                                |
| **UI Library**          | [Material UI (MUI)](https://mui.com/)                                        |
| **Charting**            | [Recharts](https://recharts.org/en-US/)                                      |
| **State Management**    | Custom React Context (e.g. `WeatherContext`, `ThemeModeContext`)             |
| **Localization (i18n)** | [react-i18next](https://react.i18next.com/)                                  |
| **Date/Time**           | [dayjs](https://day.js.org/) with `jalaliday`, `utc`, and `timezone` plugins |
| **Styling**             | MUI SX prop + custom palette with dark/light themes                          |

---

## 🌐 Localization

The app supports **English** and **Persian**.

- Persian mode:
  - Right-to-left layout
  - Jalali (شمسی) date and month names
  - Reversed chart direction (Y-axis on right side)
- English mode:
  - Left-to-right layout
  - Gregorian calendar

You can easily switch languages using the **language toggle** (powered by `react-i18next`).

---

## 🕶️ Dark & Light Mode

- Implemented using a **custom MUI theme context** (`ThemeModeContext`)
- Automatically switches palette and chart colors
- Fully responsive design optimized for both modes

---

## 📊 Charts

- Built with **Recharts**
- Gradient line for monthly temperature
- When in **Persian mode**:
  - The chart direction is reversed (right-to-left)
  - Month labels are shown in Persian (e.g. فروردین, اردیبهشت, ...)

---

## 🧠 Data Sources

All data are **mock/static** for demonstration:

- `twoWeekForecast` → static 14-day forecast data
- `monthlyData` → average monthly temperature for several cities
- `CITIES` → predefined city list with timezone info

You can later replace them with live API data (e.g. OpenWeatherMap).

---

## ⚙️ Installation & Setup

1. **Clone the repository**

```bash
git clone https://github.com/yourusername/weather-dashboard.git
cd weather-dashboard
```

2. **Install dependencies**

npm install

or

yarn install

3. **Run the project**

npm start

or

yarn start

4. **Open in browser**

http://localhost:5173

## 🧾 Example Data

🌡️ Monthly Temperature Example

const monthlyData = {
Tehran: [
{ month: "فروردین", temp: 20 },
{ month: "اردیبهشت", temp: 25 },
...
],
"San Francisco": [
{ month: "Jan", temp: 12 },
{ month: "Feb", temp: 14 },
...
],
};

## 🧑‍💻 Author

Roozbeh Badali
Frontend Developer | React & TypeScript Enthusiast

## 📜 License

This project is licensed under the MIT License.
