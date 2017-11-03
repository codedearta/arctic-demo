#!/usr/bin/python

import random
from arctic import CHUNK_STORE, Arctic
from datetime import datetime
import datetime as dt
import pandas as pd
import sys, getopt
import time

print(sys.path)

dateTimeFormat = '%Y-%m-%d %H:%M'

def parseOptions():
    libraryName = 'ticks'
    symbol = 'mdb'
    beginDate = datetime.strptime('2006-01-01 09:30', dateTimeFormat)
    numberOfDays = 366
    host = 'localhost:27017'
    chunkSize = 'M'

    try:
        opts, args = getopt.getopt(sys.argv[1:],"l:s:b:n:h:c:",["libraryName=","symbol=", "beginDate=", "numberOfDays=", "host=", "chunkSize="])
    except getopt.GetoptError as err:
        print(err)
        printOptions()
        sys.exit(2)
    for opt, arg in opts:
        if opt in ("-l", "--libraryName"):
            libraryName = arg
        elif opt in ("-s", "--symbol"):
            symbol = arg
        elif opt in ("-b", "--beginDate"):
            beginDate = beginDate = datetime.strptime(arg, dateTimeFormat)
        elif opt in ("-n", "--numberOfDays"):
            numberOfDays = int(arg)
        elif opt in ("-h", "--host"):
            host = arg
        elif opt in ("-c", "--chunkSize"):
            chunkSize = arg
    return (libraryName,symbol,beginDate,numberOfDays,host,chunkSize)

def printOptions():
    print('  -l [ --libraryName ] arg       name of the library in MongoDB')
    print('  -s [ --symbol ] arg            symbol of the time series')
    print('  -b [ --beginDate ] arg         begin date of the time series. Format "01-01-2006 09:30", "%d-%m-%Y %H:%M"')
    print('  -n [ --numberOfDays ] arg      number of days of the time series')
    print('  -h [ --host ] arg              MongoDB hostname')
    print('  -c [ --chunkSize ] arg         possible: D, M, Y for (Day, Month, Year)')

libraryName,symbol,beginDate,numberOfDays,host,chunkSize = parseOptions()

def printUsedOptions():
    print("using argument '1:libraryName': " + libraryName)
    print("using argument '2:symbol': " + symbol)
    print("using argument '3:beginDate': " + str(beginDate))
    print("using argument '4:numberOfDays': " + str(numberOfDays))
    print("using argument '5:host': " + host)
    print("using argument '6:chunkSize': " + chunkSize)

printUsedOptions()

def generateDayDataFrame(tradingDateTime):

    # def generateTradingSeconds(date):
    #     def addSecondsToDate(seconds):
    #         return date + dt.timedelta(0,seconds)
    #     return map(addSecondsToDate, range(25200))



    # def generateTicks():
    #     def randomFunc(a):
    #         return random.random() > 0.4
    #     return map(randomFunc,range(25200))

    # def generatePrices():
    #     def generatePrice(seed):
    #         return random.uniform(24, 100)
    #     return map(generatePrice, range(25200))
    #
    # def generateAmounts():
    #     def generateAmount(seed):
    #         return random.randrange(10000)
    #     return map(generateAmount, range(25200))

    def genRecord(seconds):
        date = tradingDateTime + dt.timedelta(milliseconds=seconds)
        askBid = 'ASK' if random.random() < 0.5 else 'BID'
        price = random.uniform(24, 100)
        amount = random.randrange(10000)
        return (date, askBid, price, amount)

    records = map(genRecord, range(0, 25200 * 1000, 333))
    dates,askBids,prices,amounts = map(list, zip(*records))

    # dates = list(generateTradingSeconds(tradingDateTime))
        # tradingSeconds = range(25200)
        # dates =   list(map(lambda seconds: tradingDateTime + dt.timedelta(0,seconds),  tradingSeconds))
        # askBids = list(map(lambda _: 'ASK' if random.random() < 0.5 else 'BID',        tradingSeconds))
        # prices =  list(map(lambda _: random.uniform(24, 100),                          tradingSeconds))
        # amounts = list(map(lambda _: random.randrange(10000),                          tradingSeconds))
    # df = pd.DataFrame(data={'data': ticks, 'date': dates})
    df = pd.DataFrame(data={'askBid': askBids, 'amount': amounts, 'price': prices, 'date': dates})
    return df

dates = pd.date_range(beginDate, periods=numberOfDays).tolist()
frames = map(generateDayDataFrame, dates)

store = Arctic(host)
#
store.initialize_library(libraryName, lib_type=CHUNK_STORE)
#
# # Access the library
library = store[libraryName]
# singdf = pd.DataFrame(data={'data': [1], 'date': [beginDate] })
# library.write(symbol, singdf)
start = time.time()
for frame in frames:
    library.update(symbol, frame, upsert=True, chunk_size=chunkSize)
end = time.time()
print("elapsed time to write data: " + str(end - start))
