import { 
  HardHat, 
  Gem, 
  Wrench, 
  Palette,
  Building,
  Hammer,
  PaintBucket,
  Home,
  Cog,
  Settings,
  Brush,
  Construction,
  type LucideIcon
} from "lucide-react";

// Icon mapping for dynamic icon loading
export const iconMap: Record<string, LucideIcon> = {
  'hard-hat': HardHat,
  'hardhat': HardHat,
  'construction': Construction,
  'gem': Gem,
  'diamond': Gem,
  'finishing': Gem,
  'wrench': Wrench,
  'tool': Wrench,
  'renovation': Wrench,
  'repair': Wrench,
  'palette': Palette,
  'brush': Brush,
  'paint': PaintBucket,
  'interior': Palette,
  'design': Palette,
  'building': Building,
  'home': Home,
  'house': Home,
  'hammer': Hammer,
  'cog': Cog,
  'settings': Settings,
  'paint-bucket': PaintBucket,
};

// Default fallback icon
export const DefaultIcon = Building;

// Function to get icon component by name
export function getIconComponent(iconName: string | null): LucideIcon {
  if (!iconName) return DefaultIcon;
  
  // Normalize the icon name (lowercase, replace spaces/underscores with hyphens)
  const normalizedName = iconName.toLowerCase().replace(/[\s_]/g, '-');
  
  return iconMap[normalizedName] || DefaultIcon;
}