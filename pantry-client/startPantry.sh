#!/bin/bash

export $(grep -v '^#' ../.env | xargs -d '\n')

# Use envsubst to create nginx conf file using env variables
envsubst '$EPANTRY_PATH $NGINX_SERVER $NGINX_PORT' < $EPANTRY_PATH/epantry.conf.template > $EPANTRY_PATH/epantry.conf
cp $EPANTRY_PATH/epantry.conf /etc/nginx/sites-available/
rm -f /etc/nginx/sites-enabled/epantry.conf
ln -s /etc/nginx/sites-available/epantry.conf /etc/nginx/sites-enabled/

status=$(/etc/init.d/nginx status | grep 'dead')

if [[ $status -eq '' ]]; then
    service nginx restart
else
    service nginx start
fi

uwsgi --ini $EPANTRY_PATH/epantry.ini &

# npm run watch &