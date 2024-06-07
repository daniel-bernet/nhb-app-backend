# Bakcend Documentation

## Database

### Sentiment

The sentiment table on the DB describes how an answer-option should be evaluated. The following character representations are present:

|SentimentID|Character|Sentiment|Usecase|
|-|-|-|-|
|1|u|unanswered|standart for unanswered questions|
|2|n|no|negative response|
|3|y|yes|positive response|
|4|i|irrelevant|the response is irrelevant|

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

### Option

Options will be hardcoded for the time beeing. An answer always starts out with the default, unanswered, option. Option creation would be a desirable future feature. The following options will be available:

|OptionID|SentimentID|Option|Description|
|-|-|-|-|
|1|UUID of "u"|unanswered|Standart for unanswered questions|
|2|UUID of "y"|yes|Give a positive answer|
|3|UUID of "n"|no|Give a negative answer|
|4|UUID of "i"|i don't know yet|Pass up on giving an answer at this moment|
|5|UUID of "i"|i don't care|Give undefinitive answer|

## Future features, additions and changes

- Move the type indicator from `Poll` to `Question` as one poll could be containing diffrent types of questions (one poll for gig and and rehearsals)

## Dev-Notes

- take a look at cascade configuration of sequelize models to ensure correct data deletion. test that no residual data is left behind wich would compremise data integrity of the database as all endpoints have been implemented!
- include answers in get poll info endpoint
