import process from "node:process";
import { inArray } from "drizzle-orm";
import { drizzle } from "drizzle-orm/mysql2";
import {
	int,
	mysqlTable,
	serial,
	timestamp,
	varchar
} from "drizzle-orm/mysql-core";
import mysql from "mysql2/promise";
import "dotenv/config";

// Create the connection
const poolConnection = mysql.createPool(process.env.DATABASE_URL as string);

export const db = drizzle(poolConnection);

export const Repository = mysqlTable("repository", {
	id: serial("id").primaryKey(),
	language: varchar("language", {length: 64}),
	ownerName: varchar("owner_name", {length: 64}),
	ownerUrl: varchar("owner_url", {length: 128}),
	name: varchar("name", {length: 64}),
	star: int("star"),
	description: varchar("description", {length: 256}),
	url: varchar("url", {length: 256}),
	created: timestamp("created")
});

type IRepository = {
	id: number;
	name: string;
	description: string;
	html_url: string;
	stargazers_count: number;
	language?: string;
	owner: {
		login?: string;
		repos_url?: string;
		html_url?: string;
	};
};

async function main() {
	const date = new Date();
	date.setDate(date.getDate() - 3);
	const dateStr = date.toISOString().split("T")[0];
	console.log("task start: date >=", date.toISOString());

	const response = await fetch(
		`https://api.github.com/search/repositories?sort=stars&order=desc&per_page=100&q=created%3A%3E${dateStr}`
	);
	const repositories = await response.json() as { items: IRepository[] };
	let list = repositories.items.map((item: IRepository) => ({
		id: item.id,
		language: item?.language,
		ownerName: item.owner?.login,
		ownerUrl: item.owner?.html_url,
		name: item.name,
		star: item.stargazers_count,
		description: item.description,
		url: item.html_url,
		created: new Date()
	}));
	console.log("fetch count", list.length);

	const old = await db.select({id: Repository.id}).from(Repository)
		.where(inArray(Repository.id, list.map((x) => x.id)));
	const ids = old.map((x) => x.id);
	list = list.filter((x) => !ids.includes(x.id));
	console.log("new count", list.length);

	if (list?.length) {
		await db.insert(Repository).values(list);
	}

	poolConnection.end();
}

main();
