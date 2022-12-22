--Create this table first
CREATE TABLE "user" (
    "id" SERIAL PRIMARY KEY,
    "username" VARCHAR (80) UNIQUE NOT NULL,
    "password" VARCHAR (1000) NOT NULL,
	"favorite_plant" VARCHAR (255),
	"favorite_animal" VARCHAR (255),
	"aquascaping_style" VARCHAR (255),
	"years_hobby" NUMERIC,
	"avatar" VARCHAR (1000),
	"description" VARCHAR (1000)
);

--REGISTER A USER ACCOUNT BEFORE CREATING OR INSERTING ANYTHING ELSE BELOW
--CREATE tables and INSERT sample data in top down order to avoid
--any issues with references/foreign keys

CREATE TABLE "aquarium" (
	"id" SERIAL PRIMARY KEY,
	"user_id" INT REFERENCES "user",
	"name" VARCHAR (255),
	"length" INT,
	"width" INT,
	"height" INT,
	"note" VARCHAR (1000),
	"image_url" VARCHAR (3000)
);

CREATE TABLE "product_type" (
	"id" SERIAL PRIMARY KEY,
	"type" VARCHAR (255)
);


CREATE TABLE "product" (
	"id" SERIAL PRIMARY KEY,
	"aquarium_id" INT REFERENCES "aquarium" ON DELETE CASCADE,
	"description" VARCHAR (255),
	"cost" INT,
	"product_type_id" INT REFERENCES "product_type"
);


CREATE TABLE "schedule_type" (
	"id" SERIAL PRIMARY KEY,
	"type" VARCHAR (255)
);

CREATE TABLE "schedule" (
	"id" SERIAL PRIMARY KEY,
	"schedule_type_id" INT REFERENCES "schedule_type",
	"frequency" INT,
	"aquarium_id" INT REFERENCES "aquarium"
);

CREATE TABLE "aquarium_schedule" (
	"id" SERIAL PRIMARY KEY,
	"aquarium_id" INT REFERENCES "aquarium",
	"schedule_id" INT REFERENCES "schedule",
	"completed_at" TIMESTAMP NOT NULL DEFAULT NOW()
);

--Sample aquariums

INSERT INTO "aquarium" ("user_id", "name", "length", "width", "height", "note", "image_url")
VALUES (1, 'Gudgeon Town', 30, 13, 13, 'Pick up plants and add them to this tank.', 'https://res.cloudinary.com/dartlv0ee/image/upload/v1667316719/IMG_20221031_181229_r6xnbv.jpg'), 
(1, 'Shrimp Paradise', 14, 9, 10, 'A haven for shrimp with lots of rotala', 'https://res.cloudinary.com/dartlv0ee/image/upload/v1667316717/IMG_20221031_181246_x2uuu0.jpg');

--Define the product types that users can add to and populate their aquariums

INSERT INTO "product_type" ("type")
VALUES ('livestock'), ('plant'), ('rock'), ('driftwood'), ('substrate')
;

--Some example products
INSERT INTO "product" ("aquarium_id", "description", "cost", "product_type_id")
VALUES (1, 'Anubias nana petite', 25, 2), (1, 'Seiryu', 15, 3), (1, 'Peacock Gudgeon', 12, 1), (1, 'Pothos', 10, 2),
(2, 'Neocaridina (yellow)', 20, 1), (2, 'Rotala', 10, 2)
;

--Define the schedule types that users can choose from when creating reminders and schedules

INSERT INTO "schedule_type" ("type")
VALUES ('feeding'), ('water_change'), ('lighting'), ('carbon_dioxide'), ('fertilizer'), ('medication')
;