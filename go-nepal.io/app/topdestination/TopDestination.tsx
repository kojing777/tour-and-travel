"use client";

import React from "react";
import Link from "next/link";
import DestinationCart from "../destinationcart/DestinationCart";
import type { StaticImageData } from "next/image";
import { toursDummyData } from "@/components/assets/assets";
import { Button } from "@/components/ui/button";

type Tour = {
  _id: string;
  title: string;
  destination: string;
  durationDays: number;
  pricePerPerson: number;
  difficulty: string;
  bestSeason: string[];
  highlights: string[];
  images: (StaticImageData | string)[];
  isAvailable: boolean;
  description?: string;
};

export default function TopDestination() {
  const tours = toursDummyData;

  // Determine which tours to display (Top 3)
  const displayedTours = tours.slice(0, 3);
  const hasMoreTours = tours.length > 3;

  return (
    <section className="bg-[#FAFAF9] bg-[url('/linearBg.svg')] bg-cover py-16 md:py-20 text-slate-900">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-start mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 mb-4">
            Top <span className="text-amber-600">Destinations</span>
          </h2>

          <p className="text-lg text-slate-600 mx-auto">
            Discover Nepal&apos;s most iconic tours, curated for unforgettable
            experiences that blend adventure, culture, and natural beauty.
          </p>
        </div>

        {/* Tours Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mb-10">
          {displayedTours.map((tour: Tour) => (
            <DestinationCart key={tour._id} tour={tour} />
          ))}
        </div>

        {/* Bottom CTA */}
        {hasMoreTours && (
          <div className="mt-12 pt-8 border-t border-amber-100 text-center">
            <p className="text-slate-600 mb-4">
              Explore all our amazing destinations and tour packages
            </p>
            <Link href="/destinations">
              <Button
                className="px-6 py-3 bg-linear-to-r from-slate-900 to-slate-700 hover:from-slate-800 hover:to-slate-600 text-white font-semibold shadow-md transition-colors duration-200"
              >
                View All Tours
              </Button>
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
