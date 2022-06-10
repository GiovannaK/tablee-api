import {MigrationInterface, QueryRunner} from "typeorm";

export class AddNewStatusToBookingStatus1654828438723 implements MigrationInterface {
    name = 'AddNewStatusToBookingStatus1654828438723'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TYPE "public"."booking_bookingstatus_enum" RENAME TO "booking_bookingstatus_enum_old"`);
        await queryRunner.query(`CREATE TYPE "public"."booking_bookingstatus_enum" AS ENUM('PENDENTE', 'APROVADA', 'REJEITADA', 'FINALIZADA', 'CANCELADA', 'TRANSCORRENDO')`);
        await queryRunner.query(`ALTER TABLE "booking" ALTER COLUMN "bookingStatus" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "booking" ALTER COLUMN "bookingStatus" TYPE "public"."booking_bookingstatus_enum" USING "bookingStatus"::"text"::"public"."booking_bookingstatus_enum"`);
        await queryRunner.query(`ALTER TABLE "booking" ALTER COLUMN "bookingStatus" SET DEFAULT 'PENDENTE'`);
        await queryRunner.query(`DROP TYPE "public"."booking_bookingstatus_enum_old"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."booking_bookingstatus_enum_old" AS ENUM('PENDENTE', 'APROVADA', 'REJEITADA', 'FINALIZADA', 'CANCELADA')`);
        await queryRunner.query(`ALTER TABLE "booking" ALTER COLUMN "bookingStatus" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "booking" ALTER COLUMN "bookingStatus" TYPE "public"."booking_bookingstatus_enum_old" USING "bookingStatus"::"text"::"public"."booking_bookingstatus_enum_old"`);
        await queryRunner.query(`ALTER TABLE "booking" ALTER COLUMN "bookingStatus" SET DEFAULT 'PENDENTE'`);
        await queryRunner.query(`DROP TYPE "public"."booking_bookingstatus_enum"`);
        await queryRunner.query(`ALTER TYPE "public"."booking_bookingstatus_enum_old" RENAME TO "booking_bookingstatus_enum"`);
    }

}
