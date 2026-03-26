import { useRef } from 'react';
import { debounce } from '../hooks/useDebounce';
interface Props {
    onChange: (value: string) => void;
    onReset: () => void;
}

export const Filter = ({ onChange, onReset }: Props) => {
    const inputRef = useRef<HTMLInputElement>(null);

    // Функция, которая откладывает вызов onChange на 300 мс
    const debouncedChange = useRef(
        debounce((value: string) => {
            onChange(value);
        }, 300)
    ).current;

    // Обработчик изменения input
    const handleChange = () => {
        const value = inputRef.current?.value || '';
        debouncedChange(value);
    };

    // Обработчик сброса
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