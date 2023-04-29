import requests

def downloadFile(fileId):
    url = f"https://cloud.appwrite.io/v1/storage/buckets/644c98b56b824cdc5879/files/{fileId}/download"
    fileName = "userFile.pdf"
    headers = {
        'X-Appwrite-Project': "TreasureHacks"
    }
    with requests.get(url, stream=True, headers=headers) as r:
        r.raise_for_status()
        with open(fileName, 'wb') as f:
            for chunk in r.iter_content(chunk_size=5*1024*1024):
                # If you have chunk encoded response uncomment if
                # and set chunk_size parameter to None.
                #if chunk:
                f.write(chunk)
    return fileName

import hashlib

def hash_file(filename):
   h = hashlib.sha1()
   with open(filename,'rb') as file:
       chunk = 0
       while chunk != b'':
           chunk = file.read(8*1024*1024)
           h.update(chunk)
   return h.hexdigest()
