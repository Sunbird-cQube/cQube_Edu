# cQube_Edu
cQube for Education

Provides pre-configured visualisations for various academic and non-academic programs in the context of School education such as digital learning, teacher training, nutrition, and other such programs. Today, it ingests pre-processed data for various programmes and helps easily visualise them through configurable dashboards.

# cQube-v4.0-aplha Installation
###  Prerequisites to install cQube-v4.0-aplha:

- ubuntu 18.04 (supported)
- 32GB of System RAM (minimum requirement)
- 8 core CPU (minimum requirement)
- Domain name (with SSL)
- 1 TB Storage
### Reverse proxy rules (public routing)
The following ports have to be configured in the nginix server with reverse proxy:

- Port 4200 should be proxied to the '/'
- Port 8080 should be proxied to the '/auth'
- Port 3000 should be proxied to the '/api'
- Port 8000 should be proxied to the '/data'

### Nginx - cQube server firewall configuration

- Port 4200 should be open from nginx to the cQube server
- Port 8080 should be open from nginx to the cQube server
- Port 8000 should be open from nginx to the cQube server
### Openvpn - cQube server firewall configuration

- Port 9000 should be open from openvpn to the cQube server
- Port 4201 should be open from openvpn to the cQube server

### Reverse proxy rules (internal routing)
The following ports have to be configured in the nginix # server with reverse proxy:

- Port 4201 should be proxied to the '/'
- Port 3001 should be proxied to the '/api'

### Nginx - cQube server firewall configuration

- Port 4201 should be open from nginx to the cQube server
- Port 3001 should be open from nginx to the cQube server 

### Openvpn - cQube server firewall configuration

- Port 80 should be open from openvpn to the nginx server

Note: For Installation: follow the below steps directly.


# Installation Steps:
- Open Terminal
- Navigate to the directory where cQube_Edu has been downloaded or cloned 
  ```
  cd cQube_Edu/devops/
  git checkout cqube-v4.0-aplha
  git pull
  ```
- Copy the config.yml.template to config.yml 
  ```
  cp config.yml.template config.yml
  ```
- Edit using ```nano config.yml```
- If you are opting for mode_of_installation as localhost then storage_type should be local. Copy the local_storage_config.yml.template to local_storage_config.yml  
  ```
  cp local_storage_config.yml.template local_storage_config.yml
  ```
- If you are opting for mode_of_installation as public then storage_type should be s3. Copy the aws_s3_config.yml.template to aws_s3_config.yml 
  ```
  cp aws_s3_config.yml.template aws_s3_config.yml
  ```
- Edit using ```nano aws_s3_config.yml```

- If you are opting for mode_of_installation as public then storage_type should be azure. Copy the azure_container_config.yml.template to azure_container_config.yml 
  ```
  cp azure_container_config.yml.template azure_container_config.yml
  ```
- Edit using ```azure_container_config.yml```

- Fill the configuration details for the below mentioned list in config.yml (* all the values are mandatory)
- cQube_Base installation process installs the components in a sequence as mentioned below:
  - Installs Ansible
  - Installs Openjdk
  - Installs Python, pip and flask
  - Installs Postgresql
  - Installs NodeJS
  - Installs Angular and Chart JS
  - Installs Apache Nifi
  - Installs Keycloak
  - Installs Grafana
  - Installs Prometheus and node exporter
- Save and Close the file

### Configuration of infrastructure attributes and udise data indices, metrics:

- Based on the number of infrastructure attributes required by the state, configure the infrastructure report by filling the required fields in the file infrastructure_master.csv:
- ```cd ../processing/datasource/infra/postgres/infrastructure_master.csv```
- To edit below mentioned infrastructure details
- ```nano infrastructure_master.csv```

- Save and Close the file

- Based on the number of udise attributes required by the state, configure the udise_config.csv file by filling the required fields in the file udise_config.csv:
- ```cd ../processing/datasource/udise/postgres/udise_config.csv```

- To edit below mentioned UDISE details ```nano udise_config.csv```

- Save and Close the file

- For more information to configure the weights & columns for udise/infrastucture, please refer operational document.

- Update the diksha parameters(api_url,token,encryption key,dataset name channel_id,org_id) in the file  diksha_parameters.txt file by filling the required fields in the file diksha_parameters.txt:

-  ```cd ../processing/datasource/diksha/nifi/diksha_parameters.txt```



- Give the following permission to the install.sh file

  ```
  chmod u+x install.sh
  ```

- Install cQube using the non-root user with sudo privilege

- Configuration filled in config.yml will be validated first. If there is any error during validation, you will be prompted with the appropriate error message and the installation will be aborted. Refer the error message and solve the errors appropriately, then re-run the installation script ```sudo ./install.sh```

- Start the installation by running install.sh shell script file as mentioned below:

  ```
  sudo ./install.sh
  ```

Once installation is completed without any errors, you will be prompted the following message. 
```**CQube installed successfully!!**```



