---
title: 'Docker container manager'
short: 'How to deploy and manage containerized applications'
topic: virtualization docker
---

## Fast Help

<table >
<tr>
<th>Instruction</th>
<th>Command</th>
</tr>
<tr>
<td><b>Pull image</b></td>
<td><code>docker pull hello-world</code></td>
</tr>
<tr>
<td><b>List of containers images</b></td>
<td><code>docker images -a</code></td>
</tr>
<tr>
<td><b>Create container</b></td>
<td><code>docker create --name container_name ubuntu</code></td>
</tr>
<tr>
<td><b>Run container</b></td>
<td><code>docker run hello-world</code></td>
</tr>
<tr>
<td><b>Get container id</b></td>
<td><code>sudo docker ps -aqf "name=container_name"</code></td>
</tr>
<tr>
<td><b>Run a saved image</b></td>
<td><code>code>docker run -it -p 8091:8091 container_name</code></td>
</tr>
<tr>
<td><b>Operational bash cmd</b></td>
<td><code>docker exec -ti 2769d51daeb2 bash</code></td>
</tr>
<tr>
<td><b>Commit container</b></td>
<td><code>docker commit 2769d51daeb2</code></td>
</tr>
<tr>
<td><b>Stop container</b></td>
<td><code>docker stop 2769d51daeb2</code></td>
</tr>
<tr>
<td><b>Remove container</b></td>
<td><code>docker rm 2769d51daeb2</code></td>
</tr>
<tr>
<td><b>Remove image</b></td>
<td><code>docker rmi 2769d51daeb2</code></td>
</tr>
<tr>
<td><b>List of running container</b></td>
<td><code>docker ps</code></td>
</tr>
<tr>
<td><b>Clean and remove all containers</b></td>
<td><code>docker system prune</code></td>
</tr>
<tr>
<td><b>Rename image</b></td>
<td><code>docker tag 18455f1ec44d "container_name"</code></td>
</tr>
<tr>
<td><b>Create VM</b></td>
<td><code>docker-machine create \--driver virtualbox --virtualbox-disk-size "40000" default</code></td>
</tr>
<tr>
<td><b>Delete VM</b></td>
<td><code>docker rm default</code></td>
</tr>
<tr>
<td><b>Docker login</b></td>
<td><code>docker login -u "myusername" -p "mypassword" docker.io</code></td>
</tr>
<tr>
<td><b>Docker ID</b></td>
<td><code>docker tag 18455f1ec44d myusername/ubuntu_container_name:latest</code></td>
</tr>
<tr>
<td><b>Docker push</b></td>
<td><code>docker push docker.io/mlhoutel/ubuntu_container_name:latest</code></td>
</tr>
</table>

### Docker Setup

<table >
<tr>
<th>OS</th>
<th>Installation Link</th>
</tr>
<tr>
<td><b>Linux</b></td>
<td><code>sudo apt-get install docker-ce docker-ce-cli containerd.io</code></td>
</tr>
<tr>
<td><b>Mac</b></td>
<td>https://hub.docker.com/editions/community/docker-ce-desktop-mac/</td>
</tr>
<tr>
<td><b>Windows Pro</b></td>
<td>https://hub.docker.com/editions/community/docker-ce-desktop-windows/</td>
</tr>
<tr>
<td><b>Windows Family</b></td>
<td>https://github.com/docker/toolbox/releases</td>
</tr>
</table>

<em>https://www.docker.com/ - https://hub.docker.com/</em>

### Connect to the VM

```
user: docker
pwd: tcuser
```

Get the VM ip with

```
ifconfig eth1
```

Set the azert keyboard

```
su docker
tce-load -wi kmaps
sudo loadkmap < /usr/share/kmap/azerty/fr-latin9.kmap
```

Use Putty

```
Session\Window\Selection\Action = Compromise
paste : ctrl + shift + V
```

Use SSH

```
ssh docker@ip_machine
```

Install nginx server

```
install nginx server: docker run -d -p 8080:80 nginx
open webpage: http://ip_machine:8080/
```

Edit nginx webpage:

```
cd /usr/share/nginx/html
```

Get Nano:

```
apt-get update
apt-get install apt-file
apt-file update
apt-get install nano
```
