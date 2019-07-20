import { Event } from './event';

export interface EventGroup {
    id: string,
    title: string,
    events:Event[],
}
