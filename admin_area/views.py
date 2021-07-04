from django.shortcuts import render

# Create your views here.


def admin_area(request):
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
    return render(request, 'admin_area/index.html', {'leaderboards_info': leaderboards_info})
