import Icon from '../../Icon/Icon';

const Logo: React.FC = () => {
  return (
    <div className="flex flex-nowrap justify-center  gap-2 shrink-0  items-center hover:cursor-pointer">
      <div className="flex justify-center items-center h-10 w-12   ">
        <Icon
          name="dumbbell"
          className="text-primary-600 lg:-translate-y-1.2 -translate-y-1 self-center h-10 w-12 max-lg:h-8 max-lg:w-10"
        />
      </div>
      <span className="font-bold text-xl  text-gray-900 ">ScholarFit</span>
    </div>
  );
};

export default Logo;
