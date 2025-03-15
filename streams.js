const fs = require('fs');

const readStream = fs.createReadStream('./doc/blog3.txt', {encoding: 'utf8'});
const writeStream = fs.createWriteStream('./doc/blog4.txt');


readStream.on('data', (chunk) => {
    console.log('----NEW CHUNK----');
    console.log(chunk);
    writeStream.write('\nNEW CHUNK\n');
    writeStream.write(chunk);
}
);

//piping
readStream.pipe(writeStream);