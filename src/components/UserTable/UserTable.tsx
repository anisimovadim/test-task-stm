import type { User } from '../../types/user.ts';
import { formatDate } from '../../utils/formatDate.ts';
import { TooltipImage } from '../TooltipImage/TooltipImage.tsx';

interface Props {
    users: User[];
}

export const UserTable = ({ users }: Props) => {
    if (!users.length) {
        return <div className="no-results">No users found</div>;
    }

    return (
        <div className="table-wrapper">
            <table className="user-table">
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
                    <tr key={user.login?.uuid || index} className="user-row">
                        <td>{user.name.first} {user.name.last}</td>
                        <td>
                            <TooltipImage
                                thumbnail={user.picture.thumbnail}
                                large={user.picture.large}
                            />
                        </td>
                        <td>{user.location.state}, {user.location.city}</td>
                        <td>{user.email}</td>
                        <td>{user.phone}</td>
                        <td>{formatDate(user.registered.date)}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};