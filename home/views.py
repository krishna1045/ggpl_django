from django.shortcuts import render

# Create your views here.


def home(request):
    leaderboards_info = [
        {
            'name': 'Mano',
            'score': 16
        },
        {
            'name': 'Krishna',
            'score': 16
        },
        {
            'name': 'Mithilesh',
            'score': 16
        },
    ]
    current_predictions = [
        {
            'name': 'Mano ',
            'batsman': 'Faf',
            'bowler': 'Bumrah',
            'pp1': 40,
            'pp2': 40,
            'score': 240,
            'win': 'CSK'
        },
        {
            'name': 'Krishna',
            'batsman': 'Faf',
            'bowler': 'Bumrah',
            'pp1': 40,
            'pp2': 40,
            'score': 240,
            'win': 'MI'
        },
        {
            'name': 'Mithilesh',
            'batsman': 'Faf',
            'bowler': 'Bumrah',
            'pp1': 40,
            'pp2': 40,
            'score': 240,
            'win': 'CSK'
        },
    ]
    return render(request, 'home/index.html', {'current_predictions': current_predictions, 'leaderboards_info': leaderboards_info})
