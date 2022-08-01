const getPoemBtn = document.getElementById('get-poem')
const poemEl = document.getElementById('poem')
const poemURL = 'https://poetrydb.org/random,linecount/1;12/author,title,lines.json'

const getJSON = url => fetch(url).then(res => res.json())

const pipe = (...fns) => firstArg => fns.reduce((returnValue, fn) => fn(returnValue), firstArg)

const makeTag = tag => str => `<${tag}>${str}</${tag}>`

//solve
const makePoemHTML = ([{ title, author, lines }]) => {
  let titleText = makeTag("h2")(title);
  let authorName = pipe(makeTag("em"), makeTag("h3"))(`by ${author}`);
  let stanzas = [];
  let line = [];
  lines.forEach((line, index) => {
      if(line === ""){
        stanzas.push(lines);
        line = [];
    } else if (index === lines.length -1){
      lines.push(line);
      stanzas.push(lines);
    } else {
      line.push(line);
    }
  });
console.log(stanzas)
  let stanzaStr = ""
  stanzas.forEach((lines) => {
    stanzaStr += makeTag("p")(lines.join("<br/>"));
  });

  return `${titleText}${authorName}${stanzaStr}`;
};

// attach a click event to #get-poem
getPoemBtn.onclick = async function() {
  // renders the HTML string returned by makePoemHTML to #poem
  poemEl.innerHTML = makePoemHTML(await getJSON(poemURL))
}
