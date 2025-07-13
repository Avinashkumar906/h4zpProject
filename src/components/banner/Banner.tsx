import { BannerType } from '../../util/mockData.util';
import * as React from 'react';
import Design1 from './Design1';
import Design2 from './Design2';

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
        return <Design2 data={data} />;
      default:
        return <Design1 data={data} />;
    }
  };

  return design();
}

export default React.memo(Banner);
