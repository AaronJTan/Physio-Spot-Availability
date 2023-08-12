import Image from "next/image";
import Link from "next/link";

export default function Navbar() {
    const logoDimension = 60;

    return (
        <div className="bg-white py-2" style={{boxShadow: "0 2px 4px 0 rgba(0,0,0,.2)"}}>
            <div className="flex justify-between container">
                <Link href="/" className="flex gap-1">
                    <Image
                        src={"/company_logo.png"}
                        width={logoDimension}
                        height={logoDimension}
                        alt="test"
                    />

                    <span className="font-bold text-sm leading-4 self-center">THE PHYSIO SPOT -<br />AVAILABLE APPOINTMENTS</span>
                </Link>
            </div>
        </div>
    )
}
