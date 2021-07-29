from typing import Dict, List
from google.cloud import aiplatform



def hello_world(request):

    event_body = request.get_json()
    if event_body:
        cvToLst = []
        cvToLst.append(event_body)
        dataToAI = cvToLst
        x = predict_tabular_regression_sample(dataToAI)
        return x
    else:
        return 'Check if the data is passed correctly'

def predict_tabular_regression_sample(
        dataToAI
):

    project = "412171526637"
    location= "us-central1"
    endpoint = "8189145011489603584"

    aiplatform.init(project=project, location=location)

    endpoint = aiplatform.Endpoint(endpoint)

    response = endpoint.predict(instances=instances)

    return response.predictions[0]