# Requirements

Minikube requires that VT-x/AMD-v virtualization is enabled in BIOS. To check that this is enabled on OSX / macOS run:

```
sysctl -a | grep machdep.cpu.features | grep VMX
```

If there's output, you're good!

# Prerequisites

- kubectl
- docker (for Mac)
- minikube
- virtualbox

```
brew update && brew install kubectl && brew cask install docker minikube virtualbox
```

# Verify

```
docker --version
docker-compose --version
docker-machine --version
minikube version
kubectl version --client
```

# Start minikube

```
minikube start
```

Great! You now have a running Kubernetes cluster locally. Minikube started a virtual machine for you, and a Kubernetes cluster is now running in that VM.

# Set docker env

```
eval $(minikube docker-env)
```

# Check k8s

```
kubectl get nodes
```

Should output something like:

```
NAME       STATUS    ROLES     AGE       VERSION
minikube   Ready     <none>    40s       v1.7.5
```

# Elevate privledges

```
chmod +x ./ctl.sh
```

# Build frontend image

```
./ctl.sh build
```

# Start services

```
./ctl.sh start
```

# Get the url

```
./ctl.sh url
```

Open the url in a browser and use the app. Check out the load balancing by running the following in the conosle:

```
var baseUrl = URL;
Promise.all(Array.from(Array(100), (_, i) => i).map(i => fetch(baseUrl + "/api/instance").then(r => r.json()))).then(console.log)
```
