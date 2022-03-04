#!/bin/bash

folder="$1"

if [ ! -d "$folder" ]
then
  mkdir "$folder"
fi
