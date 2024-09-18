import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const image = formData.get('image') as Blob | null;

    if (!image) {
      return NextResponse.json({ error: 'No image provided' }, { status: 400 });
    }

    // Here you would typically send the image to an AI service for recognition
    // For this example, we'll just return a mock result
    const recognitionResult = {
      animalName: 'Siberian Tiger',
      confidence: 0.95,
      description: 'The Siberian tiger is the largest living cat species and a member of the Panthera genus. It is the national animal of Russia and is classified as Endangered by the IUCN.',
      isDangerous: true
    };

    return NextResponse.json(recognitionResult);
  } catch (error) {
    console.error('Error during recognition:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
