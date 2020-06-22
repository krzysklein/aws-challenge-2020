import boto3
import json
from pyqldb.driver.pooled_qldb_driver import PooledQldbDriver


qldb_driver = PooledQldbDriver(ledger_name='EPollLedger')


def retrieve_options_from_db(transaction_executor):
    options = []
    cursor = transaction_executor.execute_statement("SELECT OptionName FROM Options")
    for option in cursor:
        options.append(option)
    return options


def get_options(event, context):
    options = qldb_driver.execute_lambda(lambda x: retrieve_options_from_db(x))
    response = {
        'statusCode': 200,
        'body': str(options)
    }
    return response
