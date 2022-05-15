import {MigrationInterface, QueryRunner} from "typeorm";

export class CreateTableTableAndRelationWithBookingAndRestaurant1652652649934 implements MigrationInterface {
    name = 'CreateTableTableAndRelationWithBookingAndRestaurant1652652649934'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."table_category_enum" AS ENUM('INTERNA', 'EXTERNA', 'BAR')`);
        await queryRunner.query(`CREATE TYPE "public"."table_status_enum" AS ENUM('DISPONÍVEL', 'OCUPADA', 'INDISPONÍVEL')`);
        await queryRunner.query(`CREATE TABLE "table" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "tableNumber" integer NOT NULL, "category" "public"."table_category_enum" NOT NULL DEFAULT 'INTERNA', "status" "public"."table_status_enum" NOT NULL DEFAULT 'DISPONÍVEL', "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "bookingId" uuid, "restaurantId" uuid, CONSTRAINT "PK_28914b55c485fc2d7a101b1b2a4" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "booking" ADD "restaurantId" uuid`);
        await queryRunner.query(`ALTER TABLE "table" ADD CONSTRAINT "FK_813fc1d25a224eb973fd0b88235" FOREIGN KEY ("bookingId") REFERENCES "booking"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "table" ADD CONSTRAINT "FK_bfbf9c025448272dc0453bf8f55" FOREIGN KEY ("restaurantId") REFERENCES "restaurant"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "booking" ADD CONSTRAINT "FK_2741373bc72499b00ab5dff3d98" FOREIGN KEY ("restaurantId") REFERENCES "restaurant"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "booking" DROP CONSTRAINT "FK_2741373bc72499b00ab5dff3d98"`);
        await queryRunner.query(`ALTER TABLE "table" DROP CONSTRAINT "FK_bfbf9c025448272dc0453bf8f55"`);
        await queryRunner.query(`ALTER TABLE "table" DROP CONSTRAINT "FK_813fc1d25a224eb973fd0b88235"`);
        await queryRunner.query(`ALTER TABLE "booking" DROP COLUMN "restaurantId"`);
        await queryRunner.query(`DROP TABLE "table"`);
        await queryRunner.query(`DROP TYPE "public"."table_status_enum"`);
        await queryRunner.query(`DROP TYPE "public"."table_category_enum"`);
    }

}
