Trakio – Warehouse & Asset Management System

Trakio is a full-stack web application designed to help warehouse owners and
their workers track products, manage incoming stock, and record outgoing
shipments in real time.

💡 What Problem Does It Solve?

In a real warehouse, business owners cannot be present all the time. They need a
simple system where:

1.  The Owner can register products and create worker accounts.
2.  The Warehouse Workers update the stock whenever items leave the warehouse.
3.  Every shipment is logged so the owner always knows: Who sent what, to whom,
    where it went, and if it was paid or unpaid.

👥 Two Types of Users

1. Warehouse Owner

  - Can sign up and create a main warehouse account.
  - Creates login details (email and password) for warehouse workers.
  - Can add new products to the warehouse.
  - Has full access to view all stock, dispatch items, and see the full movement
    history.

2. Warehouse Worker (Employee)

  - Cannot sign up on their own (only the owner can create worker accounts).
  - Logs in using credentials provided by their owner.
  - Can add new incoming shipments.
  - Can dispatch products when orders leave the warehouse.
  - Can view stock levels and movement logs.

✨ Main Features

  - Real-time Stock Deduction: When a worker dispatches 10 phones from a batch
    of 100, the available quantity drops to 90 immediately across all screens.
  - Shipment Tracking (Movement History): Every time items leave the warehouse,
    the system records:
      - Date and time
      - Quantity removed
      - Who dispatched it (worker name)
      - Recipient (client name)
      - Destination location
      - Payment status (Paid or Unpaid)
  - Automatic Stock Warnings:
      - Low Stock: Automatically shows items with 10 or fewer units left.
      - Out of Stock: Automatically shows items that have reached 0 units.
  - Data Privacy: Workers only see products belonging to the owner who created
    them.

🛠️ Built With

  - Frontend: React.js, Tailwind CSS, Vite
  - Backend: Node.js, Express.js
  - Database: MongoDB, Mongoose
  - Security: JWT (JSON Web Tokens), bcryptjs

🚀 How to Run the Project Locally

1. Clone the repository

git clone https://github.com/your-username/trakio.git
cd trakio

2. Backend Setup

1.  Open the server folder:
    cd vite-project/server
2.  Install backend packages:
    npm install
3.  Create a .env file in the server folder and add:
    PORT=8000
    MONGODB_URI=your_mongodb_connection_string
    JWT_SECRET=your_jwt_secret_key
4.  Start the backend:
    node index.js

3. Frontend Setup

1.  In a new terminal, go to the frontend folder:
    cd vite-project
2.  Install frontend packages:
    npm install
3.  Start the Vite dev server:
    npm run dev
4.  Open http://localhost:5173 in your browser.

📄 License

This project is open source and available under the MIT License.

