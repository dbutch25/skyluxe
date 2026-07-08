'use client';

import { useState } from 'react';

interface AccordionItem {
    title: string;
    content: string;
}

interface AccordionProps {
    items: AccordionItem[];
}

export default function Accordion({ items }: AccordionProps) {
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    return (
        <div className="w-full max-w-6xl mx-auto">
            {items.map((item, index) => (
                <div key={index} className="border-b border-gray-200">
                    <button
                        onClick={() => setOpenIndex(openIndex === index ? null : index)}
                        className="w-full text-left py-4 px-6 bg-gray-100 hover:bg-gray-200 focus:outline-none flex justify-between items-center"
                        aria-expanded={openIndex === index}
                    >
                        <span className="text-lg font-julius text-primary-950">{item.title}</span>
                        <span className={`transition-transform duration-300 ${openIndex === index ? "rotate-180" : ""}`}>
                            ▼
                        </span>
                    </button>
                    <div
                        className={`overflow-hidden transition-all duration-500 ease-in-out ${
                            openIndex === index ? "max-h-[1000px] opacity-100" : "max-h-0 opacity-0"
                        }`}
                    >
                        <div className="p-6 text-base font-montserrat text-primary-900">{item.content}</div>
                    </div>
                </div>
            ))}
        </div>
    );
}
