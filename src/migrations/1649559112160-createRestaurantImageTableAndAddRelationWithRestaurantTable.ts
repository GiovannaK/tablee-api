import {MigrationInterface, QueryRunner} from "typeorm";

export class createRestaurantImageTableAndAddRelationWithRestaurantTable1649559112160 implements MigrationInterface {
    name = 'createRestaurantImageTableAndAddRelationWithRestaurantTable1649559112160'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "restaurant_image" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "url" character varying NOT NULL, "key" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "restaurantId" uuid, CONSTRAINT "PK_5040fdcfbdf7ed485c367e79c44" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "restaurant_image" ADD CONSTRAINT "FK_3fe2be4e5fe214c66b4dccaeb52" FOREIGN KEY ("restaurantId") REFERENCES "restaurant"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "restaurant_image" DROP CONSTRAINT "FK_3fe2be4e5fe214c66b4dccaeb52"`);
        await queryRunner.query(`DROP TABLE "restaurant_image"`);
    }

}
