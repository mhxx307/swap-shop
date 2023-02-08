import { ReactNode } from 'react';

type FormWrapperProps = {
    title: string;
    description?: string;
    children: ReactNode;
};

const FormWrapper = ({ title, description, children }: FormWrapperProps) => {
    return (
        <>
            <h2 className="text-4xl font-bold mb-[5px]">{title}</h2>
            <p className=" text-gray-400 mb-[40px]">{description}</p>
            <div className="grid grid-cols-1 gap-y-[25px]">{children}</div>
        </>
    );
};

export default FormWrapper;
