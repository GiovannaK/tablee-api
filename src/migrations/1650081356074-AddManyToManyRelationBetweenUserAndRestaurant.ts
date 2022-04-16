import {MigrationInterface, QueryRunner} from "typeorm";

export class AddManyToManyRelationBetweenUserAndRestaurant1650081356074 implements MigrationInterface {
    name = 'AddManyToManyRelationBetweenUserAndRestaurant1650081356074'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "restaurant" DROP CONSTRAINT "FK_43ebcd49fca84c2fda8c077ac68"`);
        await queryRunner.query(`ALTER TABLE "restaurant" DROP COLUMN "userId"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "restaurant" ADD "userId" uuid`);
        await queryRunner.query(`ALTER TABLE "restaurant" ADD CONSTRAINT "FK_43ebcd49fca84c2fda8c077ac68" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

}
