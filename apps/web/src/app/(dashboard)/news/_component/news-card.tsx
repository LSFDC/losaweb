import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from "@losaweb/ui/components/card";
import Image from "next/image";
import Link from "next/link";

interface NewsCardProps {
  title: string;
  description: string;
  image: string;
  href: string;
  date: string;
}

const NewsCard: React.FC<NewsCardProps> = ({
  title,
  description,
  image,
  href,
  date,
}) => {
  return (
    <Card className="hover:shadow-lg transition-all duration-300 hover:scale-105">
      <Link href={href} passHref>
        <CardHeader className="p-0 relative h-56">
          <Image
            src={image}
            alt={title}
            layout="fill"
            objectFit="cover"
            className="rounded-t-md"
          />
        </CardHeader>
        <CardContent className="p-6">
          <h2 className="text-xl font-semibold mb-2">{title}</h2>
          <p className="text-gray-600 text-sm mb-4 line-clamp-3">
            {description}
          </p>
        </CardContent>
      </Link>
      <CardFooter className="px-6 pb-6 text-sm text-gray-500 flex justify-between">
        <span>{date}</span>
        <Link href={href} passHref>
          Read more
        </Link>
      </CardFooter>
    </Card>
  );
};

export default NewsCard;
