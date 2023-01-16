import { AiOutlineLeft } from 'react-icons/ai';

export interface PopupMenuHeaderProps {
    title: string;
    onBack?: () => void;
}

const PopupMenuHeader = ({ title, onBack }: PopupMenuHeaderProps) => {
    return (
        <header className="relative h-[50px] w-full mt-[-8px] flex-shrink-0">
            {onBack && (
                <button
                    onClick={onBack}
                    className="w-[50px] h-full bg-transparent cursor-pointer"
                >
                    <AiOutlineLeft />
                </button>
            )}
            <h4 className="absolute top-[50%] left-[40%] translate-x-[-50%] translate-y-[-50%]">
                {title}
            </h4>
        </header>
    );
};

export default PopupMenuHeader;
