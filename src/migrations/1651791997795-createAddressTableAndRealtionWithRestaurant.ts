import {MigrationInterface, QueryRunner} from "typeorm";

export class createAddressTableAndRealtionWithRestaurant1651791997795 implements MigrationInterface {
    name = 'createAddressTableAndRealtionWithRestaurant1651791997795'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."address_state_enum" AS ENUM('Acre', 'Alagoas', 'Amapá', 'Amazonas', 'Bahia', 'Ceará', 'Distrito Federal', 'Espírito Santo', 'Goiás', 'Maranhão', 'Mato Grosso', 'Mato Grosso do Sul', 'Minas Gerais', 'Pará', 'Paraíba', 'Paraná', 'Pernambuco', 'Piauí', 'Rio de Janeiro', 'Rio Grande do Norte', 'Rio Grande do Sul', 'Rondônia', 'Roraima', 'Santa Catarina', 'São Paulo', 'Sergipe', 'Tocantins')`);
        await queryRunner.query(`CREATE TABLE "address" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "city" character varying(200) NOT NULL, "uf" character varying(2) NOT NULL, "postalCode" character varying(8) NOT NULL, "neighborhood" character varying(200), "street" character varying(200), "state" "public"."address_state_enum", "deletedAt" TIMESTAMP, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_d92de1f82754668b5f5f5dd4fd5" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "restaurant" ADD "addressId" uuid`);
        await queryRunner.query(`ALTER TABLE "restaurant" ADD CONSTRAINT "UQ_bb5b4776c9456a30666f9233b0f" UNIQUE ("addressId")`);
        await queryRunner.query(`ALTER TABLE "restaurant" ADD CONSTRAINT "FK_bb5b4776c9456a30666f9233b0f" FOREIGN KEY ("addressId") REFERENCES "address"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "restaurant" DROP CONSTRAINT "FK_bb5b4776c9456a30666f9233b0f"`);
        await queryRunner.query(`ALTER TABLE "restaurant" DROP CONSTRAINT "UQ_bb5b4776c9456a30666f9233b0f"`);
        await queryRunner.query(`ALTER TABLE "restaurant" DROP COLUMN "addressId"`);
        await queryRunner.query(`DROP TABLE "address"`);
        await queryRunner.query(`DROP TYPE "public"."address_state_enum"`);
    }

}
