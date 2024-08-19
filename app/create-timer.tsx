import { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, View } from 'react-native';
import InfusionCard from '../components/InfusionCard';
import ThemedButton from '../components/ThemedButton';
import ThemedIcon from '../components/ThemedIcon';
import ThemedTextInput from '../components/ThemedTextInput';
import { ThemedView } from '../components/ThemedView';

export default function AddTimerScreen() {
  const [infusions, setInfusions] = useState<number[]>([0]);

  const handleDurationChange = (index: number, value: number) => {
    const newInfusions = [...infusions];
    newInfusions[index] = value;
    setInfusions(newInfusions);
  };

  const handleAddInfusion = () => {
    setInfusions([...infusions, 0]);
  };

  const handleDeleteInfusion = (index: number) => {
    const newInfusions = [...infusions];
    newInfusions.splice(index, 1);
    setInfusions(newInfusions);
  };

  return (
    <ThemedView style={styles.pageContainer}>
      <ScrollView>
        <View>
          <ThemedTextInput label="Name" style={{}} placeholder="e.g. Sencha" />
          <View style={styles.infusionList}>
            {infusions.map((duration, index) => (
              <InfusionCard
                key={index}
                index={index}
                duration={duration}
                onDurationChange={handleDurationChange}
                deleteInfusion={handleDeleteInfusion}
              />
            ))}
          </View>
          <View style={styles.addInfusionIconWrapper}>
            <Pressable onPress={handleAddInfusion}>
              <ThemedIcon name="add-circle" size={56} />
            </Pressable>
          </View>
        </View>
      </ScrollView>
      <ThemedButton
        onPress={() => {}}
        title="Save Timer"
        style={{ marginBottom: 32 }}
      />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  pageContainer: {
    minHeight: '100%',
    padding: 8,
  },
  infusionList: {
    marginTop: 16,
    display: 'flex',
    gap: 8,
  },
  addInfusionIconWrapper: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 16,
  },
});
