import { Redirect, useRootNavigationState } from 'expo-router';

export default function index() {
  const rootNavigationState = useRootNavigationState();

  if (!rootNavigationState?.key) return null;

  return <Redirect href={'/timers'} />;
}
