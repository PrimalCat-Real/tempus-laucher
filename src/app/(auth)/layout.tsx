import { Providers } from "../providers";
import Logo from "@/components/icons/logo";

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
    <Providers themeProps={{ attribute: "class", defaultTheme: "dark" }}>
        <div className="h-screen w-full flex z-10 justify-center items-center">
            <main className="bg-background w-1/2 min-w-[280px] max-w-[45%] z-10 h-fit min-h-[240px] flex flex-col justify-center items-center p-4 rounded-md gap-4">
                <Logo></Logo>
                {children}
            </main>
            <div className="absolute custom-background w-full h-full z-0"></div>
        </div>
        
    </Providers>
	);
}