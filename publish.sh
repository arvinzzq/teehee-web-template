#!/bin/bash

echo 'Copying files for publish'

folders=('config' 'router' 'view')

test -d server_dist || mkdir server_dist

for item in ${folders[*]}
  do
    test -d server_dist/$item || mkdir server_dist/$item && cp -R server/$item/* server_dist/$item
  done

echo 'Copying is finished'