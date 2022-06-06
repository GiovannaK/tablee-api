import {MigrationInterface, QueryRunner} from "typeorm";

export class CreateTableWaitList1654480735540 implements MigrationInterface {
    name = 'CreateTableWaitList1654480735540'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "wait_list" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_263b33e683bd5465d873746786f" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "booking" ADD "waitListId" uuid`);
        await queryRunner.query(`ALTER TABLE "restaurant" ADD "waitlistId" uuid`);
        await queryRunner.query(`ALTER TABLE "restaurant" ADD CONSTRAINT "UQ_3e11526f6d8ae40176b736fd4be" UNIQUE ("waitlistId")`);
        await queryRunner.query(`ALTER TYPE "public"."menu_item_category_enum" RENAME TO "menu_item_category_enum_old"`);
        await queryRunner.query(`CREATE TYPE "public"."menu_item_category_enum" AS ENUM('BEBIDA ALCOÓLICA', 'BEBIDA SEM ÁLCOOL', 'PRATO PRINCIPAL', 'SOBREMESA', 'ENTRADA')`);
        await queryRunner.query(`ALTER TABLE "menu_item" ALTER COLUMN "category" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "menu_item" ALTER COLUMN "category" TYPE "public"."menu_item_category_enum" USING "category"::"text"::"public"."menu_item_category_enum"`);
        await queryRunner.query(`ALTER TABLE "menu_item" ALTER COLUMN "category" SET DEFAULT 'BEBIDA SEM ÁLCOOL'`);
        await queryRunner.query(`DROP TYPE "public"."menu_item_category_enum_old"`);
        await queryRunner.query(`ALTER TABLE "booking" ADD CONSTRAINT "FK_405118dbfcdc9e7391ba5c1cc05" FOREIGN KEY ("waitListId") REFERENCES "wait_list"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "restaurant" ADD CONSTRAINT "FK_3e11526f6d8ae40176b736fd4be" FOREIGN KEY ("waitlistId") REFERENCES "wait_list"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "restaurant" DROP CONSTRAINT "FK_3e11526f6d8ae40176b736fd4be"`);
        await queryRunner.query(`ALTER TABLE "booking" DROP CONSTRAINT "FK_405118dbfcdc9e7391ba5c1cc05"`);
        await queryRunner.query(`CREATE TYPE "public"."menu_item_category_enum_old" AS ENUM('BEBIDA', 'PRATO PRINCIPAL', 'SOBREMESA', 'ENTRADA')`);
        await queryRunner.query(`ALTER TABLE "menu_item" ALTER COLUMN "category" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "menu_item" ALTER COLUMN "category" TYPE "public"."menu_item_category_enum_old" USING "category"::"text"::"public"."menu_item_category_enum_old"`);
        await queryRunner.query(`ALTER TABLE "menu_item" ALTER COLUMN "category" SET DEFAULT 'BEBIDA'`);
        await queryRunner.query(`DROP TYPE "public"."menu_item_category_enum"`);
        await queryRunner.query(`ALTER TYPE "public"."menu_item_category_enum_old" RENAME TO "menu_item_category_enum"`);
        await queryRunner.query(`ALTER TABLE "restaurant" DROP CONSTRAINT "UQ_3e11526f6d8ae40176b736fd4be"`);
        await queryRunner.query(`ALTER TABLE "restaurant" DROP COLUMN "waitlistId"`);
        await queryRunner.query(`ALTER TABLE "booking" DROP COLUMN "waitListId"`);
        await queryRunner.query(`DROP TABLE "wait_list"`);
    }

}
