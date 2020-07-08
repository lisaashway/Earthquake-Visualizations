# leaflet-challenge

In this repository, you will find the creation of a map used to display earthquakes from the past 24 hours.
This webpage uses mapbox, leaflet, d3, and information obtained from the USGS Earthquake Hazard's program.

The following files can be found in this repository:

static folder:
    js folder:
        config.js: holds the api key for mapbox, since it is free there was no need to gitignore
        logic.js: this javascript file reads the data using d3.json and displays the map and markers

index.html: the webpage displaying the contents of the map