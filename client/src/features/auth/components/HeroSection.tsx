import type { ReactNode } from "react";

interface HeroSectionProps {
    heading: ReactNode;
    description: string;
}

const HeroSection = ({ heading, description }: HeroSectionProps) => {
    return (
        <section className="hidden h-full w-full items-center justify-center px-8 lg:flex xl:px-12">
            <div className="max-w-lg">
                {/* Heading */}
                <h1 className="text-5xl font-extrabold leading-tight tracking-tight text-white xl:text-6xl">
                    {heading}
                </h1>

                {/* Description */}
                <p className="mt-6 max-w-md text-base leading-8 text-zinc-400 xl:text-lg">
                    {description}
                </p>
            </div>
        </section>
    );
};

export default HeroSection;