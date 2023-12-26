/** Textual markov chain generator */


class MarkovMachine {

  /** build markov machine; read in text.*/

  constructor(text) {
    let words = text.split(/[ \r\n]+/);
    this.words = words.filter(c => c !== "");
    this.makeChains();
  }

  /** set markov chains:
   *
   *  for text of "the cat in the hat", chains will be
   *  {"the": ["cat", "hat"], "cat": ["in"], "in": ["the"], "hat": [null]} */

  makeChains() {
    // let map = {};
    // for (let i=0; i<this.words.length; i++){
    //   if(this.words[i] in  map){
    //     map[this.words[i]].push(this.words[i+1])
        
    //   } else if (i === this.words.length - 1) {
    //     map[this.words[i]] = [null];
    //   } else
    //   {
    //     map[this.words[i]] = [this.words[i+1]];
    //   }
      
    // }
    // return map;
    let chains = new Map();

    for (let i = 0; i < this.words.length; i += 1) {
      let word = this.words[i];
      let nextWord = this.words[i + 1] || null;

      if (chains.has(word)) chains.get(word).push(nextWord);
      else chains.set(word, [nextWord]);
    }

    this.chains = chains;
  }


  /** return random text from chains */

  makeText(numWords = 100) {
    
    let current = Object.keys(this.chains)[Math.random() * Object.keys(this.chains).length | 0];
    let next;
    let output = [];
    while(next !== null && numWords > 0){
      next = this.chains[current][Math.random() * this.chains[current].length | 0];
      if(next !== null){
        output.push(next);
        current = next;
        numWords--;
      }
    }
    return output.join(" ");
  }
}

module.exports = {MarkovMachine};