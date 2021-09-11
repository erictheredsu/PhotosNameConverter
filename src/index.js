const fileOperator = require('../src/fileOperator');


const args = process.argv.slice(2)
let path = args[0]
console.log(path);

async function main(){
    let app = new fileOperator();
    await app.renameFolders(path);
}

main();