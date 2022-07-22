#!/bin/bash

base_dir=$(awk ''/^base_dir:' /{ if ($2 !~ /#.*/) {print $2}}' config.yml)
storage_type=$(awk ''/^storage_type:' /{ if ($2 !~ /#.*/) {print $2}}' config.yml)

if [[ $storage_type == "s3" ]]; then
ansible-playbook ansible/deploy_ui.yml --tags "install" --extra-vars "@aws_s3_config.yml" \
                                                --extra-vars "@$base_dir/cqube/conf/azure_container_config.yml"
else
ansible-playbook ansible/deploy_ui.yml --tags "install" --extra-vars "@azure_container_config.yml" \
                                                   --extra-vars "@$base_dir/cqube/conf/aws_s3_config.yml"
fi

