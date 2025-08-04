"use server";
import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../lib/prisma";
export async function DELETE(
  req: NextRequest,
  params: { params: Promise<{ id: string }> }
) {


  const id = parseInt((await params.params).id);

  try {
    await prisma.item.delete({
      where: { id },
    });
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to delete item" },
      { status: 500 }
    );
  }
}
