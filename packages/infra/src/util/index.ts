export async function sleep(waitSec: number) {
  return await new Promise((resolve) => setTimeout(resolve, waitSec));
}
