function* gen() {
  console.log("start")
  const a = yield 5
  console.log(`a: ${a}`)
}

const g = gen()
console.log("pre 1")
const a1 = g.next(1)
console.log("pre 2")
const a2 = g.next(2)

console.log(a1, a2)
