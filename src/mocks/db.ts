import { factory, primaryKey } from "@mswjs/data";

export const db = factory({
  todo: {
    id: primaryKey(Number),
    title: String,
    isDone: Boolean,
  },
});
