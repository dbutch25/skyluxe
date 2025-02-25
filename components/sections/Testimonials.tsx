"use client";

import { InfiniteMovingCards } from "../ui/MovingCards";

const Testimonials = () => {
  return (
    
    <div className="py-10 sm:py-20 bg-primary-50">
        <div className=" container text-sm flex text-secondary-800 items-center gap-2 border-b border-primary-400 mb-12 sm:mb-14 pb-4">
            <span className="h-1 w-6 bg-secondary-600 block rounded-full"/>
            <span>From Our Clients</span>
        </div>
        <div className="rounded-md flex flex-col antialiased bg-primary-50 dark:bg-black dark:bg-grid-white/[0.05] items-center justify-center relative overflow-hidden">
        <InfiniteMovingCards
            items={testimonials}
            direction="right"
            speed="slow"
        />
        </div>
    </div>
  );
}

const testimonials = [
  {
    quote:
      "The BEST in the business - I can not thank Mark and his team at Skyluxe enough for their amazing work, attention to detail and professionalism.  From roofing, to ACM to a floating deck, these guys can really do it all!  I would highly recommend their services, and the photos speak for themselves.",
    name: "Ontario Dental Implant Network",
  },
  {
    quote:
      "Skyluxe did my modern homes' flat roof in Oakville on Chartwell Rd, they have a great crew and do very clean work! They fixed the slopping issue and updated the drains, so no more standing wate like before I would highly recommend them if you are doing a higher end project and are particular of the fit and finnish",
    name: "Daniel - PinkCherry",
  },
  {
    quote: "I have used Skyluxe Roofing 3 times - a large complicated flat roof on my studio/living space building needed replacing, they sorted out a leaking roof on my sister's home and finally I had the company redo my flat garage roof. Mark and his crew were attentive to what I needed and extremely tidy. Mark is up on all of the latest roofing materials and because of their workmanship and dependability...",
    name: "william roddy",
  },
  {
    quote:
      "Skyluxe is an amazing overall outfit for your custom home or commercial project.  I used them for my roof along with ACM for my residential home.  They were quick, reliable, and extremely professional.  Their crew was fast and efficient leaving my jobsite very clean after they were complete.",
    name: "Courtney Borg",
  },
  {
    quote:
      "A Truly one of kind company. Unmatched when it comes to quality, professionalism, and transparency. Wouldn’t trust any roofing or waterproofing company other than Skyluxe. Highly recommended and a top tier company from the bottom up. Mark and his entire team are second to none. Thank you for your services.",
    name: "K F",
  },
  {
    quote:
      "If you’re looking for roofing services or ACM panel/metal cladding work, this is hands down the best company in Ontario. They excel in handling everything from residential to commercial projects with unparalleled expertise and professionalism. The entire team is exceptionally knowledgeable...",
    name: "Samantha Katouzian",
  },
  {
    quote:
      "The customer service was exceptional, and the installation team demonstrated utmost professionalism, organization, and cleanliness. Their efforts resulted in a remarkable transformation of my old house, making it appear brand new. I would like to express my sincere gratitude...",
    name: "israel izzy",
  },
];

export default Testimonials;
