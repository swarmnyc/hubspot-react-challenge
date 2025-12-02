/**
 * Shared type definitions for the challenge-theme
 */

export interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  endDate?: string;
  type: 'webinar' | 'workshop' | 'conference' | 'meetup';
  location: string;
  isVirtual: boolean;
  registrationUrl?: string;
  image?: string;
  speakers?: string[];
  capacity?: number;
  registered?: number;
}

export type EventType = Event['type'];
