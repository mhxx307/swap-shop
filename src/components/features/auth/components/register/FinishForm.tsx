import { RegisterPayload } from '@/types';
import { FieldErrorsImpl } from 'react-hook-form';

const FinishForm = ({
    errors,
}: {
    errors: Partial<FieldErrorsImpl<RegisterPayload>>;
}) => {
    return (
        <>
            <h3>Review</h3>
            <div>
                <h3>Error</h3>
                <p>{errors.email?.message}</p>
                <p>{errors.username?.message}</p>
                <p>{errors.fullName?.message}</p>
                <p>{errors.phoneNumber?.message}</p>
                <p>{errors.address?.message}</p>
            </div>
            <div></div>
            <div className="flex items-center">
                <input
                    id="link-checkbox"
                    type="checkbox"
                    required
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                />
                <label
                    htmlFor="link-checkbox"
                    className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                >
                    I agree with the{' '}
                    <a
                        href="#"
                        className="text-blue-600 dark:text-blue-500 hover:underline"
                    >
                        terms and conditions
                    </a>
                </label>
            </div>
        </>
    );
};

export default FinishForm;
