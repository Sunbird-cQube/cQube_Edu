import config_property as config
import logging
import requests as rq
import sys
import time
from update_nifi_parameters_main import *
import properties_nifi_deploy as prop
import update_nifi_params
from yaml.loader import SafeLoader
import yaml
import psycopg2
from update_nifi_parameters_main import get_parameter_context, update_parameter
import ast


def get_nifi_root_pg():
    """ Fetch nifi root processor group ID"""
    res = rq.get(
        f'{prop.NIFI_IP}:{prop.NIFI_PORT}/nifi-api/process-groups/root')
    if res.status_code == 200:
        global nifi_root_pg_id
        nifi_root_pg_id = res.json()['component']['id']
        return res.json()['component']['id']
    else:
        return res.text


def get_processor_group_info(processor_group_name):
    """
    Get procesor group details
    """
    nifi_root_pg_id = get_nifi_root_pg()
    pg_list = rq.get(
        f'{prop.NIFI_IP}:{prop.NIFI_PORT}/nifi-api/flow/process-groups/{nifi_root_pg_id}')
    if pg_list.status_code == 200:

        # Iterate over processGroups and find the required processor group details
        for i in pg_list.json()['processGroupFlow']['flow']['processGroups']:
            if i['component']['name'] == processor_group_name:
                global processor_group
                processor_group = i
                return i
    else:
        return False


def start_processor_group(processor_group_name, state):
    header = {"Content-Type": "application/json"}
    pg_source = get_processor_group_info(processor_group_name)
    start_body = {"id": pg_source['component']['id'],
                  "state": state, "disconnectedNodeAcknowledged": False}
    start_response = rq.put(
        f"{prop.NIFI_IP}:{prop.NIFI_PORT}/nifi-api/flow/process-groups/{pg_source['component']['id']}",
        json=start_body, headers=header)
    if start_response.status_code == 200:
        logging.info(f"Successfully {state} {pg_source['component']['name']} Processor Group.")
        return True
    else:
        logging.error(f"Failed {state} {pg_source['component']['name']} Processor Group.")
        return start_response.text


def get_processor_group_ports(processor_group_name):
    # Get processor group details
    pg_source = get_processor_group_info(processor_group_name)
    pg_details = rq.get(
        f"{prop.NIFI_IP}:{prop.NIFI_PORT}/nifi-api/flow/process-groups/{pg_source['component']['id']}")
    if pg_details.status_code != 200:
        return pg_details.text
    else:
        return pg_details


def nifi_update_processor_property(processor_group_name, processor_name, properties):
    """[Update the processor property in the processor group]
    Args:
        processor_group_name ([string]): [provide the processor group name]
        processor_name ([string]): [provide the processor name]
        properties([dict]): [property to update in processor]
    """

    # Get the processors in the processor group
    pg_source = get_processor_group_ports(processor_group_name)
    if pg_source.status_code == 200:
        for i in pg_source.json()['processGroupFlow']['flow']['processors']:
            logging.info(
                f"Started updating the properties: {properties} in {i['component']['name']} processor")
            # Get the required processor details
            if i['component']['name'] == processor_name:
                # Request body creation to update processor property.
                update_processor_property_body = {
                    "component": {
                        "id": i['component']['id'],
                        "name": i['component']['name'],
                        "config": {
                            "properties": properties

                        }
                    },
                    "revision": {
                        "clientId": "python code: configure_load_property_values.py",
                        "version": i['revision']['version']
                    },
                    "disconnectedNodeAcknowledged": "False"
                }

                update_processor_res = rq.put(
                    f"{prop.NIFI_IP}:{prop.NIFI_PORT}/nifi-api/processors/{i['component']['id']}",
                    json=update_processor_property_body)

                if update_processor_res.status_code == 200:
                    logging.info(
                        f"Successfully updated the properties: {properties} in {i['component']['name']} processor")
                    return True

                else:
                    logging.info(
                        f"Failed to update the properties: {properties} in {i['component']['name']} processor")
                    return update_processor_res.text


def parse_file(filename_path, key):
    with open(filename_path, 'r') as fd:
        parameter_data = fd.read()
    parameter_dict = ast.literal_eval(parameter_data)
    date_columns = parameter_dict.get(key)

    return date_columns


def execute_sql(state):
    with open('../../conf/base_config.yml') as f:
        data = yaml.load(f, Loader=SafeLoader)
        db_user = 'postgres'
        db_name = data['db_name']

    # establishing the connection
    conn = psycopg2.connect(
        database=db_name, user=db_user, host='localhost', port='5432')
    if conn:
        # Creating a cursor object using the cursor() method
        cursor = conn.cursor()
        cursor.execute(
            f"update configurable_datasource_properties set state ='{state}' where datasource_name ='{filename}'")
        conn.commit()
        conn.close()

# parsing the parameters.text file to get the date_columns
# filename_path: the path where the parameter.txt is located
# key: the key to search in the file
def parse_file(filename_path, key):
    # add functional comments|
    # rename function name
    with open(filename_path, 'r') as fd:
        parameter_data = fd.read()
    parameter_dict = ast.literal_eval(parameter_data)
    date_columns = parameter_dict.get(key)
    return date_columns


def execute_sql(state):
    # get the filepath from configuration file of this python code
    with open(config.postgres_yaml_file) as f:
        data = yaml.load(f, Loader=SafeLoader)
        db_user = 'postgres'
        db_name = data['db_name']
    # establishing the connection
    conn = psycopg2.connect(
        database=db_name, user=db_user, host='localhost', port='5432')
    if conn:
        # Creating a cursor object using the cursor() method
        cursor = conn.cursor()
        cursor.execute(
            f"update configurable_datasource_properties set state ='{state}' where datasource_name ='{filename}'")
        conn.commit()
        conn.close()


if __name__ == '__main__':
    """[summary]
    sys arguments = 1.filename/datasource name,
                    2. Stop hours time
    According to the Datasource name will update the property and value
    """
    filename = sys.argv[1]
    stop_hour = int(sys.argv[2])
    if filename.__contains__('aggregated'):
        processor_group_name, processor_name, properties, combinations = config.get_combinations_aggregated(filename)
        # Stops the processors
        for j in processor_group_name:
            start_processor_group(j, 'STOPPED')

        # update processor property.
        for i in combinations:
            nifi_update_processor_property(processor_group_name[i[0]], processor_name[i[1]], properties[i[2]])

        # Runs the processors
        for j in processor_group_name:
            start_processor_group(j, 'RUNNING')

        # Executing the query to set the status "Running"
        execute_sql(state='RUNNING')
    else:
        # Date_column_update
        res = parse_file(f'{prop.NIFI_STATIC_PARAMETER_DIRECTORY_PATH}postgres/{filename}/parameters.txt', 'date_column')
        res = ast.literal_eval(res)
        processor_properties_date = {}
        for date_column_name in res:
            # generalise the variable names
            date_value = "${field.value:format('yyyy-MM-dd','IST')}"
            date_key = "/{0}".format(date_column_name)
            processor_properties_date.update({date_key: date_value})

        # Partition_date_column_upload
        partition_res = parse_file(f'{prop.NIFI_STATIC_PARAMETER_DIRECTORY_PATH}postgres/{filename}/parameters.txt',
                                   'partition_select_column')
        partition_date_key = 'day'
        partition_date_value = "/{0}".format(partition_res)

        processor_group_name, processor_name, properties, combinations = config.get_combinations(filename,
                                                                                                 partition_date_key,
                                                                                                 partition_date_value,
                                                                                                 processor_properties_date)

        # Stops the processors
        for j in processor_group_name:
            start_processor_group( j, 'STOPPED')

        # update processor property.
        for i in combinations:
            nifi_update_processor_property(processor_group_name[i[0]],processor_name[i[1]], properties[i[2]])

        # Update the parameters to validate_datasource_parameters, transaction_and_aggregation_parameters
        parameter_context_names = ['validate_datasource_parameters', 'transaction_and_aggregation_parameters']
        for parameter_context_name in parameter_context_names:
            # Load parameters from file to Nifi parameters
            parameter_body = {
                "revision": {
                    "clientId": "value",
                    "version": 0,
                    "lastModifier": "Admin"
                },
                "component": {
                    "name": parameter_context_name,
                    "parameters": [

                    ]
                }
            }
            logging.info("Reading static parameters from file %s.txt", parameter_context_name)
            parameter_body = update_nifi_params.nifi_params_config(parameter_context_name,
                                                                   f'{prop.NIFI_STATIC_PARAMETER_DIRECTORY_PATH}postgres/{filename}/parameters.txt',
                                                                   parameter_body)
            pc = get_parameter_context(parameter_context_name)
            parameter_body['revision']['version'] = pc['version']
            parameter_body['id'] = pc['id']
            parameter_body['component']['id'] = pc['id']
            parameter_body['component']['name'] = pc['name']
            update_parameter(parameter_body)

        # Runs the processors
        for j in processor_group_name:
            start_processor_group(j, 'RUNNING')

        # Executing the query to set the status "Running"
        execute_sql(state='RUNNING')

    if stop_hour > 0 and stop_hour <= 24:
        named_tuple = time.localtime()
        process_start_time = time.strftime("%Y-%m-%d, %H:%M:%S", named_tuple)
        stop_seconds = stop_hour * 60 * 60

        logging.info(f"Process start time: {process_start_time}")
        # Stop hour
        time.sleep(stop_seconds)

        # Stops the processors
        for i in processor_group_name:
            start_processor_group(i, 'STOPPED')
    else:
        logging.warn(f"Stop hour should be greater than 0 and less than or equal to 24")
    # Executing the query to set the status "Stopped"
    execute_sql(state='STOPPED')
