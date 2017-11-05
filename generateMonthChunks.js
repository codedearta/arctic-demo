Array.prototype.flatMap = function(lambda) {
    return Array.prototype.concat.apply([], this.map(lambda));
};

Date.prototype.addDays = function(days) {
  var dat = new Date(this.valueOf());
  dat.setDate(dat.getDate() + days);
  return dat;
}

Date.prototype.addMilliseconds = function(milliseconds) {
  var dat = new Date(this.valueOf());
  dat.setMilliseconds(dat.getMilliseconds() + milliseconds);
  return dat;
}

function generateDaylyChunkFor(year, month, day) {

    function getRandomArbitrary(min, max) {
      return Math.random() * (max - min) + min;
    }

    function getRandomInt(min, max) {
      min = Math.ceil(min);
      max = Math.floor(max);
      return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
    }

    function generateTickFor(ts) {
      return [  Math.random() > 0.5 ? 'ASK' : 'BID', getRandomInt(0,10000), getRandomArbitrary(24,100), ts ]
        // return { "askBid": Math.random() > 0.5 ? 'ASK' : 'BID',
        //   "amount": getRandomInt(0,10000),
        //   "price": getRandomArbitrary(24,100),
        //   "ts": ts
        // }
    }

    function getTickTimeStampsForDay(date) {
      var timeStampsArray = new Array();
      var currentDate = new Date(date);
      while(currentDate.getHours() < 16) {
        timeStampsArray.push(currentDate);
        currentDate = currentDate.addMilliseconds(333);
      }
      return timeStampsArray;
    }

    return getTickTimeStampsForDay(new Date(year, month-1, day)).map(ts => generateTickFor(ts));

    //return getDaysOfMonth(year, month).flatMap(day => getTickTimneStampsForDay(day)).map(ts => generateTickFor(ts));

};

db.mdb.drop();
function generateChunksForYear(year) {

  function getChunk(year, month, day) {

    const doc = {
      "symbol": "MDB",
      "chunkDate": new Date(year, month, day),
      "data" : generateDaylyChunkFor(year, month, day)
    }
    return doc;
    //db.ticks.insert(doc);
  }

  function getDaysOfMonth(year, month) {
    var dateArray = new Array();
    var startDate = new Date(year, month-1, 1, 9, 30);
    var endDate = new Date(year, month, 0, 9, 30);
    while (startDate <= endDate) {
        dateArray.push(new Date (startDate));
        startDate = startDate.addDays(1);
    }
    return dateArray;
  }

  for(var m=1;m<=12;m++) {
    let monthChunksArray = getDaysOfMonth(year,m).map(d => getChunk(year, m, d.getDay()));
    db.ticks.insertMany(monthChunksArray, { "ordered": false});
  }

  // saveChunk(year,2);
  // saveChunk(year,3);
  // saveChunk(year,4);
  // saveChunk(year,5);
  // saveChunk(year,6);
  // saveChunk(year,7);
  // saveChunk(year,8);
  // saveChunk(year,9);
  // saveChunk(year,10);
  // saveChunk(year,11);
  // saveChunk(year,12);
}

generateChunksForYear(2017);




// db.mdb.drop();
// generateDates(new Date(2006,0,0,9,30), 3660).map(date => generateTickChunkFor(date))
// .forEach(chunk => db.mdb.insert(chunk))
// db.mdb.createIndex({"date": 1});
//
// print("imported 10 years of tick data");
//
// db.mdb.find({"date": ISODate("2006-01-20T09:30:00Z")}).explain("allPlansExecution")
