import { TimelineListType, TimelineType } from '../../util';
import useBreakpoint from '../../hook/useBreakpoint';
import { TimelineMode } from '@drakexorn/react-chrono/dist/models/TimelineModel';
import { Chrono } from '@drakexorn/react-chrono';
import { TimelineItemModel } from '@drakexorn/react-chrono/dist/models/TimelineItemModel';

type componentPropsType = {
  data: TimelineType;
  id?: string;
};
const TimelineCard = ({ item }: { item: TimelineListType }) => (
  <div
    style={{
      padding: '1rem',
      background: '#fff',
      borderRadius: '8px',
      boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
      textAlign: 'center',
      maxWidth: '280px',
      margin: '0 auto',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: '0.5rem',
    }}
  >
    <img src={item.iconUrl} alt={item.title} width={48} height={48} />
    <h3 style={{ fontSize: '1rem', margin: 0 }}>{item.title}</h3>
    <span style={{ fontSize: '0.75rem', color: '#666' }}>{item.date}</span>
    <p style={{ fontSize: '0.875rem', margin: 0 }}>{item.description}</p>
  </div>
);

const CronoTimeline = ({ data, id }: componentPropsType) => {
  const breakpoint = useBreakpoint();
  const resolvedLayout = (data.layout[breakpoint] || 'VERTICAL') as TimelineMode;

  const items: TimelineItemModel[] = data.list.map((item) => ({
    title: item.date,
    cardTitle: item.title,
    cardDetailedText: item.description,
    media: {
      type: 'IMAGE',
      source: { url: item.iconUrl },
    },
  }));

  return (
    <div style={{ width: '100%', maxWidth: '100vw', overflow: 'hidden' }}>
      <Chrono
        items={items}
        mode={resolvedLayout}
        slideShow
        useReadMore
        slideItemDuration={4000}
        scrollable={{ scrollbar: false }}
        cardPositionHorizontal="TOP"
      >
        {data.list.map((item, idx) => (
          <TimelineCard key={id + idx} item={item} />
        ))}
      </Chrono>
    </div>
  );
};

export default CronoTimeline;
