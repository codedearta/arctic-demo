from arctic import Arctic
import pandas as pd


# print(list(frames))

store = Arctic('localhost:27018')
#
# store.initialize_library('ticks')
#
# # Access the library
library = store['ticks']

frames = library.read('mdb')

versions = list(library.list_versions('mdb'))

# print(versions)

for frame in frames:
    print(frame)
