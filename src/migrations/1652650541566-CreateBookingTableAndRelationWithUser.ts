import {MigrationInterface, QueryRunner} from "typeorm";

export class CreateBookingTableAndRelationWithUser1652650541566 implements MigrationInterface {
    name = 'CreateBookingTableAndRelationWithUser1652650541566'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."booking_specialdate_enum" AS ENUM('ANIVERSÁRIO', 'CELEBRAÇÃO', 'REFEIÇÃO DE NEGÓCIOS', 'ENCONTRO')`);
        await queryRunner.query(`CREATE TYPE "public"."booking_bookingstatus_enum" AS ENUM('PENDENTE', 'APROVADA', 'REJEITADA')`);
        await queryRunner.query(`CREATE TABLE "booking" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "date" TIMESTAMP WITH TIME ZONE, "hour" TIME, "partyFor" integer NOT NULL, "extras" character varying(5000) NOT NULL, "isCancelledByUser" boolean NOT NULL DEFAULT false, "isCancelledByRestaurant" boolean NOT NULL DEFAULT false, "isConfirmed" boolean NOT NULL DEFAULT false, "hasArrived" boolean NOT NULL DEFAULT false, "code" character varying(8) NOT NULL, "specialDate" "public"."booking_specialdate_enum" NOT NULL, "bookingStatus" "public"."booking_bookingstatus_enum" NOT NULL DEFAULT 'PENDENTE', "createdByWaitList" boolean NOT NULL DEFAULT false, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "userId" uuid, CONSTRAINT "PK_49171efc69702ed84c812f33540" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "booking" ADD CONSTRAINT "FK_336b3f4a235460dc93645fbf222" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "booking" DROP CONSTRAINT "FK_336b3f4a235460dc93645fbf222"`);
        await queryRunner.query(`DROP TABLE "booking"`);
        await queryRunner.query(`DROP TYPE "public"."booking_bookingstatus_enum"`);
        await queryRunner.query(`DROP TYPE "public"."booking_specialdate_enum"`);
    }

}
