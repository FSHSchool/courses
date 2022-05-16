### Purpose

The goal of this hands-on exercise is to provide experience working with the concepts and tools described in [Part 1](01-reading-an-ig.html) and [Part 2](02-creating-an-ig.html).

### Premise

As a FHIR implementation modeler, author a FHIR Implementation Guide (IG) based on [FHIR 4.0.1](http://hl7.org/fhir) for the fictitious use case scenario [described in Part 2](http://localhost:4321/fshschool-ig-authoring/02-creating-an-ig.html#how-do-you-create-an-ig%E2%8F%AF-video-versionto-view-this-v), and reproduced below for convenience:

<div class="alert alert-success" role="alert" markdown="1">
**Hypothetical problem:**

> The Obstructive Sleep Apnea Association (OSAA - a fictitious clinical organization based in the U.S.) is looking to evaluate the impact of obesity as a risk > for Obstructive Sleep Apnea (OSA). OSAA needs a way to ensure the relevant clinical data are collected in a standard, interoperable format from participating member sites.

**Participants:**

- OSAA
- Participating study sites

For the purposes of this course, we will assume the content of this IG is limited to Domain of Knowledge (i.e., the API for data exchange is out of scope).

**Use case**

The use case for this work is as follows:

> OSAA has setup a small registry to collect EHR clinical data from healthcare organizations participating in this evaluation.
> 
> OSAA sites will submit the following **required** data to the central OSAA registry:
>
> - Patient name, age, birth place
> - Patient's managing practitioner name, and the practitioner(s) NPI identifier(s)
> - A diagnosis of OSA, identified by one of the following ICD-10-CM codes:
>   1. `G47.33` Obstructive sleep apnea (adult) (pediatric)
>   1. `G47.30` Sleep apnea, unspecified
> - Patient's body mass index (BMI)
>   - BMI calculated value
>   - Date when calculated
>   - The provider who performed the BMI calculation
> 
> Additionally, all participating sites may **optionally** submit:
> 
> - Date of OSA diagnosis
> - Patient age at time of OSA diagnosis
</div>


### Tasks

1. Add remaining FHIR profiles based on the [Resources Model from Part 2](02-creating-an-ig.html#mapping-high-level-information-model-to-fhir-resources), aligning with with [FHIR U.S. Core 3.2](http://hl7.org/fhir/us/core/2021Jan/) profiles where possible:
    1. Practitioner profile (`OSAPractitioner`) ([solution](02-creating-an-ig.html#profile-practitioner))
    2. OSA Condition profile (`OSACondition`) ([solution](02-creating-an-ig.html#profile-condition))
2. Create an example of `OSAPractitioner` (solution at bottom of [this section of Part 2](02-creating-an-ig.html#creating-examples))
3. Edit the home page of the IG to answer the following question:

    > Were there any FHIR limitations in what is needed to create a representative model that addresses this use case? If yes, what were they and what changes or workarounds would you propose?

4. Successfully build your IG locally with `_genonce` and attempt to resolve any errors on the `output/qa.html` page.


### Additional notes

- **Don't overthink or expand the scope of the clinical use case.** Just focus on the representation of clinical data requirements within the FHIR resource model with the information that is given.
- Assume that the data exchange is secure so PHI and PII in FHIR instances will not be an issue.
- There is no single answer. There could however be more optimal ways to represent models.

### Helpful tips, tools, and references

- Check the QA report (`output/qa.html`) as you build the IG with `_genonce` to identify any FHIR validation issues that aren't caught by SUSHI.
- If you just want to quickly test how to represent and validate a contained construct in FSH without having to run the IG publisher, try it using [FSHOnline](https://fshschool.org/FSHOnline/#/)
- Want to see more FSH examples? Go to [FSHOnline](https://fshschool.org/FSHOnline/#/) and click on the "FSH Examples".
- Want to see how another IG's StructureDefinitions in JSON could be represented in FSH? Also try it using [FSHOnline](https://fshschool.org/FSHOnline/#/). Cut and paste your JSON into the right column and click on _Convert to FSH_ to see the syntax.
- Try using some of the nice perks in the [vscode-language-fsh](https://marketplace.visualstudio.com/items?itemName=kmahalingam.vscode-language-fsh) extension to help navigate references between your authored FHIR constructs (profiles, value sets, extensions, etc.)
- Other neat VSCode extensions to help create a more authoring-friendly VSCode environment:
    - [Markdown Preview Github Styling](https://marketplace.visualstudio.com/items?itemName=bierner.markdown-preview-github-styles) - provides a basic dynamic rendering of your markdown page while you type (but note that embedded images won't be rendered in the preview due to the directory structure).
    - [Draw.io integration](https://marketplace.visualstudio.com/items?itemName=hediet.vscode-drawio) - integrates Draw.io/diagrams.net into VSCode so that you can create nice diagrams directly inside your IG authoring environment
- [This Markdown guide](https://commonmark.org/help/) may be helpful if you're new to Markdown.


### Solution

In addition to the elements of the solution embedded in Part 2, the full solution hidden below (<a role="button" data-toggle="collapse" href="#solution-hidden" aria-expanded="false" aria-controls="solution-hidden">show solution</a>).
<div class="collapse" id="solution-hidden" markdown="1">

**Structural mapping**



|    Profile Name    |         FHIR element name / Path         |        Use Case Data Element        |                           Comments                          |
|--------------------|------------------------------------------|-------------------------------------|-------------------------------------------------------------|
| `OSAPatient`       | `Patient.name`                           | Patient name                        |                                                             |
| `OSAPatient`       | `Patient.birthDate`                      | Patient birth date                  |                                                             |
| `OSAPatient`       | `Patient.generalPractitioner`            | Patient's primary care provider     |                                                             |
| `OSAPatient`       | `Patient.extension.patient-birthPlace`   | Patient's birth place               | Found FHIR standard extension, [patient-birthPlace]         |
| `OSAPractitioner`  | `Practitioner.name`                      | Practitioner name                   |                                                             |
| `OSAPractitioner`  | `Practitioner.identifier.type`           | Practitioner NPI                    | Fix identifier type = NPI                                   |
| `OSACondition`     | `Condition.code`                         | OSA diagnosis code                  | Fix to `OSADiagnosisVS` containing provided ICD-10-CM codes |
| `OSACondition`     | `Condition.extension[AgeAtOSADiagnosis]` | OSA onset date                      |                                                             |
| `OSACondition`     | `Condition.asserter`                     | managing provider who diagnosed OSA |                                                             |
| `OSABodyMassIndex` | `Observation.code`                       | Body Mass Index (BMI)               | Fix code to `39156-5 "Body mass index (BMI)"`               |
| `OSABodyMassIndex` | `Observation.effectiveDateTime`          | Body Mass Index (BMI)               |                                                             |
| `OSABodyMassIndex` | `Observation.valueQuantity`              | BMI measurement                     | BMI Measurement                                             |
{: .grid }


**Completed IG**

[Available here](https://github.com/FSHSchool/courses-fsh-seminar-exercise/tree/solution).

</div>
