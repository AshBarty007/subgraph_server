cd /root/subgraph_server/script
nohup ts-node ../src/server.ts > ../log/server.log 2>&1 &
nohup ts-node ../src/update.ts > ../log/update.log 2>&1 &