import { ReactNode } from 'react';

type FormWrapperProps = {
    title: string;
    description?: string;
    children: ReactNode;
};

const FormWrapper = ({ title, description, children }: FormWrapperProps) => {
    return (
        <>
            <h2 className="mb-[5px] text-4xl font-bold">{title}</h2>
            <p className=" mb-[40px] text-gray-400">{description}</p>
            <div className="grid grid-cols-1 gap-y-[25px]">{children}</div>
        </>
    );
};

export default FormWrapper;
