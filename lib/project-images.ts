import { ProjectType } from "@/app/segment/portfolio/type"

export type ProjectImageBucket = "web" | "mobile"

function getUploadedImages(project: ProjectType, bucket: ProjectImageBucket) {
  return bucket === "web" ? project.web_images ?? [] : project.mobile_images ?? []
}

function getImageCount(project: ProjectType, bucket: ProjectImageBucket) {
  return bucket === "web"
    ? Number(project.images_num_web) || 0
    : Number(project.images_num_mobile) || 0
}

export function getProjectImagePaths(
  project: ProjectType,
  bucket: ProjectImageBucket
) {
  const uploadedImages = getUploadedImages(project, bucket)

  if (uploadedImages.length > 0) {
    return uploadedImages
  }

  if (!project.images_path) {
    return []
  }

  return Array.from({ length: getImageCount(project, bucket) }, (_, index) => {
    return `${project.images_path}/${bucket}/${index + 1}.png`
  })
}

export function getProjectPreviewImage(project: ProjectType) {
  const preferredBuckets: ProjectImageBucket[] = project.isWebFirst
    ? ["web", "mobile"]
    : ["mobile", "web"]

  for (const bucket of preferredBuckets) {
    const imagePath = getProjectImagePaths(project, bucket)[0]
    if (imagePath) {
      return imagePath
    }
  }

  return null
}

export function hasProjectImages(project: ProjectType) {
  return (
    getProjectImagePaths(project, "web").length > 0 ||
    getProjectImagePaths(project, "mobile").length > 0
  )
}
