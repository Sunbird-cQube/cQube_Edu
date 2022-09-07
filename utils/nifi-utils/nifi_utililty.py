import requests as rq, json, sys, logging, shutil, os, zipfile, csv, boto3, psycopg2, time, ast,pandas
import properties_nifi_deploy as prop
from env import *
from nifi_env_db import db_name, db_pwd, db_user, nifi_port
# from views import *
from config import *
# from views import app as application

logging.basicConfig(level=logging.DEBUG)

# Get nifi root processor group ID
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

# Upload template to Nifi
def upload_nifi_template(template):
    """
    upload the nifi template to Nifi
    """
    # Get the root processor group id
    nifi_pg_id = get_nifi_root_pg()

    # upload the template to Nifi
    file = {'template': (f'{prop.NIFI_TEMPLATE_PATH}{template}.xml', open(
        f'{prop.NIFI_TEMPLATE_PATH}{template}.xml', 'rb')), }
    template_upload_res = rq.post(
        f'{prop.NIFI_IP}:{prop.NIFI_PORT}/nifi-api/process-groups/{nifi_pg_id}/templates/upload', files=file)

    if template_upload_res.status_code == 201:
        return True
    else:
        return template_upload_res.text

# create parameter
def create_parameter(parameter_context, parameter_body):
    """
    create nifi parameter
    """
    header = {"Content-Type": "application/json"}
    # create the parameter in nifi
    create_parameter_res = rq.post(
        f'{prop.NIFI_IP}:{prop.NIFI_PORT}/nifi-api/parameter-contexts', json=parameter_body, headers=header)
    if create_parameter_res.status_code == 201:
        logging.info("Successfully Created parameter context %s", parameter_context)
        return True
    else:
        return create_parameter_res.text

# Instantiate Nifi Template
def instantiate_template(template):
    """
    Instantiate nifi template
    """
    template_list = rq.get(
        f'{prop.NIFI_IP}:{prop.NIFI_PORT}/nifi-api/flow/templates')
    if template_list.status_code == 200:
        for i in template_list.json()['templates']:
            if i['template']['name'] == template:
                template_instantiate_body = {
                    "templateId": i['template']['id'], "originX": 423, "originY": 52,
                    "disconnectedNodeAcknowledged": False}

                template_instantiate_res = rq.post(
                    f'{prop.NIFI_IP}:{prop.NIFI_PORT}/nifi-api/process-groups/{nifi_root_pg_id}/template-instance',
                    json=template_instantiate_body, headers=header)
                if template_instantiate_res.status_code == 201:
                    logging.info("Successfully Instatiated the template.")
                else:
                    return template_instantiate_res.text

    else:
        return template_list.text

# Get the  processor group details
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

# Get parameter context details
def get_parameter_context(parameter_context):
    parameter_context_res = rq.get(
        f'{prop.NIFI_IP}:{prop.NIFI_PORT}/nifi-api/flow/parameter-contexts')
    if parameter_context_res.status_code == 200:
        for i in parameter_context_res.json()['parameterContexts']:
            if i['component']['name'] == parameter_context:
                return i
    else:
        return False

# Connection of processor groups to respective parameter contexts
def link_parameter_with_processor_group(processor_group_name, parameter_context):
    """[Link the parameter context with respective processor group]

    Args:
        processor_group_name ([string]): [provide the processor group name]
        parameter_context ([string]): [provide the parameter context name to link with processor group]
    """
    # Get the processor group details
    pg_id = get_processor_group_info(
        processor_group_name)

    # Get the parameter context details
    parameter_context = get_parameter_context(parameter_context)

    # Link parameter context to respective processor group
    parameter_link_body = {"revision": {"version": pg_id['revision']['version'], "lastModifier": "Python"},
                           "component": {
                               "id": pg_id['component']['id'], "parameterContext": {"id": parameter_context['id']}}}

    link_parameter_res = rq.put(
        f"{prop.NIFI_IP}:{prop.NIFI_PORT}/nifi-api/process-groups/{pg_id['component']['id']}",
        json=parameter_link_body,
        headers=header)
    if link_parameter_res.status_code == 200:
        logging.info(
            "Successfully linked parameter context with processor group")
    else:
        return link_parameter_res.text

# create distributed server
def create_controller_service(processor_group_name, port):
    procesor_group = get_processor_group_info(
        processor_group_name)

    controller_service_body = {"revision": {"clientId": "Python", "version": 0, "lastModifier": "Python"},
                               "component": {
                                   "type": "org.apache.nifi.distributed.cache.server.map.DistributedMapCacheServer",
                                   "properties": {"Port": port}}}

    create_controller_service_res = rq.post(
        f"{prop.NIFI_IP}:{prop.NIFI_PORT}/nifi-api/process-groups/{procesor_group['component']['id']}/controller-services",
        json=controller_service_body, headers=header)
    if create_controller_service_res.status_code == 201:
        logging.info("Successfully Created distributed server")
    else:
        return create_controller_service_res.text

# List controller services
def get_controller_list(processor_group_name):
    controller_list_res = rq.get(
        f"{prop.NIFI_IP}:{prop.NIFI_PORT}/nifi-api/flow/process-groups/{processor_group_name['component']['id']}/controller-services")
    if controller_list_res.status_code == 200:
        return controller_list_res.json()
    else:
        return controller_list_res.text

# update controller service property # dynamic should be enabled
def update_controller_service_property(processor_group_name, controller_name):
    controller_details = get_controller_list(
        get_processor_group_info(processor_group_name))
    for i in controller_details['controllerServices']:
        if i['component']['name'] == controller_name:

            # Request body for aws controller
            update_controller_body_aws = {"revision": {
                "version": i['revision']['version'],
                "lastModifier": "Python"
            },
                "component": {"id": i['component']['id'], "name": controller_name,
                              "properties": {"Access Key": "#{s3_access_key}", "Secret Key": "#{s3_secret_key}"}}

            }
            # Request body for postgres controller
            update_controller_body_postgres = {"revision": {
                "version": i['revision']['version'],
                "lastModifier": "Python"
            },
                "component": {"id": i['component']['id'], "name": controller_name,
                              "properties": {"Password": "#{db_password}"}}

            }
            # Request body for AzureBlobStorage-ABS controller
            update_controller_body_azure = {
                "disconnectedNodeAcknowledged": False,
                "component": {
                    "id": i['component']['id'],
                    "name": controller_name,
                    "comments": "update from deploy_nifi.py",
                    "properties": {
                        "storage-account-name": "#{azure_account_name}",
                        "storage-account-key": "#{azure_account_key}"
                    }
                },
                "revision": {
                    "version": i['revision']['version']
                }
            }

            # controller body selection based on controller name
            update_controller_body = ''
            if "s3" in controller_name:
                update_controller_body = update_controller_body_aws

            elif "postgres" in controller_name:
                update_controller_body = update_controller_body_postgres

            elif "azure" in controller_name:
                update_controller_body = update_controller_body_azure

            update_controller_res = rq.put(
                f"{prop.NIFI_IP}:{prop.NIFI_PORT}/nifi-api/controller-services/{i['component']['id']}",
                json=update_controller_body, headers=header)

            if update_controller_res.status_code == 200:
                return True
            else:
                return update_controller_res.text

# start or stop controller services
def controller_service_enable(processor_group_name):
    controller_details = get_controller_list(
        get_processor_group_info(processor_group_name))
    for i in controller_details['controllerServices']:
        if i['component']['state'] == 'DISABLED':

            controller_service_enable_body = {"revision": {
                "version": i['revision']['version'], }, "state": "ENABLED"}
            controller_service_enable_res = rq.put(
                f"{prop.NIFI_IP}:{prop.NIFI_PORT}/nifi-api/controller-services/{i['component']['id']}/run-status",
                json=controller_service_enable_body, headers=header)

            if controller_service_enable_res.status_code == 200:
                logging.info("Enabled Controller services")
                logging.info(
                    f"Controller Name = {controller_service_enable_res.json()['component']['name']}")
                logging.info(
                    f"Controller State = {controller_service_enable_res.json()['component']['state']}")

            else:
                return controller_service_enable_res.text

# Get JSON file
def get_json_file(path):
    '''
    param:path [ filepath ]
    type:String
    '''
    # Opening JSON file
    with open(path, 'r') as openfile:
        # Reading from json file
        json_object = json.load(openfile)
    return json_object

# Connect_nifi_processors:
def get_processor_group_ports(processor_group_name):
    # Get processor group details
    pg_source = get_processor_group_info(processor_group_name)
    pg_details = rq.get(
        f"{prop.NIFI_IP}:{prop.NIFI_PORT}/nifi-api/flow/process-groups/{pg_source['component']['id']}")
    if pg_details.status_code != 200:
        return pg_details.text
    else:
        return pg_details

# create funnel

def create_funnel():
    # check funnel exist
    pg_list = rq.get(
        f'{prop.NIFI_IP}:{prop.NIFI_PORT}/nifi-api/flow/process-groups/{get_nifi_root_pg()}')
    if pg_list.status_code == 200:
        if len(pg_list.json()['processGroupFlow']['flow']['funnels']) == 0:
            # create funnel
            header = {"Content-Type": "application/json"}
            create_funnel_body = {"revision": {"clientId": "PYTHON", "version": 0},
                                  "disconnectedNodeAcknowledged": False,
                                  "component": {"position": {"x": 373.83218347370484, "y": 484.90403183806325}}}
            create_funnel_res = rq.post(
                f'{prop.NIFI_IP}:{prop.NIFI_PORT}/nifi-api/process-groups/{get_nifi_root_pg()}/funnels',
                json=create_funnel_body, headers=header)

            if create_funnel_res.status_code == 201:
                pg_list = rq.get(
                    f'{prop.NIFI_IP}:{prop.NIFI_PORT}/nifi-api/flow/process-groups/{get_nifi_root_pg()}')
                if pg_list.status_code == 200:
                    return pg_list.json()
            else:
                return False
        return pg_list.json()

# connect [INPUT/OUTPUT PORT] between process groups
def connect_output_input_port(source_processor_group, destination_processor_group):
    """[summary]
    connects output port to input port between processor group.
    Args:
        source_processor_group ([string]): [processor group name where output ports are available]
        destination_processor_group ([string]): [processor group name where input port are available]
    Returns:
        [Boolean]: [Return True if connection is success]
    """
    pg_source_details = get_processor_group_ports(source_processor_group)
    pg_dest_details = get_processor_group_ports(destination_processor_group)

    connect_port_body = {
        "revision": {
            "clientId": "PYTHON",
            "version": 0
        },
        "disconnectedNodeAcknowledged": False,
        "component": {
            "name": "",
            "source": {
                "id": "",
                "groupId": "",
                "type": "OUTPUT_PORT"
            },
            "destination": {
                "id": "",
                "groupId": "",
                "type": "INPUT_PORT"
            }
        }
    }

    params = prop.NIFI_INPUT_OUTPUT_PORTS
    # Get Output ports [static values]
    for key, value in params.items():
        if source_processor_group == key:
            if 'cQube_data_storage' in source_processor_group:
                params = params[source_processor_group]
                source_processor_group = destination_processor_group

            # iterate over the configured ports from params
            if params[source_processor_group]:
                for ports in params[source_processor_group]:
                    # port details of processor group
                    for i in pg_source_details.json()['processGroupFlow']['flow']['outputPorts']:
                        # if output port name match, assign the ID,parentGroupID
                        if i['component']['name'] == ports['OUTPUT_PORT']:
                            connect_port_body['component']['source']['id'] = i['component']['id']
                            connect_port_body['component']['source']['groupId'] = i['component']['parentGroupId']

                            # get input port details of processor group
                            for input_port_name in pg_dest_details.json()['processGroupFlow']['flow']['inputPorts']:
                                if input_port_name['component']['name'] == ports['INPUT_PORT']:
                                    connect_port_body['component']['destination']['id'] = \
                                        input_port_name['component'][
                                            'id']
                                    connect_port_body['component']['destination']['groupId'] = \
                                        input_port_name['component']['parentGroupId']
                                    connect_port_res = rq.post(
                                        f"{prop.NIFI_IP}:{prop.NIFI_PORT}/nifi-api/process-groups/{get_nifi_root_pg()}/connections",
                                        json=connect_port_body, headers=header)

                                    if connect_port_res.status_code == 201:
                                        logging.info(
                                            f"Successfully Connection done between {i['component']['name']} and {input_port_name['component']['name']} port")

                                    else:
                                        return connect_port_res.text

# Diksha_enrolment_file_split:
def creat_csv_file(list_of_items, filename):
    f_name = filename.lower()
    f = f_name.split(' ', 2)[2]
    f2 = f.replace('-', ' ')
    removeSpecialChars = f2.replace(' ', '_')
    filename_d = 'diksha_' + removeSpecialChars + '.csv'

    with open(filename_d, 'w') as file:
        csvwriter = csv.writer(file, delimiter='|')
        csvwriter.writerows(list_of_items)

    with zipfile.ZipFile(local_path + '/' + 'diksha_' + removeSpecialChars + '.zip', 'w',
                         zipfile.ZIP_DEFLATED) as zip_file:
        zip_file.write(filename_d)

    with zipfile.ZipFile('diksha_' + removeSpecialChars + '.zip', 'w',
                         zipfile.ZIP_DEFLATED) as zip_file:
        zip_file.write(filename_d)

    if storage_type == 's3':
        upload_file_s3('diksha_' + removeSpecialChars + '.zip')

    if os.path.exists('diksha_' + removeSpecialChars + '.zip'):
        os.remove('diksha_' + removeSpecialChars + '.zip')

    if os.path.exists(filename_d):
        os.remove(filename_d)

def emission_folder(local_path, destination_path, storage_type):
    if storage_type == 'local':
        src_files = os.listdir(local_path)
        for file_name in src_files:
            full_file_name = os.path.join(local_path, file_name)
            if os.path.isfile(full_file_name):
                shutil.copy(full_file_name, destination_path)

def delete_files(local_path):
    folder = local_path

    for filename in os.listdir(folder):
        file_path = os.path.join(folder, filename)
        try:
            if os.path.isfile(file_path) or os.path.islink(file_path):
                os.unlink(file_path)

            if os.path.exists(local_path):
                if len(os.listdir(local_path)) == 0:
                    os.rmdir(local_path)

            elif os.path.isdir(file_path):
                shutil.rmtree(file_path)
        except Exception as e:
            print('Failed to delete %s. Reason: %s' % (file_path, e))

def count_number(local_path):
    return (len(os.listdir(local_path)))

def upload_file_s3(file):
    PATH_IN_COMPUTER = file
    BUCKET_NAME = EMISSION_BUCKET_NAME
    KEY = 'diksha_enrolment/' + PATH_IN_COMPUTER
    s3_resource = boto3.resource(
        's3',
        region_name=AWS_DEFAULT_REGION,
        aws_access_key_id=AWS_ACCESS_KEY,
        aws_secret_access_key=AWS_SECRET_KEY
    )
    s3_resource.Bucket(BUCKET_NAME).put_object(
        Key=KEY,
        Body=open(PATH_IN_COMPUTER, 'rb')
    )

def separate_csv(filepath):
    file = open(filepath)
    keywords = ['End of Program-Course Details', 'End Of program details', 'End Of Course details',
                'End of Course enrolments']

    mycsv = []
    keyIndex = 0
    key = keywords[keyIndex]
    for row in csv.reader(file):

        if row[0] == key:
            if row[0] == 'End of Program-Course Details':
                df = pd.DataFrame(mycsv)
                new_header = df.iloc[0].str.strip().str.lower()
                nan_value = float("NaN")
                df.replace("", nan_value, inplace=True)
                df.dropna(how='all', inplace=True)
                df.replace(nan_value, '', inplace=True)
                df = df[1:]
                df.columns = new_header
                df.insert(0, 'program_id', range(1, 1 + len(df)))
                d = pd.melt(df, id_vars=['program_id', 'program_name'], var_name='Course_Id') \
                    .sort_values(['program_id', 'program_name', ]).reset_index(drop=True)
                df1 = d.drop(columns=['Course_Id']).rename(columns={'value': 'Course_ID'})
                df1.replace("", nan_value, inplace=True)
                df2 = df1.dropna(subset=['Course_ID'], inplace=False)
                col = df2.columns.tolist()
                val = df2.values.tolist()

                if df2[2:].empty:
                    del df2
                else:
                    mycsv = [col] + val
                    creat_csv_file(mycsv, key)

            else:
                df_1 = pd.DataFrame(mycsv)
                new_header = df_1.iloc[0].str.strip().str.lower()
                nan_value = float("NaN")
                df_1.replace("", nan_value, inplace=True)
                df_1.dropna(how='all', inplace=True)
                df_1.replace(nan_value, "", inplace=True)
                df_1.dropna(how='all', axis=1, inplace=True)
                df_1 = df_1[1:]
                df_1.columns = new_header
                col = df_1.columns.tolist()
                val = df_1.values.tolist()
                if df_1.empty:
                    del df_1
                else:
                    mycsv = [col] + val
                    creat_csv_file(mycsv, key)

            keyIndex += 1
            del mycsv[:]
            if keyIndex == len(keywords):
                break
            key = keywords[keyIndex]
        else:
            mycsv.append(row)

    if len(sys.argv[1:]) > 0:
        global local_path
        local_path = 'new_diksha_directory/'
        if not os.path.exists(local_path):
            os.mkdir(local_path)
        path = sys.argv[1]
        storage_type = sys.argv[2]
        emission_dir_path = sys.argv[3]
        separate_csv(path)
        value = count_number(local_path)
        print(value)
        emission_folder(local_path, emission_dir_path, storage_type)
        update_parameter_ctx("static_data_parameters", "diksha_enrolment_file_count", value)
        delete_files(local_path)

    else:
        print('please provide the arguement')

# get_jolt_spec_db:
def remove_special_characters(data):
    """
    removes '\n', (' , space and ',)
    """
    data = str(data)
    data = data.replace("\\n", "")
    data = data.replace("\\t", "")
    data = data.replace("('", "")
    data = data.replace("',)", "")
    data = data.replace("\\r", "")
    return data

def get_jolt_spec(spec_type):
    """
    Get the jolt spec from db
    """
    try:
        connection = psycopg2.connect(user=db_user,
                                      password=db_pwd,
                                      host="localhost",
                                      database=db_name)

        cursor = connection.cursor()

        cursor.execute("select jolt_spec from {}".format(spec_type))
        record = cursor.fetchone()
        res = remove_special_characters(record)
        return res

    except (Exception, psycopg2.Error) as error:
        logging.error("Error while connecting to PostgreSQL", error)
        print("Error while connecting to PostgreSQL", error)

    finally:
        # closing database connection.
        if (connection):
            cursor.close()
            connection.close()

# nifi_disable_processors:
def data_storage_disable_processor(processor_group_name, data_storage_type):
    disable_processor_names = []
    if data_storage_type == "s3":
        disable_processor_names = ["data_storage_ListFile", "azure_list_emission"]
        for processor_name in disable_processor_names:
            # disable the nifi processor
            nifi_enable_disable_processor(processor_group_name, processor_name, "DISABLED")
            nifi_enable_disable_processor(processor_group_name, processor_name, "DISABLED")

    elif data_storage_type == "local":
        disable_processor_names = ["s3_list_emission", "azure_list_emission"]
        for processor_name in disable_processor_names:
            # disable the nifi processor
            nifi_enable_disable_processor(processor_group_name, processor_name, "DISABLED")
            nifi_enable_disable_processor(processor_group_name, processor_name, "DISABLED")

    elif data_storage_type == "azure":
        disable_processor_names = ["s3_list_emission", "data_storage_ListFile"]
        for processor_name in disable_processor_names:
            # disable the nifi processor
            nifi_enable_disable_processor(processor_group_name, processor_name, "DISABLED")
            nifi_enable_disable_processor(processor_group_name, processor_name, "DISABLED")

def nifi_enable_disable_processor(processor_group_name, processor_name, state):
    pg_source = get_processor_group_ports(processor_group_name)
    if pg_source.status_code == 200:
        for i in pg_source.json()['processGroupFlow']['flow']['processors']:
            if i['component']['name'] == processor_name:
                disable_body = {
                    "revision": {"clientId": "python deployment code", "version": i['revision']['version']},
                    "state": state, "disconnectedNodeAcknowledged": False}
                disable_response = rq.put(
                    f"{prop.NIFI_IP}:{prop.NIFI_PORT}/nifi-api/processors/{i['component']['id']}/run-status",
                    json=disable_body, headers=header)

                if disable_response.status_code == 200:
                    if state == "STOPPED":
                        state = "ENABLED"
                        logging.info(
                            f"Successfuly {state} {i['component']['name']} processor in {processor_group_name} processor group")
                        return True
                else:
                    return disable_response.text

def diksha_enable_disable_processor(processor_group_name, storage_type, dataset, emission_method):
    # ETB
    if dataset == "etb":
        if emission_method == "emission":
            disable_processor = ['diksha_api_summary_rollup_trigger']
            enable_processor = []

            if storage_type == 'local':
                disable_processor.append(["s3_list_emission_ETB", "azure_list_emission_ETB"])
                enable_processor.append("diksha_ListFile_ETB")

                for i in disable_processor:
                    # disable the nifi processor
                    nifi_enable_disable_processor(processor_group_name, i, "DISABLED")
                for i in enable_processor:
                    # enable the nifi processor
                    nifi_enable_disable_processor(processor_group_name, i, "STOPPED")

            elif storage_type == 's3':
                disable_processor.append(["diksha_ListFile_ETB", "azure_list_emission_ETB"])
                enable_processor.append("s3_list_emission_ETB")

                for i in disable_processor:
                    # disable the nifi processor
                    nifi_enable_disable_processor(processor_group_name, i, "DISABLED")
                for i in enable_processor:
                    # enable the nifi processor
                    nifi_enable_disable_processor(processor_group_name, i, "STOPPED")

            elif storage_type == 'azure':
                disable_processor.append(["diksha_ListFile_ETB", "s3_list_emission_ETB"])
                enable_processor.append("azure_list_emission_ETB")
                for i in disable_processor:
                    # disable the nifi processor
                    nifi_enable_disable_processor(processor_group_name, i, "DISABLED")
                for i in enable_processor:
                    # enable the nifi processor
                    nifi_enable_disable_processor(processor_group_name, i, "STOPPED")

        elif emission_method == "api":
            # add the lists3,listfile processors
            disable_processor = ['diksha_ListFile_ETB', 's3_list_emission_ETB', 'azure_list_emission_ETB']
            enable_processor = ["diksha_api_summary_rollup_trigger"]
            for i in disable_processor:
                # disable the nifi processor
                nifi_enable_disable_processor(processor_group_name, i, "DISABLED")
            for i in enable_processor:
                # enable the nifi processor
                nifi_enable_disable_processor(processor_group_name, i, "STOPPED")

    # TPD
    if dataset == "tpd":
        if emission_method == "emission":
            disable_processor = ['diksha_api_progress_exhaust_get_today_request']
            enable_processor = []
            if storage_type == 'local':
                disable_processor.append(["s3_list_emission_TPD", "azure_list_emission_TPD"])
                enable_processor.append("diksha_ListFile_TPD")

                for i in disable_processor:
                    # disable the nifi processor
                    nifi_enable_disable_processor(processor_group_name, i, "DISABLED")
                for i in enable_processor:
                    # enable the nifi processor
                    nifi_enable_disable_processor(processor_group_name, i, "STOPPED")

            elif storage_type == 's3':
                disable_processor.append(["diksha_ListFile_TPD", "azure_list_emission_TPD"])
                enable_processor.append("s3_list_emission_TPD")

                for i in disable_processor:
                    # disable the nifi processor
                    nifi_enable_disable_processor(processor_group_name, i, "DISABLED")
                for i in enable_processor:
                    # enable the nifi processor
                    nifi_enable_disable_processor(processor_group_name, i, "STOPPED")

            elif storage_type == 'azure':
                disable_processor.append(["diksha_ListFile_TPD", "s3_list_emission_TPD"])
                enable_processor.append("azure_list_emission_TPD")

                for i in disable_processor:
                    # disable the nifi processor
                    nifi_enable_disable_processor(processor_group_name, i, "DISABLED")
                for i in enable_processor:
                    # enable the nifi processor
                    nifi_enable_disable_processor(processor_group_name, i, "STOPPED")

        elif emission_method == "api":
            # add the lists3,listfile processors
            disable_processor = ['diksha_ListFile_TPD', 's3_list_emission_TPD', 'azure_list_emission_TPD']
            enable_processor = ["diksha_api_progress_exhaust_get_today_request"]
            for i in disable_processor:
                # disable the nifi processor
                nifi_enable_disable_processor(processor_group_name, i, "DISABLED")
            for i in enable_processor:
                # enable the nifi processor
                nifi_enable_disable_processor(processor_group_name, i, "STOPPED")

# nifi_dummy_connection_creator:

# create dummy connection for the ports belonging to unselected data sources
def dummy_connection_creator(processor_group_name):
    pg_source = get_processor_group_ports(processor_group_name)
    funnel_details = create_funnel()
    funnel_details = funnel_details['processGroupFlow']['flow']['funnels'][0]
    dummy_connections = {'input_port': [],
                         'output_port': []
                         }

    # Get all the invalid inputPorts
    for input_port_name in pg_source.json()['processGroupFlow']['flow']['inputPorts']:
        # check for  invalid port in inputPort
        if 'Invalid' in input_port_name['status']['runStatus']:
            #  set source and destination connection details
            funnel_connect_body = {"revision": {
                "clientId": "Python",
                "version": 0
            },
                "disconnectedNodeAcknowledged": False,
                "component": {
                    "name": "",
                    "source": {
                        "id": funnel_details['component']['id'],
                        "groupId": funnel_details['component']['parentGroupId'],
                        "type": "FUNNEL"
                    },
                    "destination": {
                        "id": input_port_name['status']['id'],
                        "groupId": input_port_name['status']['groupId'],
                        "type": "INPUT_PORT"
                    }}}

            dummy_connections['input_port'].append(funnel_connect_body)

    # Get all the invalid outputPorts
    for output_port_name in pg_source.json()['processGroupFlow']['flow']['outputPorts']:
        # check for  invalid port in outputPort
        if 'Invalid' in output_port_name['status']['runStatus']:
            funnel_connect_body = {"revision": {
                "clientId": "Python",
                "version": 0
            },
                "disconnectedNodeAcknowledged": False,
                "component": {
                    "name": "",
                    "source": {
                        "id": output_port_name['status']['id'],
                        "groupId": output_port_name['status']['groupId'],
                        "type": "OUTPUT_PORT"
                    },
                    "destination": {
                        "id": funnel_details['component']['id'],
                        "groupId": funnel_details['component']['parentGroupId'],
                        "type": "FUNNEL"
                    }}}

            dummy_connections['output_port'].append(funnel_connect_body)

    # dummy connection from funnel to input port
    for input_port_body in dummy_connections['input_port']:
        funnel_connect_res = rq.post(
            f"{prop.NIFI_IP}:{prop.NIFI_PORT}/nifi-api/process-groups/{get_nifi_root_pg()}/connections",
            json=input_port_body, headers=header)
        if funnel_connect_res.status_code == 201:
            logging.info(
                f"Connection established between source={funnel_connect_res.json()['component']['source']['name']} and  destination={funnel_connect_res.json()['component']['destination']['name']}")
        else:
            return funnel_connect_res.text

    # dummy connection from output port to funnel
    for output_port_body in dummy_connections['output_port']:
        funnel_connect_res = rq.post(
            f"{prop.NIFI_IP}:{prop.NIFI_PORT}/nifi-api/process-groups/{get_nifi_root_pg()}/connections",
            json=output_port_body, headers=header)
        if funnel_connect_res.status_code == 201:
            logging.info(
                f"Connection established between source={funnel_connect_res.json()['component']['source']['name']} and destination={funnel_connect_res.json()['component']['destination']['name']}")
        else:
            return funnel_connect_res.text
    return "Successfully connected invalid ports with funnel"

# nifi_schedular:
def get_processor_groups(self):
    pg_resp = rq.get('http://localhost:{}/nifi-api/process-groups/root/process-groups'.format(nifi_port))
    pg_list = dict()
    if pg_resp.status_code == 200:
        for pg in pg_resp.json().get('processGroups'):
            if pg['component']['name'] != 'cqube_telemetry_transformer':
                pg_list[pg['component']['name']] = pg.get('id')
    else:
        logging.error("Unable to get the process group details, due to {}".format(pg_resp.text))
    return pg_list

def schedule_processor_groups(pg_list):
    headers = {"Content-Type": "application/json"}
    data_source = {
        'static_data_transformer': {"state": "RUNNING", "time": {"hours": "10", "minutes": "00"}, "stopTime": 1},
        'pat_transformer': {"state": "RUNNING", "time": {"hours": "11", "minutes": "10"}, "stopTime": 2},
        'infra_transformer_validations': {"state": "RUNNING", "time": {"hours": "13", "minutes": "20"},
                                          "stopTime": 1},
        'crc_transformer': {"state": "RUNNING", "time": {"hours": "14", "minutes": "30"}, "stopTime": 2},
        'teacher_attendance_transformer': {"state": "RUNNING", "time": {"hours": "16", "minutes": "40"},
                                           "stopTime": 1},
        'udise_transformer': {"state": "RUNNING", "time": {"hours": "17", "minutes": "50"}, "stopTime": 2},
        'student_attendance_transformer': {"state": "RUNNING", "time": {"hours": "20", "minutes": "00"},
                                           "stopTime": 2},
        'semester_transformer': {"state": "RUNNING", "time": {"hours": "22", "minutes": "10"}, "stopTime": 2},
        'diksha_transformer': {"state": "RUNNING", "time": {"hours": "00", "minutes": "20"}, "stopTime": 4},
        'composite_transformer': {"state": "RUNNING", "time": {"hours": "05", "minutes": "40"}, "stopTime": 1},
        'progress_card_transformer': {"state": "RUNNING", "time": {"hours": "06", "minutes": "50"}, "stopTime": 1}
    }
    try:
        for x, y in pg_list.items():
            uri = 'http://localhost:3001/api/nifi/scheduleNiFiProcessor/{}/{}'.format(y, x)
            if data_source.get(x):
                payload = data_source.get(x)
            else:
                payload = {"state": "RUNNING", "time": {"hours": "22", "minutes": "00"}, "stopTime": 5}
            pg_resp = rq.post(uri, headers=headers, json=payload)
            if pg_resp.status_code == 200:
                logging.info("Sucessfully scheduled the processor group {}".format(x))
            else:
                logging.error("Failed to schedule the processor group {} due to error: {}".format(x, pg_resp.text))
    except Exception as err:
        logging.error("Unexpected error :{} while scheduling the processor group {}".format(err, x))

# nifi_start_pg:
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
        return start_response.text

# update_batch_id:
def update_parameter_ctx(pc_var, parameter_name, jolt_spec):
    """
    Function will update the paramters into NiFi
    """
    # Get parameter context details
    pc = get_parameter_context(pc_var)

    # create parameter
    par_data = {"revision": {"clientId": "", "version": ""}, "id": "",
                "component": {"id": "", "name": "", "description": "", "parameters": []}}
    parameter = parameter_list_builder(parameter_name, jolt_spec)
    par_data['component']['parameters'].append(parameter)
    par_data['revision']['version'] = pc['version']
    par_data['id'] = pc['id']
    par_data['component']['id'] = pc['id']
    par_data['component']['name'] = pc['name']

    # update the parameter into NiFi
    up_status = update_parameters(par_data)
    if up_status.status_code == 200:
        logging.info("Successfully updated parameter")
    return par_data

def nifi_params_config():
    params = {
        'diksha_parameters': 'diksha_progress_exhaust_batch_list.json'

    }
    for param_name, filename in params.items():
        with open(filename, 'r') as fd:
            parameter_data = fd.read()
        parameter_dict = ast.literal_eval(parameter_data)
        for parameter_name, value in parameter_dict.items():
            time.sleep(1)
            update_parameter_ctx(param_name, parameter_name, value)

# update_jolt_params:
def update_nifi_jolt_params(processor_group):
    '''
    Get the jolt spec from db and update the nifi parameters
    '''
    jolt_params = {
        "composite_parameters": {
            "comp_district_jolt_spec": "composite_jolt_district",
            "comp_block_jolt_spec": "composite_jolt_block",
            "comp_cluster_jolt_spec": "composite_jolt_cluster",
            "comp_school_jolt_spec": "composite_jolt_school"
        },
        "udise_parameters": {
            "udise_district_jolt_spec": "udise_jolt_district",
            "udise_block_jolt_spec": "udise_jolt_block",
            "udise_cluster_jolt_spec": "udise_jolt_cluster",
            "udise_school_jolt_spec": "udise_jolt_school"
        },
        "infra_parameters": {
            "infra_district_table": "Infra_jolt_district_table",
            "infra_block_table": "Infra_jolt_block_table",
            "infra_cluster_table": "Infra_jolt_cluster_table",
            "infra_school_table": "Infra_jolt_school_table",
            "infra_district_map": "Infra_jolt_district_map",
            "infra_block_map": "Infra_jolt_block_map",
            "infra_cluster_map": "Infra_jolt_cluster_map",
            "infra_school_map": "Infra_jolt_school_map"
        }
    }

    par_data = {"revision": {"clientId": "", "version": ""}, "id": "",
                "component": {"id": "", "name": "", "description": "", "parameters": []}}
    pc = get_parameter_context(processor_group)
    par_data['revision']['version'] = pc['version']
    par_data['id'] = pc['id']
    par_data['component']['id'] = pc['id']
    par_data['component']['name'] = pc['name']

    # updates the parameters
    if processor_group in jolt_params:
        for key, value in jolt_params[processor_group].items():
            parameter_body = parameter_list_builder(key,get_jolt_spec(value))
            par_data['component']['parameters'].append(parameter_body)

    update_parameter(par_data)

# update_nifi_parameters_main:

def parameters_builder(name, sensitive, value="", description=""):
    """
    Function creates the parameter
    """
    parameter = {"parameter": {"name": "", "sensitive": "", "value": "", "description": ""}}
    parameter['parameter']['name'] = name
    parameter['parameter']['sensitive'] = sensitive
    parameter['parameter']['value'] = value
    parameter['parameter']['description'] = description
    return parameter

def parameter_list_builder(parameter_name, config_parameters):
    """
    Function creates the parameter body
    """
    parameters_list = parameters_builder(parameter_name, False, config_parameters)
    return parameters_list

def get_parameter_context(parameter_context):
    """
    Function will get the parameter context details
    """
    res =rq.get('http://localhost:{}/nifi-api/flow/parameter-contexts'.format(nifi_port))
    if res.status_code == 200:
        for i in res.json()['parameterContexts']:
            if i['component']['name'] == parameter_context:
                return {"id": i['id'], "version": i['revision']['version'], "name": i['component']['name']}
    else:
        logging.error("Failed to get parameter contexts")
        return {"Error": "Failed to get parameter contexts", "error": res.json()}

def update_parameters(nifi_parameters):
    '''
    Function will update parameter context
    '''
    update_pr = rq.post("http://localhost:{}/nifi-api/parameter-contexts/{}/update-requests".format(nifi_port,
                                                                                                          nifi_parameters[
                                                                                                              'id']),
                              json=nifi_parameters)
    if update_pr.status_code == 200:
        print("Successfully updated the parameter!!")
        return update_pr
    else:
        logging.error("Error updating  parameter context details")
        return {"Error": "Failed to update parameter context ", "error": update_pr.json()}

def update_parameter(par_data):
    # update the parameter into NiFi
    up_status = update_parameters(par_data)
    if up_status.status_code == 200:
        logging.info("Successfully updated parameter")
    return par_data

# update_nifi_params:
def nifi_params_config(param_name, filename, par_data):
    params = {param_name: filename}
    for param_name, filename in params.items():
        with open(filename, 'r') as fd:
            parameter_data = fd.read()
        parameter_dict = ast.literal_eval(parameter_data)
        for parameter_name, value in parameter_dict.items():
            parameter_body = parameter_list_builder(parameter_name, value)
            par_data['component']['parameters'].append(parameter_body)

    return par_data

# update_processor_property:
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
            # Get the required processor details
            if i['component']['name'] == processor_name:
                # Request body creation to update processor property.
                update_processor_property_body = {
                    "component": {
                        "id": i['component']['id'],
                        "name": i['component']['name'],
                        "config": {
                            "properties": {
                                "from_date": properties['from_date'],
                                "to_date": properties['to_date']
                            }
                        }
                    },
                    "revision": {
                        "clientId": "python code: update_processor_property.py",
                        "version": i['revision']['version']
                    },
                    "disconnectedNodeAcknowledged": "False"
                }
                # API call to update the processor property
                update_processor_res = rq.put(
                    f"{prop.NIFI_IP}:{prop.NIFI_PORT}/nifi-api/processors/{i['component']['id']}",
                    json=update_processor_property_body)
                if update_processor_res.status_code == 200:
                    logging.info(
                        f"Successfully updated the properties: {properties} in {i['component']['name']} processor")
                    return True

                else:
                    return update_processor_res.text

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
            # Get the required processor details
            if i['component']['name'] == processor_name:
                # Request body creation to update processor property.
                update_processor_property_body = {
                    "component": {
                        "id": i['component']['id'],
                        "name": i['component']['name'],
                        "config": {
                            "properties": {
                                "from_date": properties['from_date'],
                                "to_date": properties['to_date']
                            }
                        }
                    },
                    "revision": {
                        "clientId": "python code: update_processor_property.py",
                        "version": i['revision']['version']
                    },
                    "disconnectedNodeAcknowledged": "False"
                }
                # API call to update the processor property
                update_processor_res = rq.put(
                    f"{prop.NIFI_IP}:{prop.NIFI_PORT}/nifi-api/processors/{i['component']['id']}",
                    json=update_processor_property_body)
                if update_processor_res.status_code == 200:
                    logging.info(
                        f"Successfully updated the properties: {properties} in {i['component']['name']} processor")
                    return True

                else:
                    return update_processor_res.text

def install_datasource(arg1,arg2,arg3,arg4,arg5):
    """sys arguments: 1. data_source name (student_attendance_transformer)
                      2. parameter context name (student_attendance_parameters)
                      3. data_storage (cQube_data_storage)
                      4. distributed server port (4557)
                      5. storage type (local)
                      6. dataset ()
                      7. emission_method (emission)"""

    # deploy_nifi main

    nifi_root_pg_id = ''
    processor_group = ''
    header = {"Content-Type": "application/json"}

    processor_group_name = arg1
    parameter_context_name = arg2
    logging.info("Uploading Template to Nifi......")
    # 1.  Upload nifi template  # sys arg 1 - template name
    template_upload_status = upload_nifi_template(processor_group_name)
    if template_upload_status == True:
        logging.info("Successfully uploaded the template.")
    else:
        print(template_upload_status)

    # 2. Instantiate template
    logging.info("Instatiating the template.")
    instantiate_template(processor_group_name)

    #  3. Create parameters
    params = get_json_file(prop.NIFI_STATIC_PARAMETER_DIRECTORY_PATH + 'parameters_files_static_list.json')

    # read the parameter file created by Ansible using configuration
    logging.info("Reading dynamic parameters from file %s.json", parameter_context_name)
    f = open(f'{prop.NIFI_PARAMETER_DIRECTORY_PATH}{parameter_context_name}.json', "rb")
    parameter_body = json.loads(f.read())

    # Load parameters from file to Nifi parameters
    if (params.get(parameter_context_name)) and (parameter_context_name != 'cQube_data_storage_parameters'):
        logging.info("Reading static parameters from file %s.txt", parameter_context_name)
        parameter_body = update_nifi_params.nifi_params_config(parameter_context_name,
                                                               f'{prop.NIFI_STATIC_PARAMETER_DIRECTORY_PATH}{params.get(parameter_context_name)}',
                                                               parameter_body)
    create_parameter(parameter_context_name, parameter_body)

    # Load dynamic Jolt spec from db to Nifi parameters
    dynamic_jolt_params_pg = ['composite_parameters',
                              'infra_parameters', 'udise_parameters']
    if sys.argv[2] in dynamic_jolt_params_pg:
        logging.info("Creating dynamic jolt parameters")
        update_jolt_params.update_nifi_jolt_params(parameter_context_name)

    # 4. Link parameter context to processor group
    logging.info("Linking parameter context with processor group")
    link_parameter_with_processor_group(processor_group_name, parameter_context_name)

    # 5. Create controller services
    if int(arg4) != 0:
        logging.info("Creating distributed server")
        print(create_controller_service(processor_group_name, arg4))

    # 6. Add sensitive value to controller services
    logging.info("Adding sensitive properties in controller services")
    controller_list_all = get_json_file(prop.NIFI_STATIC_PARAMETER_DIRECTORY_PATH + 'controller_list.json')

    if controller_list_all.get(processor_group_name):
        for controller in controller_list_all.get(processor_group_name):
            print(update_controller_service_property(processor_group_name, controller))

    # 7. Enable controller service
    logging.info("Enabling Controller services")
    controller_service_enable(processor_group_name)
    logging.info("***Successfully Loaded template and enabled controller services***")

    # Connect_nifi_processors:
    # Main.
    """[summary]
    sys arguments = 1. cQube_raw_data_fetch processor name 2. transformer processor group name.
    Ex: python connect_nifi_processors.py cQube_raw_data_fetch_static static_data_processor
    """
    header = {"Content-Type": "application/json"}
    source_pg = arg3.strip()
    destination_pg = arg1.strip()

    logging.info('Connection between PORTS started...')
    if 'composite_transformer' in destination_pg or 'progress_card_transformer' in destination_pg:
        logging.info("Processor group=", destination_pg)
    else:
        res_1 = connect_output_input_port(source_pg, destination_pg)

    res_2 = connect_output_input_port(destination_pg, source_pg)
    logging.info('Successfully Connection done between PORTS.')

    # disable processor based on data storage type.
    data_storage_type = arg5
    data_storage_disable_processor(processor_group_name, data_storage_type)

def install_trans_aggre_datasources(arg1,arg2,arg3,arg4):
    """sys arguments: 1. data_source name (student_attendance_transformer)
                      2. parameter context name (student_attendance_parameters)
                      3. data_storage (cQube_data_storage)
                      4. distributed server port (4557)
                      5. storage type (local)
                      6. dataset ()
                      7. emission_method (emission)"""

    # deploy_nifi main

    nifi_root_pg_id = ''
    processor_group = ''
    header = {"Content-Type": "application/json"}

    processor_group_name = arg1
    parameter_context_name = arg2
    logging.info("Uploading Template to Nifi......")
    # 1.  Upload nifi template  # sys arg 1 - template name
    template_upload_status = upload_nifi_template(processor_group_name)
    if template_upload_status == True:
        logging.info("Successfully uploaded the template.")
    else:
        print(template_upload_status)

    # 2. Instantiate template
    logging.info("Instatiating the template.")
    instantiate_template(processor_group_name)

    #  3. Create parameters
    params = get_json_file(prop.NIFI_STATIC_PARAMETER_DIRECTORY_PATH + 'parameters_files_static_list.json')

    # read the parameter file created by Ansible using configuration
    logging.info("Reading dynamic parameters from file %s.json", parameter_context_name)
    f = open(f'{prop.NIFI_PARAMETER_DIRECTORY_PATH}{parameter_context_name}.json', "rb")
    parameter_body = json.loads(f.read())

    # Load parameters from file to Nifi parameters
    if (params.get(parameter_context_name)) and (parameter_context_name != 'cQube_data_storage_parameters'):
        logging.info("Reading static parameters from file %s.txt", parameter_context_name)
        parameter_body = update_nifi_params.nifi_params_config(parameter_context_name,
                                                               f'{prop.NIFI_STATIC_PARAMETER_DIRECTORY_PATH}{params.get(parameter_context_name)}',
                                                               parameter_body)
    create_parameter(parameter_context_name, parameter_body)

    # Load dynamic Jolt spec from db to Nifi parameters
    dynamic_jolt_params_pg = ['composite_parameters',
                              'infra_parameters', 'udise_parameters']
    if sys.argv[2] in dynamic_jolt_params_pg:
        logging.info("Creating dynamic jolt parameters")
        update_jolt_params.update_nifi_jolt_params(parameter_context_name)

    # 4. Link parameter context to processor group
    logging.info("Linking parameter context with processor group")
    link_parameter_with_processor_group(processor_group_name, parameter_context_name)

    # 5. Create controller services
    if int(arg4) != 0:
        logging.info("Creating distributed server")
        print(create_controller_service(processor_group_name, arg4))

    # 6. Add sensitive value to controller services
    logging.info("Adding sensitive properties in controller services")
    controller_list_all = get_json_file(prop.NIFI_STATIC_PARAMETER_DIRECTORY_PATH + 'controller_list.json')

    if controller_list_all.get(processor_group_name):
        for controller in controller_list_all.get(processor_group_name):
            print(update_controller_service_property(processor_group_name, controller))

    # 7. Enable controller service
    logging.info("Enabling Controller services")
    controller_service_enable(processor_group_name)
    logging.info("***Successfully Loaded template and enabled controller services***")

    # Connect_nifi_processors:
    # Main.
    """[summary]
    sys arguments = 1. cQube_raw_data_fetch processor name 2. transformer processor group name.
    Ex: python connect_nifi_processors.py cQube_raw_data_fetch_static static_data_processor
    """
    header = {"Content-Type": "application/json"}
    source_pg = arg3.strip()
    destination_pg = arg1.strip()

    logging.info('Connection between PORTS started...')
    if 'composite_transformer' in destination_pg or 'progress_card_transformer' in destination_pg:
        logging.info("Processor group=", destination_pg)
    else:
        res_1 = connect_output_input_port(source_pg, destination_pg)

    res_2 = connect_output_input_port(destination_pg, source_pg)
    logging.info('Successfully Connection done between PORTS.')

def install_cqube_datastorage(arg1,arg2,arg3):
    """
    sys_arguments 1.cQube_data_storage
                  2.cQube_data_storage_parameters
                  3.4559
    """

    # deploy_nifi main

    nifi_root_pg_id = ''
    processor_group = ''
    header = {"Content-Type": "application/json"}

    processor_group_name = arg1
    parameter_context_name = arg2
    logging.info("Uploading Template to Nifi......")
    # 1.  Upload nifi template  # sys arg 1 - template name
    template_upload_status = upload_nifi_template(processor_group_name)
    if template_upload_status == True:
        logging.info("Successfully uploaded the template.")
    else:
        print(template_upload_status)

    # 2. Instantiate template
    logging.info("Instatiating the template.")
    instantiate_template(processor_group_name)

    #  3. Create parameters
    params = get_json_file(prop.NIFI_STATIC_PARAMETER_DIRECTORY_PATH + 'parameters_files_static_list.json')

    # read the parameter file created by Ansible using configuration
    logging.info("Reading dynamic parameters from file %s.json", parameter_context_name)
    f = open(f'{prop.NIFI_PARAMETER_DIRECTORY_PATH}{parameter_context_name}.json', "rb")
    parameter_body = json.loads(f.read())

    # Load parameters from file to Nifi parameters
    if (params.get(parameter_context_name)) and (parameter_context_name != 'cQube_data_storage_parameters'):
        logging.info("Reading static parameters from file %s.txt", parameter_context_name)
        parameter_body = update_nifi_params.nifi_params_config(parameter_context_name,
                                                               f'{prop.NIFI_STATIC_PARAMETER_DIRECTORY_PATH}{params.get(parameter_context_name)}',
                                                               parameter_body)
    create_parameter(parameter_context_name, parameter_body)

    # Load dynamic Jolt spec from db to Nifi parameters
    dynamic_jolt_params_pg = ['composite_parameters',
                              'infra_parameters', 'udise_parameters']
    if arg2 in dynamic_jolt_params_pg:
        logging.info("Creating dynamic jolt parameters")
        update_jolt_params.update_nifi_jolt_params(parameter_context_name)

    # 4. Link parameter context to processor group
    logging.info("Linking parameter context with processor group")
    link_parameter_with_processor_group(processor_group_name, parameter_context_name)

    # 5. Create controller services
    if int(arg3) != 0:
        logging.info("Creating distributed server")
        print(create_controller_service(processor_group_name, sys.argv[3]))

    # 6. Add sensitive value to controller services
    logging.info("Adding sensitive properties in controller services")
    controller_list_all = get_json_file(prop.NIFI_STATIC_PARAMETER_DIRECTORY_PATH + 'controller_list.json')

    if controller_list_all.get(processor_group_name):
        for controller in controller_list_all.get(processor_group_name):
            print(update_controller_service_property(processor_group_name, controller))

    # 7. Enable controller service
    logging.info("Enabling Controller services")
    controller_service_enable(processor_group_name)
    logging.info("***Successfully Loaded template and enabled controller services***")

def dummy_connections(arg1,arg2,arg3):
    """
    sys arguments 1. cQube_data_storage processor name
                  2. processor name (cqube_telemetry_transformer)
                  3. state (Running)
    """
    # nifi_dummy_connection_creator:
    # Main.
    """[summary]

    sys arguments = 1. cQube_data_storage processor name . Run this code after installing required data sources.
    Ex: python nifi_dummy_connection_creator.py cQube_data_storage
    """
    header = {"Content-Type": "application/json"}
    data_storage_proccesor_name = arg1

    # create dummy connection for un selection data source
    dummy_connection_creator(data_storage_proccesor_name)
    logging.info('Successfully completed all the connections between processor groups')

    # nifi_start_pg:
    # Main.
    """[summary]
    sys arguments = 1.  processor group name .  Run this code after installing required data sources, 
    starts the processor group
    Ex: python nifi_start_pg.py cqube_telemetry_transformer 
    """
    header = {"Content-Type": "application/json"}
    processor_group_name = arg2
    state = arg3

    # enable/disable/start/stop the processor group
    start_processor_group(processor_group_name, state)

if __name__ == "__main__":
    header = {"Content-Type": "application/json"}
    print("length=", len(sys.argv))
    if len(sys.argv) <= 4:
        data_source_name = sys.argv[1]
        parameter_context_name = sys.argv[2]
        data_storage = sys.argv[3]
        distributed_server_port = sys.argv[4]
        install_trans_aggre_datasources(data_source_name,parameter_context_name,data_storage,distributed_server_port)

    if len(sys.argv) >= 5 :
        data_source_name = sys.argv[1]
        parameter_context_name = sys.argv[2]
        data_storage = sys.argv[3]
        distributed_server_port = sys.argv[4]
        storage_type = sys.argv[5]
        if sys.argv[6] != 'cQube_data_storage':
            data_set = sys.argv[6]
            emission_method = sys.argv[7]
            # disable processor based on emission method.
            diksha_enable_disable_processor(processor_group_name.lower(), storage_type.lower(), dataset.lower(),
                                                emission_method.lower())
        else:
            install_datasource(data_source_name, parameter_context_name, parameter_context_name, distributed_server_port,
                               storage_type)

    if sys.argv[6] == 'cQube_data_storage':
        cQube_data_storage = sys.argv[6]
        cQube_data_storage_parameters = sys.argv[7]
        distributed_server_port_data = sys.argv[8]
        install_cqube_datastorage(cQube_data_storage,cQube_data_storage_parameters,distributed_server_port_data)
    if sys.argv[1] == 'cQube_data_storage':
        cQube_data_storage_processor_name = sys.argv[1]
        processor_name = sys.argv[2]
        state= sys.argv[3]
        dummy_connections(cQube_data_storage_processor_name,processor_name,state)
