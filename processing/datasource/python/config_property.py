def get_combinations(filename, partition_date_key, partition_date_value, processor_properties_date):
    # Processor group name
    processor_group_name = ['validate_datasource', 'cQube_data_storage', 'transaction_and_aggregation']
    # Processor name
    processor_name = ['config_listing_files_from_emission', "route_based_on_s3_input_dir",
                      'route_based_on_content', 'get_year_month_from_temp', 'config_datasource_delete_temp',
                      'config_datasourcedelete_staging_1_table', 'config_datasource_delete_staging_2_table',
                      'config_delete_staging_1_table', 'conf_delete_staging_1_table', 'conf_delete_staging_2_table',
                      'Route_on_zip', 'temp_trans_agg_add_qry_filename', 'add_ff_uuid_and_convert_date',
                      'convert_date_to_ist', 'convert_management_date_to_ist',
                      'partition_according_columns_daily_queries',
                      'partition_management', 'configure_datasource_save_s3_log_summary',
                      'config_datasource_update_filename_local', 'convert_date_to_ist1', 'convert_date_to_ist2',
                      'partition_according_year_month_week', 'convert_date_to_ist3',
                      'partition_according_year_month_week_subject_queries',
                      'partition_according_year_month_week_grade_queries',
                      'config_listing_aggregated_files_from_emission',
                      'route_files_data_replay_retention_infra_trans', 'aggregated_output',
                      'configurable_datasource_save_azure_log_summary']
    data_storage_processor = 'cQube_data_storage'
    datasource_filename_property_key = "configure_file"
    selectSQL_property_key = "SQL select query"
    insertSQL_property_key = "putsql-sql-statement"
    update_filename_property_key = "filename"
    s3_output_property_key = "Object Key"
    azure_output_property_key = "blob"
    datasource_filename_property_value = '${' + 'filename:startsWith("{0}"):or('.format(
        filename) + '${' + 'azure.blobname:startsWith("{0}")'.format(filename) + '})}'
    datasource_filename_config_property_value = '${' + "filename:startsWith('{0}')".format(
        filename) + ':and(${path:startsWith("config"):or(${filename:startsWith("config"):or(${azure.blobname:startsWith("config")})}):not()})}'
    selectSQL_property_value = "select distinct academic_year,month  from " + filename + "_temp where ff_uuid='${zip_identifier}'"
    delete_temp_property_value = "delete from " + filename + "_temp where ff_uuid='${zip_identifier}';"
    truncate_staging1_property_value = "truncate table " + filename + "_staging_1"
    truncate_staging2_property_value = "truncate table " + filename + "_staging_2"
    temp_trans_aggre_query_property_value = "#{base_dir}/cqube/emission_app/python/postgres/" + filename + "/#{temp_trans_aggregation_queries}"
    emission_filename_property_value = '${' + "emission_filename:startsWith('{0}')".format(filename) + '}'
    local_output_log_summary_property_value = "log_summary_" + filename + ".json"
    s3_output_log_summary_property_value = "log_summary/log_summary_" + filename + ".json"

    # properties
    properties = [{datasource_filename_property_key: datasource_filename_property_value},
                  {datasource_filename_property_key: datasource_filename_config_property_value},
                  {selectSQL_property_key: selectSQL_property_value},
                  {insertSQL_property_key: delete_temp_property_value},
                  {insertSQL_property_key: truncate_staging1_property_value},
                  {insertSQL_property_key: truncate_staging2_property_value},
                  {update_filename_property_key: temp_trans_aggre_query_property_value},
                  {partition_date_key: partition_date_value},
                  {datasource_filename_property_key: emission_filename_property_value},
                  {s3_output_property_key: s3_output_log_summary_property_value},
                  {update_filename_property_key: local_output_log_summary_property_value},
                  processor_properties_date,
                  {azure_output_property_key: s3_output_log_summary_property_value}
                  ]
    # updating the properties
    combinations = [[0, 0, 0], [1, 1, 1], [1, 2, 8], [2, 3, 2], [2, 4, 3], [0, 5, 4], [0, 6, 5], [0, 7, 4], [0, 8, 4],
                    [0, 9, 5], [1, 10, 1], [2, 11, 6], [0, 12, 11], [2, 13, 11], [2, 14, 11], [2, 15, 7], [2, 16, 7],
                    [1, 17, 9],
                    [1, 18, 10], [2, 19, 11], [2, 20, 11], [2, 21, 7], [2, 22, 11], [2, 23, 7], [2, 24, 7], [1, 28, 12]]

    return processor_group_name, processor_name, properties, combinations


def get_combinations_aggregated(filename):
    processor_group_name = ['validate_datasource', 'cQube_data_storage', 'transaction_and_aggregation']
    processor_name = ["route_based_on_s3_input_dir", "route_based_on_content",
                      "config_listing_aggregated_files_from_emission", "route_files_data_replay_retention_infra_trans",
                      "aggregated_output", 'aggregated_config_datasource_update_filename']
    datasource_filename_aggre_property_key = "configure_file_aggre"
    s3_output_property_key = "Object Key"
    local_output_property_key = "filename"
    datasource_filename_aggre_property_value = '${' + 'filename:startsWith("{0}"):or('.format(
        filename) + '${' + 'azure.blobname:startsWith("{0}")'.format(filename) + '})}'
    datasource_filename_config_aggre_property_value = '${' + "filename:startsWith('{0}')".format(
        filename) + ':and(${path:startsWith("config"):or(${filename:startsWith("config"):or(${azure.blobname:startsWith(' \
                    '"config")})}):not()})}'
    datasource_filename_update_aggre_property_value = '${' + "filename:startsWith('{0}')".format(filename) + '}'
    s3_and_local_output_property_value = filename + '/' + filename + '.json'
    properties = [{datasource_filename_aggre_property_key: datasource_filename_aggre_property_value},
                  {datasource_filename_aggre_property_key: datasource_filename_config_aggre_property_value},
                  {datasource_filename_aggre_property_key: datasource_filename_update_aggre_property_value},
                  {s3_output_property_key: s3_and_local_output_property_value},
                  {local_output_property_key: s3_and_local_output_property_value}]
    combinations_aggregated = [[0, 2, 0], [1, 0, 1], [1, 3, 2], [1, 1, 2], [1, 4, 3], [1, 5, 4]]

    return processor_group_name, processor_name, properties, combinations_aggregated


postgres_yaml_file = '../../conf/base_config.yml'
