import type { SidebarContent } from '../../../config/sidebar-content';
import Icon from '../../ui/Icon/Icon';

type AuthSidebarContentProps = {
  sidebarContent: SidebarContent;
};

const AuthSidebarContent: React.FC<AuthSidebarContentProps> = ({ sidebarContent }) => {
  const { heading, description, motivationCard, features, footer } = sidebarContent;
  return (
    <section className="bg-linear-to-br from-indigo-800 to-purple-900 text-white p-8 md:px-12 md:py-6 xl:rounded-md flex flex-col">
      <h1 className="flex justify-start items-center gap-2 my-4">
        <Icon name="dumbbell" className="text-primary-500 w-10 h-10 -translate-y-[.1rem]" />
        <span className="text-2xl font-bold">ScholarFit</span>
      </h1>
      <div className="mb-8">
        <h2 className="capitalize text-3xl font-bold mb-4">{heading}</h2>
        <p className="text-indigo-200 mb-6">{description}</p>
        <div className="motivation-card rounded-xl p-6 mb-6">
          <div className="flex items-start">
            <Icon
              name={motivationCard.icon}
              className=" text-indigo-300 mr-3 mt-1 w-8 h-10 self-start -translate-y-3"
            ></Icon>
            <div>
              <h3 className="font-bold text-xl mb-2">{motivationCard.heading}</h3>
              <p className="text-indigo-100 text-base">{motivationCard.text}</p>
            </div>
          </div>
        </div>
        <div className="space-y-6">
          {features.map((feature) => (
            <div className="flex items-start" key={feature.id}>
              <Icon
                name={feature.icon}
                className="text-indigo-300 mr-3 mt-1 w-8 h-8 -translate-y-2"
              ></Icon>
              <div>
                <h3 className="font-bold text-lg ">{feature.heading}</h3>
                <p className="text-indigo-200 text-base">{feature.text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="mt-4 text-base text-indigo-300">
        <p>{footer}</p>
      </div>
    </section>
  );
};

export default AuthSidebarContent;
