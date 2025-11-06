// MongoDB Setup Script for Gustoso Restaurant Management System
// Run this in MongoDB Compass Shell or MongoDB Shell

// Switch to gustoso database
use gustoso

// ============================================
// 1. USERS COLLECTION
// ============================================
// Note: Passwords are BCrypt hashed
// Default passwords: customer123, kitchen123, manager123

db.users.deleteMany({})

db.users.insertMany([
  {
    username: "customer",
    email: "customer@gustoso.com",
    password: "$2a$10$N.zmdr9k7uOCQb376NoUnuTJ8iAt6Z5EHsM8lE9lBOsl7iwm8H5Q4O", // customer123
    role: "CUSTOMER",
    active: true
  },
  {
    username: "kitchen",
    email: "kitchen@gustoso.com",
    password: "$2a$10$N.zmdr9k7uOCQb376NoUnuTJ8iAt6Z5EHsM8lE9lBOsl7iwm8H5Q4O", // kitchen123
    role: "KITCHEN_STAFF",
    active: true
  },
  {
    username: "manager",
    email: "manager@gustoso.com",
    password: "$2a$10$N.zmdr9k7uOCQb376NoUnuTJ8iAt6Z5EHsM8lE9lBOsl7iwm8H5Q4O", // manager123
    role: "MANAGER",
    active: true
  }
])

print("Users inserted: " + db.users.countDocuments())

// ============================================
// 2. TABLES COLLECTION
// ============================================

db.tables.deleteMany({})

db.tables.insertMany([
  {
    tableNumber: "T1",
    qrCode: "TABLE_T1_12345678",
    available: true,
    capacity: 4
  },
  {
    tableNumber: "T2",
    qrCode: "TABLE_T2_87654321",
    available: true,
    capacity: 4
  },
  {
    tableNumber: "T3",
    qrCode: "TABLE_T3_11223344",
    available: true,
    capacity: 6
  },
  {
    tableNumber: "T4",
    qrCode: "TABLE_T4_55667788",
    available: true,
    capacity: 4
  },
  {
    tableNumber: "T5",
    qrCode: "TABLE_T5_99887766",
    available: true,
    capacity: 2
  },
  {
    tableNumber: "T6",
    qrCode: "TABLE_T6_44332211",
    available: true,
    capacity: 4
  },
  {
    tableNumber: "T7",
    qrCode: "TABLE_T7_77889900",
    available: true,
    capacity: 8
  },
  {
    tableNumber: "T8",
    qrCode: "TABLE_T8_00112233",
    available: true,
    capacity: 4
  },
  {
    tableNumber: "T9",
    qrCode: "TABLE_T9_44556677",
    available: true,
    capacity: 6
  },
  {
    tableNumber: "T10",
    qrCode: "TABLE_T10_88990011",
    available: true,
    capacity: 4
  }
])

print("Tables inserted: " + db.tables.countDocuments())

// ============================================
// 3. MENU ITEMS COLLECTION
// ============================================

db.menu_items.deleteMany({})

db.menu_items.insertMany([
  // Appetizers
  {
    name: "Bruschetta",
    description: "Toasted bread with tomatoes, garlic, and basil",
    price: NumberDecimal("8.99"),
    category: "Appetizers",
    imageUrl: "",
    available: true,
    hidden: false
  },
  {
    name: "Caesar Salad",
    description: "Fresh romaine lettuce with caesar dressing",
    price: NumberDecimal("10.99"),
    category: "Appetizers",
    imageUrl: "",
    available: true,
    hidden: false
  },
  {
    name: "Garlic Bread",
    description: "Crispy bread with garlic butter and herbs",
    price: NumberDecimal("5.99"),
    category: "Appetizers",
    imageUrl: "",
    available: true,
    hidden: false
  },
  {
    name: "Mozzarella Sticks",
    description: "Fried mozzarella with marinara sauce",
    price: NumberDecimal("7.99"),
    category: "Appetizers",
    imageUrl: "",
    available: true,
    hidden: false
  },
  
  // Main Courses
  {
    name: "Margherita Pizza",
    description: "Classic pizza with tomato, mozzarella, and basil",
    price: NumberDecimal("14.99"),
    category: "Main Courses",
    imageUrl: "",
    available: true,
    hidden: false
  },
  {
    name: "Grilled Salmon",
    description: "Fresh salmon with vegetables and rice",
    price: NumberDecimal("22.99"),
    category: "Main Courses",
    imageUrl: "",
    available: true,
    hidden: false
  },
  {
    name: "Beef Steak",
    description: "Tender beef steak with mashed potatoes",
    price: NumberDecimal("28.99"),
    category: "Main Courses",
    imageUrl: "",
    available: true,
    hidden: false
  },
  {
    name: "Chicken Parmesan",
    description: "Breaded chicken with marinara and mozzarella",
    price: NumberDecimal("18.99"),
    category: "Main Courses",
    imageUrl: "",
    available: true,
    hidden: false
  },
  {
    name: "Pasta Carbonara",
    description: "Creamy pasta with bacon and parmesan",
    price: NumberDecimal("16.99"),
    category: "Main Courses",
    imageUrl: "",
    available: true,
    hidden: false
  },
  {
    name: "Vegetarian Risotto",
    description: "Creamy rice with seasonal vegetables",
    price: NumberDecimal("15.99"),
    category: "Main Courses",
    imageUrl: "",
    available: true,
    hidden: false
  },
  
  // Desserts
  {
    name: "Tiramisu",
    description: "Classic Italian dessert",
    price: NumberDecimal("7.99"),
    category: "Desserts",
    imageUrl: "",
    available: true,
    hidden: false
  },
  {
    name: "Chocolate Cake",
    description: "Rich chocolate cake with cream",
    price: NumberDecimal("6.99"),
    category: "Desserts",
    imageUrl: "",
    available: true,
    hidden: false
  },
  {
    name: "Cheesecake",
    description: "New York style cheesecake with berries",
    price: NumberDecimal("8.99"),
    category: "Desserts",
    imageUrl: "",
    available: true,
    hidden: false
  },
  {
    name: "Ice Cream Sundae",
    description: "Vanilla ice cream with chocolate sauce and nuts",
    price: NumberDecimal("5.99"),
    category: "Desserts",
    imageUrl: "",
    available: true,
    hidden: false
  },
  
  // Beverages
  {
    name: "Coca Cola",
    description: "Refreshing soft drink",
    price: NumberDecimal("3.99"),
    category: "Beverages",
    imageUrl: "",
    available: true,
    hidden: false
  },
  {
    name: "Fresh Orange Juice",
    description: "Freshly squeezed orange juice",
    price: NumberDecimal("4.99"),
    category: "Beverages",
    imageUrl: "",
    available: true,
    hidden: false
  },
  {
    name: "Coffee",
    description: "Freshly brewed coffee",
    price: NumberDecimal("3.49"),
    category: "Beverages",
    imageUrl: "",
    available: true,
    hidden: false
  },
  {
    name: "Iced Tea",
    description: "Refreshing iced tea",
    price: NumberDecimal("3.99"),
    category: "Beverages",
    imageUrl: "",
    available: true,
    hidden: false
  },
  {
    name: "Water",
    description: "Bottled water",
    price: NumberDecimal("2.99"),
    category: "Beverages",
    imageUrl: "",
    available: true,
    hidden: false
  }
])

print("Menu items inserted: " + db.menu_items.countDocuments())

// ============================================
// 4. INVENTORY COLLECTION
// ============================================

db.inventory.deleteMany({})

db.inventory.insertMany([
  {
    itemName: "Bruschetta",
    quantity: 50,
    minThreshold: 10,
    lowStock: false,
    unit: "pieces"
  },
  {
    itemName: "Caesar Salad",
    quantity: 30,
    minThreshold: 10,
    lowStock: false,
    unit: "pieces"
  },
  {
    itemName: "Margherita Pizza",
    quantity: 20,
    minThreshold: 5,
    lowStock: false,
    unit: "pieces"
  },
  {
    itemName: "Grilled Salmon",
    quantity: 15,
    minThreshold: 5,
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
    itemName: "Tiramisu",
    quantity: 25,
    minThreshold: 10,
    lowStock: false,
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

print("Inventory items inserted: " + db.inventory.countDocuments())

// ============================================
// SUMMARY
// ============================================
print("\n=== Database Setup Complete ===")
print("Users: " + db.users.countDocuments())
print("Tables: " + db.tables.countDocuments())
print("Menu Items: " + db.menu_items.countDocuments())
print("Inventory Items: " + db.inventory.countDocuments())

