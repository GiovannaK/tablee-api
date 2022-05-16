import {MigrationInterface, QueryRunner} from "typeorm";

export class AddColumnsDressCodeAndPaymentTypeToRestaurantTable1652654404208 implements MigrationInterface {
    name = 'AddColumnsDressCodeAndPaymentTypeToRestaurantTable1652654404208'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."restaurant_dresscode_enum" AS ENUM('RESORT CASUAL', 'BUSINESS CASUAL', 'CASUAL', 'FORMAL')`);
        await queryRunner.query(`ALTER TABLE "restaurant" ADD "dressCode" "public"."restaurant_dresscode_enum" NOT NULL DEFAULT 'CASUAL'`);
        await queryRunner.query(`CREATE TYPE "public"."restaurant_acceptedpaymentmethods_enum" AS ENUM('MASTERCARD', 'VISA', 'DISCOVER', 'AMEX', 'DINHEIRO')`);
        await queryRunner.query(`ALTER TABLE "restaurant" ADD "acceptedPaymentMethods" "public"."restaurant_acceptedpaymentmethods_enum" array NOT NULL DEFAULT '{DINHEIRO}'`);
        await queryRunner.query(`ALTER TABLE "restaurant" ADD "thumbUrl" character varying`);
        await queryRunner.query(`ALTER TABLE "restaurant" ADD "thumbKey" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "restaurant" DROP COLUMN "thumbKey"`);
        await queryRunner.query(`ALTER TABLE "restaurant" DROP COLUMN "thumbUrl"`);
        await queryRunner.query(`ALTER TABLE "restaurant" DROP COLUMN "acceptedPaymentMethods"`);
        await queryRunner.query(`DROP TYPE "public"."restaurant_acceptedpaymentmethods_enum"`);
        await queryRunner.query(`ALTER TABLE "restaurant" DROP COLUMN "dressCode"`);
        await queryRunner.query(`DROP TYPE "public"."restaurant_dresscode_enum"`);
    }

}
