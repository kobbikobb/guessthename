# Deploy on AWS EC2 with docker compose

## Start an instance

- Amazon Linux 2
- t2.micro
- Download key-pair 
- Allow ssh and http
- Optional: Separate disk for data
- User Data
```
#!/bin/bash

# Install docker
sudo yum update -y
sudo yum -y install docker
sudo service docker start
sudo usermod -a -G docker ec2-user
sudo chmod 666 /var/run/docker.sock

# Install docker compose
sudo curl -L https://github.com/docker/compose/releases/download/1.22.0/docker-compose-$(uname -s)-$(uname -m) -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose

```

### Allow group members to read pem file
chmod 0400 key-pair.pem

### Copy files into docker-compose and nginx.conf into the machine

scp -i key-pair.pem -r /guessthename/nginx.conf ec2-user@public-ip:nginx.conf
scp -i key-pair.pem -r /guessthename/docker-compose-explicit.yaml ec2-user@public-ip:docker-compose-explicit.yaml

### SSH into machine and start docker-compose

ssh -i key-pair.pem ec2-user@public-ip

### Prepare data folder
sudo mkdir /data

Optional: Mount it to EBS
See: https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/ebs-using-volumes.html
lsblk
sudo mkfs -t xfs /dev/XXX
sudo mount /dev/XXX /data

### Start docker compose
docker-compose --file docker-compose-explicit.yaml up
