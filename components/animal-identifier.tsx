"use client"
/**
* This code was generated by v0 by Vercel.
* @see https://v0.dev/t/7zMVo0XXBlu
* Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
*/

/** Add fonts into your Next.js project:

import { Inter } from 'next/font/google'

inter({
  subsets: ['latin'],
  display: 'swap',
})

To read more about using these font, please visit the Next.js documentation:
- App Directory: https://nextjs.org/docs/app/building-your-application/optimizing/fonts
- Pages Directory: https://nextjs.org/docs/pages/building-your-application/optimizing/fonts
**/
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { useState, useRef } from "react"

interface RecognitionResult {
  animalName: string;
  confidence: number;
  description: string;
  wikipediaUrl: string;
  isDangerous: boolean;
}

export function AnimalIdentifier() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  const [recognitionResult, setRecognitionResult] = useState<RecognitionResult | null>(null)
  const [isRecognizing, setIsRecognizing] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleUpload = () => {
    fileInputRef.current?.click()
  }

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file && (file.type === "image/jpeg" || file.type === "image/png")) {
      const imageUrl = URL.createObjectURL(file)
      setSelectedImage(imageUrl)
    } else {
      alert("Please select a valid image file (jpg, jpeg, or png)")
    }
  }

  const handleRecognize = async () => {
    if (!selectedImage) {
      console.error('No image selected');
      return;
    }

    setIsRecognizing(true);
    setRecognitionResult(null);

    try {
      const formData = new FormData();
      const response = await fetch(selectedImage);
      const blob = await response.blob();
      formData.append('image', blob, 'image.jpg');

      const recognitionResponse = await fetch('http://localhost:8000/recognize-animal', {
        method: 'POST',
        body: formData,
      });

      if (!recognitionResponse.ok) {
        throw new Error('Recognition request failed');
      }

      const result = await recognitionResponse.json();
      setRecognitionResult(result);
      console.log("Recognition result:", result);
    } catch (error) {
      console.error("Error during recognition:", error);
      // Handle error, e.g., display error message to user
    } finally {
      setIsRecognizing(false);
    }
  }

  return (
    <div className="flex flex-col items-center h-screen bg-background">
      <div className="max-w-3xl w-full px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center space-y-6">
          <h1 className="text-2xl font-bold mt-8">Animal Identifier</h1>
          <p className="text-center text-muted-foreground mb-4 text-sm">
            Identify animals in the image
          </p>
          <input
            type="file"
            accept="image/jpeg,image/png"
            className="hidden"
            ref={fileInputRef}
            onChange={handleFileChange}
          />
          <Button variant="outline" size="lg" className="w-full" onClick={handleUpload}>
            <UploadIcon className="mr-2 h-5 w-5" />
            Upload Image
          </Button>
          <div className="w-full aspect-video bg-muted rounded-lg overflow-hidden flex items-center justify-center">
            {selectedImage ? (
              <img
                src={selectedImage}
                alt="Uploaded Animal"
                className="w-full h-full object-contain"
              />
            ) : (
              <div className="w-[100px] h-[100px]">
                <img
                  src="/placeholder.svg"
                  alt="Animal Preview"
                  width={100}
                  height={100}
                  className="w-full h-full object-contain"
                />
              </div>
            )}
          </div>
          <Button
            size="lg"
            className="w-full"
            onClick={handleRecognize}
            disabled={!selectedImage || isRecognizing}
          >
            {isRecognizing ? "Recognizing..." : "Recognize Animal"}
          </Button>
          {recognitionResult && (
            <div className="w-full space-y-4">
              <div className="text-2xl font-bold">{recognitionResult.animalName.toUpperCase()}</div>
              <div>
                {recognitionResult.confidence >= 0.5 && recognitionResult.confidence <= 1
                  ? `High similarity: ${recognitionResult.confidence}`
                  : `Low similarity: ${recognitionResult.confidence}`}
              </div>
              {recognitionResult.isDangerous && (
                <div className="flex items-center space-x-2">
                  <FileWarningIcon className="h-5 w-5" style={{ color: 'red' }} />
                  <span style={{ color: 'red', fontWeight: 'bold' }}>Dangerous</span>
                </div>
              )}
              <p className="text-muted-foreground">
                {recognitionResult.description}
              </p>
              <div className="mt-2">
                {recognitionResult.wikipediaUrl !== "No URL available" && (
                  <Link href={recognitionResult.wikipediaUrl} target="_blank" className="text-primary underline" prefetch={false}>
                    Learn more on Wikipedia
                  </Link>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

function FileWarningIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" />
      <path d="M12 9v4" />
      <path d="M12 17h.01" />
    </svg>
  )
}

function UploadIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <polyline points="17 8 12 3 7 8" />
      <line x1="12" x2="12" y1="3" y2="15" />
    </svg>
  )
}
