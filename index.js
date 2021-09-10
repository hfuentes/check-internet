const dns = require('dns');
const fs = require('fs');

// parámetros
let ms = 1000;
const address = '8.8.8.8';
const port = 53;

// tiempo en ms para ciclo de intervalos
try {
    ms = parseInt(process.argv[2]);
} catch (err) { }

// nombre de archivo log con fecha YYYYMMDD
let date = new Date()
let day = date.getDate();
let month = date.getMonth() + 1;
month = month < 10 ? `0${month}` : month;
let year = date.getFullYear();
const fileName = `${year}${month}${day}_report.log`;

// abre archivo log para escribir pruebas de conexión
const logger = fs.createWriteStream(fileName, { flags: 'a' });

console.log(`log: ${fileName}`);
console.log(`ms: ${ms}`);
console.log(`address: ${address}`);
console.log(`port: ${port}`);

// ejecuta pruebas conexión
setInterval(() => {
    dns.lookupService(address, port, (err, hostname, service) => {
        const date = new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '');
        if (err) {
            console.log(date, 'ERROR', err);
            logger.write(`${date} ERROR ${err}\n`);
        } else {
            console.log(date, 'CONNECTED', hostname, service);
            logger.write(`${date} CONNECTED ${hostname} ${hostname}\n`);
        }
    });
}, ms);