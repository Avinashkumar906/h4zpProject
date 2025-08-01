import { Fragment, useEffect, useState } from 'react';
import { BlogType } from '../util/mockData.util';
import { subscribeBlogList } from '../firebase/getFromFirestore';
import Blogs from '../components/blogs/Blogs';

function LoadBlogs() {
  const [blogList, setBlogList] = useState<BlogType>({
    list: [],
    component: '',
    title: 'Recent Activities',
    more: undefined,
    fluid: 'xl',
    visibility: 'true',
    background: '#ffffff',
    design: 'design1',
    order: 0,
  });

  useEffect(() => {
    let unsubscribeBlogs;

    const init = async () => {
      unsubscribeBlogs = subscribeBlogList((res) => {
        const list = res.map((item) => ({
          url: item.data.imageUrl,
          title: item.data.title,
          credit: item.data.createdBy,
          BtnUrl: `/${item.id}`,
          btnColor: 'btn-lime',
          btnText: 'View Post',
          date: item.data.date,
          description: item.data.description,
          reference: '',
        }));
        setBlogList({ ...blogList, list });
      });
    };

    init();

    return () => {
      if (unsubscribeBlogs) unsubscribeBlogs();
    };
  }, []);

  return (
    <Fragment>
      {blogList?.list?.length !== 0 && (
        <Blogs data={blogList} hideMore={true} id="Blog-List-Page" />
      )}
    </Fragment>
  );
}

export default LoadBlogs;
