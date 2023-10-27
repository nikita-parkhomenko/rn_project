import React, { useCallback, useState } from 'react';
import { StyleProp, StyleSheet, ViewStyle } from 'react-native';
import { Button as PButton, useTheme } from 'react-native-paper';
import Button from './Button';

// adapted from https://kentcdodds.com/blog/compound-components-with-react-hooks

interface ToggleContextContent {
  selectedValue: any;
  toggle: (value: any) => void;
}

const ToggleContext = React.createContext<ToggleContextContent>({} as ToggleContextContent);

interface ToggleProps {
  onSelected: (selected: any) => void;
  children: React.ReactNode;
  defaultValue?: any;
}

export default function Toggle({ onSelected, defaultValue, children }: ToggleProps) {
  const [selectedValue, setSelectedValue] = useState(defaultValue);

  const toggle = useCallback(
    (value: any) => {
      setSelectedValue(value);
      onSelected(value);
    },
    [onSelected]
  );

  const value = React.useMemo(() => ({ toggle, selectedValue }), [selectedValue, toggle]);

  return <ToggleContext.Provider value={value}>{children}</ToggleContext.Provider>;
}

function useToggleContext() {
  const context = React.useContext(ToggleContext);
  if (!context) {
    throw new Error('Toggle compound components cannot be rendered outside the Toggle component');
  }
  return context;
}

type ToggleButtonProps = {
  value: any;
  selectedColour?: string;
} & React.ComponentProps<typeof PButton>;

Toggle.Button = function ToggleButton({ value, children, selectedColour, style, ...props }: ToggleButtonProps) {
  const { selectedValue, toggle } = useToggleContext();
  const selected = selectedValue === value;
  const { colors } = useTheme();
  if (!selectedColour) {
    selectedColour = colors.primary;
  }
  const butttonStyles: StyleProp<ViewStyle>[] = [
    style,
    {
      backgroundColor: selected ? selectedColour : 'transparent',
    },
  ];

  if (!selected) {
    butttonStyles.push(styles.unselected);
  }

  return (
    <Button {...props} style={butttonStyles} onPress={() => toggle(value)}>
      {children}
    </Button>
  );
};

const styles = StyleSheet.create({
  unselected: {
    borderColor: '#787A88',
    borderWidth: 1,
    elevation: 0,
  },
});
