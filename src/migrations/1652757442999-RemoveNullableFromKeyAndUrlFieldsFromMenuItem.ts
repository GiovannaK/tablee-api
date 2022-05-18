import {MigrationInterface, QueryRunner} from "typeorm";

export class RemoveNullableFromKeyAndUrlFieldsFromMenuItem1652757442999 implements MigrationInterface {
    name = 'RemoveNullableFromKeyAndUrlFieldsFromMenuItem1652757442999'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "menu_item" ALTER COLUMN "url" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "menu_item" ALTER COLUMN "key" DROP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "menu_item" ALTER COLUMN "key" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "menu_item" ALTER COLUMN "url" SET NOT NULL`);
    }

}
