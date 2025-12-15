export interface ChartContainerProps {
  title: string;
  children: React.ReactNode;
}

const ChartContainer: React.FC<ChartContainerProps> = ({ title, children }) => {
  return (
    <div>
      <h4 className="mb-4 text-base font-medium text-gray-900">{title}</h4>
      <div className="h-48">{children}</div>
    </div>
  );
};
export default ChartContainer;
