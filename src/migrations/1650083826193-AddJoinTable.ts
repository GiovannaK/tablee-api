import {MigrationInterface, QueryRunner} from "typeorm";

export class AddJoinTable1650083826193 implements MigrationInterface {
    name = 'AddJoinTable1650083826193'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "user_restaurant_restaurant" ("userId" uuid NOT NULL, "restaurantId" uuid NOT NULL, CONSTRAINT "PK_a4ca284b9770f42a4c393fb9484" PRIMARY KEY ("userId", "restaurantId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_623bd8f8824944289fea479a4c" ON "user_restaurant_restaurant" ("userId") `);
        await queryRunner.query(`CREATE INDEX "IDX_ef0862b8dfc8f9f731772ac8dc" ON "user_restaurant_restaurant" ("restaurantId") `);
        await queryRunner.query(`ALTER TABLE "user_restaurant_restaurant" ADD CONSTRAINT "FK_623bd8f8824944289fea479a4c8" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "user_restaurant_restaurant" ADD CONSTRAINT "FK_ef0862b8dfc8f9f731772ac8dc9" FOREIGN KEY ("restaurantId") REFERENCES "restaurant"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_restaurant_restaurant" DROP CONSTRAINT "FK_ef0862b8dfc8f9f731772ac8dc9"`);
        await queryRunner.query(`ALTER TABLE "user_restaurant_restaurant" DROP CONSTRAINT "FK_623bd8f8824944289fea479a4c8"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_ef0862b8dfc8f9f731772ac8dc"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_623bd8f8824944289fea479a4c"`);
        await queryRunner.query(`DROP TABLE "user_restaurant_restaurant"`);
    }

}
