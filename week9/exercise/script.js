


console.log("im alive");

document.onreadystatechange = function () {
    console.log("Ready state changed: " + document.readyState);
    if (document.readyState === "complete") {

        document.getElementById("myDiv").addEventListener("click", function (evt) {
            console.log("Clicked  div!");
            console.log(evt.target);
        }, true );

        // document.getElementById("myButton").addEventListener("click", function (evt) {
        //     console.log("Clicked button!");
        //     console.log(evt.target);
        // }, true );

    }
};


const fetchBtn = document.createElement('button');
fetchBtn.textContent = 'Fetch Data';
fetchBtn.style.marginTop = '20px';
fetchBtn.style.padding = '10px 20px';

const resultDiv = document.createElement('div');
resultDiv.style.marginTop = '10px';
resultDiv.style.padding = '10px';
resultDiv.style.border = '1px solid #ddd';



fetchBtn.addEventListener('click', async () => {
  resultDiv.textContent = 'Loading...';
  try {
    const res = await fetch('https://jsonplaceholder.typicode.com/users/1');
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const user = await res.json();
    resultDiv.innerHTML = `<h4>${user.name}</h4><p>${user.email}</p><p>${user.phone}</p>`;
  } catch (err) {
    resultDiv.textContent = 'Error: ' + err.message;
  }
});



// fetchBtn.addEventListener('click', async () => {
//   resultDiv.textContent = 'Loading...';
//   try {
//     const res = await fetch('https://jsonplaceholder.typicode.com/users/1');
//     if (!res.ok) throw new Error(`HTTP ${res.status}`);
//     const user = await res.json();

//     resultDiv.innerHTML = `<h4>${user.name}</h4><p>${user.email}</p><p>${user.phone}</p>`;
//   } catch (err) {
//     resultDiv.textContent = 'Error: ' + err.message;
//   }
// });


fetchBtn.addEventListener('click', () => new Promise((resolve, reject) => {
  resultDiv.textContent = 'Loading...';
  fetch('https://jsonplaceholder.typicode.com/users/1')
    .then(res => {
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      return res.json();
    })
    .then(user => {
      resultDiv.innerHTML = `<h4>${user.name}</h4><p>${user.email}</p><p>${user.phone}</p>`;
      resolve();
    })
    .catch(err => {
      resultDiv.textContent = 'Error: ' + err.message;
      reject(err);
    });
}));

document.body.appendChild(fetchBtn);
document.body.appendChild(resultDiv);


// 
// localStorage demo
// Intersection Observer - Lazy loading images
const gallery = document.createElement('div');
gallery.style.marginTop = '20px';
gallery.style.display = 'grid';
gallery.style.gridTemplateColumns = 'repeat(3, 1fr)';
gallery.style.gap = '10px';
gallery.style.maxWidth = '600px';

// Create placeholder images
for (let i = 1; i <= 6; i++) {
  const img = document.createElement('img');
  img.dataset.src = `https://picsum.photos/200/200?random=${i}`;
  img.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="200" height="200"%3E%3Crect fill="%23ddd" width="200" height="200"/%3E%3C/svg%3E';
  img.style.width = '100%';
  gallery.appendChild(img);
}

// Lazy load on visibility
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const img = entry.target;
      img.src = img.dataset.src;
      observer.unobserve(img);
    }
  });
}, { threshold: 0.1 });

document.body.appendChild(gallery);

let elems = document.querySelectorAll('img[data-src]');

for (let img of elems) {
    observer.observe(img);
}

