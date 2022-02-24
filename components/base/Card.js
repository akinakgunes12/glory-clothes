import { useContext } from 'react';
import { Store } from '../../utils/Store';

export const Card = ({ children }) => {
  const { colors } = useContext(Store);

  return (
    <div
      style={{ color: colors.text, backgroundColor: colors.backCardColor }}
      className="w-full"
    >
      <div className="rounded overflow-hidden shadow-lg">{children}</div>
    </div>
  );
};
