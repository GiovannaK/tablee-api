import {MigrationInterface, QueryRunner} from "typeorm";

export class updateRestaurantColumnFromStripeAccountIdNotNullToNull1649567624496 implements MigrationInterface {
    name = 'updateRestaurantColumnFromStripeAccountIdNotNullToNull1649567624496'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "restaurant" ALTER COLUMN "stripeAccountId" DROP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "restaurant" ALTER COLUMN "stripeAccountId" SET NOT NULL`);
    }

}
