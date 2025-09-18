# 🌦️ RainCheck

RainCheck is a modern **AI-assisted weather dashboard** that provides real-time forecasts in a clean, responsive interface.

It’s designed for **students, developers, and everyday users** who want a lightweight and intuitive way to check the weather while also serving as a **practical learning project** for exploring AI-assisted software development.

**Why it matters:**
- **Users:** Offers a fast, accessible, and visually engaging way to get local or global weather updates without bloated apps.
- **Developers & learners:** Demonstrates how AI can accelerate coding, testing, and API integration—turning a simple weather app into a hands-on showcase of **AI-augmented development practices**.
- **Tech community:** Shows how AI tools can be integrated thoughtfully into real-world software workflows, rather than being used as black-box shortcuts.

---

## 🛠️ Tech Stack

- **Languages:** JavaScript (React for frontend)  
- **Framework:** Vite + React (fast development environment and modular UI)  
- **Database:** None (data is fetched directly from the [OpenWeatherMap API](https://openweathermap.org/api))  
- **Libraries/Tools:**  
  - **Axios** or Fetch API for making HTTP requests  
  - **Chart.js** or Recharts for weather trend visualization  
  - **Tailwind CSS** for styling and responsiveness  
  - **Framer Motion** (optional) for animations and smooth UI transitions

---

## 🤖 AI Integration Plan

### 🧱 Code or Feature Generation
AI will be used to:  
- Scaffold React components such as `WeatherCard`, `SearchBox`, and `ForecastChart`.  
- Generate helper functions for fetching and parsing weather data.  
- Propose routing structures (e.g., `/city/:name`) for future scalability.

### 🧪 Testing Support
AI will assist with:  
- Generating **unit tests** for utility functions (e.g., Kelvin-to-Celsius conversion).  
- Writing **integration tests** to ensure API responses render properly in components.  
- **Example:** *“Write a Jest test to confirm the `convertKelvinToCelsius` function rounds to one decimal place.”*

### 📡 Schema-Aware or API-Aware Generation
- By providing AI with the OpenWeatherMap API response schema, it will:  
  - Generate functions that extract and format data (temperature, humidity, wind speed).  
  - Suggest TypeScript models if the project is expanded.  
- **Example:** *“Given this API response, generate a function that returns the next 5 days’ forecast formatted for Chart.js.”*

---

## 🔍 In-Editor / PR Review Tooling

- **Tool of Choice:** Cursor (AI-powered IDE for code completion and refactoring)  
- **Support Provided:**  
  - Automated code reviews with suggestions for error handling and structure  
  - Auto-generated commit messages for PRs  
  - Refactoring support (splitting large components into reusable parts)

---

## ✍️ Prompting Strategy

**Prompt 1 – Component Generation:**  
*"Scaffold a React component called `WeatherCard` that accepts props for city name, temperature, humidity, and condition, and displays them using Tailwind CSS."*

**Prompt 2 – API-Aware Function:**  
*"Given this OpenWeatherMap API response JSON, write a JavaScript function that extracts the next 5 days’ forecast and formats the data for a Chart.js line chart."*

---

## 🚀 Roadmap

1. **MVP** – Display current weather for a fixed city  
2. **Search** – Add city search functionality  
3. **Forecast** – Display 5-day forecast with charts  
4. **UI Polish** – Add responsive design, weather icons, and background themes  
5. **AI Features** – Integrate AI-generated weather summaries (e.g., “Great day for outdoor activities!”)
