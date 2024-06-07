# Bakcend Documentation

## Database

### Sentiment

The sentiment table on the DB describes how an answer-option should be evaluated. The following character representations are present:

|Character|Sentiment|Usecase|
|-|-|-|
|u|unanswered|standart for ananswered questions|
|n|no|negative response|
|y|yes|positive response|
|i|irrelevant|the response is irrelevant|

### Types

The type table is a classificaton for events and polls. The following types exist on the DB:

|Type|Description|
|-|-|
|gig|A gig is an event where the group plays|
|rehearsal|A rehearsal is an event where the group practices|
|stamm|A stamm is a casual band meetup|
|meeting|A meeting is a planning and organisational band event|
|unspecified|Unspecified is the default without any implications|

### Band

As part of this project the `Band` table will only contain our band, `NoHeadBand`, as multi-band capabilities will be part of future development.
