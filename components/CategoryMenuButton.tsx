import { useActionSheet } from "@expo/react-native-action-sheet";
import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import { Alert, Modal, Platform, Pressable, StyleSheet, TextInput, View } from "react-native";
import { TimerCategory, useTimers } from "../context/timersContext";
import { useThemeColor } from "../hooks/useThemeColor";
import ThemedButton from "./theme/ThemedButton";
import { ThemedText } from "./theme/ThemedText";

interface CategoryActionSheetProps {
  category: TimerCategory;
}

export default function CategoryMenuButton({ category }: CategoryActionSheetProps) {
  const { showActionSheetWithOptions } = useActionSheet();
  const { deleteTimerCategory, updateTimerCategory } = useTimers();

  const tintColor = useThemeColor("icon");

  const [isModalVisible, setModalVisible] = useState(false);
  const [newCategoryTitle, setNewCategoryTitle] = useState(category.title);

  const showActionSheet = () => {
    const options = ["Change category title", "Delete category", "Cancel"];
    const destructiveButtonIndex = 1;
    const cancelButtonIndex = 2;

    showActionSheetWithOptions(
      {
        options,
        cancelButtonIndex,
        destructiveButtonIndex,
      },
      (selectedIndex: any) => {
        switch (selectedIndex) {
          case 0:
            // For iOS use Alert.prompt
            if (Platform.OS === "ios") {
              Alert.prompt(
                "Change Category Title",
                "",
                (newTitle) => {
                  if (newTitle) {
                    updateTimerCategory(category.id, { title: newTitle });
                  }
                },
                "plain-text",
                category.title
              );
            } else {
              // For Android, Web, etc., use the custom modal
              setModalVisible(true);
            }
            break;

          case destructiveButtonIndex:
            // Delete category confirmation (cross-platform compatible)
            Alert.alert("Delete Category", "Are you sure you want to delete this category and all its timers?", [
              {
                text: "Delete",
                style: "destructive",
                onPress: () => {
                  deleteTimerCategory(category.id);
                },
              },
              {
                text: "Cancel",
                style: "cancel",
              },
            ]);
            break;

          case cancelButtonIndex:
          // Canceled
        }
      }
    );
  };

  const handleCategoryTitleChange = () => {
    if (newCategoryTitle.trim().length > 0) {
      updateTimerCategory(category.id, { title: newCategoryTitle });
      setModalVisible(false);
    } else {
      Alert.alert("Error", "Category title cannot be empty.");
    }
  };

  return (
    <View>
      <Pressable onPress={showActionSheet}>
        <Ionicons name="ellipsis-horizontal" color={tintColor} size={24} />
      </Pressable>

      {/* Modal for changing the category title (Android, web, etc.) */}
      {Platform.OS !== "ios" && (
        <Modal visible={isModalVisible} transparent={true} animationType="slide">
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <ThemedText>Change Category Title</ThemedText>
              <TextInput
                style={styles.input}
                value={newCategoryTitle}
                onChangeText={setNewCategoryTitle}
                placeholder="Enter new title"
              />
              <View style={styles.buttonContainer}>
                <ThemedButton title="Cancel" onPress={() => setModalVisible(false)} />
                <ThemedButton title="Change" onPress={handleCategoryTitleChange} />
              </View>
            </View>
          </View>
        </Modal>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
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
    shadowOffset: { width: 0, height: 2 },
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
