### FHIR Background

- [35 minute FHIR introduction video](https://youtu.be/Dz3HOaf6e-0) -- please consider viewing before the course begins

### Local environment

As part of this course, you will edit and build a FHIR Implementation Guide on your computer. To do this, you will need the following:

1. Install [Visual Studio Code](https://code.visualstudio.com) and the [FSH language extension](https://marketplace.visualstudio.com/items?itemName=FHIR-Shorthand.vscode-fsh)
2. Install a Java runtime
3. Install Ruby and Jekyll using [these OS-specific instructions](https://jekyllrb.com/docs/installation/#guides)
4. Install SUSHI using [these directions](https://fshschool.org/docs/sushi/installation/)
5. Download the syllabus IG from `https://github.com/FSHSchool/courses-fsh-seminar-exercise/archive/refs/heads/main.zip` and unzip it, or `git clone https://github.com/FSHSchool/courses-fsh-seminar-exercise.git`
    - The IG folder will be `courses-fsh-seminar-exercise-main/` if you used the `.zip` download, or `courses-fsh-seminar-exercise/` if you used `git clone`.
6. Open a Terminal/Command Prompt window inside the IG folder, and run `./_build.sh update` (Mac/Linux) or `_build.bat update` (Windows) from the command line, answering `Y` to each of the prompts
    - This will automatically download the latest `publisher.jar` release from <https://github.com/HL7/fhir-ig-publisher/releases> and put it in the `input-cache/` folder inside the IG folder
7. Run `./_build.sh build` (Mac/Linux) or `_build.bat build` (Windows)
8. Open `output/index.html` from inside your IG folder. You should see a mostly-empty IG home page that says "FSHSeminarExercise" on it.

### JSON background

You should be able to read JSON and have a general understanding of its syntax. If you have not worked with it before, please read through these resources:

- [A Non-Programmer's Introduction to JSON](https://blog.scottlowe.org/2013/11/08/a-non-programmers-introduction-to-json/)
- [JSON Basics: What You Need to Know](https://www.elated.com/json-basics/)