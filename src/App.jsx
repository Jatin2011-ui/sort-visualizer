import React, { useEffect } from 'react'

export default function App() {
  useEffect(() => {
    // --- Script copied from original file and adapted to run after mount ---
    const container = document.getElementById('visualizer-container');
    const generateBtn = document.getElementById('generate-array');
    const sizeSlider = document.getElementById('array-size');
    const speedSlider = document.getElementById('speed');
    const algorithmButtons = document.querySelectorAll('.algo-btn');
    const sizeValueSpan = document.getElementById('size-value');
    const speedValueSpan = document.getElementById('speed-value');
    const complexityDisplay = document.getElementById('complexity-display');

    let array = [];
    let isSorting = false;

    const colors = {
      PRIMARY_COLOR: 'bg-blue-400',
      COMPARE_COLOR: 'bg-yellow-400',
      SWAP_COLOR: 'bg-red-500',
      SORTED_COLOR: 'bg-green-400',
      PIVOT_COLOR: 'bg-purple-500',
    };

    const complexities = {
      bubble:    { time: 'O(n²)', space: 'O(1)' },
      selection: { time: 'O(n²)', space: 'O(1)' },
      insertion: { time: 'O(n²)', space: 'O(1)' },
      merge:     { time: 'O(n log n)', space: 'O(n)' },
      quick:     { time: 'O(n log n)', space: 'O(log n)' }
    };

    function generateArray() {
      if (isSorting) return;
      array = [];
      const arraySize = sizeSlider.value;
      for (let i = 0; i < arraySize; i++) array.push(Math.floor(Math.random() * 95) + 5);
      renderArray();
    }

    function renderArray(specialColors = {}) {
      const arraySize = array.length;
      const barWidth = 100 / arraySize;
      container.innerHTML = '';
      array.forEach((value, index) => {
        const bar = document.createElement('div');
        bar.style.height = `${value}%`;
        bar.style.width = `${barWidth}%`;
        let colorClass = specialColors[index] || colors.PRIMARY_COLOR;
        bar.classList.add('bar', colorClass, 'transition-colors', 'duration-100');
        container.appendChild(bar);
      });
    }

    function sleep() {
      const maxDelay = 201;
      const currentSpeed = speedSlider.value;
      const delay = maxDelay - currentSpeed;
      return new Promise(resolve => setTimeout(resolve, delay));
    }

    function swap(i, j) { [array[i], array[j]] = [array[j], array[i]]; }

    function disableControls() {
      isSorting = true;
      generateBtn.disabled = true;
      sizeSlider.disabled = true;
      algorithmButtons.forEach(btn => btn.disabled = true);
      [generateBtn, ...algorithmButtons].forEach(btn => btn.classList.add('opacity-50', 'cursor-not-allowed'));
    }

    function enableControls() {
      isSorting = false;
      generateBtn.disabled = false;
      sizeSlider.disabled = false;
      algorithmButtons.forEach(btn => btn.disabled = false);
      [generateBtn, ...algorithmButtons].forEach(btn => btn.classList.remove('opacity-50', 'cursor-not-allowed'));
    }

    async function finishSort() {
      for (let i = 0; i < array.length; i++) {
        if (!isSorting) break;
        renderArray({ [i]: colors.SORTED_COLOR });
        await new Promise(resolve => setTimeout(resolve, 5));
      }
      renderArray(Array(array.length).fill(colors.SORTED_COLOR).reduce((acc, val, idx) => ({...acc, [idx]: val}), {}));
      enableControls();
    }

    async function bubbleSort() {
      disableControls();
      const n = array.length;
      for (let i = 0; i < n - 1; i++) {
        for (let j = 0; j < n - i - 1; j++) {
          if (!isSorting) { enableControls(); return; }
          renderArray({ [j]: colors.COMPARE_COLOR, [j + 1]: colors.COMPARE_COLOR });
          await sleep();
          if (array[j] > array[j + 1]) {
            renderArray({ [j]: colors.SWAP_COLOR, [j + 1]: colors.SWAP_COLOR });
            await sleep();
            swap(j, j + 1);
            renderArray({ [j]: colors.SWAP_COLOR, [j + 1]: colors.SWAP_COLOR });
            await sleep();
          }
        }
      }
      if (isSorting) finishSort();
    }

    async function selectionSort() {
      disableControls();
      const n = array.length;
      for (let i = 0; i < n - 1; i++) {
        let min_idx = i;
        for (let j = i + 1; j < n; j++) {
          if (!isSorting) { enableControls(); return; }
          renderArray({ [j]: colors.COMPARE_COLOR, [min_idx]: colors.PIVOT_COLOR, [i]: colors.SWAP_COLOR });
          await sleep();
          if (array[j] < array[min_idx]) min_idx = j;
        }
        swap(min_idx, i);
        renderArray({ [i]: colors.SORTED_COLOR });
        await sleep();
      }
      if (isSorting) finishSort();
    }

    async function insertionSort() {
      disableControls();
      const n = array.length;
      for (let i = 1; i < n; i++) {
        let key = array[i];
        let j = i - 1;
        renderArray({ [i]: colors.PIVOT_COLOR });
        await sleep();
        while (j >= 0 && array[j] > key) {
          if (!isSorting) { enableControls(); return; }
          renderArray({ [j]: colors.COMPARE_COLOR, [j + 1]: colors.SWAP_COLOR });
          await sleep();
          array[j + 1] = array[j];
          j = j - 1;
          renderArray();
        }
        array[j + 1] = key;
        renderArray({ [j + 1]: colors.SWAP_COLOR });
        await sleep();
      }
      if (isSorting) finishSort();
    }

    async function mergeSort() { disableControls(); await mergeSortRecursive(0, array.length - 1); if (isSorting) finishSort(); }
    async function mergeSortRecursive(l, r) { if (l >= r || !isSorting) return; const m = Math.floor(l + (r - l) / 2); await mergeSortRecursive(l, m); await mergeSortRecursive(m + 1, r); await merge(l, m, r); }
    async function merge(l, m, r) {
      if(!isSorting) return;
      let n1 = m - l + 1, n2 = r - m;
      let L = new Array(n1), R = new Array(n2);
      for (let i = 0; i < n1; i++) L[i] = array[l + i];
      for (let j = 0; j < n2; j++) R[j] = array[m + 1 + j];
      let i = 0, j = 0, k = l;
      while (i < n1 && j < n2) {
        if (!isSorting) return;
        renderArray({ [l + i]: colors.COMPARE_COLOR, [m + 1 + j]: colors.COMPARE_COLOR });
        await sleep();
        if (L[i] <= R[j]) { array[k] = L[i]; i++; } else { array[k] = R[j]; j++; }
        renderArray({ [k]: colors.SWAP_COLOR });
        await sleep();
        k++;
      }
      while (i < n1) { if (!isSorting) return; array[k] = L[i]; renderArray({ [k]: colors.SWAP_COLOR }); await sleep(); i++; k++; }
      while (j < n2) { if (!isSorting) return; array[k] = R[j]; renderArray({ [k]: colors.SWAP_COLOR }); await sleep(); j++; k++; }
    }

    async function quickSort() { disableControls(); await quickSortRecursive(0, array.length - 1); if (isSorting) finishSort(); }
    async function quickSortRecursive(low, high) { if (low < high && isSorting) { let pi = await partition(low, high); if (!isSorting) return; await quickSortRecursive(low, pi - 1); await quickSortRecursive(pi + 1, high); } }
    async function partition(low, high) {
      let pivot = array[high]; let i = low - 1; renderArray({ [high]: colors.PIVOT_COLOR }); await sleep();
      for (let j = low; j <= high - 1; j++) {
        if (!isSorting) return i;
        renderArray({ [j]: colors.COMPARE_COLOR, [high]: colors.PIVOT_COLOR });
        await sleep();
        if (array[j] < pivot) { i++; swap(i, j); renderArray({ [i]: colors.SWAP_COLOR, [j]: colors.SWAP_COLOR, [high]: colors.PIVOT_COLOR }); await sleep(); }
      }
      swap(i + 1, high); renderArray({ [i + 1]: colors.SORTED_COLOR }); await sleep(); return i + 1;
    }

    function handleStopAndReset() { if (isSorting) { isSorting = false; enableControls(); } generateArray(); }

    generateBtn.addEventListener('click', handleStopAndReset);
    sizeSlider.addEventListener('input', () => { sizeValueSpan.textContent = sizeSlider.value; handleStopAndReset(); });
    speedSlider.addEventListener('input', () => { const maxDelay = 201; const delay = maxDelay - speedSlider.value; speedValueSpan.textContent = `${delay}ms`; });

    algorithmButtons.forEach(button => {
      button.addEventListener('click', () => {
        if (isSorting) return;
        const algo = button.getAttribute('data-algo');
        const complexityInfo = complexities[algo];
        complexityDisplay.innerHTML = `
          <h3 class="text-lg font-semibold capitalize text-blue-600">${algo} Sort</h3>
          <div class="flex justify-center gap-6 mt-2">
            <p><span class="font-medium text-gray-600">Time Complexity:</span> <span class="font-mono text-gray-800">${complexityInfo.time}</span></p>
            <p><span class="font-medium text-gray-600">Space Complexity:</span> <span class="font-mono text-gray-800">${complexityInfo.space}</span></p>
          </div>
        `;
        switch (algo) {
          case 'bubble': bubbleSort(); break;
          case 'selection': selectionSort(); break;
          case 'insertion': insertionSort(); break;
          case 'merge': mergeSort(); break;
          case 'quick': quickSort(); break;
        }
      });
    });

    // initial
    sizeValueSpan.textContent = sizeSlider.value;
    const maxDelay = 201;
    const delay = maxDelay - speedSlider.value;
    speedValueSpan.textContent = `${delay}ms`;
    generateArray();

    // cleanup when component unmounts: remove listeners
    return () => {
      generateBtn.removeEventListener('click', handleStopAndReset);
      sizeSlider.removeEventListener('input', () => {});
      speedSlider.removeEventListener('input', () => {});
      algorithmButtons.forEach(button => {
        // we can't directly remove the same anonymous listener here; in a more thorough port we would keep references
      });
    };
  }, []);

  return (
    <div className="bg-gray-100 text-gray-800 flex flex-col items-center justify-center min-h-screen p-4">
      <div className="w-full max-w-6xl mx-auto">
        <main id="visualizer-container" className="w-full h-[60vh] bg-white rounded-lg shadow-inner flex justify-center items-end gap-px p-2 mb-4 border"></main>

        <header className="bg-white rounded-lg shadow-lg p-4 border">
          <div className="flex flex-col xl:flex-row items-center justify-between gap-4">
            <h1 className="text-xl sm:text-2xl font-bold text-blue-600">Sorting Visualizer</h1>

            <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-4">
              <button id="generate-array" className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-lg transition duration-300">New Array</button>

              <div className="flex items-center gap-2">
                <label htmlFor="array-size" className="whitespace-nowrap">Size:</label>
                <input id="array-size" type="range" min="10" max="150" defaultValue="50" className="w-32" />
                <span id="size-value" className="font-mono w-8 text-center">50</span>
              </div>

              <div className="flex items-center gap-2">
                <label htmlFor="speed" className="whitespace-nowrap">Speed:</label>
                <input id="speed" type="range" min="1" max="200" defaultValue="100" className="w-32" />
                <span id="speed-value" className="font-mono w-12 text-center">101ms</span>
              </div>
            </div>

            <div id="algorithm-buttons" className="flex flex-wrap items-center justify-center gap-2">
              <button data-algo="bubble" className="algo-btn bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-3 rounded-lg transition duration-300 text-sm">Bubble</button>
              <button data-algo="selection" className="algo-btn bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-3 rounded-lg transition duration-300 text-sm">Selection</button>
              <button data-algo="insertion" className="algo-btn bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-3 rounded-lg transition duration-300 text-sm">Insertion</button>
              <button data-algo="merge" className="algo-btn bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-3 rounded-lg transition duration-300 text-sm">Merge</button>
              <button data-algo="quick" className="algo-btn bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-3 rounded-lg transition duration-300 text-sm">Quick</button>
            </div>
          </div>
        </header>

        <div id="complexity-display" className="w-full max-w-6xl mx-auto mt-4 bg-white rounded-lg shadow-lg p-4 text-center border">
          <p className="text-gray-500">Select an algorithm to view its time and space complexity.</p>
        </div>
      </div>
    </div>
  )
}
