import { useController, Control } from 'react-hook-form';
import Input, { InputProps } from './Input';

interface InputFieldProps extends InputProps {
    name: string;
    control: Control<any>;
}

const InputField = ({
    name,
    control,
    // not using these props, but we don't want to pass them down to the Input component
    // onChange: externalOnChange,
    onBlur: externalOnBlur,
    value: externalValue,
    ref: externalRef,
    // ********
    ...props
}: InputFieldProps) => {
    const {
        field: { onChange, onBlur, value, ref },
        fieldState: { error },
    } = useController({
        name,
        control,
    });

    return (
        <>
            <Input
                name={name}
                value={value}
                onChange={onChange}
                onBlur={onBlur}
                {...props}
                ref={ref}
            />
            {!!error && (
                <p className="text-[1.4rem] text-red-500">{error.message}</p>
            )}
        </>
    );
};

export default InputField;
