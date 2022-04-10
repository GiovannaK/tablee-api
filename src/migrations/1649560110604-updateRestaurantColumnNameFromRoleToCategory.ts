import {MigrationInterface, QueryRunner} from "typeorm";

export class updateRestaurantColumnNameFromRoleToCategory1649560110604 implements MigrationInterface {
    name = 'updateRestaurantColumnNameFromRoleToCategory1649560110604'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "restaurant" RENAME COLUMN "role" TO "category"`);
        await queryRunner.query(`ALTER TYPE "public"."restaurant_role_enum" RENAME TO "restaurant_category_enum"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TYPE "public"."restaurant_category_enum" RENAME TO "restaurant_role_enum"`);
        await queryRunner.query(`ALTER TABLE "restaurant" RENAME COLUMN "category" TO "role"`);
    }

}
