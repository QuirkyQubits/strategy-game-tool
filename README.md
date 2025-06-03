# 🛠️ Strategy Game Level Creator

A lightweight, browser-based tool for designing and editing tile-based maps for strategy games, dungeon crawlers, or any grid-based RPG.

This tool is part of the [Strategy Game Movement System](https://quirkyqubits.github.io/strategy-game-movement), and is intended to streamline the early phases of level design by making it easy to sketch, test, and share maps.

---

## 🚀 Try It Live

[Level Creator](https://quirkyqubits.github.io/strategy-game-tool/)

---

## ✨ Features

- 🔢 **Customizable Grid Size**  
  Create levels ranging from **1×1 up to 100×100** tiles. Click "New Level" and input a number between 1 and 100 to define the grid size.

- 🎨 **Draw Levels Visually**  
  Select terrain types and draw directly onto a grid, similar to MS Paint.

- 💾 **Export as JSON**  
  Save your map in a structured format suitable for use in game engines or simulation backends.

- 📂 **Import & Edit Maps**  
  Load previously saved JSON maps to view, modify, or extend them.

- ⚡ **Built for Rapid Prototyping**  
  Ideal for testing out terrain balance, level layout, and tile variety.

---

## 🧪 Example Use Case

This tool pairs with the [C# simulation backend](https://github.com/QuirkyQubits/strategy-game-djikstra-algorithm) that consumes exported JSON maps and simulates movement and combat logic in a console environment.

Use this tool to:
1. Sketch a level
2. Export the JSON
3. Run it through the simulation backend

---

## 📌 Notes

- This tool works best in **Google Chrome**  
  (Other browsers are not fully tested)
- All data is stored in-memory — remember to export if you want to save your work.

---

## 📄 License

MIT License
