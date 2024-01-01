const Layout = ({
    children,
    params: { slug },
}: {
    children: React.ReactNode;
    params: { slug: string };
}) => {
    return (
        <div className="sm:container max-w-7xl mx-auto h-full pt-12">
            <div>
                {/* Todo: button to take us back to feed bitch  */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-y-4 gap-5 py-6 ">
                    <div className="flex flex-col col-span-2 space-y-6">
                        {children}
                    </div>
                    {/*info side bar*/}
                    <div className="hidden md:block overflow-hidden h-fit rounded-lg border border-gray-300 order-first md:order-last">
                        <div className="px-6 py-4">
                            <p className="font-semibold py-3 ">
                                About com/{slug}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Layout;
