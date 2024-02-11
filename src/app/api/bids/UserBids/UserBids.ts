"use server";

import { db } from "@/lib/db";

export async function GetUserBids(username: string) {
  try {
    return await db.auctionBid.findMany({
      where: { user: { username: username } },
      orderBy: { createdAt: "desc" },
    });
  } catch (error) {
    console.error("Error creating lot: ", error);
    throw error;
  }
}
