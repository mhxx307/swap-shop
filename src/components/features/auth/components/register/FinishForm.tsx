import FormWrapper from '../FormWrapper';

const FinishForm = () => {
    return (
        <FormWrapper title="Review">
            <div className="flex items-center">
                <input
                    id="link-checkbox"
                    type="checkbox"
                    required
                    className="h-4 w-4 rounded border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-blue-600"
                />
                <label
                    htmlFor="link-checkbox"
                    className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                >
                    I agree with the{' '}
                    <span className="text-blue-600 hover:underline dark:text-blue-500">
                        terms and conditions
                    </span>
                </label>
            </div>
        </FormWrapper>
    );
};

export default FinishForm;
