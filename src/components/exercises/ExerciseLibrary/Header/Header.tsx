const Header: React.FC = () => {
  return (
    <section className="md:flex md:items-center md:justify-between">
      <div className="flex-1 min-w-0">
        <h1 className="py-2 text-2xl font-bold leading-7 text-center text-gray-900 sm:text-3xl sm:truncate">
          Exercise Library
        </h1>
      </div>
    </section>
  );
};

export default Header;
