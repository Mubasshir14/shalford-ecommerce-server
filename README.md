# 🛒 **[Ecommerce Shop Website](https://shalfordco-server.vercel.app)** 
A full-featured **E-commerce Shop** built with **Next.js**, **React**, **Redux Toolkit**, **TailwindCSS**, and **JWT Authentication**.  
This application supports **User** and **Admin** roles with real-time order management, payment integration, email notifications, and an interactive dashboard.  

---

## 🚀 Features  

### 👤 User Features  
- 🔍 Search & browse products  
- ⭐ Product rating & review system  
- 🛒 Place orders with SSLCommerz (sandbox/live)  
- 📜 View order history  
- 🚚 Track order status in real-time  
- 📧 Get order confirmation & updates via email  

### 🛠️ Admin Features  
- ➕ Add new products  
- ✏️ Update product details  
- 📦 Manage orders  
- 📊 Real-time dashboard with:  
  - Total orders  
  - Total sales  
  - Total revenue (chart view)  

---

## 🔑 Authentication & Security  
- **JWT-based Authentication** (secure login & protected routes)  
- **Role-based Access Control** (Admin/User separation)  

---

## 💳 Payment Integration  
- Integrated with **[SSLCommerz](https://www.sslcommerz.com/)** (Sandbox currently used)  
- Supports **order confirmation & payment verification**  

---

## 📧 Email Notifications  
- Users receive emails for:  
  - Order placed confirmation  
  - Order details with delivery info  
  - Status updates for each order step  

---



## 🔐 Technologies & Tools Used

### 🧠 Core Technologies
- **TypeScript**: For strong typing and enhanced developer experience.
- **Express.js**: For creating the server and APIs.
- **MongoDB**: For database management using Mongoose.
- **Mongoose**: For MongoDB object modeling.
- **Cloudinary**: Cloud-based media storage and management.
- **Zod**: Schema validation with static type inference.

### ⚙️ Developer Utilities

- **Environment Variables**: Managed with `dotenv`.
- **Linting and Formatting**: Using ESLint and Prettier.
- **Development Server**: Powered by `ts-node-dev` for live reload.

### 🔐 Authentication & Security
- **jsonwebtoken (JWT)** – For secure authentication using tokens.
- **cors** – Cross-Origin Resource Sharing control.

- **ua-parser-js** – Detect and parse user device/browser info.

### 📤 File & Media Uploads
- **multer** – Handle multipart/form-data (file uploads).
- **multer-storage-cloudinary** – Upload files directly to Cloudinary.

### ✉️ Communication

- **nodemailer** – Send emails from your server.

### 📦 HTTP Utilities
- **http-status / http-status-codes** – Standard HTTP status code constants and helpers.


## Prerequisites
Make sure you have the following installed:
- **Node.js** (version 16 or above)
- **npm** or **yarn**
- **MongoDB instance** (local or cloud-based)

## Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Mubasshir14/shalford-ecommerce-server.git
   ```
   ```bash
   cd shalford-ecommerce-server
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Create a `.env` file** in the root directory and configure your environment variables:
   ```env
    # Environment
    NODE_ENV=development
    PORT=5000

    # Database
    DATABASE_URL=your-mongodb-uri

    # Security
    BCRYPT_SALT_ROUND=your-salt-round

    # JWT Secrets
    JWT_ACCESS_SECRET=your-access-token-secret
    JWT_REFRESH_SECRET=your-refresh-token-secret
    JWT_ACCESS_EXPIRES_IN=10d
    JWT_REFRESH_EXPIRES_IN=365d

    # Password Reset
    RESET_PASSWORD_UI_LINK=http://localhost:5000

    # Cloudinary (Media Upload)
    CLOUDINARY_CLOUD_NAME=your-cloud-name
    CLOUDINARY_API_KEY=your-api-key
    CLOUDINARY_API_SECRET=your-api-secret

    # Nodemailer
    FROM_EMAIL= Sender_Email
    FROM_PASS= Password

    #SSLCOMMERZ (Sandbox)
    STORE_ID= Store_ID
    STORE_PASSWORD= Store_Password
    SUCCESS_URL= "https://localhost:3000/success"
    FAIL_URL="https://localhost:3000/failed"
    CANCEL_URL="http://localhost:3000/cancel"
    is_live = false
    VALIDATION_API="https://localhost:3000/api/v1/ssl/validate"
    SSL_PAYMENT_API="https://sandbox.sslcommerz.com/gwprocess/v3/api.php"
    CLIENT_URL="http://localhost:3000"
   ```

## Scripts

- **Start Development Server:**
  ```bash
  npm run start:dev
  ```

- **Build for Production:**
  ```bash
  npm run build
  ```

- **Start Production Server:**
  ```bash
  npm run start:prod
  ```

- **Lint Code:**
  ```bash
  npm run lint
  ```

- **Fix Lint Issues:**
  ```bash
  npm run lint:fix
  ```

- **Format Code with Prettier:**
  ```bash
  npm run prettier
  ```

- **Fix Formatting Issues:**
  ```bash
  npm run prettier:fix
  ```

- **Deploy To Vercel:**
  ```bash
  vercel --prod
  ```

## Folder Structure
```
📦src
 ┣ 📂app
 ┃ ┣ 📂builder
 ┃ ┃ ┗ 📜QueryBuilder.ts
 ┃ ┣ 📂config
 ┃ ┃ ┗ 📜index.ts
 ┃ ┣ 📂errors
 ┃ ┃ ┣ 📜AppError.ts
 ┃ ┃ ┣ 📜handleCastError.ts
 ┃ ┃ ┣ 📜handleDuplicateError.ts
 ┃ ┃ ┣ 📜handleValidationError.ts
 ┃ ┃ ┗ 📜handleZodError.ts
 ┃ ┣ 📂interface
 ┃ ┃ ┣ 📜error.ts
 ┃ ┃ ┣ 📜index.d.ts
 ┃ ┃ ┗ 📜user.ts
 ┃ ┣ 📂middlewares
 ┃ ┃ ┣ 📜auth.ts
 ┃ ┃ ┣ 📜bodyParse.ts
 ┃ ┃ ┣ 📜clientInfoParser.ts
 ┃ ┃ ┣ 📜globalErrorhandler.ts
 ┃ ┃ ┣ 📜notFound.ts
 ┃ ┃ ┗ 📜validateRequest.ts
 ┃ ┣ 📂routes
 ┃ ┃ ┗ 📜index.ts
 ┃ ┣ 📂types
 ┃ ┃ ┣ 📜express.d.ts
 ┃ ┃ ┗ 📜sslcommerz-lts.d.ts
 ┃ ┗ 📂utils
 ┃ ┃ ┣ 📜catchAsync.ts
 ┃ ┃ ┣ 📜cloudinary.config.ts
 ┃ ┃ ┣ 📜emailHelper.ts
 ┃ ┃ ┣ 📜generateOrderInvoicePDF.ts
 ┃ ┃ ┣ 📜multer.config.ts
 ┃ ┃ ┣ 📜sendEmails.ts
 ┃ ┃ ┗ 📜sendResponse.ts
 ┣ 📂assets
 ┃ ┣ 📜company.png
 ┃ ┗ 📜logi.png
 ┣ 📂modules
 ┃ ┣ 📂Auth
 ┃ ┃ ┣ 📜auth.controller.ts
 ┃ ┃ ┣ 📜auth.interface.ts
 ┃ ┃ ┣ 📜auth.route.ts
 ┃ ┃ ┣ 📜auth.service.ts
 ┃ ┃ ┣ 📜auth.utils.ts
 ┃ ┃ ┗ 📜auth.validation.ts
 ┃ ┣ 📂Banner
 ┃ ┃ ┣ 📜banner.controller.ts
 ┃ ┃ ┣ 📜banner.interface.ts
 ┃ ┃ ┣ 📜banner.model.ts
 ┃ ┃ ┣ 📜banner.route.ts
 ┃ ┃ ┗ 📜banner.service.ts
 ┃ ┣ 📂Cart
 ┃ ┃ ┣ 📜cart.controller.ts
 ┃ ┃ ┣ 📜cart.interface.ts
 ┃ ┃ ┣ 📜cart.model.ts
 ┃ ┃ ┣ 📜cart.route.ts
 ┃ ┃ ┗ 📜cartService.ts
 ┃ ┣ 📂Gallery
 ┃ ┃ ┣ 📜popup.controller.ts
 ┃ ┃ ┣ 📜popup.interface.ts
 ┃ ┃ ┣ 📜popup.model.ts
 ┃ ┃ ┣ 📜popup.route.ts
 ┃ ┃ ┗ 📜popup.service.ts
 ┃ ┣ 📂NewsLetter
 ┃ ┃ ┣ 📜newsletter.controller.ts
 ┃ ┃ ┣ 📜newsletter.interface.ts
 ┃ ┃ ┣ 📜newsletter.model.ts
 ┃ ┃ ┣ 📜newsletter.route.ts
 ┃ ┃ ┗ 📜newsletter.service.ts
 ┃ ┣ 📂Order
 ┃ ┃ ┣ 📜order.controller.ts
 ┃ ┃ ┣ 📜order.interface.ts
 ┃ ┃ ┣ 📜order.model.ts
 ┃ ┃ ┣ 📜order.routes.ts
 ┃ ┃ ┣ 📜order.service.ts
 ┃ ┃ ┗ 📜order.validation.ts
 ┃ ┣ 📂Payment
 ┃ ┃ ┣ 📜payment.controller.ts
 ┃ ┃ ┣ 📜payment.interface.ts
 ┃ ┃ ┣ 📜payment.model.ts
 ┃ ┃ ┣ 📜payment.routes.ts
 ┃ ┃ ┣ 📜payment.service.ts
 ┃ ┃ ┣ 📜payment.utils.ts
 ┃ ┃ ┗ 📜payment.validation.ts
 ┃ ┣ 📂PaymentOrder
 ┃ ┃ ┣ 📜order.payment.route.ts
 ┃ ┃ ┣ 📜orderpayment.controller.ts
 ┃ ┃ ┗ 📜paymentorder.service.ts
 ┃ ┣ 📂Popup
 ┃ ┃ ┣ 📜popup.controller.ts
 ┃ ┃ ┣ 📜popup.interface.ts
 ┃ ┃ ┣ 📜popup.model.ts
 ┃ ┃ ┣ 📜popup.route.ts
 ┃ ┃ ┗ 📜popup.service.ts
 ┃ ┣ 📂Product
 ┃ ┃ ┣ 📜product.controller.ts
 ┃ ┃ ┣ 📜product.interface.ts
 ┃ ┃ ┣ 📜product.model.ts
 ┃ ┃ ┣ 📜product.route.ts
 ┃ ┃ ┣ 📜product.service.ts
 ┃ ┃ ┗ 📜product.validation.ts
 ┃ ┣ 📂ProductCategory
 ┃ ┃ ┣ 📜category.controller.ts
 ┃ ┃ ┣ 📜category.model.ts
 ┃ ┃ ┣ 📜category.route.ts
 ┃ ┃ ┣ 📜category.service.ts
 ┃ ┃ ┣ 📜category.validation.ts
 ┃ ┃ ┗ 📜catrgory.interface.ts
 ┃ ┣ 📂Review
 ┃ ┃ ┣ 📜review.controller.ts
 ┃ ┃ ┣ 📜review.interface.ts
 ┃ ┃ ┣ 📜review.model.ts
 ┃ ┃ ┣ 📜review.route.ts
 ┃ ┃ ┗ 📜review.service.ts
 ┃ ┣ 📂ssl
 ┃ ┃ ┣ 📜ssl.interface.ts
 ┃ ┃ ┗ 📜ssl.service.ts
 ┃ ┣ 📂sslcommerz
 ┃ ┃ ┣ 📜sslcommerz.controller.ts
 ┃ ┃ ┣ 📜sslcommerz.routes.ts
 ┃ ┃ ┗ 📜sslcommerz.service.ts
 ┃ ┣ 📂Subscriber
 ┃ ┃ ┣ 📜subscriber.controller.ts
 ┃ ┃ ┣ 📜subscriber.interface.ts
 ┃ ┃ ┣ 📜subscriber.model.ts
 ┃ ┃ ┣ 📜subscriber.route.ts
 ┃ ┃ ┗ 📜subscriber.service.ts
 ┃ ┗ 📂User
 ┃ ┃ ┣ 📜user.constant.ts
 ┃ ┃ ┣ 📜user.controller.ts
 ┃ ┃ ┣ 📜user.interface.ts
 ┃ ┃ ┣ 📜user.model.ts
 ┃ ┃ ┣ 📜user.route.ts
 ┃ ┃ ┣ 📜user.service.ts
 ┃ ┃ ┗ 📜user.validation.ts
 ┣ 📜app.ts
 ┗ 📜server.ts
 ```

## Contributing
Contributions are welcome! Please follow these steps:

1. **Fork the repository.**
2. **Create a new branch** for your feature or bugfix.
3. **Commit your changes** with descriptive messages.
4. **Push your changes** and open a pull request.

---