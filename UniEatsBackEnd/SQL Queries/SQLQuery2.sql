CREATE TABLE Users (
    user_id INT IDENTITY(1,1) PRIMARY KEY,
    username NVARCHAR(50) NOT NULL UNIQUE,
    password NVARCHAR(255) NOT NULL,
    email NVARCHAR(100) NOT NULL UNIQUE,
    role NVARCHAR(10) CHECK (role IN ('Owner', 'Worker', 'Customer')),
    phone_number NVARCHAR(15) CHECK (phone_number LIKE '[0-9]%'),
    created_at DATETIME DEFAULT GETDATE()
);


CREATE TABLE FoodItems (
    item_id INT IDENTITY(1,1) PRIMARY KEY,
    name NVARCHAR(100) NOT NULL,
    category NVARCHAR(10) CHECK (category IN ('Drinks', 'Snacks', 'Meals')),
    price DECIMAL(10, 2) CHECK (price > 0),
    description NVARCHAR(MAX),
    image_url NVARCHAR(255),
    availability BIT DEFAULT 1,
    stock_quantity INT CHECK (stock_quantity >= 0)
);


CREATE TABLE Orders (
    order_id INT IDENTITY(1,1) PRIMARY KEY,
    user_id INT NOT NULL,
    order_date DATETIME DEFAULT GETDATE(),
    total_amount DECIMAL(10, 2) CHECK (total_amount >= 0),
    status NVARCHAR(10) CHECK (status IN ('Pending', 'Completed', 'Canceled')) DEFAULT 'Pending',
    payment_method NVARCHAR(10) CHECK (payment_method IN ('Card', 'Cash')),
    delivery_method NVARCHAR(10) CHECK (delivery_method IN ('Pickup', 'Delivery')),
    FOREIGN KEY (user_id) REFERENCES Users(user_id) ON DELETE CASCADE
);


CREATE TABLE OrderItems (
    order_item_id INT IDENTITY(1,1) PRIMARY KEY,
    order_id INT NOT NULL,
    item_id INT NOT NULL,
    quantity INT CHECK (quantity > 0),
    price DECIMAL(10, 2) NOT NULL, -- Store price here
    subtotal AS (quantity * price), -- Computed column
    FOREIGN KEY (order_id) REFERENCES Orders(order_id) ON DELETE CASCADE,
    FOREIGN KEY (item_id) REFERENCES FoodItems(item_id) ON DELETE CASCADE
);


CREATE TABLE Payments (
    payment_id INT IDENTITY(1,1) PRIMARY KEY,
    order_id INT NOT NULL,
    amount DECIMAL(10, 2) NOT NULL CHECK (amount > 0),
    payment_method NVARCHAR(10) CHECK (payment_method IN ('Card', 'Cash')),
    payment_status NVARCHAR(10) CHECK (payment_status IN ('Paid', 'Pending')) DEFAULT 'Pending',
    transaction_id NVARCHAR(100),
    payment_date DATETIME DEFAULT GETDATE(),
    FOREIGN KEY (order_id) REFERENCES Orders(order_id) ON DELETE CASCADE
);


CREATE TABLE SalesReports (
    report_id INT IDENTITY(1,1) PRIMARY KEY,
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    total_sales DECIMAL(15, 2) CHECK (total_sales >= 0),
    number_of_orders INT CHECK (number_of_orders >= 0),
    generated_at DATETIME DEFAULT GETDATE(),
    CHECK (end_date >= start_date)
);


CREATE TABLE Inventory (
    inventory_id INT IDENTITY(1,1) PRIMARY KEY,
    item_id INT NOT NULL,
    stock_added INT DEFAULT 0 CHECK (stock_added >= 0),
    stock_removed INT DEFAULT 0 CHECK (stock_removed >= 0),
    current_stock AS (stock_added - stock_removed), -- Computed column
    updated_at DATETIME DEFAULT GETDATE(),
    FOREIGN KEY (item_id) REFERENCES FoodItems(item_id) ON DELETE CASCADE
);


CREATE TABLE Reviews (
    review_id INT IDENTITY(1,1) PRIMARY KEY,
    user_id INT NOT NULL,
    item_id INT NOT NULL,
    rating INT CHECK (rating BETWEEN 1 AND 5),
    review_text NVARCHAR(MAX),
    created_at DATETIME DEFAULT GETDATE(),
    FOREIGN KEY (user_id) REFERENCES Users(user_id) ON DELETE CASCADE,
    FOREIGN KEY (item_id) REFERENCES FoodItems(item_id) ON DELETE CASCADE
);


CREATE TABLE Reservations (
    reservation_id INT IDENTITY(1,1) PRIMARY KEY,
    user_id INT NOT NULL,
    reservation_date DATETIME DEFAULT GETDATE(),
    number_of_people INT CHECK (number_of_people > 0),
    status NVARCHAR(10) CHECK (status IN ('Confirmed', 'Canceled')) DEFAULT 'Confirmed',
    created_at DATETIME DEFAULT GETDATE(),
    FOREIGN KEY (user_id) REFERENCES Users(user_id) ON DELETE CASCADE
);


