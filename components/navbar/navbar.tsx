import NavLinks from "./navlinks";
import { auth } from "@/lib/auth";

export default async function Navbar() {
    const session = await auth();
    return (
        <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <NavLinks session={session} />
        </header>
    );
}
