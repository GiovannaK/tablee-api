import {MigrationInterface, QueryRunner} from "typeorm";

export class RemoveCascade1656284974301 implements MigrationInterface {
    name = 'RemoveCascade1656284974301'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "FK_90340d62a2c432c97d21d7344c7"`);
        await queryRunner.query(`ALTER TABLE "restaurant" DROP CONSTRAINT "FK_4e92296100d14c3bffd59ffc9ce"`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "FK_90340d62a2c432c97d21d7344c7" FOREIGN KEY ("favoriteId") REFERENCES "favorite"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "restaurant" ADD CONSTRAINT "FK_4e92296100d14c3bffd59ffc9ce" FOREIGN KEY ("favoriteId") REFERENCES "favorite"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "restaurant" DROP CONSTRAINT "FK_4e92296100d14c3bffd59ffc9ce"`);
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "FK_90340d62a2c432c97d21d7344c7"`);
        await queryRunner.query(`ALTER TABLE "restaurant" ADD CONSTRAINT "FK_4e92296100d14c3bffd59ffc9ce" FOREIGN KEY ("favoriteId") REFERENCES "favorite"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "FK_90340d62a2c432c97d21d7344c7" FOREIGN KEY ("favoriteId") REFERENCES "favorite"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

}
