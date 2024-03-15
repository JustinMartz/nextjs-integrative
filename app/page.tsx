import Image from "next/image";
import desktopImg from "@/app/public/office-large.webp";
import mobileImg from "@/app/public/office-small.webp";
import { dmSerifDisplay } from "./ui/fonts";
import Link from "next/link";
import { ArrowRightIcon } from "@heroicons/react/24/outline";

export default function Home() {
  return (
    <main className="flex w-screen h-svh md:min-h-screen flex-row items-center md:justify-center p-8 md:p-24 bg-homepage bg-bottom bg-cover">
      <div className="h-50svh md:w-3/4 md:h-[50vh] flex flex-col md:flex-row bg-gray-50 rounded-lg drop-shadow-md ">
        <div className="md:justify-start w-full md:w-5/12 md:m-2 p-2 md:p-0 order-last md:order-first flex flex-col">
          <h1
            className={`${dmSerifDisplay.className} text-center text-2xl md:text-left md:text-3xl`}
          >
            Integrative Practice
          </h1>
          <hr className="md:w-8/12 w-48 mx-auto md:mx-0 h-1 mt-4 bg-gray-200 border-0 rounded dark:bg-gray-700"></hr>
          <p className="leading-tight text-justify text-sm my-4 md:text-base md:text-left">
            Welcome to{" "}
            <span className="font-semibold">Integrative Practice</span>, the
            ultimate solution for therapists managing their own practice.
          </p>
          {/* <p className="leading-tight">
          <span className="font-semibold">Integrative Practice</span> simplifies the administrative tasks of
            tracking clients, sessions, payments, and new intakes, allowing
            therapists therapists to deliver
            their best care effortlessly.
          </p>
          <br /> */}
          <p className="leading-tight text-justify text-sm md:text-base md:text-left">
            With intuitive features designed specifically for independent
            practitioners,{" "}
            <span className="font-semibold">Integrative Practice</span> empowers
            therapists to deliver their best care effortlessly.
          </p>
          <div className="mt-auto flex justify-center">
          <Link
            href="/dashboard"
            className="w-fit flex justify-center md:justify-end items-center gap-3 my-6 md:gap-5  md:m-0 md:mt-4 rounded-lg bg-blue-500 px-4 py-2 md:px-6 md:py-3 text-sm font-medium text-white transition-colors hover:bg-blue-400 md:text-base"
          >
            <span>Log in</span> <ArrowRightIcon className="w-5 md:w-6" />
          </Link>
          </div>
        </div>
        <div className="md:w-7/12 relative m-2 w-12/12">
          <Image
            src={desktopImg}
            // width={1024}
            // height={1024}
            fill={true}
            className="hidden md:block rounded-lg"
            alt="Picture of therapist's office."
          />
          <Image
            src={mobileImg}
            width={560}
            height={420}
            className="block md:hidden rounded-lg"
            alt="Picture of therapist's office."
          />
        </div>
      </div>
    </main>
  );
}
