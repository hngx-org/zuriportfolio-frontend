export type GenericProp<T> = {
  data: T[];
  tag: string;
};

export interface BadgeInterface extends React.ComponentPropsWithoutRef<'span'> {
  children: React.ReactNode;
  variant?: VariantType;
}

export type VariantType = 'outline' | 'fill';

export interface SectionProps extends React.ComponentPropsWithoutRef<'article'> {
  data: unknown[];
  action?: () => void;
  sectionTitle: string;
  tag: string;
  children?: React.ReactNode;
}
