import React from "react";
import { Text, ScrollView, StyleSheet, Image } from "react-native";

export default function DetailsScreen({ route }) {
  const { item } = route.params;

  return (
    <ScrollView style={styles.container}>
      {/* Displaying the product image */}
      <Image source={{ uri: item.thumbnail }} style={styles.mainImage} />

      {/* Product title */}
      <Text style={styles.title}>{item.title}</Text>

      {/* Product price and category */}
      <Text style={styles.price}>Price: ${item.price}</Text>
      <Text style={styles.category}>Category: {item.category}</Text>

      {/* Availability status */}
      <Text style={styles.price}>{item.availabilityStatus}</Text>

      {/* Display additional product images in a horizontal scroll view */}
      {item.images && (
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.imageContainer}>
          {item.images.map((img, index) => (
            <Image key={index} source={{ uri: img }} style={styles.smallImage} />
          ))}
        </ScrollView>
      )}

      {/* Displaying the product description */}
      <Text style={styles.description}>{item.description}</Text>
    </ScrollView>
  );
}

// Styling for UI components
const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 10,
    padding: 20,
    backgroundColor: "#f5f5f5"
  },
  mainImage: {
    width: "100%",
    height: 250,
    borderRadius: 10,
    marginBottom: 10
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 5
  },
  price: {
    fontSize: 18,
    color: "green",
    fontWeight: "bold",
    marginBottom: 5
  },
  category: {
    fontSize: 16,
    color: "#555",
    marginBottom: 10
  },
  imageContainer: {
    flexDirection: "row",
    marginBottom: 10
  },
  smallImage: {
    width: 80,
    height: 80,
    borderRadius: 5,
    marginRight: 5
  },
  description: {
    fontSize: 16,
    color: "#333",
    marginTop: 10
  },
});
