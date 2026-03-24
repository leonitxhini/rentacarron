-- RRON Car Rental – D1 Schema
-- Run via: wrangler d1 execute rron-db --file=migrations/0001_schema.sql --remote

CREATE TABLE IF NOT EXISTS cars (
  id           INTEGER PRIMARY KEY AUTOINCREMENT,
  make         TEXT    NOT NULL,
  model        TEXT    NOT NULL,
  year         INTEGER NOT NULL,
  color        TEXT    NOT NULL,
  category     TEXT    NOT NULL,
  transmission TEXT    NOT NULL DEFAULT 'automatic',
  fuel_type    TEXT    NOT NULL DEFAULT 'diesel',
  seats        INTEGER NOT NULL DEFAULT 5,
  bags         INTEGER NOT NULL DEFAULT 3,
  price_per_day REAL   NOT NULL,
  available    INTEGER NOT NULL DEFAULT 1,
  image_url    TEXT,
  images       TEXT    NOT NULL DEFAULT '[]',
  features     TEXT    NOT NULL DEFAULT '[]',
  description  TEXT,
  created_at   TEXT    NOT NULL DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS locations (
  id         INTEGER PRIMARY KEY AUTOINCREMENT,
  name       TEXT    NOT NULL,
  address    TEXT    NOT NULL,
  city       TEXT    NOT NULL,
  country    TEXT    NOT NULL,
  is_airport INTEGER NOT NULL DEFAULT 0,
  active     INTEGER NOT NULL DEFAULT 1
);

CREATE TABLE IF NOT EXISTS bookings (
  id                  INTEGER PRIMARY KEY AUTOINCREMENT,
  car_id              INTEGER NOT NULL REFERENCES cars(id),
  customer_name       TEXT    NOT NULL,
  customer_email      TEXT    NOT NULL,
  customer_phone      TEXT    NOT NULL,
  pickup_location_id  INTEGER NOT NULL REFERENCES locations(id),
  dropoff_location_id INTEGER NOT NULL REFERENCES locations(id),
  pickup_date         TEXT    NOT NULL,
  dropoff_date        TEXT    NOT NULL,
  total_days          INTEGER NOT NULL,
  total_price         REAL    NOT NULL,
  status              TEXT    NOT NULL DEFAULT 'pending',
  notes               TEXT,
  created_at          TEXT    NOT NULL DEFAULT (datetime('now'))
);
