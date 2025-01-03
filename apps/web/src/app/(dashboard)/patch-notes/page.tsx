import NewsCard from "../news/_component/news-card";

export default function PatchNotesPage() {
  return (
    <>
      <div className="flex flex-col gap-6 items-center">
        <h1 className="text-4xl font-bold mt-10">Patch Notes</h1>
        <p className="text-lg text-center max-w-xl text-gray-400">
          All the Latest – Right at Your Fingertips.
        </p>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {...new Array(10)
            .fill(0)
            .map((_, i) => (
              <NewsCard
                key={i}
                title="Lorem ipsum dolor sit amet"
                description="Lorem ipsum dolor sit, amet consectetur adipisicing elit. A, sit repudiandae amet libero laudantium dolores blanditiis est molestias necessitatibus consequuntur temporibus nulla, sapiente officiis laborum iusto qui, eaque nemo quisquam dolore! Sapiente esse, non rerum facilis aspernatur neque saepe facere sit, tenetur voluptatibus ad aut obcaecati laboriosam, aliquam recusandae quia."
                image="/images/default.jpg"
                href="/news/lorem-ipsum"
                date="Dec 23, 2024"
              />
            ))}
        </div>
      </div>
    </>
  );
}
