export interface SpreadsheetEvent<T> {
    eventType: string;
    eventData: T;
}