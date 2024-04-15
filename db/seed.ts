import { db, HW, OS, Run } from 'astro:db';

// https://astro.build/db/seed
export default async function seed() {
	await db.insert(HW).values([
		{
			id: 1,
			cpu_manufacturer: 'Intel',
			cpu_brand: 'Core i7',
			mem_total: 51200000,
			graphics: "Nvidia N4090"
		},
		{	id: 2,
			cpu_manufacturer: 'AMD',
			cpu_brand: 'Ryzen 9 5900X 12-Core Processor',
			mem_total: 51200000,
			graphics: "AMD 7900"
		}
	]);
	await db.insert(OS).values([
		{
			id: 1,
			platform: "Windows",
			distro: "Microsoft Windows 11 Pro",
			release: "10.0.22631",
			arch: "x64"
		}
	]);
	await db.insert(Run).values([
		{
			command: "echo 'Hello, World!'",
			osId: 1,
			hwId: 1,
			mem_free: 19548569600,
			date: new Date(),
			duration: 15000,
		},
		{
			command: "echo 'Hello, World!'",
			osId: 1,
			hwId: 1,
			mem_free: 19548569600,
			date: new Date(),
			duration: 18000
		},
		{
			command: "echo 'Hello, World!'",
			osId: 1,
			hwId: 1,
			mem_free: 19548569600,
			date: new Date(),
			duration: 16000
		},
		{
			command: "echo 'Beta, World!'",
			osId: 1,
			hwId: 1,
			mem_free: 19548569600,
			date: new Date(),
			duration: 16100
		}
	]);
}
