# 🌍 World Clock - Digital Clock & Time Zone Converter

<div align="center">
```markdown
# 🌍 world-clock-app

<div align="center">

![World Clock Banner](https://img.shields.io/badge/world-clock-v1.0-blue?style=for-the-badge)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)

An elegant, lightweight world clock web app with a stopwatch, countdown timer, and history tracking. Built with vanilla JavaScript, CSS, and semantic HTML.

[Live Demo](#) • [Report Bug](https://github.com/sbibers/world-clock-app/issues) • [Request Feature](https://github.com/sbibers/world-clock-app/issues)

</div>

---

## Features

- Real-time world clock with timezone selection
- Stopwatch with lap tracking and session persistence
- Countdown timer with audio notification and history
- History view backed by localStorage
- Light / Dark theme toggle
- Responsive, touch-friendly UI

---

## Quick start

No build tools required — this is a static site. You can either open the `index.html` file directly in your browser or serve the folder with a simple static server.

Clone the repo:

```fish
git clone https://github.com/sbibers/world-clock-app.git
cd world-clock-app
```

Open directly (double-click `index.html` in your file manager) or run a local server (recommended for consistent behavior):

```fish
# Using Python 3
python3 -m http.server 8000
# then visit http://localhost:8000

# (alternative) if you have Node.js installed:
npx http-server -c-1 .
```

---

## Project structure

```
world-clock-app/
├── index.html
├── css/
│   └── styles.css
├── js/
│   ├── app.js
│   ├── WorldClock.js
│   ├── Stopwatch.js
│   ├── Timer.js
│   └── History.js
├── images/
├── README.md
└── LICENSE
```

---

## How to use

- World Clock: select a timezone from the dropdown; the clock updates in real-time.
- Stopwatch: Start, Lap, Stop, Reset — laps are saved in session history.
- Timer: enter H:M:S, start the countdown — an audio alert plays when finished.
- History: view and clear past stopwatch sessions and completed timers.
- Theme: toggle light/dark using the theme icon in the UI.

---

## Development notes

- Code is written in ES6+ and uses the browser `Intl` API for timezone/date formatting.
- Data persistence uses `localStorage` (no server-side storage).
- Keep the code modular: each feature (WorldClock, Stopwatch, Timer, History) lives in its own JS file under `js/`.

If you add features or refactor, please keep changes small and add comments for maintainability.

---

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/my-feature`
3. Commit your changes: `git commit -m "Add my feature"`
4. Push and open a pull request

Please include a short description and, where appropriate, screenshots or steps to reproduce.

---

## License

This project is licensed under the MIT License — see the `LICENSE` file for details.

---

## Author

Salam Baybars — https://github.com/sbibers

---

Made with ❤️. Star the repo if you find it useful!

``` 

