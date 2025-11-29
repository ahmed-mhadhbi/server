# Firestore Security Rules Explained

## Production-Ready Rules for Resteau

Here are the security rules you should use in your Firestore database. Copy and paste these into your Firebase Console → Firestore Database → Rules tab.

## Complete Rules

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    
    // ============================================
    // MENU ITEMS
    // ============================================
    // Anyone can read menu items (customers need to see the menu)
    // Only authenticated staff can create, update, or delete menu items
    match /menus/{menuId} {
      allow read: if true;
      allow write: if request.auth != null;
    }
    
    // ============================================
    // CATEGORIES
    // ============================================
    // Anyone can read categories (customers need to see categories)
    // Only authenticated staff can manage categories
    match /categories/{categoryId} {
      allow read: if true;
      allow write: if request.auth != null;
    }
    
    // ============================================
    // ORDERS
    // ============================================
    // Customers can create orders (no auth required)
    // Only authenticated staff can read, update, or delete orders
    match /orders/{orderId} {
      allow read: if request.auth != null;
      allow create: if true;
      allow update, delete: if request.auth != null;
    }
    
    // ============================================
    // WAITER CALLS
    // ============================================
    // Customers can create waiter calls (no auth required)
    // Only authenticated staff can read, update, or delete calls
    match /waiterCalls/{callId} {
      allow read: if request.auth != null;
      allow create: if true;
      allow update, delete: if request.auth != null;
    }
    
    // ============================================
    // STAFF
    // ============================================
    // Only authenticated staff can read and write staff data
    match /staff/{staffId} {
      allow read, write: if request.auth != null;
    }
    
    // ============================================
    // TABLE SESSIONS
    // ============================================
    // Anyone can read table sessions (for QR code functionality)
    // Only authenticated staff can manage table sessions
    match /tables/{tableId} {
      allow read: if true;
      allow write: if request.auth != null;
    }
  }
}
```

## Rule Explanations

### 1. **Menus Collection** (`/menus/{menuId}`)
- **Read**: `if true` - Anyone can read (customers need to see the menu)
- **Write**: `if request.auth != null` - Only logged-in staff can modify

### 2. **Categories Collection** (`/categories/{categoryId}`)
- **Read**: `if true` - Anyone can read (customers need to see categories)
- **Write**: `if request.auth != null` - Only logged-in staff can modify

### 3. **Orders Collection** (`/orders/{orderId}`)
- **Read**: `if request.auth != null` - Only staff can see orders
- **Create**: `if true` - Anyone can create orders (customers placing orders)
- **Update/Delete**: `if request.auth != null` - Only staff can modify orders

### 4. **Waiter Calls Collection** (`/waiterCalls/{callId}`)
- **Read**: `if request.auth != null` - Only staff can see calls
- **Create**: `if true` - Anyone can create calls (customers calling waiter)
- **Update/Delete**: `if request.auth != null` - Only staff can resolve calls

### 5. **Staff Collection** (`/staff/{staffId}`)
- **Read/Write**: `if request.auth != null` - Only authenticated staff can access

### 6. **Tables Collection** (`/tables/{tableId}`)
- **Read**: `if true` - Anyone can read (for QR code functionality)
- **Write**: `if request.auth != null` - Only staff can manage tables

## Enhanced Rules (Optional - More Secure)

If you want more granular control with role-based access, you can use this enhanced version:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    
    // Helper function to check if user is staff
    function isStaff() {
      return request.auth != null && 
             exists(/databases/$(database)/documents/staff/$(request.auth.uid));
    }
    
    // Helper function to check if user is admin
    function isAdmin() {
      return request.auth != null && 
             get(/databases/$(database)/documents/staff/$(request.auth.uid)).data.role == 'admin';
    }
    
    match /menus/{menuId} {
      allow read: if true;
      allow write: if isStaff();
    }
    
    match /categories/{categoryId} {
      allow read: if true;
      allow write: if isStaff();
    }
    
    match /orders/{orderId} {
      allow read: if isStaff();
      allow create: if true;
      allow update, delete: if isStaff();
    }
    
    match /waiterCalls/{callId} {
      allow read: if isStaff();
      allow create: if true;
      allow update, delete: if isStaff();
    }
    
    match /staff/{staffId} {
      allow read: if isStaff();
      allow write: if isAdmin(); // Only admins can modify staff
    }
    
    match /tables/{tableId} {
      allow read: if true;
      allow write: if isStaff();
    }
  }
}
```

## How to Deploy Rules

### Option 1: Via Firebase Console
1. Go to [Firebase Console](https://console.firebase.google.com)
2. Select your project: `server-8001c`
3. Go to **Firestore Database** → **Rules** tab
4. Paste the rules above
5. Click **Publish**

### Option 2: Via Firebase CLI
```bash
# Deploy rules
npx firebase deploy --only firestore:rules

# Or use the yarn script
yarn firebase:deploy:rules
```

## Testing Rules

You can test your rules in the Firebase Console:
1. Go to Firestore Database → Rules
2. Click **Rules Playground**
3. Test different scenarios (read, write, etc.)

## Security Best Practices

1. ✅ **Never allow unrestricted write access** - Always require authentication
2. ✅ **Limit read access to sensitive data** - Orders should only be readable by staff
3. ✅ **Validate data structure** - Add validation in rules if needed
4. ✅ **Use helper functions** - Makes rules more maintainable
5. ✅ **Test thoroughly** - Use Rules Playground before deploying

## Common Issues

### Issue: "Permission denied" when customers try to place orders
**Solution**: Make sure `allow create: if true;` is set for orders collection

### Issue: Staff can't see orders
**Solution**: Make sure staff users are authenticated and `allow read: if request.auth != null;` is set

### Issue: Customers can't see menu
**Solution**: Make sure `allow read: if true;` is set for menus and categories

