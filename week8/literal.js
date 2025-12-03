// Basic tag function
function highlight(strings, ...values) {
  console.log('Strings:', strings);
  console.log('Values:', values);
  
  return strings.reduce((result, str, i) => {
    return result + str + (values[i] ? `<mark>${values[i]}</mark>` : '');
  }, '');
}

const mname = 'Alice';
const age = 25;
const result = highlight`Name: ${mname}, Age: ${age}`;
console.log('\nResult:', result);