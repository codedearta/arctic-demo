
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

db.mdb.drop();
generateDates(new Date(2006,0,0,9,30), 3660).map(date => generateTickChunkFor(date))
.forEach(chunk => db.mdb.insert(chunk))
db.mdb.createIndex({"date": 1});

print("imported 10 years of tick data");

db.mdb.find({"date": ISODate("2006-01-20T09:30:00Z")}).explain("allPlansExecution")
