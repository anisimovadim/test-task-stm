export const formatDate = (date: string) => {
    const d = new Date(date);
    return d.toLocaleDateString('ru-RU'); // dd.MM.yyyy
};