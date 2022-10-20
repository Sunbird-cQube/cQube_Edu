#!/bin/bash

base_dir=$(awk ''/^base_dir:' /{ if ($2 !~ /#.*/) {print $2}}' config.yml)
access_type=$(awk ''/^access_type:' /{ if ($2 !~ /#.*/) {print $2}}' config.yml)

if [[ $storage_type == "s3" ]]; then
ansible-playbook ansible/install.yml --tags "install" --extra-vars "@aws_s3_config.yml"
fi
if [[ $storage_type == "azure" ]]; then
ansible-playbook ansible/install.yml --tags "install" --extra-vars "@azure_container_config.yml"
fi
if [[ $storage_type == "local" ]]; then
ansible-playbook ansible/install.yml --tags "install" --extra-vars "@local_storage_config.yml"
fi
