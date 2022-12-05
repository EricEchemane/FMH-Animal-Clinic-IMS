
import * as trpcNext from '@trpc/server/adapters/next';
import usersProcedure from '~/procedures/user';
import { router } from '~/server/trpc';

const appRouter = router({
  ...usersProcedure
});


export type AppRouter = typeof appRouter;

export default trpcNext.createNextApiHandler({
  router: appRouter,
  createContext: () => ({}),
});
