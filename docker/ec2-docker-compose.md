# Deploy on AWS EC2 with docker compose

## Start an instance

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

### Install docker compose

- Download
sudo curl -L https://github.com/docker/compose/releases/download/1.22.0/docker-compose-$(uname -s)-$(uname -m) -o /usr/local/bin/docker-compose

- Permissions
sudo chmod +x /usr/local/bin/docker-compose

- Verify
docker-compose version