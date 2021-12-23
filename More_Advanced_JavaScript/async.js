const fs = require('fs/promises');

async function readFile() {
    let fileData;

    // fs.readFile('data.txt', function(error, fileData) {
    // if (error) {
    //  ....
    //}
    //     console.log('File parsing done!');
    //     console.log(fileData.toString());
    // });

    await fs.readFile('data.txt')
    .then(function(fileData) {
        console.log(fileData.toString());
        // return anotherAsyncOperation;
    })
    .then(function() {

    })
    .catch(function(error) {
        console.log(error);
    });

    console.log('Hi there!');
}

readFile();