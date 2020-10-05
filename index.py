import os
import resumeParse
import utils

upload_path = utils.piyush


resumes = []

for resume in os.listdir("./sampleResumes"):
    resumes.append(upload_path + '/' + resume)


for i in resumes:
    print(resumeParse.fun(i))