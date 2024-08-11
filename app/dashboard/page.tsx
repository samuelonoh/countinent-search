"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { TCountries } from "../type/data";

export default function Home() {
  const [message, setMessage] = useState<string>("");
  const [countries, setCountries] = useState<TCountries[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [error, setError] = useState<boolean>(false)

  const BASE_URL = "https://restcountries.com/v3.1/region";

  const fetchCountries = async () => {
    if(message === "") {
        setError(true)
        setIsLoading(false);
        return
    }
    try {
        setIsLoading(true);
      const response = await fetch(`${BASE_URL}/${message}`);
      const data = (await response.json()) as TCountries[];
      setCountries(data);
      setIsLoading(false)
    } catch (e) {
      console.error(`${e}......There's an error`);
      setError(true)
      setIsLoading(false)
    }
  };

  useEffect(() => {
  }, []);

  const handleChange = () => {
    fetchCountries();
  };


  return (
    <div className="bg-[#2f6690] h-screen w-screen flex flex-col relative">
      <section className="py-[2.5rem] text-[#d9dcd6] flex flex-col items-center justify-center">
        <p className="text-4xl font-bold mb-1">Continent Search</p>
        <p className="text-sm">Input a region.....e.g Africa</p>
        <div className="space-x-3">
          <input
            className="mt-7 border-[#d9dcd6] border-2 outline-none bg-transparent p-3 rounded-lg"
            type="text"
            id="message"
            name="message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <button
            onClick={handleChange}
            className="bg-[#16425b] p-3 rounded-lg"
          >
            Search
          </button>
        </div>
        {countries.length !== 0 && (
          <p className="font-bold mt-10">
            Number of countries: {countries.length}
          </p>
        )}
      </section>

      <section className="flex flex-wrap items-start justify-center gap-4 border-4 border-[#16425b] rounded-xl h-full py-[2rem] px-[1rem] overflow-y-auto">
        {isLoading ? (
          <div className="flex items-center justify-center w-full h-full">
            <div className="border-gray-300 h-20 w-20 animate-spin rounded-full border-8 border-t-blue-600" />
          </div>
        ) : (
          countries.length !== 0 &&
          countries.map((country, index) => (
            <div
              key={index}
              className="rounded-lg w-[17rem] h-fit bg-[#bcbebb]"
            >
              <div className="relative w-full h-[12rem]">
                <Image
                  src={country.flags.png}
                  alt=""
                  layout="fill"
                  quality={100}
                  className="rounded-t-lg h-full w-full"
                />
              </div>
              <div className="p-3 py-5 gap-5 flex flex-col bg-[#f1faee] rounded-b-lg">
                <div className="h-[3rem]">
                  <p className="font-bold text-[#16425b]">
                    {country.name.common}
                  </p>
                  <p className="text-sm text-[#16425b]">{country.region}</p>
                </div>
                <p className="text-[#16425b]">👫 {country.population}</p>
                <p>🗣️ {Object.values(country.languages)[0]}</p>
                {country.currencies &&
                  Object.keys(country.currencies).length > 0 && (
                    <p className="text-[#16425b]">
                      💰 {Object.values(country.currencies)[0].name}
                    </p>
                  )}
              </div>
            </div>
          ))
        )}
      </section>
      {error && (
        <div className="absolute w-full h-full flex items-center justify-center backdrop-blur-sm">
          <div
            className="bg-red-100 border-t-4 border-red-500 rounded-b text-red-900 px-4 py-3 shadow-md"
            role="alert"
          >
            <div className="w-full flex justify-end">
              <div onClick={() =>setError(false)} className=" text-right cursor-pointer bg-slate-400 rounded-full text-black p-2 mb-4">
                &#x2715;
              </div>
            </div>
            <div className="flex">
              <div className="py-1">
                <svg
                  className="fill-current h-6 w-6 text-red-500 mr-4"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                >
                  <path d="M2.93 17.07A10 10 0 1 1 17.07 2.93 10 10 0 0 1 2.93 17.07zm12.73-1.41A8 8 0 1 0 4.34 4.34a8 8 0 0 0 11.32 11.32zM9 11V9h2v6H9v-4zm0-6h2v2H9V5z" />
                </svg>
              </div>
              <div>
                <p className="font-bold">Input a Region</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
