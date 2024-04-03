import { format, parseISO } from 'date-fns';
export const formatPublishedAt = (publishedAt: Date): string => {
    try {
        const normalizeDate = publishedAt?.toLocaleString('id-ID');
        return normalizeDate != null ? format(parseISO(normalizeDate), 'dd MMM yyyy HH:mm') : '';
    } catch (error) {
        return 'Invalid Date';
    }
};