# React Sorting Algorithm Visualizer

A modern, interactive web application built with **React** and **Vite** that visualizes how different sorting algorithms work in real-time. Watch bars animate as they are sorted using Bubble Sort, Selection Sort, Insertion Sort, Merge Sort, and Quick Sort.

![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![Vite](https://img.shields.io/badge/vite-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)

---

## 🚀 Features

- **5 Sorting Algorithms** visualized in real-time:
  - Bubble Sort
  - Selection Sort
  - Insertion Sort
  - Merge Sort
  - Quick Sort

- **Interactive Controls**:
  - Adjust array size (10–150 elements)
  - Control animation speed (1–200ms)
  - Generate new random arrays
  - Stop and reset sorting at any time

- **Algorithm Information**:
  - Displays time and space complexity for each algorithm
  - Color-coded visualization:
    - 🔵 Blue: Default state
    - 🟡 Yellow: Elements being compared
    - 🔴 Red: Elements being swapped
    - 🟢 Green: Sorted elements
    - 🟣 Purple: Pivot element (Quick Sort)

- **Responsive Design**: Works on desktop and tablet screens
- **Modern UI**: Built with Tailwind CSS for a clean, professional look

---

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
- **Node.js** (v16 or higher) – [Download](https://nodejs.org/)
- **npm** (comes with Node.js)

---

## 💻 Installation & Setup

### 1. Navigate to the project directory:
```powershell
cd "c:\Users\Jatin\Desktop\jatin desktop\c++\react-sort-visualizer"
```

### 2. Install dependencies:
```powershell
npm install
```

### 3. Start the development server:
```powershell
npm run dev
```

### 4. Open in your browser:
Once the dev server starts, it will display a local URL (usually **http://localhost:5173**). Open this URL in your web browser.

---

## 🎮 How to Use

1. **Generate Array**: Click the **"New Array"** button to create a random array.
2. **Adjust Array Size**: Use the **Size** slider to change the number of elements (10–150).
3. **Control Speed**: Use the **Speed** slider to adjust animation delay (1–200ms).
4. **Start Sorting**: Click any algorithm button (Bubble, Selection, Insertion, Merge, or Quick) to begin the visualization.
5. **View Complexity**: The algorithm's time and space complexity appears below the controls.
6. **Stop/Reset**: Click **"New Array"** while sorting to stop and reset.

---

## 🛠️ Available Scripts

In the project directory, you can run:

### `npm run dev`
Starts the development server with hot module reloading (HMR).

### `npm run build`
Creates an optimized production build in the `dist` folder.

### `npm run preview`
Previews the production build locally.

---

## 📁 Project Structure

```
react-sort-visualizer/
├── index.html              # Vite HTML template
├── package.json            # Project dependencies & scripts
├── README.md               # This file
├── src/
│   ├── main.jsx            # React entry point
│   ├── App.jsx             # Main sorting visualizer component
│   └── App.css             # Styling (sliders, animations)
└── dist/                   # Production build (generated)
```

---

## 🎨 Technologies Used

- **React 18** – UI framework
- **Vite 5** – Lightning-fast build tool
- **Tailwind CSS** – Utility-first CSS framework (via CDN)
- **JavaScript (ES6+)** – Sorting algorithms & interactivity

---

## 🧠 Sorting Algorithms Explained

| Algorithm | Time Complexity | Space Complexity | Best For |
|-----------|------------------|------------------|----------|
| **Bubble Sort** | O(n²) | O(1) | Educational purposes |
| **Selection Sort** | O(n²) | O(1) | Small datasets |
| **Insertion Sort** | O(n²) | O(1) | Nearly sorted data |
| **Merge Sort** | O(n log n) | O(n) | Large datasets |
| **Quick Sort** | O(n log n) avg | O(log n) | General-purpose sorting |

---

## 📦 Building for Production

To create an optimized production build:

```powershell
npm run build
```

This generates a `dist` folder with optimized, minified files ready for deployment.

To preview the production build locally:

```powershell
npm run preview
```

---

## 🚀 Deployment

The `dist` folder can be deployed to any static hosting service:
- **Netlify** – Drag and drop the `dist` folder
- **Vercel** – Connect your GitHub repo
- **GitHub Pages** – Push to `gh-pages` branch
- **Any web server** – Copy `dist` contents to your server

---

## 💡 Future Enhancements

- [ ] Add more sorting algorithms (Heap Sort, Radix Sort, etc.)
- [ ] Refactor sorting logic into custom React hooks
- [ ] Add sound effects during sorting
- [ ] Implement statistics (comparisons, swaps counter)
- [ ] Add dark mode toggle
- [ ] Mobile-optimized controls

---

## 📝 Notes

- This project uses **Tailwind CSS via CDN** for quick setup. For production, consider using PostCSS + Tailwind for optimized CSS.
- The current implementation combines React components with imperative DOM manipulation via `useEffect`. Future refactoring can move to a fully declarative React approach.
- Sorting algorithms run asynchronously with visual updates for smooth animations.

---

## 🤝 Contributing

Feel free to fork this project and submit pull requests for improvements!

---

## 📄 License

This project is open-source and available under the **MIT License**.

---

## 👨‍💻 Author

Created as an interactive learning tool for visualizing sorting algorithms in real-time.

---

## ❓ Troubleshooting

**Issue**: Port 5173 is already in use
- **Solution**: Run `npm run dev -- --port 3000` to use a different port

**Issue**: Dependencies not installing
- **Solution**: Delete `node_modules` folder and `package-lock.json`, then run `npm install` again

**Issue**: Tailwind styles not appearing
- **Solution**: Ensure the CDN link is active in `index.html` (requires internet connection)

---

**Happy Sorting! 🎉**
