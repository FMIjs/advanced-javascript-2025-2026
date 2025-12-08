// DOM Manipulation - Selecting, Creating, Modifying Elements

// Selecting Elements

// By ID
const byId = () => {
  // const el = document.getElementById('app');
  console.log('getElementById returns single element or null');
};

// By class or complex selectors
const bySelector = () => {
  // const el = document.querySelector('.btn');
  // const all = document.querySelectorAll('div.card');
  console.log('querySelector/querySelectorAll use CSS selectors');
  console.log('querySelector returns first match, querySelectorAll returns NodeList');
};

// By tag name
const byTag = () => {
  // const divs = document.getElementsByTagName('div');
  console.log('HTMLCollection is live - reflects DOM changes');
};

// NodeList vs HTMLCollection
const nodeListVsCollection = () => {
  // querySelectorAll returns NodeList (static snapshot)
  // getElementsByTagName returns HTMLCollection (live)
  // HTMLCollection: only accessible by index and name
  // NodeList: iterable with forEach in modern browsers
};

// Creating and Inserting Elements

const createElement = () => {
  // const btn = document.createElement('button');
  // btn.textContent = 'Click me';
  // btn.className = 'primary';
  // btn.id = 'submit-btn';
  // document.body.appendChild(btn);

  console.log('createElement, appendChild, insertBefore, replaceChild');
};

const insertMethods = () => {
  // parent.appendChild(child);           // last child
  // parent.insertBefore(child, ref);    // before ref node
  // parent.replaceChild(new, old);      // replace old with new
  // el.innerHTML = '<p>HTML string</p>'; // insert HTML
  // el.textContent = 'plain text';       // insert text (safe)
};

// Element Content - innerHTML vs textContent

const contentModification = () => {
  // innerHTML: parses HTML, creates actual DOM nodes
  // textContent: just text, faster, safer against XSS
  // innerText: respects CSS display (slower)

  // const div = document.createElement('div');
  // div.innerHTML = '<strong>Bold</strong>'; // creates <strong> element
  // div.textContent = '<strong>Bold</strong>'; // renders as text
};

// Attributes vs Properties

const attributesProps = () => {
  // const btn = document.querySelector('button');
  // btn.setAttribute('data-id', '123');
  // const id = btn.getAttribute('data-id');
  // btn.removeAttribute('data-id');
  // btn.hasAttribute('disabled');

  // Properties (direct): btn.id, btn.className, btn.checked
  // Attributes (DOM): btn.getAttribute('id')
  // Custom data: btn.dataset.id (HTML5 data attributes)
};

// Manipulating Classes

const classManipulation = () => {
  // const el = document.querySelector('.box');
  // el.classList.add('active');
  // el.classList.remove('inactive');
  // el.classList.toggle('highlight');
  // el.classList.contains('active');
  // el.classList.replace('old-class', 'new-class');

  console.log('classList API is cleaner than className string manipulation');
};

// Styling Elements

const styling = () => {
  // const box = document.querySelector('.box');
  // box.style.backgroundColor = 'blue';
  // box.style.width = '100px';
  // box.style.cssText = 'background: blue; width: 100px;';

  // const computed = window.getComputedStyle(box);
  // const bgColor = computed.backgroundColor;
};

// Traversing the DOM

const domTraversal = () => {
  // const child = document.querySelector('.child');
  // child.parentElement;           // direct parent
  // child.parentNode;              // parent (could be document)
  // child.nextElementSibling;      // next sibling element
  // child.previousElementSibling;
  // child.firstElementChild;
  // child.lastElementChild;
  // child.children;                // HTMLCollection of direct children
  // child.childNodes;              // includes text nodes
};

// Removing Elements

const removal = () => {
  // const el = document.querySelector('.old');
  // el.remove();                   // remove from DOM
  // el.parentElement.removeChild(el);
  // parent.innerHTML = '';         // remove all children
};

// Document Fragments (efficient batch operations)

const fragments = () => {
  // const frag = document.createDocumentFragment();
  // for (let i = 0; i < 1000; i++) {
  //   const li = document.createElement('li');
  //   li.textContent = `Item ${i}`;
  //   frag.appendChild(li);  // no reflow yet
  // }
  // const ul = document.querySelector('ul');
  // ul.appendChild(frag);    // single reflow for all items

  console.log('fragments batch DOM operations - one reflow instead of 1000');
};

// Cloning Elements

const cloning = () => {
  // const orig = document.querySelector('.template');
  // const clone = orig.cloneNode(true);  // true: deep clone with children
  // clone = orig.cloneNode(false);       // false: shallow, element only
};

// Practice: Build a simple list builder

const listBuilder = () => {
  const createList = (items) => {
    const ul = document.createElement('ul');
    const frag = document.createDocumentFragment();

    for (const item of items) {
      const li = document.createElement('li');
      li.textContent = item;
      frag.appendChild(li);
    }

    ul.appendChild(frag);
    return ul;
  };

  // Usage:
  // const list = createList(['Apple', 'Banana', 'Cherry']);
  // document.body.appendChild(list);
};

console.log('DOM Manipulation Patterns:');
console.log('- Select: getElementById, querySelector, querySelectorAll');
console.log('- Create: createElement, DocumentFragment');
console.log('- Insert: appendChild, insertBefore, innerHTML, textContent');
console.log('- Modify: setAttribute, className, classList, style');
console.log('- Traverse: parentElement, children, nextSibling');
console.log('- Remove: remove(), removeChild(), innerHTML=""');
console.log('- Clone: cloneNode(deep)');
