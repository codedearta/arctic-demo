 mongod --networkMessageCompressors zlib --wiredTigerCollectionBlockCompressor zlib --wiredTigerCacheSizeGB 0.25


 system.indexes → 0.001MB / 0.008MB
ticks          → 3.250MB / 4.008MB
ticks.ARCTIC   → 0.000MB / 0.008MB
ticks.metadata → 0.003MB / 0.008MB
ticks.symbols  → 0.000MB / 0.008MB
sre-mac(mongod-3.6.0-rc1) arctic>
2017-10-31T16:15:27.899+0000 I NETWORK  [thread1] trying reconnect to 127.0.0.1:27017 (127.0.0.1) failed
2017-10-31T16:15:27.900+0000 I NETWORK  [thread1] reconnect 127.0.0.1:27017 (127.0.0.1) ok
>
sre-mac(mongod-3.6.0-rc1) arctic> show collections
ticks          → 2.133MB / 1.992MB
ticks.ARCTIC   → 0.000MB / 0.016MB
ticks.metadata → 0.003MB / 0.016MB
ticks.symbols  → 0.000MB / 0.016MB
