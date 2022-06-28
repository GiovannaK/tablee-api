import {MigrationInterface, QueryRunner} from "typeorm";

export class AddCascade1656290036936 implements MigrationInterface {
    name = 'AddCascade1656290036936'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "restaurant" DROP CONSTRAINT "FK_4e92296100d14c3bffd59ffc9ce"`);
        await queryRunner.query(`ALTER TABLE "restaurant" ADD CONSTRAINT "FK_4e92296100d14c3bffd59ffc9ce" FOREIGN KEY ("favoriteId") REFERENCES "favorite"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "restaurant" DROP CONSTRAINT "FK_4e92296100d14c3bffd59ffc9ce"`);
        await queryRunner.query(`ALTER TABLE "restaurant" ADD CONSTRAINT "FK_4e92296100d14c3bffd59ffc9ce" FOREIGN KEY ("favoriteId") REFERENCES "favorite"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
