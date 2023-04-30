import os
import openai

openai.api_key = os.getenv("OPENAI_API_KEY")

def getCompletion(messages):
    userMessages = [{
        "role": "system",
        "content": "You are a teaching assistant. Answer the student's question."
      }]
    print(userMessages, "\n\n")
    if messages is not None:
        userMessages.extend(messages)
    completion = openai.ChatCompletion.create(
    model="gpt-3.5-turbo",
    messages = userMessages
    )
    response = completion.choices[0].message.content
    messages.append({"role": "assistant", "content": response})
    return messages
