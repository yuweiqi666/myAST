import parse from "./parse"
var template = `<div>
    <h3>你好</h3>
    <ul>
      <li>A</li>
      <li>B</li>
      <li>C</li>
    </ul>
  </div>`


const result = parse(template)


console.log(result);

