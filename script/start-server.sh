cd /root/subgraph_server/script
nohup ts-node ../src/server.ts > ../log/server.log 2>&1 &
nohup ts-node ../src/updateDetailedPools.ts > ../log/updateDetailedPools.log 2>&1 &
nohup ts-node ../src/updateOnChainPools.ts > ../log/updateOnChainPools.log 2>&1 &
nohup ts-node ../src/updateSimplePools.ts > ../log/updateSimplePools.log 2>&1 &