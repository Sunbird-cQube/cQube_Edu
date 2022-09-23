#!/bin/bash

check_length(){
    len_status=1
    str_length=${#1}
    if [[ $str_length -ge 3 && $str_length -le 63 ]]; then
        len_status=0
        return $len_status;
    else
        return $len_status;
    fi
}

check_postgres(){
echo "Checking for Postgres ..."
temp=$(psql -V > /dev/null 2>&1; echo $?)

if [ $temp == 0 ]; then
    version=`psql -V | head -n1 | cut -d" " -f3`
    if [[ $(echo "$version >= 10.12" | bc) == 1 ]]
    then
        echo "WARNING: Postgres found."
        echo "Removing Postgres..."
        sudo systemctl stop kong.service > /dev/null 2>&1
        sleep 5
        sudo systemctl stop keycloak.service > /dev/null 2>&1
        sleep 5
        sudo systemctl stop postgresql
        sudo apt-get --purge remove postgresql* -y
        echo "Done"
     fi
fi
}

check_version(){
if [[ ! "$base_dir" = /* ]] || [[ ! -d $base_dir ]]; then
    echo "Error - Please enter the absolute path or make sure the directory is present.";
    exit 1
else
   if [[ -e "$base_dir/cqube/.cqube_config" ]]; then
        installed_ver=$(cat $base_dir/cqube/.cqube_config | grep CQUBE_VERSION )
        installed_version=$(cut -d "=" -f2 <<< "$installed_ver")
         echo "Currently cQube $installed_version version is installed in this machine. Follow Upgradtion process if you want to upgrade."
         echo "If you re-run the installation, all data will be lost"
	 while true; do
             read -p "Do you still want to re-run the installation (yes/no)? " yn
             case $yn in
                 yes) break;;
                 no) exit;;
                 * ) echo "Please answer yes or no.";;
             esac
         done
   fi
fi
}

check_sys_user(){
if [[ ! `compgen -u $2` ]]; then
   echo "Error - Please check the system_user_name."; fail=1
fi
}

check_base_dir(){
if [[ ! "$2" = /* ]] || [[ ! -d $2 ]]; then
  echo "Error - $1 Please enter the absolute path or make sure the directory is present."; fail=1
fi
}

check_access_type(){
if ! [[ $2 == "national" || $2 == "state" ]]; then
    echo "Error - Please enter either national or state for $1"; fail=1
fi
}

check_state()
{
if [[ $access_type == "national" ]]; then
    if [[ ! $2 == "NA" ]]; then
        echo "Error - Please provide state code as NA if you selected access_type as national"; fail=1
    fi
fi
if [[ $access_type == "state" ]]; then
state_found=0
while read line; do
  if [[ $line == $2 ]] ; then
   state_found=1
  fi
done < validation_scripts/state_codes
  if [[ $state_found == 0 ]] ; then
    echo "Error - Invalid State code. Please refer the state_list file and enter the correct value."; fail=1
  fi
fi
}

check_mode_of_installation(){
if ! [[ $2 == "localhost" || $2 == "public" ]]; then
    echo "Error - Please enter either localhost or public for $1"; fail=1
fi
}

check_storage_type(){
if [[ $mode_of_installation == "localhost" ]]; then
    if [[ ! $2 == "local" ]]; then
        echo "Error - Please provide storage type as local for localhost installation"; fail=1
    fi
fi
if [[ $mode_of_installation == "public" ]]; then
    if ! [[ $2 == "s3" || $2 == "local" || $2 == "azure" ]]; then
        echo "Error - Please enter either s3 or local or azure for $1"; fail=1
    fi
fi
}

check_mem(){
mem_total_kb=`grep MemTotal /proc/meminfo | awk '{print $2}'`
mem_total=$(($mem_total_kb/1024))

if [[ $mode_of_installation == "localhost" ]]; then
  if [ $(($mem_total / 1024)) -ge 7 ]; then
    local_shared_mem=$(echo $mem_total*13/100 | bc)
    local_work_mem=$(echo $mem_total*2/100 | bc)
    local_java_arg_2=$(echo $mem_total*13/100 | bc)
    local_java_arg_3=$(echo $mem_total*65/100 | bc)
    echo """---
shared_buffers: ${local_shared_mem}MB
work_mem: ${local_work_mem}MB
java_arg_2: -Xms${local_java_arg_2}m
java_arg_3: -Xmx${local_java_arg_3}m""" > memory_config.yml
  else
    "Error - Minimum Memory requirement to install cQube in localhost/single machine is 8GB. Please increase the RAM size.";
  fi
fi

if [[ $mode_of_installation == "public" ]]; then
    if [ $(( $mem_total / 1024 )) -ge 15 ] && [ $(($mem_total / 1024)) -le 60 ] ; then
        min_shared_mem=$(echo $mem_total*13/100 | bc)
        min_work_mem=$(echo $mem_total*2/100 | bc)
        min_java_arg_2=$(echo $mem_total*13/100 | bc)
        min_java_arg_3=$(echo $mem_total*65/100 | bc)
        echo """---
shared_buffers: ${min_shared_mem}MB
work_mem: ${min_work_mem}MB
java_arg_2: -Xms${min_java_arg_2}m
java_arg_3: -Xmx${min_java_arg_3}m""" > memory_config.yml
    elif [ $(( $mem_total / 1024 )) -gt 60 ]; then
        max_shared_mem=$(echo $mem_total*13/100 | bc)
        max_work_mem=$(echo $mem_total*2/100 | bc)
        max_java_arg_2=$(echo $mem_total*7/100 | bc)
        max_java_arg_3=$(echo $mem_total*65/100 | bc)
        echo """---
shared_buffers: ${max_shared_mem}MB
work_mem: ${max_work_mem}MB
java_arg_2: -Xms${max_java_arg_2}m
java_arg_3: -Xmx${max_java_arg_3}m""" > memory_config.yml
    else
        echo "Error - Minimum Memory requirement to install cQube is 32GB. Please increase the RAM size."; 
        exit 1
    fi
fi
}

check_db_naming(){
check_length $2
if [[ $? == 0 ]]; then
    if [[ ! $2 =~ ^[A-Za-z_]*[^_0-9\$\@\#\%\*\-\^\?]$ ]]; then
        echo "Error - Naming convention is not correct. Please change the value of $1."; fail=1
    fi
else
    echo "Error - Length of the value $1 is not correct. Provide the length between 3 and 63."; fail=1
fi
}

check_db_password(){
    len="${#2}"
    if test $len -ge 8 ; then
        echo "$2" | grep "[A-Z]" | grep "[a-z]" | grep "[0-9]" | grep "[@%^*!?]" > /dev/null 2>&1
        if [[ ! $? -eq 0 ]]; then
            echo "Error - $1 should contain atleast one uppercase, one lowercase, one special character and one number. And should be minimum of 8 characters."; fail=1
        fi
    else
        echo "Error - $1 should contain atleast one uppercase, one lowercase, one special character and one number. And should be minimum of 8 characters."; fail=1
    fi
}

check_api_endpoint(){
if [[ $mode_of_installation == "localhost" ]]; then
    if [[ ! $2 == "localhost" ]]; then
        echo "Error - Please provide api_endpoint as localhost forlocalhost installation"; fail=1
    fi
fi
if [[ $mode_of_installation == "public" ]]; then
    if [[ (( $2 =~ \-{2,} ))  ||  (( $2 =~ \.{2,} )) ]]; then
        echo "Error - Please provide the proper api endpoint for $1"; fail=1
    else
        if [[ $2 =~ ^[^-.@_][a-z0-9i.-]{2,}\.[a-z/]{2,}$ ]]; then
            if ! [[ ${#2} -le 255 ]]; then
            echo "Error - FQDN exceeding 255 characters. Please provide the proper api endpoint for $1"; fail=1
            fi
        else
            echo "Error - Please provide the proper api endpoint for $1"; fail=1
        fi
    fi
fi
}

check_ip()
{
    local ip=$2
    ip_stat=1
    ip_pass=0
if [[ $mode_of_installation == "localhost" ]]; then
    if [[ ! $2 == "localhost" ]]; then
        echo "Error - Please provide local ipv4 as localhost for localhost installation"; fail=1
    fi
fi
if [[ $mode_of_installation == "public" ]]; then    
    if [[ $ip =~ ^[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}$ ]]; then
        OIFS=$IFS
        IFS='.'
        ip=($ip)
        IFS=$OIFS
        [[ ${ip[0]} -le 255 && ${ip[1]} -le 255 \
            && ${ip[2]} -le 255 && ${ip[3]} -le 255 ]]
        ip_stat=$?
        if [[ ! $ip_stat == 0 ]]; then
            echo "Error - Invalid value for $key"; fail=1
            ip_pass=0
        fi
        is_local_ip=`ifconfig | grep -Eo 'inet (addr:)?([0-9]*\.){3}[0-9]*' | grep -v '127.0.0.1'` > /dev/null 2>&1
        if [[ $ip_pass == 0 && $is_local_ip != *$2* ]]; then
            echo "Error - Invalid value for $key. Please enter the local ip of this system."; fail=1 
        fi
    else
        echo "Error - Invalid value for $key"; fail=1
   fi
fi    
}

check_vpn_ip()
{
    local ip=$2
    ip_stat=1
    ip_pass=0
if [[ $mode_of_installation == "localhost" ]]; then
    if [[ ! $2 == "127.0.0.1" ]]; then
        echo "Error - Please provide local vpn ip as 127.0.0.1 for localhost installation"; fail=1
    fi
fi
 if [[ $mode_of_installation == "public" ]]; then
    if [[ $ip =~ ^[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}$ ]]; then
        OIFS=$IFS
        IFS='.'
        ip=($ip)
        IFS=$OIFS
        [[ ${ip[0]} -le 255 && ${ip[1]} -le 255 \
            && ${ip[2]} -le 255 && ${ip[3]} -le 255 ]]
        ip_stat=$?
        if [[ ! $ip_stat == 0 ]]; then
            echo "Error - Invalid value for $key"; fail=1
            ip_pass=0
        fi
    else
        echo "Error - Invalid value for $key"; fail=1
    fi
 fi
}

check_kc_config_otp(){
if ! [[ $2 == "true" || $2 == "false" ]]; then
    echo "Error - Please enter either true or false for $1"; fail=1
fi
}

get_config_values(){
key=$1
vals[$key]=$(awk ''/^$key:' /{ if ($2 !~ /#.*/) {print $2}}' config.yml)
}

check_static_datasource(){
if ! [[ $2 == "udise" || $2 == "state" ]]; then
    echo "Error - Please enter either udise or state for $1"; fail=1
else
    if [[ -e "$base_dir/cqube/.cqube_config" ]]; then
        static_datasource=$( grep CQUBE_STATIC_DATASOURCE $base_dir/cqube/.cqube_config )
        current_datasource=$(cut -d "=" -f2 <<< "$static_datasource")
        if [[ ! $current_datasource == "" ]]; then
            if [[ ! $current_datasource == $2 ]]; then
                sed -i '/datasource_status/c\datasource_status: unmatched' ../ansible/roles/createdb/vars/main.yml
                echo "static_datasource value from config.yml is not matching with previous installation value. If continued with this option, it will truncate the tables from db and clear the objects from output bucket."
                while true; do
                    read -p "yes to continue, no to cancel the installation (yes/no)? : " yn
                    case $yn in
                        yes) break;;
                        no) echo "Cancelling the installation."
                            exit ;;
                        * ) echo "Please answer yes or no.";;
                    esac
                done
            else
                sed -i '/datasource_status/c\datasource_status: matched' ../ansible/roles/createdb/vars/main.yml
             fi
        else
            sed -i '/datasource_status/c\datasource_status: matched' ../ansible/roles/createdb/vars/main.yml
        fi
    fi
fi
}

check_timeout()
{
  if [[ $2 =~ ^[0-9]+[M|D]$  ]] ; then
        raw_value="$( echo "$2" | sed -e 's/[M|D]$//' )"
        if [[ ! $raw_value == 0 ]]; then
		    if [[ $2 =~ M$ ]] ; then
		    	if [[ $raw_value -ge 30 && $raw_value -le 5256000 ]]; then
		    		timeout_value=$(($raw_value*60))
		    	else
		    		echo "Error - Minutes should be between 30 and 5256000"; fail=1
		    	fi
		    fi
		    if [[ $2 =~ D$ ]] ; then
		    	if [[ $raw_value -ge 1 && $raw_value -le 3650 ]]; then
		    		timeout_value=$(($raw_value*24*60*60))
		    	else
		    		echo "Error - Days should be between 1 and 3650"; fail=1
		    	fi
		    fi
		else
			echo "Error - Timeout should not be 0"; fail=1
	    fi
    else
        echo "Error - please enter proper value as mentioned in comments"; fail=1
    fi
sed -i '/session_timeout_in_seconds:/d' ansible/roles/workflow_keycloak/vars/main.yml
echo "session_timeout_in_seconds: $timeout_value" >> ansible/roles/workflow_keycloak/vars/main.yml
}

check_map_name(){
if ! [[ $2 == "leafletmap" ]]; then
    echo "Error - Please enter leafletmap for $1"; fail=1
fi
}

check_auth_api(){
if ! [[ $2 == "cqube" ]]; then
    echo "Error - Please enter leafletmap for $1"; fail=1
fi
}

check_theme(){
if ! [[ $2 == "theme1" || $2 == "theme2" || $2 == "theme3" ]]; then
    echo "Error - Please enter either theme1 or theme2 or theme3 for $1"; fail=1
fi
}

check_slab(){
if [[ $slab1 =~ ^[0-9]{,2}$ && $slab2 =~ ^[0-9]{,2}\-[0-9]{,2}$ && $slab3 =~ ^[0-9]{,2}\-[0-9]{,2}$ && $slab4 =~ ^[0-9]{,2}$ ]]; then

if ! [[ $slab1 -ge 1 && $slab1 -le 100 ]]; then
 echo "Error - Incorrect slab1 value please refer the slab1 comment in config.yml" ; fail=1
fi

slab21=`echo $slab2 | cut -d- -f1`
slab22=`echo $slab2 | cut -d- -f2`

if ! [[ $slab21 -eq $slab1 && $slab21 -le 100 ]]; then
 echo "Error - Incorrect slab2 value please refer the slab2 comment in config.yml" ; fail=1
fi

if ! [[ $slab22 -gt $slab21 && $slab22 -le 100 ]]; then
 echo "Error - Incorrect slab2 value please refer the slab2 comment in config.yml" ; fail=1	
fi

slab31=`echo $slab3 | cut -d- -f1`
slab32=`echo $slab3 | cut -d- -f2`

if ! [[ $slab31 -eq $slab22 && $slab31 -le 100 ]]; then
echo "Error - Incorrect slab3 value please refer the slab3 comment in config.yml" ; fail=1	
fi

if ! [[ $slab32 -gt $slab31 && $slab32 -le 100 ]]; then
echo "Error - Incorrect slab3 value please refer the slab3 comment in config.yml" ; fail=1 
fi

if ! [[ $slab4 -eq $slab32 && $slab4 -le 100 ]]; then
echo "Error - Incorrect slab4 value please refer the slab4 comment in config.yml" ; fail=1
fi

else
	echo "Error - Incorrect slab value please refer the slab comments in config.yml " ; fail=1
fi
}


bold=$(tput bold)
normal=$(tput sgr0)
fail=0
if [[ ! $# -eq 0 ]]; then
   core_install=$1
else
   core_install="NA"
fi

echo -e "\e[0;33m${bold}Validating the config file...${normal}"

# An array of mandatory values
declare -a arr=("system_user_name" "base_dir" "access_type" "state_code" "mode_of_installation" "storage_type" "db_user" "db_name" "db_password" \
	              "read_only_db_user" "read_only_db_password" "api_endpoint" "local_ipv4_address" "vpn_local_ipv4_address" "proxy_host" \
		           "keycloak_adm_user" "keycloak_adm_passwd" "report_viewer_config_otp" "diksha_columns" "static_datasource" \ 
			         "management" "session_timeout" "map_name" "google_api_key" "theme" "slab1" "slab2" "slab3" "slab4" "auth_api")

# Create and empty array which will store the key and value pair from config file
declare -A vals

# Getting base_dir
base_dir=$(awk ''/^base_dir:' /{ if ($2 !~ /#.*/) {print $2}}' config.yml)
access_type=$(awk ''/^access_type:' /{ if ($2 !~ /#.*/) {print $2}}' config.yml)
storage_type=$(awk ''/^storage_type:' /{ if ($2 !~ /#.*/) {print $2}}' config.yml)
mode_of_installation=$(awk ''/^mode_of_installation:' /{ if ($2 !~ /#.*/) {print $2}}' config.yml)
map_name=$(awk ''/^map_name:' /{ if ($2 !~ /#.*/) {print $2}}' config.yml)
slab1=$(awk ''/^slab1:' /{ if ($2 !~ /#.*/) {print $2}}' config.yml)
slab2=$(awk ''/^slab2:' /{ if ($2 !~ /#.*/) {print $2}}' config.yml)
slab3=$(awk ''/^slab3:' /{ if ($2 !~ /#.*/) {print $2}}' config.yml)
slab4=$(awk ''/^slab4:' /{ if ($2 !~ /#.*/) {print $2}}' config.yml)

check_mem
check_version

# Iterate the array and retrieve values for mandatory fields from config file
for i in ${arr[@]}
do
get_config_values $i
done

for i in ${arr[@]}
do
key=$i
value=${vals[$key]}
case $key in

   system_user_name)
       if [[ $value == "" ]]; then
          echo "Error - in $key. Unable to get the value. Please check."; fail=1
       else
          check_sys_user $key $value
       fi
       ;;
   base_dir)
       if [[ $value == "" ]]; then
          echo "Error - in $key. Unable to get the value. Please check."; fail=1
       else
          check_base_dir $key $value
       fi
       ;;
   access_type)
       if [[ $value == "" ]]; then
          echo "Error - in $key. Unable to get the value. Please check."; fail=1
       else
          check_access_type $key $value
       fi
       ;;
   state_code)
       if [[ $value == "" ]]; then
          echo "Error - in $key. Unable to get the value. Please check."; fail=1
       else
          check_state $key $value
       fi
       ;;
   mode_of_installation)
       if [[ $value == "" ]]; then
          echo "Error - in $key. Unable to get the value. Please check."; fail=1
       else
          check_mode_of_installation $key $value
       fi
       ;;
   storage_type)
       if [[ $value == "" ]]; then
          echo "Error - in $key. Unable to get the value. Please check."; fail=1
       else
          check_storage_type $key $value
       fi
       ;;
   db_user)
       if [[ $value == "" ]]; then
          echo "Error - in $key. Unable to get the value. Please check."; fail=1
       else
	     check_postgres
          check_db_naming $key $value
       fi
       ;;
   db_name)
       if [[ $value == "" ]]; then
          echo "Error - in $key. Unable to get the value. Please check."; fail=1
       else
          check_db_naming $key $value
       fi
       ;;
   db_password)
       if [[ $value == "" ]]; then
          echo "Error - in $key. Unable to get the value. Please check."; fail=1
       else
          check_db_password $key $value
       fi
       ;;
   read_only_db_user)
       if [[ $value == "" ]]; then
          echo "Error - in $key. Unable to get the value. Please check."; fail=1
       else
          check_db_naming $key $value
       fi
       ;;
   read_only_db_password)
       if [[ $value == "" ]]; then
          echo "Error - in $key. Unable to get the value. Please check."; fail=1
       else
          check_db_password $key $value
       fi
       ;;
   api_endpoint)
       if [[ $value == "" ]]; then
          echo "Error - in $key. Unable to get the value. Please check."; fail=1
       else
          check_api_endpoint $key $value
       fi
       ;;
   local_ipv4_address)
       if [[ $value == "" ]]; then
          echo "Error - in $key. Unable to get the value. Please check."; fail=1
       else
          check_ip $key $value
       fi
       ;;
   vpn_local_ipv4_address)
       if [[ $value == "" ]]; then
          echo "Error - in $key. Unable to get the value. Please check."; fail=1
       else
          check_vpn_ip $key $value
       fi
       ;;
   proxy_host)
       if [[ $value == "" ]]; then
          echo "Error - in $key. Unable to get the value. Please check."; fail=1
       else
          check_vpn_ip $key $value
       fi
       ;;
   keycloak_adm_user)
       if [[ $value == "" ]]; then
          echo "Error - in $key. Unable to get the value. Please check."; fail=1
       else
          check_db_naming $key $value
       fi
       ;;
   keycloak_adm_passwd)
       if [[ $value == "" ]]; then
          echo "Error - in $key. Unable to get the value. Please check."; fail=1
       else
          check_db_password $key $value
       fi
       ;;
   report_viewer_config_otp)
       if [[ $value == "" ]]; then
          echo "Error - in $key. Unable to get the value. Please check."; fail=1
       else
          check_kc_config_otp $key $value
       fi
       ;;
   diksha_columns)
       if [[ $value == "" ]]; then
          echo "Error - in $key. Unable to get the value. Please check."; fail=1
       else
          check_kc_config_otp $key $value
       fi
       ;;
   static_datasource)
       if [[ $value == "" ]]; then
          echo "Error - in $key. Unable to get the value. Please check."; fail=1
       else
          check_static_datasource $key $value
       fi
       ;;
   management)
       if [[ $value == "" ]]; then
          echo "Error - in $key. Unable to get the value. Please check."; fail=1
       fi
       ;;
   session_timeout)
       if [[ $value == "" ]]; then
          echo "Error - in $key. Unable to get the value. Please check."; fail=1
       else
          check_timeout $key $value
       fi
       ;;
   map_name)
       if [[ $value == "" ]]; then
          echo "Error - in $key. Unable to get the value. Please check."; fail=1
       else
          check_map_name $key $value
       fi
       ;;
   theme)
       if [[ $value == "" ]]; then
          echo "Error - in $key. Unable to get the value. Please check."; fail=1
       else
          check_theme $key $value
       fi
       ;;
   slab1)
       if [[ $value == "" ]]; then
          echo "Error - in $key. Unable to get the value. Please check."; fail=1
       else
          check_slab $key $value
       fi
       ;;
   slab2)
       if [[ $value == "" ]]; then
          echo "Error - in $key. Unable to get the value. Please check."; fail=1
       else
          check_slab $key $value
       fi
       ;;
   slab3)
       if [[ $value == "" ]]; then
          echo "Error - in $key. Unable to get the value. Please check."; fail=1
       else
          check_slab $key $value
       fi
       ;;
   slab4)
       if [[ $value == "" ]]; then
          echo "Error - in $key. Unable to get the value. Please check."; fail=1
       else
          check_slab $key $value
       fi
       ;;
   auth_api)
       if [[ $value == "" ]]; then
          echo "Error - in $key. Unable to get the value. Please check."; fail=1
       else
	   check_auth_api $key $value
       fi
       ;;
   *)
       if [[ $value == "" ]]; then
          echo -e "\e[0;31m${bold}Error - Value for $key cannot be empty. Please fill this value${normal}"; fail=1
       fi
       ;;
esac
done

if [[ $fail -eq 1 ]]; then
   echo -e "\e[0;34m${bold}Config file has errors. Please rectify the issues and restart the installation${normal}"
   exit 1
else
   echo -e "\e[0;32m${bold}Config file successfully validated${normal}"
fi

