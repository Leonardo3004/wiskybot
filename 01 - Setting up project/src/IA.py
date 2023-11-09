import json

import firebase_admin
from firebase_admin import db, credentials
from datetime import datetime

import cv2

from fer import FER

import matplotlib.pyplot as plt

import matplotlib.image as mpimg

cred = credentials.Certificate("credentials.json")
firebase_admin.initialize_app(cred, {"databaseURL": "https://students-emotions-default-rtdb.firebaseio.com"})

now = datetime.now()
timestamp = now.strftime("%Y-%m-%d %H:%M:%S")

def emotionalRecognition():
    # Input Image
    input_image = cv2.imread("src\images\dashboard.png")
    emotion_detector = FER(mtcnn=True)

    # Save output in result variable

    dataList = emotion_detector.detect_emotions(input_image)
    # print(json.dumps(dataList))

    # Output image's information
    '''
    with open('src\images\emo.txt', 'w') as file:

        for data in dataList:
            file.write(str(data['emotions'])+'\n')
    '''
    lista=[]
    for emociones in dataList:
        lista.append(emociones['emotions'])

    data={ 
        timestamp:lista
    }
    ref = db.reference('/')
    ref.update(data)


    for i in range(len(dataList)):
        bounding_box = dataList[i]["box"]
        emotions = dataList[i]["emotions"]
        cv2.rectangle(input_image, (
            bounding_box[0], bounding_box[1]), (
                          bounding_box[0] + bounding_box[2], bounding_box[1] + bounding_box[3]),
                      (0, 155, 255), 2, )

    '''
    emotion_name, score = emotion_detector.top_emotion(input_image)
    for index, (emotion_name, score) in enumerate(emotions.items()):
        color = (211, 211, 211) if score < 0.01 else (255, 0, 0)
        emotion_score = "{}: {}".format(emotion_name, "{:.2f}".format(score))

        cv2.putText(input_image, emotion_score,
                    (bounding_box[0], bounding_box[1] + bounding_box[3] + 30 + index * 15),
                    cv2.FONT_HERSHEY_SIMPLEX, 0.5, color, 1, cv2.LINE_AA, )
    '''
    # Save the result in new image file
    output_image_path = "src\images\emotion.jpg"
    cv2.imwrite(output_image_path, input_image)

    result_image = mpimg.imread(output_image_path)
    imgplot = plt.imshow(result_image)

    # Display Output Image
    
    #plt.show()

# Press the green button in the gutter to run the script.
if __name__ == '__main__':
    emotionalRecognition()