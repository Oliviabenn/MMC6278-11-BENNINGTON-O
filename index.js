const getPoemBtn = document.getElementById('get-poem')
const poemEl = document.getElementById('poem')
const poemURL = 'https://poetrydb.org/random,linecount/1;12/author,title,lines.json'

const getJSON = url => fetch(url).then(res => res.json())

const pipe = (...fns) => firstArg => fns.reduce((returnValue, fn) => fn(returnValue), firstArg)

const makeTag = tag => str => `<${tag}>${str}</${tag}>`

const makePoemHTML = ([{ title, author, lines }]) => {
  let makeTitle = makeTag("h2")(title);
  let makeAuthor = pipe(makeTag("em"), makeTag("h3"))(`by ${author}`);
  let allStanzasArr = [];
  let indivStanzaArr = [];
  lines.forEach((line, index) => {



    let stanzaStr = ""
     allStanzasArr.forEach((indivStanzaArr) => {
       stanzaStr += makeTag("p")(indivStanzaArr.join("<br/>")); 
     });

// attach a click event to #get-poem
getPoemBtn.onclick = async function() {
  // renders the HTML string returned by makePoemHTML to #poem
  poemEl.innerHTML = makePoemHTML(await getJSON(poemURL))
}
