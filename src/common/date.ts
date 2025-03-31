// src/date.ts
export const formatDate = (timestamp: number): string => {
    return new Date(timestamp).toISOString()
}
