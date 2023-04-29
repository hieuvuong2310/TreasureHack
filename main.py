import os
import openai

openai.api_key = os.getenv("OpenAI_API")

question = input("\033[34mHow can I help you?\033[0m\n")

while True:

  if question.lower() == "exit" or question.lower() == "logout":
    print(
      "\033[31mI hope my answers helped, reach out anytime. Goodbye!\033[0m")
    break

  # send the question to the API and receive the response
  completion = openai.ChatCompletion.create(
    model="gpt-3.5-turbo",
    messages=[{
      "role":
      "system",
      "content":
      "You are a teaching assistant. Answer the student's question."
    }, {
      "role": "user",
      "content": question
    }])

  # print the response
  print("\033[32m" + completion.choices[0].message.content + "\033[0m\n")
  question = input("\033[34mAnything else I can help you with?\033[0m\n")
