import { User as UserType } from '@prisma/client';

import 'next-auth';

declare module 'next-auth' {
    /**
     * The shape of the user object returned in the OAuth providers' `profile` callback,
     * or the second parameter of the `session` callback, when using a database.
     */
    // the interface User will be merged with the User type from Prisma or null if the user is not found
    interface User extends UserType {}
}
