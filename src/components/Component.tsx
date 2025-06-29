import Banner from "./banner/Banner";
import Group from "./group/Group";
import Jumbotron from "./jumbotron/Jumbotron";
import Blogs from './blogs/Blogs'
import Iframe from './iframe/Iframe'
import News from './news/News'

function DynamicComponent(props) {
  let component;
  // console.log(props.data)
  switch (props.data.component) {
    case 'banner': 
      component = <Banner data={props.data} id={props.id} />
      break;
    case 'group': 
      component = <Group data={props.data} id={props.id} />
      break;
    case 'jumbotron': 
      component = <Jumbotron data={props.data} id={props.id} />
      break;
    case 'blogs': 
      component = <Blogs data={props.data} id={props.id} />
      break;
    case 'iframe': 
      component = <Iframe data={props.data} id={props.id} />
      break;
    case 'news': 
      component = <News data={props.data} id={props.id} />
      break;
    default: 
      component = <div>Please check componet name!</div>
      break;
  }

  return component
}

export default DynamicComponent;