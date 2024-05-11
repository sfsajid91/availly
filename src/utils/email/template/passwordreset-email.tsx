import {
    Body,
    Container,
    Head,
    Html,
    Img,
    Link,
    Preview,
    Section,
    Tailwind,
    Text,
} from '@react-email/components';

type EmailTemplateProps = {
    verificationUrl: string;
    name: string;
};

export default function PasswordResetEmail({
    verificationUrl,
    name,
}: EmailTemplateProps) {
    return (
        <Html>
            <Head />
            <Preview>Availly Password Reset</Preview>
            <Tailwind>
                <Body className="mx-auto my-auto bg-white px-2 font-sans">
                    <Container className="mx-auto my-auto bg-slate-400 p-5 text-gray-800">
                        <Section className="bg-white py-4">
                            <Img
                                src="https://utfs.io/f/527b3c22-3bee-48e4-a467-1512332b7571-1zbfv.png"
                                alt="Availly Logo"
                                className="mx-auto my-6 h-auto w-full max-w-[200px]"
                            />
                            <Section className="space-y-2 bg-blue-400 py-4">
                                <Img
                                    src="https://utfs.io/f/3a6d046e-9759-49da-94ac-83a30974fd2e-ufzb1j.png"
                                    alt="Email Logo"
                                    className="mx-auto h-12 w-12"
                                />
                                <h2 className="text-center text-xl font-bold text-white">
                                    Reset your password
                                </h2>
                            </Section>
                            <Section className="px-8">
                                <Text>
                                    Hi <strong>{name}</strong>,
                                    <br />
                                    <span className="mt-2">
                                        We received a request to reset your
                                        password. If you did not make this
                                        request, please ignore this email.
                                        Otherwise, you can reset your password
                                        using this link:
                                    </span>
                                </Text>
                                <br />
                                <Section className="my-4 text-center">
                                    <Link
                                        href={verificationUrl}
                                        className="inline-flex items-center justify-center rounded bg-blue-400 px-4 py-2 font-semibold text-white"
                                    >
                                        Reset Password
                                    </Link>
                                </Section>
                                <Text>
                                    This link will expire in 30 minutes after
                                    you receive this email.
                                </Text>

                                <Text className="mt-4">
                                    Once you click the link, you&apos;ll be
                                    prompted to choose a new, strong password
                                    for your account.
                                    <br />
                                    We&apos;re always happy to help!
                                    <br />
                                    <span className="mt-1">
                                        The Availly Team
                                    </span>
                                </Text>
                            </Section>
                        </Section>
                    </Container>
                </Body>
            </Tailwind>
        </Html>
    );
}
