# MongoDB Setup Commands for Gustoso

## Quick Setup Instructions

### Option 1: Using MongoDB Compass Shell
1. Open MongoDB Compass
2. Connect to `mongodb://localhost:27017/`
3. Select the `gustoso` database
4. Click on the "Shell" tab (or press `Ctrl+Shift+S`)
5. Copy and paste the commands from `mongodb-setup.js` file
6. Press Enter to execute

### Option 2: Using MongoDB Shell (mongosh)
```bash
mongosh mongodb://localhost:27017/
```
Then copy and paste the commands.

---

## Individual Commands (Copy Each Section)

### 1. Switch to Database
```javascript
use gustoso
```

### 2. Insert Users
```javascript
db.users.insertMany([
  {
    username: "customer",
    email: "customer@gustoso.com",
    password: "$2a$10$N.zmdr9k7uOCQb376NoUnuTJ8iAt6Z5EHsM8lE9lBOsl7iwm8H5Q4O",
    role: "CUSTOMER",
    active: true
  },
  {
    username: "kitchen",
    email: "kitchen@gustoso.com",
    password: "$2a$10$N.zmdr9k7uOCQb376NoUnuTJ8iAt6Z5EHsM8lE9lBOsl7iwm8H5Q4O",
    role: "KITCHEN_STAFF",
    active: true
  },
  {
    username: "manager",
    email: "manager@gustoso.com",
    password: "$2a$10$N.zmdr9k7uOCQb376NoUnuTJ8iAt6Z5EHsM8lE9lBOsl7iwm8H5Q4O",
    role: "MANAGER",
    active: true
  }
])
```

**Note:** The password hash corresponds to: `customer123`, `kitchen123`, `manager123`

### 3. Insert Tables
```javascript
db.tables.insertMany([
  { tableNumber: "T1", qrCode: "TABLE_T1_12345678", available: true, capacity: 4 },
  { tableNumber: "T2", qrCode: "TABLE_T2_87654321", available: true, capacity: 4 },
  { tableNumber: "T3", qrCode: "TABLE_T3_11223344", available: true, capacity: 6 },
  { tableNumber: "T4", qrCode: "TABLE_T4_55667788", available: true, capacity: 4 },
  { tableNumber: "T5", qrCode: "TABLE_T5_99887766", available: true, capacity: 2 },
  { tableNumber: "T6", qrCode: "TABLE_T6_44332211", available: true, capacity: 4 },
  { tableNumber: "T7", qrCode: "TABLE_T7_77889900", available: true, capacity: 8 },
  { tableNumber: "T8", qrCode: "TABLE_T8_00112233", available: true, capacity: 4 },
  { tableNumber: "T9", qrCode: "TABLE_T9_44556677", available: true, capacity: 6 },
  { tableNumber: "T10", qrCode: "TABLE_T10_88990011", available: true, capacity: 4 }
])
```

### 4. Insert Menu Items (Sample - Insert a few key items)
```javascript
db.menu_items.insertMany([
  {
    name: "Bruschetta",
    description: "Toasted bread with tomatoes, garlic, and basil",
    price: NumberDecimal("8.99"),
    category: "Appetizers",
    available: true,
    hidden: false
  },
  {
    name: "Caesar Salad",
    description: "Fresh romaine lettuce with caesar dressing",
    price: NumberDecimal("10.99"),
    category: "Appetizers",
    available: true,
    hidden: false
  },
  {
    name: "Margherita Pizza",
    description: "Classic pizza with tomato, mozzarella, and basil",
    price: NumberDecimal("14.99"),
    category: "Main Courses",
    available: true,
    hidden: false
  },
  {
    name: "Grilled Salmon",
    description: "Fresh salmon with vegetables and rice",
    price: NumberDecimal("22.99"),
    category: "Main Courses",
    available: true,
    hidden: false
  },
  {
    name: "Beef Steak",
    description: "Tender beef steak with mashed potatoes",
    price: NumberDecimal("28.99"),
    category: "Main Courses",
    available: true,
    hidden: false
  },
  {
    name: "Tiramisu",
    description: "Classic Italian dessert",
    price: NumberDecimal("7.99"),
    category: "Desserts",
    available: true,
    hidden: false
  },
  {
    name: "Chocolate Cake",
    description: "Rich chocolate cake with cream",
    price: NumberDecimal("6.99"),
    category: "Desserts",
    available: true,
    hidden: false
  },
  {
    name: "Coca Cola",
    description: "Refreshing soft drink",
    price: NumberDecimal("3.99"),
    category: "Beverages",
    available: true,
    hidden: false
  }
])
```

### 5. Insert Inventory
```javascript
db.inventory.insertMany([
  {
    itemName: "Bruschetta",
    quantity: 50,
    minThreshold: 10,
    lowStock: false,
    unit: "pieces"
  },
  {
    itemName: "Beef Steak",
    quantity: 8,
    minThreshold: 5,
    lowStock: true,
    unit: "pieces"
  },
  {
    itemName: "Chocolate Cake",
    quantity: 5,
    minThreshold: 10,
    lowStock: true,
    unit: "pieces"
  }
])
```

---

## Verification Commands

### Check all collections
```javascript
db.users.find().pretty()
db.tables.find().pretty()
db.menu_items.find().pretty()
db.inventory.find().pretty()
```

### Count documents
```javascript
db.users.countDocuments()
db.tables.countDocuments()
db.menu_items.countDocuments()
db.inventory.countDocuments()
```

### Clear all data (if needed)
```javascript
db.users.deleteMany({})
db.tables.deleteMany({})
db.menu_items.deleteMany({})
db.inventory.deleteMany({})
db.orders.deleteMany({})
db.payments.deleteMany({})
db.feedback.deleteMany({})
```

---

## Password Notes

The BCrypt hash `$2a$10$N.zmdr9k7uOCQb376NoUnuTJ8iAt6Z5EHsM8lE9lBOsl7iwm8H5Q4O` corresponds to:
- `customer123`
- `kitchen123`
- `manager123`

If you need to generate new password hashes, you can use an online BCrypt generator or let Spring Boot hash them automatically when users are created through the application.

