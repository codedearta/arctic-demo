from arctic import Arctic
import pandas as pd
import time
import sys, getopt

def parseOptions():
    host = 'localhost:27017'
    libraryName = 'ticks'
    symbol = 'mdb'

    try:
        opts, args = getopt.getopt(sys.argv[1:],"h:",["host="])
    except getopt.GetoptError as err:
        print(err)
        printOptions()
        sys.exit(2)
    for opt, arg in opts:
        if opt in ("-h", "--host"):
            host = arg
        elif opt in ("-l", "--libraryName"):
            libraryName = arg
        elif opt in ("-s", "--symbol"):
            symbol = arg

    return (host,libraryName,symbol)

def printOptions():
    print('  -h [ --host ] arg              MongoDB hostname')
    print('  -l [ --libraryName ] arg       name of the library in MongoDB')
    print('  -s [ --symbol ] arg            symbol of the time series')

host, libraryName, symbol = parseOptions()

def printUsedOptions():
    print("using argument '5:host': " + host)
    print("using argument '1:libraryName': " + libraryName)
    print("using argument '2:symbol': " + symbol)

printUsedOptions()

store = Arctic(host)

# Access the library
library = store[libraryName]

start = time.time()
frames = library.read(symbol)
end = time.time()

print("elapsed time to read all data of symbol '" + symbol + "': " + str(end - start))

# print(versions)

# for frame in frames:
#     print(frame)
