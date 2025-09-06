import { NextResponse } from "next/server";

export async function GET() {
  const url = process.env.INTERN_URL!;
  const apiKey = process.env.RAPIDAPIKEY!;
  const apiHost = process.env.RAPIDAPIHOST!;

  const response = await fetch(url, {
    headers: {
      "X-RapidAPI-Key": apiKey,
      "X-RapidAPI-Host": apiHost,
    },
  });

  const data = await response.json();
  return NextResponse.json(data);
}