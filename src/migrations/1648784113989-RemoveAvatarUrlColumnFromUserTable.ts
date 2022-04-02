import {MigrationInterface, QueryRunner} from "typeorm";

export class RemoveAvatarUrlColumnFromUserTable1648784113989 implements MigrationInterface {
    name = 'RemoveAvatarUrlColumnFromUserTable1648784113989'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "avatarUrl"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ADD "avatarUrl" character varying`);
    }

}
