import os
from flask import Flask, render_template, request
from werkzeug.utils import secure_filename
import resumeParse
import utils
app = Flask(__name__)

upload_path = utils.prajjwal

UPLOAD_FOLDER = upload_path
ALLOWED_EXTENSIONS = {'txt', 'pdf'}

app = Flask(__name__)
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

@app.route('/')
def home():
   return render_template('index.html')

@app.route('/uploader', methods = ['GET', 'POST'])
def upload_file():
   if request.method == 'POST':
      f = request.files['file']
      filename = secure_filename(f.filename)
      f.save(os.path.join(app.config['UPLOAD_FOLDER'], filename))
      return resumeParse.fun(upload_path + '/' + filename)
		
if __name__ == '__main__':
   app.run(debug = True)
