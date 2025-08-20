
---

## 🌦️ Climate — Your Smart Weather Companion

### A modern, sleek weather application built with React + TypeScript + Vite. Featuring:

* 🌍 **Real-time Weather Data** (OpenWeatherMap API)
* 🌙 **Dark & Light Theme Toggle**
* ⭐ **Favorite Locations with LocalStorage**
* 🔍 **Smart Search with Suggestions & History**
* 📈 **Hourly & 5-Day Forecasts**
* 📌 **Responsive & Interactive UI**

---

## 🚀 Demo

[🔗 Live Site (Optional)](https://climate.vercel.app)


---

## 🧠 Features

* ✅ Current weather by **city or location**
* ✅ Hourly temperature chart (Today)
* ✅ 5-day forecast (min/max temp, humidity, wind)
* ✅ Weather details: pressure, wind direction, sunrise/sunset
* ✅ **Add/remove favorite cities** with a single click
* ✅ **Persist search history** across sessions
* ✅ Elegant **dark/light mode** with system preference support

---

## 🛠️ Built With

* ⚛️ [React](https://react.dev/)
* 🟦 [TypeScript](https://www.typescriptlang.org/)
* ⚡ [Vite](https://vitejs.dev/)
* 💨 [Tailwind CSS](https://tailwindcss.com/)
* 📦 [OpenWeatherMap API](https://openweathermap.org/api)
* 🌘 [next-themes](https://github.com/pacocoursey/next-themes) *(if using Next.js)*
* 📦 [Sonner](https://ui.shadcn.dev/docs/components/sonner) for toast notifications

---

## 📂 Folder Structure

```
/src
  ├── components/          # UI Components
  ├── hooks/               # Custom React Hooks (e.g., useFavourites, useWeather)
  ├── api/                 # API interaction logic
  ├── assets/              # Static icons & images
  ├── pages/               # Main page layout
  ├── styles/              # Tailwind or custom styles
  └── App.tsx              # Main entry
```

---

## 🌐 Environment Setup

1. **Clone the repo**:

```bash
git clone https://github.com/SATYAPRAKASH1419/Climate.git
cd Climate
```

2. **Install dependencies**:

```bash
npm install
```

3. **Create `.env` file**:

```env
VITE_WEATHER_API_KEY=your_openweather_api_key
```

> Get yours from [https://openweathermap.org/api](https://openweathermap.org/api)

4. **Run the app**:

```bash
npm run dev
```

5. **Build for production**:

```bash
npm run build
```

---

## 💾 Local Storage Keys Used

| Key              | Purpose                 |
| ---------------- | ----------------------- |
| `favorites`      | Stores favorite cities  |
| `recentSearches` | Stores search history   |
| `theme`          | Stores theme preference |

---

## 📌 Todo / Improvements

* [ ] Add map view of location
* [ ] Offline cache
* [ ] Real-time precipitation radar
* [ ] Progressive Web App (PWA) support

---

## 🤝 Contribution

Pull requests welcome! If you find any bugs or want to suggest new features, feel free to open an issue.

---

## 🧑‍💻 Author

**Satya Prakash Swain**
🔗 [GitHub](https://github.com/SATYAPRAKASH1419)

---

## 📄 License

MIT License. © 2025 Satya Prakash Swain

---

