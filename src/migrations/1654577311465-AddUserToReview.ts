import {MigrationInterface, QueryRunner} from "typeorm";

export class AddUserToReview1654577311465 implements MigrationInterface {
    name = 'AddUserToReview1654577311465'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "review" DROP CONSTRAINT "FK_209aeb49a7aebc856b84b940a41"`);
        await queryRunner.query(`ALTER TABLE "review" RENAME COLUMN "restaurantId" TO "userId"`);
        await queryRunner.query(`ALTER TABLE "review" ADD CONSTRAINT "FK_1337f93918c70837d3cea105d39" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "review" DROP CONSTRAINT "FK_1337f93918c70837d3cea105d39"`);
        await queryRunner.query(`ALTER TABLE "review" RENAME COLUMN "userId" TO "restaurantId"`);
        await queryRunner.query(`ALTER TABLE "review" ADD CONSTRAINT "FK_209aeb49a7aebc856b84b940a41" FOREIGN KEY ("restaurantId") REFERENCES "restaurant"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

}
