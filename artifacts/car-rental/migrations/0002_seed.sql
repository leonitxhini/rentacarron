-- RRON Car Rental – Seed Data
-- Run via: wrangler d1 execute rron-db --file=migrations/0002_seed.sql --remote
-- Safe to run only once on a fresh database.

INSERT INTO locations (name, address, city, country, is_airport, active) VALUES
  ('Ferizaj – HQ',    'Rr. Emin Duraku, Ferizaj', 'Ferizaj', 'Kosovo',          0, 1),
  ('Pristina Airport','Prishtina Int. Airport',    'Pristina','Kosovo',           1, 1),
  ('Skopje Airport',  'Skopje Int. Airport, MK',  'Skopje',  'North Macedonia',  1, 1),
  ('Kukes Airport',   'Kukes Airport, Albania',    'Kukes',   'Albania',          1, 1);

INSERT INTO cars (make, model, year, color, category, transmission, fuel_type, seats, bags, price_per_day, available, image_url, images, features, description) VALUES
  ('Peugeot',    '308',    2019, 'Grey',       'compact', 'manual',    'diesel', 5, 3, 35, 1,
    '/images/cars/peugeot-308-2019-grey-front.png', '[]',
    '["Air Conditioning","Bluetooth","Navigation","USB Charging","Unlimited KM"]',
    'Stylish and spacious compact hatchback with premium comfort.'),

  ('Peugeot',    '308',    2020, 'Grey',       'compact', 'manual',    'diesel', 5, 3, 35, 1,
    '/images/cars/peugeot-308-2020-grey-front.png', '[]',
    '["Air Conditioning","Bluetooth","Navigation","USB Charging","Cruise Control","Unlimited KM"]',
    'Latest generation 308 with refined interior and advanced driver assist.'),

  ('Peugeot',    '208',    2016, 'Orange',     'economy', 'manual',    'petrol', 5, 2, 25, 1,
    '/images/cars/peugeot-208-2016-orange-front.png', '[]',
    '["Air Conditioning","Bluetooth","USB Charging","Unlimited KM"]',
    'Compact and fuel-efficient city car, perfect for urban exploration.'),

  ('Volkswagen', 'Golf 7', 2018, 'Black',      'compact', 'automatic', 'diesel', 5, 3, 35, 1,
    '/images/cars/golf7-2018-black-front.png', '[]',
    '["Air Conditioning","Bluetooth","Navigation","USB Charging","Parking Sensors","Unlimited KM"]',
    'Iconic Golf 7 in sleek black — automatic gearbox for effortless driving.'),

  ('Volkswagen', 'Golf 7', 2018, 'Grey',       'compact', 'manual',    'diesel', 5, 3, 35, 1,
    '/images/cars/golf7-2018-grey-front.png', '[]',
    '["Air Conditioning","Bluetooth","USB Charging","Unlimited KM"]',
    'Reliable Golf 7 in elegant grey — the benchmark of compact driving.'),

  ('Volkswagen', 'Golf 7', 2018, 'Light Grey', 'compact', 'manual',    'diesel', 5, 3, 35, 1,
    '/images/cars/golf7-2018-lightgrey-front.png', '[]',
    '["Air Conditioning","Bluetooth","USB Charging","Unlimited KM"]',
    'Light grey Golf 7 — comfort and reliability for every journey.'),

  ('Volkswagen', 'Golf 8', 2021, 'Black',      'compact', 'automatic', 'diesel', 5, 3, 50, 1,
    '/images/cars/golf8-2021-black-front.png', '[]',
    '["Air Conditioning","Bluetooth","Navigation","USB Charging","Cruise Control","Parking Sensors","Digital Cockpit","Unlimited KM"]',
    'New generation Golf 8 in midnight black with digital cockpit and premium tech.'),

  ('Volkswagen', 'Golf 8', 2021, 'Light Grey', 'compact', 'automatic', 'diesel', 5, 3, 50, 1,
    '/images/cars/golf8-2021-lightgrey-front.png', '[]',
    '["Air Conditioning","Bluetooth","Navigation","USB Charging","Cruise Control","Parking Sensors","Digital Cockpit","Unlimited KM"]',
    'Golf 8 in refined light grey — the future of compact cars is here.'),

  ('Citroën',    'C4',     2015, 'White',      'compact', 'automatic', 'diesel', 5, 3, 30, 1,
    '/images/cars/citroen-c4-2015-white-front.png', '[]',
    '["Air Conditioning","Bluetooth","USB Charging","Unlimited KM"]',
    'Clean white Citroën C4 — dependable comfort for longer journeys.'),

  ('Citroën',    'C4',     2015, 'Grey',       'compact', 'manual',    'diesel', 5, 3, 25, 1,
    '/images/cars/citroen-c4-2015-grey-front.png', '[]',
    '["Air Conditioning","Bluetooth","USB Charging","Unlimited KM"]',
    'Practical and comfortable Citroën C4 in graphite grey — great value.'),

  ('Ford',       'Fiesta', 2019, 'White',      'compact', 'manual',    'petrol', 5, 2, 25, 1,
    NULL, '[]', '[]',
    'Compact and reliable city car — ideal for short trips and urban driving.'),

  ('Audi',       'A3',     2015, 'Black',      'premium', 'automatic', 'diesel', 5, 3, 40, 1,
    '/images/cars/audi-a3-2015-black-front.png', '[]',
    '["Air Conditioning","Bluetooth","Navigation","Leather Seats","USB Charging","Unlimited KM"]',
    'Premium Audi A3 in glossy black — sporty, refined, and unmistakably Audi.'),

  ('Audi',       'A3',     2018, 'Light Grey', 'premium', 'automatic', 'diesel', 5, 3, 40, 1,
    '/images/cars/audi-a3-2018-lightgrey-front.png', '[]',
    '["Air Conditioning","Bluetooth","Navigation","Leather Seats","USB Charging","Cruise Control","Unlimited KM"]',
    'Updated Audi A3 Sportback with elegant light grey finish and full premium spec.'),

  ('Audi',       'A5',     2021, 'Dark Blue',  'premium', 'automatic', 'diesel', 5, 3, 70, 1,
    '/images/cars/audi-a5-2021-darkblue-front.png', '[]',
    '["Air Conditioning","Bluetooth","Navigation","Leather Seats","USB Charging","Cruise Control","Parking Sensors","Virtual Cockpit","Unlimited KM"]',
    'Stunning Audi A5 Sportback in deep navy — executive presence with sports DNA.'),

  ('Audi',       'A6',     2021, 'Black',      'luxury',  'automatic', 'diesel', 5, 3, 75, 1,
    '/images/cars/audi-a6-2021-black-front.png', '[]',
    '["Air Conditioning","Bluetooth","Navigation","Leather Seats","USB Charging","Cruise Control","Parking Sensors","Virtual Cockpit","Unlimited KM"]',
    'Flagship Audi A6 — the ultimate in luxury and performance.');
