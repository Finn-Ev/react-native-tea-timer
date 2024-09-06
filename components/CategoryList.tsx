import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import { Alert, Modal, Platform, Pressable, StyleSheet, TextInput, View } from "react-native";
import { useTimers } from "../context/timersContext";
import { useThemeColor } from "../hooks/useThemeColor";
import ThemedButton from "./theme/ThemedButton";
import { ThemedText } from "./theme/ThemedText";

interface SelectCategoryProps {
  selectedCategoryId: string | null;
  handleCategorySelection: (categoryId: string) => void;
}

export default function SelectCategory({ selectedCategoryId, handleCategorySelection }: SelectCategoryProps) {
  const { customTimerCategories, createTimerCategory } = useTimers();
  const [isNonIOSModalVisible, setIsNonIOSModalVisible] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState("");

  const accentColor = useThemeColor("accent");
  const textColor = useThemeColor("secondary");
  const backgroundColor = useThemeColor("content");

  const handleCreateCategory = (title: string) => {
    const newCategory = createTimerCategory(title);
    handleCategorySelection(newCategory.id);
  };

  // Handle category creation for Android and web
  const handlePromptSubmit = () => {
    if (newCategoryName.trim().length > 0) {
      handleCreateCategory(newCategoryName);
      setNewCategoryName(""); // Clear the input
      setIsNonIOSModalVisible(false); // Close the modal
    } else {
      Alert.alert("Error", "Category name cannot be empty.");
    }
  };

  // Trigger the prompt on iOS
  const handleCreateCategoryPromptIOS = () => {
    Alert.prompt(
      "Create category",
      "Enter a name",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Create",
          onPress: (text) => {
            if (text && text.trim().length > 0) {
              handleCreateCategory(text);
            } else {
              Alert.alert("Error", "Category name cannot be empty.");
            }
          },
        },
      ],
      "plain-text"
    );
  };

  return (
    <View
      style={{
        ...styles.container,
        borderColor: accentColor,
        backgroundColor: backgroundColor,
      }}
    >
      {customTimerCategories.map((category, idx) => (
        <Pressable
          onPress={() => handleCategorySelection(category.id)}
          key={category.id}
          style={{
            ...styles.category,
            borderColor: accentColor,
            ...(idx === 0 && { borderTopWidth: 0 }),
          }}
        >
          <ThemedText>{category.title}</ThemedText>
          {selectedCategoryId === category.id && <Ionicons name="checkmark" size={24} color={textColor} />}
        </Pressable>
      ))}

      <Pressable
        onPress={() => {
          if (Platform.OS === "ios") {
            handleCreateCategoryPromptIOS(); // Use Alert.prompt on iOS
          } else {
            setIsNonIOSModalVisible(true); // Show custom modal on Android and others
          }
        }}
        style={[
          styles.createCategory,
          { borderColor: accentColor },
          customTimerCategories.length === 0 && { borderTopWidth: 0 },
        ]}
      >
        <Ionicons name="add-circle" size={24} color={textColor} />
        <ThemedText>Create category</ThemedText>
      </Pressable>

      {/* Modal for creating a new category (Android, web, etc.) */}
      {Platform.OS !== "ios" && (
        <Modal visible={isNonIOSModalVisible} transparent={true} animationType="slide">
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <ThemedText>Create a new category</ThemedText>
              <TextInput
                style={styles.input}
                placeholder="Enter category name"
                value={newCategoryName}
                onChangeText={setNewCategoryName}
              />
              <View style={styles.buttonContainer}>
                <ThemedButton title="Cancel" onPress={() => setIsNonIOSModalVisible(false)} />
                <ThemedButton title="Create" onPress={handlePromptSubmit} />
              </View>
            </View>
          </View>
        </Modal>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 12,
  },
  category: {
    display: "flex",
    paddingHorizontal: 6,
    paddingVertical: 4,
    flexDirection: "row",
    justifyContent: "space-between",
    borderTopWidth: 1,
  },
  createCategory: {
    display: "flex",
    flexDirection: "row",
    padding: 6,
    borderTopWidth: 1,
    gap: 3,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    width: "80%",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    marginTop: 10,
    borderRadius: 5,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
});
