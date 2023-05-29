from flask import Flask, render_template, request, send_file
from PIL import Image
import io

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/result', methods=['POST'])
def result():
    # Получение загруженного изображения
    uploaded_file = request.files['image']
    image = Image.open(uploaded_file)

    # Изменение яркости/контрастности
    brightness = float(request.form['brightness'])
    contrast = float(request.form['contrast'])
    image = image.point(lambda p: p * brightness)

    # Изменение контрастности
    image = image.point(lambda p: (p - 128) * contrast + 128)

    # Сохранение измененного изображения
    output = io.BytesIO()
    image.save(output, format='JPEG')
    output.seek(0)

    return send_file(output, mimetype='image/jpeg')

if __name__ == '__main__':
    app.run()
