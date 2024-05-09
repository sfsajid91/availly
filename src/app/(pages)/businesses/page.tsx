import { getSession } from '@/lib/getSession';
import { redirect } from 'next/navigation';

export default async function BusinessPage() {
    const session = await getSession();

    if (!session) {
        return redirect('/login');
    }

    return (
        <div className="wrapper min-h-dvh space-y-4 py-4">
            <h1 className="text-3xl font-bold">Business</h1>
            <p>Hello: {session.user?.name} </p>
            <p> Currently this page is under development.</p>
        </div>
    );
}
