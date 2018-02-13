#!/bin/bash
./build.sh
docker push [container_name]:latest
# Additional deploy steps can go here