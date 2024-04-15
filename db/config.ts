import { defineDb, defineTable, column } from 'astro:db';

export const OS = defineTable({
  columns: {
    id: column.number({ primaryKey: true }),
    platform: column.text(),
    distro: column.text(),
    release: column.text(),
    arch: column.text()
  }
})

export const HW = defineTable({
  columns: {
    id: column.number({primaryKey: true}),
    cpu_manufacturer: column.text(),
    cpu_brand: column.text(),
    graphics: column.text(),
    mem_total: column.number(),
  }
})

export const Run = defineTable({
  columns: {
    id: column.number({ primaryKey: true }),
    command:  column.text(),
    osId: column.number({ references: () => OS.columns.id }),
    hwId: column.number({ references: () => HW.columns.id }),
    mem_free: column.number(),
    date: column.date(),
    duration: column.number()
  }
})


// https://astro.build/db/config
export default defineDb({
  tables: {OS, HW, Run}
});
