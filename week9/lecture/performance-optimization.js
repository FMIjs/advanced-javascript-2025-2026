// Browser Performance and Optimization

// Event Loop (review from Week 4, browser context)

const eventLoop = () => {
  // JavaScript is single-threaded with event loop:
  // 1. Execute synchronous code (call stack)
  // 2. Microtasks: Promise .then(), MutationObserver, queueMicrotask()
  // 3. Render: DOM updates, paint
  // 4. Macrotasks: setTimeout, setInterval, click events

  // Example execution order:
  // console.log('1');
  // Promise.resolve().then(() => console.log('2'));
  // setTimeout(() => console.log('3'), 0);
  // console.log('4');
  // Output: 1, 4, 2, 3

  console.log('Event loop: sync -> microtasks -> render -> macrotasks');
};

// requestAnimationFrame: Sync with Browser Refresh

const rAFPattern = () => {
  // setInterval fires regardless of browser tabs visibility
  // requestAnimationFrame pauses if tab hidden, syncs with refresh rate

  // const animate = (timestamp) => {
  //   // timestamp from navigation start
  //   const progress = (timestamp - startTime) / duration;
  //   if (progress < 1) {
  //     // update animation frame
  //     requestAnimationFrame(animate);
  //   }
  // };
  // requestAnimationFrame(animate);

  console.log('requestAnimationFrame: 60fps sync, respects tab visibility');
};

// Debouncing: Reduce Function Calls

const debounce = () => {
  const debounce = (fn, delay) => {
    let timeoutId;
    return (...args) => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => fn(...args), delay);
    };
  };

  // Usage: resize listener fires constantly, debounce it
  // const handleResize = debounce(() => {
  //   console.log('window resized');
  // }, 300);
  // window.addEventListener('resize', handleResize);

  // Only fires 300ms after last resize event

  console.log('debounce: wait for user to stop, then fire once');
};

// Throttling: Limit Frequency

const throttle = () => {
  const throttle = (fn, interval) => {
    let lastCall = 0;
    return (...args) => {
      const now = Date.now();
      if (now - lastCall >= interval) {
        lastCall = now;
        fn(...args);
      }
    };
  };

  // Usage: scroll listener fires constantly, throttle it
  // const handleScroll = throttle(() => {
  //   console.log('scrolling');
  // }, 100);
  // window.addEventListener('scroll', handleScroll);

  // Fires at most every 100ms

  console.log('throttle: fire at most every Nms');
};

// Lazy Loading Images

const lazyLoadingImages = () => {
  // Method 1: Intersection Observer (modern, recommended)
  // const images = document.querySelectorAll('img[data-src]');
  // const observer = new IntersectionObserver((entries) => {
  //   entries.forEach(entry => {
  //     if (entry.isIntersecting) {
  //       const img = entry.target;
  //       img.src = img.dataset.src;
  //       observer.unobserve(img);
  //     }
  //   });
  // });
  // images.forEach(img => observer.observe(img));

  // HTML attribute for native lazy loading
  // <img src="..." loading="lazy" />

  console.log('Lazy loading: load images only when visible');
};

// Code Splitting and Dynamic Import

const dynamicImport = () => {
  // Load module only when needed
  // const loadEditor = async () => {
  //   const { Editor } = await import('./editor.js');
  //   return new Editor();
  // };

  // button.addEventListener('click', async () => {
  //   const editor = await loadEditor();
  // });

  console.log('Dynamic import: load code only when used');
};

// DOM Performance: Batch Updates

const batchDOMUpdates = () => {
  // Bad: many reflows
  // for (let i = 0; i < 1000; i++) {
  //   const div = document.createElement('div');
  //   div.textContent = `Item ${i}`;
  //   document.body.appendChild(div); // reflow each time!
  // }

  // Good: single reflow
  // const frag = document.createDocumentFragment();
  // for (let i = 0; i < 1000; i++) {
  //   const div = document.createElement('div');
  //   div.textContent = `Item ${i}`;
  //   frag.appendChild(div); // no reflow
  // }
  // document.body.appendChild(frag); // single reflow

  console.log('Fragment batching: one reflow instead of 1000');
};

// Avoiding Layout Thrashing

const layoutThrashing = () => {
  // Bad: read-write-read-write pattern
  // const boxes = document.querySelectorAll('.box');
  // boxes.forEach(box => {
  //   const w = box.offsetWidth;     // read: triggers layout
  //   box.style.width = (w * 2) + 'px'; // write
  // });

  // Good: batch reads, then writes
  // const widths = Array.from(boxes).map(box => box.offsetWidth);
  // boxes.forEach((box, i) => {
  //   box.style.width = (widths[i] * 2) + 'px';
  // });

  console.log('Layout thrashing: batch reads first, then writes');
};

// Memoization in DOM Context

const memoizationDOM = () => {
  // Cache expensive DOM queries
  // const cachedSelectors = {};
  // const $ = (selector) => {
  //   if (!cachedSelectors[selector]) {
  //     cachedSelectors[selector] = document.querySelector(selector);
  //   }
  //   return cachedSelectors[selector];
  // };

  // const btn = $('button.primary'); // first time: queries DOM
  // const btn2 = $('button.primary'); // second time: cached

  console.log('Cache DOM selectors to avoid repeated queries');
};

// Event Delegation Performance

const delegationPerformance = () => {
  // Bad: 1000 listeners
  // const items = document.querySelectorAll('li');
  // items.forEach(item => {
  //   item.addEventListener('click', handler); // 1000 listeners
  // });

  // Good: 1 listener
  // const list = document.querySelector('ul');
  // list.addEventListener('click', (e) => {
  //   if (e.target.tagName === 'LI') {
  //     handler(e);
  //   }
  // });

  console.log('Delegation: one listener instead of thousands');
};

// CSS Containment (for very large DOMs)

const cssContainment = () => {
  // <div class="card" style="contain: layout style paint;">
  //   <!-- large content -->
  // </div>

  // contain: layout - element layout independent from rest of page
  // contain: style - no external style affects children
  // contain: paint - no overflow outside bounds
  // contain: content - combination

  console.log('CSS contain: browser optimizes large DOMs');
};

// Virtual Scrolling (for long lists)

const virtualScrolling = () => {
  // Only render visible items + buffer
  // const renderList = (items, startIdx, count) => {
  //   const visible = items.slice(startIdx, startIdx + count);
  //   const ul = document.querySelector('ul');
  //   ul.innerHTML = '';
  //   visible.forEach(item => {
  //     const li = document.createElement('li');
  //     li.textContent = item;
  //     ul.appendChild(li);
  //   });
  // };

  // Handle scroll to update visible range

  console.log('Virtual scrolling: render only visible + buffer, huge performance gain');
};

// Performance Metrics

const performanceAPI = () => {
  // Measure custom timings
  // performance.mark('operation-start');
  // // ... do work
  // performance.mark('operation-end');
  // performance.measure('operation', 'operation-start', 'operation-end');

  // const measures = performance.getEntriesByName('operation');
  // console.log('Duration:', measures[0].duration, 'ms');

  // Navigation timing
  // performance.timing.loadEventEnd - performance.timing.navigationStart

  console.log('Performance API: measure custom operations');
};

// Building a Perf Monitor (like Week 4 patterns)

const perfMonitor = () => {
  const monitor = {
    marks: {},

    start: (label) => {
      monitor.marks[label] = performance.now();
    },

    end: (label) => {
      const dur = performance.now() - monitor.marks[label];
      console.log(`${label}: ${dur.toFixed(2)}ms`);
      delete monitor.marks[label];
      return dur;
    }
  };

  // Usage:
  // monitor.start('api-call');
  // await fetch(...);
  // monitor.end('api-call');
};

console.log('Performance Patterns:');
console.log('- Event loop: sync -> microtasks -> render -> macrotasks');
console.log('- requestAnimationFrame: sync with browser refresh');
console.log('- debounce: wait for pause, fire once');
console.log('- throttle: limit fire frequency');
console.log('- Fragment updates: batch DOM operations');
console.log('- Event delegation: one listener for many elements');
console.log('- Cache queries: memoize DOM selections');
console.log('- Layout thrashing: batch reads, then writes');
console.log('- Virtual scrolling: render only visible items');
