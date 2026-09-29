# Simple JWT Authentication

A modern React application demonstrating client-side **JSON Web Token (JWT)** authentication, token generation, storage in `localStorage`, token decoding, and role-based access control.

---

## 🚀 Features

- **JWT Structure Demonstration**: Visualizes standard 3-part JWT structure (`Header.Payload.Signature`) encoded in Base64URL.
- **Client-Side Authentication**: Simulates user verification and issues signed tokens.
- **Session Persistence**: Stores tokens in browser `localStorage` and maintains authentication state on page reload.
- **Interactive Token Inspector**: View decoded header, payload, expiration timestamp, and claims directly in the dashboard.
- **Role-Based Access Control**: Dynamic dashboard view customized for different roles (**Admin**, **Student**, **User**).
- **Secure Logout**: Clears session storage and resets application state.

---

## 🔑 Test Credentials

Use any of the following credentials or click the quick-fill buttons on the login screen:

| Username | Password | Role | Description |
| :--- | :--- | :--- | :--- |
| `admin` | `1234` | **Admin** | Full system administration and privilege view |
| `student` | `1234` | **Student** | Coursework, lab submissions, and grades view |
| `user` | `1234` | **User** | Standard member profile view |

---

## 🛠️ Tech Stack

- **React 19**
- **Vite**
- **Vanilla CSS** (Custom theme with glassmorphism & responsive design)

---

## 💻 Getting Started

### 1. Clone the repository
```bash
git clone https://github.com/Goldypahal/simple-JWT-authentication.git
cd simple-JWT-authentication
```

### 2. Install dependencies
```bash
npm install
```

### 3. Run the development server
```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### 4. Build for production
```bash
npm run build
```

---

## 📖 Key Concepts Demonstrated

1. **Authentication Flow**: User submits credentials &rarr; Validated &rarr; JWT generated and stored in `localStorage` &rarr; State updated.
2. **JWT Anatomy**:
   - **Header**: Algorithm (`HS256`) and Token Type (`JWT`).
   - **Payload**: User ID, username, assigned role, issued-at (`iat`), and expiration (`exp`).
   - **Signature**: Simulated cryptographic signature verifying authenticity.
3. **Protected Views**: Main viewport dynamically switches between `Login` and `Dashboard` based on the presence of a valid decoded token.
