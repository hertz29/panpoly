#!/bin/bash

function job_management() {
    APP=job_management
    isExists=$(docker ps -af name=$APP | grep -v IMAGE)
    if [ ! -z isExists ];then
        docker rm -f $APP
    fi
    IMAGE_NAME=panpoly/job_management
    
    COMMAND="docker run \
                    -d \
                    --name $APP \
                    -p 5000:5000 \
                    $IMAGE_NAME"
    echo -e "Starting $APP\n"${COMMAND/\s+/ }
    $COMMAND
    COMMAND_EXIT_CODE=$?
    if [ ${COMMAND_EXIT_CODE} != 0 ]; then
        printf "Error when executing: '${APP}'\n"
        exit ${COMMAND_EXIT_CODE}
    fi

    elassandraHealthCheck
    echo "$APP is ready"
}

function client(){
    APP=client
    isExists=$(docker ps -af name=$APP | grep -v IMAGE)
    if [ ! -z isExists ];then
        docker rm -f $APP
    fi
    IMAGE_NAME=panpoly/client
    
    COMMAND="docker run \
                    -d \
                    --name $APP \
                    -p 3000:3000 \
                    $IMAGE_NAME"
    echo -e "Starting $APP\n"${COMMAND/\s+/ }
    $COMMAND
    COMMAND_EXIT_CODE=$?
    if [ ${COMMAND_EXIT_CODE} != 0 ]; then
        printf "Error when executing: '${APP}'\n"
        exit ${COMMAND_EXIT_CODE}
    fi

    echo "$APP is ready"
}

function scheduler() {
    APP=scheduler
    isExists=$(docker ps -af name=$APP | grep -v IMAGE)
    if [ ! -z isExists ];then
        docker rm -f $APP
    fi
    IMAGE_NAME=panpoly/scheduler
    COMMAND="docker run \
                    -d \
                    --name $APP \
                    -p 9000:9000 \
                    $IMAGE_NAME"
    echo -e "Starting $APP\n"${COMMAND/\s+/ }
    $COMMAND
    COMMAND_EXIT_CODE=$?
    if [ ${COMMAND_EXIT_CODE} != 0 ]; then
        printf "Error when executing: '${APP}'\n"
        exit ${COMMAND_EXIT_CODE}
    fi

    waitForHealtySign $APP "listening"

    echo "$APP is ready"
}


function deleteContainer() {
    NAME=$1
    isExists=$(docker ps -af name=$NAME | grep -v IMAGE)
    if [ ! -z isExists ];then
        docker rm -f $NAME
    fi
}


echo "running switch case"

for option in ${@}; do
    case $option in
    --job_management)
        job_management || exit 1
        ;;
    --client)
        client || exit 1
        ;;
    --scheduler)
        scheduler || exit 1
        ;;
    *)
        echo "Usage: ./runDocker.sh <jobManagement|react-app|scheduler>"
        ;;
    esac
done

docker ps
