interface Props {
    value: string;
    onChange: (val: string) => void;
    onReset: () => void;
}

export const Filter = ({ value, onChange, onReset }: Props) => {
    return (
        <div className="filter-container">
            <input
                type="text"
                className="filter-input"
                placeholder="Поиск по имени и фамилии..."
                value={value}
                onChange={(e) => onChange(e.target.value)}
            />
            <button type="button" className="filter-button" onClick={onReset}>
                Сбросить
            </button>
        </div>
    );
};