# cQube Installation
###  Prerequisites to install cQube_Edu:

- ubuntu 18.04 (supported)
- 32GB of System RAM (minimum requirement)
- 8 core CPU (minimum requirement)
- Domain name (with SSL)
- 1 TB Storage
### Reverse proxy rules (public routing)
The following ports have to be configured in the nginix server with reverse proxy:

- Port 4200 should be proxied to the '/'
- Port 4201 should be proxied to the '/admin'
- Port 3000 should be proxied to the '/api'
- Port 3001 should be proxied to the '/admin_dashboard'
- Port 3001 should be proxied to the '/session'
- Port 3004 should be proxied to the '/core-api'
- Port 4001 should be proxied to the '/login-api'
- Port 8000 should be proxied to the '/data
- Port 8080 should be proxied to the '/auth'
- Port 9000 should be proxied to the '/grafana'

### Nginx - cQube server firewall configuration

- Port 4200 should be open from nginx to the cQube server
- Port 4201 should be open from nginx to the cQube server
- Port 3000 should be open from nginx to the cQube server
- Port 3001 should be open from nginx to the cQube server
- Port 3004 should be open from nginx to the cQube server
- Port 8080 should be open from nginx to the cQube server
- Port 8000 should be open from nginx to the cQube server
- Port 9000 should be open from nginx to the cQube server

# Installation Steps:
- Open Terminal
- Navigate to the directory where cQube_Edu has been downloaded or cloned 
  ```
  cd cQube_Edu/devops/
  git checkout cqube-v4.1-beta
  git pull
  ```
- Copy the config.yml.template to config.yml 
  ```
  cp config.yml.template config.yml
  ```
- Edit using ```nano config.yml```

- If you are opting for mode_of_installation as public then storage_type should be s3. Copy the aws_s3_config.yml.template to aws_s3_config.yml 
  ```
  cp aws_s3_config.yml.template aws_s3_config.yml
  ```
- Edit using ```nano aws_s3_config.yml```

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
- 
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

## Steps Post Installation:

### Steps to import Grafana dashboard


Open https://<domain_name> from the browser and login with admin credentials
- Click on Admin Console
- Click on Monitoring details icon
- New tab will be loaded with grafana login page on https://<domain_name>/grafana
- Default username is admin and password is admin
- Once your logged in change the password as per the need
- After logged in. Click on Settings icon from the left side menu.
- Click Data Sources
- Click on Add data source and select Prometheus
- In URL field, fill http://<private_ip_of_cqube_server>:9090 Optionally configure the other settings.
- Click on Save
- On home page, click on '+' symbol and select Import
- Click on Upload JSON file and select the json file which is located in git repository cQube_Edu/config/grafana/cQube_Monitoring_Dashboard.json and click Import
- Dashboard is succesfully imported to grafana with the name of cQube_Monitoring_Dashboard
