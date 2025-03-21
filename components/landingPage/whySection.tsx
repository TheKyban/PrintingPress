"use client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { sourceSerif4 } from "@/lib/font";
import { cn } from "@/lib/utils";
import { motion } from "motion/react";

export default function WhySection() {
    const tabs = [
        {
            title: "Business Cards",
            imgSrc: "https://images.unsplash.com/photo-1495846414472-6696652d955f?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            text: "Professional business cards that make networking a breeze!",
        },
        {
            title: "Posters",
            imgSrc: "https://images.unsplash.com/photo-1480936600919-bffa6b7ecf1e?ixid=M3w0Mzc5fDB8MXxzZWFyY2h8MTF8fHByaW50c3xlbnwwfDB8fHwxNzM5ODEwMjE4fDA&ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
            text: "Eye-catching posters that turn heads and spark conversations!",
        },
        {
            title: "Brochures",
            imgSrc: "https://images.unsplash.com/photo-1479009956747-647858cb2b07?ixid=M3w0Mzc5fDB8MXxzZWFyY2h8Mnx8cHJpbnRzfGVufDB8MHx8fDE3Mzk4MTAyMTh8MA&ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
            text: "Brochures that tell your story in style and flair!",
        },
        {
            title: "Banners",
            imgSrc: "https://images.unsplash.com/photo-1532152734721-b08cb57943aa?ixid=M3w0Mzc5fDB8MXxzZWFyY2h8OXx8cHJpbnRzfGVufDB8MHx8fDE3Mzk4MTAyMTh8MA&ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
            text: "Banners that shout your message loud and clear!",
        },
        {
            title: "Stickers",
            imgSrc: "https://images.unsplash.com/photo-1581084353124-8fed61a24bbc?ixid=M3w0Mzc5fDB8MXxzZWFyY2h8MzB8fHByaW50c3xlbnwwfDB8fHwxNzM5ODEwMjE4fDA&ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
            text: "Stickers that stick around and spread your brand!",
        },
        {
            title: "Custom Orders",
            imgSrc: "https://images.unsplash.com/photo-1498451552612-fe70e45f9804?ixid=M3w0Mzc5fDB8MXxzZWFyY2h8Mjd8fHByaW50c3xlbnwwfDB8fHwxNzM5ODEwMjE4fDA&ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
            text: "Custom orders tailored to your unique vision and needs!",
        },
    ];

    return (
        <section
            className={cn(
                "pt-[80px] pb-[80px] bg-white text-charcoal-black text-[16px] leading-[24px] w-full",
                sourceSerif4.className,
            )}
        >
            <div className="bg-white text-charcoal-black text-[16px] w-full max-w-customHaf lg:max-w-custom mx-auto leading-[24px] ">
                <div className="relative bg-white text-charcoal-black text-[16px] mx-[16px] leading-[24px] ">
                    <div className="bg-white text-charcoal-black text-[16px] leading-[24px]">
                        {/* <motion.h3
                            initial={{
                                opacity: 0,
                            }}
                            whileInView={{
                                opacity: 1,
                                transition: {
                                    duration: 0.8,
                                    delay: 0.2,
                                    ease: "easeInOut",
                                },
                            }}
                            viewport={{ once: true }}
                            className={cn(
                                "inline-flex mb-[56px] px-[24px] py-[18px] shadow-[6px_8px_0px_0px_#000] rounded-2xl rotate-[4deg] text-4xl sm:text-7xl mt-0 mx-0 leading-[64.8px] tracking-[-0.52px] bg-dominant-color text-white",
                                sourceSerif4.className,
                            )}
                        >
                            Why Choose Us?
                        </motion.h3> */}
                        <motion.h2
                            initial={{
                                opacity: 0,
                            }}
                            whileInView={{
                                opacity: 1,
                                transition: {
                                    duration: 0.8,
                                    ease: "easeInOut",
                                },
                            }}
                            viewport={{ once: true }}
                            className="mb-12 sm:mb-[96px] text-black bg-white text-6xl sm:text-[121.6px] mt-0 mx-0 leading-[70px] sm:leading-[103.36px] tracking-[-0.6px]"
                        >
                            Prints That Impress
                        </motion.h2>
                        <motion.p
                            initial={{
                                opacity: 0,
                            }}
                            whileInView={{
                                opacity: 1,
                                transition: {
                                    duration: 0.8,
                                    ease: "easeInOut",
                                },
                            }}
                            viewport={{ once: true }}
                            className="inline-flex w-full lg:w-1/2 mb-[64px] text-black bg-white text-3xl leading-[42px] tracking-[-0.8px]"
                        >
                            We bring your ideas to life with stunning prints
                            that demand attention and leave a lasting
                            impression.
                        </motion.p>
                    </div>

                    <Tabs
                        className={cn(
                            "flex justify-between flex-col lg:flex-row gap-5 h-full w-full",
                            sourceSerif4.className,
                        )}
                        defaultValue={tabs?.[0].title}
                    >
                        <TabsList className="bg-transparent text-base leading-[24px] hidden sm:grid grid-rows-6 grid-cols-1 gap-6 w-full lg:w-1/3 h-full  px-0 pr-3">
                            {tabs?.map((tab, idx) => (
                                <TabsTrigger
                                    value={tab?.title}
                                    key={idx}
                                    className="data-[state=active]:bg-dominant-color data-[state=active]:text-white bg-white text-charcoal-black data-[state=active]:shadow-[6px_8px_0px_0px_#000] text-base text-left leading-[24px] px-[40px] py-[24px] rounded-2xl text-[20px] tracking-[-0.2px] select-none"
                                >
                                    {tab?.title}
                                </TabsTrigger>
                            ))}
                        </TabsList>

                        {tabs?.map((tab, idx) => (
                            <TabsContent
                                key={idx}
                                value={tab?.title}
                                className={cn(
                                    "flex-auto bg-[#E8CCD2] text-charcoal-black pl-[32px] sm:pl-[142px] pr-[32px] py-[52px] rounded-3xl",
                                    sourceSerif4.className,
                                )}
                            >
                                <motion.div
                                    initial={{
                                        opacity: 0,
                                    }}
                                    whileInView={{
                                        opacity: 1,
                                        transition: {
                                            duration: 0.6,
                                            ease: "easeInOut",
                                        },
                                    }}
                                    viewport={{ once: true }}
                                    className="mb-12 bg-[#e8ccd2] rounded-2xl"
                                >
                                    <img
                                        src={tab.imgSrc}
                                        className="h-[390px] w-full object-cover bg-[#e8ccd2] rounded-2xl shadow-[6px_8px_0px_0px_rgb(0,0,0)]"
                                    />
                                </motion.div>
                                <motion.p
                                    initial={{
                                        opacity: 0,
                                    }}
                                    whileInView={{
                                        opacity: 1,
                                        transition: {
                                            duration: 0.6,
                                            ease: "easeInOut",
                                        },
                                    }}
                                    viewport={{ once: true }}
                                    className="inline-flex text-black text-[20px] leading-[30px] tracking-[-0.2px]"
                                >
                                    {tab?.text}
                                </motion.p>
                            </TabsContent>
                        ))}
                    </Tabs>
                </div>
            </div>
        </section>
    );
}
