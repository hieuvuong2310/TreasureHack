from flask import Flask, request
from flask_cors import cross_origin
from fileUtils import downloadFile
from openaiUtils import getSummary

app = Flask(__name__)

@app.route('/getSummary',methods = ['POST'])
@cross_origin()
def login():
   data = request.json
   fileName = downloadFile(data['id'])
   print("Getting summary for file", fileName)
   summary = getSummary(fileName)
   print("Summary:", summary)
   return {
         "summary": summary,
         "id": data["id"],
   }

if __name__ == '__main__':
   app.run(debug = True)
