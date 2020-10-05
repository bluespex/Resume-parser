import os
import resumeParse


resumes = []

for resume in os.listdir("./sampleResumes"):
    resumes.append("D:/SYSTEM DATA/Desktop/Resume-Parser/sampleResumes/" + resume)


for i in resumes:
    print(resumeParse.fun(i))