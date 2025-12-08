// Event Handling in the Browser

// Event Listener Registration

const basicListeners = () => {
  // const btn = document.querySelector('button');
  // btn.addEventListener('click', (e) => {
  //   console.log('Button clicked');
  // });

  // const input = document.querySelector('input');
  // input.addEventListener('input', (e) => {
  //   console.log('Input value:', e.target.value);
  // });
};

// Removing Listeners

const removingListeners = () => {
  // const btn = document.querySelector('button');
  // const handler = () => console.log('clicked');
  // btn.addEventListener('click', handler);
  // btn.removeEventListener('click', handler); // needs same reference!

  // addEventListener returns undefined, must keep handler reference
};

// Event Object

const eventObject = () => {
  // const handle = (e) => {
  //   console.log(e.type);           // 'click', 'input', etc.
  //   console.log(e.target);         // element that triggered event
  //   console.log(e.currentTarget);  // element with listener
  //   console.log(e.timeStamp);      // ms since page loaded
  //   console.log(e.clientX, e.clientY); // mouse position
  //   console.log(e.key);            // keyboard key
  // };
};

// Event Propagation: Bubbling and Capturing

const eventBubbling = () => {
  // <div id="outer">
  //   <div id="middle">
  //     <button id="inner">Click</button>
  //   </div>
  // </div>

  // When clicking button:
  // Capturing phase: window -> document -> outer -> middle -> button
  // Target phase: button
  // Bubbling phase: button -> middle -> outer -> document -> window

  // const btn = document.querySelector('#inner');
  // const middle = document.querySelector('#middle');
  // const outer = document.querySelector('#outer');

  // btn.addEventListener('click', () => console.log('btn'));        // always fires
  // middle.addEventListener('click', () => console.log('middle'));  // bubbles up
  // outer.addEventListener('click', () => console.log('outer'));    // bubbles up
};

const eventCapturing = () => {
  // const btn = document.querySelector('#inner');
  // const middle = document.querySelector('#middle');

  // Use third parameter 'true' for capture phase
  // btn.addEventListener('click', () => console.log('btn'), false);      // bubble
  // middle.addEventListener('click', () => console.log('middle'), true); // capture

  // Capture phase fires first, then bubble
};

// Stopping Propagation

const stoppingPropagation = () => {
  // const btn = document.querySelector('button');
  // const parent = document.querySelector('.container');

  // btn.addEventListener('click', (e) => {
  //   e.stopPropagation();     // stop bubbling to parent
  //   console.log('button only');
  // });

  // parent.addEventListener('click', () => {
  //   console.log('container'); // won't fire if stopPropagation
  // });

  // e.stopImmediatePropagation(); // also stops other listeners on same element
};

// Preventing Default Behavior

const preventDefault = () => {
  // const link = document.querySelector('a');
  // link.addEventListener('click', (e) => {
  //   e.preventDefault();  // don't navigate
  //   console.log('custom link behavior');
  // });

  // const form = document.querySelector('form');
  // form.addEventListener('submit', (e) => {
  //   e.preventDefault();  // don't submit to server
  //   // handle form yourself
  // });
};

// Event Delegation

const eventDelegation = () => {
  // Instead of adding listener to each item:
  // const items = document.querySelectorAll('li');
  // items.forEach(item => {
  //   item.addEventListener('click', handleClick); // many listeners
  // });

  // Better: single listener on parent
  // const list = document.querySelector('ul');
  // list.addEventListener('click', (e) => {
  //   if (e.target.tagName === 'LI') {
  //     console.log('clicked:', e.target.textContent);
  //   }
  // });

  console.log('delegation reduces memory: single listener vs hundreds');
};

// Common Event Types

const commonEvents = () => {
  // Mouse events: click, dblclick, mousedown, mouseup, mousemove, mouseover, mouseout
  // Keyboard events: keydown, keyup, keypress
  // Form events: submit, reset, input, change, focus, blur
  // Window events: load, unload, resize, scroll
  // UI events: touchstart, touchmove, touchend (mobile)
};

// Input and Change Events

const inputEvents = () => {
  // const inp = document.querySelector('input');

  // 'input' - fires on every keystroke
  // inp.addEventListener('input', (e) => {
  //   console.log('live:', e.target.value);
  // });

  // 'change' - fires only when value committed (blur)
  // inp.addEventListener('change', (e) => {
  //   console.log('committed:', e.target.value);
  // });
};

// Form Submission

const formSubmission = () => {
  // const form = document.querySelector('form');
  // form.addEventListener('submit', (e) => {
  //   e.preventDefault();

  //   const data = new FormData(form);
  //   // data.get('fieldName') to access values
  //   // or use form.elements.fieldName

  //   console.log('submit prevented, handle manually');
  // });
};

// Custom Events (connecting to Week 4's EventEmitter)

const customEvents = () => {
  // Create and dispatch custom events
  // const ev = new CustomEvent('myEvent', {
  //   detail: { message: 'Hello' }
  // });
  // element.dispatchEvent(ev);

  // Listen for custom event
  // element.addEventListener('myEvent', (e) => {
  //   console.log(e.detail.message);
  // });

  console.log('Custom events bridge DOM events and application logic');
};

// Building a Simple Event Emitter Wrapper (like Week 4)

const SimpleEventTarget = () => {
  // const target = new EventTarget(); // browsers have this!
  // target.addEventListener('custom', handler);
  // target.dispatchEvent(new CustomEvent('custom', { detail: data }));

  // Or build wrapper for any object
  const createEmitter = (obj = {}) => {
    const listeners = {};

    obj.on = (evt, fn) => {
      listeners[evt] = listeners[evt] || [];
      listeners[evt].push(fn);
    };

    obj.off = (evt, fn) => {
      if (!listeners[evt]) return;
      listeners[evt] = listeners[evt].filter(f => f !== fn);
    };

    obj.emit = (evt, data) => {
      if (!listeners[evt]) return;
      listeners[evt].forEach(fn => fn(data));
    };

    return obj;
  };

  // Usage:
  // const model = createEmitter();
  // model.on('change', (data) => console.log(data));
  // model.emit('change', { value: 42 });
};

// Event Handler Best Practices

const bestPractices = () => {
  console.log('Best Practices:');
  console.log('1. Use addEventListener (not onclick inline)');
  console.log('2. Use event delegation for dynamic content');
  console.log('3. Remove listeners when done (memory leak prevention)');
  console.log('4. Avoid global event handlers');
  console.log('5. Use e.target to identify which element triggered event');
  console.log('6. stopPropagation when you need isolated behavior');
  console.log('7. preventDefault for forms and links');
};

// Keyboard Events - Detecting Keys

const keyboardEvents = () => {
  // const input = document.querySelector('input');
  // input.addEventListener('keydown', (e) => {
  //   if (e.key === 'Enter') {
  //     console.log('user pressed enter');
  //   }
  //   if (e.ctrlKey && e.key === 's') {
  //     e.preventDefault();
  //     console.log('custom save');
  //   }
  // });

  // e.key - 'a', 'Enter', 'Shift', etc.
  // e.code - 'KeyA', 'Enter', 'ShiftLeft'
  // e.ctrlKey, e.shiftKey, e.altKey, e.metaKey
};

console.log('Event Handling Patterns:');
console.log('- addEventListener(type, handler, useCapture)');
console.log('- removeEventListener(type, handler)');
console.log('- Event object: target, currentTarget, type, key, clientX/Y');
console.log('- Bubbling: inner element -> parent -> document');
console.log('- e.stopPropagation(), e.preventDefault()');
console.log('- Event delegation: listen on parent for efficiency');
console.log('- Custom events: dispatchEvent(new CustomEvent(...))');
