# react-sort-visualizer

Minimal Vite + React scaffold for the Sorting Visualizer converted from the original `sort/index.html`.

Quick start (Windows PowerShell):

```powershell
cd "c:\Users\Jatin\Desktop\jatin desktop\c++\react-sort-visualizer"
npm install
npm run dev
```

Then open the displayed local URL (usually http://localhost:5173).

Notes
- This project uses the Tailwind CDN for quick styling (keeps the scaffold minimal).
- I copied the DOM-manipulation script into the React component's useEffect so the visualizer works without a full rewrite; for a cleaner React architecture we can refactor the logic into hooks and state.
