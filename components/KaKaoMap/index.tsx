import { forwardRef, Ref } from 'react';

interface KakaomapComponentProps {
  ref: Ref<HTMLDivElement>;
}
const KakaomapComponent: React.FC<KakaomapComponentProps> = forwardRef(
  (props, ref) => {
    return (
      <div style={{ width: '80vw', height: '80vh', position: 'relative' }}>
        <div ref={ref} style={{ width: '100%', height: '100%' }} />
        <div
          style={{
            width: '20vw',
            height: '40vh',
            position: 'relative',
            opacity: '0.7',
            backgroundColor: 'white',
            top: '-80vh',
            zIndex: '1',
            float: 'left',
          }}>
          places list div
        </div>
      </div>
    );
  },
);

export default KakaomapComponent;
