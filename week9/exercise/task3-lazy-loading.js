// Task 3: Lazy Loading Image Gallery
// Covers: Intersection Observer, performance optimization, event handling

// HTML structure:
// <div id="app">
//   <h1>Image Gallery</h1>
//   <div id="gallery"></div>
//   <p id="loading">Loading more images...</p>
// </div>

const ImageGallery = (() => {
  let currentPage = 1;
  let isLoading = false;

  // Generate dummy image URLs (using placeholder service)
  const getImageUrls = (page, count = 12) => {
    const urls = [];
    for (let i = 0; i < count; i++) {
      const id = (page - 1) * count + i;
      // Using dynamic image URLs from unsplash or similar
      urls.push({
        src: `https://picsum.photos/300/300?random=${id}`,
        alt: `Image ${id}`
      });
    }
    return urls;
  };

  // Create image element
  const createImageElement = (url) => {
    const div = document.createElement('div');
    div.className = 'gallery-item';

    const img = document.createElement('img');
    img.className = 'gallery-image';
    img.alt = url.alt;

    // Use data-src for lazy loading
    img.dataset.src = url.src;
    img.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="300" height="300"%3E%3Crect fill="%23ddd" width="300" height="300"/%3E%3C/svg%3E';

    div.appendChild(img);
    return div;
  };

  // Render images
  const renderImages = (urls) => {
    const gallery = document.getElementById('gallery');
    const frag = document.createDocumentFragment();

    urls.forEach(url => {
      frag.appendChild(createImageElement(url));
    });

    gallery.appendChild(frag);
    observeNewImages();
  };

  // Setup Intersection Observer for lazy loading
  const observeNewImages = () => {
    const images = document.querySelectorAll('img[data-src]');

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.dataset.src;
          img.removeAttribute('data-src');
          observer.unobserve(img);
        }
      });
    }, {
      threshold: 0.1  // Load when 10% visible
    });

    images.forEach(img => observer.observe(img));
  };

  // Load more images on scroll near bottom
  const setupInfiniteScroll = () => {
    const loadingEl = document.getElementById('loading');

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !isLoading) {
          isLoading = true;
          loadingEl.style.display = 'block';

          // Simulate network delay
          setTimeout(() => {
            currentPage++;
            const urls = getImageUrls(currentPage);
            renderImages(urls);
            isLoading = false;
            loadingEl.style.display = 'none';
          }, 1000);
        }
      });
    });

    // Create sentinel element to observe
    const sentinel = document.createElement('div');
    sentinel.id = 'scroll-sentinel';
    document.getElementById('app').appendChild(sentinel);
    observer.observe(sentinel);
  };

  // Debounced resize handler
  const debounce = (fn, delay) => {
    let timeoutId;
    return (...args) => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => fn(...args), delay);
    };
  };

  const handleWindowResize = debounce(() => {
    console.log('Window resized, gallery could re-layout');
  }, 300);

  // Initialize
  const init = () => {
    const urls = getImageUrls(currentPage);
    renderImages(urls);
    setupInfiniteScroll();

    window.addEventListener('resize', handleWindowResize);
  };

  return { init };
})();

// CSS to add (for proper layout):
// #gallery {
//   display: grid;
//   grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
//   gap: 20px;
//   padding: 20px;
// }
//
// .gallery-item {
//   aspect-ratio: 1;
//   overflow: hidden;
//   border-radius: 8px;
//   background: #f0f0f0;
// }
//
// .gallery-image {
//   width: 100%;
//   height: 100%;
//   object-fit: cover;
// }

// Usage in HTML:
// <script>
//   ImageGallery.init();
// </script>

console.log('Task 3: Lazy Loading Image Gallery');
console.log('- Performance: Intersection Observer for lazy loading (no constant checks)');
console.log('- Infinite Scroll: Load more when user nears bottom');
console.log('- Optimization: Debounced resize handler (review from Week 9 lecture)');
console.log('- DOM: DocumentFragment, dataset attributes, element creation');
console.log('- Concepts: IIFE module pattern, closure, event listeners');
