db.mdb.find({
    s: {
        $gte: ISODate("2013-01-01T00:00:00.000Z"),
        $lt: ISODate("2013-12-01T23:59:95.999Z")
    }
})
// run(new Date(2013,0,1,9,30), 5);
