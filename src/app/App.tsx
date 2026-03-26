import { useEffect, useState } from 'react';
import type { User } from '../types/user.ts';
import { Loader } from '../components/Loader.tsx';
import { UserTable } from '../components/UserTable.tsx';
import { Filter } from '../components/Filter.tsx';
import { normalize } from '../utils/normalize.ts';

function App() {
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState('');

    // Предзагрузка изображений
    const preloadImages = (users: User[]) => {
        return Promise.all(
            users.map(user =>
                new Promise<void>(resolve => {
                    const img = new Image();
                    img.src = user.picture.thumbnail;
                    img.onload = () => resolve();
                    img.onerror = () => resolve();
                })
            )
        );
    };

    // Получение пользователей
    useEffect(() => {
        const loadData = async () => {
            try {
                const res = await fetch('https://randomuser.me/api/?results=15');
                const data = await res.json();
                await preloadImages(data.results);
                setUsers(data.results);
            } catch (e) {
                console.error(e);
            } finally {
                setLoading(false);
            }
        };

        loadData();
    }, []);

    // Функции фильтрации пользователей
    const handleFilter = (value: string) => setFilter(value);
    const handleReset = () => setFilter('');
    const filteredUsers = users.filter(user => {
        const fullName = normalize(`${user.name.first} ${user.name.last}`);
        return fullName.includes(normalize(filter));
    });

    // Лоадер
    if (loading) {
        return <Loader />;
    }
    return (
        <div className="app-container">
            <h1 className="app-title">Пользователи</h1>
            <Filter onChange={handleFilter} onReset={handleReset} />
            <UserTable users={filteredUsers} />
        </div>
    );
}

export default App;