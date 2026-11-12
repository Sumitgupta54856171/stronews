"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { AUTH_TOKEN_EVENT, clearAuthToken, getAuthToken } from "@/lib/auth-client";
import { getSavedStories, removeSavedStory, saveStory } from "@/lib/api";
import { useToast } from "@/components/ui/toast-provider";

const SAVED_STORIES_QUERY_KEY = ["saved-stories"] as const;

export function useSavedStories() {
  const router = useRouter();
  const toast = useToast();
  const queryClient = useQueryClient();
  const [hasToken, setHasToken] = useState(() => Boolean(getAuthToken()));

  useEffect(() => {
    function syncToken() {
      setHasToken(Boolean(getAuthToken()));
    }

    window.addEventListener(AUTH_TOKEN_EVENT, syncToken);
    return () => window.removeEventListener(AUTH_TOKEN_EVENT, syncToken);
  }, []);

  useEffect(() => {
    if (!hasToken) queryClient.removeQueries({ queryKey: SAVED_STORIES_QUERY_KEY });
  }, [hasToken, queryClient]);

  const { data, isPending } = useQuery({
    queryKey: SAVED_STORIES_QUERY_KEY,
    queryFn: getSavedStories,
    enabled: hasToken,
    staleTime: 30_000,
  });

  const mutation = useMutation({
    mutationFn: async ({ articleId, isSaved }: { articleId: string; isSaved: boolean }) => {
      if (isSaved) await removeSavedStory(articleId);
      else await saveStory(articleId);
    },
    onMutate: async ({ articleId, isSaved }) => {
      await queryClient.cancelQueries({ queryKey: SAVED_STORIES_QUERY_KEY });
      const previous = queryClient.getQueryData<{ savedIds: string[] }>(
        SAVED_STORIES_QUERY_KEY,
      );

      if (previous) {
        queryClient.setQueryData(SAVED_STORIES_QUERY_KEY, {
          savedIds: isSaved
            ? previous.savedIds.filter((savedId) => savedId !== articleId)
            : [...previous.savedIds, articleId],
        });
      }

      return { previous };
    },
    onError: (_error, _variables, context) => {
      if (context?.previous) {
        queryClient.setQueryData(SAVED_STORIES_QUERY_KEY, context.previous);
      }
      toast.error("Could not update your saved stories. Please try again.");
    },
    onSuccess: (_data, variables) => {
      toast.success(
        variables.isSaved
          ? "Story removed from your saved stories."
          : "Story saved to your account.",
      );
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: SAVED_STORIES_QUERY_KEY });
    },
  });

  const savedIds = data?.savedIds ?? [];

  function toggleSaved(articleId: string) {
    if (!hasToken) {
      toast.info("Sign in to save stories to your account.");
      router.push("/login?next=/saved-stories");
      return;
    }

    mutation.mutate({
      articleId,
      isSaved: savedIds.includes(articleId),
    });
  }

  return {
    hasToken,
    savedIds,
    isPending: hasToken && isPending,
    isSaving: mutation.isPending,
    isSaved: (articleId: string) => savedIds.includes(articleId),
    toggleSaved,
    signOut: () => {
      clearAuthToken();
      queryClient.removeQueries({ queryKey: SAVED_STORIES_QUERY_KEY });
    },
  };
}
