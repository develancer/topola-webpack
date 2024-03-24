#!/bin/sh
if [ $# -ne 2 ] ; then
  echo "USAGE: $0 input.ged output.html"
  exit 1
fi
npm install && \
  node_modules/.bin/parse-gedcom "$1" > src/entries.json && \
  node_modules/.bin/webpack && \
  mv dist/index.html "$2" && \
  rm -r dist && \
  echo "SUCCESS! The HTML file has been saved to $2."
