import { PortfolioStore } from "@/app/segment/portfolio/store";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import { Keyboard, Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';
import { useEffect, useState } from "react";
import { DynamicSystemLogo } from "@/app/segment/portfolio/component/DynamicSystemLogo";
import slidesData from '@/app/segment/portfolio/values/project_values.json';
import { HashLoader } from "react-spinners";
import { ProjectType } from "@/app/segment/portfolio/type";

export default function Index() {
    const { project_dialog, set_project_dialog, selected_project, set_selected_project, selected_project_index, set_selected_images, selected_images, set_is_loading, is_loading } = PortfolioStore();
    const [systemLogo, setSystemLogo] = useState(DynamicSystemLogo("#000000"));
    const [swiper, setSwiper] = useState(null);
    const projects: ProjectType[] = slidesData;
    const getImageDimensions = async (blob: any) => {
        return new Promise((resolve, reject) => {
            const img = new Image();
            img.onload = () => {
                resolve({ width: img.width, height: img.height });
            };
            img.onerror = reject;
            img.src = URL.createObjectURL(blob);
        });
    };

    const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
    const fetchImages = async (SelectedProject: ProjectType) => {
        try {
            set_is_loading(true); // Set loading state to true before starting the fetch operation
            if (SelectedProject.name !== '') {
                const imagesPathWeb = `${SelectedProject.images_path}/web`;
                const imagesPathMobile = `${SelectedProject.images_path}/mobile`;

                const imagePromisesWeb = [];
                for (let index = 0; index < SelectedProject.images_num_web; index++) {
                    imagePromisesWeb.push(fetchImage(`${imagesPathWeb}/${index + 1}.png`, 'web', index + 1));
                }

                const imagePromisesMobile = [];
                for (let index = 0; index < SelectedProject.images_num_mobile!; index++) {
                    imagePromisesMobile.push(fetchImage(`${imagesPathMobile}/${index + 1}.png`, 'mobile', index + 1));
                }

                try {
                    const imagesWebWithDimensions = await Promise.all(imagePromisesWeb);
                    const imagesMobileWithDimensions = await Promise.all(imagePromisesMobile);

                    const imagesWebObjects = imagesWebWithDimensions.map(({ blob, dimensions }, index) => ({
                        src: blob,
                        platform: 'img_slide_web',
                        folder: 'web',
                        width: (dimensions as any).width,
                        height: (dimensions as any).height,
                        index: index + 1
                    }));

                    const imagesMobileObjects = imagesMobileWithDimensions.map(({ blob, dimensions }, index) => ({
                        src: blob,
                        platform: 'img_slide_mobile',
                        folder: 'mobile',
                        width: (dimensions as any).width,
                        height: (dimensions as any).height,
                        index: index + 1
                    }));

                    let combinedImages = [];
                    if (SelectedProject.isWebFirst) {
                        combinedImages = [...imagesWebObjects, ...imagesMobileObjects];
                    } else {
                        combinedImages = [...imagesMobileObjects, ...imagesWebObjects];
                    }
                    set_selected_project(projects[selected_project_index])
                    set_selected_images(combinedImages); // Update selected images
                } catch (error) {
                    console.error(error);
                }
            }
        } catch (error) {
            console.error('Error fetching images:', error);
        } finally {
            set_is_loading(false); // Ensure loading state is set to false after the fetch operation completes (success or failure)
        }
    };

    const fetchImage = async (imageUrl: any, platform: any, index: any) => {
        try {
            const response = await fetch(imageUrl);
            if (!response.ok) {
                throw new Error(`Failed to fetch ${platform} image ${index}`);
            }
            const blob = await response.blob();
            const dimensions = await getImageDimensions(blob);
            return { blob, dimensions };
        } catch (error) {
            console.error(error);
            return { blob: null, dimensions: null };  // In case of failure, return null values
        }
    };


    useEffect(() => {
        console.log(is_loading)
    }, [is_loading])

    // useEffect(() => {
    //     fetchImages();
    // }, [selected_project]);

    useEffect(() => {
        console.log(selected_project_index)
        fetchImages(projects[selected_project_index]);
    }, [selected_project_index])

    return (
        <>
            {
                is_loading ? (
                    <div className="w-full h-full flex flex-col justify-center items-center">
                        <HashLoader color="black" loading={true} size={50} />
                    </div>
                ) : (
                    <div>
                        <Swiper
                            // onSwiper={setSwiper}
                            className="w-full"
                            pagination={{
                                dynamicBullets: true,
                                clickable: true
                            }}
                            keyboard={{
                                enabled: true,
                            }}
                            centeredSlides={true}
                            modules={[Keyboard, Navigation, Pagination]}
                            navigation
                        // onSlideChange={(data) => { }}
                        // onClick={(data) => {
                        //     dispatch(setActiveIndex(data.activeIndex))
                        //     dispatch(setIsFullScreen(true))
                        // }}
                        >
                            {selected_project && (
                                (selected_project.images_num_web && selected_project.images_num_web > 0) ||
                                (selected_project.images_num_mobile && selected_project.images_num_mobile > 0)
                            ) ? (
                                <>
                                    {selected_images.length > 0 && selected_images.map((item: any, index: number) => (
                                        <SwiperSlide key={`web${index}`}>
                                            {item.platform === 'img_slide_web' ? (
                                                <img
                                                    className="img_slide_web max-w-full max-h-[70vh] object-contain mx-auto"
                                                    src={`${selected_project.images_path}/${item.folder}/${item.index}.png`}
                                                    alt="app"
                                                />
                                            ) : (
                                                <img
                                                    className="img_slide_mobile max-w-full max-h-[70vh] object-contain mx-auto"
                                                    src={`${selected_project.images_path}/${item.folder}/${item.index}.png`}
                                                    alt="app"
                                                />
                                            )}

                                        </SwiperSlide>
                                    ))}
                                </>
                            ) : (
                                <SwiperSlide>
                                    <div className="flex flex-col items-center text-center ">
                                        <img className='imgSlide2 pb-9' src={systemLogo} alt='app' />
                                    </div>
                                </SwiperSlide>
                            )}

                        </Swiper>
                    </div>)
            }
        </>

    )
}