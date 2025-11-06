// MongoDB Verification Script
// Run this in MongoDB Compass Shell to check your database

use gustoso

print("\n=== DATABASE CONNECTION VERIFICATION ===\n")

// Check if users exist
print("Users in database:")
db.users.find().forEach(function(user) {
    print("  - Username: " + user.username + ", Role: " + user.role + ", Active: " + user.active)
})

print("\nTotal users: " + db.users.countDocuments())

// Check customer specifically
print("\n=== CUSTOMER ACCOUNT ===")
var customer = db.users.findOne({username: "customer", role: "CUSTOMER"})
if (customer) {
    print("✓ Customer exists")
    print("  Username: customer")
    print("  Email: " + customer.email)
    print("  Role: " + customer.role)
    print("  Active: " + customer.active)
    print("  Password Hash: " + customer.password.substring(0, 30) + "...")
} else {
    print("✗ Customer NOT found in database")
}

// Check tables
print("\n=== TABLES ===")
print("Total tables: " + db.tables.countDocuments())
db.tables.find().limit(3).forEach(function(table) {
    print("  - Table: " + table.tableNumber + ", QR Code: " + table.qrCode)
})

// Check menu items
print("\n=== MENU ITEMS ===")
print("Total menu items: " + db.menu_items.countDocuments())

// Check collections
print("\n=== COLLECTIONS ===")
db.getCollectionNames().forEach(function(name) {
    print("  - " + name + ": " + db[name].countDocuments() + " documents")
})

print("\n=== SUMMARY ===")
print("If customer doesn't exist, you need to:")
print("1. Delete existing users: db.users.deleteMany({})")
print("2. Restart Spring Boot application (it will auto-create users)")
print("OR manually insert customer using the commands in mongodb-setup.js")

