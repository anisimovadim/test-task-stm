import { useEffect, useState, useMemo } from 'react';
import {useDebounce} from "../hooks/useDebounce.ts";
import type { User } from '../types/user.ts';
import { Loader } from '../components/Loader/Loader.tsx';
import { UserTable } from '../components/UserTable/UserTable.tsx';
import { Filter } from '../components/Filter/Filter.tsx';
import { normalize } from '../utils/normalize.ts';

function App() {
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState('');
    const debouncedFilter = useDebounce(filter, 300); // Наш хук

    useEffect(() => {
        const loadData = async () => {
            try {
                const res = await fetch('https://randomuser.me/api/?results=15');
                const data = await res.json();

                setUsers(data.results);
            } catch (e) {
                console.error('Ошибка загрузки данных:', e);
            } finally {
                setLoading(false);
            }
        };
        loadData();
    }, []);

    const filteredUsers = useMemo(() => {
        const searchStr = normalize(debouncedFilter);
        if (!searchStr) return users;

        return users.filter(user => {
            const fullName = normalize(`${user.name.first} ${user.name.last}`);
            return fullName.includes(searchStr);
        });
    }, [users, debouncedFilter]);

    if (loading) {
        return <Loader />;
    }

    return (
        <div className="app-container">
            <header className="app-header">
                <h1 className="app-title">Пользователи</h1>
            </header>

            <main className="app-content">
                <Filter
                    value={filter}
                    onChange={setFilter}
                    onReset={() => setFilter('')}
                />

                <section className="table-section" aria-labelledby="table-title">
                    <h2 id="table-title" className="visually-hidden">Список</h2>
                    {filteredUsers.length > 0 ? (
                        <div className="table-responsive">
                            <UserTable users={filteredUsers} />
                        </div>
                    ) : (
                        <div className="empty-state">
                            <p className="no-results">Пользователи не найдены</p>
                        </div>
                    )}
                </section>
            </main>
        </div>
    );
}

export default App;