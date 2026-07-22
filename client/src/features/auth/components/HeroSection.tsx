const HeroSection = () => {
  return (
    <section className="hidden h-full w-full items-center justify-center px-6 lg:flex">
      <div className="max-w-md">
        {/* Heading */}
        <h1 className="text-5xl font-extrabold leading-tight text-white">
          Connecting
          <br />
          <span className="text-blue-600">People,</span>
          <br />
          Creating
          <br />
          <span className="text-blue-600">Moments.</span>
        </h1>

        {/* Description */}
        <p className="mt-5 max-w-sm text-base leading-7 text-zinc-400">
          Share your world, discover new people, and create unforgettable moments with ConnectGram.
        </p>
      </div>
    </section>
  );
};

export default HeroSection;