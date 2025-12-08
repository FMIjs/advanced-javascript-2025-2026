// Browser Observers: IntersectionObserver, MutationObserver, ResizeObserver

// Intersection Observer - Detect when element enters viewport
const intersectionObserverExample = () => {
  const gallery = document.createElement('div');
  gallery.style.marginTop = '20px';
  gallery.style.display = 'grid';
  gallery.style.gridTemplateColumns = 'repeat(3, 1fr)';
  gallery.style.gap = '10px';
  gallery.style.maxWidth = '600px';

  // Create images with lazy loading
  for (let i = 1; i <= 6; i++) {
    const img = document.createElement('img');
    img.dataset.src = `https://picsum.photos/200/200?random=${i}`;
    img.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="200" height="200"%3E%3Crect fill="%23ddd" width="200" height="200"/%3E%3C/svg%3E';
    img.style.width = '100%';
    gallery.appendChild(img);
  }

  // Observe images and load when visible
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src;
        observer.unobserve(img);
        console.log('Image loaded:', img.dataset.src);
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('img[data-src]').forEach(img => observer.observe(img));
  return gallery;
};

// Mutation Observer - Detect DOM changes
const mutationObserverExample = () => {
  const container = document.createElement('div');
  container.style.marginTop = '20px';
  container.style.padding = '10px';
  container.style.border = '1px solid #333';

  const title = document.createElement('h3');
  title.textContent = 'Mutation Observer Demo';
  container.appendChild(title);

  const status = document.createElement('p');
  status.textContent = 'Watching for changes...';
  container.appendChild(status);

  const addBtn = document.createElement('button');
  addBtn.textContent = 'Add Item';
  addBtn.style.marginRight = '5px';

  const removeBtn = document.createElement('button');
  removeBtn.textContent = 'Remove Item';

  const list = document.createElement('ul');

  // Observe changes to list
  const observer = new MutationObserver((mutations) => {
    mutations.forEach(m => {
      if (m.type === 'childList') {
        const added = m.addedNodes.length;
        const removed = m.removedNodes.length;
        status.textContent = `Children changed: +${added} -${removed}`;
      }
    });
  });

  observer.observe(list, {
    childList: true,
    subtree: true
  });

  addBtn.addEventListener('click', () => {
    const li = document.createElement('li');
    li.textContent = `Item ${list.children.length + 1}`;
    list.appendChild(li);
  });

  removeBtn.addEventListener('click', () => {
    if (list.lastChild) list.removeChild(list.lastChild);
  });

  container.appendChild(addBtn);
  container.appendChild(removeBtn);
  container.appendChild(list);
  return container;
};

// Resize Observer - Detect element size changes
const resizeObserverExample = () => {
  const container = document.createElement('div');
  container.style.marginTop = '20px';
  container.style.padding = '10px';
  container.style.border = '1px solid #333';

  const title = document.createElement('h3');
  title.textContent = 'Resize Observer Demo';
  container.appendChild(title);

  const resizable = document.createElement('div');
  resizable.style.width = '200px';
  resizable.style.height = '100px';
  resizable.style.backgroundColor = '#ff9800';
  resizable.style.resize = 'both';
  resizable.style.overflow = 'auto';
  resizable.textContent = 'Drag to resize me';
  resizable.style.cursor = 'nwse-resize';
  resizable.style.padding = '10px';
  resizable.style.color = 'white';

  const sizeDisplay = document.createElement('p');
  sizeDisplay.style.marginTop = '10px';

  // Observe size changes
  const observer = new ResizeObserver((entries) => {
    entries.forEach(entry => {
      const { width, height } = entry.contentRect;
      sizeDisplay.textContent = `Size: ${width.toFixed(0)}x${height.toFixed(0)}px`;
    });
  });

  observer.observe(resizable);

  container.appendChild(resizable);
  container.appendChild(sizeDisplay);
  return container;
};

// Run all examples
console.log('Observer Examples:');
console.log('1. Intersection Observer - lazy loads images on scroll');
console.log('2. Mutation Observer - detects DOM changes');
console.log('3. Resize Observer - detects element resize');

document.body.appendChild(intersectionObserverExample());
document.body.appendChild(mutationObserverExample());
document.body.appendChild(resizeObserverExample());
