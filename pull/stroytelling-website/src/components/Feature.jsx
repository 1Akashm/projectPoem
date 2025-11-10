import React from "react";

const BentoCard = ({ src, title, description }) => {
  return (
    <div className="relative size-full text-white">
      <video
        src={src}
        loop
        muted
        autoPlay
        className="absolute top-0 left-0 size-full object-cover"
      />
      <div className="relative z-10 flex size-full flex-col justify-between p-5 text-blue-50">
        <div>
          <h1 className="font-bold font-zentry text-6xl">{title}</h1>
          {description && (
            <p className="mt-3 max-w-64 md:text-[1rem] text-base">
              {description}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

const Feature = () => {
  return (
    <div className="bg-black pb-52">
      <div className="mx-auto md:px-3 px-10">
        {/* Header */}
        <div className="px-5 py-32">
          <p className="font-circular text-lg text-blue-50">
            Into the Metagame Layer
          </p>
          <p className="max-w-md font-circular text-lg text-blue-50 opacity-50">
            Immerse yourself in a rich and ever-expanding universe where a
            vibrant array of products converge into an interconnected overlay
            experience on your world.
          </p>
        </div>

        {/* Hero card */}
        <div className="border-hsla relative mb-7 h-96 w-full overflow-hidden rounded-md md:h-[65vh]">
          <BentoCard
            src="/videos/feature-1.mp4"
            title={
              <>
                radi<b>n</b>t
              </>
            }
            description="A cross platform
          metagame app, turning your activities across Web2 and Web3 games into a rewarding adventure."
          />
        </div>

        {/* Responsive grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 md:grid-rows-3 gap-7 h-auto md:h-[135vh]">
          {/* Each child gets height 50dvh on small screens */}
          <div className="h-[50dvh] md:h-auto md:row-span-2">
            <BentoCard
              src="videos/feature-2.mp4"
              title={
                <>
                  zig<b>m</b>a
                </>
              }
              description="An anime and gaming-inspired NFT collection - the IP primed for expansion."
            />
          </div>

          <div className="h-[50dvh] md:h-auto">
            <BentoCard
              src="videos/feature-3.mp4"
              title={
                <>
                  N<b>e</b>xus
                </>
              }
              description="A gamified social hub, adding a new dimension of play to social interaction for web3 communities."
            />
          </div>

          <div className="h-[50dvh] md:h-auto">
            <BentoCard
              src="videos/feature-4.mp4"
              title={
                <>
                  az<b>u</b>l
                </>
              }
              description="A cross-world AI Agent - elevating your gameplay to be more fun and productive."
            />
          </div>

          <div className=" md:h-auto">
            <div className="flex size-full flex-col justify-between bg-violet-300 p-5">
              <h1 className="font-zentry text-black text-[2rem] md:text-[5rem] max-w-64">
                M<b>o</b>re co<b>m</b>ing s<b>o</b>on!
              </h1>
            </div>
          </div>

          <div className="h-[50dvh] md:h-auto">
            <video
              src="videos/feature-5.mp4"
              loop
              autoPlay
              muted
              className="size-full object-cover object-center"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Feature;
