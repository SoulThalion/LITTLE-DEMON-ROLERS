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
GET    | /user/profile    | YES   | user | Get Own Profile          |                                                                             | { message: 'User fetched successfully', data: [`user`]}
GET    | /user/:userId    | YES   | user | Get One User             | `params: userId`                                                            | { message: 'User fetched successfully', data: [`user`]}
POST   | /user            | YES   | admin| Create one user          | `userName`, `nickName`, `avatar`, `email`, `role`, `password`, `level`      | { message: 'User created successfully', data: [`user`]}
PATCH  | /user/profile    | YES   | user | Update own profile       | `userName`, `nickName`, `avatar`, `email`                                   | { message: 'User created successfully', data: [`user`]}
PATCH  | /user/password   | YES   | user | Reset password           | `newPassword`, `repeatPassword`                                             | { message: 'Password reset successfully'}
PATCH  | /user/:userId    | YES   | admin| Update one user          | `params: userId`, `userName`, `nickName`, `avatar`, `email`, `role`, `password`, `level`   | { message: 'User updated successfully', data: [`user`]}
DELETE | /user/:userId    | YES   | admin| Delete one user          |  `params: userId`                                                           | { message: 'User deleted successfully', data: [`user`]}
DELETE | /user/:userId    | YES   | user | Delete own profile       |                                                                             | { message: 'User deleted successfully', data: [`user`]}

### Game Endpoints

METHOD | ENDPOINT         | TOKEN | ROLE | DESCRIPTION              | POST PARAMS                                     | RETURNS
-------|------------------|-------|------|--------------------------|-------------------------------------------------|--------------------
GET    | /games           | YES   | user | Get All Games            |                                                 | { message: 'Games fetched successfully', data: [`game`]}
GET    | /game/:name      | YES   | user | Get One Game             |                                                 | { message: 'Game fetched successfully', data: [`game`]}
POST   | /game            | YES   | admin  | Post new Game          |  `params: title, about, system`                  | { message: 'Admin create new game successfully', data: `game`}
PATCH    | /game/:gameId/favorite   | YES   | user | Add to favorite  |  `params: gameId`                              | { message: 'User add favorite game successfully', data: `game`}
PATCH  | /game/:gameId     | YES   | admin  | Update a Game         |  `params: title, about, system`                  | { message: 'Admin update game successfully', data: `game`}
DELETE | /game/:gameID    | YES   | user | Delete a Game            |                                                  | { message: 'Game deleted successfully', data: [`game`]}

### Theme Endpoints

METHOD | ENDPOINT         | TOKEN | ROLE | DESCRIPTION              | POST PARAMS                                     | RETURNS
-------|------------------|-------|------|--------------------------|-------------------------------------------------|--------------------
GET    | /theme          | YES   | user | Get All themes            |                                                 | { message: 'Theme fetched successfully', data: [`theme`]}
GET    | /theme/:name      | YES   | user | Get One theme             |                                               | { message: 'Theme fetched successfully', data: [`theme`]}
POST   | /theme            | YES   | admin  | Post new theme          |  `params: name, description`                  | { message: 'Admin create new theme successfully', data: `theme`}
PATCH  | /theme/:themeId   | YES   | admin | Update a theme            |  `params: name, description`                 | { message: 'Admin update theme successfully', data: `theme`}
DELETE | /theme/:themeId    | YES   | admin | Delete a theme            |                                              | { message: 'Theme deleted successfully', data: [`theme`]}

### Inventory Endpoints

METHOD | ENDPOINT         | TOKEN | ROLE | DESCRIPTION              | POST PARAMS                                     | RETURNS
-------|------------------|-------|------|--------------------------|-------------------------------------------------|--------------------
GET    | /inventory       | YES   | admin | Get All items            |                                                 | { message: 'Inventory fetched successfully', data: [`inventory`]}
GET    | /inventory/:itemName  | YES   | admin | Get One Item             |                                               | { message: 'Item fetched successfully', data: [`inventory`]}
POST   | /inventory            | YES   | admin  | Post new Item          |  `params: Item, amount, gameId`                  | { message: 'Admin create new Item successfully', data: `inventory`}
PATCH  | /inventory/:itemId   | YES   | admin | Update a Item            |  `params: Item, amount, gameId`                | { message: 'Admin update Item successfully', data: `inventory`}
DELETE | /inventory/:itemId    | YES   | admin | Delete a Item            |                                              | { message: 'Item deleted successfully', data: [`inventory`]}

### Sessions Endpoints

METHOD | ENDPOINT         | TOKEN | ROLE | DESCRIPTION              | POST PARAMS                                     | RETURNS
-------|------------------|-------|------|--------------------------|-------------------------------------------------|--------------------
GET    | /session       | YES   | user | Get All sessions            |                                                 | { message: 'Sessions fetched successfully', data: [`session`]}
GET    | /session/:sessionId  | YES   | user | Get One session             |                                               | { message: 'Session fetched successfully', data: [`session`]}
POST   | /session            | YES   | admin/master  | Post new session |  `params: gameId, masterId, type, date, location, address` | { message: 'Admin or Master create new session successfully', data: `session`}
PATCH  | /session/:sessionId   | YES   | admin/master | Update a session |  `params: gameId, masterId, type, date, location, address`| { message: 'Admin or Master update session successfully', data: `session`}
DELETE | /session/:sessionId    | YES   | admin | Delete a session            |                                              | { message: 'Session deleted successfully', data: [`session`]}

### Session_player Endpoints

METHOD | ENDPOINT         | TOKEN | ROLE | DESCRIPTION              | POST PARAMS                                     | RETURNS
-------|------------------|-------|------|--------------------------|-------------------------------------------------|--------------------
GET    | /session_player  | YES   | master | Get All session_player |                                                 | { message: 'session_player fetched successfully', data: [`session_player`]}
GET    | /session_player/:sessionId  | YES   | user | Get One session_player                                          | { message: 'session_player fetched successfully', data: [`session_player`]}
POST   | /session_player  | YES   | user  | Post new session_player |  `params: sessionId, UserId, Character`       | { message: 'User create new session_player successfully', data: `session_player`}
PATCH  | /session_player/:session_playerId   | YES   | user/admin | Update a session |  `params: gameId, sessionId, Character`| { message: 'User update session_player successfully', data: `session_player`}
DELETE | /session_player/:session_playerId    | YES   | user/admin | Delete a session_player                           | { message: 'session_player deleted successfully', data: [`session_player`]}

### Master Endpoints

METHOD | ENDPOINT         | TOKEN | ROLE | DESCRIPTION              | POST PARAMS                                     | RETURNS
-------|------------------|-------|------|--------------------------|-------------------------------------------------|--------------------
GET    | /master          | YES   | user | Get All master           |                                                 | { message: 'master fetched successfully', data: [`master`]}
GET    | /master/:masterId  | YES   | user | Get One master                                          | { message: 'master fetched successfully', data: [`master`]}
POST   | /master          | YES   | admin  | Post new master       |  `params: gameId, UserId`       | { message: 'Admin create new master', data: `master`}
PATCH  | /master/:masterId   | YES   | admin | Update a master |  `params: gameId, UserId`                          | { message: 'Admin update master successfully', data: `master`}
DELETE | /master/:masterId    | YES   | admin | Delete a master                           | { message: 'master deleted successfully', data: [`master`]}

### Favorites Endpoints

METHOD | ENDPOINT         | TOKEN | ROLE | DESCRIPTION              | POST PARAMS                                     | RETURNS
-------|------------------|-------|------|--------------------------|-------------------------------------------------|--------------------
GET    | /favorites       | YES   | user | Get All favorites        |                                                 | { message: 'favorites fetched successfully', data: [`favorites`]}
GET    | /favorites/:userId  | YES   | user | Get One User favorites                                                  | { message: 'favorites fetched successfully', data: [`favorites`]}
POST   | /favorite          | YES   | user  | Post new favorite       |  `params: gameId, UserId`       | { message: 'User create new favorite', data: `favorites`}
PATCH  | /favorite/:favoriteId   | YES   | user | Update a favorite |  `params: gameId, UserId`                          | { message: 'User update favorites successfully', data: `favorites`}
DELETE | /favorite/:favoriteId    | YES   | user | Delete a favorite                           | { message: 'favorite deleted successfully', data: [`favorites`]}

### User_Games Endpoints

METHOD | ENDPOINT         | TOKEN | ROLE | DESCRIPTION              | POST PARAMS                                     | RETURNS
-------|------------------|-------|------|--------------------------|-------------------------------------------------|--------------------
GET    | /user_games       | YES   | user | Get All user_games        |                                                 | { message: 'user_games fetched successfully', data: [`user_games`]}
GET    | /user_games/:userId  | YES   | user | Get One User user_games                                                  | { message: 'user_games fetched successfully', data: [`user_games`]}
POST   | /user_games          | YES   | user  | Post new user_games       |  `params: gameId, UserId`       | { message: 'User create new user_games', data: `user_games`}
PATCH  | /user_games/:user_gamesId   | YES   | user | Update a favorite |  `params: gameId, UserId`                          | { message: 'User update user_games successfully', data: `user_games`}
DELETE | /user_games/:user_gamesId    | YES   | user | Delete a user_games                           | { message: 'user_games deleted successfully', data: [`user_games`]}

### Game_themes Endpoints

METHOD | ENDPOINT         | TOKEN | ROLE | DESCRIPTION              | POST PARAMS                                     | RETURNS
-------|------------------|-------|------|--------------------------|-------------------------------------------------|--------------------
GET    | /game_themes     | YES   | user | Get All game_themes      |                                                 | { message: 'game_themes fetched successfully', data: [`game_themes`]}
GET    | /game_themes/:themeId  | YES   | user | Get One game_themes                                          | { message: 'game_themes fetched successfully', data: [`game_themes`]}
POST   | /game_themes          | YES   | admin  | Post new game_themes       |  `params: gameId, themeId`       | { message: 'Admin create new game_themes', data: `game_themes`}
PATCH  | /game_themes/:game_themesId   | YES   | admin | Update a game_themes |  `params: gameId, themeId`             | { message: 'Admin update game_themes successfully', data: `game_themes`}
DELETE | /game_themes/:game_themesId    | YES   | admin | Delete a game_themes                           | { message: 'game_themes deleted successfully', data: [`game_themes`]}
