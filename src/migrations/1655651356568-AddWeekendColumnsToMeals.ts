import {MigrationInterface, QueryRunner} from "typeorm";

export class AddWeekendColumnsToMeals1655651356568 implements MigrationInterface {
    name = 'AddWeekendColumnsToMeals1655651356568'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "restaurant" ADD "brunch_start_hour_weekend" TIME`);
        await queryRunner.query(`ALTER TABLE "restaurant" ADD "brunch_end_hour_weekend" TIME`);
        await queryRunner.query(`ALTER TABLE "restaurant" ADD "lunch_start_hour_weekend" TIME`);
        await queryRunner.query(`ALTER TABLE "restaurant" ADD "lunch_end_hour_weekend" TIME`);
        await queryRunner.query(`ALTER TABLE "restaurant" ADD "dinner_start_hour_weekend" TIME`);
        await queryRunner.query(`ALTER TABLE "restaurant" ADD "dinner_end_hour_weekend" TIME`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "restaurant" DROP COLUMN "dinner_end_hour_weekend"`);
        await queryRunner.query(`ALTER TABLE "restaurant" DROP COLUMN "dinner_start_hour_weekend"`);
        await queryRunner.query(`ALTER TABLE "restaurant" DROP COLUMN "lunch_end_hour_weekend"`);
        await queryRunner.query(`ALTER TABLE "restaurant" DROP COLUMN "lunch_start_hour_weekend"`);
        await queryRunner.query(`ALTER TABLE "restaurant" DROP COLUMN "brunch_end_hour_weekend"`);
        await queryRunner.query(`ALTER TABLE "restaurant" DROP COLUMN "brunch_start_hour_weekend"`);
    }

}
