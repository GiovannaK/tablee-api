import {MigrationInterface, QueryRunner} from "typeorm";

export class addTablePreferenceColumn1653765970819 implements MigrationInterface {
    name = 'addTablePreferenceColumn1653765970819'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."booking_tablecategorypreferences_enum" AS ENUM('INTERNA', 'EXTERNA', 'BAR')`);
        await queryRunner.query(`ALTER TABLE "booking" ADD "tableCategoryPreferences" "public"."booking_tablecategorypreferences_enum" array`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "booking" DROP COLUMN "tableCategoryPreferences"`);
        await queryRunner.query(`DROP TYPE "public"."booking_tablecategorypreferences_enum"`);
    }

}
