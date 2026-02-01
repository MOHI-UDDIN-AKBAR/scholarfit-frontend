type FormProps = {
  children: React.ReactNode;
  className?: string;
  action: (formData: FormData) => void;
};

const Form: React.FC<FormProps> = ({ children, className = '', action }) => {
  return (
    <form className={className} action={action}>
      {children}
    </form>
  );
};

export default Form;
