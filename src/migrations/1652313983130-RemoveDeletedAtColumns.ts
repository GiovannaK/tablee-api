import {MigrationInterface, QueryRunner} from "typeorm";

export class RemoveDeletedAtColumns1652313983130 implements MigrationInterface {
    name = 'RemoveDeletedAtColumns1652313983130'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "profile" DROP COLUMN "deletedAt"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "deletedAt"`);
        await queryRunner.query(`ALTER TABLE "restaurant" DROP COLUMN "deletedAt"`);
        await queryRunner.query(`ALTER TABLE "address" DROP COLUMN "deletedAt"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "address" ADD "deletedAt" TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE "restaurant" ADD "deletedAt" TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE "user" ADD "deletedAt" TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE "profile" ADD "deletedAt" TIMESTAMP`);
    }

}
