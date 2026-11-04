export default function TrendSparkline({ data }: { data: number[] }) {
  const maximum = Math.max(...data);
  const minimum = Math.min(...data);
  const points = data.map((value, index) => `${(index / (data.length - 1)) * 64},${22 - ((value - minimum) / (maximum - minimum || 1)) * 18}`).join(" ");

  return <svg aria-hidden="true" width="68" height="24" viewBox="0 0 68 24"><polyline points={points} fill="none" stroke="#176f58" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>;
}