# Fix Login Issues - Step by Step Guide

## Problem
Login fails with "Login failed" error message.

## Solution Steps

### Step 1: Reset Users via API (Easiest Method)

1. **Make sure your Spring Boot app is running** on `http://localhost:8080`

2. **Open Postman, curl, or browser** and call this endpoint:
   ```
   POST http://localhost:8080/api/auth/reset-users
   ```

   Using curl:
   ```bash
   curl -X POST http://localhost:8080/api/auth/reset-users
   ```

   Using PowerShell:
   ```powershell
   Invoke-RestMethod -Uri "http://localhost:8080/api/auth/reset-users" -Method POST
   ```

3. This will:
   - Delete all existing users
   - Create new users with correct BCrypt password hashes
   - Use passwords: customer123, kitchen123, manager123

### Step 2: Verify Users in MongoDB

Run this in MongoDB Compass Shell:
```javascript
use gustoso

// Check if users exist
db.users.find().pretty()

// You should see:
// - customer (role: CUSTOMER)
// - kitchen (role: KITCHEN_STAFF)  
// - manager (role: MANAGER)
```

### Step 3: Test Login

**Customer Login:**
- Username: `customer`
- Password: `customer123`
- Role: Select `CUSTOMER` from dropdown

**Kitchen Login:**
- Username: `kitchen`
- Password: `kitchen123`
- Role: Select `KITCHEN_STAFF` from dropdown

**Manager Login:**
- Username: `manager`
- Password: `manager123`
- Role: Select `MANAGER` from dropdown

### Step 4: Check Backend Logs

If login still fails, check your Spring Boot console for error messages. The updated code now shows:
- "Invalid username or role" - if username/role combination doesn't exist
- "Invalid password" - if password doesn't match
- "User account is inactive" - if user is not active

### Alternative: Manual Reset via MongoDB

If API doesn't work, manually delete users in MongoDB Compass:

```javascript
use gustoso

// Delete all users
db.users.deleteMany({})
```

Then **restart your Spring Boot application**. The `DataInitializer` will automatically create users with correct password hashes.

## Common Issues

### Issue 1: Users don't exist
**Solution:** Run the reset-users endpoint or restart Spring Boot app

### Issue 2: Wrong password hash
**Solution:** Users must be created by Spring Boot (which uses BCrypt) or use the reset endpoint

### Issue 3: Role case mismatch
**Solution:** Make sure you select the exact role from dropdown:
- `CUSTOMER` (not "customer" or "Customer")
- `KITCHEN_STAFF` (not "kitchen" or "Kitchen Staff")
- `MANAGER` (not "manager" or "Manager")

### Issue 4: User not active
**Solution:** Check in MongoDB:
```javascript
db.users.findOne({username: "customer"})
// Make sure active: true
```

## Test Login Directly via API

Test the login endpoint directly:

```bash
curl -X POST http://localhost:8080/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username":"customer","password":"customer123","role":"CUSTOMER"}'
```

This will show you the exact error message if login fails.

