import {MigrationInterface, QueryRunner} from "typeorm";

export class addNullableOptionToMainPhoneFieldFromUserTable1649129134801 implements MigrationInterface {
    name = 'addNullableOptionToMainPhoneFieldFromUserTable1649129134801'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "mainPhone" DROP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "mainPhone" SET NOT NULL`);
    }

}
