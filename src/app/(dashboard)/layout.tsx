import Header from "@/components/ui/header/header";
import { Providers } from "../providers";
import Sidebar from "@/components/ui/sidebar/sidebar";

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
    <Providers themeProps={{ attribute: "class", defaultTheme: "dark" }}>
        <div className="h-screen w-full flex flex-col z-10">
            <Header></Header>
            <main className="w-full flex-1 flex p-4 pt-0 gap-4 z-10">
                <Sidebar></Sidebar>
                {children}
            </main>
            <div className="absolute custom-background w-full h-full z-0"></div>
        </div>
        
    </Providers>
	);
}