import Navbar from "@/components/navbar";
import { Nunito } from "next/font/google";


const nunito = Nunito({
  variable: "--font-nunito",
  subsets: ["latin"],
});

export default function ProfileLayout({ children }) {
	return (
		<section className={`min-h-screen bg-[#e9ecf2] text-gray-900 ${nunito.variable} `}>

			<div className='flex p-5 h-screen gap-10'>
				<Navbar></Navbar>
				<div className=" ml-[340px]">
					{children}
				</div>
			</div>
		</section>
	);
}
