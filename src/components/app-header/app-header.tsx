import { FC } from 'react';
import { AppHeaderUI } from '@ui';
interface AppHeaderInterface {
  name: string;
}
export const AppHeader: FC<AppHeaderInterface> = ({ name }) => (
  <AppHeaderUI userName={name} />
);
