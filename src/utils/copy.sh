#!/bin/sh
cd /Users/wangshuang/Desktop/wystan-node/logs
cp access.log $(date +%Y-%m-%d).access.log
echo "" > access.log