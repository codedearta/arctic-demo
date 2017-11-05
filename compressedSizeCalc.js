const snappy = require('snappy')
const LZ4 = require('lz4')
const sizeof = require('object-sizeof');

let obj = {   "$oid":"59dd2a75d590cbcd0c5ee711",
              "dateFrom" :	new Date(),
              "range" :		"D",
              "symbol" :	"MDB",
              "name" :	 	"MongoDB, Inc." };


const randFloat = (min, max) => {
  return (Math.random() * (max - min) + min);
}
const randInt = (min, max) => {
  return Math.round(randFloat(min, max));
}

const ticksPerSecond = 3;
const secondsPerTradingDay = 6.5*60*60;
const tradingWeekDays = 5

let ticks = new Array();
for(i=0;i<=70200 * 11 ;i++) {
  ticks.push([ "A", randInt(0,10000), randFloat(0,900) ]);
}

obj.ticks = ticks;

const objString = JSON.stringify(obj);

snappy.compress(objString, (err, compressed) => {
  console.log('uncompressed size is', sizeof(objString) / (1024*1024), 'MB')
  console.log('compressed size is with "snappy":', sizeof(compressed) / (1024*1024), 'MB')
})

const input = new Buffer(objString);
const output = new Buffer(LZ4.encodeBound(input.length));
const compressedSize = LZ4.encodeBlock(input, output);
console.log('compressed size is with "lz4":', compressedSize / (1024*1024), 'MB');
