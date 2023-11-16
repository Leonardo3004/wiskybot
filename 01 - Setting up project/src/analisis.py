
import firebase_admin
from firebase_admin import db, credentials


cred = credentials.Certificate("credentials.json")
firebase_admin.initialize_app(cred, {"databaseURL": "https://students-emotions-default-rtdb.firebaseio.com"})

ref = db.reference('/')
data = ref.get()

suma_angry = 0
suma_happy = 0
suma_neutral = 0
suma_disgust = 0
suma_fear = 0
cantidad_registros = 0

#Iterar a través de las fechas y registros de emociones
print(data)
for registros in data.values():#itera las fechas
    
    for registro in registros:#itera por cada emocion de la fecha
        if(len(registro) >1 ):
            suma_angry += registro.get("angry", 0)
            suma_happy += registro.get("happy", 0)
            suma_neutral += registro.get("neutral", 0)
            suma_disgust += registro.get("disgust", 0)
            suma_fear += registro.get("fear", 0)
            cantidad_registros += 1

if cantidad_registros > 0:
    promedio_angry = suma_angry / cantidad_registros
    promedio_happy = suma_happy / cantidad_registros
    promedio_neutral = suma_neutral / cantidad_registros
    promedio_disgust = suma_disgust / cantidad_registros
    promedio_fear = suma_fear / cantidad_registros
    masGrande=max(promedio_angry,promedio_happy, promedio_neutral, promedio_disgust, promedio_fear)
    mi_diccionario = {'Enojado': promedio_angry, 'Contento': promedio_happy, 'Neutral': promedio_neutral, 'Disconforme': promedio_disgust, 'Miedo':promedio_fear}
    
    clave_maxima = max(mi_diccionario, key=lambda k: mi_diccionario[k])
    print("La clave con el valor máximo es:", clave_maxima)

    try:
        with open('example.txt', 'w') as file:
            file.write(f"El promedio de estudiantes 'enojados' es de': {round(promedio_angry, 3)}%.\n")
            file.write(f"El promedio de estudiantes 'contentos' es de: {round(promedio_happy,3)}%.\n")
            file.write(f"El promedio de estudiantes 'neutrales' es de: {round(promedio_neutral,3)}%.\n")
            file.write(f"El promedio de estudiantes 'disconformes' es de: {round(promedio_disgust,3)}%.\n")
            file.write(f"El promedio de estudiantes 'con miedo' es de: {round(promedio_fear,3)}%.\n")
            file.write(f"La emocion mas predominante es '{clave_maxima}': {round(masGrande, 3)}%.\n")

    except IOError as e:
        print(f"An error occurred: {e}")
else:
    try:
        with open('example.txt', 'w') as file:
            file.write("No se encontraron registros en la base de datos.")
    except IOError as e:
        print(f"An error occurred: {e}")

