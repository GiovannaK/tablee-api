import {MigrationInterface, QueryRunner} from "typeorm";

export class AddManyToOneToFavorite1656287422023 implements MigrationInterface {
    name = 'AddManyToOneToFavorite1656287422023'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "FK_90340d62a2c432c97d21d7344c7"`);
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "UQ_90340d62a2c432c97d21d7344c7"`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "FK_90340d62a2c432c97d21d7344c7" FOREIGN KEY ("favoriteId") REFERENCES "favorite"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "FK_90340d62a2c432c97d21d7344c7"`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "UQ_90340d62a2c432c97d21d7344c7" UNIQUE ("favoriteId")`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "FK_90340d62a2c432c97d21d7344c7" FOREIGN KEY ("favoriteId") REFERENCES "favorite"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

}
