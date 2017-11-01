db = db.getSiblingDB('arctic');
collections = db.getCollectionNames();
print('collections: '+collections);
print('size: ' + db.ticks.stats().size)
print('storageSize: ' + db.ticks.stats().storageSize)
print('avgObjSize: ' + db.ticks.stats().avgObjSize)
