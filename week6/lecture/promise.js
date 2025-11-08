const fs = require('fs');
const studentFileName = './test.txt';
const scoreFileName = './score.txt';
const outputFileName = './output.txt';


function readFile(fileName) {
  return new Promise((res, rej) => {
    fs.readFile(fileName, { encoding: 'utf-8' }, (err, data) => {
      if (err) return void rej(err);
      res(data);
    });
  })
}

function writeFile(fileName, data) {
  return new Promise((res, rej) => {
    fs.writeFile(fileName, data, (err) => {
      if (err) return void rej(err);
      res(data);
    });
  })
}

const readStudents = readFile(studentFileName).catch((err) => {
  if (err.code === 'ENOENT') return '';
  return Promise.reject(err);
});
const readScores = readFile(scoreFileName).catch((err) => {
  if (err.code === 'ENOENT') return '';
  return Promise.reject(err);
});


// queueMicrotask()
// Promise.resolve().then(() => console.log(1));

Promise.allSettled([readStudents, readScores]).then(([students, scores]) => students)

// setTimeout(() => { console.log(2) })

// console.log(0)

Promise.all([readStudents, readScores])
  .then(([studentData, scoreData]) => Promise.all([processData(studentData, scoreData), studentData, scoreData]))
  .then(([output, studentData, scoreData]) => Promise.all([writeFile(outputFileName, output), studentData, scoreData]))
  .then(([_, studentData, scoreData]) => {
    console.log(studentData, scoreData)
  }).finally(() => {

  })







// function processData(studentData, scoreData) {
//   const scoreArray = scoreData.split('\n');
//   const output = studentData.split('\n').reduce((acc, curr, index) => {
//     const combined = `${curr} ${scoreArray[index]}`;
//     return acc.concat(combined)
//   }, []);
//   return output.join('\n');
// }

// fs.readFile(studentFileName, { encoding: 'utf-8' }, (err, studentData) => {
//   if (err) throw err;
//   fs.readFile(scoreFileName, { encoding: 'utf-8' }, (err, scoreData) => {
//     if (err) throw err;
//     processData(studentData, scoreData);
//   });
// });


// console.log('End')
