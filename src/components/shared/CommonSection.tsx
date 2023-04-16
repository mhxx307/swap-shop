function CommonSection({ title }: { title: string }) {
    return (
        <section className="header-height bg-[url('/images/bg.jpg')] bg-cover bg-center bg-no-repeat">
            <div className="p-8 text-center">
                {' '}
                <h2 className="text-2xl font-bold text-white">{title}</h2>
            </div>
        </section>
    );
}

export default CommonSection;
