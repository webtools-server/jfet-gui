#!/bin/sh
basedir=$(dirname "$(echo "$0" | sed -e 's,\\,/,g')")

case `uname` in
    *CYGWIN*) basedir=`cygpath -w "$basedir"`;;
esac

if [ -x "$basedir/node" ]; then
  "$basedir/node"  "$basedir/../__PATH_PLACEHOLDER__" "$@"
  ret=$?
else 
  node  "$basedir/../__PATH_PLACEHOLDER__" "$@"
  ret=$?
fi
exit $ret
