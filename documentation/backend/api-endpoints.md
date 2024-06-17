# API Endpoint Documentation

## Endpoints overview

### Needed Endpoints

- validate JWT (then generate a new jwt)
- get group info should contain all events, polls, messages etc.

### No longer needed Endpoints

- Group: get polls, get events

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

### Delete Account

| Aspect               | Details                                                                     |
|----------------------|-----------------------------------------------------------------------------|
| **Route**            | `/account/delete-account`                                                           |
| **HTTP Method**      | DELETE                                                                      |
| **Headers**          | `Authorization`: Bearer Token, `Content-Type`: application/json             |
| **Query Parameters** | None                                                                        |
| **Request Body**     | None                                                                        |
| **Success Response** | **Code**: 200 OK                                                            |
|                      | **Content**: `{ "message": "Account successfully deleted" }`                |
| **Error Response**   | **Code**: 404 Not Found                                                     |
|                      | **Content**: `{ "error": "Account not found" }`                             |
|                      | **Code**: 500 Internal Server Error                                         |
|                      | **Content**: `{ "error": "Error message here" }`                            |
| **Description**      | This endpoint deletes an existing account. It requires authentication and   |
|                      | is only accessible to the account holder or authorized users. On successful |
|                      | deletion, it returns a success message. If the account is not found or there|
|                      | is a server error, appropriate error messages are returned.                 |

### Get Basic Group Information

| Aspect               | Details                                                                   |
|----------------------|---------------------------------------------------------------------------|
| **Route**            | `/account/get-basic-group-information`                                            |
| **HTTP Method**      | GET                                                                       |
| **Headers**          | `Authorization`: Bearer Token, `Content-Type`: application/json           |
| **Query Parameters** | None                                                                      |
| **Request Body**     | None                                                                      |
| **Success Response** | **Code**: 200 OK                                                          |
|                      | **Content**: `{ "groups": [{"GroupID": "", "Name": "", "Description": "", "band": {"Name": ""}, "groupMembers": [{"account": {"FirstName": "", "LastName": ""}}]}]}` |
| **Error Response**   | **Code**: 404 Not Found                                                   |
|                      | **Content**: `{ "error": "Account not found" }`                           |
|                      | **Code**: 500 Internal Server Error                                       |
|                      | **Content**: `{ "error": "Error message here" }`                          |
| **Description**      | This endpoint retrieves basic information about all groups an account is  |
|                      | part of. It includes the band name, list of group members, and other group|
|                      | information such as group name, description, and ID. This endpoint requires|
|                      | authentication and is accessible only to the account holder.               |

### Search Accounts

| Aspect               | Details                                              |
|----------------------|------------------------------------------------------|
| **Route**            | `account/search-account`                                    |
| **HTTP Method**      | GET                                                  |
| **Headers**          | `Authorization`: Bearer Token, `Content-Type`: application/json |
| **Query Parameters** | `searchText` (string): The text to search for in account first names, last names, or emails. |
| **Request Body**     | None                                                 |
| **Success Response** | **Code**: 200 OK                                     |
|                      | **Content**: `[{"AccountID": "UUID", "FirstName": "John", "LastName": "Doe", "Email": "john.doe@example.com"}, ...]` |
| **Error Response**   | **Code**: 400 Bad Request                            |
|                      | **Content**: `{ "message": "Search text is required" }` |
|                      | **Code**: 500 Internal Server Error                  |
|                      | **Content**: `{ "error": "Internal Server Error", "details": "error message" }` |
| **Description**      | Searches for accounts based on the provided text but excludes the account of the user making the request. It looks for matches in first names, last names, or emails. |

## Group Endpoints

### Create Group

| Aspect               | Details                                                                   |
|----------------------|---------------------------------------------------------------------------|
| **Route**            | `/group/create`                                                           |
| **HTTP Method**      | POST                                                                      |
| **Headers**          | `Authorization`: Bearer Token, `Content-Type`: application/json           |
| **Query Parameters** | None                                                                      |
| **Request Body**     | `{ "name": "Group Name", "description": "Group Description", "accountIds": ["UUID1", "UUID2"] }` |
| **Success Response** | **Code**: 201                                                             |
|                      | **Content**: `{ "message": "Group created successfully with members added", "group": { "GroupID": "UUID", "Name": "string", "Description": "string" } }` |
| **Error Response**   | **Code**: 400 Bad Request                                                 |
|                      | **Content**: `{ "error": "Invalid account ID(s)" }`                       |
|                      | **Code**: 404 Not Found                                                   |
|                      | **Content**: `{ "error": "Account not found" }`                           |
|                      | **Code**: 500 Internal Server Error                                       |
|                      | **Content**: `{ "error": "Internal Server Error", "details": "error message" }` |
| **Description**      | This endpoint is used for creating a new group and optionally adding multiple members. Each member is validated before addition. The transaction ensures all operations (group creation and member additions) are successful; otherwise, no changes are committed. Supports only one band by associating a fixed BandID. |

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
| **Request Body**  | `{ "groupId": "UUID", "manipulateAccountId": "UUID" }` |
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
| **Request Body**  | `{ "groupId": "UUID", "manipulateAccountId": "UUID" }` |
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

### Get Group Feed

| Aspect               | Details                                                                                              |
|----------------------|------------------------------------------------------------------------------------------------------|
| **Route**            | `/group/get-feed/:groupId`                                                                           |
| **HTTP Method**      | GET                                                                                                  |
| **Headers**          | `Authorization`: Bearer Token, `Content-Type`: application/json                                      |
| **Query Parameters** | `start` (integer): Index from which the feed items should start. Default is 0.                       |
| **Request Body**     | None                                                                                                 |
| **Success Response** | **Code**: 200 OK                                                                                     |
|                      | **Content**: `{ "data": [{"id": "UUID", "title": "string", "description": "string", "updatedAt": "timestamp", "createdAt": "timestamp", "feedType": "event/poll", "typeLabel": "string", "additionalDetails": {...}}], "message": "Feed fetched successfully" }` |
| **Error Response**   | **Code**: 404 Not Found                                                                              |
|                      | **Content**: `{ "error": "Group not found" }`                                                        |
|                      | **Code**: 403 Forbidden                                                                              |
|                      | **Content**: `{ "error": "User is not a member of the group" }`                                      |
|                      | **Code**: 500 Internal Server Error                                                                  |
|                      | **Content**: `{ "error": "Internal Server Error", "details": "error description" }`                  |
| **Description**      | This endpoint retrieves the most recent activities of a group, including events and polls, sorted from most recent to oldest. Each item in the feed is tagged with a `feedType` to identify whether it is an event or a poll and includes additional details specific to each type. Pagination is supported through the `start` query parameter, and only the first 20 entries are returned at a time. The user must be a member of the specified group to access the feed.|

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

### Get Poll Options

| Aspect            | Details                                       |
|-------------------|-----------------------------------------------|
| **Route**         | `/poll/get-options`                           |
| **HTTP Method**   | GET                                           |
| **Headers**       | `Authorization`: Bearer Token, `Content-Type`: application/json |
| **Query Parameters** | None                                        |
| **Request Body**  | None                                          |
| **Success Response** | **Code**: 200 OK                         |
|                   | **Content**: `{ "data": [{"OptionID": "uuid", "Option": "string", "Description": "string", "SentimentID": "integer", "sentiment": {"Sentiment": "string"}}], "message": "Options fetched successfully" }` |
| **Error Response**| **Code**: 500 Internal Server Error            |
|                   | **Content**: `{ "error": "Internal Server Error", "details": "error description" }`|
| **Description**   | This endpoint retrieves all available options for poll creation along with their associated sentiments. This is useful for administrators or poll creators to understand what options are available for inclusion in new polls. |

## Event Endpoints

### Create Event

| Aspect            | Details                                       |
|-------------------|-----------------------------------------------|
| **Route**         | `/event/create`                                     |
| **HTTP Method**   | POST                                          |
| **Headers**       | `Authorization`: Bearer Token, `Content-Type`: application/json |
| **Request Body**  | `{ "GroupID": "UUID", "TypeID": "UUID", "Title": "String", "Description": "String", "Location": "String", "Date": "Date", "Duration": "Integer" }` |
| **Success Response** | **Code**: 201 Created                    |
|                   | **Content**: `{ "message": "Event created successfully", "event": {...} }` |
| **Error Response**| **Code**: 500 Internal Server Error          |
|                   | **Content**: `{ "error": "Error message here" }` |
| **Description**   | Creates a new event linked to a specific group and type, storing all relevant details such as title, description, location, date, and duration. |

### Get Event Information

| Aspect            | Details                                       |
|-------------------|-----------------------------------------------|
| **Route**         | `/event/info/:eventId`                              |
| **HTTP Method**   | GET                                           |
| **Headers**       | `Authorization`: Bearer Token, `Content-Type`: application/json |
| **Query Parameters** | `eventId` (UUID): ID of the event         |
| **Request Body**  | None                                          |
| **Success Response** | **Code**: 200 OK                         |
|                   | **Content**: `{ "event": {...} }`            |
| **Error Response**| **Code**: 404 Not Found                      |
|                   | **Content**: `{ "error": "Event not found" }`|
|                   | **Code**: 500 Internal Server Error          |
|                   | **Content**: `{ "error": "Error message here" }` |
| **Description**   | Retrieves detailed information about a specific event, including its linkage to a group and event type. |

### Delete Event

| Aspect            | Details                                       |
|-------------------|-----------------------------------------------|
| **Route**         | `/event/delete/:eventId`                            |
| **HTTP Method**   | DELETE                                        |
| **Headers**       | `Authorization`: Bearer Token, `Content-Type`: application/json |
| **Query Parameters** | `eventId` (UUID): ID of the event to delete |
| **Request Body**  | None                                          |
| **Success Response** | **Code**: 200 OK                         |
|                   | **Content**: `{ "message": "Event successfully deleted" }` |
| **Error Response**| **Code**: 404 Not Found                      |
|                   | **Content**: `{ "error": "Event not found" }`|
|                   | **Code**: 500 Internal Server Error          |
|                   | **Content**: `{ "error": "Error message here" }` |
| **Description**   | Deletes a specific event by its ID, removing it from the database entirely. |

### Edit Event

| Aspect            | Details                                       |
|-------------------|-----------------------------------------------|
| **Route**         | `/event/edit/:eventId`                              |
| **HTTP Method**   | PATCH                                         |
| **Headers**       | `Authorization`: Bearer Token, `Content-Type`: application/json |
| **Query Parameters** | `eventId` (UUID): ID of the event to edit  |
| **Request Body**  | `{ "Title": "String", "Description": "String", "Location": "String", "Date": "Date", "Duration": "Integer" }` |
| **Success Response** | **Code**: 200 OK                         |
|                   | **Content**: `{ "message": "Event updated successfully" }` |
| **Error Response**| **Code**: 404 Not Found                      |
|                   | **Content**: `{ "error": "Event not found" }`|
|                   | **Code**: 500 Internal Server Error          |
|                   | **Content**: `{ "error": "Error message here" }` |
| **Description**   | Updates an existing event with new details as provided, allowing modifications to title, description, location, date, and duration. |

## Question Endpoints

### Edit Question

| Aspect            | Details                                       |
|-------------------|-----------------------------------------------|
| **Route**         | `/question/edit-question/:questionId`                  |
| **HTTP Method**   | PATCH                                         |
| **Headers**       | `Authorization`: Bearer Token, `Content-Type`: application/json |
| **Query Parameters** | `questionId` (UUID): ID of the question to edit |
| **Request Body**  | `{ "question": "New Question?", "description": "New description", "date": "2021-01-01T00:00:00.000Z", "duration": 60 }` |
| **Success Response** | **Code**: 200 OK                         |
|                   | **Content**: `{ "message": "Question updated successfully", "question": {...} }` |
| **Error Response**| **Code**: 404 Not Found                      |
|                   | **Content**: `{ "error": "Question not found" }`|
|                   | **Code**: 500 Internal Server Error          |
|                   | **Content**: `{ "error": "Error message here" }` |
| **Description**   | Updates an existing question with new details as provided. |

### Delete Question

| Aspect            | Details                                       |
|-------------------|-----------------------------------------------|
| **Route**         | `/question/delete-question/:questionId`                |
| **HTTP Method**   | DELETE                                        |
| **Headers**       | `Authorization`: Bearer Token, `Content-Type`: application/json |
| **Query Parameters** | `questionId` (UUID): ID of the question to delete |
| **Request Body**  | None                                          |
| **Success Response** | **Code**: 200 OK                         |
|                   | **Content**: `{ "message": "Question and all related answers deleted successfully" }` |
| **Error Response**| **Code**: 404 Not Found                      |
|                   | **Content**: `{ "error": "Question not found" }`|
|                   | **Code**: 500 Internal Server Error          |
|                   | **Content**: `{ "error": "Error message here" }` |
| **Description**   | Deletes a question and automatically removes all related answers to maintain data integrity. |

## Answer Endpoints

### Submit Answers

| Aspect               | Details                                              |
|----------------------|------------------------------------------------------|
| **Route**            | `/answer/submit-answer`                              |
| **HTTP Method**      | POST                                                 |
| **Headers**          | `Authorization`: Bearer Token, `Content-Type`: application/json |
| **Query Parameters** | None                                                 |
| **Request Body**     | `{ "pollId": "UUID", "answers": [{"questionId": "UUID", "optionId": "UUID"}, ...] }` |
| **Success Response** | **Code**: 200 OK                                     |
|                      | **Content**: `{ "message": "Answers submitted successfully" }` |
| **Error Response**   | **Code**: 400 Bad Request                            |
|                      | **Content**: `{ "error": "All questions must be answered" }` |
|                      | **Code**: 403 Forbidden                              |
|                      | **Content**: `{ "error": "Poll is closed" }`         |
|                      | **Code**: 404 Not Found                              |
|                      | **Content**: `{ "error": "Poll not found" }`         |
|                      | **Code**: 500 Internal Server Error                  |
|                      | **Content**: `{ "error": "Internal Server Error", "details": "error message" }` |
| **Description**      | This endpoint allows users to submit their answers for all questions associated with a specific poll. It validates that all questions are answered, the answers belong to the correct options, and the user is a member of the poll's group. |
