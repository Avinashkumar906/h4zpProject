import { TimelineType } from '../../util';
import CronoTimeline from './CronoTimeline';

type componentPropsType = {
  data: TimelineType;
  id?: string;
};

const Timeline = ({ data, id }: componentPropsType) => {
  return (
    <CronoTimeline data={data} id={id} />
    // <div className={`timeline-wrapper ${resolvedLayout}`}>
    //   <div className="timeline-line" />

    //   {data.list.map((item, index) => {
    //     const isEven = index % 2 === 0;

    //     const alignClass =
    //       resolvedLayout.includes("zigzag")
    //         ? isEven
    //           ? "left"
    //           : "right"
    //         : "left";

    //     return (
    //       <div className={`timeline-item ${alignClass}`} key={id+index}>
    //         <div className="timeline-icon">
    //           <img src={item.iconUrl} alt="" />
    //         </div>
    //         <div className="timeline-content">
    //           <div className="h5">{item.title}</div>
    //           <p className="small">{item.date}</p>
    //           <Description description={item.description}/>
    //         </div>
    //       </div>
    //     );
    //   })}
    // </div>
  );
};

export default Timeline;
