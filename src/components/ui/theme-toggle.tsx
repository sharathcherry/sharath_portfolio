import { useTheme } from 'next-themes';
import { Switch } from './switch';

export default function ThemeToggle() {
  const { theme, setTheme, systemTheme } = useTheme();
  const current = theme === 'system' ? systemTheme : theme;

  return (
    <Switch
      checked={current === 'dark'}
      onCheckedChange={(checked) => setTheme(checked ? 'dark' : 'light')}
      aria-label="Toggle dark mode"
    />
  );
}
