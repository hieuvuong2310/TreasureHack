import os
import PyPDF2
import openai
import time
from flask_rq2 import RQ

# get API key from environment variable
openai.api_key = os.getenv("OPENAI_API_KEY")

rq = RQ()

@rq.job(timeout=60*15)
def getSummary(filePath):
    pdf_summary_text = []
    pdf_file = open(filePath, 'rb')
    pdf_reader = PyPDF2.PdfReader(pdf_file)

    system_message = {"role": "system", "content": "You are a teaching assistant. You are currently helping an user understand a document. The user has asked you to summarize the document. The user says:"}

    for page_num in range(len(pdf_reader.pages)):
        page_text = pdf_reader.pages[page_num].extract_text().lower()
        messages = [system_message, {"role": "user", "content": page_text}, {"role": "system", "content": "Summarize this content."}]

        try:
            response = openai.ChatCompletion.create(
                model="gpt-3.5-turbo",
                messages=messages
            )
            pdf_summary_text.append(response["choices"][0]["message"]["content"])
            time.sleep(20)
            print(f"Page {page_num+1}/{len(pdf_reader.pages)} completed")
        except Exception as e:
            print("Error with openai", e)

    pdf_file.close()

    return "\n".join(pdf_summary_text)
