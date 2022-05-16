The goal of this module is to describe why you might want to create a FHIR IG, what a FHIR IG is, and how to read one. To do this, we will cover some foundational concepts in the abstract, and then see how these concepts are implemented in a completed IG.

<h3>Why author a FHIR IG? {% include video_embed.html video="1.1" %}</h3>

The base FHIR specification is purposefully incomplete. While it defines the critical, generalizable elements needed for a FHIR implementation, such as the syntax and the base FHIR resources, it leaves the use case-specific implementation details undefined.

<p>
<img src="pie.svg" alt="Pie chart showing what is and isn't covered by the base FHIR specification." class="figure">
</p>

FHIR Implementation Guides (IGs) fill in these gaps in different ways depending on the specific needs.

[Grahame Grieve](http://www.healthintersections.com.au/?page_id=2), the [FHIR Product Director](https://confluence.hl7.org/display/FHIR/FHIR+Product+Director+Page), breaks down the purpose of FHIR IGs into four broad categories in [this presentation](https://youtu.be/_byBTlasS2w?t=950):

1. **National Base IGs**

    Doesn't describe a full implementation; instead, describes how regulations for a national health infrastructure apply in the context of FHIR. Typically this involves the code systems, identifiers, and extensions necessary for regulation (e.g., [race](https://hl7.org/fhir/us/core/StructureDefinition-us-core-race.html) and [ethnicity](https://hl7.org/fhir/us/core/StructureDefinition-us-core-ethnicity.html) in the US; or [Australian indigenous status](http://hl7.org.au/fhir/StructureDefinition-indigenous-status.html)) specific to the jurisdiction in question.

    (Typically these should not contain constraints like [requiring presence of a specific element](https://www.hl7.org/fhir/conformance-rules.html#cardinality) or [MustSupport](https://www.hl7.org/fhir/conformance-rules.html#mustSupport), which are more suitable for IGs satisfying one of the other purposes below.)

    Examples: [US Core](https://www.hl7.org/fhir/us/core/), [AU Base](http://hl7.org.au/fhir/)

2. **Domain of Knowledge IGs**

    Describes how to represent a clinical or business concept, without defining an API for exchanging these data.

    Example: [International Patient Summary](https://hl7.org/fhir/uv/ips/), [mCODE](https://github.com/HL7/fhir-mCODE-ig)

3. **Community of Implementation**

    An agreement on how data are exchanged by a group of actors (i.e., contains an API).

    Example: [mCODE](https://github.com/HL7/fhir-mCODE-ig), [US Core](https://www.hl7.org/fhir/us/core/)

4. **Product IGs**

    Documents what a specific piece of software does in the FHIR ecosystem. These are not published by HL7, but may be published by vendors to document their own software. Often are not public.

Some IGs fulfill multiple purposes, which is generally ok as long as the implications are considered carefully. For example, in the case of National Base IGs, a multi-purpose may be problematic: for example, in US Core, implementers may want to inherit the National Base IG content and not the Community of Implementation content, the latter of which includes US Core's cardinality/MustSupport constraints.

The content in this course is to some degree focused around the reading and writing of **Domain of Knowledge IGs**, and to a lesser extent **Community of Implementation**[^community-of-implementation], though many parts of the course are applicable to all.

[^community-of-implementation]: We do not spend much time on the portion of FHIR IGs related to [APIs](https://en.wikipedia.org/wiki/API), which are typically targeted at software engineers.

<h3>What is a FHIR IG? {% include video_embed.html video="1.2" %}</h3>

Now that we have established the broad purpose for creating a FHIR IG, we will more formally define the contents of an IG.

In short, FHIR Implementation Guides (IGs) are:

> A set of rules of how a particular interoperability or standards problem is solved [^fhir-ig]

[^fhir-ig]: <https://www.hl7.org/fhir/implementationguide.html>

To define these rules, IGs include:

1. Computable rules
1. Human-readable versions of the computable rules
1. Additional narrative descriptions of the rules, and additional information about the problem the IG is trying to solve

The high-level goal of an IG is to provide sufficiently detailed instructions to implementers so that they can independently set up systems that will be able to successfully communicate with each other.

To meet this goal, the computable rules are often insufficient. IGs usually include a *significant* amount of narrative content to supplement the computable rules, which may describe:

1. The primary use cases that are in the scope of the IG
1. The actors, and how the actors are expected to interact
1. How the components of the IG can be used together to meet the needs of these actors for these use cases
1. Conformance criteria that are not able to be represented in the computable portion of the IG

#### Conformance

Implementations are said to conform to an IG if they abide by both the computable and narrative rules in the IG.

The computable portions of an IG can be used for automated testing for conformance. For example:

- Individual FHIR resource instances can be [validated](http://hl7.org/fhir/R4/validation.html) against a specific IG using [the FHIR validator application](https://confluence.hl7.org/display/FHIR/Using+the+FHIR+Validator)
- Automated tests can be created based on an IG to assess conformance of a system.

Narrative conformance criteria typically use [RFC 2119](https://datatracker.ietf.org/doc/html/rfc2119) key words in all-caps like MUST, SHOULD, and MAY. This signals to implementers which specific parts of the narrative should be treated as conformance criteria. Because narrative conformance criteria can't usually be assessed algorithmically, the IG authors must take care to make sure the narrative content clearly provides the necessary information to implementers.

#### Reading an IG

1. First, start by reading the **narrative content**.

    Start by reading the narrative on the home page. If other narrative pages are prominently mentioned or linked to from the home page, read them as well.

1. Then, examine the **computable content**.

    Several different types of computable content are contained within a typical IG (these are described below). Where you start depends on your goal.

    For example, if you are interested in gaining a general understanding of an IG, you may want to review all the computable content superficially (which can be done by clicking each link on the `artifacts.html` page of the IG).

    Alternatively, you may be interested in an implementation for a specific actor or use case. In this case, the IG will hopefully provide some guidance on which resources are most important. If not, for content-related use cases, `Profiles` are likely the best entry point to the computable content. For API-driven use cases, `CapabilityStatements` are a logical starting point.

The next few sections will provide an overview of common types of computable artifacts.

<h3>Common Computable Artifacts: Profiles {% include video_embed.html video="1.3" %}</h3>

The goal of a [FHIR profile](https://www.hl7.org/fhir/profiling.html) is to take one of the [base FHIR resources](https://www.hl7.org/fhir/resourcelist.html) and add computable rules on top of it. These rules come in two flavors:

1. Constraints that apply to an entire element, such as how many times a given element can appear or which terminology to use for a code
1. Constraints that apply to specified splits or parts of an element[^extensions-slices]

[^extensions-slices]: These come in two flavors:  **slices** (constraints on the parts of an element can hold multiple values) and **extensions** (constraints on an `extension` or `modifierExtension` element, which counter-intuitively use constraints to extend functionality). We will cover these in more detail later in the course.

To make this more concrete, let's look at an example instance of a base FHIR resource -- in this case, [Patient](http://hl7.org/fhir/patient.html). This instance is the package of data a FHIR server might use to represent a specific patient. For example, if you wanted to retrieve the data for the patient with the medical record number `1032702`, you could query `https://hospital.example.org/fhir/Patient/1032702`. The response to this query would be the instance of the Patient resource describing this patient, which might look like this:

```javascript
{
  "resourceType": "Patient",                                                      // Resource identity and metadata
  "id": "PatientExample",
  "meta": {
    "profile": [
      "http://hl7.org/fhir/us/core/StructureDefinition/us-core-patient"
    ]
  },
  "extension": [                                                                  // Extension
    {
      "url": "http://hl7.org/fhir/us/core/StructureDefinition/us-core-birthsex",
      "valueCode": "F"
    }
  ],
  "identifier": [                                                                 // Standard data
    {
      "use": "usual",
      "type": {
        "coding": [
          {
            "code": "MR",
            "system": "http://terminology.hl7.org/CodeSystem/v2-0203",
            "display": "Medical Record Number"
          }
        ],
        "text": "Medical Record Number"
      },
      "system": "http://hospital.smarthealthit.org",
      "value": "1032702"
    }
  ],
  "active": true,
  "name": [
    {
      "family": "Shaw",
      "given": [
        "Amy",
        "V."
      ]
    }
  ],
  "telecom": [
    {
      "system": "phone",
      "value": "555-555-5555",
      "use": "home"
    },
    {
      "system": "email",
      "value": "amy.shaw@example.com"
    }
  ],
  "gender": "female",
  "birthDate": "1987-02-20",
  "address": [
    {
      "line": [
        "49 Meadow St",
        "Apartment B"
      ],
      "city": "Mounds",
      "state": "OK",
      "postalCode": "74047",
      "country": "US",
      "period": {
        "start": "2016-12-06",
        "end": "2020-07-22"
      }
    }
  ]
}
```

The fields under "Standard data" in the example above are often called "elements" in an instance of a FHIR resource, as are extensions and slices. For example, the element `gender` has the value `female` in the example above. Elements may be nested (like `address.city`, which has the value `Mounds`), have multiple values (like `address.line`), or refer to a specific code from a terminology (like `extension[us-core-birthsex].valueCode`).

When evaluating an instance for conformance, the computable rules specified in the base FHIR resource and any applicable profiles are applied across the elements in the instance. In this case, the instance _must_ conform to the rules specified in FHIR's specification for the Patient resource -- or it wouldn't be an instance of Patient at all.

Additionally, if a resource instance follows the rules defined by a FHIR profile (and any applicable general conformance criteria from the profile's IG), then the instance is said to "conform" to the profile. A single instance may even conform to multiple profiles simultaneously.[^meta-profile]

[^meta-profile]: Resource instances can actually specify which profiles they intend to conform to using the `meta.profile` metadata element. But instances may also unintentionally conform to _many_ profiles -- this is actually beneficial to interoperability as in some cases, a FHIR server's default response may already conform to a given profile if that profile is relatively unconstrained.

**A note on FHIR jargon.** The FHIR spec defines a number of [resources](https://www.hl7.org/fhir/resourcelist.html), which are information models that are the building blocks of FHIR implementations. FHIR servers create an *instance* of a given resource (i.e., an instance of the Patient resource representing a specific patient). It is this _instance_ that may conform to a given FHIR profile, not the resource itself. But in casual conversation, you may hear that "resource X conforms to profile Y" -- this really means "*resource instance* X conforms to profile Y", but saying "resource instance" is cumbersome.<br><br>You may also here "resource" used to refer to the FHIR specification's definition of a resource: e.g., "`name` is an element of the Patient resource" refers to the `name` element in [the FHIR spec's definition of the Patient resource](https://www.hl7.org/fhir/patient.html).
{: .alert.alert-info }

Each profile has its own page in an IG build, and this is where you can find the conformance rules specified by that profile. [Here's an example of a profile page in an IG](https://hl7.org/fhir/us/mcode/StructureDefinition-mcode-cancer-patient.html). The next part of the course will talk about how these pages are generated.

----

Below is an annotated screenshot showing some of the key components of profiles in an IG:

<p style="text-align: center;"><img src="profile_anatomy.png" alt="" class="img-responsive" style="filter: drop-shadow(0 0 0.5rem #666);max-width: 90%;margin: 0 auto 0 auto; float: inherit;"></p>

1. The **Content** tab is the entry point to the profile, and contains the majority of the key information you'll need to understand the profile.
2. The **Detailed Descriptions** tab lists all the information for each element in the resource being profiled.
3. The **Examples** tab lists example instances provided by the authors that conform to the profile.
4. The **XML**, **JSON**, and (optionally) **TTL** tabs show the computable version of the profile in the respective format. (TTL stands for [Turtle format](https://www.w3.org/TR/turtle/), which is not widely used.)
5. The **yellow box** at the top of the page indicates which version of the IG you are viewing. This is important so you can tell if you are on the most up-to-date published version of an IG -- sometimes Google searches or other links will land you on an old version.
6. This section contains **profile metadata** including the defining URL, computable `Name`, human-readable `Title`, and the narrative `Definition`.
7. Under the profile metadata is the **narrative** portion of the profile.
8. Finally, the **formal views of profile content** appears at the bottom of the page. This is the human-readable version of the computable version of the profile. We will discuss this in detail below.

----

#### Formal View of Profile Content Tabs

1. **Text Summary** provides a brief auto-generated narrative description of the profile.
1. **Differential Table** shows _only_ the rules added by this specific profile. In other words, it compares the Profile you are viewing to its parent (either a base FHIR resource or another profile).
1. **Snapshot Table** shows _all_ the rules contained in the profile, including rules inherited from its parents.
1. **Snapshot Table (Must Support)** is the subset of the elements on the previous tab with a `MustSupport` flag. This is described later.

Typically the **differential** ("diff") table tab is the best place to start when trying to understand what a rules a profile is setting. Here's the diff table from [the example of profile](https://hl7.org/fhir/us/mcode/StructureDefinition-mcode-cancer-patient.html#tabs-diff) linked above:

![Screenshot of diff table from the example profile](profile_diff.png){: .img-responsive }

This shows that this profile adds two constrains: the addition of `MustSupport` flags for the root `Patient` element (indicating that the entire profile is `MustSupport` to implementers ), and `Patient.deceased[x]`. The meaning of `MustSupport` and the full set of possible element-level constraints are discussed in the [next part of the course](02-creating-an-ig.html).

The **snapshot** table tab is typically the best way to see all elements that may/should/must be populated for an instance of a resource to conform. This table is too long in the example profile to reproduce as a screenshot, but you can [see it here](https://hl7.org/fhir/us/mcode/StructureDefinition-mcode-cancer-patient.html#tabs-snap).

The table tabs have a high amount of information density:

![Annotated screenshot of the snapshot table from the example profile](profile_snapshot_annotated.png){: .img-responsive}

The [next part of the course](02-creating-an-ig.html) will cover the constrains in the table tabs in more detail. In the meantime, you can click on the headings in the example profile to go to the relevant parts of the FHIR spec.

<h3>Common Computable Artifacts: Terminology {% include video_embed.html video="1.4" %}</h3>

FHIR IGs can define two terminology-related artifacts:

1. **[Code systems](https://www.hl7.org/fhir/codesystem.html)** define a universe of predefined codes that may be used to represent data. ICD-10 is one of the most well-known code systems, but there are _many_ others. If no existing code system meets a given use case, a custom one can be defined within an IG.[^custom-code-system]
2. **[Value sets](https://www.hl7.org/fhir/valueset.html)** define a subset of a code system that is relevant for a given element. There are two methods for defining value sets: intensionally or extensionally. Intensional value sets are algorithmically defined, while extensional value sets have an enumerated list of codes. These two methods can be combined or used separately.

[^custom-code-system]: Defining your own code system is generally only a good idea as a last resort. From the implementer's perspective, it is generally more burdensome to add support for a brand new code system vs. using a more common code system that might already be part of an implementation.

### Other Computable Artifacts

There are _many_ more artifacts that can be defined by IGs. These will be enumerated in [Part 4](04-deep-dive-with-fsh.html).

<h3>Reviewing an Example IG {% include video_embed.html video="1.6" %}</h3>

To see a practical application of the concepts discussed above, we will review portions of the [minimal Common Oncology Data Elements (mCODE) Implementation Guide](http://hl7.org/fhir/us/mcode/STU2/) (specifically the STU2 version), which is primarily a Domain of Knowledge IG but also has some Community of Implementation content:[^mcode-versions]

[^mcode-versions]: STU refers to Standard for Trial Use, which is a [HL7 ballot level](https://confluence.hl7.org/display/HL7/HL7+Balloting) indicating the maturity of the implementation guide. This is the most recent balloted version of mCODE as of writing. More information about the HL7 ballot process [can be found here](https://confluence.hl7.org/display/HL7/Jira+Ballot+Process).

- **[Home page](http://hl7.org/fhir/us/mcode/STU2/index.html)**: This is the entry point to the IG, and typically describes the background, scope, and general structure of the IG. Ideally the home page of an IG should be the single point of entry for all key content: by following links in the navigation bar or in the narrative of the home page, all the key IG content should be easily accessible.

    The IG home page should also help guide the reader through the key content within the IG. Some IGs do a better job of this than others, and if the authors' intent is not clear for a given IG you can fall back onto some standard navigation pages (discussed below).

    The key information on the mCODE home page is related to the Content by Group pages (see next bullet point), and the diagram showing the structure of mCODE STU2.

    mCODE's home page also links to some other key concepts and resources specific to this IG, including the Data Dictionary, development history, credits, and author contact information.

- **"Content by Group" pages**: [Section 1.2 of the home page](https://hl7.org/fhir/us/mcode/STU2/index.html#overview) links to the different groups of profiles and other artifacts in the IG. Not all IGs have this structure (and many IGs don't have as many artifacts as the mCODE IG, making this kind of structure is unnecessary).

    Following the pattern described above of reading prominently linked narrative content before diving into the individual IG artifacts, consider reviewing these pages next after finishing the content on the home page.

    Note that the Content by Group Pages are also linked second in the navigation bar, another indication of their level of importance.

- **Conformance pages**: These appear third in the navigation bar, and are custom-written narrative pages specifically for the mCODE IG, broken into four sections by topic.

    Reviewing the details of these is beyond the scope of this course, and not all IGs include this much information on conformance. However, one common item that you should be looking for is how the IG [defines MustSupport](https://hl7.org/fhir/us/mcode/stu2/conformance-profiles.html#must-implement-versus-must-support), as this is a key conformance concept and is [not defined in the base FHIR specification, but is instead left to profile authors to define](https://www.hl7.org/fhir/profiling.html#mustsupport)

- **FHIR Artifacts**: The fourth item in the navigation bar lists the various types of FHIR artifacts. These are custom pages made specifically for mCODE (except for "Complete Listing"; this is described below).

    Note that you likely have come across all the key artifacts as these are _also_ listed at the bottom of each "Content by Group" page.

- **Standard navigation pages**
    Every IG has an `artifacts.html` page, so if you find the IG's approach to organizing artifacts in the narrative confusing, you can always open that page to see a comprehensive list of all artifacts. [Here's that page for mCODE (found at `FHIR Artifacts > Complete Listing` in the nav bar)](https://hl7.org/fhir/us/mcode/STU2/artifacts.html).

    IGs also have a table of contents page (`toc.html`) that you can use to see a full list of all the web pages in the IG. [Here's that page for mCODE](https://hl7.org/fhir/us/mcode/STU2/toc.html).

Now that we (hopefully) understand the overall purpose of the IG and the general conformance criteria, let's look in detail at one of the key profiles in the IG: [Primary Cancer Condition](https://hl7.org/fhir/us/mcode/stu2/StructureDefinition-mcode-primary-cancer-condition.html).

- The [**Usage** and **Conformance** sections](https://hl7.org/fhir/us/mcode/stu2/StructureDefinition-mcode-primary-cancer-condition.html#usage) are additional narrative specific for this profile.
- We see in the Text Summary tab that the profile is based on [USCoreCondition](http://hl7.org/fhir/us/core/STU4/StructureDefinition-us-core-condition.html).
- The [Differential Table](https://hl7.org/fhir/us/mcode/stu2/StructureDefinition-mcode-primary-cancer-condition.html#tabs-diff) shows the addition of a number of constraints:
    1. MustSupport extensions: `Condition.extension:assertedDate` and `Condition.extension:histologyMorphologyBehavior`. Clicking the names in the diff table brings you to the [detailed definitions](https://hl7.org/fhir/us/mcode/stu2/StructureDefinition-mcode-primary-cancer-condition-definitions.html#Condition.extension:assertedDate), which provide additional information on these extensions. You may notice these are [slices](https://www.hl7.org/fhir/profiling.html#slicing) of `Condition.extension`, which is a topic we'll cover later in the course.
    2. An extensible value set binding of `Condition.code` to the [Primary Cancer Disorder Value Set](https://hl7.org/fhir/us/mcode/stu2/ValueSet-mcode-primary-cancer-disorder-vs.html). Clicking on [`extensible`](http://hl7.org/fhir/R4/terminologies.html#extensible) in the diff table gives you more information about what this binding strength means.
    3. A required binding of `Condition.bodySite` to [Body Location Qualifier Value Set](https://hl7.org/fhir/us/mcode/stu2/ValueSet-mcode-body-location-qualifier-vs.html), and a MustSupport flag for this element.
    4. Two MustSupport extensions to `Condition.bodySite`: [`Condition.bodySite.extension:locationQualifier`](https://hl7.org/fhir/us/mcode/stu2/StructureDefinition-mcode-primary-cancer-condition-definitions.html#Condition.bodySite.extension:locationQualifier) and [`Condition.bodySite.extension:lateralityQualifier`](https://hl7.org/fhir/us/mcode/stu2/StructureDefinition-mcode-primary-cancer-condition-definitions.html#Condition.bodySite.extension:lateralityQualifier).
    5. Constrained `Condition.stage.assessment` to refer to an Observation conforming to [Cancer Stage Group Profile](https://hl7.org/fhir/us/mcode/stu2/StructureDefinition-mcode-cancer-stage-group.html), and added MustSupport flags to this element and its parent.
    6. A required binding of `Condition.stage.type` to [Staging Type for Stage Group Value Set](https://hl7.org/fhir/us/mcode/stu2/ValueSet-mcode-observation-codes-stage-group-vs.html).
- The [Snapshot Table](https://hl7.org/fhir/us/mcode/stu2/StructureDefinition-mcode-primary-cancer-condition.html#tabs-snap) lists all the elements that may appear in a conforming instance of Condition.

This information tells me as an implementer what sort of data and terminology I'll need to have available to create conforming instances of Condition.

This is the first pass of the process needed to understand each profile in the IG. Depending on the use case, other resources may also need to be reviewed in detail.

-----

Now that we've seen how to read an IG, in the [next part of the course](02-creating-an-ig.html) we will look at how to create an IG from scratch.