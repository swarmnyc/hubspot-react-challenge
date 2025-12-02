import { useState, useMemo, useEffect } from 'react';
import { useAfterIslandHydration } from '@hubspot/cms-components';
import { getLighterShade, getDarkerShade } from '../../utils/colorUtils.js';
import common from '../../styles/common.module.css';
import styles from '../../styles/EventsGrid.module.css';
import type { Event } from '../../types/index.js';

interface EventsGridProps {
  events: Event[];
  gridColumns_mobile?: number;
  gridColumns_tablet?: number;
  gridColumns_desktop?: number;
  showPastEvents?: boolean;
  enableFiltering?: boolean;
  accentColor?: string;
}

function EventSkeleton() {
  return (
    <div className={common.skeleton}>
      <div className={common.skeletonImage} style={{ height: '10rem' }} />
      <div className={common.skeletonContent}>
        <div className={`${common.skeletonLine} ${common.skeletonLineSmall}`} />
        <div className={`${common.skeletonLine} ${common.skeletonLineMedium}`} />
        <div className={`${common.skeletonLine} ${common.skeletonLineFull}`} />
        <div className={`${common.skeletonLine} ${common.skeletonLineLarge}`} />
      </div>
    </div>
  );
}

function Countdown({ targetDate, accentColor }: { targetDate: Date; accentColor: string }) {
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft(targetDate));
  
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft(targetDate));
    }, 1000);
    
    return () => clearInterval(timer);
  }, [targetDate]);
  
  function calculateTimeLeft(target: Date) {
    const difference = target.getTime() - new Date().getTime();
    
    if (difference <= 0) {
      return { days: 0, hours: 0, minutes: 0, seconds: 0, isOver: true };
    }
    
    return {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / 1000 / 60) % 60),
      seconds: Math.floor((difference / 1000) % 60),
      isOver: false,
    };
  }
  
  if (timeLeft.isOver) {
    return <span className={styles.countdownOver}>Event started</span>;
  }

  const bgLight = getLighterShade(accentColor, 85);
  
  return (
    <div className={styles.countdown}>
      {timeLeft.days > 0 && (
        <div className={styles.countdownItem} style={{ backgroundColor: bgLight }}>
          <span className={styles.countdownValue} style={{ color: accentColor }}>{timeLeft.days}</span>
          <span className={styles.countdownLabel} style={{ color: accentColor }}>d</span>
        </div>
      )}
      <div className={styles.countdownItem} style={{ backgroundColor: bgLight }}>
        <span className={styles.countdownValue} style={{ color: accentColor }}>{timeLeft.hours.toString().padStart(2, '0')}</span>
        <span className={styles.countdownLabel} style={{ color: accentColor }}>h</span>
      </div>
      <div className={styles.countdownItem} style={{ backgroundColor: bgLight }}>
        <span className={styles.countdownValue} style={{ color: accentColor }}>{timeLeft.minutes.toString().padStart(2, '0')}</span>
        <span className={styles.countdownLabel} style={{ color: accentColor }}>m</span>
      </div>
      <div className={styles.countdownItem} style={{ backgroundColor: bgLight }}>
        <span className={styles.countdownValue} style={{ color: accentColor }}>{timeLeft.seconds.toString().padStart(2, '0')}</span>
        <span className={styles.countdownLabel} style={{ color: accentColor }}>s</span>
      </div>
    </div>
  );
}

const typeBadgeStyles: Record<string, string> = {
  webinar: styles.typeBadgeWebinar,
  workshop: styles.typeBadgeWorkshop,
  conference: styles.typeBadgeConference,
  meetup: styles.typeBadgeMeetup,
};

function EventCard({ event, isPast, accentColor }: { event: Event; isPast: boolean; accentColor: string }) {
  const [isHovered, setIsHovered] = useState(false);
  const eventDate = new Date(`${event.date}T${event.time}`);
  const formattedDate = eventDate.toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
  const formattedTime = eventDate.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
  });
  
  const spotsLeft = event.capacity && event.registered 
    ? event.capacity - event.registered 
    : null;
  
  return (
    <div className={`${common.card} ${isPast ? styles.cardPast : ''}`}>
      <div 
        className={styles.cardHeader}
        style={{ background: `linear-gradient(135deg, ${accentColor}, ${getDarkerShade(accentColor, 30)})` }}
      >
        {event.image ? (
          <img 
            src={event.image} 
            alt={event.title}
            className={styles.cardImage}
          />
        ) : (
          <div className={styles.cardPlaceholder}>
            <svg className={styles.cardPlaceholderIcon} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
        )}

        <div className={`${styles.typeBadge} ${typeBadgeStyles[event.type] || ''}`}>
          {event.type.charAt(0).toUpperCase() + event.type.slice(1)}
        </div>

        {event.isVirtual && (
          <div className={styles.virtualBadge}>
            <svg className={styles.virtualIcon} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
            </svg>
            Virtual
          </div>
        )}
      </div>

      <div className={common.cardContent}>
        <div className={styles.dateTime}>
          <svg className={common.icon} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          {formattedDate} at {formattedTime}
        </div>

        <h3 
          className={styles.cardTitle}
          style={{ color: isHovered ? accentColor : '#111827' }}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {event.title}
        </h3>

        <p className={styles.description}>
          {event.description}
        </p>

        <div className={styles.location}>
          <svg className={common.icon} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          <span className={common.truncate}>{event.location}</span>
        </div>

        {event.speakers && event.speakers.length > 0 && (
          <div className={styles.speakers}>
            <svg className={common.icon} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            <span className={common.truncate}>{event.speakers.join(', ')}</span>
          </div>
        )}

        {!isPast && (
          <div style={{ marginBottom: '1rem' }}>
            <Countdown targetDate={eventDate} accentColor={accentColor} />
          </div>
        )}

        {spotsLeft !== null && !isPast && (
          <div className={styles.capacity}>
            <div className={styles.capacityLabels}>
              <span>{event.registered} registered</span>
              <span>{spotsLeft} spots left</span>
            </div>
            <div className={styles.capacityBar}>
              <div 
                className={styles.capacityFill}
                style={{ 
                  width: `${(event.registered! / event.capacity!) * 100}%`,
                  backgroundColor: spotsLeft < 10 ? '#ef4444' : accentColor
                }}
              />
            </div>
          </div>
        )}

        <div className={common.spacer} />

        {event.registrationUrl && !isPast ? (
          <a
            href={event.registrationUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.registerButton}
            style={{ backgroundColor: accentColor }}
          >
            Register Now
          </a>
        ) : isPast ? (
          <button disabled className={styles.disabledButton}>
            Event Ended
          </button>
        ) : (
          <button disabled className={styles.disabledButton}>
            Coming Soon
          </button>
        )}
      </div>
    </div>
  );
}

export default function EventsGrid({
  events,
  gridColumns_mobile = 1,
  gridColumns_tablet = 2,
  gridColumns_desktop = 3,
  showPastEvents = false,
  enableFiltering = true,
  accentColor = '#2563eb',
}: EventsGridProps) {
  const isHydrated = useAfterIslandHydration();
  const [activeType, setActiveType] = useState('All');
  const [isLoading, setIsLoading] = useState(true);

  const gridColumns = {
    mobile: gridColumns_mobile,
    tablet: gridColumns_tablet,
    desktop: gridColumns_desktop,
  };

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 300);
    return () => clearTimeout(timer);
  }, []);

  const eventTypes = useMemo(() => {
    const types = new Set(events.map((e) => e.type));
    return Array.from(types).sort();
  }, [events]);

  const { upcomingEvents, pastEvents } = useMemo(() => {
    const now = new Date();
    
    let filtered = events;
    if (activeType !== 'All') {
      filtered = events.filter((e) => e.type === activeType);
    }
    
    const upcoming = filtered
      .filter((e) => new Date(`${e.date}T${e.time}`) >= now)
      .sort((a, b) => new Date(`${a.date}T${a.time}`).getTime() - new Date(`${b.date}T${b.time}`).getTime());
    
    const past = filtered
      .filter((e) => new Date(`${e.date}T${e.time}`) < now)
      .sort((a, b) => new Date(`${b.date}T${b.time}`).getTime() - new Date(`${a.date}T${a.time}`).getTime());
    
    return { upcomingEvents: upcoming, pastEvents: past };
  }, [events, activeType]);

  const handleFilterChange = (type: string) => {
    setIsLoading(true);
    setActiveType(type);
    setTimeout(() => setIsLoading(false), 150);
  };

  const getGridStyle = () => {
    return {
      display: 'grid',
      gap: '1.5rem',
      gridTemplateColumns: `repeat(${gridColumns.mobile}, minmax(0, 1fr))`,
    } as React.CSSProperties;
  };

  return (
    <div className={common.container}>
      <style>{`
        @media (min-width: 768px) {
          .events-grid { grid-template-columns: repeat(${gridColumns.tablet}, minmax(0, 1fr)) !important; }
        }
        @media (min-width: 1024px) {
          .events-grid { grid-template-columns: repeat(${gridColumns.desktop}, minmax(0, 1fr)) !important; }
        }
      `}</style>

      <div className={common.header}>
        <h2 className={common.title}>
          Upcoming Events
        </h2>
        <p className={common.subtitle}>
          {upcomingEvents.length} upcoming {upcomingEvents.length === 1 ? 'event' : 'events'}
        </p>
      </div>

      {enableFiltering && eventTypes.length > 1 && (
        <div className={common.filterSection} role="group" aria-label="Filter by event type">
          <div className={common.filterContainer}>
            <span className={common.filterLabel}>Filter by:</span>
            
            <button
              onClick={() => handleFilterChange('All')}
              className={`${common.filterButton} ${activeType === 'All' ? common.filterButtonActive : common.filterButtonInactive}`}
              style={activeType === 'All' ? { backgroundColor: accentColor } : undefined}
            >
              All Events
            </button>
            
            {eventTypes.map((type) => {
              const count = events.filter((e) => e.type === type).length;
              const isActive = activeType === type;
              return (
                <button
                  key={type}
                  onClick={() => handleFilterChange(type)}
                  className={`${common.filterButton} ${isActive ? common.filterButtonActive : common.filterButtonInactive}`}
                  style={isActive ? { backgroundColor: accentColor } : undefined}
                >
                  {type.charAt(0).toUpperCase() + type.slice(1)}s
                  <span className={common.filterCount}>({count})</span>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {isLoading || !isHydrated ? (
        <div className={`${common.grid} events-grid`} style={getGridStyle()}>
          {Array.from({ length: 3 }).map((_, i) => (
            <EventSkeleton key={i} />
          ))}
        </div>
      ) : upcomingEvents.length > 0 ? (
        <div className={`${common.grid} events-grid`} style={getGridStyle()}>
          {upcomingEvents.map((event, index) => (
            <div
              key={event.id}
              className={common.fadeIn}
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <EventCard event={event} isPast={false} accentColor={accentColor} />
            </div>
          ))}
        </div>
      ) : (
        <div className={common.emptyState}>
          <svg className={common.emptyIcon} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          <p>No upcoming events scheduled.</p>
          <p className={common.emptyText}>Check back soon for new events!</p>
        </div>
      )}

      {showPastEvents && pastEvents.length > 0 && (
        <div className={styles.pastSection}>
          <h3 className={styles.pastTitle}>
            Past Events
          </h3>
          <div className={`${common.grid} events-grid`} style={getGridStyle()}>
            {pastEvents.slice(0, 6).map((event, index) => (
              <div
                key={event.id}
                className={common.fadeIn}
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <EventCard event={event} isPast={true} accentColor={accentColor} />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
