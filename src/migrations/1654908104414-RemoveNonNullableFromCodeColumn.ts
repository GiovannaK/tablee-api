import {MigrationInterface, QueryRunner} from "typeorm";

export class RemoveNonNullableFromCodeColumn1654908104414 implements MigrationInterface {
    name = 'RemoveNonNullableFromCodeColumn1654908104414'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "booking" ALTER COLUMN "code" DROP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "booking" ALTER COLUMN "code" SET NOT NULL`);
    }

}
