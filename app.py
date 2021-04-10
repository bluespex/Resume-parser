import os
import sys
from flask import Flask, render_template, request, abort
from werkzeug.utils import secure_filename
import resumeParse
import utils
from flask_cors import CORS
import requests
upload_path = utils.prajjwal

UPLOAD_FOLDER = upload_path
ALLOWED_EXTENSIONS = {'txt', 'pdf', 'png', 'jpg', 'jpeg', 'gif'}

app = Flask(__name__)
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
CORS(app)

# @app.route('/')
# def home():
#     return render_template('index.html')


@app.route('/uploader', methods=['GET', 'POST'])
def upload_file():
    if request.method == 'POST':
        f = request.json
        print(f['url'], file=sys.stderr)
        response = requests.get(f['url'])
        # print(response.headers['content-type'], file= sys.stderr)
        s = response.headers['content-type']
        rex = s.split('/')[1]
        # print(rex, file=sys.stderr)
        file = open("sampleResumes/sample_image."+rex, "wb")
        file.write(response.content)
        filename = "sample_image."+rex
        filename1 = "sampleResumes/sample_image."+rex
        userData = resumeParse.fun(os.path.join(
            app.config['UPLOAD_FOLDER'], filename))
        os.remove(filename1)
        print(userData)
        return userData


if __name__ == '__main__':
    app.run(debug=True)
