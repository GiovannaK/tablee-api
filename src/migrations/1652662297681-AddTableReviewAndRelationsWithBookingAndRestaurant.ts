import {MigrationInterface, QueryRunner} from "typeorm";

export class AddTableReviewAndRelationsWithBookingAndRestaurant1652662297681 implements MigrationInterface {
    name = 'AddTableReviewAndRelationsWithBookingAndRestaurant1652662297681'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "review" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "rating" integer NOT NULL, "comment" character varying(2000) NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "restaurantId" uuid, "bookingId" uuid, CONSTRAINT "REL_5672298e363f80650319557e8c" UNIQUE ("bookingId"), CONSTRAINT "PK_2e4299a343a81574217255c00ca" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "review" ADD CONSTRAINT "FK_209aeb49a7aebc856b84b940a41" FOREIGN KEY ("restaurantId") REFERENCES "restaurant"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "review" ADD CONSTRAINT "FK_5672298e363f80650319557e8ce" FOREIGN KEY ("bookingId") REFERENCES "booking"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "review" DROP CONSTRAINT "FK_5672298e363f80650319557e8ce"`);
        await queryRunner.query(`ALTER TABLE "review" DROP CONSTRAINT "FK_209aeb49a7aebc856b84b940a41"`);
        await queryRunner.query(`DROP TABLE "review"`);
    }

}
