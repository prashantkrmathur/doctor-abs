import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialMigration1754378172537 implements MigrationInterface {
    name = 'InitialMigration1754378172537'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "mobile"`);
        await queryRunner.query(`ALTER TABLE "user" ADD "mobile" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "mobile"`);
        await queryRunner.query(`ALTER TABLE "user" ADD "mobile" integer NOT NULL`);
    }

}
