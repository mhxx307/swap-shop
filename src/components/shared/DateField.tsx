import Datepicker from 'react-tailwindcss-datepicker';
import { useRouter } from 'next/router';
import { Control, useController } from 'react-hook-form';

interface DateProps {
    name: string;
    control: Control<any>;
    placeholder?: string;
}

const DateField = ({ name, control, placeholder }: DateProps) => {
    const router = useRouter();

    const {
        field: { onChange, value },
        fieldState: { error },
    } = useController({
        name,
        control,
    });

    return (
        <div>
            <p className={`${error ? 'error-label' : 'default-label'}`}>
                Birthday:
            </p>

            <Datepicker
                onChange={onChange}
                value={value}
                inputName={name}
                asSingle
                useRange={false}
                displayFormat={'DD/MM/YYYY'}
                i18n={router.locale === 'vi' ? 'vi' : 'en'}
                placeholder={placeholder}
            />
            {!!error && (
                <p className="text-sm text-red-600 dark:text-red-500">
                    {error.message}
                </p>
            )}
        </div>
    );
};

export default DateField;
