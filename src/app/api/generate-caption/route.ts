import { NextResponse } from 'next/server';
import OpenAI from 'openai';

if (!process.env.OPENAI_API_KEY) {
  throw new Error('Missing OPENAI_API_KEY environment variable');
}

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    console.log('Received request body:', body);

    const { genre, description, tone, length } = body;

    if (!genre || !description || !tone || !length) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const prompt = `Buatlah ${length} caption social media ${genre} dengan nada ${tone}. 
    Deskripsi Konten: ${description}
    
    Persyaratan:
    - Buatlah konten yang menarik dan autentik
    - Sertakan tagar yang relevan jika sesuai
    - Sesuaikan dengan nada dan panjang yang ditentukan
    - Jadilah kreatif dan unik
    - Pertimbangkan praktik terbaik khusus platform`;

    console.log('Sending prompt to OpenAI:', prompt);

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: "Anda adalah pembuat konten media sosial profesional yang mengkhususkan diri dalam menulis teks caption yang menarik.."
        },
        {
          role: "user",
          content: prompt
        }
      ],
      temperature: 0.7,
      max_tokens: 250,
    });

    const caption = completion.choices[0]?.message?.content;

    if (!caption) {
      throw new Error('No caption generated from OpenAI');
    }

    console.log('Generated caption:', caption);

    return NextResponse.json({ caption });
  } catch (error) {
    console.error('Error in generate-caption route:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to generate caption' },
      { status: 500 }
    );
  }
} 