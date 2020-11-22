import os
import resumeParse
import utils

upload_path = utils.prajjwal


resumes = []

for resume in os.listdir("./sampleResumes"):
    resumes.append(upload_path + '/' + resume)


for i in resumes:
    print(resumeParse.fun(i))