

import { Carousel } from 'flowbite-react';
function Sliders() {
    const images = [
        '/images/marquee01.jpg',
        '/images/marquee02.jpg',
        '/images/marquee03.jpg',
        '/images/marquee04.jpg',
        '/images/marquee05.jpg',
    ];
    return (

        <div className=" w-full h-[15rem] sm:h-64 xl:h-80 2xl:h-96  pt-[6.2rem] sm:pt-20  md:pt-15 lg:pt-25 xl:pt-20">
            {/* Carousel wrapper */}
           
                {/* Item 1 */}
                <div className="h-56 sm:h-64 xl:h-80 2xl:h-96">
                    <Carousel slideInterval={2000}>
                    {images.map((image, index) => {
                    return (
                        
                            <img className="w-full h-full" key={index} src={image}  alt="..." />
                       
                    )
                })}
                    </Carousel>
                </div>
        </div>
    );
}
export default Sliders





