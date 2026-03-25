import { NextRequest, NextResponse } from "next/server";
import { writeFile } from "fs/promises";
import { join } from "path";
import { verifySession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function POST(request: NextRequest) {
  try {
    const isAuthenticated = await verifySession();
    if (!isAuthenticated) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const formData = await request.formData();
    const file = formData.get("file") as File;
    const type = formData.get("type") as string;

    if (!file) {
      return NextResponse.json(
        { error: "No file provided" },
        { status: 400 }
      );
    }

    // Validate file type
    const validTypes = ["image/x-icon", "image/png", "image/svg+xml"];
    if (!validTypes.includes(file.type)) {
      return NextResponse.json(
        { error: "Invalid file type. Only .ico, .png, and .svg files are allowed" },
        { status: 400 }
      );
    }

    // Validate file size (max 1MB)
    if (file.size > 1024 * 1024) {
      return NextResponse.json(
        { error: "File too large. Maximum size is 1MB" },
        { status: 400 }
      );
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    let filename: string;
    let filePath: string;

    if (type === "favicon") {
      // Determine extension based on file type
      let ext = ".ico";
      if (file.type === "image/png") ext = ".png";
      if (file.type === "image/svg+xml") ext = ".svg";
      
      filename = `favicon${ext}`;
      filePath = join(process.cwd(), "public", filename);
      
      // Save to SiteConfig
      await prisma.siteConfig.upsert({
        where: { key: "favicon" },
        update: { value: `/${filename}` },
        create: { key: "favicon", value: `/${filename}` },
      });
    } else {
      // For other uploads (project images, etc.)
      const timestamp = Date.now();
      const ext = file.name.split(".").pop() || "png";
      filename = `${timestamp}-${Math.random().toString(36).substring(7)}.${ext}`;
      filePath = join(process.cwd(), "public", "uploads", filename);
    }

    await writeFile(filePath, buffer);

    return NextResponse.json({
      success: true,
      url: type === "favicon" ? `/${filename}` : `/uploads/${filename}`,
    });
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json(
      { error: "Failed to upload file" },
      { status: 500 }
    );
  }
}
