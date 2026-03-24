# FSH Seminar - FSH Seminar v0.1.0

## FSH Seminar

FHIR (pronounced "fire") is a standard for health care data exchange. FHIR Implementation Guides (IGs) are "a set of rules of how a particular interoperability or standards problem is solved".[1](#fn:ig)

This course is a comprehensive overview of IG authoring for those interested in creating FHIR IGs using [FHIR Shorthand](https://fshschool.org), also known as "FSH" (pronounced "fish").

### Learning objectives

1. Become familiar with the FHIR specification, and commonly used FHIR resources and element types.
1. Learn the recommended process for successfully planning a new IG
1. Gain proficiency with the FHIR Shorthand ecosystem of tools (FSH, GoFSH, SUSHI)
1. Learn how to create the common components of an IG, including FHIR profiles, code systems, and value sets
1. Learn about key FHIR profiling concepts including value set binding, cardinality, MustSupport, slicing, and extensions
1. Awareness of common clinical code systems including LOINC, SNOMED, ICD10, and code systems in the HL7 terminology list

### Prerequisites

The course content assumes basic familiarity with FHIR – if you haven't worked with FHIR before in any capacity, see the [FHIR Resources page](fhir-resources.md) for some general introductory information.

No experience with reading FHIR IGs, or with FHIR IG authoring/profiling is necessary. These topics are covered in [Part 1](01-reading-an-ig.md) and [2](02-creating-an-ig.md), respectively. Readers who are already familiar with FHIR IG authoring should still review [Part 2](02-creating-an-ig.md) as this describes the technical setup process for using the FSH tools.

### Recommended schedule

We recommend completing the course materials over two days as described below.

| | | | |
| :--- | :--- | :--- | :--- |
| **Before Starting** | | | |
|   | Setup | 1. Complete the[setup instructions](setup.md)
 | ~1 hour; help available on[chat.fhir.org](https://chat.fhir.org/#narrow/stream/322131-fsh-courses) |
| **Day 1** | | | |
| 1 | [Reading an IG](01-reading-an-ig.md) | 1. What's the purpose of an IG?
1. What are the common components of an IG?
1. How to approach reading an unfamiliar IG
1. Review of the[SMART Health Cards: Vaccination & Testing](http://hl7.org/fhir/uv/shc-vaccination/2021Sep/)IG
 | ~1 hour |
| 2 | [Creating an IG](02-creating-an-ig.md) | 1. Overview of the recommended process for creating a new IG
1. Identify persona, use cases and key profiles needed
1. Creating a conceptual model for one of the profiles
1. Starting a new IG with SUSHI
1. Creating a profile with FSH
1. Creating a value set with FSH
1. Creating an example with FSH
1. Running the IG publisher
 | ~2 hours |
| **Day 2** | | | |
| 3 | [Hands-on profiling exercise](03-exercise.md) | 1. Implement a profile in FSH based on provided use case
1. Build the IG locally
 | 1-2 hours |
| 4 | [Deep Dive With FSH](04-deep-dive-with-fsh.md) | 1. TBD, but likely: slicing, extensions, invariants, CapabilityStatements and SearchParams
 | 2-3 hours |

### Authors

* Max Masnick (MITRE)
* Chris Moesel (MITRE)
* May Terry (MITRE)

If you have questions or comments, please contact us on [chat.fhir.org](https://chat.fhir.org/#narrow/stream/322131-fsh-courses).

MITRE: Approved for Public Release. Distribution Unlimited. Case Number 19-3439.

1. https://www.hl7.org/fhir/implementationguide.html [↩](#fnref:ig)

