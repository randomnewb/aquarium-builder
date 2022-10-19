
-- USER is a reserved keyword with Postgres
-- You must use double quotes in every query that user is in:
-- ex. SELECT * FROM "user";
-- Otherwise you will have errors!
CREATE TABLE "user" (
    "id" SERIAL PRIMARY KEY,
    "username" VARCHAR (80) UNIQUE NOT NULL,
    "password" VARCHAR (1000) NOT NULL
);

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

INSERT INTO "aquarium" ("user_id", "name", "length", "width", "height", "note", "image_url")
VALUES (1, 'Shrimp Tank', 8, 8, 8, 'A nano tank for nano livestock.', 'https://unsplash.com/photos/kIrSG5VDdl8/download?ixid=MnwxMjA3fDB8MXxjb2xsZWN0aW9ufDd8Njc1OTY4NjB8fHx8fDJ8fDE2NjYxMzkwNDc&force=true&w=640');

CREATE TABLE "product" (
	"id" SERIAL PRIMARY KEY,
	"aquarium_id" INT REFERENCES "aquarium",
	"description" VARCHAR (255),
	"cost" INT,
	"product_type_id" INT REFERENCES "product_type"
);

CREATE TABLE "product_type" (
	"id" SERIAL PRIMARY KEY,
	"type" VARCHAR (255)
);

--Define the product types that users can add to and populate their aquariums

INSERT INTO "product_type" ("type")
VALUES ('livestock'), ('plants'), ('rock'), ('driftwood'), ('substrate')
;


CREATE TABLE "schedule" (
	"id" SERIAL PRIMARY KEY,
	"schedule_type_id" INT REFERENCES "schedule_type",
	"frequency" INT,
	"aquarium_id" INT REFERENCES "aquarium"
);

CREATE TABLE "schedule_type" (
	"id" SERIAL PRIMARY KEY,
	"type" VARCHAR (255)
);

--Define the schedule types that users can choose from when creating reminders and schedules

INSERT INTO "schedule_type" ("type")
VALUES ('feeding'), ('water_change'), ('lighting'), ('carbon_dioxide'), ('fertilizer'), ('medication')
;


CREATE TABLE "aquarium_schedule" (
	"id" SERIAL PRIMARY KEY,
	"aquarium_id" INT REFERENCES "aquarium",
	"schedule_id" INT REFERENCES "schedule",
	"completed_at" TIMESTAMP NOT NULL DEFAULT NOW()
);