CREATE DATABASE warewouse;

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE IF NOT EXISTS supplier(
  id UUID NOT NULL UNIQUE DEFAULT uuid_generate_v4(),
  name VARCHAR NOT NULL,
  cnpj VARCHAR(18),
  phone VARCHAR(20),
  mail VARCHAR,
  create_at TIMESTAMP DEFAULT NOW(),
  updated_At TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS category(
  id UUID NOT NULL UNIQUE DEFAULT uuid_generate_v4(),
  name VARCHAR NOT NULL,
  create_at TIMESTAMP DEFAULT NOW(),
  updated_At TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS department(
  id UUID NOT NULL UNIQUE DEFAULT uuid_generate_v4(),
  name VARCHAR NOT NULL,
  create_at TIMESTAMP DEFAULT NOW(),
  updated_At TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS product(
  id UUID NOT NULL UNIQUE DEFAULT uuid_generate_v4(),
  name VARCHAR NOT NULL,
  price NUMERIC(10, 2) NOT NULL,
  category_id UUID,
  supplier_id UUID,
  create_at TIMESTAMP DEFAULT NOW(),
  updated_At TIMESTAMP DEFAULT NOW(),
  FOREIGN KEY(category_id) REFERENCES category(id),
  FOREIGN KEY(supplier_id) REFERENCES supplier(id)
);

CREATE TABLE IF NOT EXISTS movement_order(
  id UUID NOT NULL UNIQUE DEFAULT uuid_generate_v4(),
  name VARCHAR NOT NULL,
  price NUMERIC(10, 2) NOT NULL,
  type VARCHAR NOT NULL,
  department_id UUID,
  supplier_id UUID,
  create_at TIMESTAMP DEFAULT NOW(),
  updated_At TIMESTAMP DEFAULT NOW(),
  FOREIGN KEY(department_id) REFERENCES department(id),
  FOREIGN KEY(supplier_id) REFERENCES supplier(id)
);

CREATE TABLE IF NOT EXISTS movement_product(
  id UUID NOT NULL UNIQUE DEFAULT uuid_generate_v4(),
  product_id UUID,
  amount INTEGER NOT NULL,
  create_at TIMESTAMP DEFAULT NOW(),
  updated_At TIMESTAMP DEFAULT NOW(),
  FOREIGN KEY(product_id) REFERENCES product(id)
);

CREATE TABLE IF NOT EXISTS stock(
  id UUID NOT NULL UNIQUE DEFAULT uuid_generate_v4(),
  product_id UUID,
  amount INTEGER NOT NULL,
  create_at TIMESTAMP DEFAULT NOW(),
  updated_At TIMESTAMP DEFAULT NOW(),
  FOREIGN KEY(product_id) REFERENCES product(id)
);
