
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

function generateMonthlyChunkFor(year, month) {

    function getRandomArbitrary(min, max) {
      return Math.random() * (max - min) + min;
    }

    function getRandomInt(min, max) {
      min = Math.ceil(min);
      max = Math.floor(max);
      return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
    }

    function generateTickFor(ts) {
        { "askBid": Math.random() > 0.5 ? 'ASK' : 'BID'),
          "amount": getRandomInt(0,10000),
          "price": getRandomArbitrary(24,100),
          "ts": timestamp
        }
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

    function getTickTimneStampsForDay(date) {
      var timeStampsArray = new Array();
      var currentDate = new Date(date);
      while(currentDate.getHours() < 16) {
        timeStampsArray.push(currentDate);
        currentDate = currentDate.addMilliseconds(333);
      }
      return timeStampsArray;
    }

    return getDaysOfMonth(year, month).flatMap(day => getTickTimneStampsForDay(day)).map(ts => generateTickFor(ts));

};


function generateTickChunkFor(date) {
  let data = []
  const openTime = 34200000
  const closeTime = 57600000

  for(i=openTime;i<closeTime;i+=1000) {
    data.push(Math.random() > 0.4 ? i : -i); // produce a slight positive trend
  }


  const chunk = {
     "date": date,
     "symbol":"MDB",
     "name": "MongoDB, Inc.",
     "tickSize": 0.01,
     "ticks": data
  }

  return chunk;
}

function generateDates(start, days) {
  var dates = [];
  for(i=0;i<days;i++) {
    dates.push(new Date(start.setDate(start.getDate() + 1)))
  }
  return dates;
}

// db.mdb.drop();
// generateDates(new Date(2006,0,0,9,30), 3660).map(date => generateTickChunkFor(date))
// .forEach(chunk => db.mdb.insert(chunk))
// db.mdb.createIndex({"date": 1});
//
// print("imported 10 years of tick data");
//
// db.mdb.find({"date": ISODate("2006-01-20T09:30:00Z")}).explain("allPlansExecution")
