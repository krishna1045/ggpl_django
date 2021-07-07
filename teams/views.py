from django.shortcuts import render
from firebaseConfig import db
import operator
# Create your views here.


def teams(request):
    teams = team_request()
    return render(request, 'teams/index.html', {"teams": teams})


def team_request():
    teams_ref = db.collection('teams').stream()
    teams = []
    for doc in teams_ref:
        teams.append(doc.to_dict())
    print(teams)
    teams.sort(key=operator.itemgetter('name'))
    return teams
