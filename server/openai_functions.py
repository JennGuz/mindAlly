from openai import OpenAI
from pydantic import BaseModel
import os
from dotenv import load_dotenv

load_dotenv()


def create_completion_openai(
    system_prompt: str,
    user_message: str,
    previous_messages: list[dict] = [],
    model="gpt-4o-mini",
    api_key: str = os.environ.get("OPENAI_API_KEY"),
):
    client = OpenAI(
        api_key=api_key,
    )
    messages = [
        {"role": "system", "content": system_prompt},
    ]
    for message in previous_messages:
        messages.append({"role": message["type"], "content": message["text"]})

    messages.append({"role": "user", "content": user_message})

    completion = client.chat.completions.create(
        model=model,
        max_tokens=5000,
        messages=messages,
    )
    return completion.choices[0].message.content


class ExampleStructure(BaseModel):
    salute: str


def create_structured_completion(
    model="gpt-4o",
    system_prompt: str = "You are an userful assistant",
    user_prompt: str = "",
    response_format=ExampleStructure,
    api_key: str = os.environ.get("OPENAI_API_KEY"),
):
    client = OpenAI(api_key=api_key)

    completion = client.beta.chat.completions.parse(
        model=model,
        messages=[
            {"role": "system", "content": system_prompt},
            {
                "role": "user",
                "content": user_prompt,
            },
        ],
        response_format=response_format,
    )
    return completion.choices[0].message.parsed

