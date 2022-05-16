FHIR (pronounced "fire") is a standard for health care data exchange. FHIR Implementation Guides (IGs) are "a set of rules of how a particular interoperability or standards problem is solved".[^ig]

[^ig]: https://www.hl7.org/fhir/implementationguide.html

This course is a comprehensive overview of IG authoring for those interested in creating FHIR IGs using [FHIR Shorthand](https://fshschool.org), also known as "FSH" (pronounced "fish").

### Learning objectives

1. Become familiar with the FHIR specification, and commonly used FHIR resources and element types.
2. Learn the recommended process for successfully planning a new IG
3. Gain proficiency with the FHIR Shorthand ecosystem of tools (FSH, GoFSH, SUSHI)
4. Learn how to create the common components of an IG, including FHIR profiles, code systems, and value sets
5. Learn about key FHIR profiling concepts including value set binding, cardinality, MustSupport, slicing, and extensions
6. Awareness of common clinical code systems including LOINC, SNOMED, ICD10, and code systems in the HL7 terminology list

### Course format

This course is provided in both written narrative and video form. The video version is split up to match the sections in the written version.

_Video version will be available soon. Watch [Zulip](https://chat.fhir.org/#narrow/stream/322131-fsh-courses) for the announcement of when it's available._

<!--
To access the video version, look for buttons like the one below at the top of a section. The same content is covered in both the written narrative and video versions.

You can try clicking this button to see a test video (🔊 speakers on):
-->

{% include video_embed.html video="test" %}



### Prerequisites

The course content assumes basic familiarity with FHIR -- if you haven't worked with FHIR before in any capacity, see the [FHIR Resources page](fhir-resources.html) for some general introductory information.

No experience with reading FHIR IGs, or with FHIR IG authoring/profiling is necessary. These topics are covered in [Part 1](01-reading-an-ig.html) and [2](02-creating-an-ig.html), respectively. Readers who are already familiar with FHIR IG authoring should still review [Part 2](02-creating-an-ig.html) as this describes the technical setup process for using the FSH tools.

### Recommended schedule

We recommend completing the course materials over two days as described below.

<table class="table table-bordered">
<thead>
<tr style="background-color: #f9f9f9;">
    <th>#</th>
    <th>Part name</th>
    <th>Description</th>
    <th>Duration</th>
</tr>
</thead>

<tbody>
    <tr style="background-color: #453d83; color: white;">
        <td colspan="4"><strong>Before Starting</strong></td>
    </tr>

    <tr>
        <td>&nbsp;</td>
        <td>Setup</td>
        <td>
            <ol>
                <li>Complete the <a href="setup.html">setup instructions</a></li>
            </ol>
        </td>
        <td>~1 hour; help available on <a href="https://chat.fhir.org/#narrow/stream/322131-fsh-courses">chat.fhir.org</a> (live support May 24-25 9am-5pm Eastern)</td>
    </tr>

    <tr style="background-color: #453d83; color: white;">
        <td colspan="4"><strong>Day 1</strong></td>
    </tr>

    <tr>
        <td>1</td>
        <td><a href="01-reading-an-ig.html">Reading an IG</a></td>
        <td>
            <ol>
                <li>What's the purpose of an IG?</li>
                <li>What are the common components of an IG?</li>
                <li>How to approach reading an unfamiliar IG</li>
                <li>Review of the <a href="http://hl7.org/fhir/uv/shc-vaccination/2021Sep/">SMART Health Cards: Vaccination &amp; Testing</a> IG</li>
            </ol>
        </td>
        <td>~1 hour</td>
    </tr>
    <tr>
        <td>2</td>
        <td><a href="02-creating-an-ig.html">Creating an IG</a></td>
        <td>
            <ol>
                <li>Overview of the recommended process for creating a new IG</li>
                <li>Identify persona, use cases and key profiles needed</li>
                <li>Creating a conceptual model for one of the profiles</li>
                <li>Starting a new IG with SUSHI</li>
                <li>Creating a profile with FSH</li>
                <li>Creating a value set with FSH</li>
                <li>Creating an example with FSH</li>
                <li>Running the IG publisher</li>
            </ol>
        </td>
        <td>~2 hours</td>
    </tr>

    <tr style="background-color: #453d83; color: white;">
        <td colspan="4"><strong>Day 2</strong></td>
    </tr>

    <tr>
        <td>3</td>
        <td><a href="03-exercise.html">Hands-on profiling exercise</a></td>
        <td>
            <ol>
                <li>Implement a profile in FSH based on provided use case</li>
                <li>Build the IG locally</li>
            </ol>
        </td>
        <td>1-2 hours</td>
    </tr>

    <tr>
        <td>4</td>
        <td><a href="04-deep-dive-with-fsh.html">Deep Dive With FSH</a></td>
        <td>
            <ol>
                <li>TBD, but likely: slicing, extensions, invariants, CapabilityStatements and SearchParams</li>
            </ol>
        </td>
        <td>2-3 hours</td>
    </tr>

</tbody>
</table>

### Authors

- Max Masnick (MITRE)
- Chris Moesel (MITRE)
- May Terry (MITRE)

If you have questions or comments, please contact us on <a href="https://chat.fhir.org/#narrow/stream/322131-fsh-courses">chat.fhir.org</a>.

MITRE: Approved for Public Release. Distribution Unlimited. Case Number 19-3439.

<script>
    // Get rid of "Computable Name:" at top of index.html
    [...document.querySelectorAll("*")].filter(e => e.childNodes && [...e.childNodes].find(n => n.nodeValue?.match("Computable Name")))[0].parentNode.parentNode.parentNode.parentNode.remove();
</script>