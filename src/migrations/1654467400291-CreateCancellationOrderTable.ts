import {MigrationInterface, QueryRunner} from "typeorm";

export class CreateCancellationOrderTable1654467400291 implements MigrationInterface {
    name = 'CreateCancellationOrderTable1654467400291'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."booking_order_cancellation_bookingcancelstatus_enum" AS ENUM('processing', 'succeeded', 'amount_capturable_updated', 'payment_failed')`);
        await queryRunner.query(`CREATE TABLE "booking_order_cancellation" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "price" numeric(13,2), "bookingCancelStatus" "public"."booking_order_cancellation_bookingcancelstatus_enum" NOT NULL DEFAULT 'processing', "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_37e38f035e66ed26cf41cafb2a5" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "booking" ADD "bookingOrderCancellationId" uuid`);
        await queryRunner.query(`ALTER TABLE "booking" ADD CONSTRAINT "UQ_8645f21bc06f02cd84f127a774c" UNIQUE ("bookingOrderCancellationId")`);
        await queryRunner.query(`ALTER TABLE "booking" ADD CONSTRAINT "FK_8645f21bc06f02cd84f127a774c" FOREIGN KEY ("bookingOrderCancellationId") REFERENCES "booking_order_cancellation"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "booking" DROP CONSTRAINT "FK_8645f21bc06f02cd84f127a774c"`);
        await queryRunner.query(`ALTER TABLE "booking" DROP CONSTRAINT "UQ_8645f21bc06f02cd84f127a774c"`);
        await queryRunner.query(`ALTER TABLE "booking" DROP COLUMN "bookingOrderCancellationId"`);
        await queryRunner.query(`DROP TABLE "booking_order_cancellation"`);
        await queryRunner.query(`DROP TYPE "public"."booking_order_cancellation_bookingcancelstatus_enum"`);
    }

}
