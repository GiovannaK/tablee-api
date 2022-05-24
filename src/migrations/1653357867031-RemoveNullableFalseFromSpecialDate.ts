import {MigrationInterface, QueryRunner} from "typeorm";

export class RemoveNullableFalseFromSpecialDate1653357867031 implements MigrationInterface {
    name = 'RemoveNullableFalseFromSpecialDate1653357867031'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "booking" ALTER COLUMN "specialDate" DROP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "booking" ALTER COLUMN "specialDate" SET NOT NULL`);
    }

}
