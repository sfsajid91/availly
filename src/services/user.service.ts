import { getUserByEmail } from '@/lib/data/user';
import { LoginSchema } from '@/lib/schema/login-schema';
import bcrypt from 'bcrypt';
import { CredentialsSignin } from 'next-auth';

type LoginDataType =
    | {
          email: string;
          password: string;
      }
    | Partial<Record<string, unknown>>;

class UnverifiedEmailError extends CredentialsSignin {
    code = 'UnverifiedEmailError';
}

export const loginUserService = async (data: LoginDataType) => {
    const parsedCredentials = LoginSchema.safeParse(data);

    if (!parsedCredentials.success) {
        return null;
    }
    const { email, password } = parsedCredentials.data;
    const user = await getUserByEmail(email);

    if (!user || !user.password) {
        return null;
    }

    const passwordsMatch = await bcrypt.compare(password, user.password);

    if (!passwordsMatch) {
        return null;
    }

    // Check if email is verified
    if (!user.emailVerified) {
        throw new UnverifiedEmailError();
    }

    return user;
};
