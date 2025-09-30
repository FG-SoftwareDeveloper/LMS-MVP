# Authentication Testing Script

## Prerequisites
1. Set up your database connection in Railway environment variables
2. Deploy the updated backend to Railway

## Test Sign Up
```bash
curl -X POST https://lms-mvp-production.up.railway.app/api/v1/auth/signup \
  -H "Content-Type: application/json" \
  -d '{
    "username": "testuser",
    "email": "test@example.com",
    "password": "password123",
    "firstName": "Test",
    "lastName": "User"
  }'
```

## Test Sign In
```bash
curl -X POST https://lms-mvp-production.up.railway.app/api/v1/auth/signin \
  -H "Content-Type: application/json" \
  -d '{
    "usernameOrEmail": "testuser",
    "password": "password123"
  }'
```

## Test Protected Endpoint (replace JWT_TOKEN with actual token from sign in)
```bash
curl -X GET https://lms-mvp-production.up.railway.app/api/v1/auth/me \
  -H "Authorization: Bearer JWT_TOKEN"
```

## Database Connection Test
```bash
curl -X GET https://lms-mvp-production.up.railway.app/api/v1/db-test
```