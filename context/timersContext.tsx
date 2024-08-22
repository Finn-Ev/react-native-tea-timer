import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, useContext, useEffect, useState } from 'react';

export const defaultCategoryId = '__default__';

// Define types for Timer and TimerCategory
export type TimerCategory = {
  id: string;
  title: string;
  timers: Timer[];
};

export type Timer = {
  id: string;
  title: string;
  infusions: number[];
};

// Create the context with an empty default value
export const TimersContext = createContext<
  | {
      customTimerCategories: TimerCategory[];
      defaultCategory: TimerCategory;
      createTimerCategory: (title: string) => TimerCategory;
      updateTimerCategory: (
        id: string,
        updatedCategory: Partial<TimerCategory>
      ) => void;
      deleteTimerCategory: (id: string) => void;
      getTimerCategoryByTimerId: (timerId: string) => TimerCategory;
      addTimer: (categoryId: string, timer: Timer) => void;
      updateTimer: (timerId: string, updatedTimer: Partial<Timer>) => void;
      deleteTimer: (timerId: string) => void;
      getTimerById: (timerId: string) => Timer;
      clearAllTimerData: () => void;
    }
  | undefined
>(undefined);

// TimersProvider component to manage state and provide context
export const TimersProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const defaultCategory: TimerCategory = {
    id: defaultCategoryId,
    title: 'Other Timers',
    timers: [],
  };

  const [timerCategories, setTimerCategories] = useState<TimerCategory[]>([
    defaultCategory,
  ]);

  // Load categories from localStorage when the component mounts
  useEffect(() => {
    // AsyncStorage.clear();

    AsyncStorage.getItem('timerCategories').then(savedCategories => {
      if (!savedCategories) {
        return;
      }

      const parsedCategories: TimerCategory[] = JSON.parse(savedCategories);

      if (parsedCategories.length) {
        setTimerCategories(parsedCategories);
      } else {
        throw new Error('No saved categories. This should not be possible.');
      }
    });
  }, []);

  // Save categories to localStorage whenever timerCategories state changes
  useEffect(() => {
    AsyncStorage.setItem('timerCategories', JSON.stringify(timerCategories));
  }, [timerCategories]);

  // Add a new timer category
  const createTimerCategory = (title: string) => {
    const newCategory: TimerCategory = {
      id: Math.random().toString(36).substring(7),
      title,
      timers: [],
    };

    setTimerCategories([...timerCategories, newCategory]);
    return newCategory;
  };

  // Update an existing timer category by id
  const updateTimerCategory = (
    id: string,
    updatedCategory: Partial<TimerCategory>
  ) => {
    setTimerCategories(
      timerCategories.map(category =>
        category.id === id ? { ...category, ...updatedCategory } : category
      )
    );
  };

  // Delete a timer category by id
  const deleteTimerCategory = (id: string) => {
    setTimerCategories(timerCategories.filter(category => category.id !== id));
  };

  const getTimerCategoryByTimerId = (timerId: string) => {
    return timerCategories.find(category =>
      category.timers.some(timer => timer.id === timerId)
    )!;
  };

  // Add a new timer to a specific category
  const addTimer = (categoryId: string, timer: Timer) => {
    setTimerCategories(
      timerCategories.map(category =>
        category.id === categoryId
          ? { ...category, timers: [...category.timers, timer] }
          : category
      )
    );
  };

  // Update an existing timer within a specific category
  const updateTimer = (timerId: string, updatedTimer: Partial<Timer>) => {
    const categoryId = getTimerCategoryByTimerId(timerId).id;

    setTimerCategories(
      timerCategories.map(category =>
        category.id === categoryId
          ? {
              ...category,
              timers: category.timers.map(timer =>
                timer.id === timerId ? { ...timer, ...updatedTimer } : timer
              ),
            }
          : category
      )
    );
  };

  // Delete a timer from a specific category
  const deleteTimer = (timerId: string) => {
    const categoryId = timerCategories.find(category =>
      category.timers.some(timer => timer.id === timerId)
    )?.id;

    setTimerCategories(
      timerCategories.map(category =>
        category.id === categoryId
          ? {
              ...category,
              timers: category.timers.filter(timer => timer.id !== timerId),
            }
          : category
      )
    );
  };

  const getTimerById = (timerId: string) => {
    const category = getTimerCategoryByTimerId(timerId);
    return category.timers.find(timer => timer.id === timerId)!;
  };

  const clearAllTimerData = () => {
    setTimerCategories([defaultCategory]);
  };

  return (
    <TimersContext.Provider
      value={{
        customTimerCategories: timerCategories.filter(
          category => category.id !== defaultCategoryId
        ),
        defaultCategory: timerCategories.find(
          category => category.id === defaultCategoryId
        )!,
        createTimerCategory,
        updateTimerCategory,
        deleteTimerCategory,
        getTimerCategoryByTimerId,
        addTimer,
        updateTimer,
        deleteTimer,
        getTimerById,
        clearAllTimerData,
      }}
    >
      {children}
    </TimersContext.Provider>
  );
};

export const useTimers = () => {
  const context = useContext(TimersContext);
  if (!context) {
    throw new Error('useTimers must be used within a TimersProvider');
  }
  return context;
};
