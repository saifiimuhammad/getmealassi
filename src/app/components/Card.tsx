import Image, { StaticImageData } from "next/image";

type CardPropType = {
  src: StaticImageData;
  title: string;
  description: string;
};

const Card = ({ src, title, description }: CardPropType) => {
  return (
    <div className="card flex items-center justify-center flex-col gap-x-2">
      <Image
        src={src}
        alt="coin gif"
        height={100}
        width={100}
        className="w-[200px] h-auto"
        unoptimized
      />
      <h3 className="text-lg font-medium">{title}</h3>
      <p className="font-light">{description}</p>
    </div>
  );
};
export default Card;
