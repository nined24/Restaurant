# Test Login Script
# Run this to test login functionality

Write-Host "=== Testing Login API ===" -ForegroundColor Cyan

# Test Customer Login
Write-Host "`nTesting Customer Login..." -ForegroundColor Yellow
$customerBody = @{
    username = "customer"
    password = "customer123"
    role = "CUSTOMER"
} | ConvertTo-Json

try {
    $response = Invoke-RestMethod -Uri "http://localhost:8080/api/auth/login" -Method POST -Body $customerBody -ContentType "application/json"
    Write-Host "✓ Login SUCCESS!" -ForegroundColor Green
    Write-Host "Token received: $($response.token.Substring(0, 50))..." -ForegroundColor Green
    Write-Host "Username: $($response.username)" -ForegroundColor Green
    Write-Host "Role: $($response.role)" -ForegroundColor Green
} catch {
    Write-Host "✗ Login FAILED!" -ForegroundColor Red
    Write-Host "Error: $($_.Exception.Message)" -ForegroundColor Red
    if ($_.ErrorDetails.Message) {
        Write-Host "Details: $($_.ErrorDetails.Message)" -ForegroundColor Red
    }
}

# Test Kitchen Login
Write-Host "`nTesting Kitchen Staff Login..." -ForegroundColor Yellow
$kitchenBody = @{
    username = "kitchen"
    password = "kitchen123"
    role = "KITCHEN_STAFF"
} | ConvertTo-Json

try {
    $response = Invoke-RestMethod -Uri "http://localhost:8080/api/auth/login" -Method POST -Body $kitchenBody -ContentType "application/json"
    Write-Host "✓ Login SUCCESS!" -ForegroundColor Green
} catch {
    Write-Host "✗ Login FAILED!" -ForegroundColor Red
    Write-Host "Error: $($_.Exception.Message)" -ForegroundColor Red
}

# Test Manager Login
Write-Host "`nTesting Manager Login..." -ForegroundColor Yellow
$managerBody = @{
    username = "manager"
    password = "manager123"
    role = "MANAGER"
} | ConvertTo-Json

try {
    $response = Invoke-RestMethod -Uri "http://localhost:8080/api/auth/login" -Method POST -Body $managerBody -ContentType "application/json"
    Write-Host "✓ Login SUCCESS!" -ForegroundColor Green
} catch {
    Write-Host "✗ Login FAILED!" -ForegroundColor Red
    Write-Host "Error: $($_.Exception.Message)" -ForegroundColor Red
}

Write-Host "`n=== Test Complete ===" -ForegroundColor Cyan

