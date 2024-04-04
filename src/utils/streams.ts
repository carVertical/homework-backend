import type { Schema } from 'fast-json-stringify';
import fastJson from 'fast-json-stringify';
import { sleep } from './sleep.js';
import { nextGaussian } from './math.js';

export async function* raiseErrorRandomly(
  generator: AsyncGenerator,
  { skipItems, crashProbability }: { skipItems: number; crashProbability: number },
) {
  const resolvedProbability = Math.max(Math.min(crashProbability, 1), 0);
  let itemsRemaining = Math.max(0, nextGaussian(skipItems, 10000));
  for await (const item of generator) {
    itemsRemaining -= 1;
    if (itemsRemaining <= 0) {
      itemsRemaining = Math.max(0, nextGaussian(skipItems, 10000));

      if (Math.random() < resolvedProbability) {
        throw new Error('Oops! Pipe closed!');
      }
    }

    yield item;
  }
}

export async function* toJsonl(schema: Schema, generator: AsyncGenerator) {
  const stringify = fastJson(schema);
  for await (const item of generator) {
    yield `${stringify(item)}\n`;
  }
}

export async function* ensureRate(generator: AsyncGenerator, { itemsPerSecond }: { itemsPerSecond: number }) {
  const startTime = Date.now();
  let itemsTotal = 0;
  for await (const item of generator) {
    itemsTotal += 1;

    const now = Date.now();
    const timePassed = (now - startTime) / 1000;
    const avgItemsPerSecond = itemsTotal / timePassed;

    if (avgItemsPerSecond > itemsPerSecond * 1.5) {
      const timeToWait = Math.floor(nextGaussian((itemsTotal / itemsPerSecond) * 1000 - (now - startTime), 500));
      if (timeToWait > 0) {
        await sleep(timeToWait);
      }
    }

    yield item;
  }
}
