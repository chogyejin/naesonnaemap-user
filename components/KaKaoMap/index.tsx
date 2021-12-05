import { forwardRef, Ref } from 'react';

interface KakaomapComponentProps {
  ref: Ref<HTMLDivElement>;
}
const KakaomapComponent: React.FC<KakaomapComponentProps> = forwardRef(
  (props, ref) => {
    return (
      <div style={{ width: '80vw', height: '80vh' }}>
        <div ref={ref} style={{ width: '100%', height: '100%' }} />
      </div>
    );
  },
);

export default KakaomapComponent;
