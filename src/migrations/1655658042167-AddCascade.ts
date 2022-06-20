import {MigrationInterface, QueryRunner} from "typeorm";

export class AddCascade1655658042167 implements MigrationInterface {
    name = 'AddCascade1655658042167'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "restaurant" DROP CONSTRAINT "FK_bb5b4776c9456a30666f9233b0f"`);
        await queryRunner.query(`ALTER TABLE "restaurant" ADD CONSTRAINT "FK_bb5b4776c9456a30666f9233b0f" FOREIGN KEY ("addressId") REFERENCES "address"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "restaurant" DROP CONSTRAINT "FK_bb5b4776c9456a30666f9233b0f"`);
        await queryRunner.query(`ALTER TABLE "restaurant" ADD CONSTRAINT "FK_bb5b4776c9456a30666f9233b0f" FOREIGN KEY ("addressId") REFERENCES "address"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
