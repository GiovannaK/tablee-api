import {MigrationInterface, QueryRunner} from "typeorm";

export class CreateCancellationTableAndRelationWithRestaurant1654465926270 implements MigrationInterface {
    name = 'CreateCancellationTableAndRelationWithRestaurant1654465926270'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "cancellation_policy" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "tax" numeric(13,2), "details" text, "limitDaysToCancel" integer, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_de4920dafdc3f8e1636321162d3" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "restaurant" ADD "cancellationPolicyId" uuid`);
        await queryRunner.query(`ALTER TABLE "restaurant" ADD CONSTRAINT "UQ_238ba4a3c399066b277ed168d31" UNIQUE ("cancellationPolicyId")`);
        await queryRunner.query(`ALTER TABLE "restaurant" ADD CONSTRAINT "FK_238ba4a3c399066b277ed168d31" FOREIGN KEY ("cancellationPolicyId") REFERENCES "cancellation_policy"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "restaurant" DROP CONSTRAINT "FK_238ba4a3c399066b277ed168d31"`);
        await queryRunner.query(`ALTER TABLE "restaurant" DROP CONSTRAINT "UQ_238ba4a3c399066b277ed168d31"`);
        await queryRunner.query(`ALTER TABLE "restaurant" DROP COLUMN "cancellationPolicyId"`);
        await queryRunner.query(`DROP TABLE "cancellation_policy"`);
    }

}
