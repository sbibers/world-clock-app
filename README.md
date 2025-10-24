<div align="center">

# 🌍 World Clock App

### _Your Personal Time Companion_

![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)
![Status](https://img.shields.io/badge/Status-Active-success?style=for-the-badge)

<p align="center">
  <strong>An elegant, lightweight web application</strong> that combines a real-time world clock, stopwatch, countdown timer, and session history tracking — all built with <strong>vanilla JavaScript, CSS, and semantic HTML</strong>.
</p>

[🌐 Live Demo](https://sbibers.github.io/world-clock-app/) • [📖 Documentation](#-how-to-use)
</div>

---

## ✨ Features

<table>
  <tr>
    <td align="center">⏰</td>
    <td><strong>World Clock</strong><br/>Real-time clock with timezone selection from around the globe</td>
  </tr>
  <tr>
    <td align="center">⏱️</td>
    <td><strong>Stopwatch</strong><br/>Start, stop, lap tracking with persistent session storage</td>
  </tr>
  <tr>
    <td align="center">⏳</td>
    <td><strong>Countdown Timer</strong><br/>Set custom timers (H:M:S) with audio notifications</td>
  </tr>
  <tr>
    <td align="center">📝</td>
    <td><strong>History Tracking</strong><br/>Review past stopwatch sessions and completed timers</td>
  </tr>
  <tr>
    <td align="center">🌗</td>
    <td><strong>Theme Toggle</strong><br/>Seamless light and dark mode switching</td>
  </tr>
  <tr>
    <td align="center">📱</td>
    <td><strong>Responsive Design</strong><br/>Touch-friendly UI that works flawlessly on any device</td>
  </tr>
</table>

---

## 🚀 Quick Start

> **No build tools required** — this is a pure static site!

### 📥 Installation

```bash
# Clone the repository
git clone https://github.com/sbibers/world-clock-app.git

# Navigate to project directory
cd world-clock-app
```

### 🏃 Run Locally

**Option 1: Direct Open** (Quick & Easy)
```bash
# Simply open index.html in your browser
open index.html  # macOS
# or double-click the file in your file manager
```

**Option 2: Local Server** (Recommended)
```bash
# Using Python 3
python3 -m http.server 8000
# Then visit → http://localhost:8000

# Using Node.js (alternative)
npx http-server -c-1 .
# Then visit → http://localhost:8080
```

---

## 📁 Project Structure

```
world-clock-app/
│
├── 📄 index.html           # Main HTML entry point
├── 📄 README.md            # You are here!
│
├── 🎨 css/
│   └── styles.css          # All styling and theme definitions
│
├── 🖼️ images/              # Assets and icons
│
└── 🧩 js/                  # Modular JavaScript components
    ├── app.js              # Main application orchestrator
    ├── WorldClock.js       # World clock functionality
    ├── Stopwatch.js        # Stopwatch with lap tracking
    ├── Timer.js            # Countdown timer logic
    └── History.js          # Session history management
```

---

## 📖 How to Use

### ⏰ **World Clock**
1. Select your desired timezone from the dropdown menu
2. Watch the time update in real-time
3. Switch between different time zones instantly

### ⏱️ **Stopwatch**
1. Click **Start** to begin timing
2. Click **Lap** to record split times
3. Click **Stop** to pause, **Reset** to clear
4. All lap data is automatically saved to your session history

### ⏳ **Countdown Timer**
1. Enter your desired time in H:M:S format
2. Click **Start** to begin the countdown
3. An audio alert will notify you when time's up
4. Completed timers are saved to history

### 📝 **History**
- View all past stopwatch sessions and timer completions
- Clear individual entries or entire history
- Data persists across browser sessions via `localStorage`

### 🌗 **Theme Toggle**
- Click the theme icon to switch between light and dark modes
- Your preference is remembered for future visits

---

## 🛠️ Technology Stack

<div align="center">

| Technology | Purpose |
|:----------:|:--------|
| **HTML5** | Semantic markup structure |
| **CSS3** | Modern styling with CSS Grid & Flexbox |
| **JavaScript (ES6+)** | Interactive functionality & logic |
| **Intl API** | Timezone and date formatting |
| **localStorage** | Client-side data persistence |

</div>

---

## 💻 Development Notes

- 📦 **Zero Dependencies**: Pure vanilla JavaScript, no frameworks or libraries
- 🌐 **Browser API**: Leverages native `Intl` API for timezone/date formatting
- 💾 **Local Storage**: All data persistence via `localStorage` (no backend required)
- 🧱 **Modular Architecture**: Each feature lives in its own dedicated JavaScript file
- 🎯 **ES6+ Syntax**: Modern JavaScript with classes, arrow functions, and template literals

### 🔧 Adding Features

When extending the app:
- ✅ Keep code modular and well-commented
- ✅ Follow the existing file structure
- ✅ Test across different browsers and devices
- ✅ Update this README with new features

---

## 🤝 Contributing

Contributions are what make the open-source community amazing! Any contributions you make are **greatly appreciated**.

### How to Contribute

1. 🍴 **Fork** the repository
2. 🌿 Create your feature branch
   ```bash
   git checkout -b feature/AmazingFeature
   ```
3. 💾 Commit your changes
   ```bash
   git commit -m "Add some AmazingFeature"
   ```
4. 📤 Push to the branch
   ```bash
   git push origin feature/AmazingFeature
   ```
5. 🎉 Open a **Pull Request**

Please include:
- Clear description of changes
- Screenshots (if UI changes)
- Steps to test your feature

---

## 👨‍💻 Author

<div align="center">

**Salam Baybars**

[![GitHub](https://img.shields.io/badge/GitHub-sbibers-181717?style=for-the-badge&logo=github)](https://github.com/sbibers)

</div>

---

<div align="center">

### ⭐ Star this repo if you find it useful!

Made with ❤️ and ☕ by [Salam Baybars](https://github.com/sbibers)

**[⬆ Back to Top](#-world-clock-app)**

</div> 

