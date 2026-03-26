/**
 * debounce — ограничивает частоту вызова функции.
 * Функция будет вызвана только спустя delay мс после последнего вызова.
 *
 * @param fn - функция, которую нужно "задебаунсить"
 * @param delay - задержка в миллисекундах
 *
 * @returns новая функция с теми же аргументами, но с отложенным вызовом
 */
export function debounce<T extends (...args: any[]) => void>(
    fn: T,
    delay: number
) {
    let timer: ReturnType<typeof setTimeout>; //таймер

    return (...args: Parameters<T>) => {
        clearTimeout(timer); //сброс таймера
        timer = setTimeout(() => fn(...args), delay); //новый таймер
    };
}