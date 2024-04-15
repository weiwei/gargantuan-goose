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

const CPU = defineTable({
  columns: {
    id: column.number({ primaryKey: true }),
    manufacturer: column.text(),
    brand: column.text(),
  }
})

export const Run = defineTable({
  columns: {
    id: column.number({ primaryKey: true }),
    command:  column.text(),
    osId: column.number({ references: () => OS.columns.id }),
    cpuId : column.number({ references: () => CPU.columns.id }),
    mem_total: column.number(),
    mem_free: column.number(),
    graphics: column.text(),
    date: column.date(),
    duration: column.number()
  }
})


// https://astro.build/db/config
export default defineDb({
  tables: {OS, CPU, Run}
});
