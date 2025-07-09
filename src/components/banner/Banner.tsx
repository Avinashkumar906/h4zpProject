import { BannerType } from '../../util/mockData.util';
import * as React from 'react';
import Design1 from './Design1';

type componentPropType = {
  data: BannerType | undefined;
  id: string;
};

function Banner({ data }: componentPropType) {
  const design = () => {
    switch (data.design) {
      case 'design1':
        return <Design1 data={data} />;
      case 'design2':
        return <div>Not Implemented!</div>;
      default:
        return <Design1 data={data} />;
    }
  };

  return design();
}

export default React.memo(Banner);
