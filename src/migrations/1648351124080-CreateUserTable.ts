import {MigrationInterface, QueryRunner} from "typeorm";

export class CreateUserTable1648351124080 implements MigrationInterface {
    name = 'CreateUserTable1648351124080'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."user_role_enum" AS ENUM('user', 'owner', 'employee', 'manager')`);
        await queryRunner.query(`CREATE TABLE "user" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "firstName" character varying(200) NOT NULL, "lastName" character varying(200) NOT NULL, "email" character varying(320) NOT NULL, "mainPhone" character varying(11) NOT NULL, "secondaryPhone" character varying(11), "isRegisteredWithGoogle" boolean NOT NULL DEFAULT false, "role" "public"."user_role_enum" NOT NULL DEFAULT 'user', "loginToken" character varying, "expirationLoginToken" character varying, "stripeCustomerId" character varying, "deletedAt" TIMESTAMP, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TYPE "public"."user_role_enum"`);
    }

}
