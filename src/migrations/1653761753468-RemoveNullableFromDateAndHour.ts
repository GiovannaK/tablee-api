import {MigrationInterface, QueryRunner} from "typeorm";

export class RemoveNullableFromDateAndHour1653761753468 implements MigrationInterface {
    name = 'RemoveNullableFromDateAndHour1653761753468'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "booking" DROP COLUMN "date"`);
        await queryRunner.query(`ALTER TABLE "booking" ADD "date" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "booking" ALTER COLUMN "hour" SET NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "booking" ALTER COLUMN "hour" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "booking" DROP COLUMN "date"`);
        await queryRunner.query(`ALTER TABLE "booking" ADD "date" TIMESTAMP WITH TIME ZONE`);
    }

}
