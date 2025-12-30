"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { connectRepository } from "../actions";
import { toast } from "sonner";
import { error } from "console";

export const useConnectRepository = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      owner,
      repo,
      githubId,
    }: {
      owner: string;
      repo: string;
      githubId: number;
    }) => {
      return await connectRepository(owner, repo, githubId);
    },

    onSuccess: () => {
      toast.success("Repository connected successfully"),
        queryClient.invalidateQueries({ queryKey: ["repositories"] });
    },
    onError: () => {
      toast.error("Failed to connect repository");
      console.error(error);
    },
  });
};
