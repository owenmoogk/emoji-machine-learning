from django.shortcuts import render
import json
from sklearn import tree
from rest_framework.response import Response
from rest_framework import status
from rest_framework.decorators import api_view

# adds the current grid to the samples.txt file
@api_view(["POST"])
def train(request):

	data_string = json.dumps(request.data)

	with open('samples.txt', "a+") as text:
		text.write(f'{data_string}\n')

	return Response({}, status=status.HTTP_200_OK)

# gets a prediction
@api_view(["POST"])
def guess(request):

	# load the training data
	training_features,training_labels = load_training_data()

	# if there is no training data then fitting the model fails, we need to return none
	if len(training_labels) < 1:
		return Response({'Error': "No training data at the moment"}, status=status.HTTP_200_OK)

	model = tree.DecisionTreeClassifier()
	model = model.fit(training_features,training_labels)

	features = flatten_list(request.data['features'])
	guess = model.predict([features])
	return Response({'guess': guess}, status=status.HTTP_200_OK)

def load_training_data():
	training_features = []
	training_labels = []
	sample_counts = {}

	text = open("samples.txt", "r")
	lines = text.readlines()
	for line in lines:
		data = json.loads(line)
		label = data["label"]
		features = flatten_list(data["features"])
		training_labels.append(label)
		training_features.append(features)
		sample_counts[label] = sample_counts.get(label, 0) + 1

	return(training_features, training_labels)

# list helper, from 2d to 1d lists
def flatten_list(list_2d):
	flat_list = []
	for sublist in list_2d:
		for item in sublist:
			flat_list.append(item)
	return flat_list

# delete all the current data
@api_view(['POST'])
def delete(request):
	open("samples.txt", "w").close()
	return Response({}, status=status.HTTP_200_OK)

@api_view(['GET'])
def getDataStats(request):
	trainingData, trainingLabels = load_training_data()
	emojiNumbers = {
		'🙂': 0,
		"🚀": 0,
		'💎': 0,
		'👍': 0
	}
	for label in trainingLabels:
		emojiNumbers[label] += 1
	return Response(emojiNumbers, status=status.HTTP_200_OK)