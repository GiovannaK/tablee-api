import {MigrationInterface, QueryRunner} from "typeorm";

export class RemoveOnDeleteCascadeFromFavorite1656284202268 implements MigrationInterface {
    name = 'RemoveOnDeleteCascadeFromFavorite1656284202268'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "FK_90340d62a2c432c97d21d7344c7"`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "FK_90340d62a2c432c97d21d7344c7" FOREIGN KEY ("favoriteId") REFERENCES "favorite"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "FK_90340d62a2c432c97d21d7344c7"`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "FK_90340d62a2c432c97d21d7344c7" FOREIGN KEY ("favoriteId") REFERENCES "favorite"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
