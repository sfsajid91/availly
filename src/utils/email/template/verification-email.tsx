import {
    Body,
    Container,
    Head,
    Heading,
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

export default function VerificationEmail({
    verificationUrl,
    name,
}: EmailTemplateProps) {
    return (
        <Html>
            <Head />
            <Preview>Verify Your Availly Email Address</Preview>
            <Tailwind>
                <Body className="mx-auto my-auto bg-white px-2 font-sans">
                    <Container className="mx-auto my-auto bg-slate-400 p-5 text-gray-800">
                        <Section className="bg-white py-4">
                            <Img
                                src="https://utfs.io/f/527b3c22-3bee-48e4-a467-1512332b7571-1zbfv.png"
                                alt="LendLit Logo"
                                className="mx-auto my-6 h-auto w-full max-w-[200px]"
                            />
                            <Section className="bg-blue-400">
                                <Img
                                    src="https://utfs.io/f/3a6d046e-9759-49da-94ac-83a30974fd2e-ufzb1j.png"
                                    alt="Email Logo"
                                    className="mx-auto my-6 h-12 w-12"
                                />
                            </Section>
                            <Heading className="text-xl font-bold text-white">
                                Verify your email address
                            </Heading>
                            <Section className="px-8">
                                <Text>
                                    Hi <strong>{name}</strong>,
                                    <br />
                                    <span className="mt-2">
                                        Thank you for signing up for Availly! To
                                        access the full features of your
                                        account, please verify your email
                                        address.
                                    </span>
                                </Text>
                                <br />
                                <Section className="my-4 text-center">
                                    <Link
                                        href={verificationUrl}
                                        className="inline-flex items-center justify-center rounded bg-blue-400 px-4 py-2 font-semibold text-white"
                                    >
                                        Verify Email
                                    </Link>
                                </Section>
                                <Text>
                                    This link will expire in 24 hours after you
                                    receive this email.
                                </Text>

                                <Text className="mt-4">
                                    If you did not create an account, no further
                                    action is required.
                                    <br />
                                    <br />
                                    Thanks,
                                    <br />
                                    The Availly Team
                                </Text>
                            </Section>
                        </Section>
                    </Container>
                </Body>
            </Tailwind>
        </Html>
    );
}
