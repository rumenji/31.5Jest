const { MarkovMachine } = require("./markov");

describe("make texts", function(){
    let newMarkov;
    beforeEach(function(){
        newMarkov = new MarkovMachine("the cat in the hat");
    });

    test('return map of words', function(){
        let map = newMarkov.makeChains();
        expect(map).toEqual({"the": ["cat", "hat"], "cat": ["in"], "in": ["the"], "hat": [null]})
    }
)

    test('return output text', function(){
        let output = newMarkov.makeText();
        expect(output).toEqual(expect.any(String))
    })

    test('length of output not to exceed', function(){
        let output = newMarkov.makeText(numWords = 2);
        let words = output.split(/[ \r\n]+/);
        expect(words.length).toBeLessThanOrEqual(2)
    })
})