#!/bin/sh

# variables
basedir=`dirname "$0"`
workdir=`dirname "$basedir"`
releasedir="$workdir/soft"

# release
echo "entering $releasedir & scp"
cd $releasedir

scp -r ./ root@172.16.1.8:/data/www/tracker/public/map/soft