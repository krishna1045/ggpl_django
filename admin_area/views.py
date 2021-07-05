from django.shortcuts import render
from firebaseConfig import db
import operator
# Create your views here.


def admin_area(request):
    leaderboards_ref = db.collection('leaderboards').stream()
    leaderboards_info = []
    for doc in leaderboards_ref:
        leaderboards_info.append(doc.to_dict())
    leaderboards_info.sort(key=operator.itemgetter('points'), reverse=True)
    return render(request, 'admin_area/index.html', {'leaderboards_info': leaderboards_info})
# def updatePoints(request,operator):
#     if(operator == '+'):
#         leaderboards_ref = db.collection('leaderboards')
