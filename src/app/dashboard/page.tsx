"use client";

import { Lobby, columns } from "./columns";
import { DataTable } from "./data-table";
import { Button } from "@/components/ui/button";
import Link from "next/link";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Input } from "@/components/ui/input";
import { useTheme } from "next-themes";
import { useSession, signOut } from "next-auth/react";
import { useEffect, useState } from "react";

import React from "react";
import MySpinner from "@/components/ui/my-spinner";

export default function DashboardPage() {
  const { theme, setTheme } = useTheme();
  const { data: session } = useSession();
  const userEmail = session?.user?.email;
  const [historyData, setHistoryData] = useState([]);
  const [loading, setLoading] = useState(true);

  interface LobbyData {
    player_id: string;
    lobby_id: string;
    lobby_metadata: string;
  }

  const getGamesHistory = async (idToken: string) => {
    try {
      const response = await fetch(
        `http://localhost:8009/api/v1/lobby_history`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${idToken}`,
          },
        }
      );

      const rawData = await response.json();
      const combinedData = rawData.map((item: LobbyData) => {
        const lobby_id = item.lobby_id;
        const { admin_id } = JSON.parse(
          item.lobby_metadata
            .replace(/'/g, '"')
            .replace(/None/g, "null")
            .replace(/False/g, "false")
            .replace(/True/g, "true")
        );
        const userStories = JSON.parse(
          item.lobby_metadata
            .replace(/'/g, '"')
            .replace(/None/g, "null")
            .replace(/False/g, "false")
            .replace(/True/g, "true")
        ).user_stories;

        const formattedUserStories = userStories.map((story: any) => ({
          story_name: story.story_name,
          tickets: story.tickets.map((ticket: any) => ({
            ticket_name: ticket.ticket_name,
          })),
          points: story.story_points,
        }));
        return {
          lobby_id: lobby_id,
          admin_id: admin_id,
          user_stories: formattedUserStories,
        };
      });

      console.log("Combined data:", combinedData);
      return combinedData;
    } catch (error) {
      console.error("Error:", error);
      return [];
    }
  };

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  useEffect(() => {
    const fetchHistoryData = async () => {
      try {
        if (session?.id_token) {
          setLoading(true); 
          const data = await getGamesHistory(session.id_token); 
          setHistoryData(data);
          setLoading(false); 
          console.log(data); 
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false); 
      }
    };

    fetchHistoryData();
  }, [session?.id_token]);

  return (
    <div className="flex-col w-full h-screen">
      <div className="flex h-5/6 w-full">
        <div className="ml-6 w-full flex flex-col gap-8 pt-6 pb-20">
          <h1 className="text-4xl font-bold">Dashboard</h1>
          <div className="container mx-auto py-4">
            {loading ? (
              <div className="flex items-center justify-center h-80">
                <MySpinner />
              </div>
            ) : (
              <DataTable columns={columns} data={historyData} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
