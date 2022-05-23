import {MigrationInterface, QueryRunner} from "typeorm";

export class AddColumnSeatsToTable1653329195743 implements MigrationInterface {
    name = 'AddColumnSeatsToTable1653329195743'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "table" ADD "seats" integer NOT NULL DEFAULT '2'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "table" DROP COLUMN "seats"`);
    }

}
