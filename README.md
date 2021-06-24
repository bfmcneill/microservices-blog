# Microservice Blog

## Change hosts file to posts.com >> 127.0.0.1

- [On windows 10](https://www.liquidweb.com/kb/edit-host-file-windows-10/)

## Commands

- `Set-Alias -Name k -Value kubectl`

### kubernets

```powershell
kubectl version


kubectl get pods
kubectl get deployments
kubectl get services


kubectl describe pod [pod_name]
kubectl describe deployment [depl_name]
kubectl describe service [srv_name]


kubectl apply -f [config file name]


kubectl delete pod [pod_name]
kubectl delete deployment [depl_name]


kubectl exec -it [pod_name][cmd]


kubectl logs [pod_name]


kubectl rollout restart deployment [depl_name]
```
