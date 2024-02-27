# LITTLE-DEMON-ROLERS


### Authentication Endpoints

The Authentication flow for the application is:

### User Signup/Login

METHOD | ENDPOINT         | TOKEN | ROLE | DESCRIPTION              | POST PARAMS                                                                 | RETURNS
-------|------------------|-------|------|--------------------|-----------------------------------------------------------------------------------|--------------------
POST   | /auth/signup     | -     | user | User Signup              | `userName`, `nickName`, `avatar`, `email`, `password`                       | { message: 'User signed up successfully', data: `token`}
POST   | /auth/login      | -     | user | User Login               | `email`, `password`                                                         | { message: 'User logged up successfully', data: `token`}

### User Endpoints

METHOD | ENDPOINT         | TOKEN | ROLE | DESCRIPTION              | POST PARAMS                                                                 | RETURNS
-------|------------------|-------|------|--------------------|-----------------------------------------------------------------------------------|--------------------
GET    | /user            | YES   | user | Get All Users            |                                                                             | { message: 'Users fetched successfully', data: [`user`]}
GET    | /user/profile    | YES   | user | Get Own Profile          |                                                                             |  { message: 'User fetched successfully', data: [`user`]}
GET    | /user/:userId    | YES   | user | Get One User             | `params: userId`                                                            |  { message: 'User fetched successfully', data: [`user`]}
POST   | /user            | YES   | admin| Create one user          | `userName`, `nickName`, `avatar`, `email`, `role`, `password`, `level`      | { message: 'User created successfully', data: [`user`]}
PUT    | /user/profile    | YES   | user | Update own profile       | `userName`, `nickName`, `avatar`, `email`                                   | { message: 'User created successfully', data: [`user`]}
PUT    | /user/password   | YES   | user | Reset password           | `newPassword`, `repeatPassword`                                             | { message: 'Password reset successfully'}
PUT    | /user/:userId    | YES   | admin| Update one user          | `params: userId`, `userName`, `nickName`, `avatar`, `email`, `role`, `password`, `level`   | { message: 'User updated successfully', data: [`user`]}
DELETE | /user/:userId    | YES   | admin| Delete one user          |  `params: userId`                                                           | { message: 'User deleted successfully', data: [`user`]}
DELETE | /user/profile    | YES   | user | Delete own profile       |                                                                             | { message: 'User deleted successfully', data: [`user`]}

### Post Endpoints

METHOD | ENDPOINT         | TOKEN | ROLE | DESCRIPTION              | POST PARAMS                                     | RETURNS
-------|------------------|-------|------|--------------------------|-------------------------------------------------|--------------------
GET    | /post            | YES   | user | Get All Posts          |                                                    | { message: 'Posts fetched successfully', data: [`post`]}
GET    | /post/profile    | YES   | user | Get Own Posts          |                                                    | { message: 'Posts fetched successfully', data: [`post`]}
GET    | /post/:postId       | YES   | user | Get One Post           |  `params: postId`                               | { message: 'Post fetched successfully', data: `post`}
GET    | /post/:userId/all    | YES   | user | Get One User's posts   |  `params: userId`                              | { message: 'User's posts fetched successfully', data: [`post`]}
PUT    | /post/:postId/like   | YES   | user | Like one post          |  `params: postId`                              | { message: 'User liked post successfully', data: `post`}
