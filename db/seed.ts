import { db, CPU, OS, Run } from 'astro:db';

// https://astro.build/db/seed
export default async function seed() {
	await db.insert(CPU).values([
		{
			id: 1,
			manufacturer: 'Intel',
			brand: 'Core i7'
		},
		{	id: 2,
			manufacturer: 'AMD',
			brand: 'Ryzen 9 5900X 12-Core Processor'
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
			cpuId: 1,
			mem_total: 34281472000,
			mem_free: 19548569600,
			graphics: "NVIDIA GeForce GTX 1660 Ti",
			date: new Date(),
			duration: 15000,
		},
		{
			command: "echo 'Hello, World!'",
			osId: 1,
			cpuId: 1,
			mem_total: 34281472000,
			mem_free: 19548569600,
			graphics: "NVIDIA GeForce GTX 1660 Ti",
			date: new Date(),
			duration: 18000
		},
		{
			command: "echo 'Hello, World!'",
			osId: 1,
			cpuId: 1,
			mem_total: 34281472000,
			mem_free: 19548569600,
			graphics: "NVIDIA GeForce GTX 1660 Ti",
			date: new Date(),
			duration: 16000
		},
		{
			command: "echo 'Beta, World!'",
			osId: 1,
			cpuId: 1,
			mem_total: 34281472000,
			mem_free: 19548569600,
			graphics: "NVIDIA GeForce GTX 1660 Ti",
			date: new Date(),
			duration: 16100
		}
	]);
}
