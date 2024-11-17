// app/api/data/features/route.js
import { NextRequest, NextResponse } from "next/server";
import { querySchema } from "@/schemas/schemas";
import { z } from "zod";
import { getFilteredData } from "../utils";

export async function GET(request: NextRequest) {
  const url = new URL(request.url);

  try {
    // Validate query parameters
    const query = querySchema.parse(Object.fromEntries(url.searchParams));

    // Fetch data based on validated query
    const data = await getFilteredData(query);

    return NextResponse.json(data);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response(JSON.stringify({ error: error.errors }), {
        status: 400,
      });
    }
    console.error("Error fetching features data:", error);
    return new Response(JSON.stringify({ error: "Internal server error" }), {
      status: 500,
    });
  }
}
