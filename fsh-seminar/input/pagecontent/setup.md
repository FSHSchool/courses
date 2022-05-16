### FHIR Background

- [45 minute FHIR introduction video](https://www.youtube.com/watch?v=rJ_VEKiR55I) -- please consider viewing before the course begins

### Local environment

As part of this course, you will edit and build a FHIR Implementation Guide on your computer. To do this, you will need the following:

1. Install [Visual Studio Code](https://code.visualstudio.com) and the [FSH language extension](https://marketplace.visualstudio.com/items?itemName=kmahalingam.vscode-language-fsh)
2. Install a Java runtime
3. Install [rbenv](https://github.com/rbenv/rbenv) and Ruby >=v2.4, then set your global Ruby to this version and run `gem install jekyll`
4. Install SUSHI using [these directions](https://fshschool.org/docs/sushi/installation/)
5. Download the syllabus IG from `https://github.com/FSHSchool/courses-fsh-seminar-exercise/archive/refs/heads/main.zip` (or `git clone https://github.com/FSHSchool/courses-fsh-seminar-exercise.git`)
6. Download the latest `publisher.jar` release from <https://github.com/HL7/fhir-ig-publisher/releases> into your `courses-fsh-seminar-exercise-main/input-cache/` folder.
7. Run `./_genonce.sh` (Mac/Linux) or `_genonce.bat` (Windows)
8. Open `courses-fsh-seminar-exercise-main/output/index.html`. If you do not see the course syllabus, something didn't work and you should ask for help.

### JSON background

You should be able to read JSON and have a general understanding of its syntax. If you have not worked with it before, please read through these resources:

- [A Non-Programmer's Introduction to JSON](https://blog.scottlowe.org/2013/11/08/a-non-programmers-introduction-to-json/)
- [JSON Basics: What You Need to Know](https://www.elated.com/json-basics/)