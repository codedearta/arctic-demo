from arctic import Arctic
import quandl

# Connect to Local MONGODB
store = Arctic('localhost')

# Create the library - defaults to VersionStore
store.initialize_library('NASDAQ')

# Access the library
library = store['NASDAQ']

# Load some data - maybe from Quandl
aapl = quandl.get("WIKI/AAPL", authtoken="EHzx5aCeznkWQDw-3Jsb")


# Store the data in the library
library.write('AAPL_V2', aapl, metadata={'source': 'Quandl'})

# Reading the data
item = library.read('AAPL_V2')
aapl = item.data
# print(aapl)
metadata = item.metadata
print(metadata)
print(aapl)
