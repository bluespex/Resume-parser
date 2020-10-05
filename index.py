import os
import resumeParse


resumes = []

for resume in os.listdir("./sampleResumes"):
    resumes.append("C:/Users/piyush/Desktop/resume-parser/sampleResumes/" + resume)


for i in resumes:
    print(resumeParse.fun(i))