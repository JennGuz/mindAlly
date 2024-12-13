from .logger import get_custom_logger
from .sentiment_analysis import predict
from .openai_functions import create_completion_openai

logger = get_custom_logger("event_triggers")

translation_prompt = "Your unique task is to translate every user message from any language to English if the message is already in English just return the user"

mental_advisor_prompt = """You are a specialized psychologist with many years of experience your task is to provide useful advices to the user so the user can understand its mental issues and understand how to solve its problem with ease. you will receive the output of sentiment analysis model so you can use it for your advices if the mental analysis model is wrong or you think is wrong about the user emotions just provide an useful advice based on the user message. The sentiment analysis model produced this output: {sentiment_output}.

Provide a helpful advice for the user. Answer always in the same language as the user message.
"""

async def on_message_handler(socket_id, data, **kwargs):
    from .socket import sio

    user_message = data['message']['text']
    previous_messages = data['previous_messages']

    completion = create_completion_openai(
        system_prompt=translation_prompt,
        user_message=user_message,
    )
    print(completion)
    prediction = predict(completion)["prediction"]

    await sio.emit(
        "prediction",
        {
            "prediction": prediction
        },
        to=socket_id
    )
    print(prediction)
    advice = create_completion_openai(
        system_prompt=mental_advisor_prompt.format(
            sentiment_output=prediction,
        ),
        user_message=user_message,
        previous_messages=previous_messages
    )

    await sio.emit(
        "advice",
        {
            "advice": advice
        },
        to=socket_id
    )
    print(advice)


def on_connect_handler(socket_id, **kwargs):
    pass

async def on_start_handler(socket_id, data, **kwargs):

    print(data)
