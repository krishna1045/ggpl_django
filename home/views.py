from django.shortcuts import render
from firebaseConfig import db
import operator
# Create your views here.


def home(request):
    leaderboards_ref = db.collection('leaderboards').stream()
    leaderboards_info = []
    current_predictions_ref = db.collection('current_prediction').stream()
    current_predictions = []
    for doc in leaderboards_ref:
        leaderboards_info.append(doc.to_dict())
    for doc in current_predictions_ref:
        current_predictions.append(doc.to_dict())
    leaderboards_info.sort(key=operator.itemgetter('points'), reverse=True)
    return render(request, 'home/index.html', {'current_predictions': current_predictions, 'leaderboards_info': leaderboards_info})
