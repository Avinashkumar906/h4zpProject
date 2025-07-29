import { TimelineListType, TimelineType } from '../../util';
import useBreakpoint from '../../hook/useBreakpoint';
import { TimelineMode } from '@drakexorn/react-chrono/dist/models/TimelineModel';
import { Chrono } from '@drakexorn/react-chrono';
import { TimelineItemModel } from '@drakexorn/react-chrono/dist/models/TimelineItemModel';
import TimelineCard from './TimelineCard';

type componentPropsType = {
  data: TimelineType;
  id?: string;
};

const CronoTimeline = ({ data, id }: componentPropsType) => {
  const breakpoint = useBreakpoint();
  const resolvedLayout = (data.layout[breakpoint] || 'VERTICAL') as TimelineMode;

  const items: TimelineItemModel[] = data.list.map((item, index) => ({
    title: item.date,
    // cardTitle: item.title,
    // cardDetailedText: item.description,
    // timelineContent:<div>hellow</div>,
    // media: {
    //   type: 'IMAGE',
    //   source: { url: item.url },
    // },
  }));

  const getPosition = (index: number) => {
    return index % 2 === 0 && resolvedLayout === 'VERTICAL_ALTERNATING' ? 'order-0' : 'order-1';
  };

  return (
    <div style={{ width: '100%', maxWidth: '100vw', overflow: 'hidden' }}>
      <Chrono
        items={items}
        theme={{ primary: '#333333', secondary: '#ffffff' }}
        mode={resolvedLayout}
        slideShow={true}
        slideItemDuration={4000}
        cardPositionHorizontal="TOP"
        cardHeight={0}
        timelineCircleDimension={20}
      >
        {data.list.map((item, idx) => (
          <TimelineCard key={id + idx} data={item} position={getPosition(idx)} />
        ))}
      </Chrono>
    </div>
  );
};

export default CronoTimeline;
