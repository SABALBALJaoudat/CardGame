import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateCardsTable1741015079940 implements MigrationInterface {
    name = 'CreateCardsTable1741015079940'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "family" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, CONSTRAINT "PK_ba386a5a59c3de8593cda4e5626" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "card" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "attack" integer NOT NULL, "energy" integer NOT NULL, "hp" integer NOT NULL, "image" character varying, "familyId" integer, CONSTRAINT "PK_9451069b6f1199730791a7f4ae4" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "deck" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "userId" integer, "cardsId" integer, CONSTRAINT "PK_99f8010303acab0edf8e1df24f9" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "statistics" ("id" SERIAL NOT NULL, "gamesPlayed" integer NOT NULL, "gamesWon" integer NOT NULL, "averageGameTime" integer NOT NULL, "userId" integer, CONSTRAINT "PK_c3769cca342381fa827a0f246a7" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user" ("id" SERIAL NOT NULL, "username" character varying NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "booster" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, CONSTRAINT "PK_676f474085594c1633a5dea2da5" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "card" ADD CONSTRAINT "FK_65b6093634307134cb2d85606c6" FOREIGN KEY ("familyId") REFERENCES "family"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "deck" ADD CONSTRAINT "FK_09e8a376bab70b9737c839b2e24" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "deck" ADD CONSTRAINT "FK_325068c9d793a46743461136e4e" FOREIGN KEY ("cardsId") REFERENCES "card"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "statistics" ADD CONSTRAINT "FK_c9989a8e8506743633ba5e0aed0" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "statistics" DROP CONSTRAINT "FK_c9989a8e8506743633ba5e0aed0"`);
        await queryRunner.query(`ALTER TABLE "deck" DROP CONSTRAINT "FK_325068c9d793a46743461136e4e"`);
        await queryRunner.query(`ALTER TABLE "deck" DROP CONSTRAINT "FK_09e8a376bab70b9737c839b2e24"`);
        await queryRunner.query(`ALTER TABLE "card" DROP CONSTRAINT "FK_65b6093634307134cb2d85606c6"`);
        await queryRunner.query(`DROP TABLE "booster"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TABLE "statistics"`);
        await queryRunner.query(`DROP TABLE "deck"`);
        await queryRunner.query(`DROP TABLE "card"`);
        await queryRunner.query(`DROP TABLE "family"`);
    }

}
