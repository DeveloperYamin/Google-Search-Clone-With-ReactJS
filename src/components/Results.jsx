import { useEffect } from "react";
import ReactPlayer from "react-player";
import { useLocation } from "react-router-dom";
import { useResultContext } from "../contexts/ResultContextProvider";
import Loading from "./Loading";

function Results() {
  const { getResults, results, searchTerm, isLoading } = useResultContext();
  const location = useLocation();
  const pathName = location.pathname;

  useEffect(() => {
    if (searchTerm) {
      if (pathName === "/videos") {
        getResults(`/search/q=${searchTerm} videos`);
      } else {
        getResults(`${pathName}/q=${searchTerm}&num=40`);
      }
    }
  }, [searchTerm, pathName]);

  if (isLoading) return <Loading />;

  switch (pathName) {
    case "/search":
      return (
        <section className="flex flex-wrap justify-between sm:px-56 space-y-6 items-center">
          {results?.map(({ title, link }) => (
            <div key={link} className="md:w-2/5 w-full">
              <a href={link} target="_blank" rel="noreferrer">
                <p className="text-sm">
                  {link?.length > 30 ? link.substring(0, 30) : link}
                </p>
                <p className="text-lg dark:text-blue-300 text-blue-700 hover:underline">
                  {title}
                </p>
              </a>
            </div>
          ))}
        </section>
      );
    case "/images":
      return (
        <section className="flex flex-wrap justify-center items-center">
          {results?.map(({ image, link: { href, title } }, index) => (
            <a
              className="sm:p-3 p-5"
              href={href}
              key={image?.src || index}
              target="_blank"
              rel="noreferrer"
            >
              <img src={image?.src} alt={title || ""} loading="lazy" />
              <p className="w-46 break-words text-sm mt-2">{title}</p>
            </a>
          ))}
        </section>
      );
    case "/news":
      return (
        <section className="flex flex-wrap justify-between sm:px-56 space-y-6 items-center">
          {results?.map(({ title, links, id, source }) => (
            <div key={id} className="md:w-2/5 w-full">
              <a
                href={links?.[0].href}
                target="_blank"
                rel="noreferrer"
                className="hover:underline"
              >
                <p className="text-lg dark:text-blue-300 text-blue-700">
                  {title}
                </p>
              </a>
              <div className="flex gap-4">
                <a href={source?.href} target="_blank" rel="noreferrer">
                  {source?.href}
                </a>
              </div>
            </div>
          ))}
        </section>
      );
    case "/videos":
      return (
        <section
          className="flex flex-wrap justify-center items-center"
          activeVideo
        >
          {results?.map((video) => (
            <div className="p-2" key={video?.additional_links[0].href}>
              {video?.additional_links[0].href && (
                <ReactPlayer
                  url={video?.additional_links[0].href}
                  controls
                  width="355px"
                  height="200px"
                />
              )}
            </div>
          ))}
        </section>
      );
    default:
      return "Error";
  }
}

export default Results;
