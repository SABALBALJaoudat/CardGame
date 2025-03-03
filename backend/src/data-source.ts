import "reflect-metadata";
import { DataSource } from "typeorm";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "postgres",
  password: "postgres",
  database: "cardgame_goodboybattle",
  entities: ["src/**/*.entity.ts"],
  migrations: ["src/migrations/*.ts"],
  synchronize: false, // On utilise les migrations
  logging: true,
});

AppDataSource.initialize()
  .then(() => console.log("Data Source initialized"))
  .catch((err) => console.error("Error initializing Data Source", err));
