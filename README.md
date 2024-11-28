# URL shortener API

Simple API for shortening URLs.

## Setup Instructions

### Prerequisites

- [Node.js](https://nodejs.org/)
- [PostgreSQL](https://www.postgresql.org/)
- `.env` file configured (see `.env.example`)

### Installation

1. Clone the repository:

2. Install dependencies:

   ```bash
   npm i
   ```

3. Configure .env file:

4. Run database migrations:

   ```bash
   npx prisma migrate dev
   ```

5. Start the development server:
   ```bash
   npm run dev
   ```

## API Documentation

### Base URL

- `http://localhost:3000`

### Endpoints

#### **Shorten URL**

- **POST** `/shorten`
- **Request Body**:
  ```json
  {
    "longUrl": "https://example.com"
  }
  ```
- **Success Response**:
  - `201 Created`
  ```json
  {
    "shortCode": "CdYm3J2iu",
    "shortUrl": "http://localhost:3000/CdYm3J2iu",
    "longUrl": "https://example.com"
  }
  ```
- **Error Response**:
  - `400 Bad Request`
  ```json
  {
    "error": "Invalid url provided"
  }
  ```

#### **Redirect to Long URL**

- **GET** `/:shortCode`
- **Success Response**:
  - Redirects to the original `longUrl`.
- **Error Response**:
  - `404 Not Found`
  ```json
  {
    "error": "Url not found"
  }
  ```

#### **Delete Short URL**

- **DELETE** `/:shortCode`
- **Success Response**:
  - `204 No Content`
- **Error Response**:
  - `404 Not Found`
  ```json
  {
    "error": "Url not found"
  }
  ```
