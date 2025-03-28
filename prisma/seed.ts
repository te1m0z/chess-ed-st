import { runUser } from './seeders/user'

async function runSeeders() {
  await runUser()
}

runSeeders()
