import boto3
import json
import hashlib
from pyqldb.driver.pooled_qldb_driver import PooledQldbDriver


qldb_driver = PooledQldbDriver(ledger_name='EPollLedger')


def validateHash(transaction_executor, voterId):
    voteIdHash = hashlib.md5(voterId.encode('utf-8')).hexdigest()
    query = "SELECT * FROM Hashes AS vh WHERE vh.hash = ?", voteIdHash
    cursor = transaction_executor.execute_statement("SELECT * FROM Hashes AS vh WHERE vh.hash = ?", voteIdHash)
    first_record = next(cursor, None)

    if first_record:
        return False, ''
    else:
        arg = {
            'hash': voteIdHash
        }
        transaction_executor.execute_statement("INSERT INTO Hashes ?", arg)
        query_2 = "SELECT hid FROM Hashes AS h BY hid WHERE Hashes = ?", voteIdHash
        cursor_2 = transaction_executor.execute_statement("SELECT * FROM Hashes AS vh WHERE vh.hash = ?", voteIdHash)
        hashId = next(cursor_2, None)
        return True, hashId


def getOptionId(transaction_executor, option):
    query = "SELECT oid FROM Options as o BY oid WHERE c.Options = ?", option
    cursor = transaction_executor.execute_statement("SELECT oid FROM Options as o BY oid WHERE o.OptionName = ?", option)
    option_record = next(cursor, None)

    if option_record:
        return True, option_record['oid']
    else:
        return False, ''


def insertDocument(transaction_executor, option, hash, metadata):
    arg = {
        'optionId': option,
        'votingHash': hash,
        'Metadata': metadata
    }
    transaction_executor.execute_statement("INSERT INTO Votes ?", arg)
    return True


def write_result(event, context):
    body = json.loads(event['body'])
    voterId = body['voterId']
    metadata = body['metadata']
    option = body['option']

    validation_result = qldb_driver.execute_lambda(lambda x: validateHash(x, voterId))
    if not validation_result[0]:
        return {
            'statusCode': 400,
            'body': 'User had already voted'
        }
    option_id = qldb_driver.execute_lambda(lambda x: getOptionId(x, option))
    qldb_driver.execute_lambda(lambda x: insertDocument(x, option_id[1], validation_result[1]['hash'], metadata))
    return {
        'statusCode': 200,
        'body': 'Vote has been submitted'
    }
