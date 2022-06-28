import {MigrationInterface, QueryRunner} from "typeorm";

export class ChangeToManyToOne1656380189279 implements MigrationInterface {
    name = 'ChangeToManyToOne1656380189279'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "FK_90340d62a2c432c97d21d7344c7"`);
        await queryRunner.query(`ALTER TABLE "restaurant" DROP CONSTRAINT "FK_4e92296100d14c3bffd59ffc9ce"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "favoriteId"`);
        await queryRunner.query(`ALTER TABLE "restaurant" DROP COLUMN "favoriteId"`);
        await queryRunner.query(`ALTER TABLE "favorite" ADD "userId" uuid`);
        await queryRunner.query(`ALTER TABLE "favorite" ADD "restaurantId" uuid`);
        await queryRunner.query(`ALTER TABLE "favorite" ADD CONSTRAINT "FK_83b775fdebbe24c29b2b5831f2d" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "favorite" ADD CONSTRAINT "FK_1148919a07d319dc2565324a6ef" FOREIGN KEY ("restaurantId") REFERENCES "restaurant"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "favorite" DROP CONSTRAINT "FK_1148919a07d319dc2565324a6ef"`);
        await queryRunner.query(`ALTER TABLE "favorite" DROP CONSTRAINT "FK_83b775fdebbe24c29b2b5831f2d"`);
        await queryRunner.query(`ALTER TABLE "favorite" DROP COLUMN "restaurantId"`);
        await queryRunner.query(`ALTER TABLE "favorite" DROP COLUMN "userId"`);
        await queryRunner.query(`ALTER TABLE "restaurant" ADD "favoriteId" uuid`);
        await queryRunner.query(`ALTER TABLE "user" ADD "favoriteId" uuid`);
        await queryRunner.query(`ALTER TABLE "restaurant" ADD CONSTRAINT "FK_4e92296100d14c3bffd59ffc9ce" FOREIGN KEY ("favoriteId") REFERENCES "favorite"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "FK_90340d62a2c432c97d21d7344c7" FOREIGN KEY ("favoriteId") REFERENCES "favorite"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

}
