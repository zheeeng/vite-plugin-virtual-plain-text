import LICENSE from '@my-virtual-plain-text-workspace/playground/LICENSE'
import Lorem from '@my-virtual-plain-text-workspace/playground/lorem-ipsum.text'
import Siren from '@my-virtual-plain-text-workspace/playground/siren.glsl'

console.log(LICENSE, LICENSE)

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <h1>LICENSE</h1>
  <pre>${LICENSE}</pre>
  <h1>Lorem</h1>
  <pre>${Lorem}</pre>
  <h1>Siren</h1>
  <pre>${Siren}</pre>
`
