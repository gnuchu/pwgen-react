#!/usr/bin/env bash

SCRIPTPATH=`realpath "$0"`
DIR=`dirname "$SCRIPTPATH"`
SERVERPATH="$DIR/index.js"

node $SERVERPATH
