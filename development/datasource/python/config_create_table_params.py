import csv
import sys
import pandas as pd
import configparser
import yaml
import os
from yaml.loader import SafeLoader
import psycopg2
import json

config = configparser.ConfigParser()
config.read('configurable_datasource_path_config.ini')
path = config['DEFAULT']['path']


def read_input():
    if len(sys.argv[1:]) > 0:
        input_file_path = sys.argv[1]
        data_source_name = input_file_path.split('/').pop()
        global file_name
        global file_name_sql
        file_name = data_source_name.split('.')[0]
        file = open(input_file_path)
        file_name_sql = file_name
        return file

def create_parameters_queries():
    input_df = pd.read_csv(read_input())
    keywords = input_df['keywords'].dropna().tolist()
    mycsv = []
    key_index = 0
    key = keywords[key_index]
    table_names = ''
    validation_queries = ''
    global all_param_queries
    all_param_queries = ''
    for row in csv.reader(read_input()):
        if row[0] == key:
            if 'trans' in row[0]:
                df = pd.DataFrame(mycsv)
                new_header = df.iloc[0].str.strip().str.lower()
                df.replace("", float("NaN"), inplace=True)
                df.dropna(how='all', inplace=True)
                df = df[1:]
                if df[2:].empty:
                    del df
                else:
                    df.columns = new_header
                    table_names = df['table_name'].dropna().to_string(index=False).strip()
                    raw_columns = df['columns'].dropna().tolist()
                    columns = []
                    for column in (raw_columns):
                        columns1 = ''
                        columns2 = ''
                        if column.isdigit() is True:
                            columns1 = 'day_' + column
                        else:
                            columns2 = column.replace(" ", "_")
                        final = columns2 + columns1
                        columns.append(final)
                    for i in range(len(columns)):
                        columns[i] = columns[i] + ','
                    new_column = columns
                    new_column[-1] = new_column[-1].replace(',', '')
                    same_columns = df['columns'].dropna().tolist()
                    for i in range(len(same_columns)):
                        same_columns[i] = 'b.' + same_columns[i] + ','
                    same_id = ''.join(same_columns)
                    data_types = df['data_type']
                    ref_table_df = df['ref_table'].dropna().to_list()
                    ref_col_df = df['ref_column'].dropna()
                    null_validation_df = df[df['null_validation_required'] == 'Yes']
                    null_validation_columns = null_validation_df['columns'].tolist()
                    check_same_id = df[df['check_same_id'] == 'Yes']
                    check_same_id_columns = check_same_id['columns'].tolist()
                    for i in range(len(check_same_id_columns)):
                        check_same_id_columns[i] = check_same_id_columns[i] + ','
                    columns_check_id = ''.join(check_same_id_columns)
                    no_of_columns = len(columns)
                    foriegn_key_df2 = df[df['constraints'] == 'foreign key']
                    f_k_columns_l = foriegn_key_df2['columns'].to_list()
                    f_k_columns = ','.join(f_k_columns_l)
                    # Check if null query
                    query1 = ''
                    query2 = ''
                    check_if_null_query = ''
                    for num in (null_validation_columns):
                        query1 = ''
                        if null_validation_columns.index(num) == 0:
                            query1 = query1 + '{ "check_if_null":"""select * from ' + table_names + '_staging_1 where '

                        if null_validation_columns.index(num) == len(null_validation_columns) - 1:
                            query2 = num + ' is null """,'
                        else:
                            query2 = num + ' is null or '
                        final = query1 + query2
                        check_if_null_query = check_if_null_query + final
                    # Saving duplicates
                    save_dup = '"save_to_dup_table":"""' + table_names.strip() + '_dup""",'
                    # Delete null values query
                    delete_null_values_qry = ''
                    for num in (null_validation_columns):
                        query1 = ''
                        if null_validation_columns.index(num) == 0:
                            query1 = '"delete_null_values_qry":"""delete from ' + table_names + '_staging_1 where '

                        if null_validation_columns.index(num) == len(null_validation_columns) - 1:
                            query2 = num + ' is null """,'
                        else:
                            query2 = num + ' is null or '
                        final = query1 + query2
                        delete_null_values_qry = delete_null_values_qry + final
                    # queries_filename
                    queries_filename = '"queries_filename":"""emission_app/python/postgres/' + table_names + '/report_queries.json""",'

                    # staging_1_tb_name
                    staging_1_tb_name = '"staging_1_tb_name":"""' + table_names.strip() + '_staging_1""",'

                    # Update Null log to db
                    query1 = ''
                    query2 = ''
                    query4 = ''
                    global alter_log_summary
                    alter_log_summary = ''
                    for num in (null_validation_columns):

                        alter_log_summary += 'alter table log_summary add COLUMN if not exists ' + num + ' int;'

                        if null_validation_columns.index(num) == 0:
                            query1 = '"null_to_log_db":"""update log_summary SET '
                        if null_validation_columns.index(num) == len(null_validation_columns) - 1:
                            query2 += num + '=' + table_names + '_null_col.count_null_' + num
                        else:
                            query4 += num + '=' + table_names + '_null_col.count_null_' + num + ','

                    query3 = ', count_of_null_rows = ' + table_names + '_null_col.count_of_null_rows from ' + table_names + '_null_col where ' + table_names + '_null_col.ff_uuid = log_summary.ff_uuid""",'
                    null_to_log_db = query1 + query4 + query2 + query3

                    # stg2 to temp query
                    clmn = ''.join(columns)
                    clmns = ''.join(new_column)
                    q1 = '"stg_2_to_temp_qry": """ insert into ' + table_names + '_temp('
                    stg_2_to_temp_query = q1 + clmn + ',ff_uuid) select ' + clmn + ',ff_uuid' ' from ' + table_names + '_staging_2 """,'
                    val_same_id = ''.join(check_same_id_columns)
                    # check_same_id
                    check_same_id_qry = '"check_same_id_records":"""SELECT ' + same_id + 'b.ff_uuid,count(*) num_of_times from (select sas.*,count(*) over (PARTITION by ' + val_same_id + 'ff_uuid) as cnt from ' + table_names + '_staging_2  sas ) b where cnt>1 group by ' + same_id + 'b.ff_uuid,b.cnt;""",'

                    # normalize
                    query_check1 = ''
                    for check_norm_col in raw_columns:
                        if ('year' in check_norm_col) or ('date' in check_norm_col) or ('month' in check_norm_col):
                            query_check1 += '"' + check_norm_col + '",'
                        else:
                            query_check1 += check_norm_col + ','

                    if query_check1.endswith(','):
                        query_check1 = query_check1[:-1]
                    normalize = '"normalize":"""select ' + query_check1 + ' from flowfile""",'

                    # Datatype check

                    dtype_check = {
                        "bigint": "Optional(parseLong())",
                        "varchar": "Optional(StrNotNullOrEmpty())",
                        "text": "Optional(StrNotNullOrEmpty())",
                        "int": "Optional(ParseInt())",
                        "date": "Optional(ParseDate(\"yyyy-MM-dd\"))"
                    }
                    d_type1 = ''
                    for d_type in data_types:
                        d_type = d_type.lower()
                        if d_type.__contains__('varchar'):
                            d_type = d_type.split('(')[0]
                            d_type1 += dtype_check[d_type] + ','
                        else:
                            d_type1 += dtype_check[d_type] + ','

                    if d_type1.endswith(','):
                        d_type1 = d_type1[:-1]

                    data_type_check = '"schema":"""' + d_type1 + '""",'
                    # print(data_type_check)

                    # temp_trans_aggregation queries
                    temp_trans_aggregation_queries = '"temp_trans_aggregation_queries":"""temp_trans_aggregation_queries.json""",'
                    # print(temp_trans_aggregation_queries)

                    # Sum of Duplicates
                    sum_of_dup = '"sum_of_dup":"""select sum(num_of_times) from flowfile""",'

                    # unique_record_same_id
                    unique_record_same_id = '"unique_record_same_id":"""insert into ' + table_names + '_temp(' + clmn + ',ff_uuid) select ' + clmn + ',ff_uuid from (select ' + clmn + ',ff_uuid, count(*) over (partition by ' + columns_check_id + 'ff_uuid) as rn  from ' + table_names + '_staging_2)as a where a.rn=1""",'

                    # stg_1_to_stg_2_qry
                    stg_1_to_stg_2_qry = '" stg_1_to_stg_2_qry ":"""insert into ' + table_names + '_staging_2(' + clmn + ',ff_uuid) select ' + clmn + ',ff_uuid from ' + table_names + '_staging_1""",'

                    # save_null_tb_name
                    save_null_tb_name = '"save_null_tb_name":"""' + table_names + '_null_col""",'

                    # check_same_records
                    check_same_records = '"check_same_records":"""SELECT ' + clmn + ',ff_uuid,count(*)-1 num_of_times FROM ' + table_names + '_staging_1 GROUP BY ' + clmn + ',ff_uuid HAVING  COUNT(*) > 1""",'

                    # datasource_name
                    datasource_name = '"datasource_name":"""' + table_names + '""",'

                    # count_null_value
                    query4 = ''
                    query5 = ''
                    query6 = ''
                    qur_null = ''
                    for num in (null_validation_columns):
                        if null_validation_columns.index(num) == 0:
                            query4 += '"count_null_value":"""(select '
                            query6 += 'sum(case when '
                        if null_validation_columns.index(num) == len(null_validation_columns) - 1:
                            query5 += 'SUM(CASE when ' + num + ' IS NULL THEN 1 ELSE 0 END) AS count_null_' + num + ','
                            qur_null += num + ' is null then 1 else 0 end ) as count_of_null_rows from ' + table_names + '_staging_1)""",'
                        else:
                            query5 += 'SUM(CASE when ' + num + ' IS NULL THEN 1 ELSE 0 END) AS count_null_' + num + ','
                            qur_null += num + ' is null or '
                    count_null_value = query4 + query5 + query6 + qur_null

                    # date_column
                    date_column = ''
                    for date in raw_columns:
                        if date.__contains__('date'):
                            # date_column += '"date_column":"""' + date + '""",'
                            date_column += date + ','
                            # print(type(date_column))
                    date_column1 = [date_column[0:-1]]
                    date_column2 = str(date_column1).replace("['", "'").replace(',', "','").replace("']", "'")
                    date_column = '"date_column":"""[' + date_column2 + ']""",'

                    # select_files_from__log_db
                    select_files_from_log_db = '"select_files_from_log_db":"""select * from log_summary where filename like' "'" + table_names + "%'"'""",'

                    # unique_records_same_records
                    unique_records_same_records = '"unique_records_same_records":"""insert into ' + table_names + '_staging_2(' + clmn + ',ff_uuid) select ' + clmn + ',ff_uuid from ( SELECT ' + clmn + ',ff_uuid, row_number() over (partition by ' + clmn + ',ff_uuid) as rn from ' + table_names + '_staging_1) sq Where rn =1""",'
                    validation_queries = check_if_null_query + date_column + select_files_from_log_db + save_dup + datasource_name + delete_null_values_qry + queries_filename + staging_1_tb_name + null_to_log_db + stg_2_to_temp_query + check_same_id_qry + normalize + data_type_check + temp_trans_aggregation_queries + sum_of_dup + unique_record_same_id + stg_1_to_stg_2_qry + save_null_tb_name + check_same_records + count_null_value + unique_records_same_records

            elif 'type_of_data' in row[0]:
                df_agg = pd.DataFrame(mycsv)
                df_agg.replace("", float("NaN"), inplace=True)
                df_agg.dropna(how='all', inplace=True)
                new_header = df_agg.iloc[0].str.strip().str.lower()
                df_agg.columns = new_header
                df_agg = df_agg[1:]

                if df_agg.empty:
                    del df_agg
                else:
                    select_column = df_agg['nifi_select_columns'].dropna().unique()
                    # jolt_spec_district
                    qu1 = ''
                    qu = '"jolt_spec_district":"""[{"operation": "shift","spec": {"*": {"district_id": "data.[&1].district_id","district_name": "data.[&1].district_name","percentage": "data.[&1].percentage","district_latitude": "data.[&1].district_latitude","district_longitude": "data.[&1].district_longitude","data_from_date": "data.[&1].data_from_date","data_upto_date": "data.[&1].data_upto_date",'
                    for sel_col in select_column:
                        if sel_col != 'school_id':
                            qu1 += '"' + sel_col + '": "data.[&1].' + sel_col + '",'
                    qu2 = '"school_management_type": "data.[&1].school_management_type","school_category": "data.[&1].school_category","@' + table_names + '_count": "data.[&1].' + table_names + '_count","@total_schools": "data.[&1].total_schools",''"' + table_names + '_count": "allDistrictsFooter.' + table_names + '[]","total_schools": "allDistrictsFooter.schools[]"}}},{"operation": "modify-overwrite-beta","spec": {"*": {"' + table_names + '": "=intSum(@(1,' + table_names + '))","schools": "=intSum(@(1,schools))"}}}]""",'
                    district_jolt = qu + qu1 + qu2

                    # exception_block_jolt_spec
                    qu4 = ''
                    qu6 = ''
                    qu8 = ''
                    qu3 = '"exception_block_jolt_spec":"""[{"operation": "shift","spec": {"*": {"block_latitude": "data.[&1].block_latitude","block_longitude": "data.[&1].block_longitude","district_id": "data.[&1].district_id","district_name": "data.[&1].district_name","block_id": "data.[&1].block_id","block_name": "data.[&1].block_name","data_from_date": "data.[&1].data_from_date","data_upto_date": "data.[&1].data_upto_date",'
                    for sel_col in select_column:
                        if sel_col != 'school_id':
                            qu4 += '"' + sel_col + '": "data.[&1].' + sel_col + '",'
                    qu5 = '"school_management_type": "data.[&1].school_management_type","total_schools": "data.[&1].total_schools","percentage_schools_with_missing_data": "data.[&1].percentage_schools_with_missing_data","@total_schools_with_missing_data": "data.[&1].total_schools_with_missing_data","total_schools_with_missing_data": "footer.@(1,district_id).total_schools_with_missing_data"}}},{"operation": "modify-overwrite-beta","spec": {"footer": {"*": {"total_schools_with_missing_data": "=intSum(@(1,total_schools_with_missing_data))"}}}},{"operation": "shift","spec": {"data": {"*": {"block_latitude": "data.[&1].block_latitude","block_longitude": "data.[&1].block_longitude","district_id": "data.[&1].district_id","district_name": "data.[&1].district_name","block_id": "data.[&1].block_id","block_name": "data.[&1].block_name","data_from_date": "data.[&1].data_from_date","data_upto_date": "data.[&1].data_upto_date",'
                    for sel_col in select_column:
                        if sel_col != 'school_id':
                            qu6 += '"' + sel_col + '": "data.[&1].' + sel_col + '",'
                    qu7 = '"school_management_type": "data.[&1].school_management_type","total_schools": "data.[&1].total_schools","@total_schools_with_missing_data": "data.[&1].total_schools_with_missing_data","total_schools_with_missing_data": "allBlocksFooter.total_schools_with_missing_data[]","percentage_schools_with_missing_data": "data.[&1].percentage_schools_with_missing_data","semester": "data.[&1].semester"}},"footer": "&"}},{"operation": "modify-overwrite-beta","spec": {"*": {"total_schools_with_missing_data": "=intSum(@(1,total_schools_with_missing_data))"}}},{"operation": "shift","spec": {"data": {"*": {"block_latitude": "data.[&1].block_latitude","block_longitude": "data.[&1].block_longitude","district_id": "data.[&1].district_id","district_name": "data.[&1].district_name","block_id": "data.[&1].block_id","block_name": "data.[&1].block_name","data_from_date": "data.[&1].data_from_date","data_upto_date": "data.[&1].data_upto_date",'
                    for sel_col in select_column:
                        if sel_col != 'school_id':
                            qu8 += '"' + sel_col + '": "data.[&1].' + sel_col + '",'
                    qu9 = '"school_management_type": "data.[&1].school_management_type","total_schools": "data.[&1].total_schools","total_schools_with_missing_data": "data.[&1].total_schools_with_missing_data","percentage_schools_with_missing_data": "data.[&1].percentage_schools_with_missing_data"}},"footer": "&","allBlocksFooter": "&"}}]""",'
                    exception_block_jolt_spec = qu3 + qu4 + qu5 + qu6 + qu7 + qu8 + qu9

                    # school_timeseries_jolt_spec
                    qur80 = ''
                    qur84 = ''
                    for sel_col in select_column:
                        if sel_col != 'school_id':
                            qur80 += '"' + sel_col + '": "data.[&1].' + sel_col + '",'
                    qur82 = '"school_timeseries_jolt_spec":"""[{"operation": "modify-overwrite-beta","spec": {"*": {"cluster_id": ["=toString",null]}}},{"operation": "shift","spec": {"*": {"school_id": "data.[&1].school_id","school_name": "data.[&1].school_name","cluster_id": "data.[&1].cluster_id","cluster_name": "data.[&1].cluster_name","crc_name": "data.[&1].crc_name","district_id": "data.[&1].district_id","district_name": "data.[&1].district_name","block_id": "data.[&1].block_id","block_name": "data.[&1].block_name","percentage": "data.[&1].percentage","school_latitude": "data.[&1].school_latitude","school_longitude": "data.[&1].school_longitude","data_from_date": "data.[&1].data_from_date",'
                    for sel_col in select_column:
                        if sel_col != 'school_id':
                            qur84 += '"' + sel_col + '": "data.[&1].' + sel_col + '",'
                    qur83 = '"data_upto_date": "data.[&1].data_upto_date","@students_count": "data.[&1].students_count","@total_schools": "data.[&1].total_schools","students_count": "footer.@(1,cluster_id).students[]","total_schools": "footer.@(1,cluster_id).schools[]"}}},{"operation": "modify-overwrite-beta","spec": {"footer": {"*": {"students": "=intSum(@(1,students))","schools": "=intSum(@(1,schools))"}}}},{"operation": "shift","spec": {"data": {"*": {"school_id": "data.[&1].school_id","school_name": "data.[&1].school_name","cluster_id": "data.[&1].cluster_id","cluster_name": "data.[&1].cluster_name","crc_name": "data.[&1].crc_name","district_id": "data.[&1].district_id","district_name": "data.[&1].district_name","block_id": "data.[&1].block_id","block_name": "data.[&1].block_name","percentage": "data.[&1].percentage","school_latitude": "data.[&1].school_latitude","school_longitude": "data.[&1].school_longitude",'
                    qur81 = '"data_from_date": "data.[&1].data_from_date","data_upto_date": "data.[&1].data_upto_date","@students_count": "data.[&1].students_count","@total_schools": "data.[&1].total_schools","students_count": "allSchoolsFooter.students[]","total_schools": "allSchoolsFooter.schools[]"}},"footer": "&"}},{"operation": "modify-overwrite-beta","spec": {"*": {"students": "=intSum(@(1,students))","schools": "=intSum(@(1,schools))"}}}]""",'
                    school_timeseries_jolt_spec = qur82 + qur80 + qur83 + qur84 + qur81
                    # raw_district_jolt_spec
                    raw_district_jolt_spec = '"raw_district_jolt_spec":"""[{"operation":"shift","spec":{"*":{"district_id":"[&1].District ID","district_name":"[&1].District Name","academic_year":"[&1].Academic Year","' + table_names + '_percent_june":"[&1].' + table_names + ' (%) June","' + table_names + '_count_june":"[&1].Total ' + table_names + ' June","total_schools_june":"[&1].Total Schools June","' + table_names + '_percent_july":"[&1].' + table_names + ' (%) July","' + table_names + '_count_july":"[&1].Total ' + table_names + ' July","total_schools_july":"[&1].Total Schools July","' + table_names + '_percent_august":"[&1].' + table_names + ' (%) August","' + table_names + '_count_august":"[&1].Total ' + table_names + ' August","total_schools_august":"[&1].Total Schools August","' + table_names + '_percent_september":"[&1].' + table_names + ' (%) September","' + table_names + '_count_september":"[&1].Total ' + table_names + ' September","total_schools_september":"[&1].Total Schools September","' + table_names + '_percent_october":"[&1].' + table_names + ' (%) October","' + table_names + '_count_october":"[&1].Total ' + table_names + ' October","total_schools_october":"[&1].Total Schools October","' + table_names + '_percent_november":"[&1].' + table_names + ' (%) November","' + table_names + '_count_november":"[&1].Total ' + table_names + ' November","total_schools_november":"[&1].Total Schools November","' + table_names + '_percent_december":"[&1].' + table_names + ' (%) December","' + table_names + '_count_december":"[&1].Total ' + table_names + ' December","total_schools_december":"[&1].Total Schools December","' + table_names + '_percent_january":"[&1].' + table_names + ' (%) January","' + table_names + '_count_january":"[&1].Total ' + table_names + ' January","total_schools_january":"[&1].Total Schools January","' + table_names + '_percent_february":"[&1].' + table_names + ' (%) February","' + table_names + '_count_february":"[&1].Total ' + table_names + ' February","total_schools_february":"[&1].Total Schools February","' + table_names + '_percent_march":"[&1].' + table_names + ' (%) March","' + table_names + '_count_march":"[&1].Total ' + table_names + ' March","total_schools_march":"[&1].Total Schools March","' + table_names + '_percent_april":"[&1].' + table_names + ' (%) April","' + table_names + '_count_april":"[&1].Total ' + table_names + ' April","total_schools_april":"[&1].Total Schools April","' + table_names + '_percent_may":"[&1].' + table_names + ' (%) May","' + table_names + '_count_may":"[&1].Total ' + table_names + ' May","total_schools_may":"[&1].Total Schools May"}}}]""",'
                    # jolt_line_chart_state
                    jolt_line_chart_state = '"jolt_line_chart_state":"""[{"operation":"shift","spec":{"*":{"percentage":"' + table_names + '.[&1].' + table_names + '_percentage","' + table_names + '_count":"' + table_names + '.[&1].' + table_names + '_count","total_schools":"' + table_names + '.[&1].total_schools","month":"' + table_names + '.[&1].month","year":"' + table_names + '.[&1].year"}}},{"operation":"shift","spec":{"' + table_names + '":{"*":{"@":"@(1,year)[]"}}}}]""",'

                    # jolt_spec_cluster
                    qur1 = ''
                    qur3 = ''
                    qur = '"jolt_spec_cluster":"""[{"operation": "shift","spec": {"*": {"cluster_id": "data.[&1].cluster_id","cluster_name": "data.[&1].cluster_name","district_id": "data.[&1].district_id","district_name": "data.[&1].district_name","block_id": "data.[&1].block_id","block_name": "data.[&1].block_name","percentage": "data.[&1].percentage","cluster_latitude": "data.[&1].cluster_latitude","cluster_longitude": "data.[&1].cluster_longitude","data_from_date": "data.[&1].data_from_date","data_upto_date": "data.[&1].data_upto_date",'
                    for sel_col in select_column:
                        if sel_col != 'school_id':
                            qur1 += '"' + sel_col + '": "data.[&1].' + sel_col + '",'
                    qur2 = '"school_management_type": "data.[&1].school_management_type","school_category": "data.[&1].school_category","@' + table_names + '_count": "data.[&1].' + table_names + '_count","@total_schools": "data.[&1].total_schools","' + table_names + '_count": "footer.@(1,block_id).' + table_names + '[]","total_schools": "footer.@(1,block_id).schools[]"}}},{"operation": "modify-overwrite-beta","spec": {"footer": {"*": {"' + table_names + '": "=intSum(@(1,' + table_names + '))","schools": "=intSum(@(1,schools))"}}}},{"operation": "shift","spec": {"data": {"*": {"cluster_id": "data.[&1].cluster_id","cluster_name": "data.[&1].cluster_name","district_id": "data.[&1].district_id","district_name": "data.[&1].district_name","block_id": "data.[&1].block_id","block_name": "data.[&1].block_name","percentage": "data.[&1].percentage","cluster_latitude": "data.[&1].cluster_latitude","cluster_longitude": "data.[&1].cluster_longitude","data_from_date": "data.[&1].data_from_date","data_upto_date": "data.[&1].data_upto_date",'
                    for sel_col in select_column:
                        if sel_col != 'school_id':
                            qur3 += '"' + sel_col + '": "data.[&1].' + sel_col + '",'
                    qur4 = '"school_management_type": "data.[&1].school_management_type","school_category": "data.[&1].school_category","@' + table_names + '_count": "data.[&1].' + table_names + '_count","@total_schools": "data.[&1].total_schools","' + table_names + '_count": "allClustersFooter.' + table_names + '[]","total_schools": "allClustersFooter.schools[]"}},"footer": "&"}},{"operation": "modify-overwrite-beta","spec": {"*": {"' + table_names + '": "=intSum(@(1,' + table_names + '))","schools": "=intSum(@(1,schools))"}}}]""",'
                    jolt_spec_cluster = qur + qur1 + qur2 + qur3 + qur4

                    # raw_school_jolt_spec
                    raw_school_jolt_spec = '"raw_school_jolt_spec":"""[{"operation": "shift","spec": {"*": {"school_id": "[&1].Schools ID","school_name": "[&1].Schools Name","cluster_id": "[&1].Cluster ID","cluster_name": "[&1].Cluster Name","block_id": "[&1].Block ID","block_name": "[&1].Block Name","district_id": "[&1].District ID","district_name": "[&1].District Name","academic_year": "[&1].Academic Year","' + table_names + '_percent_june": "[&1].' + table_names + ' (%) June","' + table_names + '_count_june": "[&1].Total ' + table_names + ' June","total_schools_june": "[&1].Total Schools June","' + table_names + '_percent_july": "[&1].' + table_names + ' (%) July","' + table_names + '_count_july": "[&1].Total ' + table_names + ' July","total_schools_july": "[&1].Total Schools July","' + table_names + '_percent_august": "[&1].' + table_names + ' (%) August","' + table_names + '_count_august": "[&1].Total ' + table_names + ' August","total_schools_august": "[&1].Total Schools August","' + table_names + '_percent_september": "[&1].' + table_names + ' (%) September","' + table_names + '_count_september": "[&1].Total ' + table_names + ' September","total_schools_september": "[&1].Total Schools September","' + table_names + '_percent_october": "[&1].' + table_names + ' (%) October","' + table_names + '_count_october": "[&1].Total ' + table_names + ' October","total_schools_october": "[&1].Total Schools October","' + table_names + '_percent_november": "[&1].' + table_names + ' (%) November","' + table_names + '_count_november": "[&1].Total ' + table_names + ' November","total_schools_november": "[&1].Total Schools November","' + table_names + '_percent_december": "[&1].' + table_names + ' (%) December","' + table_names + '_count_december": "[&1].Total ' + table_names + ' December","total_schools_december": "[&1].Total Schools December","' + table_names + '_percent_january": "[&1].' + table_names + ' (%) January","' + table_names + '_count_january": "[&1].Total ' + table_names + ' January","total_schools_january": "[&1].Total Schools January","' + table_names + '_percent_february": "[&1].' + table_names + ' (%) February","' + table_names + '_count_february": "[&1].Total ' + table_names + ' February","total_schools_february": "[&1].Total Schools February","' + table_names + '_percent_march": "[&1].' + table_names + ' (%) March","' + table_names + '_count_march": "[&1].Total ' + table_names + ' March","total_schools_march": "[&1].Total Schools March","' + table_names + '_percent_april": "[&1].' + table_names + ' (%) April","' + table_names + '_count_april": "[&1].Total ' + table_names + ' April","total_schools_april": "[&1].Total Schools April","' + table_names + '_percent_may": "[&1].' + table_names + ' (%) May","' + table_names + '_count_may": "[&1].Total ' + table_names + ' May","total_schools_may": "[&1].Total Schools May"}}}]""",'

                    # jolt_line_chart_block
                    qur6 = ''
                    qur5 = '"jolt_line_chart_block":"""[{"operation": "shift","spec": {"*": {"block_id": "[&1].block_id","block_name": "[&1].block_name","percentage": "[&1].' + table_names + '.' + table_names + '_percentage",'
                    for sel_col in select_column:
                        if sel_col != 'school_id':
                            qur6 += '"' + sel_col + '": "data.[&1].' + sel_col + '",'
                    qur7 = '"' + table_names + '_count": "[&1].' + table_names + '.' + table_names + '_count","total_schools": "[&1].' + table_names + '.total_schools"}}}, {"operation": "shift","spec": {"*": {"@block_name": "@(1,block_id).block_name[]","@' + table_names + '": "@(1,block_id).' + table_names + '[]"}}}]""",'
                    jolt_line_chart_block = qur5 + qur6 + qur7

                    # jolt_line_chart_district
                    qur9 = ''
                    qur8 = '"jolt_line_chart_district":"""[{"operation": "shift","spec": {"*": {"district_id": "[&1].district_id","district_name": "[&1].district_name","percentage": "[&1].' + table_names + '.' + table_names + '_percentage",'
                    for sel_col in select_column:
                        if sel_col != 'school_id':
                            qur9 += '"' + sel_col + '": "data.[&1].' + sel_col + '",'
                    qur10 = '"' + table_names + '_count": "[&1].' + table_names + '.' + table_names + '_count","total_schools": "[&1].' + table_names + '.total_schools"}}}, {"operation": "shift","spec": {"*": {"@district_name": "@(1,district_id).district_name[]","@' + table_names + '": "@(1,district_id).' + table_names + '[]"}}}]""",'
                    jolt_line_chart_district = qur8 + qur9 + qur10

                    # transform_district_wise
                    qur12 = ''
                    qur11 = '"transform_district_wise":"""[{"operation": "shift","spec": {"*": {"district_id": "data.[&1].district_id","district_name": "data.[&1].district_name","percentage": "data.[&1].percentage","district_latitude": "data.[&1].district_latitude","district_longitude": "data.[&1].district_longitude","data_from_date": "data.[&1].data_from_date","data_upto_date": "data.[&1].data_upto_date",'
                    for sel_col in select_column:
                        if sel_col != 'school_id':
                            qur12 += '"' + sel_col + '": "data.[&1].' + sel_col + '",'
                    qur13 = '"@students_count": "data.[&1].students_count","@total_schools": "data.[&1].total_schools","students_count": "allDistrictsFooter.students[]","total_schools": "allDistrictsFooter.schools[]"}}},{"operation": "modify-overwrite-beta","spec": {"*": {"students": "=intSum(@(1,students))","schools": "=intSum(@(1,schools))"}}}]""",'
                    transform_district_wise = qur11 + qur12 + qur13

                    # jolt_line_chart_school
                    qur15 = ''
                    qur14 = '"jolt_line_chart_school":"""[{"operation": "modify-overwrite-beta","spec": {"*": {"school_id": ["=toString", null]}},{"operation": "shift","spec": {"*": {"school_id": "[&1].school_id","school_name": "[&1].school_name","percentage": "[&1].' + table_names + '.' + table_names + '_percentage",'
                    for sel_col in select_column:
                        if sel_col != 'school_id':
                            qur15 += '"' + sel_col + '": "data.[&1].' + sel_col + '",'
                    qur16 = '"' + table_names + '_count": "[&1].' + table_names + '.' + table_names + '_count"}}}, {"operation": "shift","spec": {"*": {"@school_name": "@(1,school_id).school_name[]","@' + table_names + '": "@(1,school_id).' + table_names + '[]"}}}]""",'
                    jolt_line_chart_school = qur14 + qur15 + qur16

                    # jolt_spec_school_management_category_meta
                    jolt_spec_school_management_category_meta = '"jolt_spec_school_management_category_meta":"""[{"operation": "shift","spec": {"*": {"@type": "@(1,category)"}}}]""",'

                    # jolt_spec_school
                    qur18 = ''
                    qur20 = ''
                    qur17 = '"jolt_spec_school":"""[{"operation": "modify-overwrite-beta","spec": {"*": {"cluster_id": ["=toString", null]}}},{"operation": "shift","spec": {"*": {"school_id": "data.[&1].school_id","school_name": "data.[&1].school_name","cluster_id": "data.[&1].cluster_id","cluster_name": "data.[&1].cluster_name","crc_name": "data.[&1].crc_name","district_id": "data.[&1].district_id","district_name": "data.[&1].district_name","block_id": "data.[&1].block_id","block_name": "data.[&1].block_name","percentage": "data.[&1].percentage","school_latitude": "data.[&1].school_latitude","school_longitude": "data.[&1].school_longitude","data_from_date": "data.[&1].data_from_date","data_upto_date": "data.[&1].data_upto_date",'
                    for sel_col in select_column:
                        if sel_col != 'school_id':
                            qur18 += '"' + sel_col + '": "data.[&1].' + sel_col + '",'
                    qur19 = '"school_management_type": "data.[&1].school_management_type","school_category": "data.[&1].school_category","@' + table_names + '_count": "data.[&1].' + table_names + '_count","@total_schools": "data.[&1].total_schools","' + table_names + '_count": "footer.@(1,cluster_id).' + table_names + '[]","total_schools": "footer.@(1,cluster_id).schools[]"}}},{"operation": "modify-overwrite-beta","spec": {"footer": {"*": {"' + table_names + '": "=intSum(@(1,' + table_names + '))","schools": "=intSum(@(1,schools))"}}}}, {"operation": "shift","spec": {"data": {"*": {"school_id": "data.[&1].school_id","school_name": "data.[&1].school_name","cluster_id": "data.[&1].cluster_id","cluster_name": "data.[&1].cluster_name","crc_name": "data.[&1].crc_name","district_id": "data.[&1].district_id","district_name": "data.[&1].district_name","block_id": "data.[&1].block_id","block_name": "data.[&1].block_name","percentage": "data.[&1].percentage","school_latitude": "data.[&1].school_latitude","school_longitude": "data.[&1].school_longitude","data_from_date": "data.[&1].data_from_date","data_upto_date": "data.[&1].data_upto_date",'
                    for sel_col in select_column:
                        if sel_col != 'school_id':
                            qur20 += '"' + sel_col + '": "data.[&1].' + sel_col + '",'
                    qur21 = '"school_management_type": "data.[&1].school_management_type","school_category": "data.[&1].school_category","@' + table_names + '_count": "data.[&1].' + table_names + '_count","@total_schools": "data.[&1].total_schools","' + table_names + '_count": "allSchoolsFooter.' + table_names + '[]","total_schools": "allSchoolsFooter.schools[]"}},"footer": "&"}}, {"operation": "modify-overwrite-beta","spec": {"*": {"' + table_names + '": "=intSum(@(1,' + table_names + '))","schools": "=intSum(@(1,schools))"}}}]""",'
                    jolt_spec_school = qur17 + qur18 + qur19 + qur20 + qur21

                    # exception_district_jolt_spec
                    qur23 = ''
                    qur25 = ''
                    qur22 = '"exception_district_jolt_spec":"""[{"operation": "shift","spec": {"*": {"district_latitude": "data.[&1].district_latitude","district_longitude": "data.[&1].district_longitude","district_id": "data.[&1].district_id","district_name": "data.[&1].district_name","data_from_date": "data.[&1].data_from_date","data_upto_date": "data.[&1].data_upto_date",'
                    for sel_col in select_column:
                        if sel_col != 'school_id':
                            qur23 += '"' + sel_col + '": "data.[&1].' + sel_col + '",'
                    qur24 = '"school_management_type": "data.[&1].school_management_type","total_schools": "data.[&1].total_schools","percentage_schools_with_missing_data": "data.[&1].percentage_schools_with_missing_data","@total_schools_with_missing_data": "data.[&1].total_schools_with_missing_data","total_schools_with_missing_data": "allDistrictsFooter.total_schools_with_missing_data[]"}}},{"operation": "modify-overwrite-beta","spec": {"*": {"total_schools_with_missing_data": "=intSum(@(1,total_schools_with_missing_data))"}}},{"operation": "shift","spec": {"data": {"*": {"district_latitude": "data.[&1].district_latitude","district_longitude": "data.[&1].district_longitude","district_id": "data.[&1].district_id","district_name": "data.[&1].district_name","data_from_date": "data.[&1].data_from_date","data_upto_date": "data.[&1].data_upto_date",'
                    for sel_col in select_column:
                        if sel_col != 'school_id':
                            qur25 += '"' + sel_col + '": "data.[&1].' + sel_col + '",'
                    qur26 = '"school_management_type": "data.[&1].school_management_type","total_schools": "data.[&1].total_schools","total_schools_with_missing_data": "data.[&1].total_schools_with_missing_data","percentage_schools_with_missing_data": "data.[&1].percentage_schools_with_missing_data"}},"allDistrictsFooter": "&"}}]""",'
                    exception_district_jolt_spec = qur22 + qur23 + qur24 + qur25 + qur26

                    # cluster_timeseries_jolt_spec
                    qur77 = ''

                    for sel_col in select_column:

                        if sel_col != 'school_id':
                            qur77 += '"' + sel_col + '": "data.[&1].' + sel_col + '",'

                    qur78 = '"cluster_timeseries_jolt_spec":"""[{"operation":"shift","spec":{"*":{"cluster_id":"data.[&1].cluster_id","cluster_name":"data.[&1].cluster_name","district_id":"data.[&1].district_id","district_name":"data.[&1].district_name","block_id":"data.[&1].block_id","block_name":"data.[&1].block_name","percentage":"data.[&1].percentage","cluster_latitude":"data.[&1].cluster_latitude","cluster_longitude":"data.[&1].cluster_longitude",'
                    qur85 = '"data_from_date":"data.[&1].data_from_date","data_upto_date":"data.[&1].data_upto_date","@students_count":"data.[&1].students_count","@total_schools":"data.[&1].total_schools","students_count":"footer.@(1,block_id).students[]","total_schools":"footer.@(1,block_id).schools[]"}}},{"operation":"modify-overwrite-beta","spec":{"footer":{"*":{"students":"=intSum(@(1,students))","schools":"=intSum(@(1,schools))"}}}},{"operation":"shift","spec":{"data":{"*":{"cluster_id":"data.[&1].cluster_id","cluster_name":"data.[&1].cluster_name","district_id":"data.[&1].district_id","district_name":"data.[&1].district_name","block_id":"data.[&1].block_id","block_name":"data.[&1].block_name","percentage":"data.[&1].percentage","cluster_latitude":"data.[&1].cluster_latitude","cluster_longitude":"data.[&1].cluster_longitude",'
                    qur86 = '"data_from_date":"data.[&1].data_from_date","data_upto_date":"data.[&1].data_upto_date","@students_count":"data.[&1].students_count","@total_schools":"data.[&1].total_schools","students_count":"allClustersFooter.students[]","total_schools":"allClustersFooter.schools[]"}},"footer":"&"}},'
                    qur79 = '{"operation":"modify-overwrite-beta","spec":{"*":{"students":"=intSum(@(1,students))","schools":"=intSum(@(1,schools))"}}}]""",'

                    cluster_timeseries_jolt_spec = qur78 + qur77 + qur85 + qur77 + qur86 + qur79
                    # print(cluster_timeseries_jolt_spec)
                    # exception_school_jolt_spec
                    qur28 = ''
                    qur30 = ''
                    qur32 = ''
                    qur27 = '"exception_school_jolt_spec":"""[{"operation": "modify-overwrite-beta","spec": {"*": {"cluster_id": ["=toString",null]}}},{"operation": "shift","spec": {"*": {"school_latitude": "data.[&1].school_latitude","school_longitude": "data.[&1].school_longitude","district_id": "data.[&1].district_id","district_name": "data.[&1].district_name","block_id": "data.[&1].block_id","block_name": "data.[&1].block_name","cluster_id": "data.[&1].cluster_id","cluster_name": "data.[&1].cluster_name","school_id": "data.[&1].school_id","school_name": "data.[&1].school_name","data_from_date": "data.[&1].data_from_date","data_upto_date": "data.[&1].data_upto_date",'
                    for sel_col in select_column:
                        if sel_col != 'school_id':
                            qur28 += '"' + sel_col + '": "data.[&1].' + sel_col + '",'
                    qur29 = '"school_management_type": "data.[&1].school_management_type","total_schools": "data.[&1].total_schools","percentage_schools_with_missing_data": "data.[&1].percentage_schools_with_missing_data","@total_schools_with_missing_data": "data.[&1].total_schools_with_missing_data","total_schools_with_missing_data": "footer.@(1,cluster_id).total_schools_with_missing_data"}}},{"operation": "modify-overwrite-beta","spec": {"footer": {"*": {"total_schools_with_missing_data": "=intSum(@(1,total_schools_with_missing_data))"}}}},{"operation": "shift","spec": {"data": {"*": {"school_latitude": "data.[&1].school_latitude","school_longitude": "data.[&1].school_longitude","district_id": "data.[&1].district_id","district_name": "data.[&1].district_name","block_id": "data.[&1].block_id","block_name": "data.[&1].block_name","cluster_id": "data.[&1].cluster_id","cluster_name": "data.[&1].cluster_name","school_id": "data.[&1].school_id","school_name": "data.[&1].school_name","data_from_date": "data.[&1].data_from_date","data_upto_date": "data.[&1].data_upto_date",'
                    for sel_col in select_column:
                        if sel_col != 'school_id':
                            qur30 += '"' + sel_col + '": "data.[&1].' + sel_col + '",'
                    qur31 = '"school_management_type": "data.[&1].school_management_type","total_schools": "data.[&1].total_schools","@total_schools_with_missing_data": "data.[&1].total_schools_with_missing_data","total_schools_with_missing_data": "allSchoolsFooter.total_schools_with_missing_data[]","percentage_schools_with_missing_data": "data.[&1].percentage_schools_with_missing_data"}},"footer": "&"}},{"operation": "modify-overwrite-beta","spec": {"*": {"total_schools_with_missing_data": "=intSum(@(1,total_schools_with_missing_data))"}}},{"operation": "shift","spec": {"data": {"*": {"school_latitude": "data.[&1].school_latitude","school_longitude": "data.[&1].school_longitude","district_id": "data.[&1].district_id","district_name": "data.[&1].district_name","block_id": "data.[&1].block_id","block_name": "data.[&1].block_name","cluster_id": "data.[&1].cluster_id","cluster_name": "data.[&1].cluster_name","school_id": "data.[&1].school_id","school_name": "data.[&1].school_name","data_from_date": "data.[&1].data_from_date","data_upto_date": "data.[&1].data_upto_date",'
                    for sel_col in select_column:
                        if sel_col != 'school_id':
                            qur32 += '"' + sel_col + '": "data.[&1].' + sel_col + '",'
                    qur33 = '"school_management_type": "data.[&1].school_management_type","total_schools": "data.[&1].total_schools","total_schools_with_missing_data": "data.[&1].total_schools_with_missing_data","percentage_schools_with_missing_data": "data.[&1].percentage_schools_with_missing_data"}},"footer": "&","allSchoolsFooter": "&"}}]""",'
                    exception_school_jolt_spec = qur27 + qur28 + qur29 + qur30 + qur31 + qur32 + qur33

                    # transform_cluster_wise
                    qur35 = ''
                    qur37 = ''
                    qur34 = '"transform_cluster_wise":"""[{"operation": "shift","spec": {"*": {"cluster_id": "data.[&1].cluster_id","cluster_name": "data.[&1].cluster_name","district_id": "data.[&1].district_id","district_name": "data.[&1].district_name","block_id": "data.[&1].block_id","block_name": "data.[&1].block_name","percentage": "data.[&1].percentage","cluster_latitude": "data.[&1].cluster_latitude","cluster_longitude": "data.[&1].cluster_longitude","data_from_date": "data.[&1].data_from_date","data_upto_date": "data.[&1].data_upto_date",'
                    for sel_col in select_column:
                        if sel_col != 'school_id':
                            qur35 += '"' + sel_col + '": "data.[&1].' + sel_col + '",'
                    qur36 = '"@students_count": "data.[&1].students_count","@total_schools": "data.[&1].total_schools","students_count": "footer.@(1,block_id).students[]","total_schools": "footer.@(1,block_id).schools[]"}}},{"operation": "modify-overwrite-beta","spec": {"footer": {"*": {"students": "=intSum(@(1,students))","schools": "=intSum(@(1,schools))"}}}},{"operation": "shift","spec": {"data": {"*": {"cluster_id": "data.[&1].cluster_id","cluster_name": "data.[&1].cluster_name","district_id": "data.[&1].district_id","district_name": "data.[&1].district_name","block_id": "data.[&1].block_id","block_name": "data.[&1].block_name","percentage": "data.[&1].percentage","cluster_latitude": "data.[&1].cluster_latitude","cluster_longitude": "data.[&1].cluster_longitude","data_from_date": "data.[&1].data_from_date","data_upto_date": "data.[&1].data_upto_date",'
                    for sel_col in select_column:
                        if sel_col != 'school_id':
                            qur37 += '"' + sel_col + '": "data.[&1].' + sel_col + '",'
                    qur38 = '"@students_count": "data.[&1].students_count","@total_schools": "data.[&1].total_schools","students_count": "allClustersFooter.students[]","total_schools": "allClustersFooter.schools[]"}},"footer": "&"}},{"operation": "modify-overwrite-beta","spec": {"*": {"students": "=intSum(@(1,students))","schools": "=intSum(@(1,schools))"}}}]""",'
                    transform_cluster_wise = qur34 + qur35 + qur36 + qur37 + qur38

                    # raw_cluster_jolt_spec
                    raw_cluster_jolt_spec = '"raw_cluster_jolt_spec":"""[{"operation":"shift","spec":{"*":{"cluster_id":"[&1].Cluster ID","cluster_name":"[&1].Cluster Name","block_id":"[&1].Block ID","block_name":"[&1].Block Name","district_id":"[&1].District ID","district_name":"[&1].District Name","academic_year":"[&1].Academic Year","' + table_names + '_percent_june":"[&1].' + table_names + ' (%) June","' + table_names + '_count_june":"[&1].Total ' + table_names + ' June","total_schools_june":"[&1].Total Schools June","' + table_names + '_percent_july":"[&1].' + table_names + ' (%) July","' + table_names + '_count_july":"[&1].Total ' + table_names + ' July","total_schools_july":"[&1].Total Schools July","' + table_names + '_percent_august":"[&1].' + table_names + ' (%) August","' + table_names + '_count_august":"[&1].Total ' + table_names + ' August","total_schools_august":"[&1].Total Schools August","' + table_names + '_percent_september":"[&1].' + table_names + ' (%) September","' + table_names + '_count_september":"[&1].Total ' + table_names + ' September","total_schools_september":"[&1].Total Schools September","' + table_names + '_percent_october":"[&1].' + table_names + ' (%) October","' + table_names + '_count_october":"[&1].Total ' + table_names + ' October","total_schools_october":"[&1].Total Schools October","' + table_names + '_percent_november":"[&1].' + table_names + ' (%) November","' + table_names + '_count_november":"[&1].Total ' + table_names + ' November","total_schools_november":"[&1].Total Schools November","' + table_names + '_percent_december":"[&1].' + table_names + ' (%) December","' + table_names + '_count_december":"[&1].Total ' + table_names + ' December","total_schools_december":"[&1].Total Schools December","' + table_names + '_percent_january":"[&1].' + table_names + ' (%) January","' + table_names + '_count_january":"[&1].Total ' + table_names + ' January","total_schools_january":"[&1].Total Schools January","' + table_names + '_percent_february":"[&1].' + table_names + ' (%) February","' + table_names + '_count_february":"[&1].Total ' + table_names + ' February","total_schools_february":"[&1].Total Schools February","' + table_names + '_percent_march":"[&1].' + table_names + ' (%) March","' + table_names + '_count_march":"[&1].Total ' + table_names + ' March","total_schools_march":"[&1].Total Schools March","' + table_names + '_percent_april":"[&1].' + table_names + ' (%) April","' + table_names + '_count_april":"[&1].Total ' + table_names + ' April","total_schools_april":"[&1].Total Schools April","' + table_names + '_percent_may":"[&1].' + table_names + ' (%) May","' + table_names + '_count_may":"[&1].Total ' + table_names + ' May","total_schools_may":"[&1].Total Schools May"}}}]""",'

                    # transform_school_wise
                    qur40 = ''
                    qur42 = ''
                    qur39 = '"transform_school_wise":"""[{"operation": "modify-overwrite-beta","spec": {"*": {"cluster_id": ["=toString", null]}}},{"operation": "shift","spec": {"*": {"school_id": "data.[&1].school_id","school_name": "data.[&1].school_name","cluster_id": "data.[&1].cluster_id","cluster_name": "data.[&1].cluster_name","crc_name": "data.[&1].crc_name","district_id": "data.[&1].district_id","district_name": "data.[&1].district_name","block_id": "data.[&1].block_id","block_name": "data.[&1].block_name","percentage": "data.[&1].percentage","school_latitude": "data.[&1].school_latitude","school_longitude": "data.[&1].school_longitude","data_from_date": "data.[&1].data_from_date","data_upto_date": "data.[&1].data_upto_date",'
                    for sel_col in select_column:
                        if sel_col != 'school_id':
                            qur40 += '"' + sel_col + '": "data.[&1].' + sel_col + '",'
                    qur41 = '"@students_count": "data.[&1].students_count","@total_schools": "data.[&1].total_schools","students_count": "footer.@(1,cluster_id).students[]","total_schools": "footer.@(1,cluster_id).schools[]"}}},{"operation": "modify-overwrite-beta","spec": {"footer": {"*": {"students": "=intSum(@(1,students))","schools": "=intSum(@(1,schools))"}}}}, {"operation": "shift","spec": {"data": {"*": {"school_id": "data.[&1].school_id","school_name": "data.[&1].school_name","cluster_id": "data.[&1].cluster_id","cluster_name": "data.[&1].cluster_name","crc_name": "data.[&1].crc_name","district_id": "data.[&1].district_id","district_name": "data.[&1].district_name","block_id": "data.[&1].block_id","block_name": "data.[&1].block_name","percentage": "data.[&1].percentage","school_latitude": "data.[&1].school_latitude","school_longitude": "data.[&1].school_longitude","data_from_date": "data.[&1].data_from_date","data_upto_date": "data.[&1].data_upto_date",'
                    for sel_col in select_column:
                        if sel_col != 'school_id':
                            qur42 += '"' + sel_col + '": "data.[&1].' + sel_col + '",'
                    qur43 = '"@students_count": "data.[&1].students_count","@total_schools": "data.[&1].total_schools","students_count": "allSchoolsFooter.students[]","total_schools": "allSchoolsFooter.schools[]"}},"footer": "&"}}, {"operation": "modify-overwrite-beta","spec": {"*": {"students": "=intSum(@(1,students))","schools": "=intSum(@(1,schools))"}}}]""",'
                    transform_school_wise = qur39 + qur40 + qur41 + qur42 + qur43

                    # jolt_spec_block
                    qur45 = ''
                    qur47 = ''
                    qur44 = '"jolt_spec_block":"""[{"operation": "shift","spec": {"*": {"block_id": "data.[&1].block_id","district_name": "data.[&1].district_name","district_id": "data.[&1].district_id","block_name": "data.[&1].block_name","percentage": "data.[&1].percentage","block_latitude": "data.[&1].block_latitude","block_longitude": "data.[&1].block_longitude","data_from_date": "data.[&1].data_from_date","data_upto_date": "data.[&1].data_upto_date",'
                    for sel_col in select_column:
                        if sel_col != 'school_id':
                            qur45 += '"' + sel_col + '": "data.[&1].' + sel_col + '",'
                    qur46 = '"school_management_type": "data.[&1].school_management_type","school_category": "data.[&1].school_category","@' + table_names + '_count": "data.[&1].' + table_names + '_count","@total_schools": "data.[&1].total_schools","' + table_names + '_count": "footer.@(1,district_id).' + table_names + '[]","total_schools": "footer.@(1,district_id).schools[]"}}},{"operation": "modify-overwrite-beta","spec": {"footer": {"*": {"' + table_names + '": "=intSum(@(1,' + table_names + '))","schools": "=intSum(@(1,schools))"}}}},{"operation": "shift","spec": {"data": {"*": {"block_id": "data.[&1].block_id","district_name": "data.[&1].district_name","district_id": "data.[&1].district_id","block_name": "data.[&1].block_name","percentage": "data.[&1].percentage","block_latitude": "data.[&1].block_latitude","block_longitude": "data.[&1].block_longitude","data_from_date": "data.[&1].data_from_date","data_upto_date": "data.[&1].data_upto_date",'
                    for sel_col in select_column:
                        if sel_col != 'school_id':
                            qur47 += '"' + sel_col + '": "data.[&1].' + sel_col + '",'
                    qur48 = '"school_management_type": "data.[&1].school_management_type","school_category": "data.[&1].school_category","@' + table_names + '_count": "data.[&1].' + table_names + '_count","@total_schools": "data.[&1].total_schools","' + table_names + '_count": "allBlocksFooter.' + table_names + '[]","total_schools": "allBlocksFooter.schools[]"}},"footer": "&"}},{"operation": "modify-overwrite-beta","spec": {"*": {"' + table_names + '": "=intSum(@(1,' + table_names + '))","schools": "=intSum(@(1,schools))"}}}]""",'
                    jolt_spec_block = qur44 + qur45 + qur46 + qur47 + qur48

                    # transform_block_wise
                    qur50 = ''
                    qur52 = ''
                    qur49 = '"transform_block_wise":"""[{"operation": "shift","spec": {"*": {"block_id": "data.[&1].block_id","district_name": "data.[&1].district_name","district_id": "data.[&1].district_id","block_name": "data.[&1].block_name","percentage": "data.[&1].percentage","block_latitude": "data.[&1].block_latitude","block_longitude": "data.[&1].block_longitude","data_from_date": "data.[&1].data_from_date","data_upto_date": "data.[&1].data_upto_date",'
                    for sel_col in select_column:
                        if sel_col != 'school_id':
                            qur50 += '"' + sel_col + '": "data.[&1].' + sel_col + '",'
                    qur51 = '"@students_count": "data.[&1].students_count","@total_schools": "data.[&1].total_schools","students_count": "footer.@(1,district_id).students[]","total_schools": "footer.@(1,district_id).schools[]"}}},{"operation": "modify-overwrite-beta","spec": {"footer": {"*": {"students": "=intSum(@(1,students))","schools": "=intSum(@(1,schools))"}}}},{"operation": "shift","spec": {"data": {"*": {"block_id": "data.[&1].block_id","district_name": "data.[&1].district_name","district_id": "data.[&1].district_id","block_name": "data.[&1].block_name","percentage": "data.[&1].percentage","block_latitude": "data.[&1].block_latitude","block_longitude": "data.[&1].block_longitude","data_from_date": "data.[&1].data_from_date","data_upto_date": "data.[&1].data_upto_date",'
                    for sel_col in select_column:
                        if sel_col != 'school_id':
                            qur52 += '"' + sel_col + '": "data.[&1].' + sel_col + '",'
                    qur53 = '"@students_count": "data.[&1].students_count","@total_schools": "data.[&1].total_schools","students_count": "allBlocksFooter.students[]","total_schools": "allBlocksFooter.schools[]"}},"footer": "&"}},{"operation": "modify-overwrite-beta","spec": {"*": {"students": "=intSum(@(1,students))","schools": "=intSum(@(1,schools))"}}}]""",'
                    transform_block_wise = qur49 + qur50 + qur51 + qur52 + qur53

                    # district_timeseries_jolt_spec
                    qur70 = ''

                    for sel_col in select_column:

                        if sel_col != 'school_id':
                            qur70 += '"' + sel_col + '": "data.[&1].' + sel_col + '",'

                    qur71 = '"district_timeseries_jolt_spec":"""[{"operation":"shift","spec":{"*":{"district_id":"data.[&1].district_id","district_name":"data.[&1].district_name","percentage":"data.[&1].percentage","district_latitude":"data.[&1].district_latitude","district_longitude":"data.[&1].district_longitude",'
                    qur72 = '"data_from_date":"data.[&1].data_from_date","data_upto_date":"data.[&1].data_upto_date","@students_count":"data.[&1].students_count","@total_schools":"data.[&1].total_schools","students_count":"allDistrictsFooter.students[]","total_schools":"allDistrictsFooter.schools[]"}}},{"operation":"modify-overwrite-beta","spec":{"*":{"students":"=intSum(@(1,students))","schools":"=intSum(@(1,schools))"}}}]""",'

                    district_timeseries_jolt_spec = qur71 + qur70 + qur72
                    # block_time_series_jolt
                    qur74 = ''
                    for sel_col in select_column:
                        if sel_col != 'school_id':
                            qur74 += '"' + sel_col + '": "data.[&1].' + sel_col + '",'
                    qur75 = '"block_timeseries_jolt_spec":"""[{"operation":"shift","spec":{"*":{"block_id":"data.[&1].block_id","district_name":"data.[&1].district_name","district_id":"data.[&1].district_id","block_name":"data.[&1].block_name","percentage":"data.[&1].percentage","block_latitude":"data.[&1].block_latitude","block_longitude":"data.[&1].block_longitude",'
                    qur90 = '"data_from_date":"data.[&1].data_from_date","data_upto_date":"data.[&1].data_upto_date","@students_count":"data.[&1].students_count","@total_schools":"data.[&1].total_schools","students_count":"footer.@(1,district_id).students[]","total_schools":"footer.@(1,district_id).schools[]"}}},{"operation":"modify-overwrite-beta","spec":{"footer":{"*":{"students":"=intSum(@(1,students))","schools":"=intSum(@(1,schools))"}}}},{"operation":"shift","spec":{"data":{"*":{"block_id":"data.[&1].block_id","district_name":"data.[&1].district_name","district_id":"data.[&1].district_id","block_name":"data.[&1].block_name","percentage":"data.[&1].percentage","block_latitude":"data.[&1].block_latitude","block_longitude":"data.[&1].block_longitude",'
                    qur76 = '"data_from_date":"data.[&1].data_from_date","data_upto_date":"data.[&1].data_upto_date","@students_count":"data.[&1].students_count","@total_schools":"data.[&1].total_schools","students_count":"allBlocksFooter.students[]","total_schools":"allBlocksFooter.schools[]"}},"footer":"&"}},{"operation":"modify-overwrite-beta","spec":{"*":{"students":"=intSum(@(1,students))","schools":"=intSum(@(1,schools))"}}}]""",'
                    block_time_series_jolt = qur75 + qur74 + qur90 + qur74 + qur76
                    # jolt_for_log_summary
                    qur55 = ''
                    qurs2 = ''
                    qurs3 = '}}}}]""",'
                    qur54 = '"jolt_for_log_summary":"""[{"operation": "shift","spec": {"*": {"filename": "[&1].filename","ff_uuid": "[&1].ff_uuid","total_records": "[&1].total_records","blank_lines": "[&1].blank_lines","duplicate_records": "[&1].duplicate_records","datatype_mismatch": "[&1].datatype_mismatch","student_id": "[&1].records_with_null_value.student_id","student_id": "[&1].records_with_null_value.student_id","school_id": "[&1].records_with_null_value.school_id",'
                    for sel_col in select_column:
                        if sel_col != 'school_id':
                            qur55 += '"' + sel_col + '": "[&1].records_with_null_value.' + sel_col + '",'
                    qur56 = '"processed_records": "[&1].processed_records","process_start_time": "[&1].process_start_time","process_end_time": "[&1].process_end_time"}}}, {"operation": "default","spec": {"*": {"records_with_null_value": {'
                    for null_jolt in null_validation_columns:
                        qurs2 += ''
                        if null_validation_columns.index(null_jolt) == len(null_validation_columns) - 1:
                            qurs2 += '"' + null_jolt + '": 0'
                        else:
                            qurs2 += '"' + null_jolt + '": 0,'

                    jolt_for_log_summary = qur54 + qur55 + qur56 + qurs2 + qurs3

                    # exception cluster_jolt_spec
                    qur58 = ''
                    qur60 = ''
                    qur62 = ''
                    qur57 = '"exception_cluster_jolt_spec":"""[{"operation": "shift","spec": {"*": {"cluster_latitude": "data.[&1].cluster_latitude","cluster_longitude": "data.[&1].cluster_longitude","district_id": "data.[&1].district_id","district_name": "data.[&1].district_name","block_id": "data.[&1].block_id","block_name": "data.[&1].block_name","cluster_id": "data.[&1].cluster_id","cluster_name": "data.[&1].cluster_name","data_from_date": "data.[&1].data_from_date","data_upto_date": "data.[&1].data_upto_date",'
                    for sel_col in select_column:
                        if sel_col != 'school_id':
                            qur58 += '"' + sel_col + '": "data.[&1].' + sel_col + '",'
                    qur59 = '"school_management_type": "data.[&1].school_management_type","total_schools": "data.[&1].total_schools","percentage_schools_with_missing_data": "data.[&1].percentage_schools_with_missing_data","@total_schools_with_missing_data": "data.[&1].total_schools_with_missing_data","total_schools_with_missing_data": "footer.@(1,block_id).total_schools_with_missing_data"}}},{"operation": "modify-overwrite-beta","spec": {"footer": {"*": {"total_schools_with_missing_data": "=intSum(@(1,total_schools_with_missing_data))"}}}},{"operation": "shift","spec": {"data": {"*": {"cluster_latitude": "data.[&1].cluster_latitude","cluster_longitude": "data.[&1].cluster_longitude","district_id": "data.[&1].district_id","district_name": "data.[&1].district_name","block_id": "data.[&1].block_id","block_name": "data.[&1].block_name","cluster_id": "data.[&1].cluster_id","cluster_name": "data.[&1].cluster_name","data_from_date": "data.[&1].data_from_date","data_upto_date": "data.[&1].data_upto_date",'
                    for sel_col in select_column:
                        if sel_col != 'school_id':
                            qur60 += '"' + sel_col + '": "data.[&1].' + sel_col + '",'
                    qur61 = '"school_management_type": "data.[&1].school_management_type","total_schools": "data.[&1].total_schools","@total_schools_with_missing_data": "data.[&1].total_schools_with_missing_data","total_schools_with_missing_data": "allClustersFooter.total_schools_with_missing_data[]","percentage_schools_with_missing_data": "data.[&1].percentage_schools_with_missing_data"}},"footer": "&"}},{"operation": "modify-overwrite-beta","spec": {"*": {"total_schools_with_missing_data": "=intSum(@(1,total_schools_with_missing_data))"}}},{"operation": "shift","spec": {"data": {"*": {"cluster_latitude": "data.[&1].cluster_latitude","cluster_longitude": "data.[&1].cluster_longitude","district_id": "data.[&1].district_id","district_name": "data.[&1].district_name","block_id": "data.[&1].block_id","block_name": "data.[&1].block_name","cluster_id": "data.[&1].cluster_id","cluster_name": "data.[&1].cluster_name","data_from_date": "data.[&1].data_from_date","data_upto_date": "data.[&1].data_upto_date",'
                    for sel_col in select_column:
                        if sel_col != 'school_id':
                            qur62 += '"' + sel_col + '": "data.[&1].' + sel_col + '",'
                    qur63 = '"school_management_type": "data.[&1].school_management_type","total_schools": "data.[&1].total_schools","total_schools_with_missing_data": "data.[&1].total_schools_with_missing_data","percentage_schools_with_missing_data": "data.[&1].percentage_schools_with_missing_data"}},"footer": "&","allClustersFooter": "&"}}]""",'
                    exception_cluster_jolt_spec = qur57 + qur58 + qur59 + qur60 + qur61 + qur62 + qur63

                    # jolt_line_chart_cluster
                    qur65 = ''
                    qur64 = '"jolt_line_chart_cluster":"""[{"operation": "modify-overwrite-beta","spec": {"*": {"cluster_id": ["=toString", null]}}},{"operation": "shift","spec": {"*": {"cluster_id": "[&1].cluster_id","cluster_name": "[&1].cluster_name","percentage": "[&1].' + table_names + '.' + table_names + '_percentage",'
                    for sel_col in select_column:
                        if sel_col != 'school_id':
                            qur65 += '"' + sel_col + '": "data.[&1].' + sel_col + '",'
                    qur66 = '"' + table_names + '_count": "[&1].' + table_names + '.' + table_names + '_count","total_schools": "[&1].' + table_names + '.total_schools"}}}, {"operation": "shift","spec": {"*": {"@cluster_name": "@(1,cluster_id).cluster_name[]","@' + table_names + '": "@(1,cluster_id).' + table_names + '[]"}}}]""",'
                    jolt_line_chart_cluster = qur64 + qur65 + qur66
                    # partition_by_date_column
                    partition_date = ''
                    for partition_col in select_column:
                        if partition_col.__contains__('date'):
                            partition_date += partition_col
                    partition_date_column = '"partition_select_column":"""' + partition_date + '""",'
                    # print(partition_date_column)

                    # raw_block_jolt_spec
                    raw_block_jolt_spec = '"raw_block_jolt_spec":"""[{"operation":"shift","spec":{"*":{"block_id":"[&1].Block ID","block_name":"[&1].Block Name","district_id":"[&1].District ID","district_name":"[&1].District Name","academic_year":"[&1].Academic Year","' + table_names + '_percent_june":"[&1].' + table_names + ' (%) June","' + table_names + '_count_june":"[&1].Total ' + table_names + ' June","total_schools_june":"[&1].Total Schools June","' + table_names + '_percent_july":"[&1].' + table_names + ' (%) July","' + table_names + '_count_july":"[&1].Total ' + table_names + ' July","total_schools_july":"[&1].Total Schools July","' + table_names + '_percent_august":"[&1].' + table_names + ' (%) August","' + table_names + '_count_august":"[&1].Total ' + table_names + ' August","total_schools_august":"[&1].Total Schools August","' + table_names + '_percent_september":"[&1].' + table_names + ' (%) September","' + table_names + '_count_september":"[&1].Total ' + table_names + ' September","total_schools_september":"[&1].Total Schools September","' + table_names + '_percent_october":"[&1].' + table_names + ' (%) October","' + table_names + '_count_october":"[&1].Total ' + table_names + ' October","total_schools_october":"[&1].Total Schools October","' + table_names + '_percent_november":"[&1].' + table_names + ' (%) November","' + table_names + '_count_november":"[&1].Total ' + table_names + ' November","total_schools_november":"[&1].Total Schools November","' + table_names + '_percent_december":"[&1].' + table_names + ' (%) December","' + table_names + '_count_december":"[&1].Total ' + table_names + ' December","total_schools_december":"[&1].Total Schools December","' + table_names + '_percent_january":"[&1].' + table_names + ' (%) January","' + table_names + '_count_january":"[&1].Total ' + table_names + ' January","total_schools_january":"[&1].Total Schools January","' + table_names + '_percent_february":"[&1].' + table_names + ' (%) February","' + table_names + '_count_february":"[&1].Total ' + table_names + ' February","total_schools_february":"[&1].Total Schools February","' + table_names + '_percent_march":"[&1].' + table_names + ' (%) March","' + table_names + '_count_march":"[&1].Total ' + table_names + ' March","total_schools_march":"[&1].Total Schools March","' + table_names + '_percent_april":"[&1].' + table_names + ' (%) April","' + table_names + '_count_april":"[&1].Total ' + table_names + ' April","total_schools_april":"[&1].Total Schools April","' + table_names + '_percent_may":"[&1].' + table_names + ' (%) May","' + table_names + '_count_may":"[&1].Total ' + table_names + ' May","total_schools_may":"[&1].Total Schools May"}}}]"""}'
                    all_param_queries += validation_queries + partition_date_column + district_jolt + exception_block_jolt_spec + school_timeseries_jolt_spec + raw_district_jolt_spec + jolt_line_chart_state + jolt_spec_cluster + raw_school_jolt_spec + jolt_line_chart_block + jolt_line_chart_district + transform_district_wise + jolt_line_chart_school + jolt_spec_school_management_category_meta + jolt_spec_school + exception_district_jolt_spec + cluster_timeseries_jolt_spec + exception_school_jolt_spec + transform_cluster_wise + raw_cluster_jolt_spec + transform_school_wise + jolt_spec_block + transform_block_wise + district_timeseries_jolt_spec + block_time_series_jolt + jolt_for_log_summary + exception_cluster_jolt_spec + jolt_line_chart_cluster + raw_block_jolt_spec
            key_index += 1
            del mycsv[:]
            if key_index == len(keywords):
                break
            key = keywords[key_index]
        else:
            mycsv.append(row)

def create_table_queries():
    input_df = pd.read_csv(read_input())
    keywords = input_df['keywords'].dropna().tolist()
    mycsv = []
    key_index = 0
    global all_queries
    all_queries = ''
    key = keywords[key_index]
    for row in csv.reader(read_input()):
        if row[0] == key:
            if 'trans' in row[0]:
                df = pd.DataFrame(mycsv)
                new_header = df.iloc[0].str.strip().str.lower()
                df.replace("", float("NaN"), inplace=True)
                df.dropna(how='all', inplace=True)
                df = df[1:]
                if df[2:].empty:
                    del df
                else:
                    df.columns = new_header
                    global table_names
                    table_names = df['table_name'].dropna().to_string(index=False).strip()
                    tmp_columns = df['columns'].dropna().tolist()
                    global student_id_exists
                    student_id_exists = False
                    columns = []
                    for col in tmp_columns:
                        x = col.replace(" ", "_")
                        columns.append(x)
                    for tmp in tmp_columns:
                        if tmp.lower().replace(' ', '_').strip() == 'student_id':
                            student_id_exists = True
                    data_types = df['data_type']
                    ref_table_df = df['ref_table'].dropna().to_list()
                    ref_col_df = df['ref_column'].dropna()
                    null_validation_df = df[df['null_validation_required'] == 'Yes']
                    null_validation_columns = null_validation_df['columns'].to_list()
                    no_of_columns = len(columns)
                    foriegn_key_df2 = df[df['constraints'] == 'foreign key']
                    f_k_columns_l = foriegn_key_df2['columns'].to_list()
                    f_k_columns = ','.join(f_k_columns_l)
                    for num in ('_staging_1', '_staging_2', '_temp'):
                        query1 = 'create table if not exists ' + table_names + num + '( ff_uuid text, '
                        iter2 = 0
                        for col, dt in zip(columns, data_types):
                            if iter2 <= no_of_columns:
                                if col in range(1, 31):
                                    query1 = query1 + 'day_' + col + " " + dt + ","
                                else:
                                    query1 = query1 + col + " " + dt + ","
                            iter2 = iter2 + 1
                        query1 = query1 + 'created_on  TIMESTAMP without time zone, updated_on  TIMESTAMP without time zone'
                        if foriegn_key_df2.empty:
                            staging_2_query = query1 + ');'
                        else:
                            iter = 0
                            no_of_tables = len(ref_table_df)
                            for fk_col, table, colms in zip(f_k_columns_l, ref_table_df, ref_col_df):
                                if iter <= no_of_tables:
                                    query1 = query1 + ' , foreign key (' + fk_col.replace(" ",
                                                                                          "_") + ') references ' + table + '(' + colms + ')'
                                iter = iter + 1
                            staging_2_query = query1 + ');'
                        all_queries = all_queries + staging_2_query + '\n'
                    primary_key_filter = df[df['constraints'] == 'primary key']

                    p_k_columns = primary_key_filter['columns'].to_list()
                    p_k_columns = ','.join(p_k_columns)
                    query2 = 'create table if not exists ' + table_names + '_trans( '
                    iter2 = 0
                    for col, dt in zip(columns, data_types):
                        if iter2 <= no_of_columns:
                            if col in range(1, 31):
                                query2 = query2 + 'day_' + col + " " + dt + ","

                            else:
                                query2 = query2 + col + " " + dt + ","
                        iter2 = iter2 + 1
                    trans_query = query2 + 'created_on  TIMESTAMP without time zone, updated_on  TIMESTAMP without time zone'
                    if len(p_k_columns) == 0 and f_k_columns_l.empty:
                        trans_query = trans_query + ');'
                    elif len(p_k_columns) > 0 and foriegn_key_df2.empty:
                        trans_query = trans_query + ' , primary key (' + p_k_columns.replace(" ", "_") + ')'
                    elif len(p_k_columns) == 0 and foriegn_key_df2.empty is False:
                        iter = 0
                        no_of_tables = len(ref_table_df)
                        for fk_col, table, colms in zip(f_k_columns_l, ref_table_df, ref_col_df):
                            if iter <= no_of_tables:
                                trans_query = trans_query + ' , foreign key (' + fk_col.replace(" ",
                                                                                                "_") + ') references ' + table + '(' + colms + ')'
                            iter = iter + 1
                        trans_query = trans_query + ');'
                    else:
                        trans_query = trans_query + ' , primary key (' + p_k_columns.replace(" ", "_")
                        iter = 0
                        no_of_tables = len(ref_table_df)
                        for fk_col, table, colms in zip(f_k_columns_l, ref_table_df, ref_col_df):
                            if iter <= no_of_tables:
                                trans_query = trans_query + ' , foreign key (' + fk_col.replace(" ",
                                                                                                "_") + ') references ' + table + '(' + colms + ')'
                            iter = iter + 1
                    trans_query = trans_query + ');'
                    global temp_to_trans
                    trans_insert = 'insert into ' + table_names + '_trans( '
                    exclude_col = ''
                    for elem in columns:
                        exclude_col += elem + '= excluded.' + elem + ','
                    columns_insert = ','.join(columns)
                    trans_insert += columns_insert + ',created_on,updated_on)  select ' + columns_insert + ',now(),now() from ' + table_names + '_temp' + ' on conflict(' + p_k_columns + ') do update set ' + exclude_col + 'updated_on=now();'
                    temp_to_trans = '[' + '{"temp_to_trans_insert":"' + trans_insert + '"},'
                    all_queries = all_queries + trans_query
                    query3 = 'create table if not exists ' + table_names + '_dup( '
                    iter2 = 0
                    for col, dt in zip(columns, data_types):
                        if iter2 <= no_of_columns:
                            if col in range(1, 31):
                                query3 = query3 + 'day_' + col + " " + dt + ","
                            else:
                                query3 = query3 + col + " " + dt + ","

                        iter2 = iter2 + 1
                    dup_query = query3 + 'num_of_times int,ff_uuid varchar(255),created_on_file_process timestamp default current_timestamp);'
                    all_queries = all_queries + '\n' + dup_query
                    nul_val_df = df[df['null_validation_required'] == 'Yes']
                    nul_val_cols = nul_val_df['columns'].to_list()
                    if len(nul_val_cols) > 0:
                        query4 = 'create table if not exists ' + table_names + '_null_col( filename varchar(200),'
                        iter2 = 0
                        for col in nul_val_cols:
                            if iter2 <= no_of_columns:
                                query4 = query4 + 'count_null_' + col + " int,"
                            iter2 = iter2 + 1
                        nul_col_query = query4 + 'ff_uuid varchar(200),count_of_null_rows int);'
                        all_queries = all_queries + '\n' + nul_col_query
            elif 'type_of_data' in row[0]:
                df_tod = pd.DataFrame(mycsv)
                df_tod.replace("", float("NaN"), inplace=True)
                df_tod.dropna(how='all', inplace=True, axis=1)
                new_header = df_tod.iloc[0].str.strip().str.lower()
                df_tod.columns = new_header
                df_tod = df_tod[1:]
                df_level_of_data = df_tod['level_of_data'].dropna().to_string()
                global df_filters_req
                df_filters_req = df_tod['filters_required'].dropna().to_list()
                global create_time_selecion_table
                create_time_selection_table = 'create table if not exists configure_time_selections(datasource_name varchar(50),time_selections_required varchar(20));'
                global insert_time_selections
                insert_time_selections = ''
                global df_time_sel
                df_time_sel = df_tod['time_selections'].dropna().to_list()
                for val in df_time_sel:
                    val = val.replace('_', ' ')
                    insert_time_selections += "insert into configure_time_selections(datasource_name,time_selections_required) values('" + table_names + "','" + val + "') except(select datasource_name,time_selections_required from configure_time_selections);"
                global date_col
                date_col = df_tod['date_column_to_filter'].dropna().to_string(index=False).strip()
                all_queries += '\n' + create_time_selection_table + '\n' + insert_time_selections
            elif df_level_of_data in df_filters_req and 'aggregation' not in keywords:
                query2 = 'create table if not exists ' + table_names + '_aggregation( '
                iter2 = 0
                for col, dt in zip(columns, data_types):
                    if iter2 <= no_of_columns:
                        if col in range(1, 31):
                            query2 = query2 + 'day_' + col + " " + dt + ","
                        elif col.lower() != 'month':
                            query2 = query2 + col + " " + dt + ","
                    iter2 = iter2 + 1

                aggregation_query = query2 + 'created_on  TIMESTAMP without time zone, updated_on  TIMESTAMP without time zone'
                if len(p_k_columns) == 0 and f_k_columns_l.empty:
                    aggregation_query = aggregation_query + ');'
                elif len(p_k_columns) > 0 and foriegn_key_df2.empty:
                    aggregation_query = aggregation_query + ' , primary key (' + p_k_columns.replace(" ", "_") + ')'
                elif len(p_k_columns) == 0 and foriegn_key_df2.empty is False:
                    iter = 0
                    no_of_tables = len(ref_table_df)
                    for fk_col, table, colms in zip(f_k_columns_l, ref_table_df, ref_col_df):
                        if iter <= no_of_tables:
                            aggregation_query = aggregation_query + ' , foreign key (' + fk_col.replace(" ",
                                                                                                        "_") + ') references ' + table + '(' + colms + ')'
                        iter = iter + 1
                    aggregation_query = aggregation_query + ');'
                else:
                    aggregation_query = aggregation_query + ' , primary key (' + p_k_columns.replace(" ", "_")
                    iter = 0
                    no_of_tables = len(ref_table_df)
                    for fk_col, table, colms in zip(f_k_columns_l, ref_table_df, ref_col_df):
                        if iter <= no_of_tables:
                            aggregation_query = aggregation_query + ' , foreign key (' + fk_col.replace(" ",
                                                                                                        "_") + ') references ' + table + '(' + colms + ')'
                        iter = iter + 1
                aggregation_query = aggregation_query + ');'
                all_queries = all_queries + '\n' + aggregation_query

            elif df_level_of_data not in df_filters_req and 'aggre' in row[0]:
                df_agg = pd.DataFrame(mycsv)
                df_agg.replace("", float("NaN"), inplace=True)
                df_agg.dropna(how='all', inplace=True)
                new_header = df_agg.iloc[0].str.strip().str.lower()
                df_agg.columns = new_header
                df_agg = df_agg[1:]
                if df_agg.empty:
                    del df_agg
                else:
                    static_create_columns = 'school_name varchar(200),school_latitude double precision,school_longitude double precision,district_id bigint,district_name varchar(100),district_latitude  double precision,district_longitude  double precision,block_id  bigint,block_name varchar(100),block_latitude  double precision,block_longitude  double precision,cluster_id  bigint,cluster_name varchar(100),cluster_latitude  double precision,cluster_longitude  double precision,school_management_type varchar(100)'
                    df_agg_metric = df_agg['metric_type'].dropna().to_string(index=False)
                    reference_column = df_agg['ref_columns'].dropna().to_string(index=False)
                    global result_col
                    result_col = df_agg['result_metric'].dropna().to_string(index=False)
                    primary_key = df_agg['primary_key'].dropna().to_list()
                    global agg_pk_columns
                    agg_pk_columns = ','.join([str(elem) for elem in primary_key])
                    global select_columns
                    select_columns = df_agg['select_column'].dropna()
                    global condition
                    condition = df_agg['condition'].dropna()
                    if condition.empty is True:
                        condition = ''
                    else:
                        condition = df_agg['condition'].dropna().to_string(index=False)
                        condition = ' where ' + condition
                    global agg_column
                    create_cols = ''
                    for col in select_columns:
                        if col.lower() == 'month':
                            continue
                        if col.lower() == 'grade':
                            create_cols = create_cols + 'grade varchar(10),'
                            continue
                        for create_col, dt in zip(columns, data_types):
                            if col == create_col:
                                create_cols = create_cols + col + " " + dt + ","
                            iter2 = iter2 + 1

                    if 'count' in df_agg_metric:
                        agg_column = 'count(' + reference_column + ')  as ' + result_col
                    elif 'sum' in df_agg_metric:
                        agg_column = 'sum(' + reference_column + ')  as ' + result_col
                    else:
                        agg_column = ''
                    aggregation_query = 'create table if not exists ' + table_names + '_aggregation(' + static_create_columns + ',' + create_cols + result_col + ' integer,month varchar(15),created_on  TIMESTAMP without time zone ,updated_on  TIMESTAMP without time zone,primary key(' + agg_pk_columns + '));'
                    create_trans_to_aggregate_queries()
                    all_queries = all_queries + '\n' + aggregation_query + '\n'
            elif 'report' in row[0]:
                df_op = pd.DataFrame(mycsv)
                df_op.replace("", float("NaN"), inplace=True)
                df_op.dropna(how='all', inplace=True, axis=1)
                new_header = df_op.iloc[0].str.strip().str.lower()
                df_op.columns = new_header
                df_op = df_op[1:]
                global sel_col_op
                sel_col_op = ''
                global sel_col_op1
                sel_col_op1 = df_op['select_column'].dropna()
                for elem in sel_col_op1:
                    if elem != 'school_id' and elem != date_col.strip():
                        sel_col_op += elem + ','
                sel_col_op = sel_col_op[:-1]
                global metric_op
                metric_op = df_op['metric_type'].dropna().to_string(index=False)
                global ref_op_column
                ref_op_column = df_op['ref_columns'].dropna().to_string(index=False)
                global result_col_op
                result_col_op = df_op['result_metric'].dropna().to_string(index=False)
                global metric_rep
                if 'sum' in metric_op:
                    metric_rep = 'sum(' + ref_op_column + ')  as ' + result_col_op
                global group_by_op
                group_by_op = df_op['group_by_columns'].dropna().to_string(index=False)
            elif 'visualization' in row[0]:
                df_vis = pd.DataFrame(mycsv)
                df_vis.replace("", float("NaN"), inplace=True)
                df.dropna(how='all', inplace=True, axis=1)
                new_header = df_vis.iloc[0].str.strip().str.lower()
                df_vis = df_vis[1:]
                if df_vis[1:].empty:
                    del df_vis
                else:
                    df_vis.columns = new_header
                    datasourcenames = df_vis['data_source_name'].dropna().to_string(index=False).split()
                    tmp_columns = df_vis['report_type'].dropna().tolist()
                    description = df_vis['description'].dropna().tolist()
                    create_table_query = ' '
                    create_table_query = 'create table if not exists configurable_datasource_properties (report_name varchar(50),report_type varchar(20),description text,status boolean);'
                    create_table_query += 'alter table configurable_datasource_properties add column if not exists state varchar(15);'
                    create_table_query += 'alter table configurable_datasource_properties add column if not exists datasource_name varchar(50);'
                    insert_query = ''
                    for d, r, info in zip(datasourcenames, tmp_columns, description):
                        insert_query = insert_query + "insert into configurable_datasource_properties values('" + d + "','" + r + "','" + info + "',False,'STOPPED','" + file_name_sql + "') except(select report_name,report_type,description,status,state,datasource_name from configurable_datasource_properties) ;";
                    all_queries = all_queries + '\n' + create_table_query + '\n' + insert_query
            key_index += 1
            del mycsv[:]
            if key_index == len(keywords):
                break
            key = keywords[key_index]
        else:
            mycsv.append(row)


def create_trans_to_aggregate_queries():
    global all_param_queries_1
    all_param_queries_1 = ''
    select_cols_exclude = ''
    for elem in select_columns:
        if elem != 'month':
            select_cols_exclude += elem + ' = excluded.' + elem + ','
    select_cols_exclude += result_col + ' = excluded.' + result_col
    select_cols_exclude += ',school_name=excluded.school_name,school_latitude=excluded.school_latitude,school_longitude=excluded.school_longitude,district_id=excluded.district_id,district_name=excluded.district_name,district_latitude=excluded.district_latitude,district_longitude=excluded.district_longitude,block_id=excluded.block_id,block_name=excluded.block_name,block_latitude=excluded.block_latitude,block_longitude=excluded.block_longitude,cluster_id=excluded.cluster_id,cluster_name=excluded.cluster_name,cluster_latitude=excluded.cluster_latitude,cluster_longitude=excluded.cluster_longitude,school_management_type=excluded.school_management_type,month=excluded.month'
    select_col = ''
    group_col = ''
    for col in select_columns:
        if col.lower() == 'grade':
            select_col += "concat('Grade_',  grade) as grade,"
            group_col = group_col + 'grade,'
        elif col.lower() != 'month':
            select_col += col + ','
            group_col += col + ','
    select_col = select_col[:-1]
    group_col = group_col[:-1]
    inner_query = '(select ' + select_col + ',trim(TO_CHAR(' + date_col + ", 'Month')) AS month" + ',' + agg_column + ' from ' + table_names + '_trans' + condition + ' group by ' + group_col + ') as a'
    inner_query_cols = ''

    for elem in select_columns:
        if elem != 'month':
            inner_query_cols = inner_query_cols + 'a.' + str(elem) + ','

    inner_query_cols = inner_query_cols + 'month,' + result_col
    static_query = '(select shd.school_id,initcap(school_name) as school_name,school_latitude,school_longitude,shd.cluster_id,initcap(cluster_name) as cluster_name,cluster_latitude,cluster_longitude,shd.block_id,initcap(block_name) as block_name,block_latitude,block_longitude,shd.district_id,initcap(district_name) as district_name,district_latitude,district_longitude,initcap(school_management_type) as school_management_type from school_hierarchy_details shd inner join school_geo_master sgm  on shd.school_id=sgm.school_id)as sch'
    stat = 'insert into ' + table_names + '_aggregation(' + group_col + ',month,' + result_col + ',school_name,school_latitude,school_longitude,cluster_id,cluster_name,cluster_latitude,cluster_longitude,block_id,block_name,block_latitude,block_longitude,district_id,district_name,district_latitude,district_longitude,school_management_type,created_on,updated_on)' + 'select ' + inner_query_cols + ',school_name,school_latitude,school_longitude,cluster_id,cluster_name,cluster_latitude,cluster_longitude,block_id,block_name,block_latitude,block_longitude,district_id,district_name,district_latitude,district_longitude,school_management_type,now(),now()' + ' from ' + inner_query + ' join ' + static_query + ' on a.school_id=sch.school_id on conflict(' + agg_pk_columns + ') do update set ' + select_cols_exclude + ',updated_on=now();'
    global to_insert_json
    to_insert_json = temp_to_trans
    to_insert_json += '{"trans_to_agg_insert":"' + stat + '"},'


def create_dml_timeline_queries():
    school_ = 'school_id,school_name,school_latitude,school_longitude,cluster_id,cluster_name,block_id,block_name,district_id,district_name'
    cluster_ = ' cluster_id,cluster_name,cluster_latitude,cluster_longitude,block_id,block_name,district_id,district_name'
    block_ = ' block_id,block_name,block_latitude,block_longitude,district_id,district_name'
    district_ = ' district_id,district_name,district_latitude,district_longitude'
    school_grp = 'school_id,school_name,school_latitude,school_longitude,cluster_id,cluster_name,block_id,block_name,district_id,district_name'
    cluster_grp = ' cluster_id,cluster_name,cluster_latitude,cluster_longitude,block_id,block_name,district_id,district_name'
    block_grp = ' block_id,block_name,block_latitude,block_longitude,district_id,district_name'
    district_grp = ' district_id,district_name,district_latitude,district_longitude'
    week = "concat('week_',cast(extract('day' from date_trunc('week',a." + date_col + ") -date_trunc('week', date_trunc('month',a." + date_col + " ))) / 7 + 1 as integer)::text) as week"
    week_var = week[:-8]
    daily_filter = ' where a.' + date_col + " in (select (generate_series(now()::date-'30day'::interval,(now()::date-'1day'::interval)::date,'1day'::interval)::date) as day) "
    weekly_filter = ' where a.' + date_col + " in (select (generate_series(now()::date-'100day'::interval,(now()::date-'1day'::interval)::date,'1day'::interval)::date) as day) "
    last_30_day_filter = ' where a.' + date_col + " in (select (generate_series(now()::date-'30day'::interval,(now()::date-'1day'::interval)::date,'1day'::interval)::date) as day) "
    last_7_day_filter = ' where a.' + date_col + " in (select (generate_series(now()::date-'7day'::interval,(now()::date-'1day'::interval)::date,'1day'::interval)::date) as day) "
    last_day_filter = ' where a.' + date_col + " in (select ((now()::date-'1day'::interval)::date) as day) "
    condition_val = condition.replace('where', 'and ')
    if student_id_exists is True:
        school_ = 'cnt.school_id,school_name,school_latitude,school_longitude,cnt.cluster_id,cluster_name,cnt.block_id,block_name,cnt.district_id,district_name,max(cnt.students_count) as students_count'
        cluster_ = 'cnt.cluster_id,cluster_name,cluster_latitude,cluster_longitude,cnt.block_id,block_name,cnt.district_id,district_name,max(cnt.students_count) as students_count'
        block_ = 'cnt.block_id,block_name,block_latitude,block_longitude,cnt.district_id,district_name,max(cnt.students_count) as students_count'
        district_ = ' cnt.district_id,district_name,district_latitude,district_longitude,max(cnt.students_count) as students_count'
        school_grp = 'cnt.school_id,school_name,school_latitude,school_longitude,cnt.cluster_id,cluster_name,cnt.block_id,block_name,cnt.district_id,district_name'
        cluster_grp = ' cnt.cluster_id,cluster_name,cluster_latitude,cluster_longitude,cnt.block_id,block_name,cnt.district_id,district_name'
        block_grp = ' cnt.block_id,block_name,block_latitude,block_longitude,cnt.district_id,district_name'
        district_grp = ' cnt.district_id,district_name,district_latitude,district_longitude'

    school_var = 'school_id,cluster_id,block_id,district_id '
    cluster_var = 'cluster_id,block_id,district_id '
    block_var = 'block_id,district_id '
    district_var = ' district_id '

    global to_sql
    to_sql = '\n'
    global dml_queries
    dml_queries = '[' + '\n'
    dml_queries += '{"tooltip_meta":"select '+ "'" + result_col_op + "' as result_column;" + '"},'
    filters = ['school', 'cluster', 'block', 'district']
    filter_var = [school_, cluster_, block_, district_]
    filter_grp = [school_grp, cluster_grp, block_grp, district_grp]
    filter_var_footer = [school_var, cluster_var, block_var, district_var]
    school_count = ''
    school_count_mgmt = ''
    global mv_queries
    mv_queries = '{"mv_queries": "'
    if 'daily' in df_time_sel:
        if student_id_exists is True:
            to_sql += 'create or replace view ' + table_names + '_school_stds_cnt_daily as  select shd.school_id,cluster_id,block_id,district_id,count(distinct student_id) as students_count,' + date_col + ' from ' + table_names + '_trans a  join school_hierarchy_details shd on a.school_id= shd.school_id ' + daily_filter + ' ' + condition_val + ' group by shd.school_id,cluster_id,block_id,district_id,a.' + date_col + ';' + '\n'
            to_sql += 'create or replace view ' + table_names + '_cluster_stds_cnt_daily as  select cluster_id,block_id,district_id,count(distinct student_id) as students_count,' + date_col + ' from ' + table_names + '_trans a  join school_hierarchy_details shd on a.school_id= shd.school_id ' + daily_filter + ' ' + condition_val + ' group by cluster_id,block_id,district_id,a.' + date_col + ';' + '\n'
            to_sql += 'create or replace view ' + table_names + '_block_stds_cnt_daily as  select block_id,district_id,count(distinct student_id) as students_count,' + date_col + ' from ' + table_names + '_trans a  join school_hierarchy_details shd on a.school_id= shd.school_id ' + daily_filter + ' ' + condition_val + ' group by block_id,district_id,a.' + date_col + ';' + '\n'
            to_sql += 'create or replace view ' + table_names + '_district_stds_cnt_daily as  select district_id,count(distinct student_id) as students_count,' + date_col + ' from ' + table_names + '_trans a  join school_hierarchy_details shd on a.school_id= shd.school_id ' + daily_filter + ' ' + condition_val + ' group by district_id,a.' + date_col + ';' + '\n'
            to_sql += 'create or replace view ' + table_names + '_school_mgt_stds_cnt_daily as  select shd.school_id,initcap(school_management_type) as school_management_type,cluster_id,block_id,district_id,count(distinct student_id) as students_count,' + date_col + ' from ' + table_names + '_trans a  join school_hierarchy_details shd on a.school_id= shd.school_id ' + daily_filter + ' ' + condition_val + ' group by shd.school_id,cluster_id,block_id,district_id,a.' + date_col + ';' + '\n'
            to_sql += 'create or replace view ' + table_names + '_cluster_mgt_stds_cnt_daily as  select initcap(school_management_type) as school_management_type,cluster_id,block_id,district_id,count(distinct student_id) as students_count,' + date_col + ' from ' + table_names + '_trans a  join school_hierarchy_details shd on a.school_id= shd.school_id ' + daily_filter + ' ' + condition_val + ' group by cluster_id,block_id,district_id,school_management_type,a.' + date_col + ';' + '\n'
            to_sql += 'create or replace view ' + table_names + '_block_mgt_stds_cnt_daily as  select initcap(school_management_type) as school_management_type,block_id,district_id,count(distinct student_id) as students_count,' + date_col + ' from ' + table_names + '_trans a  join school_hierarchy_details shd on a.school_id= shd.school_id ' + daily_filter + ' ' + condition_val + ' group by block_id,district_id,school_management_type,a.' + date_col + ';' + '\n'
            to_sql += 'create or replace view ' + table_names + '_district_mgt_stds_cnt_daily as  select initcap(school_management_type) as school_management_type,district_id,count(distinct student_id) as students_count,' + date_col + ' from ' + table_names + '_trans a  join school_hierarchy_details shd on a.school_id= shd.school_id ' + daily_filter + ' ' + condition_val + ' group by district_id,school_management_type,a.' + date_col + ';' + '\n'

        for filter, var, var_grp in zip(filters, filter_var, filter_grp):
            if student_id_exists is True:
                school_count = ' join ' + table_names + '_' + filter + '_stds_cnt_daily as cnt on a.' + filter + '_id= cnt.' + filter + '_id and a.' + date_col + '=cnt.' + date_col + ' '
                school_count_mgmt = ' join ' + table_names + '_' + filter + '_mgt_stds_cnt_daily as cnt on a.' + filter + '_id= cnt.' + filter + '_id and a.' + date_col + '=cnt.' + date_col + ' and a.school_management_type=cnt.school_management_type'
            else:
                school_count = ''
                school_count_mgmt = ''
            dml_queries += '{ "' + filter + '_daily":"select ' + week + ',' + var + ',a.' + date_col + ',count(distinct a.school_id) as total_schools,' + sel_col_op + ',' + metric_rep + ' from ' + table_names + '_aggregation as a' + school_count + daily_filter + ' group by ' + var_grp + ',a.' + date_col + ',' + sel_col_op + ',week "},'
            dml_queries += '{"' + filter + '_management_daily":"select ' + week + ',' + var + ',a.' + date_col + ',count(distinct a.school_id) as total_schools,a.school_management_type,' + sel_col_op + ',' + metric_rep + ' from ' + table_names + '_aggregation as a' + school_count_mgmt + daily_filter + ' group by ' + var_grp + ',a.' + date_col + ',a.school_management_type,' + sel_col_op + ',week"},'

    if 'weekly' in df_time_sel:
        if student_id_exists is True:
            to_sql += 'create or replace view ' + table_names + '_school_stds_cnt_weekly as  select shd.school_id,cluster_id,block_id,district_id,count(distinct student_id) as students_count,' + week + ' from ' + table_names + '_trans a  join school_hierarchy_details shd on a.school_id= shd.school_id ' + weekly_filter + ' ' + condition_val + ' group by shd.school_id,cluster_id,block_id,district_id,week;' + '\n'
            to_sql += 'create or replace view ' + table_names + '_cluster_stds_cnt_weekly as  select cluster_id,block_id,district_id,count(distinct student_id) as students_count,' + week + ' from ' + table_names + '_trans a  join school_hierarchy_details shd on a.school_id= shd.school_id ' + weekly_filter + ' ' + condition_val + ' group by cluster_id,block_id,district_id,week;' + '\n'
            to_sql += 'create or replace view ' + table_names + '_block_stds_cnt_weekly as  select block_id,district_id,count(distinct student_id) as students_count,' + week + ' from ' + table_names + '_trans a  join school_hierarchy_details shd on a.school_id= shd.school_id ' + weekly_filter + ' ' + condition_val + ' group by block_id,district_id,week;' + '\n'
            to_sql += 'create or replace view ' + table_names + '_district_stds_cnt_weekly as  select district_id,count(distinct student_id) as students_count,' + week + ' from ' + table_names + '_trans a  join school_hierarchy_details shd on a.school_id= shd.school_id ' + weekly_filter + ' ' + condition_val + ' group by district_id,week ;' + '\n'
            to_sql += 'create or replace view ' + table_names + '_school_mgt_stds_cnt_weekly as  select shd.school_id,initcap(school_management_type) as school_management_type,cluster_id,block_id,district_id,count(distinct student_id) as students_count,' + week + ' from ' + table_names + '_trans a  join school_hierarchy_details shd on a.school_id= shd.school_id ' + weekly_filter + ' ' + condition_val + ' group by shd.school_id,cluster_id,block_id,district_id,week;' + '\n'
            to_sql += 'create or replace view ' + table_names + '_cluster_mgt_stds_cnt_weekly as  select initcap(school_management_type) as school_management_type,cluster_id,block_id,district_id,count(distinct student_id) as students_count,' + week + ' from ' + table_names + '_trans a  join school_hierarchy_details shd on a.school_id= shd.school_id ' + weekly_filter + ' ' + condition_val + ' group by cluster_id,block_id,district_id,school_management_type,week;' + '\n'
            to_sql += 'create or replace view ' + table_names + '_block_mgt_stds_cnt_weekly as  select initcap(school_management_type) as school_management_type,block_id,district_id,count(distinct student_id) as students_count,' + week + ' from ' + table_names + '_trans a  join school_hierarchy_details shd on a.school_id= shd.school_id ' + weekly_filter + ' ' + condition_val + ' group by block_id,district_id,school_management_type,week;' + '\n'
            to_sql += 'create or replace view ' + table_names + '_district_mgt_stds_cnt_weekly as  select initcap(school_management_type) as school_management_type,district_id,count(distinct student_id) as students_count,' + week + ' from ' + table_names + '_trans a  join school_hierarchy_details shd on a.school_id= shd.school_id ' + weekly_filter + ' ' + condition_val + ' group by district_id,school_management_type,week ;' + '\n'
        for filter, var, var_grp in zip(filters, filter_var, filter_grp):
            if student_id_exists is True:
                school_count = ' join ' + table_names + '_' + filter + '_stds_cnt_weekly as cnt on a.' + filter + '_id= cnt.' + filter + '_id and ' + week_var + '=cnt.week '
                school_count_mgmt = ' join ' + table_names + '_' + filter + '_mgt_stds_cnt_weekly as cnt on a.' + filter + '_id= cnt.' + filter + '_id and ' + week_var + '=cnt.week and a.school_management_type=cnt.school_management_type '
            else:
                school_count = ''
                school_count_mgmt = ''
            dml_queries += '{"' + filter + '_weekly":"select ' + week + ',' + var + ',count(distinct a.school_id) as total_schools,' + sel_col_op + ',' + metric_rep + ' from ' + table_names + '_aggregation as a ' + school_count + weekly_filter + ' group by ' + var_grp + ',' + sel_col_op + ',' + week_var + '"},'
            dml_queries += '{"' + filter + '_management_weekly":"select ' + week + ',' + var + ',count(distinct a.school_id) as total_schools,a.school_management_type,' + sel_col_op + ',' + metric_rep + ' from ' + table_names + '_aggregation as a' + school_count_mgmt + weekly_filter + ' group by ' + var_grp + ',' + sel_col_op + ',a.school_management_type,' + week_var + '"},'

    if 'year_and_month' in df_time_sel:
        if student_id_exists is True:
            to_sql += 'create or replace view ' + table_names + '_school_stds_cnt_monthly as  select shd.school_id,cluster_id,block_id,district_id,count(distinct student_id) as students_count,academic_year(' + date_col + ')as academic_year,trim(TO_CHAR(' + date_col + ", 'Month')) AS month " + ' from ' + table_names + '_trans a  join school_hierarchy_details shd on a.school_id= shd.school_id ' + condition + ' group by shd.school_id,cluster_id,block_id,district_id,academic_year(' + date_col + '),trim(TO_CHAR(' + date_col + ", 'Month'));" + '\n'
            to_sql += 'create or replace view ' + table_names + '_cluster_stds_cnt_monthly as  select cluster_id,block_id,district_id,count(distinct student_id) as students_count,academic_year(' + date_col + ')as academic_year,trim(TO_CHAR(' + date_col + ", 'Month')) AS month " + ' from ' + table_names + '_trans a  join school_hierarchy_details shd on a.school_id= shd.school_id ' + condition + ' group by cluster_id,block_id,district_id,academic_year(' + date_col + '),trim(TO_CHAR(' + date_col + ", 'Month'));" + '\n'
            to_sql += 'create or replace view ' + table_names + '_block_stds_cnt_monthly as  select block_id,district_id,count(distinct student_id) as students_count,academic_year(' + date_col + ')as academic_year,trim(TO_CHAR(' + date_col + ", 'Month')) AS month " + ' from ' + table_names + '_trans a  join school_hierarchy_details shd on a.school_id= shd.school_id ' + condition + '  group by block_id,district_id,academic_year(' + date_col + '),trim(TO_CHAR(' + date_col + ", 'Month'));" + '\n'
            to_sql += 'create or replace view ' + table_names + '_district_stds_cnt_monthly as  select district_id,count(distinct student_id) as students_count,academic_year(' + date_col + ')as academic_year,trim(TO_CHAR(' + date_col + ", 'Month')) AS month " + ' from ' + table_names + '_trans a  join school_hierarchy_details shd on a.school_id= shd.school_id ' + condition + '  group by district_id,academic_year(' + date_col + '),trim(TO_CHAR(' + date_col + ", 'Month'));" + '\n'
            to_sql += 'create or replace view ' + table_names + '_school_mgt_stds_cnt_monthly as  select shd.school_id,initcap(school_management_type) as school_management_type,cluster_id,block_id,district_id,count(distinct student_id) as students_count,academic_year(' + date_col + ')as academic_year,trim(TO_CHAR(' + date_col + ", 'Month')) AS month " + ' from ' + table_names + '_trans a  join school_hierarchy_details shd on a.school_id= shd.school_id ' + condition + ' group by shd.school_id,cluster_id,block_id,school_management_type,district_id,academic_year(' + date_col + '),trim(TO_CHAR(' + date_col + ", 'Month'));" + '\n'
            to_sql += 'create or replace view ' + table_names + '_cluster_mgt_stds_cnt_monthly as  select initcap(school_management_type) as school_management_type,cluster_id,block_id,district_id,count(distinct student_id) as students_count,academic_year(' + date_col + ')as academic_year,trim(TO_CHAR(' + date_col + ", 'Month')) AS month " + ' from ' + table_names + '_trans a  join school_hierarchy_details shd on a.school_id= shd.school_id ' + condition + ' group by cluster_id,block_id,district_id,academic_year(' + date_col + '),school_management_type,trim(TO_CHAR(' + date_col + ", 'Month'));" + '\n'
            to_sql += 'create or replace view ' + table_names + '_block_mgt_stds_cnt_monthly as  select initcap(school_management_type) as school_management_type,block_id,district_id,count(distinct student_id) as students_count,academic_year(' + date_col + ')as academic_year,trim(TO_CHAR(' + date_col + ", 'Month')) AS month " + ' from ' + table_names + '_trans a  join school_hierarchy_details shd on a.school_id= shd.school_id ' + condition + ' group by block_id,district_id,academic_year(' + date_col + '),trim(TO_CHAR(' + date_col + ", 'Month')),school_management_type;" + '\n'
            to_sql += 'create or replace view ' + table_names + '_district_mgt_stds_cnt_monthly as  select initcap(school_management_type) as school_management_type,district_id,count(distinct student_id) as students_count,academic_year(' + date_col + ')as academic_year,trim(TO_CHAR(' + date_col + ", 'Month')) AS month " + ' from ' + table_names + '_trans a  join school_hierarchy_details shd on a.school_id= shd.school_id  ' + condition + ' group by district_id,academic_year(' + date_col + '),trim(TO_CHAR(' + date_col + ", 'Month')),school_management_type;" + '\n'
        for filter, var, var_grp in zip(filters, filter_var, filter_grp):
            if student_id_exists is True:
                school_count = ' join ' + table_names + '_' + filter + '_stds_cnt_monthly as cnt on a.' + filter + '_id= cnt.' + filter + '_id and a.month=cnt.month and a.academic_year=cnt.academic_year '
                school_count_mgmt = ' join ' + table_names + '_' + filter + '_mgt_stds_cnt_monthly as cnt on a.' + filter + '_id= cnt.' + filter + '_id and a.month=cnt.month and a.school_management_type=cnt.school_management_type and a.academic_year = cnt.academic_year '
            else:
                school_count = ''
                school_count_mgmt = ''
            dml_queries += '{"' + filter + '_by_month_year":"select ' + var + ',count(distinct a.school_id) as total_schools,a.academic_year,a.month,' + metric_rep + ' from ' + table_names + '_aggregation as a ' + school_count + ' group by ' + var_grp + ',a.academic_year,a.month"},'
            dml_queries += '{"' + filter + '_management_by_month_year":"select ' + var + ',count(distinct a.school_id) as total_schools,a.school_management_type,a.academic_year,a.month,' + metric_rep + ' from ' + table_names + '_aggregation as a ' + school_count_mgmt + ' group by ' + var_grp + ',' + 'a.academic_year,a.month,a.school_management_type"},'

    if 'overall' in df_time_sel:
        if student_id_exists is True:
            to_sql += 'create or replace view ' + table_names + '_school_stds_cnt_overall as  select shd.school_id,cluster_id,block_id,district_id,count(distinct student_id) as students_count from ' + table_names + '_trans  a  join school_hierarchy_details shd on a.school_id= shd.school_id ' + condition + ' group by shd.school_id,cluster_id,block_id,district_id;' + '\n'
            to_sql += 'create or replace view ' + table_names + '_cluster_stds_cnt_overall as  select cluster_id,block_id,district_id,count(distinct student_id) as students_count from ' + table_names + '_trans a  join school_hierarchy_details shd on a.school_id= shd.school_id ' + condition + '  group by cluster_id,block_id,district_id;' + '\n'
            to_sql += 'create or replace view ' + table_names + '_block_stds_cnt_overall as  select block_id,district_id,count(distinct student_id) as students_count from ' + table_names + '_trans a  join school_hierarchy_details shd on a.school_id= shd.school_id ' + condition + '  group by block_id,district_id;' + '\n'
            to_sql += 'create or replace view ' + table_names + '_district_stds_cnt_overall as  select district_id,count(distinct student_id) as students_count from ' + table_names + '_trans a  join school_hierarchy_details shd on a.school_id= shd.school_id ' + condition + '  group by district_id;' + '\n'
            to_sql += 'create or replace view ' + table_names + '_school_mgt_stds_cnt_overall as  select shd.school_id,initcap(school_management_type) as school_management_type,cluster_id,block_id,district_id,count(distinct student_id) as students_count from ' + table_names + '_trans  a  join school_hierarchy_details shd on a.school_id= shd.school_id ' + condition + ' group by shd.school_id,cluster_id,block_id,school_management_type,district_id;' + '\n'
            to_sql += 'create or replace view ' + table_names + '_cluster_mgt_stds_cnt_overall as  select initcap(school_management_type) as school_management_type,cluster_id,block_id,district_id,count(distinct student_id) as students_count from ' + table_names + '_trans a  join school_hierarchy_details shd on a.school_id= shd.school_id ' + condition + '  group by cluster_id,block_id,district_id,school_management_type;' + '\n'
            to_sql += 'create or replace view ' + table_names + '_block_mgt_stds_cnt_overall as  select initcap(school_management_type) as school_management_type,block_id,district_id,count(distinct student_id) as students_count from ' + table_names + '_trans a  join school_hierarchy_details shd on a.school_id= shd.school_id ' + condition + '  group by block_id,district_id,school_management_type;' + '\n'
            to_sql += 'create or replace view ' + table_names + '_district_mgt_stds_cnt_overall as  select initcap(school_management_type) as school_management_type,district_id,count(distinct student_id) as students_count from ' + table_names + '_trans a  join school_hierarchy_details shd on a.school_id= shd.school_id ' + condition + '  group by district_id,school_management_type;' + '\n'
        for filter, var, var_grp in zip(filters, filter_var, filter_grp):
            if student_id_exists is True:
                school_count = ' join ' + table_names + '_' + filter + '_stds_cnt_overall as cnt on a.' + filter + '_id= cnt.' + filter + '_id  '
                school_count_mgmt = ' join ' + table_names + '_' + filter + '_mgt_stds_cnt_overall as cnt on a.' + filter + '_id= cnt.' + filter + '_id and a.school_management_type=cnt.school_management_type '
            else:
                school_count = ''
                school_count_mgmt = ''
            dml_queries += '{"' + filter + '_overall":"select ' + var + ',count(distinct a.school_id) as total_schools,' + metric_rep + ' from ' + table_names + '_aggregation as a ' + school_count + ' group  by ' + var_grp + '"},'
            dml_queries += '{"' + filter + '_management_overall":"select ' + var + ',count(distinct a.school_id) as total_schools,a.school_management_type,' + metric_rep + ' from ' + table_names + '_aggregation as a' + school_count_mgmt + ' group  by ' + var_grp + ',a.school_management_type' + '"},'

    if 'last_30_days' in df_time_sel:
        if student_id_exists is True:
            to_sql += 'create or replace view ' + table_names + '_school_stds_cnt_last30 as  select shd.school_id,cluster_id,block_id,district_id,count(distinct student_id) as students_count from ' + table_names + '_trans a  join school_hierarchy_details shd on a.school_id= shd.school_id ' + last_30_day_filter + ' ' + condition_val + ' group by shd.school_id,cluster_id,block_id,district_id;' + '\n'
            to_sql += 'create or replace view ' + table_names + '_cluster_stds_cnt_last30 as  select cluster_id,block_id,district_id,count(distinct student_id) as students_count from ' + table_names + '_trans a  join school_hierarchy_details shd on a.school_id= shd.school_id ' + last_30_day_filter + ' ' + condition_val +  ' group by cluster_id,block_id,district_id;' + '\n'
            to_sql += 'create or replace view ' + table_names + '_block_stds_cnt_last30 as  select block_id,district_id,count(distinct student_id) as students_count from ' + table_names + '_trans a  join school_hierarchy_details shd on a.school_id= shd.school_id ' + last_30_day_filter + ' ' + condition_val + ' group  by block_id,district_id;' + '\n'
            to_sql += 'create or replace view ' + table_names + '_district_stds_cnt_last30 as  select district_id,count(distinct student_id) as students_count from ' + table_names + '_trans a  join school_hierarchy_details shd on a.school_id= shd.school_id ' + last_30_day_filter + ' ' + condition_val +  ' group by district_id;' + '\n'
            to_sql += 'create or replace view ' + table_names + '_school_mgt_stds_cnt_last30 as  select shd.school_id,initcap(school_management_type) as school_management_type,cluster_id,block_id,district_id,count(distinct student_id) as students_count from ' + table_names + '_trans a  join school_hierarchy_details shd on a.school_id= shd.school_id ' + last_30_day_filter + ' ' + condition_val + ' group by shd.school_id,cluster_id,block_id,school_management_type,district_id;' + '\n'
            to_sql += 'create or replace view ' + table_names + '_cluster_mgt_stds_cnt_last30 as  select initcap(school_management_type) as school_management_type,cluster_id,block_id,district_id,count(distinct student_id) as students_count from ' + table_names + '_trans a  join school_hierarchy_details shd on a.school_id= shd.school_id ' + last_30_day_filter + ' ' + condition_val + ' group by cluster_id,block_id,district_id,school_management_type;' + '\n'
            to_sql += 'create or replace view ' + table_names + '_block_mgt_stds_cnt_last30 as  select initcap(school_management_type) as school_management_type,block_id,district_id,count(distinct student_id) as students_count from ' + table_names + '_trans a  join school_hierarchy_details shd on a.school_id= shd.school_id ' + last_30_day_filter + ' ' + condition_val + ' group  by block_id,district_id,school_management_type;' + '\n'
            to_sql += 'create or replace view ' + table_names + '_district_mgt_stds_cnt_last30 as  select initcap(school_management_type) as school_management_type,district_id,count(distinct student_id) as students_count from ' + table_names + '_trans a  join school_hierarchy_details shd on a.school_id= shd.school_id ' + last_30_day_filter + ' ' + condition_val + ' group by district_id,school_management_type;' + '\n'
        for filter, var, var_grp in zip(filters, filter_var, filter_grp):
            if student_id_exists is True:
                school_count = ' join ' + table_names + '_' + filter + '_stds_cnt_last30 as cnt on a.' + filter + '_id= cnt.' + filter + '_id  '
                school_count_mgmt = ' join ' + table_names + '_' + filter + '_mgt_stds_cnt_last30 as cnt on a.' + filter + '_id= cnt.' + filter + '_id and a.school_management_type=cnt.school_management_type '
            else:
                school_count = ''
                school_count_mgmt = ''
            dml_queries += '{"' + filter + '_last_30":"select ' + var + ',count(distinct a.school_id) as total_schools,' + metric_rep + ' from ' + table_names + '_aggregation as a ' + school_count + last_30_day_filter + ' group  by ' + var_grp + '"},'
            dml_queries += '{"' + filter + '_management_last_30":"select ' + var + ',count(distinct a.school_id) as total_schools,a.school_management_type,' + metric_rep + ' from ' + table_names + '_aggregation as a ' + school_count_mgmt + last_30_day_filter + ' group  by ' + var_grp + ',a.school_management_type' + '"},'

    if 'last_7_days' in df_time_sel:
        if student_id_exists is True:
            to_sql += 'create or replace view ' + table_names + '_school_stds_cnt_last7 as  select shd.school_id,cluster_id,block_id,district_id,count(distinct student_id) as students_count from ' + table_names + '_trans a  join school_hierarchy_details shd on a.school_id= shd.school_id ' + last_7_day_filter + ' ' + condition_val + ' group by shd.school_id,cluster_id,block_id,district_id;' + '\n'
            to_sql += 'create or replace view ' + table_names + '_cluster_stds_cnt_last7 as  select cluster_id,block_id,district_id,count(distinct student_id) as students_count from ' + table_names + '_trans a  join school_hierarchy_details shd on a.school_id= shd.school_id ' + last_7_day_filter + ' ' + condition_val + ' group by cluster_id,block_id,district_id;' + '\n'
            to_sql += 'create or replace view ' + table_names + '_block_stds_cnt_last7 as  select block_id,district_id,count(distinct student_id) as students_count from ' + table_names + '_trans a  join school_hierarchy_details shd on a.school_id= shd.school_id ' + last_7_day_filter + ' ' + condition_val + ' group  by block_id,district_id;' + '\n'
            to_sql += 'create or replace view ' + table_names + '_district_stds_cnt_last7 as  select district_id,count(distinct student_id) as students_count from ' + table_names + '_trans a  join school_hierarchy_details shd on a.school_id= shd.school_id ' + last_7_day_filter + ' ' + condition_val +  ' group by district_id;' + '\n'
            to_sql += 'create or replace view ' + table_names + '_school_mgt_stds_cnt_last7 as  select shd.school_id,initcap(school_management_type) as school_management_type,cluster_id,block_id,district_id,count(distinct student_id) as students_count from ' + table_names + '_trans a  join school_hierarchy_details shd on a.school_id= shd.school_id ' + last_7_day_filter + ' ' + condition_val + ' group by shd.school_id,cluster_id,block_id,school_management_type,district_id;' + '\n'
            to_sql += 'create or replace view ' + table_names + '_cluster_mgt_stds_cnt_last7 as  select initcap(school_management_type) as school_management_type,cluster_id,block_id,district_id,count(distinct student_id) as students_count from ' + table_names + '_trans a  join school_hierarchy_details shd on a.school_id= shd.school_id ' + last_7_day_filter + ' ' + condition_val + ' group by cluster_id,block_id,district_id,school_management_type;' + '\n'
            to_sql += 'create or replace view ' + table_names + '_block_mgt_stds_cnt_last7 as  select initcap(school_management_type) as school_management_type,block_id,district_id,count(distinct student_id) as students_count from ' + table_names + '_trans a  join school_hierarchy_details shd on a.school_id= shd.school_id ' + last_7_day_filter + ' ' + condition_val + ' group  by block_id,district_id,school_management_type;' + '\n'
            to_sql += 'create or replace view ' + table_names + '_district_mgt_stds_cnt_last7 as  select initcap(school_management_type) as school_management_type,district_id,count(distinct student_id) as students_count from ' + table_names + '_trans a  join school_hierarchy_details shd on a.school_id= shd.school_id ' + last_7_day_filter + ' ' + condition_val +  ' group by district_id,school_management_type;' + '\n'
        for filter, var, var_grp in zip(filters, filter_var, filter_grp):
            if student_id_exists is True:
                school_count = ' join ' + table_names + '_' + filter + '_stds_cnt_last7 as cnt on a.' + filter + '_id= cnt.' + filter + '_id  '
                school_count_mgmt = ' join ' + table_names + '_' + filter + '_mgt_stds_cnt_last7 as cnt on a.' + filter + '_id= cnt.' + filter + '_id and a.school_management_type=cnt.school_management_type '
            else:
                school_count = ''
                school_count_mgmt = ''
            dml_queries += '{"' + filter + '_last_7":"select ' + var + ',count(distinct a.school_id) as total_schools,' + metric_rep + ' from ' + table_names + '_aggregation as a ' + school_count + last_7_day_filter + ' group  by ' + var_grp + '"},'
            dml_queries += '{"' + filter + '_management_last_7":"select ' + var + ',count(distinct a.school_id) as total_schools,a.school_management_type,' + metric_rep + ' from ' + table_names + '_aggregation as a ' + school_count_mgmt + last_7_day_filter + ' group  by ' + var_grp + ',a.school_management_type' + '"},'

    if 'last_day' in df_time_sel:
        if student_id_exists is True:
            to_sql += 'create or replace view ' + table_names + '_school_stds_cnt_last_day as  select shd.school_id,cluster_id,block_id,district_id,count(distinct student_id) as students_count from ' + table_names + '_trans a  join school_hierarchy_details shd on a.school_id= shd.school_id ' + last_day_filter + ' ' + condition_val +  ' group by shd.school_id,cluster_id,block_id,district_id;' + '\n'
            to_sql += 'create or replace view ' + table_names + '_cluster_stds_cnt_last_day as  select cluster_id,block_id,district_id,count(distinct student_id) as students_count from ' + table_names + '_trans a  join school_hierarchy_details shd on a.school_id= shd.school_id ' + last_day_filter + ' ' + condition_val +  ' group by cluster_id,block_id,district_id;' + '\n'
            to_sql += 'create or replace view ' + table_names + '_block_stds_cnt_last_day as  select block_id,district_id,count(distinct student_id) as students_count from ' + table_names + '_trans a  join school_hierarchy_details shd on a.school_id= shd.school_id ' + last_day_filter + ' ' + condition_val +  ' group  by block_id,district_id;' + '\n'
            to_sql += 'create or replace view ' + table_names + '_district_stds_cnt_last_day as  select district_id,count(distinct student_id) as students_count from ' + table_names + '_trans a  join school_hierarchy_details shd on a.school_id= shd.school_id ' + last_day_filter + ' ' + condition_val +  ' group by district_id;' + '\n'
            to_sql += 'create or replace view ' + table_names + '_school_mgt_stds_cnt_last_day as  select shd.school_id,initcap(school_management_type) as school_management_type,cluster_id,block_id,district_id,count(distinct student_id) as students_count from ' + table_names + '_trans a  join school_hierarchy_details shd on a.school_id= shd.school_id ' + last_day_filter + ' ' + condition_val +  ' group by shd.school_id,cluster_id,block_id,school_management_type,district_id;' + '\n'
            to_sql += 'create or replace view ' + table_names + '_cluster_mgt_stds_cnt_last_day as  select initcap(school_management_type) as school_management_type,cluster_id,block_id,district_id,count(distinct student_id) as students_count from ' + table_names + '_trans a  join school_hierarchy_details shd on a.school_id= shd.school_id ' + last_day_filter + ' ' + condition_val +  ' group by cluster_id,block_id,district_id,school_management_type;' + '\n'
            to_sql += 'create or replace view ' + table_names + '_block_mgt_stds_cnt_last_day as  select initcap(school_management_type) as school_management_type,block_id,district_id,count(distinct student_id) as students_count from ' + table_names + '_trans a  join school_hierarchy_details shd on a.school_id= shd.school_id ' + last_day_filter + ' ' + condition_val +  ' group  by block_id,district_id,school_management_type;' + '\n'
            to_sql += 'create or replace view ' + table_names + '_district_mgt_stds_cnt_last_day as  select initcap(school_management_type) as school_management_type,district_id,count(distinct student_id) as students_count from ' + table_names + '_trans a  join school_hierarchy_details shd on a.school_id= shd.school_id ' + last_day_filter + ' ' + condition_val +  ' group by district_id,school_management_type;' + '\n'
        for filter, var, var_grp in zip(filters, filter_var, filter_grp):
            if student_id_exists is True:
                school_count = ' join ' + table_names + '_' + filter + '_stds_cnt_last_day as cnt on a.' + filter + '_id= cnt.' + filter + '_id  '
                school_count_mgmt = ' join ' + table_names + '_' + filter + '_mgt_stds_cnt_last_day as cnt on a.' + filter + '_id= cnt.' + filter + '_id and a.school_management_type=cnt.school_management_type '
            else:
                school_count = ''
                school_count_mgmt = ''
            dml_queries += '{"' + filter + '_last_day":"select ' + var + ',' + date_col + ',count(distinct a.school_id) as total_schools,' + metric_rep + ' from ' + table_names + '_aggregation as a ' + school_count + last_day_filter + ' group  by ' + var_grp + ',' + date_col + '"},'
            dml_queries += '{"' + filter + '_management_last_day":"select ' + var + ',' + date_col + ',count(distinct a.school_id) as total_schools,a.school_management_type,' + metric_rep + ' from ' + table_names + '_aggregation as a ' + school_count_mgmt + last_day_filter + ' group  by ' + var_grp + ',a.school_management_type' + ',' + date_col +  '"},'

    # Grade level queries
    if 'grade' in df_filters_req:
        if 'daily' in df_time_sel:
            if student_id_exists is True:
                to_sql += 'create or replace view ' + table_names + "_school_stds_cnt_grade_daily as  select concat('Grade_',  grade) as grade,shd.school_id,cluster_id,block_id,district_id,count(distinct student_id) as students_count," + date_col + ' from ' + table_names + '_trans a  join school_hierarchy_details shd on a.school_id= shd.school_id ' + daily_filter + ' ' + condition_val +  ' group by shd.school_id,cluster_id,block_id,district_id,a.' + date_col + ',grade;' + '\n'
                to_sql += 'create or replace view ' + table_names + "_cluster_stds_cnt_grade_daily as  select concat('Grade_',  grade) as grade,cluster_id,block_id,district_id,count(distinct student_id) as students_count," + date_col + ' from ' + table_names + '_trans a  join school_hierarchy_details shd on a.school_id= shd.school_id ' + daily_filter + ' ' + condition_val +  ' group by cluster_id,block_id,district_id,a.' + date_col + ',grade;' + '\n'
                to_sql += 'create or replace view ' + table_names + "_block_stds_cnt_grade_daily as  select concat('Grade_',  grade) as grade,block_id,district_id,count(distinct student_id) as students_count," + date_col + ' from ' + table_names + '_trans a  join school_hierarchy_details shd on a.school_id= shd.school_id ' + daily_filter + ' ' + condition_val +  ' group by block_id,district_id,a.' + date_col + ',grade;' + '\n'
                to_sql += 'create or replace view ' + table_names + "_district_stds_cnt_grade_daily as  select concat('Grade_',  grade) as grade,district_id,count(distinct student_id) as students_count," + date_col + ' from ' + table_names + '_trans a  join school_hierarchy_details shd on a.school_id= shd.school_id ' + daily_filter + ' ' + condition_val +  ' group by district_id,a.' + date_col + ',grade;' + '\n'
                to_sql += 'create or replace view ' + table_names + "_school_mgt_stds_cnt_grade_daily as  select concat('Grade_',  grade) as grade,shd.school_id,initcap(school_management_type) as school_management_type,cluster_id,block_id,district_id,count(distinct student_id) as students_count," + date_col + ' from ' + table_names + '_trans a  join school_hierarchy_details shd on a.school_id= shd.school_id ' + daily_filter + ' ' + condition_val +  ' group by shd.school_id,cluster_id,block_id,district_id,a.' + date_col + ',grade;' + '\n'
                to_sql += 'create or replace view ' + table_names + "_cluster_mgt_stds_cnt_grade_daily as  select concat('Grade_',  grade) as grade,initcap(school_management_type) as school_management_type,cluster_id,block_id,district_id,count(distinct student_id) as students_count," + date_col + ' from ' + table_names + '_trans a  join school_hierarchy_details shd on a.school_id= shd.school_id ' + daily_filter + ' ' + condition_val +  ' group by cluster_id,block_id,district_id,school_management_type,a.' + date_col + ',grade;' + '\n'
                to_sql += 'create or replace view ' + table_names + "_block_mgt_stds_cnt_grade_daily as  select concat('Grade_',  grade) as grade,initcap(school_management_type) as school_management_type,block_id,district_id,count(distinct student_id) as students_count," + date_col + ' from ' + table_names + '_trans a  join school_hierarchy_details shd on a.school_id= shd.school_id ' + daily_filter + ' ' + condition_val +  ' group by block_id,district_id,school_management_type,a.' + date_col + ',grade;' + '\n'
                to_sql += 'create or replace view ' + table_names + "_district_mgt_stds_cnt_grade_daily as  select concat('Grade_',  grade) as grade,initcap(school_management_type) as school_management_type,district_id,count(distinct student_id) as students_count," + date_col + ' from ' + table_names + '_trans a  join school_hierarchy_details shd on a.school_id= shd.school_id ' + daily_filter + ' ' + condition_val +  ' group by district_id,school_management_type,a.' + date_col + ',grade;' + '\n'
            for filter, var, var_grp in zip(filters, filter_var, filter_grp):
                if student_id_exists is True:
                    school_count = ' join ' + table_names + '_' + filter + '_stds_cnt_grade_daily as cnt on a.' + filter + '_id= cnt.' + filter + '_id and a.' + date_col + '=cnt.' + date_col + ' and a.grade = cnt.grade '
                    school_count_mgmt = ' join ' + table_names + '_' + filter + '_mgt_stds_cnt_grade_daily as cnt on a.' + filter + '_id= cnt.' + filter + '_id and a.' + date_col + '=cnt.' + date_col + ' and a.school_management_type=cnt.school_management_type and a.grade=cnt.grade'
                else:
                    school_count = ''
                    school_count_mgmt = ''
                dml_queries += '{ "' + filter + '_grade_daily":"select a.grade,' + week + ',count(distinct a.school_id) as total_schools,' + var + ',a.' + date_col + ',' + sel_col_op + ',' + metric_rep + ' from ' + table_names + '_aggregation as a ' + school_count + daily_filter + ' group  by ' + var_grp + ',' + sel_col_op + ',a.' + date_col + ',week,a.grade"},'
                dml_queries += '{"' + filter + '_management_grade_daily":"select a.grade,' + week + ',count(distinct a.school_id) as total_schools,' + var + ',a.' + date_col + ',a.school_management_type,' + sel_col_op + ',' + metric_rep + ' from ' + table_names + '_aggregation as a ' + school_count_mgmt + daily_filter + ' group  by ' + var_grp + ',a.' + date_col + ',a.school_management_type,' + sel_col_op + ',week,a.grade"},'

        if 'weekly' in df_time_sel:
            if student_id_exists is True:
                to_sql += 'create or replace view ' + table_names + "_school_stds_cnt_grade_weekly as  select concat('Grade_',  grade) as grade,shd.school_id,cluster_id,block_id,district_id,count(distinct student_id) as students_count," + week + ' from ' + table_names + '_trans a  join school_hierarchy_details shd on a.school_id= shd.school_id  ' + weekly_filter + ' ' + condition_val +  ' group by shd.school_id,cluster_id,block_id,district_id,week,grade;' + '\n'
                to_sql += 'create or replace view ' + table_names + "_cluster_stds_cnt_grade_weekly as  select concat('Grade_',  grade) as grade,cluster_id,block_id,district_id,count(distinct student_id) as students_count," + week + ' from ' + table_names + '_trans a  join school_hierarchy_details shd on a.school_id= shd.school_id ' + weekly_filter + ' ' + condition_val +  ' group by cluster_id,block_id,district_id,week,grade;' + '\n'
                to_sql += 'create or replace view ' + table_names + "_block_stds_cnt_grade_weekly as  select concat('Grade_',  grade) as grade,block_id,district_id,count(distinct student_id) as students_count," + week + ' from ' + table_names + '_trans a  join school_hierarchy_details shd on a.school_id= shd.school_id ' + weekly_filter + ' ' + condition_val +  ' group by block_id,district_id,week,grade;' + '\n'
                to_sql += 'create or replace view ' + table_names + "_district_stds_cnt_grade_weekly as  select concat('Grade_',  grade) as grade,district_id,count(distinct student_id) as students_count," + week + ' from ' + table_names + '_trans a  join school_hierarchy_details shd on a.school_id= shd.school_id ' + weekly_filter + ' ' + condition_val +  ' group by district_id,week,grade ;' + '\n'
                to_sql += 'create or replace view ' + table_names + "_school_mgt_stds_cnt_grade_weekly as  select concat('Grade_',  grade) as grade,shd.school_id,initcap(school_management_type) as school_management_type,cluster_id,block_id,district_id,count(distinct student_id) as students_count," + week + ' from ' + table_names + '_trans a  join school_hierarchy_details shd on a.school_id= shd.school_id  ' + weekly_filter + ' ' + condition_val +  ' group by shd.school_id,cluster_id,block_id,district_id,week,grade;' + '\n'
                to_sql += 'create or replace view ' + table_names + "_cluster_mgt_stds_cnt_grade_weekly as  select concat('Grade_',  grade) as grade,initcap(school_management_type) as school_management_type,cluster_id,block_id,district_id,count(distinct student_id) as students_count," + week + ' from ' + table_names + '_trans a  join school_hierarchy_details shd on a.school_id= shd.school_id ' + weekly_filter + ' ' + condition_val +  ' group by cluster_id,block_id,district_id,school_management_type,week,grade;' + '\n'
                to_sql += 'create or replace view ' + table_names + "_block_mgt_stds_cnt_grade_weekly as  select concat('Grade_',  grade) as grade,initcap(school_management_type) as school_management_type,block_id,district_id,count(distinct student_id) as students_count," + week + ' from ' + table_names + '_trans a  join school_hierarchy_details shd on a.school_id= shd.school_id ' + weekly_filter + ' ' + condition_val +  ' group by block_id,district_id,school_management_type,week,grade;' + '\n'
                to_sql += 'create or replace view ' + table_names + "_district_mgt_stds_cnt_grade_weekly as  select concat('Grade_',  grade) as grade,initcap(school_management_type) as school_management_type,district_id,count(distinct student_id) as students_count," + week + ' from ' + table_names + '_trans a  join school_hierarchy_details shd on a.school_id= shd.school_id ' + weekly_filter + ' ' + condition_val +  ' group by district_id,school_management_type,week,grade ;' + '\n'
            for filter, var, var_grp in zip(filters, filter_var, filter_grp):
                if student_id_exists is True:
                    week_var = week[:-8]
                    school_count = ' join ' + table_names + '_' + filter + '_stds_cnt_grade_weekly as cnt on a.' + filter + '_id= cnt.' + filter + '_id and ' + week_var + '=cnt.week and a.grade=cnt.grade '
                    school_count_mgmt = ' join ' + table_names + '_' + filter + '_mgt_stds_cnt_grade_weekly as cnt on a.' + filter + '_id= cnt.' + filter + '_id and ' + week_var + '=cnt.week and a.school_management_type=cnt.school_management_type and a.grade = cnt.grade'
                else:
                    school_count = ''
                    school_count_mgmt = ''
                dml_queries += '{"' + filter + '_grade_weekly":"select a.grade,' + week + ',count(distinct a.school_id) as total_schools,' + var + ',' + sel_col_op + ',' + metric_rep + ' from ' + table_names + '_aggregation as a ' + school_count + weekly_filter + ' group  by ' + var_grp + ',' + sel_col_op + ',a.grade,' + week_var + '"},'
                dml_queries += '{"' + filter + '_management_grade_weekly":"select a.grade,' + week + ',count(distinct a.school_id) as total_schools,' + var + ',a.school_management_type,' + sel_col_op + ',' + metric_rep + ' from ' + table_names + '_aggregation as a ' + school_count_mgmt + weekly_filter + ' group  by ' + var_grp + ',' + sel_col_op + ',week,a.school_management_type,a.grade,' + week_var + '"},'

        if 'year_and_month' in df_time_sel:
            if student_id_exists is True:
                to_sql += 'create or replace view ' + table_names + "_school_stds_cnt_grade_monthly as  select concat('Grade_',  grade) as grade,shd.school_id,cluster_id,block_id,district_id,count(distinct student_id) as students_count,academic_year(" + date_col + ")as academic_year,trim(TO_CHAR(" + date_col + ", 'Month')) AS month " + ' from ' + table_names + '_trans a  join school_hierarchy_details shd on a.school_id= shd.school_id ' + condition + ' group by shd.school_id,cluster_id,block_id,district_id,academic_year(' + date_col + '),trim(TO_CHAR(' + date_col + ", 'Month')),grade;" + '\n'
                to_sql += 'create or replace view ' + table_names + "_cluster_stds_cnt_grade_monthly as  select concat('Grade_',  grade) as grade,cluster_id,block_id,district_id,count(distinct student_id) as students_count,academic_year(" + date_col + ")as academic_year,trim(TO_CHAR(" + date_col + ", 'Month')) AS month " + ' from ' + table_names + '_trans a  join school_hierarchy_details shd on a.school_id= shd.school_id ' + condition + ' group by cluster_id,block_id,district_id,academic_year(' + date_col + '),trim(TO_CHAR(' + date_col + ", 'Month')),grade;" + '\n'
                to_sql += 'create or replace view ' + table_names + "_block_stds_cnt_grade_monthly as  select concat('Grade_',  grade) as grade,block_id,district_id,count(distinct student_id) as students_count,academic_year(" + date_col + ")as academic_year,trim(TO_CHAR(" + date_col + ", 'Month')) AS month " + ' from ' + table_names + '_trans a  join school_hierarchy_details shd on a.school_id= shd.school_id ' + condition + ' group by block_id,district_id,academic_year(' + date_col + '),trim(TO_CHAR(' + date_col + ", 'Month')),grade;" + '\n'
                to_sql += 'create or replace view ' + table_names + "_district_stds_cnt_grade_monthly as  select concat('Grade_',  grade) as grade,district_id,count(distinct student_id) as students_count,academic_year(" + date_col + ")as academic_year,trim(TO_CHAR(" + date_col + ", 'Month')) AS month " + ' from ' + table_names + '_trans a  join school_hierarchy_details shd on a.school_id= shd.school_id ' + condition + ' group by district_id,academic_year(' + date_col + '),trim(TO_CHAR(' + date_col + ", 'Month')),grade;" + '\n'
                to_sql += 'create or replace view ' + table_names + "_school_mgt_stds_cnt_grade_monthly as  select concat('Grade_',  grade) as grade,shd.school_id,initcap(school_management_type) as school_management_type,cluster_id,block_id,district_id,count(distinct student_id) as students_count,academic_year(" + date_col + ")as academic_year,trim(TO_CHAR(" + date_col + ", 'Month')) AS month " + ' from ' + table_names + '_trans a  join school_hierarchy_details shd on a.school_id= shd.school_id ' + condition + ' group by shd.school_id,cluster_id,block_id,school_management_type,district_id,academic_year(' + date_col + '),trim(TO_CHAR(' + date_col + ", 'Month')),grade;" + '\n'
                to_sql += 'create or replace view ' + table_names + "_cluster_mgt_stds_cnt_grade_monthly as  select concat('Grade_',  grade) as grade,initcap(school_management_type) as school_management_type,cluster_id,block_id,district_id,count(distinct student_id) as students_count,academic_year(" + date_col + ")as academic_year,trim(TO_CHAR(" + date_col + ", 'Month')) AS month " + ' from ' + table_names + '_trans a  join school_hierarchy_details shd on a.school_id= shd.school_id ' + condition + ' group by cluster_id,block_id,district_id,academic_year(' + date_col + '),school_management_type,trim(TO_CHAR(' + date_col + ", 'Month')),grade;" + '\n'
                to_sql += 'create or replace view ' + table_names + "_block_mgt_stds_cnt_grade_monthly as  select concat('Grade_',  grade) as grade,initcap(school_management_type) as school_management_type,block_id,district_id,count(distinct student_id) as students_count,academic_year(" + date_col + ")as academic_year,trim(TO_CHAR(" + date_col + ", 'Month')) AS month " + ' from ' + table_names + '_trans a  join school_hierarchy_details shd on a.school_id= shd.school_id ' + condition + ' group by block_id,district_id,academic_year(' + date_col + '),trim(TO_CHAR(' + date_col + ", 'Month')),school_management_type,grade;" + '\n'
                to_sql += 'create or replace view ' + table_names + "_district_mgt_stds_cnt_grade_monthly as  select concat('Grade_',  grade) as grade,initcap(school_management_type) as school_management_type,district_id,count(distinct student_id) as students_count,academic_year(" + date_col + ")as academic_year,trim(TO_CHAR(" + date_col + ", 'Month')) AS month " + ' from ' + table_names + '_trans a  join school_hierarchy_details shd on a.school_id= shd.school_id ' + condition + ' group by district_id,academic_year(' + date_col + '),trim(TO_CHAR(' + date_col + ", 'Month')),school_management_type,grade;" + '\n'
            for filter, var, var_grp in zip(filters, filter_var, filter_grp):
                if student_id_exists is True:
                    school_count = ' join ' + table_names + '_' + filter + '_stds_cnt_grade_monthly as cnt on a.' + filter + '_id= cnt.' + filter + '_id and a.month=cnt.month and a.academic_year=cnt.academic_year and a.grade = cnt.grade '
                    school_count_mgmt = ' join ' + table_names + '_' + filter + '_mgt_stds_cnt_grade_monthly as cnt on a.' + filter + '_id= cnt.' + filter + '_id and a.month=cnt.month and a.school_management_type=cnt.school_management_type and a.academic_year = cnt.academic_year and a.grade = cnt.grade '
                else:
                    school_count = ''
                    school_count_mgmt = ''
                dml_queries += '{"' + filter + '_grade_by_month_year":"select a.grade,a.academic_year,a.month,' + var + ',count(distinct a.school_id) as total_schools,' + metric_rep + ' from ' + table_names + '_aggregation as a ' + school_count + ' group  by ' + var_grp + ',a.grade,a.academic_year,a.month' + '"},'
                dml_queries += '{"' + filter + '_management_grade_by_month_year":"select a.grade,a.academic_year,a.month,' + var + ',count(distinct a.school_id) as total_schools,a.school_management_type,' + metric_rep + ' from ' + table_names + '_aggregation as a ' + school_count_mgmt + ' group  by ' + var_grp + ',a.school_management_type,a.grade,a.academic_year,a.month' + '"},'

        if 'overall' in df_time_sel:
            if student_id_exists is True:
                to_sql += 'create or replace view ' + table_names + "_school_stds_cnt_grade_overall as  select concat('Grade_',  grade) as grade,shd.school_id,cluster_id,block_id,district_id,count(distinct student_id) as students_count from " + table_names + '_trans a  join school_hierarchy_details shd on a.school_id= shd.school_id ' + condition + ' group by shd.school_id,cluster_id,block_id,district_id,grade;' + '\n'
                to_sql += 'create or replace view ' + table_names + "_cluster_stds_cnt_grade_overall as  select concat('Grade_',  grade) as grade,cluster_id,block_id,district_id,count(distinct student_id) as students_count from " + table_names + '_trans a  join school_hierarchy_details shd on a.school_id= shd.school_id ' + condition + '  group by cluster_id,block_id,district_id,grade;' + '\n'
                to_sql += 'create or replace view ' + table_names + "_block_stds_cnt_grade_overall as  select concat('Grade_',  grade) as grade,block_id,district_id,count(distinct student_id) as students_count from " + table_names + '_trans a  join school_hierarchy_details shd on a.school_id= shd.school_id ' + condition + '  group by block_id,district_id,grade;' + '\n'
                to_sql += 'create or replace view ' + table_names + "_district_stds_cnt_grade_overall as  select concat('Grade_',  grade) as grade,district_id,count(distinct student_id) as students_count from " + table_names + '_trans a  join school_hierarchy_details shd on a.school_id= shd.school_id ' + condition + '  group by district_id,grade;' + '\n'
                to_sql += 'create or replace view ' + table_names + "_school_mgt_stds_cnt_grade_overall as  select concat('Grade_',  grade) as grade,shd.school_id,initcap(school_management_type) as school_management_type,cluster_id,block_id,district_id,count(distinct student_id) as students_count from " + table_names + '_trans a  join school_hierarchy_details shd on a.school_id= shd.school_id ' + condition + ' group by shd.school_id,cluster_id,block_id,school_management_type,district_id,grade;' + '\n'
                to_sql += 'create or replace view ' + table_names + "_cluster_mgt_stds_cnt_grade_overall as  select concat('Grade_',  grade) as grade,initcap(school_management_type) as school_management_type,cluster_id,block_id,district_id,count(distinct student_id) as students_count from " + table_names + '_trans a  join school_hierarchy_details shd on a.school_id= shd.school_id ' + condition + '  group by cluster_id,block_id,district_id,school_management_type,grade;' + '\n'
                to_sql += 'create or replace view ' + table_names + "_block_mgt_stds_cnt_grade_overall as  select concat('Grade_',  grade) as grade,initcap(school_management_type) as school_management_type,block_id,district_id,count(distinct student_id) as students_count from " + table_names + '_trans a  join school_hierarchy_details shd on a.school_id= shd.school_id ' + condition + '  group by block_id,district_id,school_management_type,grade;' + '\n'
                to_sql += 'create or replace view ' + table_names + "_district_mgt_stds_cnt_grade_overall as  select concat('Grade_',  grade) as grade,initcap(school_management_type) as school_management_type,district_id,count(distinct student_id) as students_count from " + table_names + '_trans a  join school_hierarchy_details shd on a.school_id= shd.school_id ' + condition + '  group by district_id,school_management_type,grade;' + '\n'
            for filter, var, var_grp in zip(filters, filter_var, filter_grp):
                if student_id_exists is True:
                    school_count = ' join ' + table_names + '_' + filter + '_stds_cnt_grade_overall as cnt on a.' + filter + '_id= cnt.' + filter + '_id  and a.grade=cnt.grade '
                    school_count_mgmt = ' join ' + table_names + '_' + filter + '_mgt_stds_cnt_grade_overall as cnt on a.' + filter + '_id= cnt.' + filter + '_id and a.school_management_type=cnt.school_management_type and a.grade = cnt.grade '
                else:
                    school_count = ''
                    school_count_mgmt = ''
                dml_queries += '{"' + filter + '_grade_overall":"select a.grade,' + var + ',count(distinct a.school_id) as total_schools,' + metric_rep + ' from ' + table_names + '_aggregation as a' + school_count + ' group  by a.grade,' + var_grp + '"},'
                dml_queries += '{"' + filter + '_management_grade_overall":"select a.grade,' + var + ',count(distinct a.school_id) as total_schools,a.school_management_type,' + metric_rep + ' from ' + table_names + '_aggregation as a' + school_count_mgmt + ' group  by ' + var_grp + ',a.school_management_type,a.grade' + '"},'

        if 'last_30_days' in df_time_sel:
            if student_id_exists is True:
                to_sql += 'create or replace view ' + table_names + "_school_stds_cnt_grade_last30 as  select concat('Grade_',  grade) as grade,shd.school_id,cluster_id,block_id,district_id,count(distinct student_id) as students_count from " + table_names + '_trans a  join school_hierarchy_details shd on a.school_id= shd.school_id ' + last_30_day_filter + condition_val + ' group by shd.school_id,cluster_id,block_id,district_id,grade;' + '\n'
                to_sql += 'create or replace view ' + table_names + "_cluster_stds_cnt_grade_last30 as  select concat('Grade_',  grade) as grade,cluster_id,block_id,district_id,count(distinct student_id) as students_count from " + table_names + '_trans a  join school_hierarchy_details shd on a.school_id= shd.school_id ' + last_30_day_filter + condition_val + ' group by cluster_id,block_id,district_id,grade;' + '\n'
                to_sql += 'create or replace view ' + table_names + "_block_stds_cnt_grade_last30 as  select concat('Grade_',  grade) as grade,block_id,district_id,count(distinct student_id) as students_count from " + table_names + '_trans a  join school_hierarchy_details shd on a.school_id= shd.school_id ' + last_30_day_filter + condition_val + ' group  by block_id,district_id,grade;' + '\n'
                to_sql += 'create or replace view ' + table_names + "_district_stds_cnt_grade_last30 as  select concat('Grade_',  grade) as grade,district_id,count(distinct student_id) as students_count from " + table_names + '_trans a  join school_hierarchy_details shd on a.school_id= shd.school_id ' + last_30_day_filter + condition_val + ' group by district_id,grade;' + '\n'
                to_sql += 'create or replace view ' + table_names + "_school_mgt_stds_cnt_grade_last30 as  select concat('Grade_',  grade) as grade,shd.school_id,initcap(school_management_type) as school_management_type,cluster_id,block_id,district_id,count(distinct student_id) as students_count from " + table_names + '_trans a  join school_hierarchy_details shd on a.school_id= shd.school_id ' + last_30_day_filter + condition_val + ' group by shd.school_id,cluster_id,block_id,school_management_type,district_id,grade;' + '\n'
                to_sql += 'create or replace view ' + table_names + "_cluster_mgt_stds_cnt_grade_last30 as  select concat('Grade_',  grade) as grade,initcap(school_management_type) as school_management_type,cluster_id,block_id,district_id,count(distinct student_id) as students_count from " + table_names + '_trans a  join school_hierarchy_details shd on a.school_id= shd.school_id ' + last_30_day_filter + condition_val + ' group by cluster_id,block_id,district_id,school_management_type,grade;' + '\n'
                to_sql += 'create or replace view ' + table_names + "_block_mgt_stds_cnt_grade_last30 as  select concat('Grade_',  grade) as grade,initcap(school_management_type) as school_management_type,block_id,district_id,count(distinct student_id) as students_count from " + table_names + '_trans a  join school_hierarchy_details shd on a.school_id= shd.school_id ' + last_30_day_filter + condition_val + ' group  by block_id,district_id,school_management_type,grade;' + '\n'
                to_sql += 'create or replace view ' + table_names + "_district_mgt_stds_cnt_grade_last30 as  select concat('Grade_',  grade) as grade,initcap(school_management_type) as school_management_type,district_id,count(distinct student_id) as students_count from " + table_names + '_trans a  join school_hierarchy_details shd on a.school_id= shd.school_id ' + last_30_day_filter + condition_val + ' group by district_id,school_management_type,grade;' + '\n'
            for filter, var, var_grp in zip(filters, filter_var, filter_grp):
                if student_id_exists is True:
                    school_count = ' join ' + table_names + '_' + filter + '_stds_cnt_grade_last30 as cnt on a.' + filter + '_id= cnt.' + filter + '_id  and a.grade=cnt.grade'
                    school_count_mgmt = ' join ' + table_names + '_' + filter + '_mgt_stds_cnt_grade_last30 as cnt on a.' + filter + '_id= cnt.' + filter + '_id and a.school_management_type=cnt.school_management_type and a.grade=cnt.grade'
                else:
                    school_count = ''
                    school_count_mgmt = ''
                dml_queries += '{"' + filter + '_grade_last_30":"select a.grade,' + var + ',count(distinct a.school_id) as total_schools,' + metric_rep + ' from ' + table_names + '_aggregation as a ' + school_count + last_30_day_filter + ' group  by a.grade,' + var_grp + '"},'
                dml_queries += '{"' + filter + '_management_grade_last_30":"select a.grade,' + var + ',count(distinct a.school_id) as total_schools,a.school_management_type,' + metric_rep + ' from ' + table_names + '_aggregation as a ' + school_count_mgmt + last_30_day_filter + ' group  by a.grade, ' + var_grp + ',a.school_management_type' + '"},'

        if 'last_7_days' in df_time_sel:
            if student_id_exists is True:
                to_sql += 'create or replace view ' + table_names + "_school_stds_cnt_grade_last7 as  select concat('Grade_',  grade) as grade,shd.school_id,cluster_id,block_id,district_id,count(distinct student_id) as students_count from " + table_names + '_trans a  join school_hierarchy_details shd on a.school_id= shd.school_id ' + last_7_day_filter + condition_val + ' group by shd.school_id,cluster_id,block_id,district_id,grade;' + '\n'
                to_sql += 'create or replace view ' + table_names + "_cluster_stds_cnt_grade_last7 as  select concat('Grade_',  grade) as grade,cluster_id,block_id,district_id,count(distinct student_id) as students_count from " + table_names + '_trans a  join school_hierarchy_details shd on a.school_id= shd.school_id ' + last_7_day_filter + condition_val + ' group by cluster_id,block_id,district_id,grade;' + '\n'
                to_sql += 'create or replace view ' + table_names + "_block_stds_cnt_grade_last7 as  select concat('Grade_',  grade) as grade,block_id,district_id,count(distinct student_id) as students_count from " + table_names + '_trans a  join school_hierarchy_details shd on a.school_id= shd.school_id ' + last_7_day_filter + condition_val + ' group  by block_id,district_id,grade;' + '\n'
                to_sql += 'create or replace view ' + table_names + "_district_stds_cnt_grade_last7 as  select concat('Grade_',  grade) as grade,district_id,count(distinct student_id) as students_count from " + table_names + '_trans a  join school_hierarchy_details shd on a.school_id= shd.school_id ' + last_7_day_filter + condition_val + ' group by district_id,grade;' + '\n'
                to_sql += 'create or replace view ' + table_names + "_school_mgt_stds_cnt_grade_last7 as  select concat('Grade_',  grade) as grade,shd.school_id,initcap(school_management_type) as school_management_type,cluster_id,block_id,district_id,count(distinct student_id) as students_count from " + table_names + '_trans a  join school_hierarchy_details shd on a.school_id= shd.school_id ' + last_7_day_filter + condition_val + ' group by shd.school_id,cluster_id,block_id,school_management_type,district_id,grade;' + '\n'
                to_sql += 'create or replace view ' + table_names + "_cluster_mgt_stds_cnt_grade_last7 as  select concat('Grade_',  grade) as grade,initcap(school_management_type) as school_management_type,cluster_id,block_id,district_id,count(distinct student_id) as students_count from " + table_names + '_trans a  join school_hierarchy_details shd on a.school_id= shd.school_id ' + last_7_day_filter + condition_val + ' group by cluster_id,block_id,district_id,school_management_type,grade;' + '\n'
                to_sql += 'create or replace view ' + table_names + "_block_mgt_stds_cnt_grade_last7 as  select concat('Grade_',  grade) as grade,initcap(school_management_type) as school_management_type,block_id,district_id,count(distinct student_id) as students_count from " + table_names + '_trans a  join school_hierarchy_details shd on a.school_id= shd.school_id ' + last_7_day_filter + condition_val + ' group  by block_id,district_id,school_management_type,grade;' + '\n'
                to_sql += 'create or replace view ' + table_names + "_district_mgt_stds_cnt_grade_last7 as  select concat('Grade_',  grade) as grade,initcap(school_management_type) as school_management_type,district_id,count(distinct student_id) as students_count from " + table_names + '_trans a  join school_hierarchy_details shd on a.school_id= shd.school_id ' + last_7_day_filter + condition_val + ' group by district_id,school_management_type,grade;' + '\n'
            for filter, var, var_grp in zip(filters, filter_var, filter_grp):
                if student_id_exists is True:
                    school_count = ' join ' + table_names + '_' + filter + '_stds_cnt_grade_last7 as cnt on a.' + filter + '_id= cnt.' + filter + '_id  and a.grade=cnt.grade'
                    school_count_mgmt = ' join ' + table_names + '_' + filter + '_mgt_stds_cnt_grade_last7 as cnt on a.' + filter + '_id= cnt.' + filter + '_id and a.school_management_type=cnt.school_management_type and a.grade=cnt.grade'
                else:
                    school_count = ''
                    school_count_mgmt = ''
                dml_queries += '{"' + filter + '_grade_last_7":"select a.grade,' + var + ',count(distinct a.school_id) as total_schools,' + metric_rep + ' from ' + table_names + '_aggregation as a ' + school_count + last_7_day_filter + ' group  by a.grade,' + var_grp + '"},'
                dml_queries += '{"' + filter + '_management_grade_last_7":"select a.grade,' + var + ',count(distinct a.school_id) as total_schools,a.school_management_type,' + metric_rep + ' from ' + table_names + '_aggregation as a ' + school_count_mgmt + last_7_day_filter + ' group  by a.grade, ' + var_grp + ',a.school_management_type' + '"},'

        if 'last_day' in df_time_sel:
            if student_id_exists is True:
                to_sql += 'create or replace view ' + table_names + "_school_stds_cnt_grade_last_day as  select concat('Grade_',  grade) as grade,shd.school_id,cluster_id,block_id,district_id,count(distinct student_id) as students_count from " + table_names + '_trans a  join school_hierarchy_details shd on a.school_id= shd.school_id ' + last_day_filter + condition_val + ' group by shd.school_id,cluster_id,block_id,district_id,grade;' + '\n'
                to_sql += 'create or replace view ' + table_names + "_cluster_stds_cnt_grade_last_day as  select concat('Grade_',  grade) as grade,cluster_id,block_id,district_id,count(distinct student_id) as students_count from " + table_names + '_trans a  join school_hierarchy_details shd on a.school_id= shd.school_id ' + last_day_filter + condition_val + ' group by cluster_id,block_id,district_id,grade;' + '\n'
                to_sql += 'create or replace view ' + table_names + "_block_stds_cnt_grade_last_day as  select concat('Grade_',  grade) as grade,block_id,district_id,count(distinct student_id) as students_count from " + table_names + '_trans a  join school_hierarchy_details shd on a.school_id= shd.school_id ' + last_day_filter + condition_val + ' group  by block_id,district_id,grade;' + '\n'
                to_sql += 'create or replace view ' + table_names + "_district_stds_cnt_grade_last_day as  select concat('Grade_',  grade) as grade,district_id,count(distinct student_id) as students_count from " + table_names + '_trans a  join school_hierarchy_details shd on a.school_id= shd.school_id ' + last_day_filter + condition_val + ' group by district_id,grade;' + '\n'
                to_sql += 'create or replace view ' + table_names + "_school_mgt_stds_cnt_grade_last_day as  select concat('Grade_',  grade) as grade,shd.school_id,initcap(school_management_type) as school_management_type,cluster_id,block_id,district_id,count(distinct student_id) as students_count from " + table_names + '_trans a  join school_hierarchy_details shd on a.school_id= shd.school_id ' + last_day_filter + condition_val + ' group by shd.school_id,cluster_id,block_id,school_management_type,district_id,grade;' + '\n'
                to_sql += 'create or replace view ' + table_names + "_cluster_mgt_stds_cnt_grade_last_day as  select concat('Grade_',  grade) as grade,initcap(school_management_type) as school_management_type,cluster_id,block_id,district_id,count(distinct student_id) as students_count from " + table_names + '_trans a  join school_hierarchy_details shd on a.school_id= shd.school_id ' + last_day_filter + condition_val + ' group by cluster_id,block_id,district_id,school_management_type,grade;' + '\n'
                to_sql += 'create or replace view ' + table_names + "_block_mgt_stds_cnt_grade_last_day as  select concat('Grade_',  grade) as grade,initcap(school_management_type) as school_management_type,block_id,district_id,count(distinct student_id) as students_count from " + table_names + '_trans a  join school_hierarchy_details shd on a.school_id= shd.school_id ' + last_day_filter + condition_val + ' group  by block_id,district_id,school_management_type,grade;' + '\n'
                to_sql += 'create or replace view ' + table_names + "_district_mgt_stds_cnt_grade_last_day as  select concat('Grade_',  grade) as grade,initcap(school_management_type) as school_management_type,district_id,count(distinct student_id) as students_count from " + table_names + '_trans a  join school_hierarchy_details shd on a.school_id= shd.school_id ' + last_day_filter + condition_val + ' group by district_id,school_management_type,grade;' + '\n'
            for filter, var, var_grp in zip(filters, filter_var, filter_grp):
                if student_id_exists is True:
                    school_count = ' join ' + table_names + '_' + filter + '_stds_cnt_grade_last_day as cnt on a.' + filter + '_id= cnt.' + filter + '_id  and a.grade=cnt.grade'
                    school_count_mgmt = ' join ' + table_names + '_' + filter + '_mgt_stds_cnt_grade_last_day as cnt on a.' + filter + '_id= cnt.' + filter + '_id and a.school_management_type=cnt.school_management_type and a.grade=cnt.grade'
                else:
                    school_count = ''
                    school_count_mgmt = ''
                dml_queries += '{"' + filter + '_grade_last_day":"select a.grade,' + var + ',' + date_col + ',count(distinct a.school_id) as total_schools,' + metric_rep + ' from ' + table_names + '_aggregation as a ' + school_count + last_day_filter + ' group  by a.grade,' + var_grp + ',' + date_col + '"},'
                dml_queries += '{"' + filter + '_management_grade_last_day":"select a.grade,' + var + ',' + date_col + ',count(distinct a.school_id) as total_schools,a.school_management_type,' + metric_rep + ' from ' + table_names + '_aggregation as a ' + school_count_mgmt + last_day_filter + ' group  by a.grade, ' + var_grp + ',' + date_col + ',a.school_management_type' + '"},'

    # Grade and Subject level queries
    if 'subject' in df_filters_req:
        if 'daily' in df_time_sel:
            mv_queries += 'refresh materialized view ' + table_names + "_grade_sub_sch_footer_daily;"
            if student_id_exists is True:
                to_sql += 'create materialized view IF NOT EXISTS  ' + table_names + "_grade_sub_sch_footer_daily as  select concat('Grade_',  grade) as grade,subject,a.school_id,initcap(school_management_type) as school_management_type,cluster_id,block_id,district_id,count(distinct student_id) as students_count,count(distinct a.school_id) as total_schools," + date_col + ',' + week + ',academic_year(' + date_col + ')as academic_year,trim(TO_CHAR(' + date_col + ", 'Month')) AS month from " + table_names + '_trans a  join school_hierarchy_details shd on a.school_id= shd.school_id ' + daily_filter + condition_val + ' group by a.school_id,cluster_id,block_id,district_id,a.' + date_col + ',grade,subject,school_management_type,week,month,academic_year;' + '\n'
                to_sql += 'create or replace view ' + table_names + "_school_stds_cnt_grade_sub_daily as  select concat('Grade_',  grade) as grade,subject,shd.school_id,cluster_id,block_id,district_id,count(distinct student_id) as students_count," + date_col + ' from ' + table_names + '_trans a  join school_hierarchy_details shd on a.school_id= shd.school_id ' + daily_filter + condition_val + ' group by shd.school_id,cluster_id,block_id,district_id,a.' + date_col + ',grade,subject;' + '\n'
                to_sql += 'create or replace view ' + table_names + "_cluster_stds_cnt_grade_sub_daily as  select concat('Grade_',  grade) as grade,subject,cluster_id,block_id,district_id,count(distinct student_id) as students_count," + date_col + ' from ' + table_names + '_trans a  join school_hierarchy_details shd on a.school_id= shd.school_id ' + daily_filter + condition_val + ' group by cluster_id,block_id,district_id,a.' + date_col + ',grade,subject;' + '\n'
                to_sql += 'create or replace view ' + table_names + "_block_stds_cnt_grade_sub_daily as  select concat('Grade_',  grade) as grade,subject,block_id,district_id,count(distinct student_id) as students_count," + date_col + ' from ' + table_names + '_trans a  join school_hierarchy_details shd on a.school_id= shd.school_id ' + daily_filter + condition_val + ' group by block_id,district_id,a.' + date_col + ',grade,subject;' + '\n'
                to_sql += 'create or replace view ' + table_names + "_district_stds_cnt_grade_sub_daily as  select concat('Grade_',  grade) as grade,subject,district_id,count(distinct student_id) as students_count," + date_col + ' from ' + table_names + '_trans a  join school_hierarchy_details shd on a.school_id= shd.school_id ' + daily_filter + condition_val + ' group by district_id,a.' + date_col + ',grade,subject;' + '\n'
                to_sql += 'create or replace view ' + table_names + "_school_mgt_stds_cnt_grade_sub_daily as  select concat('Grade_',  grade) as grade,subject,shd.school_id,initcap(school_management_type) as school_management_type,cluster_id,block_id,district_id,count(distinct student_id) as students_count," + date_col + ' from ' + table_names + '_trans a  join school_hierarchy_details shd on a.school_id= shd.school_id ' + daily_filter + condition_val + ' group by shd.school_id,cluster_id,block_id,district_id,a.' + date_col + ',grade,subject;' + '\n'
                to_sql += 'create or replace view ' + table_names + "_cluster_mgt_stds_cnt_grade_sub_daily as  select concat('Grade_',  grade) as grade,subject,initcap(school_management_type) as school_management_type,cluster_id,block_id,district_id,count(distinct student_id) as students_count," + date_col + ' from ' + table_names + '_trans a  join school_hierarchy_details shd on a.school_id= shd.school_id ' + daily_filter + condition_val + ' group by cluster_id,block_id,district_id,school_management_type,a.' + date_col + ',grade,subject;' + '\n'
                to_sql += 'create or replace view ' + table_names + "_block_mgt_stds_cnt_grade_sub_daily as  select concat('Grade_',  grade) as grade,subject,initcap(school_management_type) as school_management_type,block_id,district_id,count(distinct student_id) as students_count," + date_col + ' from ' + table_names + '_trans a  join school_hierarchy_details shd on a.school_id= shd.school_id ' + daily_filter + condition_val + ' group by block_id,district_id,school_management_type,a.' + date_col + ',grade,subject;' + '\n'
                to_sql += 'create or replace view ' + table_names + "_district_mgt_stds_cnt_grade_sub_daily as  select concat('Grade_',  grade) as grade,subject,initcap(school_management_type) as school_management_type,district_id,count(distinct student_id) as students_count," + date_col + ' from ' + table_names + '_trans a  join school_hierarchy_details shd on a.school_id= shd.school_id ' + daily_filter + condition_val + ' group by district_id,school_management_type,a.' + date_col + ',grade,subject;' + '\n'
            else:
                to_sql += 'create materialized view IF NOT EXISTS  ' + table_names + "_grade_sub_sch_footer_daily as  select concat('Grade_',  grade) as grade,subject,a.school_id,initcap(school_management_type) as school_management_type,cluster_id,block_id,district_id,count(distinct a.school_id) as total_schools," + date_col + ',' + week + ',academic_year(' + date_col + ')as academic_year,trim(TO_CHAR(' + date_col + ", 'Month')) AS month from " + table_names + '_trans a  join school_hierarchy_details shd on a.school_id= shd.school_id ' + daily_filter + condition_val + ' group by a.school_id,cluster_id,block_id,district_id,a.' + date_col + ',grade,subject,school_management_type,week,month,academic_year;' + '\n'
            for filter, var, var_grp in zip(filters, filter_var, filter_grp):
                if student_id_exists is True:
                    school_count = ' join ' + table_names + '_' + filter + '_stds_cnt_grade_sub_daily as cnt on a.' + filter + '_id= cnt.' + filter + '_id and a.' + date_col + '=cnt.' + date_col + ' and a.grade = cnt.grade  and a.subject = cnt.subject '
                    school_count_mgmt = ' join ' + table_names + '_' + filter + '_mgt_stds_cnt_grade_sub_daily as cnt on a.' + filter + '_id= cnt.' + filter + '_id and a.' + date_col + '=cnt.' + date_col + ' and a.school_management_type=cnt.school_management_type and a.grade=cnt.grade and a.subject = cnt.subject '
                else:
                    school_count = ''
                    school_count_mgmt = ''

                dml_queries += '{ "' + filter + '_grade_subject_daily":"select a.grade,a.subject,' + week + ',count(distinct a.school_id) as total_schools,' + var + ',a.' + date_col + ',' + sel_col_op + ',' + metric_rep + ' from ' + table_names + '_aggregation as a ' + school_count + daily_filter + ' group  by ' + var_grp + ',' + sel_col_op + ',a.' + date_col + ',week,a.grade,a.subject"},'
                dml_queries += '{"' + filter + '_management_grade_subject_daily":"select a.grade,a.subject,' + week + ',count(distinct a.school_id) as total_schools,' + var + ',a.' + date_col + ',a.school_management_type,' + sel_col_op + ',' + metric_rep + ' from ' + table_names + '_aggregation as a ' + school_count_mgmt + daily_filter + ' group  by ' + var_grp + ',a.' + date_col + ',a.school_management_type,' + sel_col_op + ',week,a.grade,a.subject"},'
            for filter, var, var_grp in zip(filters, filter_var_footer, filter_grp):
                if student_id_exists is True:
                    dml_queries += '{"' + filter + '_footer_grade_subject_daily":"select grade,subject,' + var + ',sum(total_schools) as total_schools,sum(students_count) as students_count,' + date_col + ',week,academic_year,month from ' + table_names + '_grade_sub_sch_footer_daily a  group by grade,subject,week,academic_year,month,' + date_col + ',' + var + '"},'
                    dml_queries += '{"' + filter + '_management_footer_grade_subject_daily":"select grade,subject,' + var + ',school_management_type,sum(total_schools) as total_schools,sum(students_count) as students_count,' + date_col + ',week,academic_year,month from ' + table_names + '_grade_sub_sch_footer_daily a group by grade,month,subject,week,academic_year,school_management_type,' + date_col + ',' + var + '"},'
                else:
                    dml_queries += '{"' + filter + '_footer_grade_subject_daily":"select grade,subject,' + var + ',sum(total_schools) as total_schools,' + date_col + ',week,academic_year,month from ' + table_names + '_grade_sub_sch_footer_daily a  group by grade,subject,week,academic_year,month,' + date_col + ',' + var + '"},'
                    dml_queries += '{"' + filter + '_management_footer_grade_subject_daily":"select grade,subject,' + var + ',school_management_type,sum(total_schools) as total_schools,' + date_col + ',week,academic_year,month from ' + table_names + '_grade_sub_sch_footer_daily a group by grade,subject,week,academic_year,month,school_management_type,' + date_col + ',' + var + '"},'
        if 'weekly' in df_time_sel:
            mv_queries += 'refresh materialized view ' + table_names + "_grade_sub_sch_footer_weekly;"
            if student_id_exists is True:
                to_sql += 'create materialized view  IF NOT EXISTS ' + table_names + "_grade_sub_sch_footer_weekly as  select grade,subject,a.school_id,initcap(school_management_type) as school_management_type,cluster_id,block_id,district_id,count(distinct student_id) as students_count,count(distinct a.school_id) as total_schools,academic_year,month,week from (select concat('Grade_',  grade) as grade,subject,school_management_type,a.school_id,cluster_id,block_id,district_id,student_id," + date_col + ',academic_year(' + date_col + ")as academic_year,trim(TO_CHAR(" + date_col + ", 'Month')) AS month," + week + ' from ' + table_names + '_trans a  join school_hierarchy_details shd on a.school_id= shd.school_id ' + weekly_filter + condition_val + ") as a group by a.school_id,cluster_id,block_id,district_id,grade,subject,school_management_type,week,month,academic_year;" + '\n'
                to_sql += 'create or replace view ' + table_names + "_school_stds_cnt_grade_sub_weekly as  select concat('Grade_',  grade) as grade,subject,shd.school_id,school_management_type,cluster_id,block_id,district_id,count(distinct student_id) as students_count," + week + ' from ' + table_names + '_trans a  join school_hierarchy_details shd on a.school_id= shd.school_id  ' + weekly_filter + condition_val + ' group by shd.school_id,cluster_id,block_id,district_id,week,grade,subject;' + '\n'
                to_sql += 'create or replace view ' + table_names + "_cluster_stds_cnt_grade_sub_weekly as  select concat('Grade_',  grade) as grade,subject,cluster_id,block_id,district_id,count(distinct student_id) as students_count," + week + ' from ' + table_names + '_trans a  join school_hierarchy_details shd on a.school_id= shd.school_id ' + weekly_filter + condition_val + ' group by cluster_id,block_id,district_id,week,grade,subject;' + '\n'
                to_sql += 'create or replace view ' + table_names + "_block_stds_cnt_grade_sub_weekly as  select concat('Grade_',  grade) as grade,subject,block_id,district_id,count(distinct student_id) as students_count," + week + ' from ' + table_names + '_trans a  join school_hierarchy_details shd on a.school_id= shd.school_id ' + weekly_filter + condition_val + ' group by block_id,district_id,week,grade,subject;' + '\n'
                to_sql += 'create or replace view ' + table_names + "_district_stds_cnt_grade_sub_weekly as  select concat('Grade_',  grade) as grade,subject,district_id,count(distinct student_id) as students_count," + week + ' from ' + table_names + '_trans a  join school_hierarchy_details shd on a.school_id= shd.school_id ' + weekly_filter + condition_val + ' group by district_id,week,grade,subject;' + '\n'
                to_sql += 'create or replace view ' + table_names + "_school_mgt_stds_cnt_grade_sub_weekly as  select concat('Grade_',  grade) as grade,subject,shd.school_id,initcap(school_management_type) as school_management_type,cluster_id,block_id,district_id,count(distinct student_id) as students_count," + week + ' from ' + table_names + '_trans a  join school_hierarchy_details shd on a.school_id= shd.school_id  ' + weekly_filter + condition_val + ' group by shd.school_id,cluster_id,block_id,district_id,week,grade,subject;' + '\n'
                to_sql += 'create or replace view ' + table_names + "_cluster_mgt_stds_cnt_grade_sub_weekly as  select concat('Grade_',  grade) as grade,subject,initcap(school_management_type) as school_management_type,cluster_id,block_id,district_id,count(distinct student_id) as students_count," + week + ' from ' + table_names + '_trans a  join school_hierarchy_details shd on a.school_id= shd.school_id ' + weekly_filter + condition_val + ' group by cluster_id,block_id,district_id,school_management_type,week,grade,subject;' + '\n'
                to_sql += 'create or replace view ' + table_names + "_block_mgt_stds_cnt_grade_sub_weekly as  select concat('Grade_',  grade) as grade,subject,initcap(school_management_type) as school_management_type,block_id,district_id,count(distinct student_id) as students_count," + week + ' from ' + table_names + '_trans a  join school_hierarchy_details shd on a.school_id= shd.school_id ' + weekly_filter + condition_val + ' group by block_id,district_id,school_management_type,week,grade,subject;' + '\n'
                to_sql += 'create or replace view ' + table_names + "_district_mgt_stds_cnt_grade_sub_weekly as  select concat('Grade_',  grade) as grade,subject,initcap(school_management_type) as school_management_type,district_id,count(distinct student_id) as students_count," + week + ' from ' + table_names + '_trans a  join school_hierarchy_details shd on a.school_id= shd.school_id ' + weekly_filter + condition_val + ' group by district_id,school_management_type,week,grade,subject;' + '\n'
            else:
                to_sql += 'create materialized view  IF NOT EXISTS ' + table_names + "_grade_sub_sch_footer_weekly as  select grade,subject,a.school_id,initcap(school_management_type) as school_management_type,cluster_id,block_id,district_id,count(distinct a.school_id) as total_schools,academic_year,month,week from (select concat('Grade_',  grade) as grade,subject,school_management_type,a.school_id,cluster_id,block_id,district_id," + date_col + ',academic_year(' + date_col + ")as academic_year,trim(TO_CHAR(" + date_col + ", 'Month')) AS month," + week + ' from ' + table_names + '_trans a  join school_hierarchy_details shd on a.school_id= shd.school_id ' + weekly_filter + condition_val + ") as a group by a.school_id,cluster_id,block_id,district_id,grade,subject,school_management_type,week,month,academic_year;" + '\n'
            for filter, var, var_grp in zip(filters, filter_var, filter_grp):
                if student_id_exists is True:
                    week_var = week[:-8]
                    school_count = ' join ' + table_names + '_' + filter + '_stds_cnt_grade_sub_weekly as cnt on a.' + filter + '_id= cnt.' + filter + '_id and ' + week_var + '=cnt.week and a.grade=cnt.grade and a.subject = cnt.subject'
                    school_count_mgmt = ' join ' + table_names + '_' + filter + '_mgt_stds_cnt_grade_sub_weekly as cnt on a.' + filter + '_id= cnt.' + filter + '_id and ' + week_var + '=cnt.week and a.school_management_type=cnt.school_management_type and a.grade = cnt.grade and a.subject = cnt.subject '
                else:
                    school_count = ''
                    school_count_mgmt = ''
                dml_queries += '{"' + filter + '_grade_subject_weekly":"select a.grade,a.subject, ' + week + ',count(distinct a.school_id) as total_schools,' + var + ',' + sel_col_op + ',' + metric_rep + ' from ' + table_names + '_aggregation as a ' + school_count + weekly_filter + ' group  by ' + var_grp + ',' + sel_col_op + ',a.grade,a.subject,' + week_var + '"},'
                dml_queries += '{"' + filter + '_management_grade_subject_weekly":"select a.grade,a.subject,' + week + ',count(distinct a.school_id) as total_schools,' + var + ',a.school_management_type,' + sel_col_op + ',' + metric_rep + ' from ' + table_names + '_aggregation as a ' + school_count_mgmt + weekly_filter + ' group  by ' + var_grp + ',' + sel_col_op + ',week,a.school_management_type,a.grade,a.subject,' + week_var + '"},'
            for filter, var, var_grp in zip(filters, filter_var_footer, filter_grp):
                if student_id_exists is True:
                    dml_queries += '{"' + filter + '_footer_grade_subject_weekly":"select grade,subject,' + var + ',sum(total_schools) as total_schools,sum(students_count) as students_count,week,month,academic_year from ' + table_names + '_grade_sub_sch_footer_weekly a  group by grade,subject,week,academic_year,month,' + var + '"},'
                    dml_queries += '{"' + filter + '_management_footer_grade_subject_weekly":"select grade,subject,' + var + ',school_management_type,sum(total_schools) as total_schools,sum(students_count) as students_count,week,month,academic_year from ' + table_names + '_grade_sub_sch_footer_weekly a group by grade,subject,week,academic_year,school_management_type,month,' + var + '"},'
                else:
                    dml_queries += '{"' + filter + '_footer_grade_subject_weekly":"select grade,subject,' + var + ',sum(total_schools) as total_schools,week,month,academic_year from ' + table_names + '_grade_sub_sch_footer_weekly a  group by grade,subject,week,academic_year,month,' + var + '"},'
                    dml_queries += '{"' + filter + '_management_footer_grade_subject_weekly":"select grade,subject,' + var + ',school_management_type,sum(total_schools) as total_schools,week,month,academic_year from ' + table_names + '_grade_sub_sch_footer_weekly a group by grade,subject,week,academic_year,school_management_type,month,' + var + '"},'
        if 'year_and_month' in df_time_sel:
            mv_queries += 'refresh materialized view ' + table_names + "_grade_sub_sch_footer_monthly;"
            if student_id_exists is True:
                to_sql += 'create materialized view  IF NOT EXISTS ' + table_names + "_grade_sub_sch_footer_monthly as  select grade,subject,a.school_id,initcap(school_management_type) as school_management_type,cluster_id,block_id,district_id,count(distinct student_id) as students_count,count(distinct a.school_id) as total_schools,academic_year,month from (select concat('Grade_',  grade) as grade,subject,school_management_type,a.school_id,cluster_id,block_id,district_id,student_id," + date_col + ',academic_year(' + date_col + ")as academic_year,trim(TO_CHAR(" + date_col + ", 'Month')) AS month from " + table_names + '_trans a  join school_hierarchy_details shd on a.school_id= shd.school_id ' + weekly_filter + condition_val + ") as a group by a.school_id,cluster_id,block_id,district_id,grade,subject,school_management_type,month,academic_year;" + '\n'
                to_sql += 'create or replace view ' + table_names + "_school_stds_cnt_grade_sub_monthly as  select concat('Grade_',  grade) as grade,subject,shd.school_id,cluster_id,block_id,district_id,count(distinct student_id) as students_count,academic_year(" + date_col + ")as academic_year,trim(TO_CHAR(" + date_col + ", 'Month')) AS month " + ' from ' + table_names + '_trans a  join school_hierarchy_details shd on a.school_id= shd.school_id ' + condition + ' group by shd.school_id,cluster_id,block_id,district_id,academic_year(' + date_col + '),trim(TO_CHAR(' + date_col + ", 'Month')),grade,a.subject;" + '\n'
                to_sql += 'create or replace view ' + table_names + "_cluster_stds_cnt_grade_sub_monthly as  select concat('Grade_',  grade) as grade,subject,cluster_id,block_id,district_id,count(distinct student_id) as students_count,academic_year(" + date_col + ")as academic_year,trim(TO_CHAR(" + date_col + ", 'Month')) AS month " + ' from ' + table_names + '_trans a  join school_hierarchy_details shd on a.school_id= shd.school_id ' + condition + '  group by cluster_id,block_id,district_id,academic_year(' + date_col + '),trim(TO_CHAR(' + date_col + ", 'Month')),grade,a.subject;" + '\n'
                to_sql += 'create or replace view ' + table_names + "_block_stds_cnt_grade_sub_monthly as  select concat('Grade_',  grade) as grade,subject,block_id,district_id,count(distinct student_id) as students_count,academic_year(" + date_col + ")as academic_year,trim(TO_CHAR(" + date_col + ", 'Month')) AS month " + ' from ' + table_names + '_trans a  join school_hierarchy_details shd on a.school_id= shd.school_id  ' + condition + ' group by block_id,district_id,academic_year(' + date_col + '),trim(TO_CHAR(' + date_col + ", 'Month')),grade,a.subject;" + '\n'
                to_sql += 'create or replace view ' + table_names + "_district_stds_cnt_grade_sub_monthly as  select concat('Grade_',  grade) as grade,subject,district_id,count(distinct student_id) as students_count,academic_year(" + date_col + ")as academic_year,trim(TO_CHAR(" + date_col + ", 'Month')) AS month " + ' from ' + table_names + '_trans a  join school_hierarchy_details shd on a.school_id= shd.school_id ' + condition + '  group by district_id,academic_year(' + date_col + '),trim(TO_CHAR(' + date_col + ", 'Month')),grade,a.subject;" + '\n'
                to_sql += 'create or replace view ' + table_names + "_school_mgt_stds_cnt_grade_sub_monthly as  select concat('Grade_',  grade) as grade,subject,shd.school_id,initcap(school_management_type) as school_management_type,cluster_id,block_id,district_id,count(distinct student_id) as students_count,academic_year(" + date_col + ")as academic_year,trim(TO_CHAR(" + date_col + ", 'Month')) AS month " + ' from ' + table_names + '_trans a  join school_hierarchy_details shd on a.school_id= shd.school_id ' + condition + ' group by shd.school_id,cluster_id,block_id,school_management_type,district_id,academic_year(' + date_col + '),trim(TO_CHAR(' + date_col + ", 'Month')),grade,a.subject;" + '\n'
                to_sql += 'create or replace view ' + table_names + "_cluster_mgt_stds_cnt_grade_sub_monthly as  select concat('Grade_',  grade) as grade,subject,initcap(school_management_type) as school_management_type,cluster_id,block_id,district_id,count(distinct student_id) as students_count,academic_year(" + date_col + ")as academic_year,trim(TO_CHAR(" + date_col + ", 'Month')) AS month " + ' from ' + table_names + '_trans a  join school_hierarchy_details shd on a.school_id= shd.school_id ' + condition + '  group by cluster_id,block_id,district_id,academic_year(' + date_col + '),school_management_type,trim(TO_CHAR(' + date_col + ", 'Month')),grade,a.subject;" + '\n'
                to_sql += 'create or replace view ' + table_names + "_block_mgt_stds_cnt_grade_sub_monthly as  select concat('Grade_',  grade) as grade,subject,initcap(school_management_type) as school_management_type,block_id,district_id,count(distinct student_id) as students_count,academic_year(" + date_col + ")as academic_year,trim(TO_CHAR(" + date_col + ", 'Month')) AS month " + ' from ' + table_names + '_trans a  join school_hierarchy_details shd on a.school_id= shd.school_id  ' + condition + ' group by block_id,district_id,academic_year(' + date_col + '),trim(TO_CHAR(' + date_col + ", 'Month')),school_management_type,grade,a.subject;" + '\n'
                to_sql += 'create or replace view ' + table_names + "_district_mgt_stds_cnt_grade_sub_monthly as  select concat('Grade_',  grade) as grade,subject,initcap(school_management_type) as school_management_type,district_id,count(distinct student_id) as students_count,academic_year(" + date_col + ")as academic_year,trim(TO_CHAR(" + date_col + ", 'Month')) AS month " + ' from ' + table_names + '_trans a  join school_hierarchy_details shd on a.school_id= shd.school_id ' + condition + '  group by district_id,academic_year(' + date_col + '),trim(TO_CHAR(' + date_col + ", 'Month')),school_management_type,grade,a.subject;" + '\n'
            else:
                to_sql += 'create materialized view  IF NOT EXISTS ' + table_names + "_grade_sub_sch_footer_monthly as  select grade,subject,a.school_id,initcap(school_management_type) as school_management_type,cluster_id,block_id,district_id,count(distinct a.school_id) as total_schools,academic_year,month from (select concat('Grade_',  grade) as grade,subject,school_management_type,a.school_id,cluster_id,block_id,district_id," + date_col + ',academic_year(' + date_col + ")as academic_year,trim(TO_CHAR(" + date_col + ", 'Month')) AS month from " + table_names + '_trans a  join school_hierarchy_details shd on a.school_id= shd.school_id ' + weekly_filter + condition_val + ") as a group by a.school_id,cluster_id,block_id,district_id,grade,subject,school_management_type,month,academic_year;" + '\n'
            for filter, var, var_grp in zip(filters, filter_var, filter_grp):
                if student_id_exists is True:
                    school_count = ' join ' + table_names + '_' + filter + '_stds_cnt_grade_sub_monthly as cnt on a.' + filter + '_id= cnt.' + filter + '_id and a.month=cnt.month and a.academic_year=cnt.academic_year and a.grade = cnt.grade and a.subject = cnt.subject'
                    school_count_mgmt = ' join ' + table_names + '_' + filter + '_mgt_stds_cnt_grade_sub_monthly as cnt on a.' + filter + '_id= cnt.' + filter + '_id and a.month=cnt.month and a.school_management_type=cnt.school_management_type and a.academic_year = cnt.academic_year and a.grade = cnt.grade and a.subject=cnt.subject'
                else:
                    school_count = ''
                    school_count_mgmt = ''
                dml_queries += '{"' + filter + '_grade_subject_by_month_year":"select a.grade,a.subject,a.academic_year,a.month,' + var + ',count(distinct a.school_id) as total_schools,' + metric_rep + ' from ' + table_names + '_aggregation as a ' + school_count + ' group  by ' + var_grp + ',a.grade,a.academic_year,a.month,a.subject' + '"},'
                dml_queries += '{"' + filter + '_management_grade_subject_by_month_year":"select a.grade,a.subject,a.academic_year,a.month,' + var + ',count(distinct a.school_id) as total_schools,a.school_management_type,' + metric_rep + ' from ' + table_names + '_aggregation as a ' + school_count_mgmt + ' group  by ' + var_grp + ',a.school_management_type,a.grade,a.academic_year,a.month,a.subject' + '"},'
            for filter, var, var_grp in zip(filters, filter_var_footer, filter_grp):
                if student_id_exists is True:
                    dml_queries += '{"' + filter + '_footer_grade_subject_by_month_year":"select grade,subject,' + var + ',sum(total_schools) as total_schools,sum(students_count) as students_count,month,academic_year from ' + table_names + '_grade_sub_sch_footer_monthly a  group by grade,subject,academic_year,month,' + var + '"},'
                    dml_queries += '{"' + filter + '_management_footer_grade_subject_by_month_year":"select grade,subject,' + var + ',school_management_type,sum(total_schools) as total_schools,sum(students_count) as students_count,month,academic_year from ' + table_names + '_grade_sub_sch_footer_monthly a group by grade,subject,academic_year,school_management_type,month,' + var + '"},'
                else:
                    dml_queries += '{"' + filter + '_footer_grade_subject_by_month_year":"select grade,subject,' + var + ',sum(total_schools) as total_schools,month,academic_year from ' + table_names + '_grade_sub_sch_footer_monthly a  group by grade,subject,academic_year,month,' + var + '"},'
                    dml_queries += '{"' + filter + '_management_footer_grade_subject_by_month_year":"select grade,subject,' + var + ',school_management_type,sum(total_schools) as total_schools,month,academic_year from ' + table_names + '_grade_sub_sch_footer_monthly a group by grade,subject,academic_year,school_management_type,month,' + var + '"},'

        if 'overall' in df_time_sel:
            mv_queries += 'refresh materialized view ' + table_names + "_grade_sub_sch_footer_overall;"
            if student_id_exists is True:
                to_sql += 'create materialized view  IF NOT EXISTS ' + table_names + "_grade_sub_sch_footer_overall as  select concat('Grade_',  grade) as grade,subject,a.school_id,initcap(school_management_type) as school_management_type,cluster_id,block_id,district_id,count(distinct student_id) as students_count,count(distinct a.school_id) as total_schools from " + table_names + '_trans a  join school_hierarchy_details shd on a.school_id= shd.school_id ' + condition + ' group by a.school_id,cluster_id,block_id,district_id,grade,subject,school_management_type;' + '\n'
                to_sql += 'create or replace view ' + table_names + "_school_stds_cnt_grade_sub_overall as  select concat('Grade_',  grade) as grade,subject,shd.school_id,cluster_id,block_id,district_id,count(distinct student_id) as students_count from " + table_names + '_trans a  join school_hierarchy_details shd on a.school_id= shd.school_id ' + condition + ' group by shd.school_id,cluster_id,block_id,school_management_type,district_id,grade,subject;' + '\n'
                to_sql += 'create or replace view ' + table_names + "_cluster_stds_cnt_grade_sub_overall as  select concat('Grade_',  grade) as grade,subject,cluster_id,block_id,district_id,count(distinct student_id) as students_count from " + table_names + '_trans a  join school_hierarchy_details shd on a.school_id= shd.school_id ' + condition + ' group by cluster_id,block_id,district_id,grade,subject;' + '\n'
                to_sql += 'create or replace view ' + table_names + "_block_stds_cnt_grade_sub_overall as  select concat('Grade_',  grade) as grade,subject,block_id,district_id,count(distinct student_id) as students_count from " + table_names + '_trans a  join school_hierarchy_details shd on a.school_id= shd.school_id ' + condition + ' group by block_id,district_id,grade,subject;' + '\n'
                to_sql += 'create or replace view ' + table_names + "_district_stds_cnt_grade_sub_overall as  select concat('Grade_',  grade) as grade,subject,district_id,count(distinct student_id) as students_count from " + table_names + '_trans a  join school_hierarchy_details shd on a.school_id= shd.school_id ' + condition + ' group by district_id,grade,subject;' + '\n'
                to_sql += 'create or replace view ' + table_names + "_school_mgt_stds_cnt_grade_sub_overall as  select concat('Grade_',  grade) as grade,subject,shd.school_id,initcap(school_management_type) as school_management_type,cluster_id,block_id,district_id,count(distinct student_id) as students_count from " + table_names + '_trans a  join school_hierarchy_details shd on a.school_id= shd.school_id ' + condition + ' group by shd.school_id,cluster_id,block_id,school_management_type,district_id,grade,subject;' + '\n'
                to_sql += 'create or replace view ' + table_names + "_cluster_mgt_stds_cnt_grade_sub_overall as  select concat('Grade_',  grade) as grade,subject,initcap(school_management_type) as school_management_type,cluster_id,block_id,district_id,count(distinct student_id) as students_count from " + table_names + '_trans a  join school_hierarchy_details shd on a.school_id= shd.school_id ' + condition + ' group by cluster_id,block_id,district_id,school_management_type,grade,subject;' + '\n'
                to_sql += 'create or replace view ' + table_names + "_block_mgt_stds_cnt_grade_sub_overall as  select concat('Grade_',  grade) as grade,subject,initcap(school_management_type) as school_management_type,block_id,district_id,count(distinct student_id) as students_count from " + table_names + '_trans a  join school_hierarchy_details shd on a.school_id= shd.school_id ' + condition + ' group by block_id,district_id,school_management_type,grade,subject;' + '\n'
                to_sql += 'create or replace view ' + table_names + "_district_mgt_stds_cnt_grade_sub_overall as  select concat('Grade_',  grade) as grade,subject,initcap(school_management_type) as school_management_type,district_id,count(distinct student_id) as students_count from " + table_names + '_trans a  join school_hierarchy_details shd on a.school_id= shd.school_id ' + condition + ' group by district_id,school_management_type,grade,subject;' + '\n'
            else:
                to_sql += 'create materialized view  IF NOT EXISTS ' + table_names + "_grade_sub_sch_footer_overall as  select concat('Grade_',  grade) as grade,subject,a.school_id,initcap(school_management_type) as school_management_type,cluster_id,block_id,district_id,count(distinct a.school_id) as total_schools from " + table_names + '_trans a  join school_hierarchy_details shd on a.school_id= shd.school_id ' + condition + ' group by a.school_id,cluster_id,block_id,district_id,grade,subject,school_management_type;' + '\n'
            for filter, var, var_grp in zip(filters, filter_var, filter_grp):
                if student_id_exists is True:
                    school_count = ' join ' + table_names + '_' + filter + '_stds_cnt_grade_sub_overall as cnt on a.' + filter + '_id= cnt.' + filter + '_id  and a.grade=cnt.grade and a.subject = cnt.subject '
                    school_count_mgmt = ' join ' + table_names + '_' + filter + '_mgt_stds_cnt_grade_sub_overall as cnt on a.' + filter + '_id= cnt.' + filter + '_id and a.school_management_type=cnt.school_management_type and a.grade = cnt.grade and a.subject = cnt.subject '
                else:
                    school_count = ''
                    school_count_mgmt = ''
                dml_queries += '{"' + filter + '_grade_subject_overall":"select a.grade,a.subject,' + var + ',count(distinct a.school_id) as total_schools,' + metric_rep + ' from ' + table_names + '_aggregation as a' + school_count + ' group by a.grade,a.subject,' + var_grp + '"},'
                dml_queries += '{"' + filter + '_management_grade_subject_overall":"select a.grade,a.subject,' + var + ',count(distinct a.school_id) as total_schools,a.school_management_type,' + metric_rep + ' from ' + table_names + '_aggregation as a' + school_count_mgmt + ' group by ' + var_grp + ',a.school_management_type,a.grade,a.subject' + '"},'
            for filter, var, var_grp in zip(filters, filter_var_footer, filter_grp):
                if student_id_exists is True:
                    dml_queries += '{"' + filter + '_footer_grade_subject_overall":"select grade,subject,' + var + ',sum(total_schools) as total_schools,sum(students_count) as students_count from ' + table_names + '_grade_sub_sch_footer_overall a  group by grade,subject,' + var + '"},'
                    dml_queries += '{"' + filter + '_management_footer_grade_subject_overall":"select grade,subject,' + var + ',school_management_type,sum(total_schools) as total_schools,sum(students_count) as students_count from ' + table_names + '_grade_sub_sch_footer_overall a group by grade,subject,school_management_type,' + var + '"},'
                else:
                    dml_queries += '{"' + filter + '_footer_grade_subject_overall":"select grade,subject,' + var + ',sum(total_schools) as total_schools from ' + table_names + '_grade_sub_sch_footer_overall a  group by grade,subject,' + var + '"},'
                    dml_queries += '{"' + filter + '_management_footer_grade_subject_overall":"select grade,subject,' + var + ',school_management_type,sum(total_schools) as total_schools from ' + table_names + '_grade_sub_sch_footer_overall a group by grade,subject,school_management_type,' + var + '"},'

        if 'last_30_days' in df_time_sel:
            mv_queries += 'refresh materialized view ' + table_names + "_grade_sub_sch_footer_last30;"
            if student_id_exists is True:
                to_sql += 'create materialized view  IF NOT EXISTS ' + table_names + "_grade_sub_sch_footer_last30 as  select concat('Grade_',  grade) as grade,subject,a.school_id,initcap(school_management_type) as school_management_type,cluster_id,block_id,district_id,count(distinct student_id) as students_count,count(distinct a.school_id) as total_schools from " + table_names + '_trans a  join school_hierarchy_details shd on a.school_id= shd.school_id ' + last_30_day_filter + condition_val + ' group by a.school_id,cluster_id,block_id,district_id,grade,subject,school_management_type;' + '\n'
                to_sql += 'create or replace view ' + table_names + "_school_stds_cnt_grade_sub_last30 as  select concat('Grade_',  grade) as grade,subject,shd.school_id,cluster_id,block_id,district_id,count(distinct student_id) as students_count from " + table_names + '_trans a  join school_hierarchy_details shd on a.school_id= shd.school_id ' + last_30_day_filter + condition_val + ' group by shd.school_id,cluster_id,block_id,district_id,grade,subject;' + '\n'
                to_sql += 'create or replace view ' + table_names + "_cluster_stds_cnt_grade_sub_last30 as  select concat('Grade_',  grade) as grade,subject,cluster_id,block_id,district_id,count(distinct student_id) as students_count from " + table_names + '_trans a  join school_hierarchy_details shd on a.school_id= shd.school_id ' + last_30_day_filter + condition_val +  ' group by cluster_id,block_id,district_id,grade,subject;' + '\n'
                to_sql += 'create or replace view ' + table_names + "_block_stds_cnt_grade_sub_last30 as  select concat('Grade_',  grade) as grade,subject,block_id,district_id,count(distinct student_id) as students_count from " + table_names + '_trans a  join school_hierarchy_details shd on a.school_id= shd.school_id ' + last_30_day_filter + condition_val +  ' group  by block_id,district_id,grade,subject;' + '\n'
                to_sql += 'create or replace view ' + table_names + "_district_stds_cnt_grade_sub_last30 as  select concat('Grade_',  grade) as grade,subject,district_id,count(distinct student_id) as students_count from " + table_names + '_trans a  join school_hierarchy_details shd on a.school_id= shd.school_id ' + last_30_day_filter + condition_val +  ' group by district_id,grade,subject;' + '\n'
                to_sql += 'create or replace view ' + table_names + "_school_mgt_stds_cnt_grade_sub_last30 as  select concat('Grade_',  grade) as grade,subject,shd.school_id,initcap(school_management_type) as school_management_type,cluster_id,block_id,district_id,count(distinct student_id) as students_count from " + table_names + '_trans a  join school_hierarchy_details shd on a.school_id= shd.school_id ' + last_30_day_filter + condition_val + ' group by shd.school_id,cluster_id,block_id,school_management_type,district_id,grade,subject;' + '\n'
                to_sql += 'create or replace view ' + table_names + "_cluster_mgt_stds_cnt_grade_sub_last30 as  select concat('Grade_',  grade) as grade,subject,initcap(school_management_type) as school_management_type,cluster_id,block_id,district_id,count(distinct student_id) as students_count from " + table_names + '_trans a  join school_hierarchy_details shd on a.school_id= shd.school_id ' + last_30_day_filter + condition_val +  ' group by cluster_id,block_id,district_id,school_management_type,grade,subject;' + '\n'
                to_sql += 'create or replace view ' + table_names + "_block_mgt_stds_cnt_grade_sub_last30 as  select concat('Grade_',  grade) as grade,subject,initcap(school_management_type) as school_management_type,block_id,district_id,count(distinct student_id) as students_count from " + table_names + '_trans a  join school_hierarchy_details shd on a.school_id= shd.school_id ' + last_30_day_filter + condition_val +  ' group  by block_id,district_id,school_management_type,grade,subject;' + '\n'
                to_sql += 'create or replace view ' + table_names + "_district_mgt_stds_cnt_grade_sub_last30 as  select concat('Grade_',  grade) as grade,subject,initcap(school_management_type) as school_management_type,district_id,count(distinct student_id) as students_count from " + table_names + '_trans a  join school_hierarchy_details shd on a.school_id= shd.school_id ' + last_30_day_filter + condition_val +  ' group by district_id,school_management_type,grade,subject;' + '\n'
            else:
                to_sql += 'create materialized view  IF NOT EXISTS ' + table_names + "_grade_sub_sch_footer_last30 as  select concat('Grade_',  grade) as grade,subject,a.school_id,initcap(school_management_type) as school_management_type,cluster_id,block_id,district_id,count(distinct a.school_id) as total_schools from " + table_names + '_trans a  join school_hierarchy_details shd on a.school_id= shd.school_id ' + last_30_day_filter + condition_val + ' group by a.school_id,cluster_id,block_id,district_id,grade,subject,school_management_type;' + '\n'
            for filter, var, var_grp in zip(filters, filter_var, filter_grp):
                if student_id_exists is True:
                    school_count = ' join ' + table_names + '_' + filter + '_stds_cnt_grade_sub_last30 as cnt on a.' + filter + '_id= cnt.' + filter + '_id  and a.grade=cnt.grade and a.subject = cnt.subject '
                    school_count_mgmt = ' join ' + table_names + '_' + filter + '_mgt_stds_cnt_grade_sub_last30 as cnt on a.' + filter + '_id= cnt.' + filter + '_id and a.school_management_type=cnt.school_management_type and a.grade=cnt.grade and a.subject = cnt.subject '
                else:
                    school_count = ''
                    school_count_mgmt = ''
                dml_queries += '{"' + filter + '_grade_subject_last_30":"select a.grade,a.subject,' + var + ',count(distinct a.school_id) as total_schools,' + metric_rep + ' from ' + table_names + '_aggregation as a ' + school_count + last_30_day_filter + ' group by a.grade,a.subject,' + var_grp + '"},'
                dml_queries += '{"' + filter + '_management_grade_subject_last_30":"select a.grade,a.subject,' + var + ',count(distinct a.school_id) as total_schools,a.school_management_type,' + metric_rep + ' from ' + table_names + '_aggregation as a ' + school_count_mgmt + last_30_day_filter + ' group by a.grade,a.subject, ' + var_grp + ',a.school_management_type' + '"},'
            for filter, var, var_grp in zip(filters, filter_var_footer, filter_grp):
                if student_id_exists is True:
                    dml_queries += '{"' + filter + '_footer_grade_subject_last_30":"select grade,subject,' + var + ',sum(total_schools) as total_schools,sum(students_count) as students_count from ' + table_names + '_grade_sub_sch_footer_last30 a  group by grade,subject,' + var + '"},'
                    dml_queries += '{"' + filter + '_management_footer_grade_subject_last_30":"select grade,subject,' + var + ',school_management_type,sum(total_schools) as total_schools,sum(students_count) as students_count from ' + table_names + '_grade_sub_sch_footer_last30 a group by grade,subject,school_management_type,' + var + '"},'
                else:
                    dml_queries += '{"' + filter + '_footer_grade_subject_last_30":"select grade,subject,' + var + ',sum(total_schools) as total_schools from ' + table_names + '_grade_sub_sch_footer_last30 a  group by grade,subject,' + var + '"},'
                    dml_queries += '{"' + filter + '_management_footer_grade_subject_last_30":"select grade,subject,' + var + ',school_management_type,sum(total_schools) as total_schools from ' + table_names + '_grade_sub_sch_footer_last30 a group by grade,subject,school_management_type,' + var + '"},'

        if 'last_7_days' in df_time_sel:
            mv_queries += 'refresh materialized view ' + table_names + "_grade_sub_sch_footer_last7;"
            if student_id_exists is True:
                to_sql += 'create materialized view  IF NOT EXISTS ' + table_names + "_grade_sub_sch_footer_last7 as  select concat('Grade_',  grade) as grade,subject,a.school_id,initcap(school_management_type) as school_management_type,cluster_id,block_id,district_id,count(distinct student_id) as students_count,count(distinct a.school_id) as total_schools from " + table_names + '_trans a  join school_hierarchy_details shd on a.school_id= shd.school_id ' + last_7_day_filter + condition_val + ' group by a.school_id,cluster_id,block_id,district_id,grade,subject,school_management_type;' + '\n'
                to_sql += 'create or replace view ' + table_names + "_school_stds_cnt_grade_sub_last7 as  select concat('Grade_',  grade) as grade,subject,shd.school_id,cluster_id,block_id,district_id,count(distinct student_id) as students_count from " + table_names + '_trans a  join school_hierarchy_details shd on a.school_id= shd.school_id ' + last_7_day_filter + condition_val +  ' group by shd.school_id,cluster_id,block_id,district_id,grade,subject;' + '\n'
                to_sql += 'create or replace view ' + table_names + "_cluster_stds_cnt_grade_sub_last7 as  select concat('Grade_',  grade) as grade,subject,cluster_id,block_id,district_id,count(distinct student_id) as students_count from " + table_names + '_trans a  join school_hierarchy_details shd on a.school_id= shd.school_id ' + last_7_day_filter + condition_val +  ' group by cluster_id,block_id,district_id,grade,subject;' + '\n'
                to_sql += 'create or replace view ' + table_names + "_block_stds_cnt_grade_sub_last7 as  select concat('Grade_',  grade) as grade,subject,block_id,district_id,count(distinct student_id) as students_count from " + table_names + '_trans a  join school_hierarchy_details shd on a.school_id= shd.school_id ' + last_7_day_filter + condition_val +  ' group  by block_id,district_id,grade,subject;' + '\n'
                to_sql += 'create or replace view ' + table_names + "_district_stds_cnt_grade_sub_last7 as  select concat('Grade_',  grade) as grade,subject,district_id,count(distinct student_id) as students_count from " + table_names + '_trans a  join school_hierarchy_details shd on a.school_id= shd.school_id ' + last_7_day_filter + condition_val +  ' group by district_id,grade,subject;' + '\n'
                to_sql += 'create or replace view ' + table_names + "_school_mgt_stds_cnt_grade_sub_last7 as  select concat('Grade_',  grade) as grade,subject,shd.school_id,initcap(school_management_type) as school_management_type,cluster_id,block_id,district_id,count(distinct student_id) as students_count from " + table_names + '_trans a  join school_hierarchy_details shd on a.school_id= shd.school_id ' + last_7_day_filter + condition_val +  ' group by shd.school_id,cluster_id,block_id,school_management_type,district_id,grade,subject;' + '\n'
                to_sql += 'create or replace view ' + table_names + "_cluster_mgt_stds_cnt_grade_sub_last7 as  select concat('Grade_',  grade) as grade,subject,initcap(school_management_type) as school_management_type,cluster_id,block_id,district_id,count(distinct student_id) as students_count from " + table_names + '_trans a  join school_hierarchy_details shd on a.school_id= shd.school_id ' + last_7_day_filter + condition_val +  ' group by cluster_id,block_id,district_id,school_management_type,grade,subject;' + '\n'
                to_sql += 'create or replace view ' + table_names + "_block_mgt_stds_cnt_grade_sub_last7 as  select concat('Grade_',  grade) as grade,subject,initcap(school_management_type) as school_management_type,block_id,district_id,count(distinct student_id) as students_count from " + table_names + '_trans a  join school_hierarchy_details shd on a.school_id= shd.school_id ' + last_7_day_filter + condition_val +  ' group  by block_id,district_id,school_management_type,grade,subject;' + '\n'
                to_sql += 'create or replace view ' + table_names + "_district_mgt_stds_cnt_grade_sub_last7 as  select concat('Grade_',  grade) as grade,subject,initcap(school_management_type) as school_management_type,district_id,count(distinct student_id) as students_count from " + table_names + '_trans a  join school_hierarchy_details shd on a.school_id= shd.school_id ' + last_7_day_filter + condition_val +  ' group by district_id,school_management_type,grade,subject;' + '\n'
            else:
                to_sql += 'create materialized view  IF NOT EXISTS ' + table_names + "_grade_sub_sch_footer_last7 as  select concat('Grade_',  grade) as grade,subject,a.school_id,initcap(school_management_type) as school_management_type,cluster_id,block_id,district_id,count(distinct a.school_id) as total_schools from " + table_names + '_trans a  join school_hierarchy_details shd on a.school_id= shd.school_id ' + last_7_day_filter + condition_val + ' group by a.school_id,cluster_id,block_id,district_id,grade,subject,school_management_type;' + '\n'

            for filter, var, var_grp in zip(filters, filter_var, filter_grp):
                if student_id_exists is True:
                    school_count = ' join ' + table_names + '_' + filter + '_stds_cnt_grade_sub_last7 as cnt on a.' + filter + '_id= cnt.' + filter + '_id  and a.grade=cnt.grade'
                    school_count_mgmt = ' join ' + table_names + '_' + filter + '_mgt_stds_cnt_grade_sub_last7 as cnt on a.' + filter + '_id= cnt.' + filter + '_id and a.school_management_type=cnt.school_management_type and a.grade=cnt.grade'
                else:
                    school_count = ''
                    school_count_mgmt = ''
                dml_queries += '{"' + filter + '_grade_subject_last_7":"select a.grade,a.subject,' + var + ',count(distinct a.school_id) as total_schools,' + metric_rep + ' from ' + table_names + '_aggregation as a ' + school_count + last_7_day_filter + ' group by a.grade,a.subject,' + var_grp + '"},'
                dml_queries += '{"' + filter + '_management_grade_subject_last_7":"select a.grade,a.subject,' + var + ',count(distinct a.school_id) as total_schools,a.school_management_type,' + metric_rep + ' from ' + table_names + '_aggregation as a ' + school_count_mgmt + last_7_day_filter + ' group by a.grade, ' + var_grp + ',a.school_management_type,a.subject' + '"},'
            for filter, var, var_grp in zip(filters, filter_var_footer, filter_grp):
                if student_id_exists is True:
                    dml_queries += '{"' + filter + '_footer_grade_subject_last_7":"select grade,subject,' + var + ',sum(total_schools) as total_schools,sum(students_count) as students_count from ' + table_names + '_grade_sub_sch_footer_last7 a  group by grade,subject,' + var + '"},'
                    dml_queries += '{"' + filter + '_management_footer_grade_subject_last_7":"select grade,subject,' + var + ',school_management_type,sum(total_schools) as total_schools,sum(students_count) as students_count from ' + table_names + '_grade_sub_sch_footer_last7 a group by grade,subject,school_management_type,' + var + '"},'
                else:
                    dml_queries += '{"' + filter + '_footer_grade_subject_last_7":"select grade,subject,' + var + ',sum(total_schools) as total_schools from ' + table_names + '_grade_sub_sch_footer_last7 a  group by grade,subject,' + var + '"},'
                    dml_queries += '{"' + filter + '_management_footer_grade_subject_last_7":"select grade,subject,' + var + ',school_management_type,sum(total_schools) as total_schools from ' + table_names + '_grade_sub_sch_footer_last7 a group by grade,subject,school_management_type,' + var + '"},'
        if 'last_day' in df_time_sel:
            mv_queries += 'refresh materialized view ' + table_names + "_grade_sub_sch_footer_last_day;"
            if student_id_exists is True:
                to_sql += 'create materialized view  IF NOT EXISTS ' + table_names + "_grade_sub_sch_footer_last_day as  select concat('Grade_',  grade) as grade,subject,a.school_id,initcap(school_management_type) as school_management_type,cluster_id,block_id,district_id,count(distinct student_id) as students_count,count(distinct a.school_id) as total_schools from " + table_names + '_trans a  join school_hierarchy_details shd on a.school_id= shd.school_id ' + last_day_filter + condition_val + ' group by a.school_id,cluster_id,block_id,district_id,grade,subject,school_management_type;' + '\n'
                to_sql += 'create or replace view ' + table_names + "_school_stds_cnt_grade_sub_last_day as  select concat('Grade_',  grade) as grade,subject,shd.school_id,cluster_id,block_id,district_id,count(distinct student_id) as students_count,count(distinct a.school_id) as total_schools from " + table_names + '_trans a  join school_hierarchy_details shd on a.school_id= shd.school_id ' + last_day_filter + condition_val +  ' group by shd.school_id,cluster_id,block_id,district_id,grade,subject;' + '\n'
                to_sql += 'create or replace view ' + table_names + "_cluster_stds_cnt_grade_sub_last_day as  select concat('Grade_',  grade) as grade,subject,cluster_id,block_id,district_id,count(distinct student_id) as students_count,count(distinct a.school_id) as total_schools from " + table_names + '_trans a  join school_hierarchy_details shd on a.school_id= shd.school_id ' + last_day_filter + condition_val +  ' group by cluster_id,block_id,district_id,grade,subject;' + '\n'
                to_sql += 'create or replace view ' + table_names + "_block_stds_cnt_grade_sub_last_day as  select concat('Grade_',  grade) as grade,subject,block_id,district_id,count(distinct student_id) as students_count,count(distinct a.school_id) as total_schools from " + table_names + '_trans a  join school_hierarchy_details shd on a.school_id= shd.school_id ' + last_day_filter + condition_val +  ' group  by block_id,district_id,grade,subject;' + '\n'
                to_sql += 'create or replace view ' + table_names + "_district_stds_cnt_grade_sub_last_day as  select concat('Grade_',  grade) as grade,subject,district_id,count(distinct student_id) as students_count,count(distinct a.school_id) as total_schools from " + table_names + '_trans a  join school_hierarchy_details shd on a.school_id= shd.school_id ' + last_day_filter + condition_val +  ' group by district_id,grade,subject;' + '\n'
                to_sql += 'create or replace view ' + table_names + "_school_mgt_stds_cnt_grade_sub_last_day as  select concat('Grade_',  grade) as grade,subject,shd.school_id,initcap(school_management_type) as school_management_type,cluster_id,block_id,district_id,count(distinct student_id) as students_count,count(distinct a.school_id) as total_schools from " + table_names + '_trans a  join school_hierarchy_details shd on a.school_id= shd.school_id ' + last_day_filter + condition_val +  ' group by shd.school_id,cluster_id,block_id,school_management_type,district_id,grade,subject;' + '\n'
                to_sql += 'create or replace view ' + table_names + "_cluster_mgt_stds_cnt_grade_sub_last_day as  select concat('Grade_',  grade) as grade,subject,initcap(school_management_type) as school_management_type,cluster_id,block_id,district_id,count(distinct student_id) as students_count,count(distinct a.school_id) as total_schools from " + table_names + '_trans a  join school_hierarchy_details shd on a.school_id= shd.school_id ' + last_day_filter + condition_val +  ' group by cluster_id,block_id,district_id,school_management_type,grade,subject;' + '\n'
                to_sql += 'create or replace view ' + table_names + "_block_mgt_stds_cnt_grade_sub_last_day as  select concat('Grade_',  grade) as grade,subject,initcap(school_management_type) as school_management_type,block_id,district_id,count(distinct student_id) as students_count,count(distinct a.school_id) as total_schools from " + table_names + '_trans a  join school_hierarchy_details shd on a.school_id= shd.school_id ' + last_day_filter + condition_val +  ' group  by block_id,district_id,school_management_type,grade,subject;' + '\n'
                to_sql += 'create or replace view ' + table_names + "_district_mgt_stds_cnt_grade_sub_last_day as  select concat('Grade_',  grade) as grade,subject,initcap(school_management_type) as school_management_type,district_id,count(distinct student_id) as students_count,count(distinct a.school_id) as total_schools from " + table_names + '_trans a  join school_hierarchy_details shd on a.school_id= shd.school_id ' + last_day_filter + condition_val +  ' group by district_id,school_management_type,grade,subject;' + '\n'
            else:
                to_sql += 'create materialized view  IF NOT EXISTS ' + table_names + "_grade_sub_sch_footer_last_day as  select concat('Grade_',  grade) as grade,subject,a.school_id,initcap(school_management_type) as school_management_type,cluster_id,block_id,district_id,count(distinct a.school_id) as total_schools from " + table_names + '_trans a  join school_hierarchy_details shd on a.school_id= shd.school_id ' + last_day_filter + condition_val + ' group by a.school_id,cluster_id,block_id,district_id,grade,subject,school_management_type;' + '\n'
            for filter, var, var_grp in zip(filters, filter_var, filter_grp):
                if student_id_exists is True:
                    school_count = ' join ' + table_names + '_' + filter + '_stds_cnt_grade_sub_last_day as cnt on a.' + filter + '_id= cnt.' + filter + '_id  and a.grade=cnt.grade and a.subject=cnt.subject '
                    school_count_mgmt = ' join ' + table_names + '_' + filter + '_mgt_stds_cnt_grade_sub_last_day as cnt on a.' + filter + '_id= cnt.' + filter + '_id and a.school_management_type=cnt.school_management_type and a.grade=cnt.grade and a.subject = cnt.subject '
                else:
                    school_count = ''
                    school_count_mgmt = ''
                dml_queries += '{"' + filter + '_grade_subject_last_day":"select a.grade,a.subject,' + var + ',' + date_col + ',count(distinct a.school_id) as total_schools,' + metric_rep + ' from ' + table_names + '_aggregation as a ' + school_count + last_day_filter + ' group by a.grade,a.subject,' + var_grp + ',' + date_col + '"},'
                dml_queries += '{"' + filter + '_management_grade_subject_last_day":"select a.grade,a.subject,' + var + ',' + date_col + ',count(distinct a.school_id) as total_schools,a.school_management_type,' + metric_rep + ' from ' + table_names + '_aggregation as a ' + school_count_mgmt + last_day_filter + ' group by a.grade, ' + var_grp + ',a.school_management_type,a.subject' + ',' + date_col +'"},'
            for filter, var, var_grp in zip(filters, filter_var_footer, filter_grp):
                if student_id_exists is True:
                    dml_queries += '{"' + filter + '_footer_grade_subject_last_day":"select grade,subject,' + var + ',sum(total_schools) as total_schools,sum(students_count) as students_count from ' + table_names + '_grade_sub_sch_footer_last_day a  group by grade,subject,' + var + '"},'
                    dml_queries += '{"' + filter + '_management_footer_grade_subject_last_day":"select grade,subject,' + var + ',school_management_type,sum(total_schools) as total_schools,sum(students_count) as students_count from ' + table_names + '_grade_sub_sch_footer_last_day a group by grade,subject,school_management_type,' + var + '"},'
                else:
                    dml_queries += '{"' + filter + '_footer_grade_subject_last_day":"select grade,subject,' + var + ',sum(total_schools) as total_schools from ' + table_names + '_grade_sub_sch_footer_last_day a  group by grade,subject,' + var + '"},'
                    dml_queries += '{"' + filter + '_management_footer_grade_subject_last_day":"select grade,subject,' + var + ',school_management_type,sum(total_schools) as total_schools from ' + table_names + '_grade_sub_sch_footer_last_day a group by grade,subject,school_management_type,' + var + '"},'
        if 'grade' in df_filters_req and 'subject' in df_filters_req:
            dml_queries += '{"meta":"select grade.academic_year,json_agg(json_build_object(' + "'grades',grades,'months',months)) as data from (select academic_year,json_agg(json_build_object('grade',grade,'subjects',subjects)) as grades from (select academic_year,grade,json_agg(subject) as subjects from (select  distinct academic_year(" + date_col + ") as academic_year,grade,subject from " + table_names + "_aggregation) as a group by academic_year,grade) as a group by academic_year) as grade join (select academic_year,json_agg(json_build_object('months',month,'weeks',weeks)) as months from (select academic_year,trim(month) as month,json_agg(json_build_object('week',week,'days',dates)) as weeks from  (select academic_year,month,week,json_agg(" + date_col + ")as dates from (select distinct " + date_col + ",cast(extract('day' from date_trunc('week' ," + date_col + ") -date_trunc('week', date_trunc('month', " + date_col + " ))) / 7 + 1 as integer) as week,TO_CHAR(" + date_col + ", 'Month') AS month,academic_year(" + date_col + ") as academic_year from " + table_names + '_aggregation ' + ") as a group by academic_year,month,week) as a group by academic_year,month) as b group by academic_year) as  dates on grade.academic_year = dates.academic_year group by grade.academic_year  union all select academic_year,json_agg(json_build_object('grades',grades,'months','')) as data from (select 'overall' as academic_year,json_agg(json_build_object('grade',grade,'subjects',subjects)) as grades from (select grade,json_agg(subject) as subjects from (select  distinct grade,subject from " + table_names + "_aggregation) as a group by grade) as a) as a group by academic_year" + '"},'
        elif 'grade' in df_filters_req:
            dml_queries += '{"meta":"select grade.academic_year,json_agg(json_build_object(' + "'grades',grades,'months',months)) as data from (select academic_year,json_agg(grade) as grades from (select  distinct academic_year(" + date_col + ") as academic_year,grade from " + table_names + "_aggregation) as a group by academic_year) as grade join (select academic_year,json_agg(json_build_object('month',month,'weeks',weeks)) as months from (select academic_year,trim(month) as month,json_agg(json_build_object('week',week,'days',dates)) as weeks from (select academic_year,month,week,json_agg(" + date_col + ")as dates from (select distinct " + date_col + ",cast(extract('day' from date_trunc('week' ," + date_col + ") -date_trunc('week', date_trunc('month'," + date_col + "))) / 7 + 1 as integer) as week,TO_CHAR(" + date_col + ", 'Month') AS month,academic_year(" + date_col + ") as academic_year from " + table_names + '_aggregation) as a group by academic_year,month,week) as a group by academic_year,month) as b group by academic_year) as  dates on grade.academic_year = dates.academic_year group by grade.academic_year"},'
        else:
            return
        mv_queries += '"}]'
        dml_queries += '{"time_period_meta":"select distinct time_selections_required as value from configure_time_selections where trim(lower(datasource_name)) = ' + "'" + table_names + "' and trim(lower(time_selections_required)) not in ('daily','weekly')" + '"},'
    dml_queries = dml_queries.rstrip(dml_queries[-1])
    dml_queries = dml_queries + '\n' + ']'


def execute_sql():
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
        cursor.execute(open(path + '/{}.sql'.format(file_name_sql), 'r').read())
        conn.commit()
        conn.close()


def write_files():
    isExist = os.path.exists(path)
    is_exist = os.path.exists(path + '/' + file_name_sql)
    if not isExist:
        os.makedirs(path)
    if not is_exist:
        os.makedirs(path + '/' + file_name_sql)
    global query_file, all_queries
    query_file = open((path + '/{}.sql'.format(file_name_sql)), 'w')
    all_queries += alter_log_summary
    all_queries += to_sql
    query_file.write(all_queries)
    query_file.close()
    if 'subject' in df_filters_req:
        to_insert_json1 = to_insert_json + mv_queries
    else:
        to_insert_json1 = to_insert_json[:-1]
        to_insert_json1 += ']'
    to_insert_json_ = json.loads(to_insert_json1, strict=False)

    with open((path + '/{}/temp_trans_aggregation_queries.json'.format(file_name_sql)), 'w') as outfile:
        json.dump(to_insert_json_, outfile)
    global parameter_file
    param_file_queries = all_param_queries + all_param_queries_1
    param_file = open((path + '/{}/parameters.txt'.format(file_name_sql)), 'w')
    param_file.write(param_file_queries)
    param_file.close()
    to_report_json = json.loads(dml_queries, strict=False)
    with open((path + '/{}/report_queries.json'.format(file_name_sql)), 'w') as report_file:
        json.dump(to_report_json, report_file)


if __name__ == "__main__":
    create_parameters_queries()
    create_table_queries()
    create_dml_timeline_queries()
    write_files()
    execute_sql()