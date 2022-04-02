import {MigrationInterface, QueryRunner} from "typeorm";

export class addRelationshipBetweenUserAndProfile1648856448478 implements MigrationInterface {
    name = 'addRelationshipBetweenUserAndProfile1648856448478'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "profile" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "avatarUrl" character varying, "avatarUrlKey" character varying, "deletedAt" TIMESTAMP, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_3dd8bfc97e4a77c70971591bdcb" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "user" ADD "profileId" uuid`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "UQ_9466682df91534dd95e4dbaa616" UNIQUE ("profileId")`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "FK_9466682df91534dd95e4dbaa616" FOREIGN KEY ("profileId") REFERENCES "profile"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "FK_9466682df91534dd95e4dbaa616"`);
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "UQ_9466682df91534dd95e4dbaa616"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "profileId"`);
        await queryRunner.query(`DROP TABLE "profile"`);
    }

}
