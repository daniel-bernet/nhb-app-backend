# Database Tables Documentation

## Example Table

| Key| Column Name| Datatype| Required | Nullable | Default | Description|
|-|-|-|-|-|-|-|
| PK  | ExampleID| UUID| Yes| No| None| Unique identifier for example|
|| ExampleField| Varchar(64)| Yes| Yes| Null| Example field|

## Account Table

| Key | Column Name   | Datatype        | Required | Nullable | Default | Description                       |
|-----|---------------|-----------------|----------|----------|---------|-----------------------------------|
| PK  | AccountID        | UUID            | Yes      | No       | None    | Unique identifier for each account|
|     | FirstName     | Varchar(64)     | Yes      | No       | None    | Account's first name                 |
|     | LastName      | Varchar(64)     | Yes      | No       | None    | Account's last name                  |
|     | Email         | Varchar(128)    | Yes      | No       | None    | Account's email address              |
|     | PasswordHash  | Varchar(512)    | Yes      | No       | None    | Hash of the Account's password       |

## Band Table

| Key | Column Name   | Datatype        | Required | Nullable | Default | Description                       |
|-----|---------------|-----------------|----------|----------|---------|-----------------------------------|
| PK  | BandID        | Integer            | Yes      | No       | None    | Unique identifier for each band|
|     | Description     | Varchar(512)     | Yes      | No       | None    | Description for a band               |

## Group Table

| Key | Column Name   | Datatype        | Required | Nullable | Default | Description                       |
|-----|---------------|-----------------|----------|----------|---------|-----------------------------------|
| PK  | GroupID        | UUID            | Yes      | No       | None    | Unique identifier for each group|
| FK  | BandID     | Integer     | Yes      | No       | None    | Band the group is associated with                 |
|     | Name      | Varchar(64)     | Yes      | No       | None    | Name of the group                  |
|     | Description     | Varchar(512)     | Yes      | No       | None    | Description for the group               |

## Type Table

| Key | Column Name   | Datatype        | Required | Nullable | Default | Description                       |
|-----|---------------|-----------------|----------|----------|---------|-----------------------------------|
| PK  | TypeID        | UUID            | Yes      | No       | None    | Unique identifier for type|
|     | Label     | Varchar(64)     | Yes      | No       | None    | Label for the type|

## GroupMember Table

| Key | Column Name   | Datatype        | Required | Nullable | Default | Description                       |
|-----|---------------|-----------------|----------|----------|---------|-----------------------------------|
| PK  | GroupMemberID        | UUID            | Yes      | No       | None    | Unique identifier for group-member|
| FK  | GroupID     | UUID     | Yes      | No       | None    | Group an account is part of                 |
| FK  | AccountID     | UUID     | Yes      | No       | None    | Account wich is memeber of this group|

## Event Table

| Key | Column Name   | Datatype        | Required | Nullable | Default | Description                       |
|-----|---------------|-----------------|----------|----------|---------|-----------------------------------|
| PK  | EventID        | UUID            | Yes      | No       | None    | Unique identifier for event|
| FK  | GroupID     | UUID     | Yes      | No       | None    | Group associated with this event|
| FK  | TypeID     | UUID     | Yes      | No       | None    | Type of event|
|     | Title      | Varchar(64)     | Yes      | No       | None    | Title of the event|
|     | Description     | Varchar(512)     | Yes      | No       | None    | Description for the event|
|     | Location      | Varchar(64)     | Yes      | No       | None    | Location of the event|
|     | Date      | Timestamp     | Yes      | No       | None    | Date and time of the event|
|     | Duration      | Integer     | Yes      | No       | None    | Duration of the event in minutes|

## Poll Table

| Key | Column Name   | Datatype        | Required | Nullable | Default | Description                       |
|-----|---------------|-----------------|----------|----------|---------|-----------------------------------|
| PK  | PollID        | UUID            | Yes      | No       | None    | Unique identifier for poll|
| FK  | TypeID     | UUID     | Yes      | No       | None    | Type of poll|
| FK  | GroupID     | UUID     | Yes      | No       | None    | Group questioned with this poll|
|     | Title      | Varchar(64)     | Yes      | No       | None    | Title of the poll|
|     | Description     | Varchar(512)     | Yes      | No       | None    | Description for the poll|
|     | IsClosed      | Boolean     | No      | No       | False    | Identificator for closed polls|

## Question Table

| Key | Column Name   | Datatype        | Required | Nullable | Default | Description                       |
|-----|---------------|-----------------|----------|----------|---------|-----------------------------------|
| PK  | QuestionID        | UUID            | Yes      | No       | None    | Unique identifier for question|
|     | Question      | Varchar(128)     | Yes      | No       | None    | Formulated question|
|     | Date      | Timestamp     | Yes      | No       | None    | Date and time of the event|
|     | Duration      | Integer     | Yes      | No       | None    | Duration of the event|
|     | Description     | Varchar(512)     | Yes      | No       | None    | Description for the question|

## PollQuestionJoin Table

| Key | Column Name   | Datatype        | Required | Nullable | Default | Description                       |
|-----|---------------|-----------------|----------|----------|---------|-----------------------------------|
| PK  | PollQuestionID| UUID| Yes      | No       | None    | Unique identifier for the poll-question join|
| FK  | PollID     | UUID     | Yes      | No       | None    | Poll encompassing the questions|
| FK  | QuestionID     | UUID     | Yes      | No       | None    | Question part of the poll|

## Sentiment Table

| Key | Column Name   | Datatype        | Required | Nullable | Default | Description                       |
|-----|---------------|-----------------|----------|----------|---------|-----------------------------------|
| PK  | SentimentID        | Integer            | Yes      | No       | None    | Unique identifier for sentiment|
|     | Sentiment     | Varchar(1)     | Yes      | No       | None    | Character representation of sentiment|

## Option Table

| Key | Column Name   | Datatype        | Required | Nullable | Default | Description                       |
|-----|---------------|-----------------|----------|----------|---------|-----------------------------------|
| PK  | OptionID        | UUID            | Yes      | No       | None    | Unique identifier for option|
| FK  | SentimentID     | Integer     | Yes      | No       | None    | Sentiment represented by this option|
|     | Option      | Varchar(64)     | Yes      | No       | None    | Formulated answer-option|
|     | Description     | Varchar(512)     | No      | Yes       | Null    | Description for the option|

## QuestionOptionJoin Table

| Key | Column Name   | Datatype        | Required | Nullable | Default | Description                       |
|-----|---------------|-----------------|----------|----------|---------|-----------------------------------|
| PK  | QuestionOptionID| UUID| Yes      | No       | None    | Unique identifier for the question-option join|
| FK  | QuestionID     | UUID     | Yes      | No       | None    | Question encompassing options|
| FK  | OptionID     | UUID     | Yes      | No       | None    | Option within question|

## Answer Table

| Key | Column Name   | Datatype        | Required | Nullable | Default | Description                       |
|-----|---------------|-----------------|----------|----------|---------|-----------------------------------|
| PK  | AnswerID| UUID| Yes      | No       | None    | Unique identifier for the accounts answer to a question|
| FK  | QuestionID     | UUID     | Yes      | No       | None    | Answered question|
| FK  | GroupMemberID     | UUID     | Yes      | No       | None    | GroupMember providing answer|
| FK  | OptionID     | UUID     | Yes      | No       | None    | As answer selected option|
