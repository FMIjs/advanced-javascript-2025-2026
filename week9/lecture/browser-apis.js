// Browser Storage and APIs

// localStorage: Persistent Key-Value Store

const localStorageAPI = () => {
  // Store data (persists after browser close)
  // localStorage.setItem('user', 'john');
  // localStorage.setItem('settings', JSON.stringify({ theme: 'dark' }));

  // Retrieve data
  // const user = localStorage.getItem('user');
  // const settings = JSON.parse(localStorage.getItem('settings'));

  // Check if key exists
  // if (localStorage.getItem('user')) { }
  // if ('user' in localStorage) { }

  // Remove data
  // localStorage.removeItem('user');
  // localStorage.clear(); // remove all

  // Get all keys
  // for (let i = 0; i < localStorage.length; i++) {
  //   const key = localStorage.key(i);
  // }

  console.log('localStorage: domain-specific, ~5-10MB, survives browser close');
};

// sessionStorage: Temporary Key-Value Store

const sessionStorageAPI = () => {
  // Same API as localStorage, but clears when tab closes
  // sessionStorage.setItem('temp', 'value');
  // const temp = sessionStorage.getItem('temp');
  // sessionStorage.removeItem('temp');

  console.log('sessionStorage: cleared when tab closes');
};

// Storage Events (when storage changes in other tabs)

const storageEvents = () => {
  // const handleStorageChange = (e) => {
  //   console.log('Key changed:', e.key);
  //   console.log('Old value:', e.oldValue);
  //   console.log('New value:', e.newValue);
  //   console.log('URL:', e.url);
  // };

  // window.addEventListener('storage', handleStorageChange);

  // Fired in OTHER tabs when storage changes
  // Useful for syncing state across tabs (Week 8 Proxy pattern)

  console.log('storage event: tab A changes localStorage -> fires in tabs B, C, D');
};

// IndexedDB: Large Object Store (Advanced)

const indexedDBIntro = () => {
  // For complex data, IndexedDB is better than localStorage
  // Asynchronous, transactional, more storage (GB+)

  // const req = indexedDB.open('myDB', 1);
  // req.onupgradeneeded = (e) => {
  //   const db = e.target.result;
  //   const store = db.createObjectStore('users', { keyPath: 'id' });
  // };
  // req.onsuccess = (e) => {
  //   const db = e.target.result;
  //   const tx = db.transaction('users', 'readwrite');
  //   const store = tx.objectStore('users');
  //   store.add({ id: 1, name: 'John' });
  // };

  console.log('IndexedDB: for large/complex data, asynchronous');
};

// Timers (setTimeout, setInterval, requestAnimationFrame)

const timersAPI = () => {
  // setTimeout: execute after delay
  // const id = setTimeout(() => {
  //   console.log('after 2 seconds');
  // }, 2000);
  // clearTimeout(id);

  // setInterval: execute repeatedly
  // const id = setInterval(() => {
  //   console.log('every 1 second');
  // }, 1000);
  // clearInterval(id);

  // requestAnimationFrame: sync with screen refresh (~60fps)
  // const animate = () => {
  //   // update animation
  //   requestAnimationFrame(animate); // reschedule
  // };
  // requestAnimationFrame(animate);
  // // Unlike setInterval, respects browser tab visibility

  console.log('timers for scheduling: setTimeout, setInterval, requestAnimationFrame');
};

// Geolocation API

const geolocationAPI = () => {
  // const getLocation = () => {
  //   navigator.geolocation.getCurrentPosition(
  //     (pos) => {
  //       const { latitude, longitude, accuracy } = pos.coords;
  //       console.log(`Lat: ${latitude}, Lon: ${longitude}`);
  //     },
  //     (err) => console.error(err),
  //     { timeout: 5000 }
  //   );
  // };

  // Watch location changes
  // const watchId = navigator.geolocation.watchPosition(
  //   (pos) => { ... },
  //   (err) => { ... }
  // );
  // navigator.geolocation.clearWatch(watchId);

  console.log('Geolocation: user can deny, shows permission prompt');
};

// Notification API

const notificationAPI = () => {
  // Check permission
  // if (Notification.permission === 'granted') {
  //   new Notification('Hello!', {
  //     body: 'This is a notification',
  //     icon: 'icon.png'
  //   });
  // } else if (Notification.permission !== 'denied') {
  //   Notification.requestPermission().then(perm => {
  //     if (perm === 'granted') new Notification('...');
  //   });
  // }

  console.log('Notifications: user can deny, desktop notifications');
};

// History API

const historyAPI = () => {
  // Navigate history
  // history.back();              // same as clicking back
  // history.forward();           // same as clicking forward
  // history.go(-1);              // go back 1 page
  // history.go(2);               // go forward 2 pages

  // Modify history without reload
  // history.pushState({ data }, 'title', '/new-url');
  // window.addEventListener('popstate', (e) => {
  //   console.log('user clicked back, state:', e.state);
  // });

  console.log('History API: manipulate back/forward, change URL without reload');
};

// Navigator Object

const navigatorAPI = () => {
  // navigator.userAgent;         // browser info
  // navigator.language;          // browser language
  // navigator.onLine;            // is connected to internet
  // navigator.clipboard;         // copy/paste
  // navigator.mediaDevices;      // camera, microphone
  // navigator.getBattery();      // battery status (deprecated)

  console.log('navigator: browser capabilities and info');
};

// Clipboard API

const clipboardAPI = () => {
  // Copy to clipboard
  // const copyBtn = document.querySelector('.copy');
  // copyBtn.addEventListener('click', async () => {
  //   await navigator.clipboard.writeText('text to copy');
  // });

  // Paste from clipboard
  // const pasteBtn = document.querySelector('.paste');
  // pasteBtn.addEventListener('click', async () => {
  //   const text = await navigator.clipboard.readText();
  // });

  console.log('Clipboard: copy/paste requires user permission');
};

// Intersection Observer API (lazy loading)

const intersectionObserver = () => {
  // const callback = (entries) => {
  //   entries.forEach(entry => {
  //     if (entry.isIntersecting) {
  //       console.log('element in view:', entry.target);
  //       // load image, fetch data
  //     }
  //   });
  // };

  // const observer = new IntersectionObserver(callback, {
  //   threshold: 0.5  // 50% visible
  // });

  // const images = document.querySelectorAll('img[data-src]');
  // images.forEach(img => observer.observe(img));

  console.log('IntersectionObserver: efficient lazy loading, infinite scroll');
};

// Mutation Observer API (watch DOM changes)

const mutationObserver = () => {
  // const callback = (mutations) => {
  //   mutations.forEach(m => {
  //     if (m.type === 'childList') {
  //       console.log('children added/removed');
  //     }
  //     if (m.type === 'attributes') {
  //       console.log('attribute changed:', m.attributeName);
  //     }
  //   });
  // };

  // const observer = new MutationObserver(callback);
  // observer.observe(document.body, {
  //   childList: true,
  //   attributes: true,
  //   subtree: true
  // });

  console.log('MutationObserver: watch DOM structure and attribute changes');
};

// ResizeObserver API (watch element size)

const resizeObserver = () => {
  // const callback = (entries) => {
  //   entries.forEach(entry => {
  //     const { width, height } = entry.contentRect;
  //     console.log(`resized to ${width}x${height}`);
  //   });
  // };

  // const observer = new ResizeObserver(callback);
  // const box = document.querySelector('.box');
  // observer.observe(box);

  console.log('ResizeObserver: efficient resize detection');
};

// Service Workers (Advanced, for offline)

const serviceWorkerIntro = () => {
  // if ('serviceWorker' in navigator) {
  //   navigator.serviceWorker.register('/sw.js').then(reg => {
  //     console.log('SW registered');
  //   });
  // }

  // Service Worker runs in background, enables offline support
  // Complex but powerful - PWA foundation

  console.log('Service Workers: background processing, offline support, caching');
};

// Building a Storage Wrapper (like Week 4 patterns)

const storageWrapper = () => {
  const store = {
    set: (key, val) => {
      localStorage.setItem(key, JSON.stringify(val));
    },

    get: (key, def = null) => {
      const val = localStorage.getItem(key);
      return val ? JSON.parse(val) : def;
    },

    remove: (key) => {
      localStorage.removeItem(key);
    },

    clear: () => {
      localStorage.clear();
    },

    // Subscribe to changes
    watch: (callback) => {
      window.addEventListener('storage', callback);
      return () => window.removeEventListener('storage', callback);
    }
  };

  // Usage:
  // store.set('user', { name: 'John', age: 30 });
  // const user = store.get('user');
  // store.watch((e) => console.log('Storage changed:', e.key));
};

console.log('Browser APIs:');
console.log('- Storage: localStorage, sessionStorage, IndexedDB');
console.log('- Timers: setTimeout, setInterval, requestAnimationFrame');
console.log('- Location: navigator.geolocation, history');
console.log('- Notifications: Notification API with permissions');
console.log('- Clipboard: navigator.clipboard.readText/writeText');
console.log('- Observers: IntersectionObserver, MutationObserver, ResizeObserver');
console.log('- Service Workers: background processing, offline support');
