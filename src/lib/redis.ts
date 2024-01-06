import Redis, { RedisOptions } from "ioredis";

function createRedisInstance() {
    try {
        const options: RedisOptions = {
            host: "redis",
            lazyConnect: true,
            showFriendlyErrorStack: true,
            enableAutoPipelining: true,
            maxRetriesPerRequest: 0,
            retryStrategy: (times: number) => {
                if (times > 3) {
                    throw new Error(
                        `[Redis] Could not connect after ${times} attempts`,
                    );
                }

                return Math.min(times * 200, 1000);
            },
        };

        if (options.host) {
            options.port = 6379;
        }

        const redis = new Redis(options);

        redis.on("connect", () => {
            console.log("redis is working baby");
        });

        redis.on("error", (error: unknown) => {
            console.warn("[Redis] Error connecting", error);
        });

        return redis;
    } catch (e) {
        throw new Error(`[Redis] Could not create a Redis instance`);
    }
}

export const redis = createRedisInstance();
