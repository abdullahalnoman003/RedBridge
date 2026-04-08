import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { FaQuoteLeft } from 'react-icons/fa';
import { LuChevronLeft, LuChevronRight, LuMapPin } from 'react-icons/lu';
import { A11y, Autoplay, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/pagination';

const testimonials = [
    {
        name: 'Sadia Rahman',
        location: 'Dhaka',
        text: 'When we needed O- blood urgently, RedBridge helped us find nearby donors quickly.',
        image: '/image/blood_donation2.png',
        fallbackImage: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=700&q=80'
    },
    {
        name: 'Rafiul Islam',
        location: 'Chattogram',
        text: 'The donor process was clear, and I could respond to a request on the same day.',
        image: '/image/Blood_donaation.png',
        fallbackImage: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=700&q=80',
    },
    {
        name: 'Nabila Sultana',
        location: 'Rajshahi',
        text: 'Location filters and direct contact made blood coordination much easier for our family.',
        image: '/image/blood_donation3.png',
        fallbackImage: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=700&q=80',
    },
];

const Slider = () => {
    const swiperRef = useRef(null);

    const nextSlide = () => swiperRef.current?.slideNext();
    const prevSlide = () => swiperRef.current?.slidePrev();

    return (
        <div className='bg-linear-to-b from-red-900 to-white via-white'>
            <section className="mx-auto max-w-7xl px-4 py-14">
                <div className="mb-10 text-center">
                    <h2 className="text-3xl font-black text-white md:text-4xl">People Behind Every Match</h2>
                    <p className="mx-auto mt-3 max-w-2xl text-white">Real stories from donors and families who coordinated faster through RedBridge.</p>
                </div>

                <div className="relative rounded-3xl border border-base-300 bg-base-100 p-4 shadow-lg sm:p-6">
                    <div className="absolute -top-4 right-4 z-10 flex items-center gap-2">
                        <button className="btn buttonUI btn-circle btn-sm" onClick={prevSlide} aria-label="Previous story">
                            <LuChevronLeft />
                        </button>
                        <button className="btn buttonUI btn-circle btn-sm" onClick={nextSlide} aria-label="Next story">
                            <LuChevronRight />
                        </button>
                    </div>

                    <Swiper
                        modules={[Autoplay, Pagination, A11y]}
                        onSwiper={(swiper) => {
                            swiperRef.current = swiper;
                        }}
                        spaceBetween={24}
                        slidesPerView={1}
                        loop
                        speed={600}
                        allowTouchMove={false}
                        simulateTouch={false}
                        autoplay={{
                            delay: 5000,
                            disableOnInteraction: false,
                            pauseOnMouseEnter: true,
                        }}
                        pagination={{ clickable: true }}
                        a11y={{ enabled: true }}
                        className="pb-10"
                    >
                        {testimonials.map((item) => (
                            <SwiperSlide key={`${item.name}-${item.location}`}>
                                <article className="grid items-stretch gap-4 md:grid-cols-2 md:gap-6">
                                    <div className="overflow-hidden rounded-2xl border border-base-300">
                                        <img
                                            src={item.image}
                                            alt={item.name}
                                            className="h-72 w-full object-cover"
                                            onError={(event) => {
                                                event.currentTarget.onerror = null;
                                                event.currentTarget.src = item.fallbackImage;
                                            }}
                                        />
                                    </div>

                                    <div className="flex flex-col justify-between rounded-2xl border border-base-300 bg-base-200/40 p-6">
                                        <div>
                                            <div className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-primary text-white shadow-lg">
                                                <FaQuoteLeft className="text-lg" />
                                            </div>
                                            <p className="mt-4 text-lg italic leading-relaxed text-base-content/80">"{item.text}"</p>
                                        </div>

                                        <div className="mt-6">
                                            <p className="font-semibold text-primary">{item.name}</p>
                                            <p className="mt-1 inline-flex items-center gap-1 text-sm text-base-content/65">
                                                <LuMapPin />
                                                {item.location}
                                            </p>
                                        </div>
                                    </div>
                                </article>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>

                <div className="mt-6 rounded-2xl border border-primary/20 bg-primary/5 p-5">
                    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                        <div>
                            <h3 className="text-lg font-bold text-base-content">Need blood now or want to help?</h3>
                            <p className="mt-1 text-sm text-base-content/70">Search verified donors instantly or register as a donor and keep your profile active.</p>
                        </div>
                        <div className="flex gap-3">
                            <Link to="/find-donors" className="btn btn-primary btn-sm">Find Donors</Link>
                            <Link to="/donate" className="btn btn-outline btn-sm">Become a Donor</Link>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Slider;