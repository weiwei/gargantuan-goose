import type { APIRoute } from "astro";
import { db, eq, and, HW, OS, Run } from "astro:db";
import si from "systeminformation";

export const GET: APIRoute = async ({ request }) => {
  // Test anything here
  const gpu = await si.graphics();
  gpu.controllers[0].model;
  return new Response(JSON.stringify(gpu), { status: 200 });
};

export const POST: APIRoute = async ({ request }) => {
  const data = await request.json();
  const cpuInfo = data.cpu as any;
  let insertedHW = await db
    .select()
    .from(HW)
    .where(
      and(
        eq(HW.cpu_manufacturer, cpuInfo.manufacturer),
        eq(HW.cpu_brand, cpuInfo.brand),
        eq(HW.cpu_cores, cpuInfo.physicalCores),
        eq(HW.mem_total, data.mem.total),
        eq(HW.graphics, data.graphics.controllers[0].model)
      )
    );
  if (insertedHW.length === 0) {
    insertedHW = await db
      .insert(HW)
      .values({
        cpu_brand: cpuInfo.brand,
        cpu_cores: cpuInfo.physicalCores,
        cpu_manufacturer: cpuInfo.manufacturer,
        mem_total: data.mem.total,
        graphics: data.graphics.controllers[0].model,
      })
      .returning();
  }

  const osInfo = data.osInfo as any;
  let insertedOs = await db
    .select()
    .from(OS)
    .where(
      and(
        eq(OS.arch, osInfo.arch),
        eq(OS.distro, osInfo.distro),
        eq(OS.platform, osInfo.platform),
        eq(OS.release, osInfo.release)
      )
    );
  if (insertedOs.length === 0) {
    insertedOs = await db.insert(OS).values(osInfo).returning();
  }

  const inserted = await db
    .insert(Run)
    .values({
      command: data.command,
      osId: insertedOs[0].id,
      hwId: insertedHW[0].id,
      mem_free: data.mem.free,
      date: new Date(),
      duration: data.duration / 1000,
    })
    .returning();

  return new Response(
    JSON.stringify({
      message: inserted[0],
    }),
    { status: 200 }
  );
};
