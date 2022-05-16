Download the latest `publisher.jar` release from <https://github.com/HL7/fhir-ig-publisher/releases>
into this folder.

The following one-line command will download the latest `publisher.jar` release on Mac/Linux, or you can manually download and move `publisher.jar` into this folder.

    curl -s https://api.github.com/repos/HL7/fhir-ig-publisher/releases/latest | grep "publisher.jar" | grep "https://github.com" | cut -d : -f 2,3 | tr -d \" | xargs curl -L -O