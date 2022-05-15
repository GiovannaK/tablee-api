import {MigrationInterface, QueryRunner} from "typeorm";

export class CreateMenuTableAndRelationWithRestaurant1652633798506 implements MigrationInterface {
    name = 'CreateMenuTableAndRelationWithRestaurant1652633798506'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "menu" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "title" character varying(200) NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "restaurantId" uuid, CONSTRAINT "PK_35b2a8f47d153ff7a41860cceeb" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "menu" ADD CONSTRAINT "FK_085156de3c3a44eba017a6a0846" FOREIGN KEY ("restaurantId") REFERENCES "restaurant"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "menu" DROP CONSTRAINT "FK_085156de3c3a44eba017a6a0846"`);
        await queryRunner.query(`DROP TABLE "menu"`);
    }

}
