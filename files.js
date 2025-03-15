const fs = require('fs');

fs.readFile('./doc/blog.txt', (err, data) => {
    if (err) {
        console.log(err);
    }
    console.log(data.toString());
}
);

fs.writeFile('./doc/blog.txt', 'Hello, world', () => {
    console.log('file was written');
}
);

if(!fs.existsSync('./doc/assets')) {
    fs.mkdir('./doc/assets', (err) => {
        if (err) {
            console.log(err);
        }
        console.log('folder created');
    }
    );
}else{
    fs.rmdir('./doc/assets', (err) => {
        if (err) {
            console.log(err);
        }
        console.log('folder deleted');
    }
    );
}

if(fs.existsSync('./doc/delete.txt')) {
    fs.unlink('./doc/delete.txt', (err) => {
        if (err) {
            console.log(err);
        }
        console.log('file deleted');
    }
    );
}
