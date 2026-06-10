'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { AppHeader } from './components/farm/app-header';
import { HiddenPhasesPanel } from './components/farm/hidden-phases-panel';
import { HistoryPanel } from './components/farm/history-panel';
import { NextPhasePanel } from './components/farm/next-phase-panel';
import { PhaseCard } from './components/farm/phase-card';
import { SettingsPanel } from './components/farm/settings-panel';
import {
  DEFAULT_COOLDOWN_MINUTES,
  type FarmState,
  type HistoryEntry,
  type Phase,
  initialFarmState,
  phases,
} from './lib/farm-data';
import {
  loadFarmState,
  normalizeCooldownMinutes,
  playUnlockSound,
  saveFarmState,
} from './lib/farm-utils';

export default function FarmDashboard() {
  const [state, setState] = useState<FarmState>(initialFarmState);
  const [isConfigOpen, setIsConfigOpen] = useState(false);
  const [draftCooldownMinutes, setDraftCooldownMinutes] = useState(
    DEFAULT_COOLDOWN_MINUTES,
  );
  const [now, setNow] = useState(0);
  const [isReady, setIsReady] = useState(false);
  const previousLockedIds = useRef<Set<string>>(new Set());

  useEffect(() => {
    const storedState = loadFarmState();
    setState(storedState);
    setDraftCooldownMinutes(storedState.cooldownMinutes);
    setNow(Date.now());
    setIsReady(true);

    const intervalId = window.setInterval(() => {
      setNow(Date.now());
    }, 1000);

    return () => window.clearInterval(intervalId);
  }, []);

  useEffect(() => {
    if (isReady) {
      saveFarmState(state);
    }
  }, [isReady, state]);

  useEffect(() => {
    if (!isReady || now === 0) {
      return;
    }

    const lockedIds = new Set(
      Object.entries(state.cooldowns)
        .filter(([, unlockedAt]) => unlockedAt > now)
        .map(([phaseId]) => phaseId),
    );

    previousLockedIds.current.forEach(phaseId => {
      if (
        !lockedIds.has(phaseId) &&
        !state.hiddenPhaseIds.includes(phaseId) &&
        !state.muted
      ) {
        playUnlockSound();
      }
    });

    previousLockedIds.current = lockedIds;
  }, [isReady, now, state.cooldowns, state.hiddenPhaseIds, state.muted]);

  const orderedPhases = useMemo(() => {
    return state.sortDirection === 'first' ? phases : [...phases].reverse();
  }, [state.sortDirection]);

  const visiblePhases = orderedPhases.filter(
    phase => !state.hiddenPhaseIds.includes(phase.id),
  );

  const hiddenPhases = phases.filter(phase =>
    state.hiddenPhaseIds.includes(phase.id),
  );

  const phaseStats = useMemo(() => {
    return phases.reduce<Record<string, number>>((stats, phase) => {
      stats[phase.id] = state.history.filter(
        entry => entry.phaseId === phase.id,
      ).length;
      return stats;
    }, {});
  }, [state.history]);

  const availablePhases = visiblePhases.filter(
    phase => (state.cooldowns[phase.id] ?? 0) <= now,
  );

  const cooldownPhases = visiblePhases.filter(
    phase => (state.cooldowns[phase.id] ?? 0) > now,
  );

  const nextAvailable = availablePhases[0];
  const nextUnlock = [...cooldownPhases].sort(
    (left, right) =>
      (state.cooldowns[left.id] ?? 0) - (state.cooldowns[right.id] ?? 0),
  )[0];
  const nextUnlockAt = nextUnlock ? state.cooldowns[nextUnlock.id] : undefined;

  function markPhaseDone(phase: Phase) {
    const doneAt = now;
    const unlockedAt = doneAt + state.cooldownMinutes * 60 * 1000;

    setState(currentState => ({
      ...currentState,
      cooldowns: {
        ...currentState.cooldowns,
        [phase.id]: unlockedAt,
      },
      history: [
        {
          id: `${phase.id}-${doneAt}-${currentState.history.length}`,
          phaseId: phase.id,
          phaseZone: phase.zone,
          doneAt,
          unlockedAt,
        },
        ...currentState.history,
      ].slice(0, 200),
    }));
  }

  function clearPhase(phaseId: string) {
    setState(currentState => {
      const cooldowns = { ...currentState.cooldowns };
      delete cooldowns[phaseId];
      return { ...currentState, cooldowns };
    });
  }

  function toggleHidden(phaseId: string) {
    setState(currentState => {
      const isHidden = currentState.hiddenPhaseIds.includes(phaseId);

      return {
        ...currentState,
        hiddenPhaseIds: isHidden
          ? currentState.hiddenPhaseIds.filter(id => id !== phaseId)
          : [...currentState.hiddenPhaseIds, phaseId],
      };
    });
  }

  function deleteHistoryEntry(entry: HistoryEntry) {
    setState(currentState => {
      const cooldowns = { ...currentState.cooldowns };

      if (cooldowns[entry.phaseId] === entry.unlockedAt) {
        delete cooldowns[entry.phaseId];
      }

      return {
        ...currentState,
        cooldowns,
        history: currentState.history.filter(item => item.id !== entry.id),
      };
    });
  }

  function toggleSettings() {
    setDraftCooldownMinutes(state.cooldownMinutes);
    setIsConfigOpen(currentValue => !currentValue);
  }

  function saveSettings() {
    setState(currentState => ({
      ...currentState,
      cooldownMinutes: normalizeCooldownMinutes(draftCooldownMinutes),
    }));
    setIsConfigOpen(false);
  }

  function cancelSettings() {
    setDraftCooldownMinutes(state.cooldownMinutes);
    setIsConfigOpen(false);
  }

  return (
    <main className={`app-shell theme-${state.theme}`}>
      <section className='mx-auto flex w-full max-w-7xl flex-col gap-4 px-3 py-3 sm:px-5 lg:px-6'>
        <AppHeader
          availableCount={availablePhases.length}
          cooldownCount={cooldownPhases.length}
          historyCount={state.history.length}
          onOpenSettings={toggleSettings}
        />

        {isConfigOpen ? (
          <SettingsPanel
            cooldownMinutes={state.cooldownMinutes}
            draftCooldownMinutes={draftCooldownMinutes}
            muted={state.muted}
            theme={state.theme}
            onCancel={cancelSettings}
            onDraftCooldownChange={setDraftCooldownMinutes}
            onSave={saveSettings}
            onToggleMuted={() =>
              setState(currentState => ({
                ...currentState,
                muted: !currentState.muted,
              }))
            }
            onToggleTheme={() =>
              setState(currentState => ({
                ...currentState,
                theme: currentState.theme === 'dark' ? 'light' : 'dark',
              }))
            }
          />
        ) : null}

        <section className='grid gap-4 lg:grid-cols-[1fr_340px]'>
          <div className='flex flex-col gap-4'>
            <NextPhasePanel
              cooldownMinutes={state.cooldownMinutes}
              isReady={isReady}
              nextAvailable={nextAvailable}
              nextUnlock={nextUnlock}
              nextUnlockAt={nextUnlockAt}
              now={now}
              sortDirection={state.sortDirection}
              onMarkDone={markPhaseDone}
              onToggleSort={() =>
                setState(currentState => ({
                  ...currentState,
                  sortDirection:
                    currentState.sortDirection === 'first' ? 'last' : 'first',
                }))
              }
            />

            <section className='grid gap-3'>
              {visiblePhases.map(phase => (
                <PhaseCard
                  farmCount={phaseStats[phase.id]}
                  isReady={isReady}
                  key={phase.id}
                  now={now}
                  phase={phase}
                  unlockedAt={state.cooldowns[phase.id] ?? 0}
                  onClearPhase={clearPhase}
                  onMarkDone={markPhaseDone}
                  onToggleHidden={toggleHidden}
                />
              ))}
            </section>
          </div>

          <aside className='flex flex-col gap-4'>
            <HistoryPanel
              history={state.history}
              onClearHistory={() =>
                setState(currentState => ({ ...currentState, history: [] }))
              }
              onDeleteHistoryEntry={deleteHistoryEntry}
            />
            <HiddenPhasesPanel
              hiddenPhases={hiddenPhases}
              onToggleHidden={toggleHidden}
            />
          </aside>
        </section>
      </section>
    </main>
  );
}
