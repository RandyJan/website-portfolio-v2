import { mkdir, writeFile } from "fs/promises"
import path from "path"

import { NextResponse } from "next/server"

function sanitizeBaseName(fileName: string) {
  return fileName
    .replace(/\.[^/.]+$/, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
}

export async function POST(request: Request) {
  try {
    const formData = await request.formData()
    const file = formData.get("file")

    if (!(file instanceof File)) {
      return NextResponse.json({ error: "No file uploaded." }, { status: 400 })
    }

    const buffer = Buffer.from(await file.arrayBuffer())
    const extension = path.extname(file.name) || ".png"
    const baseName = sanitizeBaseName(file.name) || "certificate"
    const fileName = `${baseName}-${Date.now()}${extension}`
    const relativePath = `/images/certificates/${fileName}`
    const targetDirectory = path.join(
      process.cwd(),
      "public",
      "images",
      "certificates"
    )
    const targetPath = path.join(targetDirectory, fileName)

    await mkdir(targetDirectory, { recursive: true })
    await writeFile(targetPath, buffer)

    return NextResponse.json({ path: relativePath })
  } catch (error) {
    console.error("Certificate upload failed:", error)
    return NextResponse.json(
      { error: "Unable to upload certificate image." },
      { status: 500 }
    )
  }
}
