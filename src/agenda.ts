import { Agenda } from "agenda";
import { RedisBackend } from "@agendajs/redis-backend";

export const agenda = new Agenda({
  backend: new RedisBackend({
    connectionString: process.env.REDIS_URL || "redis://127.0.0.1:6379",
  }),
});

agenda.define('test', ()=>{
    console.log("testing..");
})

await agenda.start();

await agenda.every("5 seconds", 'test');

async function graceful(){
    await agenda.stop();
}