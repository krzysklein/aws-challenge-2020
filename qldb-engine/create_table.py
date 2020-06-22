import json
from pyqldb.driver.pooled_qldb_driver import PooledQldbDriver
from datetime import datetime


qldb_driver = PooledQldbDriver(ledger_name='EPollLedger')


def create_table(transaction_executor, arg_1):
    print(f'Creating table {arg_1}')
    query = f"CREATE TABLE {arg_1}"
    transaction_executor.execute_statement(query)


def create_index(transaction_executor, table, index):
    print(f'Creating index {index}')
    query = f"CREATE INDEX ON {table}({index})"
    transaction_executor.execute_statement(query)


def lambda_handler(event, context):
    qldb_driver.execute_lambda(lambda x: create_table(x, 'Votes'))
    qldb_driver.execute_lambda(lambda x: create_table(x, 'Options'))
    qldb_driver.execute_lambda(lambda x: create_table(x, 'VotingMetadata'))
    qldb_driver.execute_lambda(lambda x: create_table(x, 'Hashes'))

    qldb_driver.execute_lambda(lambda x: create_index(x, 'Votes', 'HashId'))
    qldb_driver.execute_lambda(lambda x: create_index(x, 'Votes', 'optionId'))
    qldb_driver.execute_lambda(lambda x: create_index(x, 'Options', 'OptionName'))
    qldb_driver.execute_lambda(lambda x: create_index(x, 'Hashes', 'Hash'))
    # TODO implement
    return {
        'statusCode': 200,
        'body': json.dumps('Ledger successfully provisioned')
    }
