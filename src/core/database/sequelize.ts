import { Sequelize } from 'sequelize-typescript';

// Option 2: Passing parameters separately (sqlite)
export const sequelize = new Sequelize({
	dialect: 'sqlite',
	storage: '.database.sqlite'
});

// Option 3: Passing parameters separately (other dialects)
// const sequelize = new Sequelize('database', 'username', 'password', {
// 	host: 'localhost',
// 	dialect: /* one of 'mysql' | 'postgres' | 'sqlite' | 'mariadb' | 'mssql' | 'db2' | 'snowflake' | 'oracle' */
// });

