/* eslint-disable no-console */
import { execSync } from 'child_process';

export default async (): Promise<void> => {
  console.log('Stoping docker container');
  execSync('docker-compose -f "__tests__/postgresql/docker-compose-yml" down');
  execSync(`rm ${__dirname}/postgresql/database/init.sql`);
};
