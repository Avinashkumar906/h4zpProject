import * as FaIcons from 'react-icons/fa';
import * as MdIcons from 'react-icons/md';
import * as AiIcons from 'react-icons/ai';
import * as BsIcon from 'react-icons/bs';
import * as BiIcon from 'react-icons/bi';
import * as LuIcon from 'react-icons/lu';

const iconSets = {
  fa: FaIcons,
  md: MdIcons,
  ai: AiIcons,
  bs: BsIcon,
  bi: BiIcon,
  lu: LuIcon,
};

type DynamicIconProps = {
  fullName: string; // like "fa:FaBeer"
  size?: number;
  color?: string;
};
const DynamicIcon = ({ fullName, size = 24, color = '#212529' }: DynamicIconProps) => {
  const [prefix, iconName] = fullName.split(':');
  const IconPack = iconSets[prefix as keyof typeof iconSets];
  const IconComponent = IconPack?.[iconName as keyof typeof IconPack] as React.ComponentType<any>;

  if (!IconComponent) return <span>Invalid icon</span>;
  return <IconComponent size={size} color={color} />;
};

export default DynamicIcon;
