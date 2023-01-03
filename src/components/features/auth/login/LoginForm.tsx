import { Button, InputField } from '@/components/shared';
import { useForm } from 'react-hook-form';

const LoginForm = () => {
    const { control, handleSubmit } = useForm({
        defaultValues: {
            email: '',
            password: '',
        },
    });

    const handleLogin = (data: any) => {
        console.log(data);
    };

    return (
        <form method="POST" onSubmit={handleSubmit(handleLogin)}>
            <InputField type="text" name="email" control={control} />
            <InputField type="password" name="password" control={control} />
            <Button type="submit" primary className="mt-[20px]">
                Login
            </Button>
        </form>
    );
};

export default LoginForm;
