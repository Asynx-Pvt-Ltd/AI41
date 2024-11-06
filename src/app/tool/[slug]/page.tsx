"use client";
import Image from "next/image";
import Footer from "../../components/Footer";
import { Header } from "../../components/Header";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Card } from "@/app/components/Card";
import Link from "next/link";
import FormattedContent from "@/app/components/FormattedContent";
import { FaExternalLinkAlt } from "react-icons/fa";

export default function Tool() {
  const [tool, setTool] = useState<any>();
  const [alternatives, setAlternatives] = useState<any>([]);
  const params = useParams<{ slug: string }>();
  console.log("====================================");
  console.log("params --->", params);
  console.log("====================================");
  useEffect(() => {
    if (params && params.slug) {
      fetch(`/api/tools/slug/${params?.slug}`)
        .then((res) => res.json())
        .then((d) => {
          console.log("====================================");
          console.log("tool ===>", d.tool);
          console.log("====================================");
          console.log("====================================");
          console.log("alternatives ===>", d.alternatives);
          console.log("====================================");
          setTool(d.tool);
          setAlternatives(d.alternatives);
        })
        .catch((err) => {
          console.log("====================================");
          console.log("err --->", err);
          console.log("====================================");
        });
    }
  }, [params]);

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow bg-white dark:bg-gray-800 w-full pt-10 pl-6 pr-6 pb-6 text-center">
        {tool ? (
          <>
            <div className="flex flex-row">
              <div className="flex flex-col lg:h-[460px] max-w-[1278px] w-full mx-auto border-[#222222] bg-white p-2 lg:p-8 shadow-sm shadow-[#222222] rounded-lg justify-around">
                <div className="flex flex-row justify-between">
                  <div className="flex flex-col">
                    <Link
                      className=" border-slate-400 border-1 px-2 rounded-lg"
                      href={
                        "/ai-categories/" +
                        tool.category.replaceAll(" ", "-").toLowerCase()
                      }
                    >
                      {tool.category}
                    </Link>
                  </div>
                  <div className="flex flex-col">
                    <div className="flex flex-row justify-around">
                      <a
                        href={`https://twitter.com/intent/tweet?url=${window.location.href}`}
                        target="_blank"
                        className="mr-1"
                      >
                        <Image
                          src={"/twitter.png"}
                          width={14}
                          height={14}
                          alt="x.com"
                        />
                      </a>
                      <a
                        href={`https://www.facebook.com/sharer/sharer.php?u=${window.location.href}`}
                        target="_blank"
                        className="mr-1"
                      >
                        <Image
                          src={"/facebook.png"}
                          width={18}
                          height={18}
                          alt="facebook.com"
                          className="mt-[-2px]"
                        />
                      </a>
                      <a
                        href={`https://www.linkedin.com/shareArticle?url=${window.location.href}&title=${tool.name}`}
                        target="_blank"
                        className="mr-2"
                      >
                        <Image
                          src={"/linkedin.png"}
                          width={14}
                          height={14}
                          alt="linkedin.com"
                        />
                      </a>
                      <a
                        href={`https://t.me/share/url?url=${window.location.href}`}
                        target="_blank"
                        className="mr-2"
                      >
                        <Image
                          src={"/telegram.png"}
                          width={16}
                          height={16}
                          alt="telegram.com"
                        />
                      </a>
                      <a
                        href={`mailto:?subject=${tool.name}&body=${window.location.href}`}
                        target="_blank"
                        className="mr-1"
                      >
                        <Image
                          src={"/email.png"}
                          width={16}
                          height={16}
                          alt="Mail"
                        />
                      </a>
                    </div>
                  </div>
                </div>
                <div className="flex w-full flex-wrap md:flex-nowrap">
                  <div className="flex flex-col w-full md:pr-4">
                    <div className="flex flex-row w-full md:w-3/4 p-[3px] bg-[#222222] overflow-hidden rounded-lg shadow-lg">
                      <Image
                        src={
                          tool.thumbnail == ""
                            ? "/placeholder.jpeg"
                            : tool.thumbnail
                        }
                        width={566}
                        height={288}
                        alt="ChatGPT"
                        className="w-[566px] h-[288px] object-cover object-top"
                      />
                    </div>
                    <div className="flex flex-row mt-3 w-fit">
                      {tool.tags?.map((t: string, i: number) => (
                        <Link
                          key={i}
                          className="bg-slate-100 border rounded-md text-sm lg:text-medium border-gray-700 p-1 lg:p-[] m-2"
                          href={`/ai-categories/${t
                            .trim()
                            .split(" ")
                            .map((s) => s.toLowerCase())
                            .join("-")}`}
                        >
                          <span className="font-normal">#{t}</span>
                        </Link>
                      ))}
                    </div>
                  </div>
                  <div className="flex flex-col justify-around lg:mt-0 mt-6">
                    <div className="flex flex-row justify-center gap-1">
                      <Image
                        src={tool.icon}
                        alt={tool.name}
                        width={32}
                        height={32}
                        className="w-8 h-8"
                      />
                      <h1 className="text-2xl font-bold text-gray-800 ">
                        {tool?.name}
                      </h1>
                    </div>

                    <div className="flex flex-row max-w-[700px] py-1 px-2 lg:py-2 lg:px-4 bg-[rgba(34,34,34,0.9)] rounded-lg shadow-lg shadow-[#222222] lg:p-2">
                      <p
                        className="text-white mb-4 text-justify tracking-[0.3px] leading-normal p-[6px] whitespace-pre-line line-clamp-5 overflow-hidden"
                        dangerouslySetInnerHTML={{
                          __html: tool?.shortDescription,
                        }}
                      ></p>
                    </div>
                    <a
                      href={tool?.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex gap-2 items-center max-w-32 self-center mt-4 lg:mt-0 bg-[rgba(34,34,34,0.9)] text-white px-4 py-2 rounded-md hover:bg-[#222222] transition"
                    >
                      Visit Site <FaExternalLinkAlt size={12} />
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-row justify-center gap-2 mt-[65px] lg:mt-6 mx-auto flex-wrap lg:flex-nowrap">
              <div className="flex flex-col max-w-[880px] w-full bg-white shadow-lg p-5">
                {/* <p
                  className="text-gray-600 mb-4 text-left whitespace-pre-line"
                  dangerouslySetInnerHTML={{ __html: tool?.description }}
                ></p> */}
                <FormattedContent content={tool?.description} />
              </div>
              <div className="flex flex-col max-w-[390px] w-full">
                <div className="flex flex-row justify-center items-center text-center w-full h-[70px] bg-white shadow-lg border border-slate-400 rounded-md">
                  <span className="font-bold text-xl">
                    Alternatives to {tool.name}
                  </span>
                </div>
                {alternatives ? (
                  alternatives.slice(-4).map((tool: any, idx: number) => (
                    <div
                      key={idx}
                      className="flex flex-row rounded-md w-full p-2 mt-2 overflow-hidden bg-white border-slate-400 dark:bg-gray-800 dark:border-slate-500 border dark:group-hover:border-slate-300 group-hover:border-slate-700 relative z-50"
                    >
                      <div className="flex flex-col justify-around">
                        <div className="flex flex-row justify-center items-center mt-4">
                          <div className="flex flex-col justify-center mr-1">
                            <Image
                              src={tool?.icon}
                              alt={tool?.name}
                              width={32}
                              height={32}
                              className="w-10 h-10"
                            />
                          </div>
                          <div className="flex flex-col items-center justify-center">
                            <h4 className="text-black dark:text-zinc-100 font-bold tracking-wide text-lg capitalize">
                              {tool.name}
                            </h4>
                          </div>
                        </div>
                        <div className="flex flex-row justify-center items-center py-1">
                          <p
                            className="my-3 text-justify text-black tracking-wide leading-0 text-sm line-clamp-3 overflow-hidden px-2"
                            dangerouslySetInnerHTML={{
                              __html: tool.shortDescription,
                            }}
                          />
                        </div>
                        <div className="flex flex-col justify-center items-center mb-4">
                          <Link
                            href={"/tool/" + tool.slug}
                            className="w-fit h-8 rounded-md py-1 px-2 bg-black text-white dark:bg-white dark:text-black flex items-center gap-2"
                          >
                            Visit <FaExternalLinkAlt size={10} />
                          </Link>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="flex flex-row justify-center items-center">
                    <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-black dark:border-white"></div>
                  </div>
                )}
              </div>
            </div>
          </>
        ) : (
          <div className="flex flex-row justify-center items-center">
            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-black dark:border-white"></div>
          </div>
        )}
        <Card />
      </main>
      <Footer />
    </div>
  );
}
