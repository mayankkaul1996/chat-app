#!/usr/bin/env bash

# run this script to setup chat-app project(client + server)

server_folder="server"
client_folder="client"

working_dir="/Users/rebel/Documents/personal/code/chat-app"
cd $working_dir
echo "Entered "$working_dir

# server setup
cd $server_folder
rm -rf node_modules
npm i
echo "Server Setup is done!!"

# client setup
cd $working_dir
cd $client_folder
rm -rf node_modules
npm i
echp "Client Setup is done!!"

