import ServerList from '@/components/dashboard/serverList';
import UserBar from '@/components/dashboard/userbar';

import '@/styles/dashboard.css';

export default function Home() {
    return (
        <>
            <UserBar />
            <ServerList />
        </>
    );
}
