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

check_base_dir(){
if [[ ! "$2" = /* ]] || [[ ! -d $2 ]]; then
  echo "Error - $1 Please enter the absolute path or make sure the directory is present."; fail=1
fi
}


check_sys_user(){
    result=`who | head -1 | awk '{print $1}'`
    if [[ `egrep -i ^$2: /etc/passwd ; echo $?` != 0 && $result != $2 ]]; then
        echo "Error - Please check the system_user_name."; fail=1
    fi
}

check_access_type(){
if ! [[ $2 == "NVSK" || $2 == "VSK" ]]; then
    echo "Error - Please enter either NVSK or VSK for $1"; fail=1
fi
}

check_state()
{
if [[ $access_type == "NVSK" ]]; then
    if [[ ! $2 == "NA" ]]; then
        echo "Error - Please provide state code as NA if you selected access_type as NVSK"; fail=1
    fi
fi
if [[ $access_type == "VSK" ]]; then	
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

check_storage_type(){
if ! [[ $2 == "s3" || $2 == "azure" ]]; then
     echo "Error - Please enter either s3 or azure for $1"; fail=1
fi
}

check_ip()
{
local ip=$2
ip_stat=1
ip_pass=0
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
}

check_api_endpoint(){
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

check_postgres(){
echo "Checking for Postgres ..."
temp=$(psql -V > /dev/null 2>&1; echo $?)

if [ $temp == 0 ]; then
    version=`psql -V | head -n1 | cut -d" " -f3`
    if [[ $(echo "$version >= 10.12" | bc) == 1 ]]
    then
        echo "WARNING: Postgres found."
        echo "Removing Postgres..."
        sudo systemctl stop postgresql
        sudo apt-get --purge remove postgresql* -y
        echo "Done"
     fi
fi
}

get_config_values(){
key=$1
vals[$key]=$(awk ''/^$key:' /{ if ($2 !~ /#.*/) {print $2}}' config.yml)
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
declare -a arr=("system_user_name" "base_dir" "access_type" "state_code" "storage_type" "api_endpoint" "local_ipv4_address" "db_user" "db_name" "db_password")

declare -A vals

# Getting base_dir
base_dir=$(awk ''/^base_dir:' /{ if ($2 !~ /#.*/) {print $2}}' config.yml)
storage_type=$(awk ''/^storage_type:' /{ if ($2 !~ /#.*/) {print $2}}' config.yml)
access_type=$(awk ''/^access_type:' /{ if ($2 !~ /#.*/) {print $2}}' config.yml)

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
   local_ipv4_address)
       if [[ $value == "" ]]; then
          echo "Error - in $key. Unable to get the value. Please check."; fail=1
       else
          check_ip $key $value
       fi
       ;;
   state_code)
       if [[ $value == "" ]]; then
          echo "Error - in $key. Unable to get the value. Please check."; fail=1
       else
          check_state $key $value
       fi
       ;;
   storage_type)
       if [[ $value == "" ]]; then
          echo "Error - in $key. Unable to get the value. Please check."; fail=1
       else
          check_storage_type $key $value
       fi
       ;;
   api_endpoint)
       if [[ $value == "" ]]; then
          echo "Error - in $key. Unable to get the value. Please check."; fail=1
       #else
        #  check_api_endpoint $key $value
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
