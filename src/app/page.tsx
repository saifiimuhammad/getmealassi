import coin from "./assets/gifs/coin.gif";
import gift from "./assets/gifs/gift.gif";
import dev from "./assets/gifs/dev.gif";
import Card from "./components/Card";

const cardsData = [
  {
    src: gift,
    title: "Fans want to help",
    description: "Your fans are available for you to help",
  },
  {
    src: coin,
    title: "Fans want to help",
    description: "Your fans are available for you to help",
  },
  {
    src: dev,
    title: "Fans want to help",
    description: "Your fans are available for you to help",
  },
];

export default function Home() {
  return (
    <section className="w-full">
      <div className="h-full">
        <div className="container mt-4 md:mt-0 h-[60vh] flex items-center justify-center flex-col gap-y-4 border-b border-b-zinc-200">
          <h1 className="text-3xl text-center md:text-5xl font-bold text-[var(--secondary)]">
            Support Creators, Fund Dreams
          </h1>
          <p className="text-center text-xl md:text-2xl font-light">
            Getmealassi is a simple and transparent way to support your favorite
            creators, startups, and projects.
          </p>
          <div className="flex items-center justify-center gap-x-4 mt-8">
            <button className="px-6 py-3 rounded-full bg-[var(--accent)] text-[var(--background)] cursor-pointer hover:bg-[#0060cc] hover:text-white transition-all duration-300">
              Start here!
            </button>
            <button
              className={`relative text-[var(--secondary)] after:absolute after:left-0 after:bottom-0 after:w-0 after:h-[1px] after:bg-[var(--secondary)] after:transition-all after:duration-300 hover:after:w-full cursor-pointer`}
            >
              Read more
            </button>
          </div>
        </div>

        <div className="container flex items-center justify-center flex-col gap-y-4 pt-20 pb-20 md:pb-42">
          <h2 className="text-xl md:text-2xl text-center font-medium">
            Your fans can buy you a lassi
          </h2>
          <div className="container flex items-center justify-center md:justify-between flex-wrap gap-10">
            {cardsData.map(({ src, title, description }, key) => {
              return (
                <Card
                  key={key}
                  src={src}
                  title={title}
                  description={description}
                />
              );
            })}
          </div>
        </div>

        <div className="container flex items-center justify-center flex-col gap-y-10 pt-20 pb-20 md:pb-42">
          <h2 className="text-2xl font-medium">Learn more about us</h2>
          <iframe
            width="560"
            height="315"
            src="https://www.youtube.com/embed/QtaorVNAwbI?si=Ov6o3iQZj83uUWVH"
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
            className="w-full rounded-lg shadow-lg"
          ></iframe>
        </div>
      </div>
    </section>
  );
}
