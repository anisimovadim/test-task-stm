import { useRef } from 'react';
import { debounce } from '../hooks/useDebounce';

interface Props {
    onChange: (value: string) => void;
    onReset: () => void;
}

export const Filter = ({ onChange, onReset }: Props) => {
    const inputRef = useRef<HTMLInputElement>(null);

    const debouncedChange = useRef(
        debounce((value: string) => {
            onChange(value);
        }, 300)
    ).current;

    const handleChange = () => {
        const value = inputRef.current?.value || '';
        debouncedChange(value);
    };

    const handleReset = () => {
        if (inputRef.current) {
            inputRef.current.value = '';
        }
        onReset();
    };

    return (
        <div className="filter-container">
            <input
                ref={inputRef}
                onChange={handleChange}
                placeholder="Поиск по имени и фамилии..."
                className="filter-input"
            />
            <button onClick={handleReset} className="filter-button">
                Сбросить
            </button>
        </div>
    );
};