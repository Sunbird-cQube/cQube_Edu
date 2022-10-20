#!/bin/bash

base_dir=$(awk ''/^base_dir:' /{ if ($2 !~ /#.*/) {print $2}}' config.yml)
storage_type=$(awk ''/^storage_type:' /{ if ($2 !~ /#.*/) {print $2}}' config.yml)

if [[ $storage_type == "s3" ]]; then
ansible-playbook ansible/configure_database_backup.yml --tags "install" --extra-vars "@aws_s3_config.yml" \
                                                                          --extra-vars "@$base_dir/cqube/conf/azure_container_config.yml" \
                                                   --extra-vars "@$base_dir/cqube/conf/local_storage_config.yml"
fi
if [[ $storage_type == "azure" ]]; then
ansible-playbook ansible/configure_database_backup.yml --tags "install" --extra-vars "@azure_container_config.yml" \
                                                                        --extra-vars "@$base_dir/cqube/conf/aws_s3_config.yml" \
                                                   --extra-vars "@$base_dir/cqube/conf/local_storage_config.yml"
fi
if [[ $storage_type == "local" ]]; then
ansible-playbook ansible/configure_database_backup.yml --tags "install" --extra-vars "@local_storage_config.yml" \
                                                                        --extra-vars "@$base_dir/cqube/conf/aws_s3_config.yml" \
                                                         --extra-vars "@$base_dir/cqube/conf/azure_container_config.yml"
fi
