import {MigrationInterface, QueryRunner} from "typeorm";

export class addBrunchLunchAndDinnerHourColumnsToRestuarantTable1653266474256 implements MigrationInterface {
    name = 'addBrunchLunchAndDinnerHourColumnsToRestuarantTable1653266474256'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "restaurant" ADD "brunch_start_hour" TIME`);
        await queryRunner.query(`ALTER TABLE "restaurant" ADD "brunch_end_hour" TIME`);
        await queryRunner.query(`ALTER TABLE "restaurant" ADD "lunch_start_hour" TIME`);
        await queryRunner.query(`ALTER TABLE "restaurant" ADD "lunch_end_hour" TIME`);
        await queryRunner.query(`ALTER TABLE "restaurant" ADD "dinner_start_hour" TIME`);
        await queryRunner.query(`ALTER TABLE "restaurant" ADD "dinner_end_hour" TIME`);
        await queryRunner.query(`ALTER TABLE "restaurant" ADD "isAvailableForBrunch" boolean NOT NULL DEFAULT true`);
        await queryRunner.query(`ALTER TABLE "restaurant" ADD "isAvailableForLunch" boolean NOT NULL DEFAULT true`);
        await queryRunner.query(`ALTER TABLE "restaurant" ADD "isAvailableForDinner" boolean NOT NULL DEFAULT true`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "restaurant" DROP COLUMN "isAvailableForDinner"`);
        await queryRunner.query(`ALTER TABLE "restaurant" DROP COLUMN "isAvailableForLunch"`);
        await queryRunner.query(`ALTER TABLE "restaurant" DROP COLUMN "isAvailableForBrunch"`);
        await queryRunner.query(`ALTER TABLE "restaurant" DROP COLUMN "dinner_end_hour"`);
        await queryRunner.query(`ALTER TABLE "restaurant" DROP COLUMN "dinner_start_hour"`);
        await queryRunner.query(`ALTER TABLE "restaurant" DROP COLUMN "lunch_end_hour"`);
        await queryRunner.query(`ALTER TABLE "restaurant" DROP COLUMN "lunch_start_hour"`);
        await queryRunner.query(`ALTER TABLE "restaurant" DROP COLUMN "brunch_end_hour"`);
        await queryRunner.query(`ALTER TABLE "restaurant" DROP COLUMN "brunch_start_hour"`);
    }

}
