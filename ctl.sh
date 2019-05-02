#!/usr/bin/env bash

function bootstrap() {
  minikube start
  eval $(minikube docker-env)
}

function start() {
  kubectl apply -f redis.master.deployment.yaml
  kubectl apply -f redis.master.service.yaml

  kubectl apply -f redis.slave.deployment.yaml
  kubectl apply -f redis.slave.service.yaml

  kubectl apply -f frontend.deployment.yaml
  kubectl apply -f frontend.service.yaml
}

function stop() {
  echo "stop"
}

function nuke() {
  kubectl delete deployment -l app=redis
  kubectl delete service -l app=redis
  kubectl delete deployment -l app=myapp
  kubectl delete service -l app=myapp
}

function dashboard() {
  minkube dashboard
}

function url() {
    minikube service frontend --url
}

function buildFrontEndImage() {
   docker build -f ./frontend/Dockerfile ./frontend --tag frontend
}

function buildSlaveImage() {
  docker build -f ./redis-slave/Dockerfile ./redis-slave --tag redis-slave
}


command=$1

case $command in
    bootstrap)
      bootstrap
      ;;
    start)
        start
        ;;
    nuke)
        nuke
        ;;
    dashboard)
        dashboard
        ;;
    url)
        url
        ;;
    build)
        buildFrontEndImage
        buildSlaveImage
        ;;
    *)
        echo "Option not recognized."
        exit 1
esac