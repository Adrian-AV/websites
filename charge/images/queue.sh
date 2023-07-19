#!/bin/sh
err=0
while read -r url filename tail; do
  wget -O "$filename" "$url" || err=1
done < queue