import { SwiperEffectCard } from '@/components/shared';

export default function Banner1() {
    const images = [
        'https://images.unsplash.com/photo-1496293455970-f8581aae0e3b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1713&q=80',
        'https://images.unsplash.com/photo-1509281373149-e957c6296406?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8dmludGFnZXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=60',
        'https://images.unsplash.com/photo-1484396196377-1ca16c878cb4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTd8fHZpbnRhZ2V8ZW58MHx8MHx8&auto=format&fit=crop&w=800&q=60',
    ];
    return (
        <div className="container grid grid-cols-2 mb-4 bg-[#FBF7F2] dark:bg-primaryDark min-h-screen">
            <div className="relative">
                <div className="absolute top-[35%] left-[10%]">
                    <h2 className="text-[2.6rem] font-[800] mb-2">NAME</h2>
                    <h4>Hãy chia sẽ với hàng xóm của bạn</h4>
                    <h4>Làm cho khu phố của bạn gần gũi và ấm áp</h4>
                </div>
            </div>
            <div className="flex justify-center items-center">
                <SwiperEffectCard images={images} />
            </div>
        </div>
    );
}
