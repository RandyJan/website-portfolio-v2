import { mkdir, writeFile } from "fs/promises"
import path from "path"

import { NextResponse } from "next/server"

function sanitizeSegment(value: string) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
}

function toPublicRelativePath(value: string) {
  const normalized = value.replace(/\\/g, "/").trim()

  if (!normalized) {
    return ""
  }

  return normalized.startsWith("/") ? normalized : `/${normalized}`
}

export async function POST(request: Request) {
  try {
    const formData = await request.formData()
    const files = formData.getAll("files").filter((item): item is File => item instanceof File)
    const bucket = formData.get("bucket")
    const rawProjectName = `${formData.get("projectName") ?? ""}`.trim()
    const rawImagesPath = `${formData.get("imagesPath") ?? ""}`.trim()
    const existingCount = Number(formData.get("existingCount")) || 0

    if (bucket !== "web" && bucket !== "mobile") {
      return NextResponse.json({ error: "Invalid image bucket." }, { status: 400 })
    }

    if (files.length === 0) {
      return NextResponse.json({ error: "No files uploaded." }, { status: 400 })
    }

    const normalizedImagesPath = toPublicRelativePath(rawImagesPath)
    const baseRelativePath = normalizedImagesPath.startsWith("/images/")
      ? normalizedImagesPath
      : `/images/projects/${sanitizeSegment(rawProjectName) || "project"}`

    const targetDirectory = path.join(
      process.cwd(),
      "public",
      ...baseRelativePath.replace(/^\/+/, "").split("/"),
      bucket
    )

    await mkdir(targetDirectory, { recursive: true })

    const uploadedPaths: string[] = []

    for (let index = 0; index < files.length; index++) {
      const file = files[index]
      const buffer = Buffer.from(await file.arrayBuffer())
      const extension = path.extname(file.name) || ".png"
      const fileName = `${existingCount + index + 1}${extension.toLowerCase()}`
      const targetPath = path.join(targetDirectory, fileName)
      const relativePath = `${baseRelativePath}/${bucket}/${fileName}`

      await writeFile(targetPath, buffer)
      uploadedPaths.push(relativePath)
    }

    return NextResponse.json({
      imagesPath: baseRelativePath,
      bucket,
      paths: uploadedPaths,
    })
  } catch (error) {
    console.error("Project image upload failed:", error)
    return NextResponse.json(
      { error: "Unable to upload project images." },
      { status: 500 }
    )
  }
}
