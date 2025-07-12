# Auth API Documentation

## Endpoints

### Register (Sign Up)

- **URL:** `/api/v1/auth/signup`
- **Method:** `POST`
- **Description:** Register a new user account.
- **Request Body:**
  ```json
  {
    "name": "string (5-16 chars)",
    "email": "string (valid email)",
    "password": "string (min 8 chars)"
  }
  ```
- **Responses:**
  - `201 Created`
    ```json
    {
      "success": true,
      "msg": "created",
      "token": "<jwt_token>",
      "user": { "name": "<user_name>" }
    }
    ```
  - `400 Bad Request` (validation or duplicate email)
    ```json
    { "success": false, "message": "Please provide a valid name!" }
    { "success": false, "message": "User with the email already exists!" }
    ```
  - `500 Internal Server Error`
    ```json
    { "success": false, "message": "Something went wrong!" }
    ```

---

### Login

- **URL:** `/api/v1/auth/login`
- **Method:** `POST`
- **Description:** Authenticate a user and receive a JWT token.
- **Request Body:**
  ```json
  {
    "email": "string (valid email)",
    "password": "string (min 8 chars)"
  }
  ```
- **Responses:**
  - `201 Created`
    ```json
    {
      "success": true,
      "msg": "authenticated",
      "token": "<jwt_token>",
      "user": { "name": "<user_name>" }
    }
    ```
  - `400 Bad Request` (missing credentials)
    ```json
    { "success": false, "message": "Please provide the email and password!" }
    ```
  - `401 Unauthorized` (invalid credentials)
    ```json
    { "success": false, "message": "Invalid Credentials!" }
    ```

---

## Notes

- All responses are in JSON format.
- On successful registration or login, a JWT token is returned. Store this token on the client and send it in the `Authorization` header as `Bearer <token>` for protected requests.
- Input validation is performed on the backend for all fields.
- No Mongoose or ODM is used; all database operations are performed with the native MongoDB driver.

---

## Example Usage

**Register:**

```bash
curl -X POST http://localhost:3001/api/v1/auth/signup \
  -H "Content-Type: application/json" \
  -d '{"name": "JohnDoe", "email": "john@example.com", "password": "password123"}'
```

**Login:**

```bash
curl -X POST http://localhost:3001/api/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email": "john@example.com", "password": "password123"}'
```
