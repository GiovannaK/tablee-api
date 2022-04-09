import {MigrationInterface, QueryRunner} from "typeorm";

export class CreateRestaurantTableAndStablishRelationWithUserTable1649477701672 implements MigrationInterface {
    name = 'CreateRestaurantTableAndStablishRelationWithUserTable1649477701672'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."restaurant_role_enum" AS ENUM('BRASILEIRO', 'BISTRÔ', 'BUFFET', 'CAFETERIA', 'CANTINA', 'CLÁSSICO', 'COMFORT FOOD', 'AUTORAL', 'FAST FOOD', 'GRILL', 'JAPONESA', 'HAMBURGUERIA', 'PIZZARIA', 'JANTAR FINO', 'POPULAR', 'POPUP', 'PUB', 'REDES DE RESTAURANTE', 'MEXICANO', 'ITALIANO', 'CHINÊS', 'ESPANHOL', 'PORTUGUÊS', 'INGLÊS', 'ARGENTINO', 'FRUTOS DO MAR', 'STEAKHOUSE')`);
        await queryRunner.query(`CREATE TABLE "restaurant" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(200) NOT NULL, "cnpj" character varying(14) NOT NULL, "email" character varying(320) NOT NULL, "mainPhone" character varying(11) NOT NULL, "secondaryPhone" character varying(11), "role" "public"."restaurant_role_enum" NOT NULL DEFAULT 'BRASILEIRO', "isWifi" boolean NOT NULL DEFAULT false, "isParking" boolean NOT NULL DEFAULT false, "isOpen" boolean NOT NULL DEFAULT false, "start_hour" TIME NOT NULL, "end_hour" TIME NOT NULL, "weekend_start_hour" TIME NOT NULL, "weekend_end_hour" TIME NOT NULL, "capacity" integer NOT NULL, "stripeAccountId" character varying NOT NULL, "deletedAt" TIMESTAMP, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "userId" uuid, CONSTRAINT "UQ_d055cac5f0f06d57b0a3b1fe574" UNIQUE ("email"), CONSTRAINT "PK_649e250d8b8165cb406d99aa30f" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "restaurant" ADD CONSTRAINT "FK_43ebcd49fca84c2fda8c077ac68" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "restaurant" DROP CONSTRAINT "FK_43ebcd49fca84c2fda8c077ac68"`);
        await queryRunner.query(`DROP TABLE "restaurant"`);
        await queryRunner.query(`DROP TYPE "public"."restaurant_role_enum"`);
    }

}
