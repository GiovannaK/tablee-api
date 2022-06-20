import {MigrationInterface, QueryRunner} from "typeorm";

export class AddMaxGuestColumn1655520079906 implements MigrationInterface {
    name = 'AddMaxGuestColumn1655520079906'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "restaurant" ADD "maxGuestQuantity" integer NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "restaurant" DROP COLUMN "maxGuestQuantity"`);
    }

}
