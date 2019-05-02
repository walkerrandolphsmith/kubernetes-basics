#!/usr/bin/env bash

set -e

echo "logging"

which redis-server

redis-server --slaveof redis-master 6379