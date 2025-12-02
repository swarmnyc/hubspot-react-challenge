import { Island } from '@hubspot/cms-components';
import {
  ModuleFields,
  NumberField,
  BooleanField,
  ColorField,
  FieldGroup,
} from '@hubspot/cms-components/fields';

import EventsGridIsland from '../../islands/EventsGrid.tsx?island';
import type { Event } from '../../../types/index.js';

interface FieldValues {
  gridSettings: {
    gridColumns_mobile: number;
    gridColumns_tablet: number;
    gridColumns_desktop: number;
  };
  features: {
    showPastEvents: boolean | string;
    enableFiltering: boolean | string;
    accentColor: {
      color: string;
    };
  };
}

export function Component({ fieldValues, dataQueryResult }: { fieldValues: FieldValues; dataQueryResult?: any }) {
  const {
    gridSettings = { gridColumns_mobile: 1, gridColumns_tablet: 2, gridColumns_desktop: 3 },
    features = { showPastEvents: true, enableFiltering: true, accentColor: { color: '#2563eb' } },
  } = fieldValues;

  const gridColumns = {
    mobile: gridSettings.gridColumns_mobile ?? 1,
    tablet: gridSettings.gridColumns_tablet ?? 2,
    desktop: gridSettings.gridColumns_desktop ?? 3,
  };

  const showPastEvents = features.showPastEvents === true || features.showPastEvents === 'true';
  const enableFiltering = features.enableFiltering === true || features.enableFiltering === 'true';
  const accentColor = features.accentColor?.color ?? '#2563eb';

  const items = dataQueryResult?.data?.CRM?.p_events_collection?.items || [];
  
  const events: Event[] = items.map((item: any) => {
    const eventDateObj = new Date(item.event_date);
    const dateStr = eventDateObj.toISOString().split('T')[0];
    
    return {
      id: item._metadata?.id,
      title: item.event_title,
      description: item.description,
      date: dateStr,
      time: item.event_time || '09:00',
      type: item.event_type?.value || item.event_type || 'webinar',
      location: item.location || 'Online',
      isVirtual: item.is_virtual === true || item.is_virtual === 'true' || item.is_virtual === 'Yes',
      registrationUrl: item.registration_url,
      image: item.image_url,
      speakers: item.speakers?.split(',').map((s: string) => s.trim()),
      capacity: item.capacity,
      registered: item.registered_count,
    };
  });

  return (
    <div style={{ width: '100%', maxWidth: '80rem', margin: '0 auto', padding: '2rem 1rem' }}>
      <Island
        module={EventsGridIsland}
        hydrateOn="load"
        events={events}
        gridColumns_mobile={gridColumns.mobile}
        gridColumns_tablet={gridColumns.tablet}
        gridColumns_desktop={gridColumns.desktop}
        showPastEvents={showPastEvents}
        enableFiltering={enableFiltering}
        accentColor={accentColor}
      />
    </div>
  );
}

export const fields = (
  <ModuleFields>
    <FieldGroup name="gridSettings" label="Grid Settings">
      <NumberField
        name="gridColumns_mobile"
        label="Columns (Mobile)"
        min={1}
        max={2}
        default={1}
      />
      <NumberField
        name="gridColumns_tablet"
        label="Columns (Tablet)"
        min={1}
        max={3}
        default={2}
      />
      <NumberField
        name="gridColumns_desktop"
        label="Columns (Desktop)"
        min={1}
        max={4}
        default={3}
      />
    </FieldGroup>

    <FieldGroup name="features" label="Features">
      <BooleanField
        name="showPastEvents"
        label="Show Past Events"
        default={true}
      />
      <BooleanField
        name="enableFiltering"
        label="Enable Type Filtering"
        default={true}
      />
      <ColorField
        name="accentColor"
        label="Accent Color"
        default={{ color: '#2563eb', opacity: 100 }}
      />
    </FieldGroup>
  </ModuleFields>
);

export const meta = {
  label: 'Events & Webinars Grid',
  description: 'Display upcoming events, webinars, and workshops with countdown timers and registration',
  icon: 'calendar',
};

export const query = `
  query GetEvents {
    CRM {
      p_events_collection(limit: 20) {
        items {
          _metadata { id }
          event_title
          description
          event_date
          event_time
          event_type
          location
          is_virtual
          registration_url
          image_url
          speakers
          capacity
          registered_count
        }
      }
    }
  }
`;
