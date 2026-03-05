import { useState, useEffect, useCallback } from "react";
import { LandmarkData, landmarks } from "@/data/landmarks";

const STORAGE_KEY = "wanderlust-collection";

export interface CollectionState {
  collected: string[]; // landmark ids
  history: { id: string; timestamp: number }[];
}

function loadCollection(): CollectionState {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw);
  } catch {}
  return { collected: [], history: [] };
}

function saveCollection(state: CollectionState) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

export function useCollection() {
  const [state, setState] = useState<CollectionState>(loadCollection);

  useEffect(() => {
    saveCollection(state);
  }, [state]);

  const addCard = useCallback((landmark: LandmarkData) => {
    setState((prev) => {
      const newHistory = [...prev.history, { id: landmark.id, timestamp: Date.now() }];
      const newCollected = prev.collected.includes(landmark.id)
        ? prev.collected
        : [...prev.collected, landmark.id];
      return { collected: newCollected, history: newHistory };
    });
  }, []);

  const isCollected = useCallback(
    (id: string) => state.collected.includes(id),
    [state.collected]
  );

  const totalCards = landmarks.length;
  const collectedCount = state.collected.length;
  const citiesExplored = new Set(
    state.collected.map((id) => landmarks.find((l) => l.id === id)?.city).filter(Boolean)
  ).size;
  const rareCardsFound = state.collected.filter((id) => {
    const l = landmarks.find((lm) => lm.id === id);
    return l && l.rarity >= 4;
  }).length;
  const totalPulls = state.history.length;

  return {
    collected: state.collected,
    history: state.history,
    addCard,
    isCollected,
    totalCards,
    collectedCount,
    citiesExplored,
    rareCardsFound,
    totalPulls,
  };
}
