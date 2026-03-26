import type { User } from '../types/user';
import { formatDate } from '../utils/formatDate';
import { TooltipImage } from './TooltipImage';

interface Props {
    users: User[];
}

export const UserTable = ({ users }: Props) => {
    if (!users.length) {
        return <div>Пользователи не найдены</div>;
    }

    return (
        <table className="user-table" border={1} cellPadding={8}>
            <thead>
            <tr>
                <th>Name</th>
                <th>Picture</th>
                <th>Location</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Registered</th>
            </tr>
            </thead>

            <tbody>
            {users.map((user, index) => (
                <tr key={index} className="user-row">
                    <td>
                        {user.name.first} {user.name.last}
                    </td>
                    <td>
                        <TooltipImage
                            thumbnail={user.picture.thumbnail}
                            large={user.picture.large}
                        />
                    </td>
                    <td>
                        {user.location.state}, {user.location.city}
                    </td>
                    <td>{user.email}</td>
                    <td>{user.phone}</td>
                    <td>{formatDate(user.registered.date)}</td>
                </tr>
            ))}
            </tbody>
        </table>
    );
};