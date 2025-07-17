import Banner from './banner/Banner';
import Group from './group/Group';
import Jumbotron from './jumbotron/Jumbotron';
import Blogs from './blogs/Blogs';
import Iframe from './iframe/Iframe';
import Statistics from './statistics/Statistics';
import Gallery from './gallery/Gallery';

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
      // case 'news':
      //   component = <News data={props.data} id={props.id} />
      break;
    default:
      component = <div>Please check componet name!</div>;
      break;
  }

  return component;
}

export default DynamicComponent;
