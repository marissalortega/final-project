set client_min_messages to warning;
-- DANGER: this is NOT how to do it in the real world.
-- `drop schema` INSTANTLY ERASES EVERYTHING.
drop schema "public" cascade;
create schema "public";
CREATE TABLE "public"."users" (
  "userId" serial NOT NULL,
  "email" TEXT NOT NULL UNIQUE,
  "password" TEXT NOT NULL,
  CONSTRAINT "users_pk" PRIMARY KEY ("userId")
) WITH (
  OIDS=FALSE
);
CREATE TABLE "public"."clients" (
  "clientId" serial NOT NULL,
  "firstName" TEXT NOT NULL,
  "lastName" TEXT NOT NULL,
  "email" TEXT NOT NULL,
  "phoneNumber" TEXT NOT NULL,
  "streetAddress" TEXT NOT NULL,
  "city" TEXT NOT NULL,
  "state" TEXT NOT NULL,
  "zipCode" TEXT NOT NULL,
  "birthday" DATE NOT NULL,
  "createdAt" TIMESTAMP NOT NULL default now(),
  "userId" integer NOT NULL,
  CONSTRAINT "clients_pk" PRIMARY KEY ("clientId")
) WITH (
  OIDS=FALSE
);
CREATE TABLE "public"."clientNotes" (
  "clientNoteId" serial NOT NULL,
  "clientId" integer NOT NULL,
  "colorFormula" TEXT NOT NULL,
  "processingTime" TEXT NOT NULL,
  "haircutDetails" TEXT NOT NULL,
  "notes" TEXT NOT NULL,
  CONSTRAINT "clientNotes_pk" PRIMARY KEY ("clientNoteId")
) WITH (
  OIDS=FALSE
);
CREATE TABLE "public"."pastAppointments" (
  "pastAppointmentId" serial NOT NULL,
  "clientId" integer NOT NULL,
  "date" DATE NOT NULL,
  "time" TIME NOT NULL,
  "serviceType" TEXT NOT NULL,
  "price" TEXT NOT NULL,
  CONSTRAINT "pastAppointments_pk" PRIMARY KEY ("pastAppointmentId")
) WITH (
  OIDS=FALSE
);
CREATE TABLE "public"."futureAppointments" (
  "futureAppointmentId" serial NOT NULL,
  "clientId" integer NOT NULL,
  "date" DATE NOT NULL,
  "time" TIME NOT NULL,
  "serviceType" TEXT NOT NULL,
  "lengthofTime" integer NOT NULL,
  CONSTRAINT "futureAppointments_pk" PRIMARY KEY ("futureAppointmentId")
) WITH (
  OIDS=FALSE
);
CREATE TABLE "public"."autoReplies" (
  "autoReplyId" serial NOT NULL,
  "userId" bigint NOT NULL,
  "emailTitle" TEXT NOT NULL,
  "replyTime" integer NOT NULL,
  "message" TEXT NOT NULL,
  CONSTRAINT "autoReplies_pk" PRIMARY KEY ("autoReplyId")
) WITH (
  OIDS=FALSE
);

ALTER TABLE "clients" ADD CONSTRAINT "clients_fk0" FOREIGN KEY ("userId") REFERENCES "users"("userId");
ALTER TABLE "clientNotes" ADD CONSTRAINT "clientNotes_fk0" FOREIGN KEY ("clientId") REFERENCES "clients"("clientId");
ALTER TABLE "pastAppointments" ADD CONSTRAINT "pastAppointments_fk0" FOREIGN KEY ("clientId") REFERENCES "clients"("clientId");
ALTER TABLE "futureAppointments" ADD CONSTRAINT "futureAppointments_fk0" FOREIGN KEY ("clientId") REFERENCES "clients"("clientId");
ALTER TABLE "autoReplies" ADD CONSTRAINT "autoReplies_fk0" FOREIGN KEY ("userId") REFERENCES "users"("userId");
