/** Command-line tool to generate Markov text. */
const fs = require('fs');
const process = require('process');
const axios = require('axios');
const { MarkovMachine } = require("./markov");

if(process.argv[2] === 'file'){
    cat(process.argv[3])
} else if (process.argv[2] === 'url'){
    webCat(process.argv[3])
} else {
    console.error(`Unknown method: ${process.argv[2]}`);
    process.exit(1);
}

function cat(path){
    fs.readFile(path, 'utf-8', (err, data) => {
        if(err){
            console.log("Can't read file:", err)
            process.exit(1)
        }
        mm = new MarkovMachine(data)
        console.log(mm.makeText())
    })
}


async function webCat(path){
    try {
        let res = await axios.get(path);
        mm = new MarkovMachine(res.data)
        console.log(mm.makeText())
    } catch (error) {
        console.log("Can't load page:", error.response.status)
        process.exit(1)

    }  
}
