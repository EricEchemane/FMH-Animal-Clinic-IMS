import { publicProcedure } from '~/server/trpc';
import { z } from 'zod';

const usersProcedure = {
    getUserById: publicProcedure
        .input(
            z.object({
                id: z.string()
            })
        )
        .query(async ({ input }) => {
            console.log(input);

            return {
                id: input.id,
                name: 'eric echemane'
            };
        })
};

export default usersProcedure;