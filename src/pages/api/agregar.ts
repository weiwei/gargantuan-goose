import type { APIRoute } from "astro";
import { db, eq, and, CPU, OS, Run } from "astro:db";
import si from "systeminformation";


export const POST: APIRoute = async ({ request }) => {
  const data = await request.json();
  const cpuInfo = data.cpuInfo as any;
  let insertedCPU = await db.select().from(CPU).where(
    and(eq(CPU.manufacturer, cpuInfo.manufacturer), eq(CPU.brand, cpuInfo.brand)));
  if (!insertedCPU) {
    insertedCPU = await db.insert(CPU).values(cpuInfo).returning();
  }

  const osInfo = data.osInfo as any;
  let insertedOs = await db.select().from(OS).where(and(
    eq(OS.arch, osInfo.arch), 
    eq(OS.distro, osInfo.distro),
    eq(OS.platform, osInfo.platform), 
    eq(OS.release, osInfo.release)
  ));
  if (!insertedOs) {
    insertedOs = await db.insert(OS).values(osInfo).returning();
  }

  const inserted = await db.insert(Run).values({
    command: data.command, 
    osId: insertedOs[0].id, 
    cpuId: insertedCPU[0].id, 
    mem_total: data.mem.total,
    mem_free: data.mem.free, 
    date: new Date(), 
    duration: data.duration}).returning();

  return new Response(
    JSON.stringify({
      message: inserted[0]
    }),
    { status: 200 }
  );
};
