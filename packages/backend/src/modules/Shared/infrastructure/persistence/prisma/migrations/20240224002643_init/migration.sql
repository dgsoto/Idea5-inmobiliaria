-- CreateEnum
CREATE TYPE "assigned_status" AS ENUM ('Assigned', 'Removed', 'None');

-- CreateEnum
CREATE TYPE "property_publication_state" AS ENUM ('Active', 'Desactive');

-- CreateEnum
CREATE TYPE "property_state" AS ENUM ('Available', 'Reserved', 'Rent', 'Sold');

-- CreateEnum
CREATE TYPE "property_type_name" AS ENUM ('Chale', 'Atico', 'Local Comercial', 'Nave', 'Oficina', 'Finca', 'Casa', 'Estudio', 'Departamento', 'Terreno');

-- CreateEnum
CREATE TYPE "transaction_type_enum" AS ENUM ('Sale', 'Rent');

-- CreateEnum
CREATE TYPE "user_type_enum" AS ENUM ('Agent', 'Client', 'Owner');

-- CreateTable
CREATE TABLE "assigned" (
    "id" TEXT NOT NULL,
    "assigned" "assigned_status",
    "privilege_id" TEXT NOT NULL,
    "role_id" TEXT NOT NULL,

    CONSTRAINT "assigned_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "message" (
    "id" TEXT NOT NULL,
    "name" VARCHAR(150),
    "email" VARCHAR(150),
    "cell_phone" VARCHAR(15),
    "subjet" VARCHAR(250),
    "message" VARCHAR(1000),
    "user_id" TEXT NOT NULL,

    CONSTRAINT "message_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "privilege" (
    "id" TEXT NOT NULL,
    "module_name" VARCHAR(250),
    "module_path" VARCHAR(250),
    "module_state" VARCHAR(1),

    CONSTRAINT "privilege_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "property" (
    "id" TEXT NOT NULL,
    "agent_reference" VARCHAR(150),
    "address" VARCHAR(150),
    "num_rooms" INTEGER,
    "num_bathrooms" INTEGER,
    "price" INTEGER,
    "state" "property_state",
    "title" VARCHAR(300),
    "description" VARCHAR(1000),
    "google_map" VARCHAR(150),
    "property_owner_id" TEXT NOT NULL,
    "property_type_id" TEXT NOT NULL,

    CONSTRAINT "property_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "property_owner" (
    "id" TEXT NOT NULL,
    "name" VARCHAR(150),
    "cell_phone" INTEGER,
    "email" VARCHAR(150),

    CONSTRAINT "property_owner_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "property_publication" (
    "id" TEXT NOT NULL,
    "publication_date" VARCHAR(20),
    "state" "property_publication_state",
    "user_id" TEXT NOT NULL,
    "property_id" TEXT NOT NULL,

    CONSTRAINT "property_publication_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "property_type" (
    "id" TEXT NOT NULL,
    "name" "property_type_name",

    CONSTRAINT "property_type_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "real_estate_photos" (
    "id" TEXT NOT NULL,
    "photo" VARCHAR(300),
    "property_id" TEXT NOT NULL,

    CONSTRAINT "real_estate_photos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "role" (
    "id" TEXT NOT NULL,
    "role_name" VARCHAR(150),
    "role_state" VARCHAR(1),

    CONSTRAINT "role_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "transaction" (
    "id" TEXT NOT NULL,
    "transaction_type" "transaction_type_enum",
    "transaction_date" VARCHAR(20),
    "property_owner_id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,

    CONSTRAINT "transaction_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "firstname" VARCHAR(100),
    "lastname" VARCHAR(100),
    "email" VARCHAR(150),
    "password" VARCHAR(150),
    "photo" VARCHAR(300),
    "cell_phone" VARCHAR(15),
    "user_type" "user_type_enum",
    "role_id" TEXT NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "assigned" ADD CONSTRAINT "assigned_privilege_id_fkey" FOREIGN KEY ("privilege_id") REFERENCES "privilege"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "assigned" ADD CONSTRAINT "assigned_role_id_fkey" FOREIGN KEY ("role_id") REFERENCES "role"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "message" ADD CONSTRAINT "message_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "property" ADD CONSTRAINT "property_property_owner_id_fkey" FOREIGN KEY ("property_owner_id") REFERENCES "property_owner"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "property" ADD CONSTRAINT "property_property_type_id_fkey" FOREIGN KEY ("property_type_id") REFERENCES "property_type"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "property_publication" ADD CONSTRAINT "property_publication_property_id_fkey" FOREIGN KEY ("property_id") REFERENCES "property"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "property_publication" ADD CONSTRAINT "property_publication_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "real_estate_photos" ADD CONSTRAINT "real_estate_photos_property_id_fkey" FOREIGN KEY ("property_id") REFERENCES "property"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "transaction" ADD CONSTRAINT "transaction_property_owner_id_fkey" FOREIGN KEY ("property_owner_id") REFERENCES "property_owner"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "transaction" ADD CONSTRAINT "transaction_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_role_id_fkey" FOREIGN KEY ("role_id") REFERENCES "role"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
