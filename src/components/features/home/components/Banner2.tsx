import { Button, Image } from '@/components/shared';

export default function Banner2() {
    const image =
        'https://images.unsplash.com/photo-1496293455970-f8581aae0e3b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1713&q=80';
    return (
        <div className="container grid grid-cols-2 mb-4 dark:bg-primaryDark">
            <div className="flex justify-center items-center">
                <Image
                    src={image}
                    alt="test"
                    width={1}
                    height={1}
                    className="w-[400px] h-[500px] rounded-lg shadow-lg"
                />
            </div>
            <div className="relative">
                <div className="absolute top-[30%] left-[10%]">
                    <h2 className="text-[2.6rem] font-[800] mb-2">NAME</h2>
                    <h4>Hãy chia sẽ với hàng xóm của bạn</h4>
                    <h4>Làm cho khu phố của bạn gần gũi và ấm áp</h4>
                    <div className="flex mt-2">
                        <Button
                            className="bg-[#E9ECEF] py-[14px] mr-[16px]"
                            secondary
                        >
                            Xem các mặt hàng phổ biến
                        </Button>
                        <Button className="bg-[#E9ECEF] py-[14px] " secondary>
                            Giao dịch đáng tin cậy
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}
