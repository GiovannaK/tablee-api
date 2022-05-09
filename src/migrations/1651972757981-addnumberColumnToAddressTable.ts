import {MigrationInterface, QueryRunner} from "typeorm";

export class addnumberColumnToAddressTable1651972757981 implements MigrationInterface {
    name = 'addnumberColumnToAddressTable1651972757981'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "address" ADD "number" integer NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "address" DROP COLUMN "number"`);
    }

}
