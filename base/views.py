from django.shortcuts import render,redirect
from django.contrib import messages
import pickle
import random
# Create your views here.

def home(request): 
    return render(request, 'base/home.html', {})

# def getPrediction(sentiment):
#     model = pickle.load(open('ml_model.sav','rb')) 
#     vectorizer = pickle.load(open('vectorizer.sav','rb')) 
#     prediction= model.predict(vectorizer.transform([[sentiment]]))
#     if prediction == 1:
#         result='Good'
#     elif prediction == 0:
#         result='Bad'
#     else:
#         result='Error'
#     return result


def cloudburstForm(request):
    min_temp = request.GET.get('mintemp')
    max_temp = request.GET.get('maxtemp')
    rainfall = request.GET.get('rainfall')
    windgust_direction = request.GET.get('windGustDirection')
    windgust_speed = request.GET.get('windGustSpeed')
    humidity = request.GET.get('humidity')
    pressure = request.GET.get('pressure')
    cloud = request.GET.get('cloud')
    temperature = request.GET.get('temperature')
    arr = [min_temp, max_temp, rainfall, windgust_direction]
    context = {}
    print(arr)
    print("kf inawerhjfiowjfawvenq iefgwaovfoi h")
    return render(request, 'base/cloudburst-form.html',context)

    
def resultPage(request):
    result = request.GET.get('mintemp')
    result1 = random.uniform(25, 80)
    result1 = round(result1, 2)

    context = {
        'result' : result,
        'result1' : result1
    }
    return render(request,'base/result.html', context )