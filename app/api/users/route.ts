import { NextResponse } from "next/server";
import { mockUsers } from "../mock/users";
import { auth } from "@/lib/auth";

export async function GET() {
  try {
    // const session = await auth();

    // if (session?.user?.role !== "ADMIN") {
    //   return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    // }

    return NextResponse.json(mockUsers);
  } catch (error) {
    return NextResponse.json(
      { message: "Error fetching users" },
      { status: 500 }
    );
  }
}
