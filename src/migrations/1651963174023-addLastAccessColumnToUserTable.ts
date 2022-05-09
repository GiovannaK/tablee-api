import {MigrationInterface, QueryRunner} from "typeorm";

export class addLastAccessColumnToUserTable1651963174023 implements MigrationInterface {
    name = 'addLastAccessColumnToUserTable1651963174023'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ADD "lastAccess" TIMESTAMP WITH TIME ZONE`);
        await queryRunner.query(`ALTER TABLE "address" ALTER COLUMN "state" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "address" ALTER COLUMN "state" SET DEFAULT 'São Paulo'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "address" ALTER COLUMN "state" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "address" ALTER COLUMN "state" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "lastAccess"`);
    }

}
