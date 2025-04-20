import { put } from "@vercel/blob"
import { nanoid } from "nanoid"

export async function uploadAudioFile(file: File) {
  try {
    const filename = `${nanoid()}-${file.name}`
    const blob = await put(filename, file, {
      access: "public",
      contentType: file.type,
    })

    return {
      url: blob.url,
      filename: blob.pathname,
      // size property removed as it does not exist on PutBlobResult
      success: true,
    }
  } catch (error) {
    console.error("Error uploading file:", error)
    return {
      url: null,
      filename: null,
      size: 0,
      success: false,
      error,
    }
  }
}
