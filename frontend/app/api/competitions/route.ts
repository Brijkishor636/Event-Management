import { NextResponse } from "next/server";

export async function GET() {
  const url = process.env.JOBS_URL!;
  const apiKey = process.env.JOBS_KEY!;
  const apiHost = process.env.JOBS_HOST!;

  const response = await fetch(url, {
    headers: {
      "X-RapidAPI-Key": apiKey,
      "X-RapidAPI-Host": apiHost,
    },
  });

  const data = await response.json();
  return NextResponse.json(data);
}