#!/usr/bin/env bash

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

command=$1

case $command in
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
        ;;
    *)
        echo "Option not recognized."
        exit 1
esac