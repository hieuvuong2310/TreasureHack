from flask import Flask, request
from flask_cors import cross_origin
from fileUtils import downloadFile
from openaiUtils import rq
from rq.job import Job
from flask_rq2 import RQ

app = Flask(__name__, static_url_path='', static_folder='dist')
rq.init_app(app)


@app.route('/getSummary',methods = ['POST'])
@cross_origin()
def getSummary():
   data = request.json
   filePath = downloadFile(data['id'])
   print("Getting summary for file", filePath)
   from openaiUtils import getSummary
   job = getSummary.queue(filePath, result_ttl=300)
   return {
         "JobId": job.get_id(),
         "FileId": data["id"],
   }, 201

@app.route("/results/<job_key>", methods=['GET'])
def get_results(job_key):

    job: Job = rq.get_queue().fetch_job(job_key)
    if job is None:
        return "Could not find job", 404
    print(job.meta.get('progress', 0))
    if job.is_finished:
        return str(job.result), 200
    else:
        return "Processing document" + str(job), 202

if __name__ == '__main__':
   app.run(debug = True)
