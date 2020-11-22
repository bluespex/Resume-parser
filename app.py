import os
import sys
from flask import Flask, render_template, request, abort
from werkzeug.utils import secure_filename
import resumeParse
import utils
<<<<<<< HEAD
app = Flask(__name__)

upload_path = utils.piyush
=======
from flask_cors import CORS
import requests
upload_path = utils.prajjwal
>>>>>>> 97e5cd5bae866f63a9e78b032010caecdf1c0ff2

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
        # f = request.files['file']
        # if f.filename == '':
        #     return {
        #         "error": "submit a document damnit"
        #     }

        # filename = secure_filename(f.filename)
        # f.save(os.path.join(app.config['UPLOAD_FOLDER'], filename))
        # return resumeParse.fun(upload_path + '/' + filename)
        f = request.json
        print (f['url'], file=sys.stderr)
        response = requests.get(f['url'])
        # print(response.headers['content-type'], file= sys.stderr)
        s=response.headers['content-type']
        rex=s.split('/')[1]
        # print(rex, file=sys.stderr)
        file = open("sampleResumes/sample_image."+rex, "wb")
        file.write(response.content)
        filename="sample_image."+rex
        filename1="sampleResumes/sample_image."+rex
        userData = resumeParse.fun(os.path.join(app.config['UPLOAD_FOLDER'], filename))
        os.remove(filename1)
        return userData


if __name__ == '__main__':
    app.run(debug=True)
