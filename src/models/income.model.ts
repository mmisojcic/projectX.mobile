// import { formatDate } from '@angular/common';

export class Income {
    private name: string;
    private value: number;
    private category: string;
    private timeStamp: Date;
    private userId: string;

    constructor(
        name?: string,
        value?: number,
        category?: string,
        timeStamp?: Date,
        userId?: string
    ) {
        this.name = name;
        this.value = value;
        this.category = category;
        this.timeStamp = timeStamp;
        this.userId = userId;
    }

    /**
     * Getter name
     * @return {string}
     */
    public getName(): string {
        return this.name;
    }

    /**
     * Getter value
     * @return {number}
     */
    public getValue(): number {
        return this.value;
    }

    /**
     * Getter category
     * @return {string}
     */
    public getCategory(): string {
        return this.category;
    }

    /**
     * Getter timeStamp
     * @return {Date}
     */
    public getTimeStamp(): Date {
        return this.timeStamp;
    }

    /**
     * Getter userId
     * @return {string}
     */
    public getUserId(): string {
        return this.userId;
    }

    /**
     * Setter name
     * @param {string} value
     */
    public setName(value: string) {
        this.name = value;
    }

    /**
     * Setter value
     * @param {number} value
     */
    public setValue(value: number) {
        this.value = value;
    }

    /**
     * Setter category
     * @param {string} value
     */
    public setCategory(value: string) {
        this.category = value;
    }

    /**
     * Setter timeStamp
     * @param {Date} value
     */
    public setTimeStamp(value: Date) {
        this.timeStamp = value;
    }

    /**
     * Setter userId
     * @param {string} value
     */
    public setUserId(value: string) {
        this.userId = value;
    }
}
