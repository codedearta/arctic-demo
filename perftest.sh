
DBPATH=/data/perftest/db
LOGPATH=${DBPATH}/mongodb.log
IMPORTER=generate_chunks.py

pkill mongod
sleep 5
rm -rf /data/perftest/db
mkdir -p /data/perftest/db
mongod --storageEngine mmapv1 --dbpath $DBPATH --fork --logpath $LOGPATH
sleep 10
/Library/Frameworks/Python.framework/Versions/3.6/bin/python3 $IMPORTER
mongo collectStats.js | tee mmapv1.stats

pkill mongod
sleep 5
rm -rf /data/perftest/db
mkdir -p /data/perftest/db
mongod --dbpath $DBPATH --fork --logpath $LOGPATH
sleep 10
/Library/Frameworks/Python.framework/Versions/3.6/bin/python3 $IMPORTER
mongo collectStats.js | tee wt-snappy.stats

pkill mongod
sleep 5
rm -rf /data/perftest/db
mkdir -p /data/perftest/db
mongod --networkMessageCompressors zlib --dbpath $DBPATH --fork --logpath $LOGPATH
sleep 10
/Library/Frameworks/Python.framework/Versions/3.6/bin/python3 $IMPORTER
mongo collectStats.js | tee wt-zlib.stats
pkill mongod
