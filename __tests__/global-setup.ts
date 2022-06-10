/* eslint-disable no-console */
import { execSync } from 'child_process';

const exec = (cmd: string) => {
  console.log(`+ ${cmd}`);
  execSync(cmd);
};

export default async (): Promise<void> => {
  console.log('Preparing local postgres');
  exec(`cat ${__dirname}/postgresql/database/create-tables.sql ${__dirname}/postgresql/database/populate.sql > ${__dirname}/postgresql/database/init.sql`);
  console.log('Launching docker container');
  exec('docker-compose -f "__tests__/postgresql/docker-compose-yml" up --force-recreate -d -V');
  console.log('...waiting to start');
  exec('until docker exec -u 0 postgresql_twit_db_1 pg_isready; do sleep 2; done');
  console.log('Launching docker container');
};
