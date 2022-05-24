import {MigrationInterface, QueryRunner} from "typeorm";

export class RemoveNullableFalseFromExtras1653350108547 implements MigrationInterface {
    name = 'RemoveNullableFalseFromExtras1653350108547'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "booking" ALTER COLUMN "extras" DROP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "booking" ALTER COLUMN "extras" SET NOT NULL`);
    }

}
