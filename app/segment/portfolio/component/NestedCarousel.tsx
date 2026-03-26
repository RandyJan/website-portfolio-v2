import { Swiper, SwiperSlide } from "swiper/react"

import { PortfolioStore } from "@/app/segment/portfolio/store"

import "swiper/css"
import "swiper/css/navigation"
import "swiper/css/pagination"
import { useEffect, useState } from "react"
import { HashLoader } from "react-spinners"
import { Keyboard, Navigation, Pagination } from "swiper/modules"

import { DynamicSystemLogo } from "@/app/segment/portfolio/component/DynamicSystemLogo"
import { ProjectType } from "@/app/segment/portfolio/type"
import { useProjectsContent } from "@/lib/content-store"
import { getProjectImagePaths, hasProjectImages } from "@/lib/project-images"

export default function Index() {
  const {
    selected_project,
    set_selected_project,
    selected_project_index,
    set_selected_images,
    selected_images,
    set_is_loading,
    is_loading,
  } = PortfolioStore()
  const [systemLogo] = useState(DynamicSystemLogo("#000000"))
  const [previewImage, setPreviewImage] = useState<string | null>(null)
  const { data: projects } = useProjectsContent()
  const getImageDimensions = async (imageUrl: string) => {
    return new Promise((resolve, reject) => {
      const img = new Image()
      img.onload = () => {
        resolve({ width: img.width, height: img.height })
      }
      img.onerror = reject
      img.src = imageUrl
    })
  }

  const fetchImages = async (SelectedProject: ProjectType) => {
    try {
      set_is_loading(true)
      if (SelectedProject.name !== "") {
        const imagePathsWeb = getProjectImagePaths(SelectedProject, "web")
        const imagePathsMobile = getProjectImagePaths(SelectedProject, "mobile")

        try {
          const imagesWebWithDimensions = await Promise.all(
            imagePathsWeb.map((imagePath) => fetchImage(imagePath, "web"))
          )
          const imagesMobileWithDimensions = await Promise.all(
            imagePathsMobile.map((imagePath) => fetchImage(imagePath, "mobile"))
          )

          const imagesWebObjects = imagesWebWithDimensions.map(
            ({ src, dimensions }, index) => ({
              src,
              platform: "img_slide_web",
              folder: "web",
              width: (dimensions as any).width,
              height: (dimensions as any).height,
              index: index + 1,
            })
          )

          const imagesMobileObjects = imagesMobileWithDimensions.map(
            ({ src, dimensions }, index) => ({
              src,
              platform: "img_slide_mobile",
              folder: "mobile",
              width: (dimensions as any).width,
              height: (dimensions as any).height,
              index: index + 1,
            })
          )

          let combinedImages = []
          if (SelectedProject.isWebFirst) {
            combinedImages = [...imagesWebObjects, ...imagesMobileObjects]
          } else {
            combinedImages = [...imagesMobileObjects, ...imagesWebObjects]
          }
          set_selected_project(projects[selected_project_index])
          set_selected_images(combinedImages)
        } catch (error) {
          console.error(error)
        }
      }
    } catch (error) {
      console.error("Error fetching images:", error)
    } finally {
      set_is_loading(false)
    }
  }

  const fetchImage = async (imageUrl: string, platform: string) => {
    try {
      const dimensions = await getImageDimensions(imageUrl)
      return { src: imageUrl, dimensions }
    } catch (error) {
      console.error(error)
      return { src: imageUrl, dimensions: null }
    }
  }

  useEffect(() => {
    if (projects[selected_project_index]) {
      fetchImages(projects[selected_project_index])
    }
  }, [projects, selected_project_index])

  return (
    <>
      {is_loading ? (
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
              clickable: true,
            }}
            keyboard={{
              enabled: true,
            }}
            centeredSlides={true}
            modules={[Keyboard, Navigation, Pagination]}
            navigation
          >
            {selected_project && hasProjectImages(selected_project) ? (
              <>
                {selected_images.length > 0 &&
                  selected_images.map((item: any, index: number) => (
                    <SwiperSlide key={`web${index}`}>
                      {item.platform === "img_slide_web" ? (
                        <img
                          className="img_slide_web max-w-full max-h-[70vh] object-contain mx-auto cursor-pointer"
                          src={item.src}
                          alt="app"
                          onClick={() => setPreviewImage(item.src)}
                        />
                      ) : (
                        <img
                          className="img_slide_mobile max-w-full max-h-[70vh] object-contain mx-auto cursor-pointer"
                          src={item.src}
                          alt="app"
                          onClick={() => setPreviewImage(item.src)}
                        />
                      )}
                    </SwiperSlide>
                  ))}
              </>
            ) : (
              <SwiperSlide>
                <div className="flex flex-col items-center text-center ">
                  <img className="imgSlide2 pb-9" src={systemLogo} alt="app" />
                </div>
              </SwiperSlide>
            )}
          </Swiper>
          {previewImage && (
            <div
              className="fixed inset-0 bg-black bg-opacity-80 flex justify-center items-center z-50"
              onClick={() => setPreviewImage(null)}
            >
              <img
                src={previewImage}
                className="max-w-[95%] max-h-[95%] rounded-lg shadow-lg object-contain"
              />
            </div>
          )}
        </div>
      )}
    </>
  )
}
