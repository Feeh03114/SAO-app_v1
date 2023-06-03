import { IconType } from 'react-icons';
import * as FaIcons from 'react-icons/fa'; // Importe todos os ícones do react-icons/fa

export function GetIcon({ iconText, className }: { iconText: string, className:string | undefined }): JSX.Element | null {
  const iconKeys = Object.keys(FaIcons) as Array<keyof typeof FaIcons>;
  for (const key of iconKeys) {
    if (key.toLowerCase() === iconText.toLowerCase()) {
      const IconComponent: IconType = FaIcons[key];
      return <IconComponent className={className} />;
    }
  }
  return null;
}