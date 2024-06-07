# API Endpoint Documentation

## Endpoints overview

### Needed Endpoints

#### Account - Needed

All done.

#### Group - Needed

All done.

#### Event - Needed

- create event
- get info
- delete event
- edit event info

#### Poll - Needed

All done.

#### Question - Needed

- edit question
- delete question

#### Answer - Needed

- get answers
- edit answer

#### Type - Needed

All done.

#### Sentiment - Needed

All done.

### Done Endpoints

#### Account - Done

- register
- login
- get info
- delete account
- change password
- change email
- change firstname
- change lastname

#### Group - Done

- create group
- edit group info
- add member
- remove member
- get info
- delete group
- get events
- get polls

#### Event - Done

#### Poll - Done

- create poll (includes question creation as well as answer creation)
- get info
- delete poll
- edit poll info
- close poll
- open poll

#### Question - Done

#### Answer - Done

#### Type - Done

- get types

#### Sentiment - Done

- get sentiment

## Examples

### Template for New Endpoints

| Aspect            | Details                                       |
|-------------------|-----------------------------------------------|
| **Route**         | `/example-route`                              |
| **HTTP Method**   | POST/GET/PUT/DELETE                           |
| **Headers**       | `Authorization`: Bearer Token, `Content-Type`: application/json |
| **Query Parameters** | `param1` (type): Description             |
|                   | `param2` (type): Description                  |
| **Request Body**  | `{ "key1": "value1", "key2": "value2" }`      |
| **Success Response** | **Code**: 200 OK                         |
|                   | **Content**: `{ "responseKey1": "responseData1", "responseKey2": "responseData2" }` |
| **Error Response**| **Code**: 400 Bad Request                     |
|                   | **Content**: `{ "error": "errorDescription" }`|
| **Description**   | Provide a brief description of what the endpoint is used for and any additional information relevant to the endpoint's functionality. |

### Example: Hello World

| Aspect            | Details                                       |
|-------------------|-----------------------------------------------|
| **Route**         | `/`                                           |
| **HTTP Method**   | GET                                           |
| **Headers**       | `Content-Type`: text/plain                    |
| **Query Parameters** | None                                      |
| **Request Body**  | None                                          |
| **Success Response** | **Code**: 200 OK                         |
|                   | **Content**: `Hello World!`                   |
| **Error Response**| None                                          |
| **Description**   | This endpoint provides a simple "Hello World!" message. It is used to demonstrate a basic GET request in the application and does not require any authentication or input parameters. Utilizes CORS to allow cross-origin requests. |

## Account Endpoints

### Login

| Aspect            | Details                                       |
|-------------------|-----------------------------------------------|
| **Route**         | `/account/login`                          |
| **HTTP Method**   | POST                                          |
| **Headers**       | `Content-Type`: application/json              |
| **Query Parameters** | None                                      |
| **Request Body**  | `{ "email": "example@example.com", "password": "yourPassword" }` |
| **Success Response** | **Code**: 200 OK                         |
|                   | **Content**: `{ "message": "Login successful", "token": "jwtTokenHere" }` |
| **Error Response**| **Code**: 401 Unauthorized                   |
|                   | **Content**: `{ "error": "Invalid credentials" }` |
|                   | **Code**: 404 Not Found                      |
|                   | **Content**: `{ "error": "Account not found" }`|
|                   | **Code**: 500 Internal Server Error          |
|                   | **Content**: `{ "error": "Error message here" }` |
| **Description**   | This endpoint authenticates a user by email and password, issuing a JWT upon successful authentication. |

### Change Password

| Aspect            | Details                                       |
|-------------------|-----------------------------------------------|
| **Route**         | `/account/change-password`                |
| **HTTP Method**   | POST                                          |
| **Headers**       | `Content-Type`: application/json              |
| **Query Parameters** | None                                      |
| **Request Body**  | `{ "oldPassword": "oldPass", "newPassword": "newPass" }` |
| **Success Response** | **Code**: 200 OK                         |
|                   | **Content**: `{ "message": "Password successfully updated" }` |
| **Error Response**| **Code**: 401 Unauthorized                   |
|                   | **Content**: `{ "error": "Old password does not match" }` |
|                   | **Code**: 404 Not Found                      |
|                   | **Content**: `{ "error": "Account not found" }`|
|                   | **Code**: 500 Internal Server Error          |
|                   | **Content**: `{ "error": "Error message here" }` |
| **Description**   | Allows users to change their password after verifying the old password. |

### Create Account

| Aspect            | Details                                       |
|-------------------|-----------------------------------------------|
| **Route**         | `/account/create-account`                 |
| **HTTP Method**   | POST                                          |
| **Headers**       | `Content-Type`: application/json              |
| **Query Parameters** | None                                      |
| **Request Body**  | `{ "firstName": "John", "lastName": "Doe", "email": "johndoe@example.com", "password": "yourPassword" }` |
| **Success Response** | **Code**: 201 Created                    |
|                   | **Content**: `{ "message": "Account created successfully" }` |
| **Error Response**| **Code**: 500 Internal Server Error          |
|                   | **Content**: `{ "error": "Error message here" }` |
| **Description**   | This endpoint allows for the creation of a new account with first name, last name, email, and password. |

### Get Account Information

| Aspect            | Details                                       |
|-------------------|-----------------------------------------------|
| **Route**         | `/account/account-info`                   |
| **HTTP Method**   | GET                                           |
| **Headers**       | `Authorization`: Bearer Token                 |
| **Query Parameters** | None                                      |
| **Request Body**  | None                                          |
| **Success Response** | **Code**: 200 OK                         |
|                   | **Content**: `{ "firstName": "John", "lastName": "Doe", "email": "johndoe@example.com" }` |
| **Error Response**| **Code**: 404 Not Found                      |
|                   | **Content**: `{ "error": "Account not found" }`|
|                   | **Code**: 500 Internal Server Error          |
|                   | **Content**: `{ "error": "Error message here" }` |
| **Description**   | Retrieves basic account information such as first name, last name, and email for the logged-in user. |

### Change Email

| Aspect            | Details                                       |
|-------------------|-----------------------------------------------|
| **Route**         | `/account/change-email`                   |
| **HTTP Method**   | POST                                          |
| **Headers**       | `Authorization`: Bearer Token, `Content-Type`: application/json |
| **Query Parameters** | None                                      |
| **Request Body**  | `{ "newEmail": "newemail@example.com" }` |
| **Success Response** | **Code**: 200 OK                         |
|                   | **Content**: `{ "message": "Email successfully updated" }` |
| **Error Response**| **Code**: 400 Bad Request                    |
|                   | **Content**: `{ "error": "Invalid email format" }` |
|                   | **Code**: 404 Not Found                      |
|                   | **Content**: `{ "error": "Account not found" }`|
|                   | **Code**: 409 Conflict                       |
|                   | **Content**: `{ "error": "Email already in use" }` |
|                   | **Code**: 500 Internal Server Error          |
|                   | **Content**: `{ "error": "Error message here" }` |
| **Description**   | Allows the user to update their email address after verifying that the new email is not already in use and is in a valid format. |

### Change First Name

| Aspect            | Details                                       |
|-------------------|-----------------------------------------------|
| **Route**         | `/account/change-first-name`              |
| **HTTP Method**   | PATCH                                         |
| **Headers**       | `Authorization`: Bearer Token, `Content-Type`: application/json |
| **Query Parameters** | None                                      |
| **Request Body**  | `{ "firstName": "NewFirstName" }`            |
| **Success Response** | **Code**: 200 OK                         |
|                   | **Content**: `{ "message": "First name updated successfully" }` |
| **Error Response**| **Code**: 404 Not Found                      |
|                   | **Content**: `{ "error": "Account not found" }`|
|                   | **Code**: 500 Internal Server Error          |
|                   | **Content**: `{ "error": "Error message here" }` |
| **Description**   | Allows the user to update their first name. This endpoint requires authentication and uses a PATCH method to indicate a partial update of the account data. |

### Change Last Name

| Aspect            | Details                                       |
|-------------------|-----------------------------------------------|
| **Route**         | `/account/change-last-name`               |
| **HTTP Method**   | PATCH                                         |
| **Headers**       | `Authorization`: Bearer Token, `Content-Type`: application/json |
| **Query Parameters** | None                                      |
| **Request Body**  | `{ "lastName": "NewLastName" }` |
| **Success Response** | **Code**: 200 OK                         |
|                   | **Content**: `{ "message": "Last name updated successfully" }` |
| **Error Response**| **Code**: 404 Not Found                      |
|                   | **Content**: `{ "error": "Account not found" }`|
|                   | **Code**: 500 Internal Server Error          |
|                   | **Content**: `{ "error": "Error message here" }` |
| **Description**   | Allows the user to update their last name. This endpoint requires authentication and uses a PATCH method for partial data modification. |

## Group Endpoints

### Create Group

| Aspect            | Details                                       |
|-------------------|-----------------------------------------------|
| **Route**         | `/group/create`                               |
| **HTTP Method**   | POST                                          |
| **Headers**       | `Authorization`: Bearer Token, `Content-Type`: application/json              |
| **Query Parameters** | None                                      |
| **Request Body**  | `{ "name": "GroupName", "description": "GroupDescription" }` |
| **Success Response** | **Code**: 201 Created                    |
|                   | **Content**: `{ "message": "Group created successfully", "group": { "name": "GroupName", "description": "GroupDescription" } }` |
| **Error Response**| **Code**: 500 Internal Server Error          |
|                   | **Content**: `{ "error": "Error message here" }` |
| **Description**   | This endpoint allows for the creation of a new group with a name and description. |

### Delete Group

| Aspect            | Details                                       |
|-------------------|-----------------------------------------------|
| **Route**         | `/group/delete/:groupId`                            |
| **HTTP Method**   | DELETE                                        |
| **Headers**       | `Authorization`: Bearer Token, `Content-Type`: application/json |
| **Query Parameters** | `groupId` (UUID): ID of the group to delete |
| **Request Body**  | None                                          |
| **Success Response** | **Code**: 200 OK                         |
|                   | **Content**: `{ "message": "Group and all related data successfully deleted" }` |
| **Error Response**| **Code**: 404 Not Found                      |
|                   | **Content**: `{ "error": "Group not found" }`|
|                   | **Code**: 500 Internal Server Error          |
|                   | **Content**: `{ "error": "Error message here" }` |
| **Description**   | Deletes a group along with all associated events, polls, questions, group members, and answers, ensuring complete cleanup of all related data. |

### Get Group Information

| Aspect            | Details                                       |
|-------------------|-----------------------------------------------|
| **Route**         | `/group/info/:groupId`                        |
| **HTTP Method**   | GET                                           |
| **Headers**       | `Authorization`: Bearer Token, `Content-Type`: application/json              |
| **Query Parameters** | `groupId` (UUID): ID of the group to retrieve |
| **Request Body**  | None                                          |
| **Success Response** | **Code**: 200 OK                         |
|                   | **Content**: `{ "name": "GroupName", "description": "GroupDescription", "members": [] }` |
| **Error Response**| **Code**: 404 Not Found                      |
|                   | **Content**: `{ "error": "Group not found" }`|
|                   | **Code**: 500 Internal Server Error          |
|                   | **Content**: `{ "error": "Error message here" }` |
| **Description**   | Retrieves detailed information about a group, including its members. |

### Edit Group Information

| Aspect            | Details                                       |
|-------------------|-----------------------------------------------|
| **Route**         | `/group/edit/:groupId`                        |
| **HTTP Method**   | PATCH                                         |
| **Headers**       | `Authorization`: Bearer Token, `Content-Type`: application/json              |
| **Query Parameters** | `groupId` (UUID): ID of the group to edit  |
| **Request Body**  | `{ "name": "NewGroupName", "description": "NewGroupDescription" }` |
| **Success Response** | **Code**: 200 OK                         |
|                   | **Content**: `{ "message": "Group updated successfully" }` |
| **Error Response**| **Code**: 404 Not Found                      |
|                   | **Content**: `{ "error": "Group not found" }`|
|                   | **Code**: 500 Internal Server Error          |
|                   | **Content**: `{ "error": "Error message here" }` |
| **Description**   | Updates the name and/or description of a specific group. |

### Add Member to Group

| Aspect            | Details                                       |
|-------------------|-----------------------------------------------|
| **Route**         | `/group/add-member`                                 |
| **HTTP Method**   | POST                                          |
| **Headers**       | `Authorization`: Bearer Token, `Content-Type`: application/json |
| **Query Parameters** | None                                      |
| **Request Body**  | `{ "groupId": "UUID", "accountId": "UUID" }` |
| **Success Response** | **Code**: 201 Created                    |
|                   | **Content**: `{ "message": "Member added successfully and default answers set for open polls", "member": { ... } }` |
| **Error Response**| **Code**: 500 Internal Server Error          |
|                   | **Content**: `{ "error": "Error message here" }` |
| **Description**   | Adds a new member to a group and initializes default answers for all open polls associated with the group, ensuring the member is ready to participate immediately. |

### Remove Member from Group

| Aspect            | Details                                       |
|-------------------|-----------------------------------------------|
| **Route**         | `/group/remove-member`                              |
| **HTTP Method**   | DELETE                                        |
| **Headers**       | `Authorization`: Bearer Token, `Content-Type`: application/json |
| **Query Parameters** | None                                      |
| **Request Body**  | `{ "groupId": "UUID", "accountId": "UUID" }` |
| **Success Response** | **Code**: 200 OK                         |
|                   | **Content**: `{ "message": "Member removed successfully" }` or `{ "message": "Member removed and group deleted due to no remaining members" }` |
| **Error Response**| **Code**: 404 Not Found                      |
|                   | **Content**: `{ "error": "Member not found" }`|
|                   | **Code**: 500 Internal Server Error          |
|                   | **Content**: `{ "error": "Error message here" }` |
| **Description**   | Removes a member from a group and deletes all their answers to poll questions. If the removed member is the last one in the group, the entire group and all related data (events, polls, answers) are also deleted, ensuring no orphaned data remains. |

### Get Events for a Group

| Aspect            | Details                                       |
|-------------------|-----------------------------------------------|
| **Route**         | `/group/events/:groupId`                     |
| **HTTP Method**   | GET                                           |
| **Headers**       | `Authorization`: Bearer Token                 |
| **Query Parameters** | `groupId` (UUID): ID of the group         |
| **Request Body**  | None                                          |
| **Success Response** | **Code**: 200 OK                         |
|                   | **Content**: Array of event objects           |
| **Error Response**| **Code**: 404 Not Found                      |
|                   | **Content**: `{ "error": "Group not found" }`|
|                   | **Code**: 500 Internal Server Error          |
|                   | **Content**: `{ "error": "Error message here" }` |
| **Description**   | Retrieves all events associated with a specific group. Requires authentication. |

### Get Polls for a Group

| Aspect            | Details                                       |
|-------------------|-----------------------------------------------|
| **Route**         | `/group/polls/:groupId`                      |
| **HTTP Method**   | GET                                           |
| **Headers**       | `Authorization`: Bearer Token                 |
| **Query Parameters** | `groupId` (UUID): ID of the group         |
| **Request Body**  | None                                          |
| **Success Response** | **Code**: 200 OK                         |
|                   | **Content**: Array of poll objects            |
| **Error Response**| **Code**: 404 Not Found                      |
|                   | **Content**: `{ "error": "Group not found" }`|
|                   | **Code**: 500 Internal Server Error          |
|                   | **Content**: `{ "error": "Error message here" }` |
| **Description**   | Retrieves all polls associated with a specific group. Requires authentication. |

## Sentiment Endpoints

### Get All Sentiments

| Aspect            | Details                                       |
|-------------------|-----------------------------------------------|
| **Route**         | `/sentiment/get-sentiments`                             |
| **HTTP Method**   | GET                                           |
| **Headers**       | `Authorization`: Bearer Token                 |
| **Query Parameters** | None                                      |
| **Request Body**  | None                                          |
| **Success Response** | **Code**: 200 OK                         |
|                   | **Content**: Array of sentiment objects       |
| **Error Response**| **Code**: 500 Internal Server Error          |
|                   | **Content**: `{ "error": "Error message here" }` |
| **Description**   | Retrieves a list of all sentiments available in the system. Requires authentication. |

## Type Endpoints

### Get All Types

| Aspect            | Details                                       |
|-------------------|-----------------------------------------------|
| **Route**         | `/type/get-types`                                  |
| **HTTP Method**   | GET                                           |
| **Headers**       | `Authorization`: Bearer Token                 |
| **Query Parameters** | None                                      |
| **Request Body**  | None                                          |
| **Success Response** | **Code**: 200 OK                         |
|                   | **Content**: Array of type objects            |
| **Error Response**| **Code**: 500 Internal Server Error          |
|                   | **Content**: `{ "error": "Error message here" }` |
| **Description**   | Retrieves a list of all types available in the system. Requires authentication. |

## Poll Endpoints

### Create Poll with Questions and Default Answers for Group Members

| Aspect            | Details                                       |
|-------------------|-----------------------------------------------|
| **Route**         | `/poll/create-poll`                                |
| **HTTP Method**   | POST                                          |
| **Headers**       | `Authorization`: Bearer Token, `Content-Type`: application/json |
| **Query Parameters** | None                                      |
| **Request Body**  | `{ "groupID": "UUID", "typeID": "UUID", "title": "Poll Title", "description": "Poll Description", "questions": [{"question": "What is your favorite color?", "description": "A simple choice", "duration": 30, "optionIDs": ["UUID-option1", "UUID-option2"]}, {"question": "What is your preferred genre of music?", "description": "Select your music genre", "optionIDs": ["UUID-option3", "UUID-option4"]}] }` |
| **Success Response** | **Code**: 201 Created                    |
|                   | **Content**: `{ "message": "Poll created successfully with questions and default answers", "poll": { "PollID": "UUID", "Title": "Poll Title", "Description": "Poll Description" } }` |
| **Error Response**| **Code**: 400 Bad Request                     |
|                   | **Content**: `{ "error": "Invalid input data" }`|
|                   | **Code**: 404 Not Found                      |
|                   | **Content**: `{ "error": "Group not found" }`|
|                   | **Code**: 500 Internal Server Error          |
|                   | **Content**: `{ "error": "Error message here" }` |
| **Description**   | This endpoint is used for creating a new poll associated with a specific group. It accepts details of the poll such as the group ID, type ID, title, description, and a list of questions. Each question includes a question text, an optional description, an optional duration, and a list of option IDs that must be predefined in the database. The endpoint also creates default "unanswered" answers for each group member for each question in the poll, ensuring every member has an initial answer state. This operation is performed atomically to ensure data integrity and consistency across related database entries. |

### Delete Poll

| Aspect            | Details                                       |
|-------------------|-----------------------------------------------|
| **Route**         | `/poll/delete/:pollId`                             |
| **HTTP Method**   | DELETE                                        |
| **Headers**       | `Authorization`: Bearer Token, `Content-Type`: application/json |
| **Query Parameters** | `pollId` (UUID): ID of the poll to delete |
| **Request Body**  | None                                          |
| **Success Response** | **Code**: 200 OK                         |
|                   | **Content**: `{ "message": "Poll and related data deleted successfully" }` |
| **Error Response**| **Code**: 404 Not Found                      |
|                   | **Content**: `{ "error": "Poll not found" }` |
|                   | **Code**: 500 Internal Server Error          |
|                   | **Content**: `{ "error": "Error message here" }` |
| **Description**   | This endpoint deletes a poll and all associated data, including questions, answers, and entries in join tables, ensuring clean removal of all relevant records. |

### Edit Poll

| Aspect            | Details                                       |
|-------------------|-----------------------------------------------|
| **Route**         | `/poll/edit/:pollId`                               |
| **HTTP Method**   | PATCH                                         |
| **Headers**       | `Authorization`: Bearer Token, `Content-Type`: application/json |
| **Query Parameters** | `pollId` (UUID): ID of the poll to edit  |
| **Request Body**  | `{ "title": "New Title", "description": "Updated Description" }` |
| **Success Response** | **Code**: 200 OK                         |
|                   | **Content**: `{ "message": "Poll updated successfully" }` |
| **Error Response**| **Code**: 404 Not Found                      |
|                   | **Content**: `{ "error": "Poll not found" }`|
|                   | **Code**: 500 Internal Server Error          |
|                   | **Content**: `{ "error": "Error message here" }` |
| **Description**   | This endpoint allows for modifications to a poll's title and description, providing flexibility in managing poll lifecycle. |

### Get Poll Information

| Aspect            | Details                                       |
|-------------------|-----------------------------------------------|
| **Route**         | `/poll/info/:pollId`                               |
| **HTTP Method**   | GET                                           |
| **Headers**       | `Authorization`: Bearer Token, `Content-Type`: application/json |
| **Query Parameters** | `pollId` (UUID): ID of the poll to retrieve |
| **Request Body**  | None                                          |
| **Success Response** | **Code**: 200 OK                         |
|                   | **Content**: `{ "poll": { ... }, "questions": [{ ... }], "options": [{ ... }] }` |
| **Error Response**| **Code**: 404 Not Found                      |
|                   | **Content**: `{ "error": "Poll not found" }`|
|                   | **Code**: 500 Internal Server Error          |
|                   | **Content**: `{ "error": "Error message here" }` |
| **Description**   | Retrieves detailed information about a specific poll, including its type, related questions, options with sentiments, and answers, offering a comprehensive view of the poll data. |

### Open Poll

| Aspect            | Details                                       |
|-------------------|-----------------------------------------------|
| **Route**         | `/poll/open/:pollId`                               |
| **HTTP Method**   | PATCH                                         |
| **Headers**       | `Authorization`: Bearer Token, `Content-Type`: application/json |
| **Query Parameters** | `pollId` (UUID): ID of the poll to open  |
| **Request Body**  | None                                          |
| **Success Response** | **Code**: 200 OK                         |
|                   | **Content**: `{ "message": "Poll is now open" }` |
| **Error Response**| **Code**: 404 Not Found                      |
|                   | **Content**: `{ "error": "Poll not found" }` |
|                   | **Code**: 500 Internal Server Error          |
|                   | **Content**: `{ "error": "Error message here" }` |
| **Description**   | This endpoint opens a poll, allowing responses from participants by setting its IsClosed status to false. |

### Close Poll

| Aspect            | Details                                       |
|-------------------|-----------------------------------------------|
| **Route**         | `/poll/close/:pollId`                              |
| **HTTP Method**   | PATCH                                         |
| **Headers**       | `Authorization`: Bearer Token, `Content-Type`: application/json |
| **Query Parameters** | `pollId` (UUID): ID of the poll to close |
| **Request Body**  | None                                          |
| **Success Response** | **Code**: 200 OK                         |
|                   | **Content**: `{ "message": "Poll is now closed" }` |
| **Error Response**| **Code**: 404 Not Found                      |
|                   | **Content**: `{ "error": "Poll not found" }` |
|                   | **Code**: 500 Internal Server Error          |
|                   | **Content**: `{ "error": "Error message here" }` |
| **Description**   | This endpoint closes a poll, preventing any further responses by setting its IsClosed status to true. |
