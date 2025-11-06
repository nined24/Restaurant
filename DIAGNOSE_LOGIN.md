# Diagnose Login Issues

## Step 1: Check if Backend is Running

Open a new terminal and check if Spring Boot is running:

```powershell
# Check if port 8080 is in use
netstat -ano | findstr :8080
```

If nothing shows up, **your backend is NOT running!**

**Start the backend:**
```bash
./mvnw.cmd spring-boot:run
```

Wait for the message: "Started RestaurantApplication"

## Step 2: Test Backend API Directly

Open browser and go to:
```
http://localhost:8080/api/auth/reset-users
```

You should see a JSON response (or use POST method).

Or use PowerShell:
```powershell
Invoke-RestMethod -Uri "http://localhost:8080/api/auth/reset-users" -Method POST
```

## Step 3: Check Browser Console

1. Open your React app (http://localhost:3000)
2. Press F12 to open Developer Tools
3. Go to **Console** tab
4. Try to login
5. Look for error messages - they will show the exact problem

## Step 4: Check Network Tab

1. In Developer Tools, go to **Network** tab
2. Try to login
3. Click on the `/api/auth/login` request
4. Check:
   - **Status Code** (should be 200 for success, 401 for unauthorized)
   - **Response** tab - shows the exact error message from backend
   - **Headers** tab - check if CORS headers are present

## Step 5: Verify Users in MongoDB

Run this in MongoDB Compass Shell:
```javascript
use gustoso

// Check if customer exists
var customer = db.users.findOne({username: "customer", role: "CUSTOMER"})
if (customer) {
    print("✓ Customer exists")
    print("  Username: " + customer.username)
    print("  Role: " + customer.role)
    print("  Active: " + customer.active)
    print("  Password hash: " + customer.password.substring(0, 30) + "...")
} else {
    print("✗ Customer NOT found!")
}

// List all users
print("\nAll users:")
db.users.find().forEach(function(u) {
    print("  - " + u.username + " (" + u.role + ")")
})
```

## Common Issues & Solutions

### Issue 1: Backend Not Running
**Symptom:** 403 Forbidden or connection refused
**Solution:** Start Spring Boot with `./mvnw.cmd spring-boot:run`

### Issue 2: CORS Error
**Symptom:** Browser console shows CORS error
**Solution:** Check if backend is running on port 8080 and React on 3000

### Issue 3: User Doesn't Exist
**Symptom:** "Invalid username or role" error
**Solution:** Run reset endpoint: `POST http://localhost:8080/api/auth/reset-users`

### Issue 4: Wrong Password Hash
**Symptom:** "Invalid password" error
**Solution:** Run reset endpoint to recreate users with correct hashes

### Issue 5: Role Case Mismatch
**Symptom:** "Invalid username or role" even with correct credentials
**Solution:** Make sure role is exactly: `CUSTOMER`, `KITCHEN_STAFF`, or `MANAGER` (uppercase)

## Quick Fix Command

Run this in PowerShell (make sure backend is running):

```powershell
# Reset users
Invoke-RestMethod -Uri "http://localhost:8080/api/auth/reset-users" -Method POST

# Test login
$body = @{username='customer';password='customer123';role='CUSTOMER'} | ConvertTo-Json
Invoke-RestMethod -Uri "http://localhost:8080/api/auth/login" -Method POST -Body $body -ContentType "application/json"
```

If both commands work, the issue is in the frontend. Check browser console for errors.

