run(new Date(2013,0,1,9,30), 5);



Array.prototype.flatMap = function(lambda) {
    return Array.prototype.concat.apply([], this.map(lambda));
};

Date.prototype.addDays = function(days) {
  let dat = new Date(this.valueOf());
  dat.setDate(dat.getDate() + days);
  return dat;
}

Date.prototype.addMilliseconds = function(milliseconds) {
  let dat = new Date(this.valueOf());
  dat.setMilliseconds(dat.getMilliseconds() + milliseconds);
  return dat;
}

function getRandomArbitrary(min, max) {
  return Math.random() * (max - min) + min;
}

function getRandomInt(minp, maxp) {
  const min = Math.ceil(minp);
  const max = Math.floor(maxp);
  return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
}

function generateTickFor(timestamp) {
    return [ Math.random() > 0.5 ? 'ASK' : 'BID', getRandomInt(0,10000), getRandomArbitrary(24,100), timestamp ];
}

function getDates(from, days) {
  let dateArray = new Array();
  let currentDate = from;

  for(i=0;i<days;i++) {
      dateArray.push(new Date (currentDate));
      currentDate = currentDate.addDays(1);
  }

  return dateArray;
}

function getTickTimeStampsForDay(date) {
  let timeStampsArray = new Array();
  let currentDate = new Date(date);
  while(currentDate.getHours() < 16) {
    timeStampsArray.push(currentDate);
    currentDate = currentDate.addMilliseconds(333);
  }
  return timeStampsArray;
}

function run(from, days) {
  const start = new Date().getTime();


  db.mdb.drop();
  db.mdb.createIndex({"s": 1})



  const dates = getDates(from, days);
  print(dates[0] + ", " + dates[dates.length-1]);


  dates.forEach(day => {
      const dayTicks = getTickTimeStampsForDay(day).map(d => generateTickFor(d))
      const dayChunk = {
        s: day,
        sy: 'mdb',
        d: dayTicks,
        c: ['askBid', 'amount', 'price', 'timestamp']
      };
      db.mdb.insert(dayChunk);
    }
  );

  const end = new Date().getTime();
  const time = end - start;
  print('Execution time to store ' + days + ' days of tick data: ' + time /1000 + ' sec.');
};
