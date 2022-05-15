import {MigrationInterface, QueryRunner} from "typeorm";

export class CreateMenuItemTableAndRelationWithMenu1652636207400 implements MigrationInterface {
    name = 'CreateMenuItemTableAndRelationWithMenu1652636207400'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."menu_item_category_enum" AS ENUM('BEBIDA', 'PRATO PRINCIPAL', 'SOBREMESA', 'ENTRADA')`);
        await queryRunner.query(`CREATE TABLE "menu_item" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(200) NOT NULL, "description" character varying(5000) NOT NULL, "price" numeric(13,2) NOT NULL, "category" "public"."menu_item_category_enum" NOT NULL DEFAULT 'BEBIDA', "url" character varying NOT NULL, "key" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "menuId" uuid, CONSTRAINT "PK_722c4de0accbbfafc77947a8556" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "menu_item" ADD CONSTRAINT "FK_a686871e76438259418aa5faceb" FOREIGN KEY ("menuId") REFERENCES "menu"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "menu_item" DROP CONSTRAINT "FK_a686871e76438259418aa5faceb"`);
        await queryRunner.query(`DROP TABLE "menu_item"`);
        await queryRunner.query(`DROP TYPE "public"."menu_item_category_enum"`);
    }

}
