docker stop $(docker ps -a -q)

cd scheduler

docker build -t panpoly/scheduler .

cd ../

source ./runDocker.sh --scheduler

cd JobManagement

docker build -t panpoly/job_management .

cd ../

source ./runDocker.sh --job_management

cd client

docker build -t panpoly/client .

cd ../ 


source ./runDocker.sh --client


