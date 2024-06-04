# API Endpoint Documentation

## Examples

### Template for New Endpoints

| Aspect            | Details                                       |
|-------------------|-----------------------------------------------|
| **Route**         | `/example-route`                              |
| **HTTP Method**   | POST/GET/PUT/DELETE                           |
| **Headers**       | `Content-Type`: application/json              |
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
| **Headers**       | `Content-Type`: application/json              |
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
| **Route**         | `/group/delete/:groupId`                      |
| **HTTP Method**   | DELETE                                        |
| **Headers**       | `Content-Type`: application/json              |
| **Query Parameters** | `groupId` (UUID): ID of the group to delete |
| **Request Body**  | None                                          |
| **Success Response** | **Code**: 200 OK                         |
|                   | **Content**: `{ "message": "Group successfully deleted" }` |
| **Error Response**| **Code**: 404 Not Found                      |
|                   | **Content**: `{ "error": "Group not found" }`|
|                   | **Code**: 500 Internal Server Error          |
|                   | **Content**: `{ "error": "Error message here" }` |
| **Description**   | Deletes a group by its ID. Only authorized users can delete a group. |

### Get Group Information

| Aspect            | Details                                       |
|-------------------|-----------------------------------------------|
| **Route**         | `/group/info/:groupId`                        |
| **HTTP Method**   | GET                                           |
| **Headers**       | `Content-Type`: application/json              |
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
| **Headers**       | `Content-Type`: application/json              |
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
| **Route**         | `/group/add-member`                           |
| **HTTP Method**   | POST                                          |
| **Headers**       | `Content-Type`: application/json              |
| **Query Parameters** | None                                      |
| **Request Body**  | `{ "groupId": "UUID", "accountId": "UUID" }` |
| **Success Response** | **Code**: 201 Created                    |
|                   | **Content**: `{ "message": "Member added successfully", "member": { "groupId": "UUID", "accountId": "UUID" } }` |
| **Error Response**| **Code**: 500 Internal Server Error          |
|                   | **Content**: `{ "error": "Error message here" }` |
| **Description**   | Adds a member to a group by creating a new group member relationship. |

### Remove Member from Group

| Aspect            | Details                                       |
|-------------------|-----------------------------------------------|
| **Route**         | `/group/remove-member`                        |
| **HTTP Method**   | DELETE                                        |
| **Headers**       | `Content-Type`: application/json              |
| **Query Parameters** | None                                      |
| **Request Body**  | `{ "groupId": "UUID", "accountId": "UUID" }` |
| **Success Response** | **Code**: 200 OK                         |
|                   | **Content**: `{ "message": "Member removed successfully" }` |
| **Error Response**| **Code**: 404 Not Found                      |
|                   | **Content**: `{ "error": "Member not found" }`|
|                   | **Code**: 500 Internal Server Error          |
|                   | **Content**: `{ "error": "Error message here" }` |
| **Description**   | Removes a member from a group by deleting the group member relationship. This operation requires verification that the user has the necessary rights to modify group membership. |
