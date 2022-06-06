import {MigrationInterface, QueryRunner} from "typeorm";

export class CreateTableFavorite1654481937997 implements MigrationInterface {
    name = 'CreateTableFavorite1654481937997'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "favorite" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_495675cec4fb09666704e4f610f" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "user" ADD "favoriteId" uuid`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "UQ_90340d62a2c432c97d21d7344c7" UNIQUE ("favoriteId")`);
        await queryRunner.query(`ALTER TABLE "restaurant" ADD "favoriteId" uuid`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "FK_90340d62a2c432c97d21d7344c7" FOREIGN KEY ("favoriteId") REFERENCES "favorite"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "restaurant" ADD CONSTRAINT "FK_4e92296100d14c3bffd59ffc9ce" FOREIGN KEY ("favoriteId") REFERENCES "favorite"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "restaurant" DROP CONSTRAINT "FK_4e92296100d14c3bffd59ffc9ce"`);
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "FK_90340d62a2c432c97d21d7344c7"`);
        await queryRunner.query(`ALTER TABLE "restaurant" DROP COLUMN "favoriteId"`);
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "UQ_90340d62a2c432c97d21d7344c7"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "favoriteId"`);
        await queryRunner.query(`DROP TABLE "favorite"`);
    }

}
