import firebase_admin
from firebase_admin import credentials
from firebase_admin import firestore
config = {
    'apiKey': "AIzaSyCMWY1g-tNFFUegdSgqauW3Yokf_3pAaOI",
    'authDomain': "ggpl-e219f.firebaseapp.com",
    'databaseURL': "https://ggpl-e219f-default-rtdb.asia-southeast1.firebasedatabase.app",
    'projectId': "ggpl-e219f",
    'storageBucket': "ggpl-e219f.appspot.com",
    'messagingSenderId': "1008042192809",
    'appId': "1:1008042192809:web:c1a3d0071991bda1e09eb8",
}

cred = credentials.Certificate(
    './ggpl-e219f-firebase-adminsdk-lhtu4-e23b29607e.json')
firebase_admin.initialize_app(cred)

db = firestore.client()
