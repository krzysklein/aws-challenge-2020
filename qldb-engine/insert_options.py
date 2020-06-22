import boto3
import json
from pyqldb.driver.pooled_qldb_driver import PooledQldbDriver


qldb_driver = PooledQldbDriver(ledger_name='EPollLedger')


def insert_options_into_db(transaction_executor, options):
    # try:
    for option in options:
        cursor = transaction_executor.execute_statement("SELECT * FROM Options WHERE OptionName = ?", option)
        first_record = next(cursor, None)
        if first_record:
            return False, option
        insert = {
            "OptionName": option
        }
        transaction_executor.execute_statement("INSERT INTO Options ?", insert)
    return True, ''
    # except:
    #     return False


def insert_options(event, context):
    body = json.loads(event['body'])
    options = body['options']
    result = qldb_driver.execute_lambda(lambda x: insert_options_into_db(x, options))
    if result[0]:
        response = {
            'statusCode': 200,
            'body': 'Inserted options into db'
        }
        return response
    response = {
        'statusCode': 400,
        'body': f'Record {result[1]} already exists'
    }
    return response
