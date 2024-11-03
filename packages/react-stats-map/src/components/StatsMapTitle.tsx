export interface StatsMapTitleProps {
  width: number;
  height: number;
  title: string;
}

export default function StatsMapTitle({ width, height, title }: StatsMapTitleProps) {
  return (
    <div
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: width,
        height: height,
        textAlign: 'center',
        fontSize: '1.25rem',
        fontWeight: 'bold',
        lineHeight: `${height}px`,
      }}
    >
      {title}
    </div>
  );
}
