import Banner from './banner/Banner';
import Group from './group/Group';
import Jumbotron from './jumbotron/Jumbotron';
import Blogs from './blogs/Blogs';
import Iframe from './iframe/Iframe';
import Statistics from './statistics/Statistics';
import Gallery from './gallery/Gallery';
import Testimonial from './testimonial/Testimonial';
import CTAGroup from './ctagroup/CTAGroup';
import Timeline from './timeline/Timeline';

function DynamicComponent(props) {
  let component;
  switch (props.data.component) {
    case 'banner':
      component = <Banner data={props.data} id={props.id} />;
      break;
    case 'group':
      component = <Group data={props.data} id={props.id} />;
      break;
    case 'jumbotron':
      component = <Jumbotron data={props.data} id={props.id} />;
      break;
    case 'blogs':
      component = <Blogs data={props.data} id={props.id} />;
      break;
    case 'iframe':
      component = <Iframe data={props.data} id={props.id} />;
      break;
    case 'statistics':
      component = <Statistics data={props.data} id={props.id} />;
      break;
    case 'gallery':
      component = <Gallery data={props.data} id={props.id} />;
      break;
    case 'ctagroup':
      component = <CTAGroup data={props.data} id={props.id} />;
      break;
    case 'testimonial':
      component = <Testimonial data={props.data} id={props.id} />;
      break;
    case 'timeline':
      component = <Timeline data={props.data} id={props.id} />;
      break;
    default:
      component = (
        <div className="container p-5 bg-warning">
          <div className="text-center h3 "> Please check componet name!</div>
        </div>
      );
      break;
  }

  return component;
}

export default DynamicComponent;
