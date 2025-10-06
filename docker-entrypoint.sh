#!/usr/bin/env sh
set -eu

envsubst < /usr/share/nginx/html/config.template.js > /usr/share/nginx/html/config.js

exec "$@"